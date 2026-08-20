
import Service from '@/components/service'
import Wrapper from '@/layouts/Wrapper'
import { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
  title: 'Services',
  description:
    'Professional services by Hasitha Priyadarshana — network solutions, web development, cybersecurity consulting, WordPress development, social media marketing, and IT consulting in Sri Lanka.',
  keywords: [
    'Network Solutions Sri Lanka',
    'Web Development Services Sri Lanka',
    'Cybersecurity Consulting Sri Lanka',
    'WordPress Developer Sri Lanka',
    'Freelance Web Developer Sri Lanka',
    'IT Consulting Sri Lanka',
  ],
  openGraph: {
    title: 'Services | Hasitha Priyadarshana',
    description:
      'Network solutions, web development, cybersecurity, WordPress, and IT consulting services by Hasitha Priyadarshana.',
    url: 'https://hasithapriyadarshana.com/service',
  },
  alternates: {
    canonical: 'https://hasithapriyadarshana.com/service',
  },
}

export default function index() {
  return (
    <Wrapper>
      <Service />
    </Wrapper>
  )
}
