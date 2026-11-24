import React from "react";
import Image from "next/image";

export const certifications = [
  {
    id: 1,
    num: "01",
    image: "assets/images/about/cisco.svg",
    title: "Cisco Certified Network Associate (CCNA 200-301)",
    provider: "Cisco",
    year: "Nov 2026",
    desc: "Earned the Cisco Certified Network Associate (CCNA 200-301) certification, validating knowledge of network fundamentals, IP connectivity, IP services, security fundamentals, and automation and programmability.",
    certificateImage: "assets/images/certifications/cisco-ccna-200-301.webp",
    credentialId: "3d5fbf49-222b-408c-922f-c02e1ca816f8",
    credentialUrl:
      "https://www.credly.com/badges/3d5fbf49-222b-408c-922f-c02e1ca816f8/public_url",
  },
  {
    id: 3,
    num: "02",
    image: "assets/images/about/fortinet.svg",
    title: "Fortinet Network Security Expert (NSE) 3 – Cybersecurity",
    provider: "Fortinet",
    year: "Oct 2026",
    desc: "Earned the Fortinet Network Security Expert (NSE) 3 – Cybersecurity certification, validating foundational knowledge of cybersecurity concepts, threats, network security, and Fortinet security solutions.",
    certificateImage: "assets/images/certifications/fortinet-nse-3-cybersecurity.webp",
    credentialId: "eef63ec2-9823-466b-82e9-dfa6840823a6",
    credentialUrl:
      "https://www.credly.com/badges/eef63ec2-9823-466b-82e9-dfa6840823a6/public_url",
  },
  {
    id: 6,
    num: "03",
    image: "assets/images/about/google.svg",
    title: "Google Cybersecurity Professional Certificate",
    provider: "Google & Coursera",
    year: "Aug 2026",
    desc: "Completed the Google Cybersecurity Professional Certificate on Coursera, gaining practical skills in network security, risk management, security operations, Linux, SQL, Python, and SIEM tools.",
    certificateImage:
      "assets/images/certifications/google-cybersecurity-professional-certificate.webp",
    credentialId: "0OMJ6CBMHRR8",
    credentialUrl:
      "https://www.coursera.org/account/accomplishments/professional-cert/0OMJ6CBMHRR8",
  },
  {
    id: 2,
    num: "04",
    image: "assets/images/about/fortinet.svg",
    title: "Certified Network Security Fundamentals (CNSF)",
    provider: "Red Team Leaders",
    year: "Nov 2026",
    desc: "Earned the Certified Network Security Fundamentals (CNSF) certification from Red Team Leaders, covering core cybersecurity concepts, threats, vulnerabilities, risk management, and defensive security practices.",
    certificateImage:
      "assets/images/certifications/certified-network-security-fundamentals-cnsf.webp",
    credentialId: "29ee33e6edb4150e",
    credentialUrl:
      "https://courses.redteamleaders.com/exam-completion/29ee33e6edb4150e",
  },
  {
    id: 4,
    num: "05",
    image: "assets/images/about/cisco.svg",
    title: "CCNA: Enterprise Networking, Security, and Automation",
    provider: "Cisco Networking Academy",
    year: "Oct 2026",
    desc: "Completed the CCNA: Enterprise Networking, Security, and Automation course through the Cisco Networking Academy, covering enterprise networking, WAN technologies, network security, and automation.",
    certificateImage:
      "assets/images/certifications/ccna-enterprise-networking-security-automation.webp",
    credentialId: "097a4cf2-2d16-442e-bf7b-4de48960f2f1",
    credentialUrl:
      "https://www.credly.com/badges/097a4cf2-2d16-442e-bf7b-4de48960f2f1/public_url",
  },
  {
    id: 5,
    num: "06",
    image: "assets/images/about/cisco.svg",
    title: "CCNA: Switching, Routing, and Wireless Essentials",
    provider: "Cisco Networking Academy",
    year: "Sep 2026",
    desc: "Completed the CCNA: Switching, Routing, and Wireless Essentials course through the Cisco Networking Academy, covering switching, routing, wireless networking, and network security fundamentals.",
    certificateImage:
      "assets/images/certifications/ccna-switching-routing-wireless-essentials.webp",
    credentialId: "cde0de1f-f6f5-4d28-9eef-2d4dd56ebef8",
    credentialUrl:
      "https://www.credly.com/badges/cde0de1f-f6f5-4d28-9eef-2d4dd56ebef8/public_url",
  },
  {
    id: 7,
    num: "07",
    image: "assets/images/about/cisco.svg",
    title: "CCNA: Introduction to Networks",
    provider: "Cisco Networking Academy",
    year: "Aug 2026",
    desc: "Completed the CCNA: Introduction to Networks course through the Cisco Networking Academy, building a foundation in network fundamentals, protocols, addressing, and network configuration.",
    certificateImage:
      "assets/images/certifications/ccna-introduction-to-networks.webp",
    credentialId: "b788b78f-bb04-46b1-a071-3fd1c1394e52",
    credentialUrl:
      "https://www.credly.com/badges/b788b78f-bb04-46b1-a071-3fd1c1394e52/public_url",
  },
  {
    id: 8,
    num: "08",
    image: "assets/images/about/amazonwebservices.svg",
    title: "Architecting Solutions on AWS",
    provider: "Amazon Web Services (AWS) & Coursera",
    year: "Aug 2026",
    desc: "Completed Architecting Solutions on AWS through AWS and Coursera, covering AWS architecture, cloud design principles, scalability, reliability, and cost optimization.",
  },
  {
    id: 9,
    num: "09",
    image: "assets/images/about/fortinet.svg",
    title: "FortiGate Administrator",
    provider: "Fortinet",
    year: "Aug 2026",
    desc: "Successfully completed the FortiGate Administrator course through Coursera with a 85.80% grade, gaining practical knowledge in FortiGate firewall administration, firewall policies, routing, VPNs, IPS, web filtering, application control, network monitoring, and network security.",
    credentialId: "QWCWYIKBDBIJ",
    credentialUrl:
      "https://www.coursera.org/account/accomplishments/verify/QWCWYIKBDBIJ",
  },
  {
    id: 10,
    num: "10",
    image: "assets/images/about/cisco.svg",
    title: "Network Fundamentals Specialization",
    provider: "Cisco",
    year: "Apr 2026",
    desc: "Developed a strong foundation in networking, including OSI models, VLANs, routing, network segmentation, access control, traffic forwarding, network management, troubleshooting, and network security.",
    credentialId: "N4VL30AWQBEV",
    credentialUrl:
      "https://www.coursera.org/verify/specialization/N4VL30AWQBEV",
  },
  {
    id: 11,
    num: "11",
    image: "assets/images/about/cisco.svg",
    title: "Network Management Approaches",
    provider: "Cisco",
    year: "Apr 2026",
    desc: "Gained practical knowledge of network management using SNMP, Cisco controllers, IOS CLI, and APIs, including monitoring, configuration, automation, troubleshooting, and performance optimization.",
  },
  {
    id: 12,
    num: "12",
    image: "assets/images/about/cisco.svg",
    title: "Network Security Principles",
    provider: "Cisco",
    year: "Apr 2026",
    desc: "Developed knowledge of ACLs, NAC, 802.1X, firewalls, VPNs, AAA, and RBAC for securing network access and controlling traffic.",
  },
  {
    id: 13,
    num: "13",
    image: "assets/images/about/coursera.svg",
    title: "Docker Basics for DevOps",
    provider: "KodeKloud",
    year: "Nov 2025",
    desc: "Gained foundational knowledge of Docker, containers, images, containerized development environments, and DevOps workflows.",
    credentialId: "HSKCH53IJNA4",
    credentialUrl:
      "https://www.coursera.org/account/accomplishments/verify/HSKCH53IJNA4",
  },
  {
    id: 14,
    num: "14",
    image: "assets/images/about/coursera.svg",
    title: "Jenkins for Beginners",
    provider: "KodeKloud",
    year: "Nov 2025",
    desc: "Developed foundational skills in Jenkins, CI/CD pipelines, automation, command-line tools, and DevOps practices.",
    credentialId: "3VRFAN555HBP",
    credentialUrl:
      "https://www.coursera.org/account/accomplishments/verify/3VRFAN555HBP",
  },
  {
    id: 15,
    num: "15",
    image: "assets/images/about/coursera.svg",
    title: "Git Basics for DevOps",
    provider: "KodeKloud",
    year: "Nov 2025",
    desc: "Gained practical knowledge of Git, GitHub, version control, branching, collaboration, and DevOps workflows.",
    credentialId: "HBTSO3JSUVEI",
    credentialUrl:
      "https://www.coursera.org/account/accomplishments/verify/HBTSO3JSUVEI",
  },
  {
    id: 16,
    num: "16",
    image: "assets/images/about/coursera.svg",
    title: "DevOps Prerequisite Course",
    provider: "KodeKloud",
    year: "Nov 2025",
    desc: "Built foundational knowledge of Linux, Ubuntu, command-line interfaces, and essential DevOps concepts.",
    credentialId: "F5Q1KGB29Y8T",
    credentialUrl:
      "https://www.coursera.org/account/accomplishments/verify/F5Q1KGB29Y8T",
  },
  {
    id: 17,
    num: "17",
    image: "assets/images/about/amazonwebservices.svg",
    title: "AWS Cloud Technical Essentials",
    provider: "Amazon Web Services (AWS)",
    year: "Sep 2025",
    desc: "Gained foundational knowledge of AWS cloud computing, including Amazon EC2, load balancing, cloud infrastructure, and core AWS services.",
    credentialId: "IGBQJ91LYQI6",
    credentialUrl:
      "https://www.coursera.org/account/accomplishments/verify/IGBQJ91LYQI6",
  },
];

export default function CertificationsArea() {
  return (
    <>
      <section id="certifications" className="services-area">
        <div className="container">
          <div className="row">
            <div className="col-xl-12 col-lg-12">
              <div className="section-title section-black-title wow fadeInUp delay-0-2s">
                <h2>Licenses &amp; Certifications</h2>
              </div>
            </div>
          </div>
          <div className="row">
            {certifications.map((item) => (
              <div key={item.id} className="col-lg-4 col-md-6">
                <div className="service-item wow fadeInUp delay-0-2s">
                  {item.certificateImage && (
                    <Image
                      src={`/${item.certificateImage}`}
                      alt={`${item.title} certificate`}
                      width={600}
                      height={400}
                      unoptimized
                      loading="lazy"
                      decoding="async"
                      sizes="(max-width: 768px) 100vw, 33vw"
                      style={{
                        width: "100%",
                        height: "auto",
                        borderRadius: "8px",
                        marginBottom: "12px",
                      }}
                    />
                  )}
                  <h4>{item.title}</h4>
                  <p>
                    <strong>{item.provider}</strong> &middot; {item.year}
                    <br />
                    {item.desc}
                    {item.credentialId && (
                      <>
                        <br />
                        <strong>Credential ID:</strong> {item.credentialId}
                      </>
                    )}
                  </p>
                  {item.credentialId && (
                    <a
                      href={item.credentialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="portfolio-btn portfolio-btn-primary"
                      style={{ marginTop: "10px" }}
                    >
                      <i className="ri-verified-badge-line"></i> View Credential
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
