import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { ID, Permission, Role } from "node-appwrite";
import { InputFile } from "node-appwrite/file";
import { blogPermissions, blogRowData, findBlogRow, parsePost, requireAdmin } from "@/lib/admin-blog";
import { serverAppwriteConfig, serverStorage, serverTablesDB } from "@/lib/appwrite-server";
import { toBlogPost } from "@/lib/blogs";

export const runtime = "nodejs";

type RouteContext = { params: Promise<{ id: string }> };

import { processCoverImageToOg } from "@/lib/image-processor";

export async function PATCH(request: Request, { params }: RouteContext) {
  if (!(await requireAdmin(request))) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  let uploadedFileId = "";
  try {
    const { id } = await params;
    const current = await findBlogRow(id);
    const data = await request.formData();
    const post = parsePost(data.get("post"));
    const cover = data.get("cover");
    const wasPublished = current.$permissions.includes(Permission.read(Role.any()));
    const permissions = blogPermissions(wasPublished || post.published);
    let imageFileId = current.imageFileId || "";

    if (cover instanceof File && cover.size > 0) {
      const ogImage = await processCoverImageToOg(Buffer.from(await cover.arrayBuffer()));
      const uploaded = await serverStorage.createFile({
        bucketId: serverAppwriteConfig.bucketId,
        fileId: ID.unique(),
        file: InputFile.fromBuffer(ogImage.buffer, ogImage.fileName),
        permissions,
      });
      uploadedFileId = uploaded.$id;
      imageFileId = uploaded.$id;
    } else if (imageFileId) {
      await serverStorage.updateFile({ bucketId: serverAppwriteConfig.bucketId, fileId: imageFileId, permissions });
    } else {
      throw new Error("Choose a cover image before saving the post.");
    }

    const row = await serverTablesDB.updateRow({
      databaseId: serverAppwriteConfig.databaseId,
      tableId: serverAppwriteConfig.blogTableId,
      rowId: id,
      data: blogRowData({ ...post, image: "", imageFileId }),
      permissions,
    });
    if (uploadedFileId && current.imageFileId) {
      await serverStorage.deleteFile({ bucketId: serverAppwriteConfig.bucketId, fileId: current.imageFileId }).catch(() => undefined);
    }
    revalidatePath("/blog");
    revalidatePath(`/blog/${post.slug}`);
    return NextResponse.json(toBlogPost(row as never));
  } catch (error) {
    if (uploadedFileId) await serverStorage.deleteFile({ bucketId: serverAppwriteConfig.bucketId, fileId: uploadedFileId }).catch(() => undefined);
    return NextResponse.json({ error: error instanceof Error ? error.message : "Unable to update post." }, { status: 400 });
  }
}

export async function DELETE(request: Request, { params }: RouteContext) {
  if (!(await requireAdmin(request))) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const { id } = await params;
    const row = await findBlogRow(id);
    await serverTablesDB.deleteRow({
      databaseId: serverAppwriteConfig.databaseId,
      tableId: serverAppwriteConfig.blogTableId,
      rowId: id,
    });
    if (row.imageFileId) {
      await serverStorage.deleteFile({ bucketId: serverAppwriteConfig.bucketId, fileId: row.imageFileId }).catch(() => undefined);
    }
    revalidatePath("/blog");
    revalidatePath(`/blog/${row.slug}`);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Unable to delete post." }, { status: 400 });
  }
}
