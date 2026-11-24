
import React from 'react'

import type { Metadata } from 'next'  
import Home from '@/components/home'
import Wrapper from '@/layouts/Wrapper'

export const metadata: Metadata = {
  title: 'Hasitha Priyadarshana | CCNA Certified Network Technology Undergraduate',
  description:
    'ICT undergraduate specializing in Network Technology, CCNA and Fortinet NSE 3 certified, with hands-on experience in network engineering, infrastructure management, security, Zabbix monitoring, and web development.',
  keywords: [
    'Hasitha Priyadarshana',
    'Hasitha Priyadarshana CCNA Certified',
    'Hasitha Priyadarshana Network Technology',
    'Hasitha Priyadarshana Web Developer',
    'Network Technology Undergraduate Sri Lanka',
    'Web Developer Sri Lanka',
    'Network Engineer Sri Lanka',
  ],
  openGraph: {
    title: 'Hasitha Priyadarshana | CCNA Certified Network Technology Undergraduate',
    description:
      'Explore projects, skills, services, and certifications of Hasitha Priyadarshana — a CCNA and Fortinet NSE 3 certified Network Technology undergraduate focused on networking, security, monitoring, and web development.',
    url: 'https://hasithapriyadarshana.com',
  },
  alternates: {
    canonical: 'https://hasithapriyadarshana.com',
  },
}

export default function index() {
  return (
    <Wrapper>
     <Home />
    </Wrapper>
  )
}
