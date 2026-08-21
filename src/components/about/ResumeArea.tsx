"use client";
import React, { useEffect, useRef, useState } from "react";

interface TimelineDescProps {
  html: string;
  id: string;
  expandedId: string | null;
  setExpandedId: (id: string | null) => void;
}

function TimelineDesc({ html, id, expandedId, setExpandedId }: TimelineDescProps) {
  const expanded = expandedId === id;
  const [overflowing, setOverflowing] = useState(false);
  const ref = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (el) {
      setOverflowing(el.scrollHeight > el.clientHeight + 1);
    }
  }, []);

  return (
    <>
      <p
        ref={ref}
        className={`timeline-desc${expanded ? "" : " desc-clamp"}`}
        dangerouslySetInnerHTML={{ __html: html }}
      />
      {overflowing && (
        <span
          className="desc-toggle"
          onClick={() => setExpandedId(expanded ? null : id)}
        >
          {expanded ? "See less" : "See more..."}
        </span>
      )}
    </>
  );
}

const work_data = [
  {
    id: 1,
    image: "assets/images/about/hyperx.svg",
    date: "2023 - Present",
    title: "Founder",
    company: "HyperX Innovations",
    desc: "Founded <strong>HyperX Innovations in 2023</strong> to provide professional web solutions using <strong>WordPress, WooCommerce, and custom web development</strong>. Since then, I have successfully completed <strong>20+ projects</strong> for clients across <strong>Sri Lanka, India, Australia, the USA, Italy, New Zealand, England, and other countries</strong>. Through these projects, I have gained valuable experience in web development, WordPress solutions, e-commerce development, client communication, project management, and understanding different business requirements. HyperX Innovations has given me the opportunity to work with diverse clients, solve real-world problems, and continuously improve my technical and professional skills.",
    proofs: [],
  },
  {
    id: 2,
    image: "assets/images/about/fiverr.svg",
    date: "2024 Jan - Present",
    title: "Level 1 Freelancer",
    company: "Fiverr",
    desc: "Provide professional web development and website solutions through Fiverr, specializing in <strong>WordPress, WooCommerce, custom development with React.js and Next.js, website migrations, customization, and business websites</strong>. Successfully served <strong>20+ clients and completed 50+ projects</strong>, receiving consistently positive reviews and achieving a <strong>4.9/5 average rating</strong>. One of my gigs was also selected as a <strong>Fiverr's Choice</strong> gig. This experience has strengthened my skills in client communication, customer care, project management, requirement analysis, problem-solving, and delivering quality solutions to clients worldwide.",
    proofs: [],
  },
  {
    id: 3,
    image: "assets/images/about/fiverr.svg",
    date: "2023 Feb - 2024 Jan",
    title: "New Seller Freelancer",
    company: "Fiverr",
    desc: "I started my <strong>Fiverr journey shortly after completing my G.C.E. Advanced Level examination</strong>, creating my first account to offer <strong>WordPress web development services</strong>. As a new seller, I worked consistently and dedicated myself to completing projects successfully, regardless of the time or effort required. Through hard work, commitment, and continuous learning, I successfully completed <strong>7+ projects</strong> and fulfilled Fiverr's required criteria to become a <strong>Level One Freelancer</strong>. This journey helped me develop valuable experience in freelancing, client communication, project management, WordPress development, and delivering quality solutions to clients from different countries.",
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
    image: "assets/images/about/cisco.svg",
    date: "Currently Pursuing",
    title: "Official Cisco Networking Academy Program",
    company: "Southland Campus",
    desc: "Currently pursuing the <strong>Cisco Networking Academy CCNA program</strong> based on the <strong>CCNA 200-301 v1.1 syllabus</strong> through Southland Campus. The program covers <strong>CCNA 1 – Introduction to Networks</strong>, <strong>CCNA 2 – Switching, Routing & Wireless Essentials</strong>, and <strong>CCNA 3 – Enterprise Networking, Security & Automation</strong>. Through this program, I am developing practical knowledge of networking fundamentals, IP addressing, switching, routing, wireless technologies, network security, and enterprise network automation while strengthening my foundation in computer networking.",
    proofs: [],
  },
  {
    id: 2,
    image: "assets/images/about/hasithapriyadarshana-anandasastralaya-mathugama-asm-mathugama.svg",
    date: "2014 Jan - 2023 Feb",
    title: "G.C.E. O/L & A/L Education",
    company: "Ananda Sastralaya National School - Mathugama",
    desc: "Completed my secondary and Advanced Level education from <strong>Grade 6 to 13</strong> in the <strong>Technology Stream</strong>. Achieved <strong>9 A passes</strong> at the G.C.E. O/L examination, including Mathematics, Science, ICT, and English. At G.C.E. A/L, achieved <strong>3 A passes</strong> in Engineering Technology, Science for Technology, and ICT, with a <strong>Z-Score of 2.80</strong>, ranking <strong>2nd in the Kalutara District</strong> and <strong>32nd island-wide</strong>.",
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
    desc: "Successfully completed <strong>CryptX 2.0</strong>, the second edition of the first-ever and largest Tech Triathlon organized by a state university, which has become an unforgettable chapter in our university journey. Bringing together a <strong>Hackathon</strong>, <strong>Designathon</strong>, and <strong>CTF</strong>, the event provided an exciting platform for young innovators, developers, designers, and technology enthusiasts to challenge themselves, showcase their talents, and connect with one another. I am truly grateful to have been part of this incredible journey. Leading and working alongside such a passionate team has been one of the most meaningful experiences of my university life.",
    proofs: ["assets/images/proofs/hasithapriyadarshana-cryptx-1.jpg"],
  },
  {
    id: 2,
    image: "assets/images/about/csnds.svg",
    date: "2026 - Present",
    title: "Vice President – Innovation and Technology Solutions",
    company: "Career Skills Development Society (CSDS)",
    desc: "Proud to serve as the Vice President of Innovation and Technology Solutions of the 17th Executive Board of the Career Skills Development Society (CSDS), University of Sri Jayewardenepura. In this role, I contribute to the planning, coordination, and execution of innovative and technology-driven initiatives while supporting the society's overall objectives. I actively contribute to major CSDS initiatives and events, including Sneha Manudam, JESA, Touch The Peak, and other technology, career development, and community-focused projects. Through these initiatives, I work with the team to introduce innovative solutions, improve digital experiences, coordinate technical activities, and create a meaningful impact within CSDS and the University of Sri Jayewardenepura.",
    proofs: [],
  },
  {
    id: 3,
    image: "assets/images/about/ictsoc.svg",
    date: "Dec 2025 - Present",
    title: "Executive Committee - Media Division Coordinator",
    company: "ICT Society — University of Sri Jayewardenepura",
    desc: "Serving as an Executive Committee member responsible for coordinating the media division, supporting the society's technical events, workshops, hackathons, competitions, and technology awareness programmes through effective media coverage and content creation.",
    proofs: [],
  },
  {
    id: 4,
    image: "assets/images/about/ictsoc.svg",
    date: "May 2025 - Dec 2025",
    title: "Organizing Committee Member - Envision",
    company: "ICT Society — University of Sri Jayewardenepura",
    desc: "Contributed as an Organizing Committee member for Envision, supporting the planning and execution of the event and helping deliver a smooth and engaging experience for all participants.",
    proofs: [],
  },
  {
    id: 5,
    image: "assets/images/about/ictsoc.svg",
    date: "2025",
    title: "Most Outstanding Ambassador – AlgoAce 2.0",
    company: "IEEE CS Student Branch Chapter – University of Sri Jayewardenepura",
    desc: "Served as an Ambassador for AlgoAce 2.0, representing the ICTS – Information and Communication Technology Society and contributing to the promotion and success of the initiative. Supported student engagement, communication, and awareness activities while collaborating with the organizing team. Recognized as the <strong>Most Outstanding Ambassador of AlgoAce 2.0</strong> for outstanding contribution, commitment, and active involvement throughout the initiative.",
    proofs: [],
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
      const line = timeline.querySelector(
        ".timeline-line-progress",
      ) as HTMLElement;

      const windowHeight = window.innerHeight;

      const items = timeline.querySelectorAll(".timeline-item");
      const itemRects: DOMRect[] = [];
      items.forEach((item) => {
        itemRects.push(item.getBoundingClientRect());
      });

      const timelineRect = line ? timeline.getBoundingClientRect() : null;

      items.forEach((item, i) => {
        if (itemRects[i].top < windowHeight * 0.8) {
          item.classList.add("timeline-item-visible");
        }
      });

      if (line && timelineRect) {
        const scrolled = windowHeight * 0.75 - timelineRect.top;
        const progress = Math.min(Math.max(scrolled / timelineRect.height, 0), 1);
        line.style.height = `${progress * 100}%`;
      }
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
  const [expandedDesc, setExpandedDesc] = useState<string | null>(null);

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
                          <h2>{item.title}</h2>
                          <span className="timeline-company">
                            {item.company}
                          </span>
                          <span className="resume-date">{item.date}</span>
                          <TimelineDesc html={item.desc} id={`work-${item.id}`} expandedId={expandedDesc} setExpandedId={setExpandedDesc} />
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
                          <h2>{item.title}</h2>
                          <span className="timeline-company">
                            {item.company}
                          </span>
                          <span className="resume-date">{item.date}</span>
                          <TimelineDesc html={item.desc} id={`edu-${item.id}`} expandedId={expandedDesc} setExpandedId={setExpandedDesc} />
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
                            <h2>{item.title}</h2>
                            <span className="timeline-company">
                              {item.company}
                            </span>
                            <span className="resume-date">{item.date}</span>
                            <TimelineDesc html={item.desc} id={`vol-${item.id}`} expandedId={expandedDesc} setExpandedId={setExpandedDesc} />
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
