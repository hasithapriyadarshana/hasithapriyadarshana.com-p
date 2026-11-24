import Blog from '@/components/blog'
import Wrapper from '@/layouts/Wrapper'
import { getPublishedPosts } from '@/lib/blogs'
import { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
  title: 'Blog',
  description:
    'Articles and insights on network engineering, cybersecurity, web development, and technology by Hasitha Priyadarshana — Network Technology undergraduate and web developer.',
  keywords: [
    'Network Engineering Blog',
    'Cybersecurity Blog Sri Lanka',
    'Web Development Articles',
    'Hasitha Priyadarshana Blog',
    'Technology Blog Sri Lanka',
  ],
  openGraph: {
    title: 'Blog | Hasitha Priyadarshana',
    description:
      'Articles and insights on network engineering, cybersecurity, web development, and technology.',
    url: 'https://hasithapriyadarshana.com/blog',
  },
  alternates: {
    canonical: 'https://hasithapriyadarshana.com/blog',
  },
}

type BlogPageProps = {
  searchParams: Promise<{ category?: string | string[]; tag?: string | string[] }>
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const [posts, params] = await Promise.all([getPublishedPosts(), searchParams])
  const activeCategory = typeof params.category === 'string' ? params.category : undefined
  const activeTag = typeof params.tag === 'string' ? params.tag : undefined

  return (
    <Wrapper>
      <Blog posts={posts} activeCategory={activeCategory} activeTag={activeTag} />
    </Wrapper>
  )
}
