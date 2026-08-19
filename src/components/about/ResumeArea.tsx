"use client";
import React, { useEffect, useRef } from "react";

const work_data = [
  {
    id: 1,
    image: "assets/images/about/hyperx.svg",
    date: "2023 - Present",
    title: "Founder",
    company: "HyperX Innovations",
    desc: "Founded HyperX Innovations to provide professional web development, WordPress solutions, and technology services to businesses and individuals. Responsible for project planning, website and WordPress development, custom WordPress solutions, client communication, technical implementation, and overall business operations.",
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
    desc: "Provide professional website design and development services to clients through Fiverr, specializing in WordPress website development, business websites, landing pages, UI improvements, website customization, and other web solutions, with 20+ clients served, 50+ projects completed, a 100% response rate, and a 4.9/5 average rating.",
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
    date: "May 2024 – May 2028",
    title: "Bachelor of ICT (Honours) – Network Technology",
    company: "Faculty of Technology, University of Sri Jayewardenepura",
    desc: "Pursuing a four-year BICT (Honours) degree specializing in Network Technology, with a focus on networking, cybersecurity, cloud computing, software development, databases, and emerging technologies. The program develops practical and theoretical ICT skills to prepare graduates for professional careers in computing and information technology.",
    proofs: [
      "assets/images/proofs/hasithapriyadarshana-usjp-1.png",
      "assets/images/proofs/hasithapriyadarshana-usjp-2.png",
      "assets/images/proofs/hasithapriyadarshana-usjp-3.png",
      "assets/images/proofs/hasithapriyadarshana-usjp-4.jpg"
    ],
  },
  {
    id: 2,
    image: "assets/images/about/hasithapriyadarshana-anandasastralaya-mathugama-asm-mathugama.svg",
    date: "2014 Jan - 2023 Feb",
    title: "G.C.E. O/L & A/L Education",
    company: "Ananda Sastralaya National School - Mathugama",
    desc: "Completed secondary and Advanced Level education (From Grade 6 to 13) in the Technology Stream, achieving 9 A passes at G.C.E. O/L, including Mathematics, Science, ICT, and English. At G.C.E. A/L, achieved 3 A passes in Engineering Technology, Science for Technology, and ICT, with a Z-Score of 2.80, ranking 2nd in the Kalutara District and 32nd island-wide.",
    proofs: ["assets/images/proofs/hasithapriyadarshana-asm-ananda sastralaya.png",
      "assets/images/proofs/hasithapriyadarshana-asm-ananda sastralaya-1.png"
    ],
  },
  {
    id: 3,
    image: "assets/images/about/Hasitha priyadarshana - Weediyabandara National School Morapitiya.svg",
    date: "2009 Jan - 2013 Dec",
    title: "Primary Education",
    company: "Weediyabandara National School -Morapitiya",
    desc: "Completed primary education from Grade 1 to Grade 5, building a strong foundation in core subjects, communication, mathematics, and general knowledge. Successfully passed the Grade 5 Scholarship Examination with 163 marks, demonstrating consistent academic performance and a strong commitment to learning from an early stage.",
    proofs: ["assets/images/proofs/Hasitha priyadarshana - Weediyabandara National School Morapitiya-1.png",
      "assets/images/proofs/Hasitha priyadarshana - Weediyabandara National School Morapitiya-2.png"],
  },
];

const volunteer_data = [
  {
    id: 1,
    image: "assets/images/about/cryptx.svg",
    date: "2025 - Present",
    title: "Project Co-Chairperson",
    company: "CryptX 2.0- ICT Society",
    desc: "Contributing to the planning and coordination of a university-level cybersecurity event featuring technical competitions, CTF challenges, knowledge-sharing sessions, and industry-focused activities.",
    proofs: ["assets/images/proofs/cryptx-1.jpg"],
  },
  {
    id: 2,
    image: "assets/images/about/csnds.svg",
    date: "2026 - Present",
    title: "Vice President",
    company: "Career Skills Development Society",
    desc: "Supporting professional development initiatives for university students through workshops, career programmes, industry engagement, and networking opportunities.",
    proofs: ["assets/images/proofs/csnds-1.jpg"],
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
    proofs: ["assets/images/proofs/touchpeak-1.jpg"],
  },
];

function ProofImages({
  proofs,
  company,
}: {
  proofs: string[];
  company: string;
}) {
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

      const line = timeline.querySelector(
        ".timeline-line-progress",
      ) as HTMLElement;
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
                          <span className="timeline-company">
                            {item.company}
                          </span>
                          <p>{item.desc}</p>
                          <ProofImages
                            proofs={item.proofs}
                            company={item.company}
                          />
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
                          <span className="timeline-company">
                            {item.company}
                          </span>
                          <p>{item.desc}</p>
                          <ProofImages
                            proofs={item.proofs}
                            company={item.company}
                          />
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
              <div
                className="timeline-section wow fadeInUp delay-0-2s"
                style={{ paddingTop: "60px" }}
              >
                <h3 className="timeline-title">
                  <i className="fas fa-hands-helping"></i>
                  Volunteering Experience
                </h3>
                <p className="timeline-subtitle">
                  Active leadership, technical management, and community
                  initiative positions I&apos;ve held across societies and tech
                  organizations.
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
                            <span className="timeline-company">
                              {item.company}
                            </span>
                            <p>{item.desc}</p>
                            <ProofImages
                              proofs={item.proofs}
                              company={item.company}
                            />
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
