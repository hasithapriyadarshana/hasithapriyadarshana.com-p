import { Metadata } from 'next'
import React from 'react'
import HeaderOne from '@/layouts/headers/HeaderOne'
import FooterOne from '@/layouts/footers/FooterOne'
import Breadcrumb from '@/components/common/Breadcrumb'

export const metadata: Metadata = {
  title: 'Education | Hasitha Priyadarshana',
  description:
    'Education background of Hasitha Priyadarshana — Bachelor of ICT (Hons) in Network Technology at the University of Sri Jayewardenepura, with specialization in networking, cybersecurity, and cloud computing.',
  keywords: [
    'Hasitha Priyadarshana Education',
    'University of Sri Jayewardenepura',
    'Network Technology Undergraduate',
    'Bachelor of ICT',
    'ICT Education Sri Lanka',
  ],
  openGraph: {
    title: 'Education | Hasitha Priyadarshana',
    description:
      'Bachelor of ICT (Hons) in Network Technology at the University of Sri Jayewardenepura.',
    url: 'https://hasithapriyadarshana.com/education',
  },
  alternates: {
    canonical: 'https://hasithapriyadarshana.com/education',
  },
}

export default function EducationPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Education | Hasitha Priyadarshana",
    description: "Bachelor of ICT (Hons) in Network Technology at the University of Sri Jayewardenepura.",
    url: "https://hasithapriyadarshana.com/education",
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
            <Breadcrumb title="Education" />
            <section className="about-area" style={{ paddingTop: '60px', paddingBottom: '60px' }}>
              <div className="container">
                <div className="row">
                  <div className="col-lg-12">
                    <div className="about-content-part">
                      <h2 style={{ marginBottom: '20px' }}>Education</h2>

                      <div style={{ marginBottom: '40px' }}>
                        <h3 style={{ color: '#c9a84c', marginBottom: '10px' }}>Bachelor of ICT (Hons)</h3>
                        <p style={{ fontSize: '18px', fontWeight: 500, marginBottom: '5px' }}>
                          Specialization in Network Technology
                        </p>
                        <p style={{ color: '#999', marginBottom: '15px' }}>
                          University of Sri Jayewardenepura
                        </p>
                        <p>
                          Pursuing a Bachelor of Information and Communication Technology degree with
                          a specialization in Network Technology. The program covers advanced networking,
                          cybersecurity, cloud computing, database management, software development,
                          and IT project management.
                        </p>
                      </div>

                      <h3 style={{ marginTop: '30px', marginBottom: '15px' }}>Key Areas of Study</h3>
                      <ul style={{ paddingLeft: '20px', lineHeight: '2' }}>
                        <li><strong>Network Technology:</strong> Advanced routing &amp; switching, network design, WAN technologies, software-defined networking</li>
                        <li><strong>Cybersecurity:</strong> Network security, ethical hacking, cryptography, security policy development</li>
                        <li><strong>Cloud Computing:</strong> AWS, Azure, cloud architecture, virtualization, cloud security</li>
                        <li><strong>Database Management:</strong> SQL, database design, data modeling, performance optimization</li>
                        <li><strong>Software Development:</strong> Programming fundamentals, web development, application architecture</li>
                        <li><strong>IT Project Management:</strong> Agile methodologies, project planning, risk management</li>
                      </ul>

                      <h3 style={{ marginTop: '30px', marginBottom: '15px' }}>Academic Projects</h3>
                      <p>
                        Throughout my degree, I have completed multiple academic projects that combine
                        networking, security, and software development. These projects include network
                        topology design, security implementation, IoT solutions, and web-based applications
                        that solve real-world problems.
                      </p>

                      <h3 style={{ marginTop: '30px', marginBottom: '15px' }}>Continuous Learning</h3>
                      <p>
                        Beyond formal education, I actively pursue certifications from Cisco Networking
                        Academy, freeCodeCamp, and other platforms to stay current with industry
                        standards and emerging technologies. My learning focuses on networking,
                        cybersecurity, and modern web development practices.
                      </p>
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
