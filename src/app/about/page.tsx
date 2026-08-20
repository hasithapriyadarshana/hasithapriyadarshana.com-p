
import About from '@/components/about'
import Wrapper from '@/layouts/Wrapper'
import { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
  title: 'About Hasitha Priyadarshana',
  description:
    'Learn about Hasitha Priyadarshana — Network Technology undergraduate at the University of Sri Jayewardenepura, founder of HyperX Innovations, with expertise in network engineering, cybersecurity, cloud computing, and web development.',
  keywords: [
    'Hasitha Priyadarshana',
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
      'Learn about Hasitha Priyadarshana — Network Technology undergraduate, web developer, network engineer, and founder of HyperX Innovations.',
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
