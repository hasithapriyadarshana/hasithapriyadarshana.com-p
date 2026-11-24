import { Metadata } from 'next'
import React from 'react'
import Image from 'next/image'
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
    provider: 'Cisco',
    title: 'Cisco Certified Network Associate (CCNA 200-301)',
    date: 'Nov 2026',
    desc: 'Earned the Cisco Certified Network Associate (CCNA 200-301) certification, validating knowledge of network fundamentals, IP connectivity, IP services, security fundamentals, and automation and programmability.',
    certificateImage: 'assets/images/certifications/cisco-ccna-200-301.webp',
    credentialId: '3d5fbf49-222b-408c-922f-c02e1ca816f8',
    credentialUrl: 'https://www.credly.com/badges/3d5fbf49-222b-408c-922f-c02e1ca816f8/public_url',
  },
  {
    provider: 'Fortinet',
    title: 'Fortinet Network Security Expert (NSE) 3 – Cybersecurity',
    date: 'Oct 2026',
    desc: 'Earned the Fortinet Network Security Expert (NSE) 3 – Cybersecurity certification, validating foundational knowledge of cybersecurity concepts, threats, network security, and Fortinet security solutions.',
    certificateImage: 'assets/images/certifications/fortinet-nse-3-cybersecurity.webp',
    credentialId: 'eef63ec2-9823-466b-82e9-dfa6840823a6',
    credentialUrl: 'https://www.credly.com/badges/eef63ec2-9823-466b-82e9-dfa6840823a6/public_url',
  },
  {
    provider: 'Google & Coursera',
    title: 'Google Cybersecurity Professional Certificate',
    date: 'Aug 2026',
    desc: 'Completed the Google Cybersecurity Professional Certificate on Coursera, gaining practical skills in network security, risk management, security operations, Linux, SQL, Python, and SIEM tools.',
    certificateImage: 'assets/images/certifications/google-cybersecurity-professional-certificate.webp',
    credentialId: '0OMJ6CBMHRR8',
    credentialUrl: 'https://www.coursera.org/account/accomplishments/professional-cert/0OMJ6CBMHRR8',
  },
  {
    provider: 'Red Team Leaders',
    title: 'Certified Network Security Fundamentals (CNSF)',
    date: 'Nov 2026',
    desc: 'Earned the Certified Network Security Fundamentals (CNSF) certification from Red Team Leaders, covering core cybersecurity concepts, threats, vulnerabilities, risk management, and defensive security practices.',
    certificateImage: 'assets/images/certifications/certified-network-security-fundamentals-cnsf.webp',
    credentialId: '29ee33e6edb4150e',
    credentialUrl: 'https://courses.redteamleaders.com/exam-completion/29ee33e6edb4150e',
  },
  {
    provider: 'Cisco Networking Academy',
    title: 'CCNA: Enterprise Networking, Security, and Automation',
    date: 'Oct 2026',
    desc: 'Completed the CCNA: Enterprise Networking, Security, and Automation course through the Cisco Networking Academy, covering enterprise networking, WAN technologies, network security, and automation.',
    certificateImage: 'assets/images/certifications/ccna-enterprise-networking-security-automation.webp',
    credentialId: '097a4cf2-2d16-442e-bf7b-4de48960f2f1',
    credentialUrl: 'https://www.credly.com/badges/097a4cf2-2d16-442e-bf7b-4de48960f2f1/public_url',
  },
  {
    provider: 'Cisco Networking Academy',
    title: 'CCNA: Switching, Routing, and Wireless Essentials',
    date: 'Sep 2026',
    desc: 'Completed the CCNA: Switching, Routing, and Wireless Essentials course through the Cisco Networking Academy, covering switching, routing, wireless networking, and network security fundamentals.',
    certificateImage: 'assets/images/certifications/ccna-switching-routing-wireless-essentials.webp',
    credentialId: 'cde0de1f-f6f5-4d28-9eef-2d4dd56ebef8',
    credentialUrl: 'https://www.credly.com/badges/cde0de1f-f6f5-4d28-9eef-2d4dd56ebef8/public_url',
  },
  {
    provider: 'Cisco Networking Academy',
    title: 'CCNA: Introduction to Networks',
    date: 'Aug 2026',
    desc: 'Completed the CCNA: Introduction to Networks course through the Cisco Networking Academy, building a foundation in network fundamentals, protocols, addressing, and network configuration.',
    certificateImage: 'assets/images/certifications/ccna-introduction-to-networks.webp',
    credentialId: 'b788b78f-bb04-46b1-a071-3fd1c1394e52',
    credentialUrl: 'https://www.credly.com/badges/b788b78f-bb04-46b1-a071-3fd1c1394e52/public_url',
  },
  {
    provider: 'Amazon Web Services (AWS) & Coursera',
    title: 'Architecting Solutions on AWS',
    date: 'Aug 2026',
    desc: 'Completed Architecting Solutions on AWS through AWS and Coursera, covering AWS architecture, cloud design principles, scalability, reliability, and cost optimization.',
  },
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
                            {cert.certificateImage && (
                              <Image
                                src={`/${cert.certificateImage}`}
                                alt={`${cert.title} certificate`}
                                width={600}
                                height={400}
                                unoptimized
                                loading="lazy"
                                decoding="async"
                                sizes="(max-width: 768px) 100vw, 600px"
                                style={{ width: '100%', height: 'auto', borderRadius: '8px', marginBottom: '10px' }}
                              />
                            )}
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
