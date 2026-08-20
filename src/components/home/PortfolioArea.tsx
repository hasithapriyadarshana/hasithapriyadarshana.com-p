"use client"
import Image, { StaticImageData } from 'next/image';
import React, { useState } from 'react'

import portfolio_img_2 from "@/assets/images/projects/work2.png";
import portfolio_img_3 from "@/assets/images/projects/work3.png";
import portfolio_img_4 from "@/assets/images/projects/work4.png";
import portfolio_img_5 from "@/assets/images/projects/work7.png";
import portfolio_img_6 from "@/assets/images/projects/work6.png";

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
    desc: "A modern personal portfolio website built with Next.js, React, and TypeScript, featuring responsive design, smooth GSAP animations, interactive components, project showcases, galleries, and optimized media.",
    category: "personal",
    github: "https://github.com/hasithapriyadarshana/my-portfolio-next",
    live: "https://hasithapriyadarshana.com",
  },
  {
    id: 2,
    imgPath: "assets/images/projects/bismarklanka-hasithapriyadarshana.gif",
    title: "Bismark Lanka Engineering",
    desc: "At Bismark Lanka Engineering, we take pride in being the leading provider of top-notch construction services, offering the best customized designs to suit our clients' unique needs. With over 18 years of experience in the industry.",
    category: "freelance",
    live: "https://bismarklanka.lk/",
  },
  {
    id: 3,
    image: portfolio_img_3,
    title: "B.O.S.S Conveyancing",
    desc: "B.O.S.S Conveyancing (Buying Or Selling Statewide) is a professional conveyancing website designed for a trusted property settlement service based in St Albans, VIC. The website provides clear information about conveyancing services, helping clients confidently navigate the process of buying and selling property across Victoria.",
    category: "personal",
    live: "#",
  },
  {
    id: 4,
    image: portfolio_img_4,
    title: "Travel Trek",
    desc: "Travel Trek is a modern travel website designed to help travelers discover exciting destinations, explore travel experiences, and plan memorable journeys. The website features a clean and responsive design with destination showcases, travel information, engaging visuals, and user-friendly navigation.",
    category: "freelance",
    live: "#",
  },
  {
    id: 5,
    image: portfolio_img_5,
    title: "Alfrieda Conveyancing",
    desc: "Alfrieda Conveyancing is a professional conveyancing website designed to provide clear and reliable property settlement services for clients buying or selling property. The website presents the company's services, expertise, and professional approach while providing an easy way for clients to learn more and get in touch.",
    category: "freelance",
    live: "#",
  },
  {
    id: 6,
    image: portfolio_img_6,
    title: "Cambridge College of Linguistics & Education",
    desc: "Cambridge College of Linguistics & Education is a modern educational website built to showcase Sri Lanka's premier language learning institution. The website provides information about language programmes, courses, educational services, and learning opportunities through a clean, responsive, and user-friendly design.",
    category: "freelance",
    live: "#",
  },
];

const categories = [
  { key: "all", label: "All" },
  { key: "personal", label: "Personal" },
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
          <img src="assets/images/custom/work-scribble.svg" alt="custom" width={238} height={131} />
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
                      <img src={item.imgPath} alt={`${item.title} — developed by Hasitha Priyadarshana`} width={648} height={420} loading="lazy" style={{ width: "100%", height: "auto" }} />
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
