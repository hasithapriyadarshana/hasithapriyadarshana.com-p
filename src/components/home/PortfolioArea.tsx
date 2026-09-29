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
  github?: string;
  live?: string;
}

const portfolio_data: DataType[] = [
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
                    {item.imgPath ? (
                      <Image src={item.imgPath.startsWith('/') ? item.imgPath : `/${item.imgPath}`} alt={`${item.title} — developed by Hasitha Priyadarshana`} width={648} height={420} unoptimized style={{ width: "100%", height: "auto" }} />
                    ) : (
                      <Image src={item.image!} alt={item.title} style={{ height: "auto", width: "100%" }} />
                    )}
                  </div>
                  <div className="portfolio-card-content">
                    <h4>{item.title}</h4>
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
