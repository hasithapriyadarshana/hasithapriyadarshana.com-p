"use client"
import React, { useEffect, useRef } from "react";

const work_data = [
  {
    id: 1,
    image: "assets/images/about/hyperx.svg",
    date: "2023 - Present",
    title: "Founder & CEO",
    company: "HyperX Innovations",
    desc: "Founded HyperX Innovations to provide web development and technology solutions to businesses and individuals. Responsible for project planning, development, client communication, technical implementation, and business operations.",
    proofs: [
      "assets/images/proofs/hyperx-1.jpg",
      "assets/images/proofs/hyperx-2.jpg",
    ],
  },
  {
    id: 2,
    image: "assets/images/about/fiverr.svg",
    date: "2023 - Present",
    title: "Level 1 Freelancer",
    company: "Fiverr",
    desc: "Provide website design and development services to clients through Fiverr. Work on business websites, WordPress projects, landing pages, UI improvements, and other web-related solutions.",
    proofs: [
      "assets/images/proofs/fiverr-1.jpg",
      "assets/images/proofs/fiverr-2.jpg",
    ],
  },
  {
    id: 3,
    image: "assets/images/about/freelance.svg",
    date: "2018 - 2022",
    title: "Freelance Graphic Designer",
    company: "Independent",
    desc: "Started my professional journey by providing graphic design services for individuals and businesses. Worked on visual identities, logos, promotional materials, and digital content.",
    proofs: [],
  },
];

const education_data = [
  {
    id: 1,
    image: "assets/images/about/usjp.svg",
    date: "2024 - 2028",
    title: "Bachelor of ICT (Hons) — Network Technology",
    company: "University of Sri Jayewardenepura",
    desc: "Pursuing a four-year Bachelor of ICT (Honours) degree with a focus on networking, cybersecurity, cloud computing, software development, databases, and emerging technologies.",
    proofs: [
      "assets/images/proofs/usjp-1.jpg",
      "assets/images/proofs/usjp-1.jpg"
    ],
  },
  {
    id: 2,
    image: "assets/images/about/ananda.svg",
    date: "2014 - 2023",
    title: "Secondary & Advanced Level Education",
    company: "Ananda Sastralaya National School",
    desc: "Completed secondary and Advanced Level education in the Technology Stream, developing a strong foundation in technology and information communication.",
    proofs: [
      "assets/images/proofs/ananda-1.jpg",
    ],
  },
  {
    id: 3,
    image: "assets/images/about/weediyabandara.svg",
    date: "2009 - 2013",
    title: "Primary Education",
    company: "Weediyabandara M.V., Morapitiya",
    desc: "Completed primary education and successfully passed the Grade 5 Scholarship Examination.",
    proofs: [],
  },
];

const volunteer_data = [
  {
    id: 1,
    image: "assets/images/about/cryptx.svg",
    date: "2025 - Present",
    title: "Co-Chair",
    company: "CryptX 2.0",
    desc: "Contributing to the planning and coordination of a university-level cybersecurity event featuring technical competitions, CTF challenges, knowledge-sharing sessions, and industry-focused activities.",
    proofs: [
      "assets/images/proofs/cryptx-1.jpg",
    ],
  },
  {
    id: 2,
    image: "assets/images/about/csnds.svg",
    date: "2026 - Present",
    title: "Vice President",
    company: "Career Skills Development Society",
    desc: "Supporting professional development initiatives for university students through workshops, career programmes, industry engagement, and networking opportunities.",
    proofs: [
      "assets/images/proofs/csnds-1.jpg",
    ],
  },
  {
    id: 3,
    image: "assets/images/about/ictsoc.svg",
    date: "2024 - Present",
    title: "Member",
    company: "ICT Society — University of Sri Jayewardenepura",
    desc: "Participating in technical events, workshops, hackathons, competitions, and technology awareness programmes.",
    proofs: [],
  },
  {
    id: 4,
    image: "assets/images/about/touchpeak.svg",
    date: "2025",
    title: "Participant",
    company: "Touch The Peak",
    desc: "Participated in a university leadership and personal development programme focused on professional growth, teamwork, and leadership skills.",
    proofs: [
      "assets/images/proofs/touchpeak-1.jpg",
    ],
  },
];

function ProofImages({ proofs, company }: { proofs: string[]; company: string }) {
  if (!proofs || proofs.length === 0) return null;
  return (
    <div className="timeline-proofs">
      {proofs.map((src, i) => (
        <div key={i} className="timeline-proof-thumb">
          <img src={src} alt={`${company} proof ${i + 1}`} />
        </div>
      ))}
    </div>
  );
}

function TimelineProgress({ children }: { children: React.ReactNode }) {
  const timelineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timeline = timelineRef.current;
    if (!timeline) return;

    const handleScroll = () => {
      const items = timeline.querySelectorAll(".timeline-item");
      items.forEach((item) => {
        const rect = item.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        if (rect.top < windowHeight * 0.8) {
          item.classList.add("timeline-item-visible");
        }
      });

      const line = timeline.querySelector(".timeline-line-progress") as HTMLElement;
      if (!line) return;
      const timelineRect = timeline.getBoundingClientRect();
      const timelineTop = timelineRect.top;
      const timelineHeight = timelineRect.height;
      const windowHeight = window.innerHeight;
      const scrolled = windowHeight * 0.75 - timelineTop;
      const progress = Math.min(Math.max(scrolled / timelineHeight, 0), 1);
      line.style.height = `${progress * 100}%`;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="timeline" ref={timelineRef}>
      <div className="timeline-line-progress"></div>
      {children}
    </div>
  );
}

export default function ResumeArea() {
  return (
    <>
      <div className="resume-area no-padding" id="resume">
        <div className="container">
          <div className="row">
            {/* Work Experience */}
            <div className="col-xl-6 col-md-6">
              <div className="timeline-section wow fadeInUp delay-0-2s">
                <h3 className="timeline-title">
                  <i className="fas fa-briefcase"></i>
                  Work Experience
                </h3>
                <TimelineProgress>
                  {work_data.map((item) => (
                    <div key={item.id} className="timeline-item">
                      <div className="timeline-dot"></div>
                      <div className="timeline-item-inner">
                        <div className="timeline-logo">
                          <img src={item.image} alt={item.company} />
                        </div>
                        <div className="timeline-content">
                          <span className="resume-date">{item.date}</span>
                          <h2>{item.title}</h2>
                          <span className="timeline-company">{item.company}</span>
                          <p>{item.desc}</p>
                          <ProofImages proofs={item.proofs} company={item.company} />
                        </div>
                      </div>
                    </div>
                  ))}
                </TimelineProgress>
              </div>
            </div>

            {/* Education */}
            <div className="col-xl-6 col-md-6">
              <div className="timeline-section wow fadeInUp delay-0-4s">
                <h3 className="timeline-title">
                  <i className="fas fa-graduation-cap"></i>
                  Education
                </h3>
                <TimelineProgress>
                  {education_data.map((item) => (
                    <div key={item.id} className="timeline-item">
                      <div className="timeline-dot"></div>
                      <div className="timeline-item-inner">
                        <div className="timeline-logo">
                          <img src={item.image} alt={item.company} />
                        </div>
                        <div className="timeline-content">
                          <span className="resume-date">{item.date}</span>
                          <h2>{item.title}</h2>
                          <span className="timeline-company">{item.company}</span>
                          <p>{item.desc}</p>
                          <ProofImages proofs={item.proofs} company={item.company} />
                        </div>
                      </div>
                    </div>
                  ))}
                </TimelineProgress>
              </div>
            </div>
          </div>

          {/* Volunteering Experience */}
          <div className="row">
            <div className="col-xl-12">
              <div className="timeline-section wow fadeInUp delay-0-2s" style={{ paddingTop: "60px" }}>
                <h3 className="timeline-title">
                  <i className="fas fa-hands-helping"></i>
                  Volunteering Experience
                </h3>
                <p className="timeline-subtitle">
                  Active leadership, technical management, and community initiative
                  positions I&apos;ve held across societies and tech organizations.
                </p>
                <TimelineProgress>
                  <div className="timeline-full">
                    {volunteer_data.map((item) => (
                      <div key={item.id} className="timeline-item">
                        <div className="timeline-dot"></div>
                        <div className="timeline-item-inner">
                          <div className="timeline-logo">
                            <img src={item.image} alt={item.company} />
                          </div>
                          <div className="timeline-content">
                            <span className="resume-date">{item.date}</span>
                            <h2>{item.title}</h2>
                            <span className="timeline-company">{item.company}</span>
                            <p>{item.desc}</p>
                            <ProofImages proofs={item.proofs} company={item.company} />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </TimelineProgress>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
