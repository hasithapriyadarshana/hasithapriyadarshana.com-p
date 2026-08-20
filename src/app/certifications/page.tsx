import { Metadata } from 'next'
import React from 'react'
import HeaderOne from '@/layouts/headers/HeaderOne'
import FooterOne from '@/layouts/footers/FooterOne'
import Breadcrumb from '@/components/common/Breadcrumb'

export const metadata: Metadata = {
  title: 'Certifications | Hasitha Priyadarshana',
  description:
    'Professional certifications earned by Hasitha Priyadarshana — networking, cybersecurity, cloud computing, and technology certifications that validate expertise in network engineering and IT.',
  keywords: [
    'Hasitha Priyadarshana Certifications',
    'Network Certifications Sri Lanka',
    'Cybersecurity Certifications',
    'Cisco Certifications',
    'IT Certifications Sri Lanka',
  ],
  openGraph: {
    title: 'Certifications | Hasitha Priyadarshana',
    description:
      'Professional certifications in networking, cybersecurity, cloud computing, and technology.',
    url: 'https://hasithapriyadarshana.com/certifications',
  },
  alternates: {
    canonical: 'https://hasithapriyadarshana.com/certifications',
  },
}

const certifications = [
  { name: 'Introduction to Cybersecurity', provider: 'Cisco Networking Academy', skills: 'Cybersecurity Fundamentals, Threat Detection' },
  { name: 'Networking Basics', provider: 'Cisco Networking Academy', skills: 'Network Fundamentals, TCP/IP, OSI Model' },
  { name: 'Introduction to IoT', provider: 'Cisco Networking Academy', skills: 'IoT Concepts, Connected Devices' },
  { name: 'NDG Linux Unhatched', provider: 'Cisco Networking Academy', skills: 'Linux Fundamentals, Command Line' },
  { name: 'Python Essentials 1', provider: 'Cisco Networking Academy', skills: 'Python Programming, Automation' },
  { name: 'JavaScript Essentials', provider: 'Cisco Networking Academy', skills: 'JavaScript, Web Development' },
  { name: 'Networking Devices and Initial Configuration', provider: 'Cisco Networking Academy', skills: 'Router/Switch Configuration, IP Addressing' },
  { name: 'Switching, Routing, and Wireless Essentials', provider: 'Cisco Networking Academy', skills: 'VLANs, Routing, Wireless Networks' },
  { name: 'Endpoint Security', provider: 'Cisco Networking Academy', skills: 'Endpoint Protection, Malware Defense' },
  { name: 'Network Security', provider: 'Cisco Networking Academy', skills: 'Firewall Rules, VPN, IDS/IPS' },
  { name: 'Ethical Hacker', provider: 'Cisco Networking Academy', skills: 'Penetration Testing, Vulnerability Assessment' },
  { name: 'Introduction to Packet Tracer', provider: 'Cisco Networking Academy', skills: 'Network Simulation, Topology Design' },
  { name: 'JavaScript Algorithms and Data Structures', provider: 'freeCodeCamp', skills: 'JavaScript, Algorithms, Data Structures' },
  { name: 'Responsive Web Design', provider: 'freeCodeCamp', skills: 'HTML, CSS, Responsive Design' },
]

export default function CertificationsPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Certifications | Hasitha Priyadarshana",
    description: "Professional certifications in networking, cybersecurity, cloud computing, and technology.",
    url: "https://hasithapriyadarshana.com/certifications",
    author: {
      "@type": "Person",
      name: "Hasitha Priyadarshana",
    },
  }

  return (
    <>
      <HeaderOne />
      <div id="smooth-wrapper">
        <div id="smooth-content">
          <main>
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <Breadcrumb title="Certifications" />
            <section className="about-area" style={{ paddingTop: '60px', paddingBottom: '60px' }}>
              <div className="container">
                <div className="row">
                  <div className="col-lg-12">
                    <div className="about-content-part">
                      <h2 style={{ marginBottom: '20px' }}>Professional Certifications</h2>
                      <p>
                        I hold {certifications.length} professional certifications in networking, cybersecurity,
                        and web development. These certifications validate my expertise and demonstrate
                        a commitment to continuous learning in the technology field.
                      </p>

                      <div style={{ marginTop: '30px' }}>
                        {certifications.map((cert, index) => (
                          <div key={index} style={{ marginBottom: '20px', padding: '15px', border: '1px solid #333', borderRadius: '8px' }}>
                            <h4 style={{ marginBottom: '5px', color: '#c9a84c' }}>{cert.name}</h4>
                            <p style={{ marginBottom: '5px', color: '#999' }}>{cert.provider}</p>
                            <p style={{ marginBottom: 0, fontSize: '14px' }}>Skills: {cert.skills}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </main>
          <FooterOne />
        </div>
      </div>
    </>
  )
}
