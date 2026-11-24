import React from "react";
import Image from "next/image";
import Link from "next/link";
import { certifications } from "../about/CertificationsArea";

export default function LicensesArea() {
  const topCertifications = certifications.slice(0, 3);

  return (
    <section id="licenses" className="services-area licenses-area">
      <div className="container">
        <div className="row">
          <div className="col-xl-12 col-lg-12">
            <div className="section-title section-black-title wow fadeInUp delay-0-2s">
              <h2>Licenses &amp; Certifications</h2>
            </div>
          </div>
        </div>
        <div className="row">
          {topCertifications.map((item) => (
            <div key={item.id} className="col-lg-4 col-md-6">
              <div className="service-item licenses-item wow fadeInUp delay-0-2s">
                {item.certificateImage && (
                  <Image
                    src={`/${item.certificateImage}`}
                    alt={`${item.title} certificate`}
                    width={600}
                    height={400}
                    unoptimized
                    style={{
                      width: "100%",
                      height: "auto",
                      borderRadius: "8px",
                      marginBottom: "14px",
                    }}
                  />
                )}
                <h4>{item.title}</h4>
                <p>
                  <strong>{item.provider}</strong> &middot; {item.year}
                </p>
                {item.credentialUrl && (
                  <a
                    href={item.credentialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="portfolio-btn portfolio-btn-primary"
                  >
                    <i className="ri-verified-badge-line"></i> View Credential
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
        <div className="row">
          <div className="col-12 text-center">
            <Link
              href="/about#certifications"
              className="portfolio-btn licenses-see-more"
            >
              See More <i className="ri-arrow-right-line"></i>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
