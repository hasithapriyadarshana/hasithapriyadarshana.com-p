
import React from 'react'

import type { Metadata } from 'next'  
import Home from '@/components/home'
import Wrapper from '@/layouts/Wrapper'
import { getPublishedPosts } from '@/lib/blogs'

export const revalidate = 60

export const metadata: Metadata = {
  title: 'Hasitha Priyadarshana | Network Technology Undergraduate & Web Developer',
  description:
    'Hasitha Priyadarshana is a Network Technology undergraduate at the University of Sri Jayewardenepura and a Web Developer specializing in networking, cybersecurity, web development, and technology solutions.',
  keywords: [
    'Hasitha Priyadarshana',
    'Hasitha Priyadarshana Network Technology',
    'Hasitha Priyadarshana Web Developer',
    'Network Technology Undergraduate Sri Lanka',
    'Web Developer Sri Lanka',
    'Network Engineer Sri Lanka',
  ],
  openGraph: {
    title: 'Hasitha Priyadarshana | Network Technology Undergraduate & Web Developer',
    description:
      'Network Technology undergraduate and web developer. Explore my projects, skills, and experience in networking, cybersecurity, and web development.',
    url: 'https://hasithapriyadarshana.com',
  },
  alternates: {
    canonical: 'https://hasithapriyadarshana.com',
  },
}

export default async function index() {
  const posts = await getPublishedPosts()

  return (
    <Wrapper>
     <Home posts={posts} />
    </Wrapper>
  )
}
