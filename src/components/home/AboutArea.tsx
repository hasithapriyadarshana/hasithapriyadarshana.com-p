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
    count: 45,
    cls: "plus",
  },
  {
    id: 3,
    title: "Client Base",
    count: 25,
    cls: "plus",
  },
  {
    id: 4,
    title: "Certifications",
    count: 17,
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
                  My technical foundation covers <strong>TCP/IP</strong>, subnetting,
                  routing and switching, VLANs, OSPF, NAT/PAT, DHCP, DNS, firewalls,
                  VPNs, and network hardening. I have hands-on experience with FortiGate,
                  Zabbix, Wireshark, GNS3, Cisco Packet Tracer, EVE-NG, and VirtualBox
                  through academic labs and practical projects.
                </p>
                <p style={{ marginTop: "15px" }}>
                  I am a <strong>Cisco Certified Network Associate (CCNA 200-301)</strong>{" "}
                  and <strong>Fortinet NSE 3</strong> certified ICT undergraduate. I
                  combine networking, security, monitoring, and web development
                  experience to contribute to network operations, implementation, and
                  security while developing enterprise networking expertise.
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
