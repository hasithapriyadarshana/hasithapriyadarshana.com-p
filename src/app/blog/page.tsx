import Blog from '@/components/blog'
import Wrapper from '@/layouts/Wrapper'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
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

export default function index() {
  notFound();

  return (
    <Wrapper>
      <Blog />
    </Wrapper>
  )
}
