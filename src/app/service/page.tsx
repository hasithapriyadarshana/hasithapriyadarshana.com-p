
import Service from '@/components/service'
import Wrapper from '@/layouts/Wrapper'
import { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
  title: 'Services',
  description:
    'Services by Hasitha Priyadarshana — network configuration and troubleshooting, firewall and VPN setup, Zabbix monitoring, web development, WordPress and WooCommerce, website maintenance, migration, and IT support.',
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
      'Network engineering, security, monitoring, web development, WordPress, and IT support services by Hasitha Priyadarshana.',
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
