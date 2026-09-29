import BlogDetails from "@/components/blog-details";
import Wrapper from "@/layouts/Wrapper";
import { getPublishedPost, getPublishedPosts } from "@/lib/blogs";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

export const revalidate = 60;

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPublishedPost(slug);
  if (!post) return { title: "Article not found" };

  const ogImageUrl = post.image;

  return {
    title: post.seo.title,
    description: post.seo.description,
    keywords: post.seo.keywords,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: "article",
      title: post.seo.title,
      description: post.seo.description,
      url: `/blog/${post.slug}`,
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
      publishedTime: post.publishDate,
    },
    twitter: {
      card: "summary_large_image",
      title: post.seo.title,
      description: post.seo.description,
      images: [ogImageUrl],
    },
  };
}

export default async function BlogDetailPage({ params }: Props) {
  const { slug } = await params;
  const [post, posts] = await Promise.all([
    getPublishedPost(slug),
    getPublishedPosts(),
  ]);

  if (!post) notFound();

  const relatedPosts = posts
    .filter((candidate) => candidate.id !== post.id && candidate.category === post.category)
    .slice(0, 3);

  return (
    <Wrapper>
      <BlogDetails post={post} relatedPosts={relatedPosts} />
    </Wrapper>
  );
}
