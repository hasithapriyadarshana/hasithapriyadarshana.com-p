import React from "react";
import Count from "../common/Count";

const counter_data = [
  {
    id: 1,
    title: "Years Of Experience",
    count: 4,
    cls: "plus",
  },
  {
    id: 2,
    title: "Freelance Projects",
    count: 50,
    cls: "plus",
  },
  {
    id: 3,
    title: "Client Base",
    count: 30,
    cls: "plus",
  },
  {
    id: 4,
    title: "Certifications",
    count: 14,
    cls: "plus",
  },
];

export default function AboutArea() {
  return (
    <>
      <section id="about" className="about-area">
        <div className="container">
          <div className="row">
            <div className="col-lg-3 col-sm-3">
              <h2 className="about-pre-title">About Me</h2>
            </div>
            <div className="col-lg-9 col-sm-9">
              <div className="about-content-part wow fadeInUp delay-0-2s">
                <p>
                  I&apos;m <strong>Hasitha Priyadarshana</strong>, a Bachelor of ICT
                  (Hons) undergraduate specializing in <strong>Network Technology</strong> at
                  the University of Sri Jayewardenepura.
                </p>
                <p style={{ marginTop: "15px" }}>
                  My technology journey started with graphic design and gradually
                  developed into web development, networking, cybersecurity, cloud
                  computing, and IoT. Today, I combine academic knowledge with
                  practical project experience to build useful and reliable technology
                  solutions.
                </p>
                <p style={{ marginTop: "15px" }}>
                  As the founder of <strong>HyperX Innovations</strong>, I work on web
                  and IT projects while continuing to develop my expertise in network
                  engineering and cybersecurity. My long-term goal is to build a career
                  in <strong>Network Engineering and Cybersecurity</strong>, with a focus
                  on secure infrastructure, enterprise networks, cloud technologies,
                  and innovative technology solutions.
                </p>
              </div>
              <div className="hero-counter-area d-flex justify-content-between wow fadeInUp delay-0-4s">
                {counter_data.map((item, i) => (
                  <div key={i} className="counter-item counter-text-wrap">
                    <span className={`count-text ${item.cls}`}>
                      <Count number={item.count} />
                    </span>
                    <span className="counter-title">{item.title}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
