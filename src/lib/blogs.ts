import "server-only";

import { Permission, Query, Role, type Models } from "node-appwrite";
import { serverAppwriteConfig, serverTablesDB } from "@/lib/appwrite-server";
import type { BlogPost } from "@/types/blog";

export type BlogRow = Models.Row & {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  tags?: string[];
  publishDate: string;
  readTime: string;
  image?: string;
  imageFileId?: string;
  seoTitle?: string;
  seoDescription?: string;
  seoKeywords?: string[];
};

export function toBlogPost(row: BlogRow): BlogPost {
  const image = row.imageFileId
    ? `${serverAppwriteConfig.endpoint}/storage/buckets/${serverAppwriteConfig.bucketId}/files/${row.imageFileId}/view?project=${serverAppwriteConfig.projectId}`
    : row.image || "/assets/images/blog/blog1.jpg";
  const published = row.$permissions.includes(Permission.read(Role.any()));
  return {
    id: row.$id,
    slug: row.slug,
    title: row.title,
    excerpt: row.excerpt,
    content: row.content,
    category: row.category,
    tags: row.tags || [],
    date: formatBlogDate(row.publishDate),
    publishDate: row.publishDate,
    readTime: row.readTime,
    image,
    imageFileId: row.imageFileId,
    thumbnail: image,
    published,
    createdAt: row.$createdAt,
    updatedAt: row.$updatedAt,
    seo: {
      title: row.seoTitle || row.title,
      description: row.seoDescription || row.excerpt,
      keywords: row.seoKeywords || row.tags || [],
    },
  };
}

export function formatBlogDate(date: string) {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(date));
}

export async function getPublishedPosts(): Promise<BlogPost[]> {
  if (!serverAppwriteConfig.databaseId || !serverAppwriteConfig.blogTableId) return [];

  try {
    const response = await serverTablesDB.listRows<BlogRow>({
      databaseId: serverAppwriteConfig.databaseId,
      tableId: serverAppwriteConfig.blogTableId,
      queries: [Query.limit(100)],
    });

    return response.rows
      .map(toBlogPost)
      .filter((post) => post.published)
      .sort((a, b) => new Date(b.publishDate || b.date).getTime() - new Date(a.publishDate || a.date).getTime());
  } catch (error) {
    console.warn(
      "Unable to load blog posts from Appwrite:",
      error instanceof Error ? error.message : "Unknown Appwrite error",
    );
    return [];
  }
}

export async function getPublishedPost(slug: string): Promise<BlogPost | null> {
  if (!serverAppwriteConfig.databaseId || !serverAppwriteConfig.blogTableId) return null;

  try {
    const response = await serverTablesDB.listRows<BlogRow>({
      databaseId: serverAppwriteConfig.databaseId,
      tableId: serverAppwriteConfig.blogTableId,
      queries: [Query.equal("slug", slug), Query.limit(1)],
    });

    const post = response.rows[0] ? toBlogPost(response.rows[0]) : null;
    return post?.published ? post : null;
  } catch (error) {
    console.warn(
      `Unable to load blog post ${slug}:`,
      error instanceof Error ? error.message : "Unknown Appwrite error",
    );
    return null;
  }
}
