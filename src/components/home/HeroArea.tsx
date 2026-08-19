"use client"
import React from 'react'
import confetti from 'canvas-confetti'
import { Meteors } from "@/components/ui/meteors"
import { Dock, DockIcon } from "@/components/ui/dock"
import { BorderBeam } from "@/components/ui/border-beam"
import { Ripple } from "@/components/ui/ripple"
import { SparklesText } from "@/components/ui/sparkles-text"

export default function HeroArea() {
  const handleImageClick = () => {
    const defaults = {
      spread: 360,
      ticks: 50,
      gravity: 0,
      decay: 0.94,
      startVelocity: 30,
      colors: ["#FFE400", "#FFBD00", "#E89400", "#FFCA6C", "#FDFFB8"],
    }

    const shoot = () => {
      confetti({
        ...defaults,
        particleCount: 40,
        scalar: 1.2,
        shapes: ["star"],
      })
      confetti({
        ...defaults,
        particleCount: 10,
        scalar: 0.75,
        shapes: ["circle"],
      })
    }

    setTimeout(shoot, 0)
    setTimeout(shoot, 100)
    setTimeout(shoot, 200)
  }
  return (
    <>
      <section id="home" className="main-hero-area" style={{ position: 'relative' }}>
        <div className="absolute inset-0 overflow-hidden">
          <Meteors number={30} />
          <Ripple mainCircleSize={300} mainCircleOpacity={0.15} numCircles={6} />
        </div>
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div className="row">
            <div className="col-lg-12">
                <SparklesText sparklesCount={15} colors={{ first: "#c9a84c", second: "#e4c76b" }} className="hero-content wow fadeInUp text-center delay-0-2s">
                  <h2>Hasitha Priyadarshana</h2>
                </SparklesText>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-3 pt-30">
              <div className="hero-content wow fadeInUp delay-0-2s">
                <Dock direction="middle" className="mb-2 max-md:mx-auto">
                  <DockIcon>
                    <a href="https://github.com/hasithapriyadarshana" target="_blank" rel="noopener noreferrer"><i className="ri-github-line text-xl"></i></a>
                  </DockIcon>
                  <DockIcon>
                    <a href="https://www.linkedin.com/in/hasithapriyadarshana/" target="_blank" rel="noopener noreferrer"><i className="ri-linkedin-fill text-xl"></i></a>
                  </DockIcon>
                  <DockIcon>
                    <a href="https://credly.com" target="_blank" rel="noopener noreferrer"><i className="ri-award-line text-xl"></i></a>
                  </DockIcon>
                  <DockIcon>
                    <a href="mailto:chathasitha@gmail.com"><i className="ri-mail-line text-xl"></i></a>
                  </DockIcon>
                </Dock>
                <h5 className="hero-avail-text"><span className="pulse-dot"></span>Available for internship and freelance projects</h5>
                <p className="hero-info-text">
                  ICT Undergraduate in Network Technology (USJP) · <b>5 Star</b> Rating · <b>Level 1 Freelancer</b> in Fiverr · <b>Leading Volunteer</b> in USJP
                </p>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="hero-image" onClick={handleImageClick} style={{ cursor: "pointer" }}>
                <img src="assets/images/about/me.svg" alt="" />
                <BorderBeam duration={6} size={400} className="from-transparent via-red-500 to-transparent" />
                <BorderBeam duration={6} delay={3} size={400} borderWidth={2} className="from-transparent via-blue-500 to-transparent" />
              </div>
            </div>
            <div className="col-lg-3 pt-30">
              <div className="hero-content wow fadeInUp delay-0-4s">
                <p style={{ marginTop: "10px" }}>
                  Network Technology Undergraduate &amp; Web Developer. Building secure
                  network solutions, modern web experiences, and practical technology
                  solutions. Available for freelance projects, internships, and
                  technology collaborations.
                </p>
                <a className="theme-btn" href="/contact">Get In Touch</a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
