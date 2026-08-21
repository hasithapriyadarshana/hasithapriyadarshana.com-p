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
  {
    provider: 'Fortinet',
    title: 'FortiGate Administrator',
    date: 'Aug 2026',
    desc: 'Successfully completed the FortiGate Administrator course through Coursera with a 85.80% grade, gaining practical knowledge in FortiGate firewall administration, firewall policies, routing, VPNs, IPS, web filtering, application control, network monitoring, and network security.',
    credentialId: 'QWCWYIKBDBIJ',
    credentialUrl: 'https://www.coursera.org/account/accomplishments/verify/QWCWYIKBDBIJ',
  },
  {
    provider: 'Cisco',
    title: 'Network Fundamentals Specialization',
    date: 'Apr 2026',
    desc: 'Developed a strong foundation in networking, including OSI models, VLANs, routing, network segmentation, access control, traffic forwarding, network management, troubleshooting, and network security.',
    credentialId: 'N4VL30AWQBEV',
    credentialUrl: 'https://www.coursera.org/verify/specialization/N4VL30AWQBEV',
  },
  {
    provider: 'Cisco',
    title: 'Network Management Approaches',
    date: 'Apr 2026',
    desc: 'Gained practical knowledge of network management using SNMP, Cisco controllers, IOS CLI, and APIs, including monitoring, configuration, automation, troubleshooting, and performance optimization.',
  },
  {
    provider: 'Cisco',
    title: 'Network Security Principles',
    date: 'Apr 2026',
    desc: 'Developed knowledge of ACLs, NAC, 802.1X, firewalls, VPNs, AAA, and RBAC for securing network access and controlling traffic.',
  },
  {
    provider: 'KodeKloud',
    title: 'Docker Basics for DevOps',
    date: 'Nov 2025',
    desc: 'Gained foundational knowledge of Docker, containers, images, containerized development environments, and DevOps workflows.',
    credentialId: 'HSKCH53IJNA4',
    credentialUrl: 'https://www.coursera.org/account/accomplishments/verify/HSKCH53IJNA4',
  },
  {
    provider: 'KodeKloud',
    title: 'Jenkins for Beginners',
    date: 'Nov 2025',
    desc: 'Developed foundational skills in Jenkins, CI/CD pipelines, automation, command-line tools, and DevOps practices.',
    credentialId: '3VRFAN555HBP',
    credentialUrl: 'https://www.coursera.org/account/accomplishments/verify/3VRFAN555HBP',
  },
  {
    provider: 'KodeKloud',
    title: 'Git Basics for DevOps',
    date: 'Nov 2025',
    desc: 'Gained practical knowledge of Git, GitHub, version control, branching, collaboration, and DevOps workflows.',
    credentialId: 'HBTSO3JSUVEI',
    credentialUrl: 'https://www.coursera.org/account/accomplishments/verify/HBTSO3JSUVEI',
  },
  {
    provider: 'KodeKloud',
    title: 'DevOps Prerequisite Course',
    date: 'Nov 2025',
    desc: 'Built foundational knowledge of Linux, Ubuntu, command-line interfaces, and essential DevOps concepts.',
    credentialId: 'F5Q1KGB29Y8T',
    credentialUrl: 'https://www.coursera.org/account/accomplishments/verify/F5Q1KGB29Y8T',
  },
  {
    provider: 'Amazon Web Services (AWS)',
    title: 'AWS Cloud Technical Essentials',
    date: 'Sep 2025',
    desc: 'Gained foundational knowledge of AWS cloud computing, including Amazon EC2, load balancing, cloud infrastructure, and core AWS services.',
    credentialId: 'IGBQJ91LYQI6',
    credentialUrl: 'https://www.coursera.org/account/accomplishments/verify/IGBQJ91LYQI6',
  },
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
                      <h2 style={{ marginBottom: '20px' }}>Professional Certifications &amp; Training</h2>
                      <p>
                        I hold {certifications.length} professional certifications in networking, cybersecurity,
                        cloud computing, and DevOps. These certifications validate my expertise and demonstrate
                        a commitment to continuous learning in the technology field.
                      </p>

                      <div style={{ marginTop: '30px' }}>
                        {certifications.map((cert, index) => (
                          <div key={index} style={{ marginBottom: '20px', padding: '15px', border: '1px solid #333', borderRadius: '8px' }}>
                            <h4 style={{ marginBottom: '5px', color: '#c9a84c' }}>{cert.title}</h4>
                            <p style={{ marginBottom: '5px', color: '#999' }}>{cert.provider} &middot; {cert.date}</p>
                            <p style={{ marginBottom: cert.credentialId ? '8px' : 0, fontSize: '14px' }}>{cert.desc}</p>
                            {cert.credentialId && (
                              <p style={{ marginBottom: 0, fontSize: '13px' }}>
                                <strong>Credential ID:</strong> {cert.credentialId} ·{' '}
                                <a href={cert.credentialUrl} target="_blank" rel="noopener noreferrer" style={{ color: '#c9a84c' }}>
                                  View Credential
                                </a>
                              </p>
                            )}
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
