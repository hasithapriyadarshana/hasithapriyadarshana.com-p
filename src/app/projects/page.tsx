import Projects from '@/components/projects' 
import Wrapper from '@/layouts/Wrapper'
import { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
  title: 'Projects',
  description:
    'Browse projects by Hasitha Priyadarshana — FortiGate firewall configuration, Zabbix network monitoring, hospital network design, IoT elder care, freelance web development, and modern web applications.',
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
      'Networking, security, monitoring, IoT, and web development projects by Hasitha Priyadarshana.',
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
