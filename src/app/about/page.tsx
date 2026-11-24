
import About from '@/components/about'
import Wrapper from '@/layouts/Wrapper'
import { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
  title: 'About Hasitha Priyadarshana',
  description:
    'Learn about Hasitha Priyadarshana — an ICT undergraduate specializing in Network Technology at the University of Sri Jayewardenepura, CCNA and Fortinet NSE 3 certified, with hands-on experience in network engineering, security, monitoring, and web development.',
  keywords: [
    'Hasitha Priyadarshana',
    'Hasitha Priyadarshana CCNA Certified',
    'About Hasitha Priyadarshana',
    'Network Technology Undergraduate',
    'University of Sri Jayewardenepura',
    'HyperX Innovations',
    'Network Engineer Sri Lanka',
    'Cybersecurity Student Sri Lanka',
  ],
  openGraph: {
    title: 'About Hasitha Priyadarshana | Network Technology & Web Developer',
    description:
      'Learn about Hasitha Priyadarshana — CCNA and Fortinet NSE 3 certified Network Technology undergraduate, web developer, and volunteer technology leader.',
    url: 'https://hasithapriyadarshana.com/about',
  },
  alternates: {
    canonical: 'https://hasithapriyadarshana.com/about',
  },
}

export default function index() {
  return (
    <Wrapper>
      <About />
    </Wrapper>
  )
}
