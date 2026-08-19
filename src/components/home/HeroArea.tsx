"use client"
import React from 'react'
import { Particles } from "@/components/ui/particles"

export default function HeroArea() {
  return (
    <>
      <section id="home" className="main-hero-area" style={{ position: 'relative' }}>
        <div className="absolute inset-0 overflow-hidden">
          <Particles
            className="absolute inset-0"
            quantity={120}
            color="#c9a84c"
            size={1.5}
            staticity={30}
            ease={40}
            vx={0.1}
          />
        </div>
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div className="row">
            <div className="col-lg-12">
              <div className="hero-content wow fadeInUp text-center delay-0-2s">
                <h2>Hasitha Priyadarshana </h2>
              
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-3 pt-30">
              <div className="hero-content wow fadeInUp delay-0-2s">
                <div className="hero-social-icons">
                  <a href="https://github.com/hasithapriyadarshana" target="_blank" rel="noopener noreferrer"><i className="ri-github-line"></i></a>
                  <a href="https://www.linkedin.com/in/hasithapriyadarshana/" target="_blank" rel="noopener noreferrer"><i className="ri-linkedin-fill"></i></a>
                  <a href="https://credly.com" target="_blank" rel="noopener noreferrer"><i className="ri-award-line"></i></a>
                  <a href="mailto:chathasitha@gmail.com"><i className="ri-mail-line"></i></a>
                </div>
                <p className="hero-info-text">
                  ICT Undergraduate in Network Technology (USJP) · <b>5 Star</b> Rating · <b>Level 1 Freelancer</b> in Fiverr · <b>Leading Volunteer</b> in USJP
                </p>
                <p className="hero-avail-text">Available for internship and freelance projects</p>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="hero-image">
                <img src="assets/images/about/me.svg" alt="" />
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
