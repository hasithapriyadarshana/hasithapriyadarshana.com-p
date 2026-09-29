
import React from 'react'
import Image from 'next/image'

const skills = [
  { name: "Next.js", icon: "nextjs" },
  { name: "React.js", icon: "reactjs" },
  { name: "JavaScript & TypeScript", icon: "javascript-typescript" },
  { name: "WordPress & WooCommerce", icon: "wordpress" },
  { name: "Node.js & Express.js", icon: "nodejs-express" },
  { name: "Networking & Network Security", icon: "networking-security" },
  { name: "Cisco Networking", icon: "cisco-networking" },
  { name: "FortiGate & Firewall Administration", icon: "fortinet" },
  { name: "Git & GitHub", icon: "git-github" },
  { name: "Docker & DevOps", icon: "docker-devops" },
  { name: "AWS & Cloud Computing", icon: "amazonwebservices" },
  { name: "UI/UX Design & Figma", icon: "figma" },
];

const delays = ["delay-0-2s", "delay-0-3s", "delay-0-4s", "delay-0-5s"];

export default function SkillArea() {
  return (
    <>
      <section id="skills" className="skill-area">
        <div className="container">
          <div className="container-inner">
            <div className="row">
              <div className="col-xl-12 col-lg-12">
                <div className="section-title section-black-title mb-40 wow fadeInUp delay-0-2s">
                  <h2>Professional Skills</h2>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-12">
                <div className="skill-items-wrap">
                  <div className="row">
                    {skills.map((skill, index) => (
                      <div key={skill.name} className="col-xl-3 col-lg-4 col-md-3 col-sm-4 col-6">
                        <div className={`skill-item wow fadeInUp ${delays[index % delays.length]}`}>
                          <Image src={`/assets/images/skills/${skill.icon}.svg`} alt={skill.name} width={55} height={55} />
                          <h5>{skill.name}</h5>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
