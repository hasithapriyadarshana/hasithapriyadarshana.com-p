
import Contact from '@/components/contact'
import Wrapper from '@/layouts/Wrapper'
import { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Get in touch with Hasitha Priyadarshana — CCNA and Fortinet NSE 3 certified ICT undergraduate in Colombo, Sri Lanka — for internships, managed services, network engineering, monitoring, security, and web development opportunities.',
  keywords: [
    'Contact Hasitha Priyadarshana',
    'Freelance Web Developer Sri Lanka Contact',
    'Network Engineer Sri Lanka',
    'Web Development Inquiry Sri Lanka',
  ],
  openGraph: {
    title: 'Contact Hasitha Priyadarshana',
    description:
      'Contact Hasitha Priyadarshana for internships, managed services, network engineering, monitoring, security, and web development.',
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
