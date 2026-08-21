import React from "react";

const certifications = [
  {
    id: 1,
    num: "01",
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
    id: 2,
    num: "02",
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
    id: 3,
    num: "03",
    image: "assets/images/about/cisco.svg",
    title: "Network Management Approaches",
    provider: "Cisco",
    year: "Apr 2026",
    desc: "Gained practical knowledge of network management using SNMP, Cisco controllers, IOS CLI, and APIs, including monitoring, configuration, automation, troubleshooting, and performance optimization.",
  },
  {
    id: 4,
    num: "04",
    image: "assets/images/about/cisco.svg",
    title: "Network Security Principles",
    provider: "Cisco",
    year: "Apr 2026",
    desc: "Developed knowledge of ACLs, NAC, 802.1X, firewalls, VPNs, AAA, and RBAC for securing network access and controlling traffic.",
  },
  {
    id: 5,
    num: "05",
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
    id: 6,
    num: "06",
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
    id: 7,
    num: "07",
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
    id: 8,
    num: "08",
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
    id: 9,
    num: "09",
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
                  <h5>{item.num}</h5>
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
