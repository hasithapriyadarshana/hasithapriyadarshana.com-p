import { blog_data } from "@/data/blog_data";
import type { BlogPost } from "@/types/blog";

export function formatBlogDate(date: string) {
  const parsed = new Date(date);
  if (Number.isNaN(parsed.getTime())) return date;
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(parsed);
}

export async function getPublishedPosts(): Promise<BlogPost[]> {
  return [...blog_data].sort(
    (a, b) =>
      new Date(b.publishDate || b.date).getTime() -
      new Date(a.publishDate || a.date).getTime(),
  );
}

export async function getPublishedPost(slug: string): Promise<BlogPost | null> {
  return blog_data.find((post) => post.slug === slug) ?? null;
}
