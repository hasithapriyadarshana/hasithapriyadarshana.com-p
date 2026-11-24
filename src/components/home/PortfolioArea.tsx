"use client"
import Image, { StaticImageData } from 'next/image';
import React, { useState } from 'react'

interface DataType {
  id: number;
  image?: StaticImageData;
  imgPath?: string;
  title: string;
  desc: string;
  category: string;
  date?: string;
  github?: string;
  live?: string;
}

const portfolio_data: DataType[] = [
  {
    id: 8,
    imgPath: "assets/images/projects/Enterprise Network Monitoring Using Zabbix.webp",
    title: "Enterprise Network Monitoring Using Zabbix",
    desc: "Implemented a centralized network monitoring solution using Zabbix on VirtualBox, monitoring a GNS3 topology with 2 routers, 2 switches, and 4 PCs. Configured SNMP-based monitoring to track device availability, bandwidth, CPU, and memory utilization, with custom triggers and automated alerts for network issues.",
    category: "networking",
    date: "Nov 2026 - Ongoing",
    github: "https://github.com/hasithapriyadarshana/EnterpriseNetworkMonitoringUsingZabbix",
  },
  {
    id: 7,
    imgPath: "assets/images/projects/FortiGate Firewall Configuration Project.webp",
    title: "FortiGate Firewall Configuration Project",
    desc: "Configured and secured a virtual network using GNS3, FortiGate Firewall, and Oracle VirtualBox, implementing firewall policies, DHCP, static routing, and NAT. Gained hands-on experience in network security, traffic monitoring, firewall troubleshooting, and configuration management using FortiView and FortiOS CLI.",
    category: "networking",
    date: "Nov 2026",
    github: "https://github.com/hasithapriyadarshana/Fortigate-Firewall-Project",
  },
  {
    id: 9,
    imgPath: "assets/images/projects/Hospital Network Design with Cisco Packet Tracer.webp",
    title: "Hospital Network Design with Cisco Packet Tracer",
    desc: "Designed a hospital network connecting 4 buildings using 17 VLANs for departmental segmentation. Configured inter-VLAN routing, HSRP gateway redundancy, and 3 centralized services (DHCP, DNS, HTTP) using Cisco Packet Tracer.",
    category: "networking",
    date: "Oct 2026",
    github: "https://github.com/hasithapriyadarshana/HospitalNetworkPlan",
  },
  {
    id: 1,
    imgPath: "assets/images/projects/Hasithapriyadarshana-portfolio.gif",
    title: "HasithaPriyadarshana.com",
    desc: "HasithaPriyadarshana.com is a modern portfolio website built with Next.js, React.js, and TypeScript. It showcases professional skills, projects, services, and achievements with responsive design, GSAP animations, interactive components, galleries, and optimized media. The project demonstrates expertise in modern frontend development, UI design, performance optimization, SEO, and personal branding.",
    category: "university",
    github: "https://github.com/hasithapriyadarshana/my-portfolio-next",
    live: "https://hasithapriyadarshana.com",
  },
  {
    id: 2,
    imgPath: "assets/images/projects/bismarklanka-hasithapriyadarshana.gif",
    title: "Bismark Lanka Engineering",
    desc: "Bismark Lanka Engineering is a professional corporate website developed for a construction and engineering company. It showcases the company's services, expertise, customized designs, and industry experience through a clean responsive interface. The project focuses on professional branding, usability, responsive design, content organization, and creating a strong digital presence.",
    category: "freelance",
    live: "https://bismarklanka.lk/",
  },
  {
    id: 3,
    imgPath: "assets/images/projects/bossconveynacong.gif",
    title: "B.O.S.S Conveyancing",
    desc: "B.O.S.S Conveyancing is a professional website for a property settlement service based in St Albans, Victoria. The website provides clear information about conveyancing services and property transactions through responsive layouts, intuitive navigation, and structured content. The project focuses on professional branding, user experience, accessibility, and effective service presentation.",
    category: "freelance",
    live: "https://bossconveyancing.com/",
  },
  {
    id: 4,
    imgPath: "assets/images/projects/courtx.gif",
    title: "CourtX - Court Management System",
    desc: "CourtX is a full-stack court management platform built with React.js, Node.js, Express.js, SQLite, and JWT authentication. It supports secure case filing, records management, hearing scheduling, authentication, and role-based access control. The project demonstrates practical skills in full-stack development, REST APIs, database integration, security, and application architecture.",
    category: "university",
    github: "https://github.com/Manula-Laksika/CourtX-frontend/",
    live: "https://court-x-three.vercel.app/",
  },
  {
    id: 5,
    imgPath: "assets/images/projects/alfriedaconveyancing.gif",
    title: "Alfrieda Conveyancing",
    desc: "Alfrieda Conveyancing is a professional website developed to present property settlement services for clients buying or selling property. It features responsive layouts, clear service information, intuitive navigation, and contact sections. The project focuses on professional branding, user-friendly design, accessibility, and presenting business information effectively across desktop and mobile devices.",
    category: "freelance",
    live: "https://alfrieda.com.au/",
  },
  {
    id: 6,
    imgPath: "assets/images/projects/carsnowrentals.gif",
    title: "Cars Now Rentals",
    desc: "Cars Now Rentals is a professional website developed for an accident management and vehicle rental service. It presents replacement vehicle services, accident support, and important customer information through a clean responsive interface. The project demonstrates skills in responsive web development, service-focused UX, content organization, professional branding, and business website development.",
    category: "freelance",
    live: "https://carsnowrentals.com.au/",
  },
];

function ProjectThumb({ item }: { item: DataType }) {
  const raw = item.imgPath
    ? item.imgPath.startsWith("/")
      ? item.imgPath
      : `/${item.imgPath}`
    : null;
  const isGif = !!raw && raw.toLowerCase().endsWith(".gif");
  const poster = isGif && raw ? raw.replace(/\.gif$/i, "-poster.webp") : raw;
  const [hovered, setHovered] = useState(false);

  if (!raw) {
    return (
      <Image
        src={item.image!}
        alt={item.title}
        style={{ height: "auto", width: "100%" }}
      />
    );
  }

  return (
    <div
      onMouseEnter={() => isGif && setHovered(true)}
      onMouseLeave={() => isGif && setHovered(false)}
      style={{ width: "100%" }}
    >
      <Image
        src={hovered ? raw : poster!}
        alt={`${item.title} — developed by Hasitha Priyadarshana`}
        width={648}
        height={420}
        unoptimized
        loading="lazy"
        decoding="async"
        sizes="(max-width: 768px) 100vw, 33vw"
        style={{ width: "100%", height: "auto" }}
      />
    </div>
  );
}

const categories = [
  { key: "all", label: "All" },
  { key: "freelance", label: "Freelance" },
  { key: "university", label: "University" },
  { key: "networking", label: "Networking" },
];

export default function PortfolioArea() {

  const [activeFilter, setActiveFilter] = useState("all");

  const filteredData = activeFilter === "all"
    ? portfolio_data
    : portfolio_data.filter((item) => item.category === activeFilter);

  return (
    <>
      <div className="projects-area" id="portfolio">
        <div className="custom-icon">
          <Image src="/assets/images/custom/work-scribble.svg" alt="custom" width={238} height={131} />
        </div>
        <div className="container">
          {/* Filter Tabs */}
          <div className="row mb-4">
            <div className="col-xl-12">
              <div className="portfolio-filter">
                {categories.map((cat) => (
                  <button
                    key={cat.key}
                    className={`filter-btn ${activeFilter === cat.key ? "active" : ""}`}
                    onClick={() => setActiveFilter(cat.key)}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Portfolio Grid */}
          <div className="row g-4">
            {filteredData.map((item) => (
              <div key={item.id} className="col-lg-4 col-md-6">
                <div className="portfolio-card wow fadeInUp delay-0-2s">
                  <div className="portfolio-card-image">
                    <ProjectThumb item={item} />
                  </div>
                  <div className="portfolio-card-content">
                    <h4>{item.title}</h4>
                    {item.date && <span className="portfolio-card-date">{item.date}</span>}
                    <p>{item.desc}</p>
                    <div className="portfolio-card-links">
                      {item.github && (
                        <a href={item.github} target="_blank" rel="noopener noreferrer" className="portfolio-btn">
                          <i className="ri-github-line"></i> GitHub
                        </a>
                      )}
                      {item.live && (
                        <a href={item.live} target="_blank" rel="noopener noreferrer" className="portfolio-btn portfolio-btn-primary">
                          <i className="ri-external-link-line"></i> Live Demo
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
