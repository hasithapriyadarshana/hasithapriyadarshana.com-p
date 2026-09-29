import "server-only";

import { Permission, Query, Role, type Models } from "node-appwrite";
import { auth } from "@/lib/auth";
import { serverAppwriteConfig, serverTablesDB } from "@/lib/appwrite-server";
import type { BlogRow } from "@/lib/blogs";
import type { BlogPostInput } from "@/types/blog";

export async function requireAdmin(request: Request) {
  const session = await auth.api.getSession({ headers: request.headers });
  const username = (session?.user as { username?: string } | undefined)?.username?.toLowerCase();
  if (!session || !username || username !== process.env.BETTER_AUTH_ADMIN_USERNAME?.trim().toLowerCase()) {
    return null;
  }
  return session;
}

export function blogPermissions(published: boolean) {
  return published ? [Permission.read(Role.any())] : [];
}

export function blogRowData(post: BlogPostInput) {
  const image = post.image.trim();
  return {
    title: post.title.trim(),
    slug: post.slug.trim(),
    excerpt: post.excerpt.trim(),
    content: post.content.trim(),
    category: post.category.trim(),
    tags: post.tags,
    publishDate: post.publishDate,
    readTime: post.readTime.trim(),
    ...(image ? { image } : {}),
    imageFileId: post.imageFileId,
    seoTitle: post.seo.title.trim(),
    seoDescription: post.seo.description.trim(),
    seoKeywords: post.seo.keywords,
  };
}

export function parsePost(value: FormDataEntryValue | null): BlogPostInput {
  if (typeof value !== "string") throw new Error("Post data is required.");
  const post = JSON.parse(value) as BlogPostInput;
  if (!post.title?.trim() || !post.slug?.trim() || !post.excerpt?.trim() || !post.content?.trim() || !post.category?.trim()) {
    throw new Error("Title, slug, excerpt, content, and category are required.");
  }
  if (Number.isNaN(new Date(post.publishDate).getTime())) throw new Error("Publish date is invalid.");
  return post;
}

export async function findBlogRow(rowId: string) {
  return serverTablesDB.getRow<BlogRow>({
    databaseId: serverAppwriteConfig.databaseId,
    tableId: serverAppwriteConfig.blogTableId,
    rowId,
  });
}

export async function listBlogRows() {
  const response = await serverTablesDB.listRows<BlogRow>({
    databaseId: serverAppwriteConfig.databaseId,
    tableId: serverAppwriteConfig.blogTableId,
    queries: [Query.orderDesc("$createdAt"), Query.limit(100)],
  });
  return response.rows as unknown as Models.Row[];
}
