"use client"
import React from 'react'
import Image from 'next/image'
import { Meteors } from "@/components/ui/meteors"
import { Dock, DockIcon } from "@/components/ui/dock"
import { BorderBeam } from "@/components/ui/border-beam"
import { Ripple } from "@/components/ui/ripple"

export default function HeroArea() {
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
              <div className="hero-content wow fadeInUp text-center delay-0-2s">
                <h2>Hasitha Priyadarshana</h2>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-3 pt-30">
              <div className="hero-content wow fadeInUp delay-0-2s">
                <div className="flex justify-center">
                <Dock direction="middle" className="mb-2">
                  <DockIcon>
                    <a href="https://github.com/hasithapriyadarshana" target="_blank" rel="noopener noreferrer" aria-label="GitHub profile"><i className="ri-github-line text-2xl"></i></a>
                  </DockIcon>
                  <DockIcon>
                    <a href="https://www.linkedin.com/in/hasithapriyadarshana/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn profile"><i className="ri-linkedin-fill text-2xl"></i></a>
                  </DockIcon>
                  <DockIcon>
                    <a href="https://credly.com" target="_blank" rel="noopener noreferrer" aria-label="Credly certifications"><i className="ri-award-line text-2xl"></i></a>
                  </DockIcon>
                  <DockIcon>
                    <a href="mailto:chathasitha@gmail.com" aria-label="Send email"><i className="ri-mail-line text-2xl"></i></a>
                  </DockIcon>
                </Dock>
                </div>
                <p className="hero-avail-text">                <Image src="/assets/images/online.gif" alt="online" className="avail-icon" width={30} height={30} unoptimized />Available for internship and freelance projects</p>
                <p className="hero-info-text">
                  ICT Undergraduate in Network Technology (USJP) · <b>5 Star</b> Rating · <b>Level 1 Freelancer</b> in Fiverr · <b>Leading Volunteer</b> in USJP
                </p>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="hero-image">
                <Image src="/assets/images/about/me.svg" alt="Hasitha Priyadarshana — Network Technology & Web Developer" width={640} height={788} priority />
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
