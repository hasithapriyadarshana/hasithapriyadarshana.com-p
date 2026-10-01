import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { ID } from "node-appwrite";
import { InputFile } from "node-appwrite/file";
import { blogPermissions, blogRowData, listBlogRows, parsePost, requireAdmin } from "@/lib/admin-blog";
import { serverAppwriteConfig, serverStorage, serverTablesDB } from "@/lib/appwrite-server";
import { toBlogPost } from "@/lib/blogs";

export const runtime = "nodejs";

export async function GET(request: Request) {
  if (!(await requireAdmin(request))) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const rows = await listBlogRows();
    return NextResponse.json(rows.map((row) => toBlogPost(row as never)));
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Unable to load posts." }, { status: 500 });
  }
}

import { processCoverImageToOg } from "@/lib/image-processor";

export async function POST(request: Request) {
  if (!(await requireAdmin(request))) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  let uploadedFileId = "";
  try {
    const data = await request.formData();
    const post = parsePost(data.get("post"));
    const cover = data.get("cover");
    if (!(cover instanceof File) || cover.size === 0) throw new Error("Choose a cover image before saving the post.");

    const ogImage = await processCoverImageToOg(Buffer.from(await cover.arrayBuffer()));
    const permissions = blogPermissions(post.published);
    const uploaded = await serverStorage.createFile({
      bucketId: serverAppwriteConfig.bucketId,
      fileId: ID.unique(),
      file: InputFile.fromBuffer(ogImage.buffer, ogImage.fileName),
      permissions,
    });
    uploadedFileId = uploaded.$id;

    const row = await serverTablesDB.createRow({
      databaseId: serverAppwriteConfig.databaseId,
      tableId: serverAppwriteConfig.blogTableId,
      rowId: ID.unique(),
      data: blogRowData({ ...post, image: "", imageFileId: uploaded.$id }),
      permissions,
    });
    revalidatePath("/blog");
    revalidatePath("/");
    return NextResponse.json(toBlogPost(row as never), { status: 201 });
  } catch (error) {
    if (uploadedFileId) await serverStorage.deleteFile({ bucketId: serverAppwriteConfig.bucketId, fileId: uploadedFileId }).catch(() => undefined);
    return NextResponse.json({ error: error instanceof Error ? error.message : "Unable to create post." }, { status: 400 });
  }
}
