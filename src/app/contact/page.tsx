
import Contact from '@/components/contact'
import Wrapper from '@/layouts/Wrapper'
import { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Get in touch with Hasitha Priyadarshana for web development, network engineering, cybersecurity, and cloud computing projects. Available for freelance work, internships, and technology collaborations in Sri Lanka.',
  keywords: [
    'Contact Hasitha Priyadarshana',
    'Freelance Web Developer Sri Lanka Contact',
    'Network Engineer Sri Lanka',
    'Web Development Inquiry Sri Lanka',
  ],
  openGraph: {
    title: 'Contact Hasitha Priyadarshana',
    description:
      'Get in touch for web development, network engineering, cybersecurity, and IT consulting projects.',
    url: 'https://hasithapriyadarshana.com/contact',
  },
  alternates: {
    canonical: 'https://hasithapriyadarshana.com/contact',
  },
}

export default function index() {
  return (
    <Wrapper>
      <Contact />
    </Wrapper>
  )
}
