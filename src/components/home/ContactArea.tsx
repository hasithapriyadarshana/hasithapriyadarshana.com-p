
"use client"
import React, { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'

const ReCAPTCHA = dynamic(() => import('react-google-recaptcha'), { ssr: false })

const countryCodes = [
  { code: "+94", country: "LK" },
  { code: "+1", country: "US" },
  { code: "+44", country: "GB" },
  { code: "+91", country: "IN" },
  { code: "+61", country: "AU" },
  { code: "+49", country: "DE" },
  { code: "+33", country: "FR" },
  { code: "+81", country: "JP" },
  { code: "+86", country: "CN" },
  { code: "+971", country: "AE" },
  { code: "+966", country: "SA" },
  { code: "+977", country: "NP" },
  { code: "+880", country: "BD" },
  { code: "+960", country: "MV" },
  { code: "+65", country: "SG" },
  { code: "+60", country: "MY" },
  { code: "+66", country: "TH" },
  { code: "+62", country: "ID" },
  { code: "+63", country: "PH" },
  { code: "+82", country: "KR" },
  { code: "+39", country: "IT" },
  { code: "+34", country: "ES" },
  { code: "+31", country: "NL" },
  { code: "+46", country: "SE" },
  { code: "+47", country: "NO" },
  { code: "+45", country: "DK" },
  { code: "+358", country: "FI" },
  { code: "+41", country: "CH" },
  { code: "+43", country: "AT" },
  { code: "+32", country: "BE" },
  { code: "+48", country: "PL" },
  { code: "+420", country: "CZ" },
  { code: "+351", country: "PT" },
  { code: "+353", country: "IE" },
  { code: "+27", country: "ZA" },
  { code: "+234", country: "NG" },
  { code: "+254", country: "KE" },
  { code: "+20", country: "EG" },
  { code: "+212", country: "MA" },
  { code: "+55", country: "BR" },
  { code: "+52", country: "MX" },
  { code: "+54", country: "AR" },
  { code: "+56", country: "CL" },
  { code: "+57", country: "CO" },
  { code: "+51", country: "PE" },
  { code: "+64", country: "NZ" },
  { code: "+852", country: "HK" },
  { code: "+886", country: "TW" },
  { code: "+84", country: "VN" },
  { code: "+95", country: "MM" },
  { code: "+92", country: "PK" },
  { code: "+93", country: "AF" },
  { code: "+98", country: "IR" },
  { code: "+964", country: "IQ" },
  { code: "+972", country: "IL" },
  { code: "+90", country: "TR" },
  { code: "+7", country: "RU" },
  { code: "+380", country: "UA" },
  { code: "+421", country: "SK" },
  { code: "+386", country: "SI" },
  { code: "+381", country: "RS" },
  { code: "+382", country: "ME" },
  { code: "+385", country: "HR" },
  { code: "+387", country: "BA" },
  { code: "+389", country: "MK" },
  { code: "+355", country: "AL" },
  { code: "+370", country: "LT" },
  { code: "+371", country: "LV" },
  { code: "+372", country: "EE" },
];

function getFlagEmoji(countryCode: string): string {
  return countryCode
    .toUpperCase()
    .split('')
    .map((char) => String.fromCodePoint(0x1f1a5 + char.charCodeAt(0)))
    .join('');
}

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  service?: string;
  subject?: string;
  message?: string;
  captcha?: string;
}

export default function ContactArea() {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [countryCode, setCountryCode] = useState('+94');
  const [phone, setPhone] = useState('');
  const [service, setService] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [statusMessage, setStatusMessage] = useState('');
  const [errors, setErrors] = useState<FormErrors>({});

  useEffect(() => {
    fetch('https://ipapi.co/json/')
      .then((res) => res.json())
      .then((data) => {
        if (data && data.country_calling_code) {
          setCountryCode(data.country_calling_code);
        }
      })
      .catch(() => {});
  }, []);

  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!name.trim()) {
      newErrors.name = 'Please enter your name.';
    } else if (name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters.';
    }

    if (!email.trim()) {
      newErrors.email = 'Please enter your email.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Please enter a valid email address.';
    }

    if (!phone.trim()) {
      newErrors.phone = 'Please enter your phone number.';
    } else if (!/^\d{6,15}$/.test(phone.replace(/\s/g, ''))) {
      newErrors.phone = 'Please enter a valid phone number (6-15 digits).';
    }

    if (!service) {
      newErrors.service = 'Please select a service.';
    }

    if (!subject.trim()) {
      newErrors.subject = 'Please enter a subject.';
    } else if (subject.trim().length < 3) {
      newErrors.subject = 'Subject must be at least 3 characters.';
    }

    if (!message.trim()) {
      newErrors.message = 'Please enter your message.';
    } else if (message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters.';
    }

    if (!captchaToken) {
      newErrors.captcha = 'Please complete the reCAPTCHA.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validate()) return;

    setStatus('sending');
    setStatusMessage('');

    const fullPhone = phone ? `${countryCode} ${phone}` : '';

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, phone: fullPhone, service, subject, message, captchaToken }),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus('success');
        setStatusMessage('Message submitted successfully! We will get back to you soon.');
        setName('');
        setEmail('');
        setPhone('');
        setService('');
        setSubject('');
        setMessage('');
        setCaptchaToken(null);
        setErrors({});
      } else {
        setStatus('error');
        setStatusMessage(data.message || 'Failed to send message. Please try again.');
      }
    } catch {
      setStatus('error');
      setStatusMessage('Network error. Please check your connection and try again.');
    }
  };

  const clearError = (field: keyof FormErrors) => {
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
    if (status === 'error') {
      setStatus('idle');
      setStatusMessage('');
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
                <form id="contactForm" className="contact-form" onSubmit={handleSubmit} noValidate>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor="name">Full Name <span style={{ color: 'red' }}>*</span></label>
                        <input
                          type="text"
                          id="name"
                          className={`form-control ${errors.name ? 'error-input' : ''}`}
                          value={name}
                          onChange={(e) => { setName(e.target.value); clearError('name'); }}
                          placeholder="Your name"
                        />
                        <label htmlFor="name" className="for-icon"><i className="far fa-user"></i></label>
                        {errors.name && <span className="field-error">{errors.name}</span>}
                        <div className="help-block with-errors"></div>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor="email">Email Address <span style={{ color: 'red' }}>*</span></label>
                        <input
                          type="email"
                          id="email"
                          className={`form-control ${errors.email ? 'error-input' : ''}`}
                          value={email}
                          onChange={(e) => { setEmail(e.target.value); clearError('email'); }}
                          placeholder="your@email.com"
                        />
                        <label htmlFor="email" className="for-icon"><i className="far fa-envelope"></i></label>
                        {errors.email && <span className="field-error">{errors.email}</span>}
                        <div className="help-block with-errors"></div>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor="phone">Phone Number <span style={{ color: 'red' }}>*</span></label>
                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                          <select
                            id="countryCode"
                            className={`form-control ${errors.phone ? 'error-input' : ''}`}
                            value={countryCode}
                            onChange={(e) => setCountryCode(e.target.value)}
                            style={{ width: '45%', flexShrink: 0 }}
                          >
                            {countryCodes.map((c) => (
                              <option key={`${c.country}-${c.code}`} value={c.code}>
                                {getFlagEmoji(c.country)} {c.code}
                              </option>
                            ))}
                          </select>
                          <input
                            type="tel"
                            id="phone"
                            className={`form-control ${errors.phone ? 'error-input' : ''}`}
                            value={phone}
                            onChange={(e) => { setPhone(e.target.value.replace(/[^\d\s\-]/g, '')); clearError('phone'); }}
                            placeholder="77 123 4567"
                            style={{ flex: 1 }}
                          />
                        </div>
                        {errors.phone && <span className="field-error">{errors.phone}</span>}
                        <div className="help-block with-errors"></div>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor="service">Service Required <span style={{ color: 'red' }}>*</span></label>
                        <select
                          id="service"
                          className={`form-control ${errors.service ? 'error-input' : ''}`}
                          value={service}
                          onChange={(e) => { setService(e.target.value); clearError('service'); }}
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
                        {errors.service && <span className="field-error">{errors.service}</span>}
                        <div className="help-block with-errors"></div>
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="form-group">
                        <label htmlFor="subject">Subject <span style={{ color: 'red' }}>*</span></label>
                        <input
                          type="text"
                          id="subject"
                          className={`form-control ${errors.subject ? 'error-input' : ''}`}
                          value={subject}
                          onChange={(e) => { setSubject(e.target.value); clearError('subject'); }}
                          placeholder="Project inquiry"
                        />
                        <label htmlFor="subject" className="for-icon"><i className="far fa-user"></i></label>
                        {errors.subject && <span className="field-error">{errors.subject}</span>}
                        <div className="help-block with-errors"></div>
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="form-group">
                        <label htmlFor="message">Your Message <span style={{ color: 'red' }}>*</span></label>
                        <textarea
                          name="message"
                          id="message"
                          className={`form-control ${errors.message ? 'error-input' : ''}`}
                          rows={4}
                          value={message}
                          onChange={(e) => { setMessage(e.target.value); clearError('message'); }}
                          placeholder="Tell me about your project, requirements, or idea..."
                        ></textarea>
                        {errors.message && <span className="field-error">{errors.message}</span>}
                        <div className="help-block with-errors"></div>
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="form-group mb-0" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <ReCAPTCHA
                          sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!}
                          onChange={(token) => { setCaptchaToken(token); clearError('captcha'); }}
                        />
                        {errors.captcha && <span className="field-error">{errors.captcha}</span>}
                        <button type="submit" className="theme-btn" disabled={status === 'sending'}>
                          {status === 'sending' ? 'Sending...' : 'Send Message'} <i className="ri-mail-line"></i>
                        </button>
                        <div id="msgSubmit" className="hidden"></div>
                      </div>
                    </div>
                    <div className="col-md-12 text-center">
                      {status === 'success' && (
                        <p className="input-success">{statusMessage}</p>
                      )}
                      {status === 'error' && (
                        <p className="input-error">{statusMessage}</p>
                      )}
                    </div>
                  </div>
                </form>
              </div>
            </div>

          </div>
        </div>
      </section>

      <style jsx>{`
        .field-error {
          display: block;
          color: #e74c3c;
          font-size: 0.8rem;
          margin-top: 0.35rem;
        }
        .error-input {
          border-color: #e74c3c !important;
        }
      `}</style>
    </>
  )
}
