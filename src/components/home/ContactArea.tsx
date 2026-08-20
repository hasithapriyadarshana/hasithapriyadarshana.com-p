
"use client"
import React, { useState } from 'react'
import dynamic from 'next/dynamic'

const ReCAPTCHA = dynamic(() => import('react-google-recaptcha'), { ssr: false })

export default function ContactArea() {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [service, setService] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!captchaToken) {
      alert('Please complete the reCAPTCHA.');
      return;
    }

    setStatus('sending');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, service, subject, message, captchaToken }),
      });

      if (response.ok) {
        setStatus('success');
        setName('');
        setEmail('');
        setService('');
        setSubject('');
        setMessage('');
        setCaptchaToken(null);
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };


  return (
    <>
      <section id="contact" className="contact-area">
        <div className="container">
          <div className="row">
            <div className="col-xl-12 col-lg-12">
              <div className="section-title section-black-title wow fadeInUp delay-0-2s">
                <h2>Let&apos;s Work Together</h2>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-4">
              <div className="contact-content-part  wow fadeInUp delay-0-2s">

                <div className="single-contact wow fadeInUp" data-wow-delay=".2s">
                  <span className="circle-btn">
                    <i className="ri-map-pin-line"></i>
                  </span>
                  <h2>Location</h2>
                  <p>Homagama, Sri Lanka</p>
                </div>

                <div className="single-contact wow fadeInUp" data-wow-delay=".4s">
                  <span className="circle-btn">
                    <i className="ri-mail-line"></i>
                  </span>
                  <h2>Email</h2>
                  <p>chathasitha@gmail.com</p>
                </div>

                <div className="single-contact wow fadeInUp" data-wow-delay=".5s">
                  <span className="circle-btn">
                    <i className="ri-phone-line"></i>
                  </span>
                  <h2>Call Now </h2>
                  <p>+94 77 129 27 40 </p>
                  <p>+94 71 48 10 405</p>
                </div>

                <div className="single-contact wow fadeInUp" data-wow-delay=".55s">
                  <span className="circle-btn">
                    <i className="ri-whatsapp-line"></i>
                  </span>
                  <h2>WhatsApp</h2>
                  <p><a href="https://wa.me/94771292740" target="_blank" rel="noopener noreferrer">+94 77 129 27 40</a></p>
                  <p><a href="https://wa.me/94714810405" target="_blank" rel="noopener noreferrer">+94 71 48 10 405</a></p>
                </div>

                <div className="single-contact wow fadeInUp" data-wow-delay=".6s">
                  <h2>Socials</h2>
                  <div className="about-social">
                    <ul>
                      <li><a target='_blank' href="https://linkedin.com"><i className="ri-linkedin-fill"></i></a></li>
                      <li><a target='_blank' href="https://github.com"><i className="ri-github-line"></i></a></li>
                      <li><a target='_blank' href="mailto:hasitha@hyperx.lk"><i className="ri-mail-line"></i></a></li>
                    </ul>
                  </div>
                </div>

              </div>
            </div>

            <div className="col-lg-8">
              <div className="contact-form contact-form-area wow fadeInUp delay-0-4s">
                <form id="contactForm" className="contact-form" onSubmit={handleSubmit}>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor="name">Full Name</label>
                        <input
                          type="text"
                          id="name"
                          className="form-control"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="Your name"
                          required
                          data-error="Please enter your Name"
                        />
                        <label htmlFor="name" className="for-icon"><i className="far fa-user"></i></label>
                        <div className="help-block with-errors"></div>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor="email">Email Address</label>
                        <input
                          type="email"
                          id="email"
                          className="form-control"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="your@email.com"
                          required
                          data-error="Please enter your Email"
                        />
                        <label htmlFor="email" className="for-icon"><i className="far fa-envelope"></i></label>
                        <div className="help-block with-errors"></div>
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="form-group">
                        <label htmlFor="service">Service Required</label>
                        <select
                          id="service"
                          className="form-control"
                          value={service}
                          onChange={(e) => setService(e.target.value)}
                          required
                          data-error="Please select a service"
                        >
                          <option value="" disabled>Select a service</option>
                          <option value="Network Solutions">Network Solutions</option>
                          <option value="Website Design">Website Design</option>
                          <option value="Website Maintenance">Website Maintenance</option>
                          <option value="Website Migration">Website Migration</option>
                          <option value="Social Media Marketing">Social Media Marketing</option>
                          <option value="WordPress Solutions">WordPress Solutions</option>
                          <option value="Other">Other</option>
                        </select>
                        <div className="help-block with-errors"></div>
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="form-group">
                        <label htmlFor="subject">Subject</label>
                        <input
                          type="text"
                          id="subject"
                          className="form-control"
                          value={subject}
                          onChange={(e) => setSubject(e.target.value)}
                          placeholder="Project inquiry"
                          required
                          data-error="Please enter your Subject"
                        />
                        <label htmlFor="subject" className="for-icon"><i className="far fa-user"></i></label>
                        <div className="help-block with-errors"></div>
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="form-group">
                        <label htmlFor="message">Your Message</label>
                        <textarea
                          name="message"
                          id="message"
                          className="form-control"
                          rows={4}
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                          placeholder="Tell me about your project, requirements, or idea..."
                          required
                          data-error="Please Write your Message"
                        ></textarea>
                        <div className="help-block with-errors"></div>
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="form-group mb-0" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <ReCAPTCHA
                          sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!}
                          onChange={(token) => setCaptchaToken(token)}
                        />
                        <button type="submit" className="theme-btn" disabled={status === 'sending'}>
                          {status === 'sending' ? 'Sending...' : 'Send Message'} <i className="ri-mail-line"></i>
                        </button>
                        <div id="msgSubmit" className="hidden"></div>
                      </div>
                    </div>
                    <div className="col-md-12 text-center">
                      {status === 'success' && (
                        <p className="input-success">We have received your mail, We will get back to you soon!</p>
                      )}
                      {status === 'error' && (
                        <p className="input-error">Sorry, Message could not send! Please try again.</p>
                      )}
                    </div>
                  </div>
                </form>
              </div>
            </div>

          </div>
        </div>
      </section>

    </>
  )
}
