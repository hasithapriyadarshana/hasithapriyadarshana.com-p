import { NextResponse } from "next/server";
import { ID, Permission, Role } from "node-appwrite";
import { InputFile } from "node-appwrite/file";
import { requireAdmin } from "@/lib/admin-blog";
import { serverAppwriteConfig, serverStorage } from "@/lib/appwrite-server";

export const runtime = "nodejs";

const allowedTypes = new Set(["image/jpeg", "image/png", "image/webp"]);

export async function POST(request: Request) {
  if (!(await requireAdmin(request))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const data = await request.formData();
    const image = data.get("image");
    if (!(image instanceof File) || !image.size) throw new Error("Paste a valid image.");
    if (!allowedTypes.has(image.type)) throw new Error("Only JPG, PNG, and WebP images are supported.");

    const uploaded = await serverStorage.createFile({
      bucketId: serverAppwriteConfig.bucketId,
      fileId: ID.unique(),
      file: InputFile.fromBuffer(await image.arrayBuffer(), image.name || "pasted-image"),
      permissions: [Permission.read(Role.any())],
    });
    const url = `${serverAppwriteConfig.endpoint}/storage/buckets/${serverAppwriteConfig.bucketId}/files/${uploaded.$id}/view?project=${serverAppwriteConfig.projectId}`;

    return NextResponse.json({ url });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unable to upload image." },
      { status: 400 },
    );
  }
}
