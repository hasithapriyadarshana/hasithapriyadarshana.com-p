import Projects from '@/components/projects' 
import Wrapper from '@/layouts/Wrapper'
import { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
  title: 'Projects',
  description:
    'Browse projects by Hasitha Priyadarshana — personal, freelance, university, and networking projects including web development, IoT, network security, and cybersecurity work.',
  keywords: [
    'Hasitha Priyadarshana Projects',
    'Web Development Projects Sri Lanka',
    'Network Engineering Projects',
    'Freelance Projects Sri Lanka',
    'Portfolio Projects',
  ],
  openGraph: {
    title: 'Projects | Hasitha Priyadarshana',
    description:
      'Personal, freelance, university, and networking projects by Hasitha Priyadarshana — web development, IoT, and cybersecurity.',
    url: 'https://hasithapriyadarshana.com/projects',
  },
  alternates: {
    canonical: 'https://hasithapriyadarshana.com/projects',
  },
}

export default function index() {
  return (
    <Wrapper>
      <Projects />
    </Wrapper>
  )
}
