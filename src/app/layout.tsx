import "../styles/index.css";

import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import Preloader from "@/components/common/Preloader";
import DisableRightClick from "@/components/common/DisableRightClick";

export const metadata: Metadata = {
  title: {
    default: "Hasitha Priyadarshana | CCNA Certified Network Technology Undergraduate",
    template: "%s | Hasitha Priyadarshana",
  },
  description:
    "ICT undergraduate specializing in Network Technology at the University of Sri Jayewardenepura, CCNA and Fortinet NSE 3 certified, with hands-on experience in network engineering, infrastructure management, security, Zabbix monitoring, and web development.",
  keywords: [
    "Hasitha Priyadarshana",
    "Hasitha Priyadarshana CCNA Certified",
    "Hasitha Priyadarshana Network Technology",
    "Hasitha Priyadarshana Web Developer",
    "Hasitha Priyadarshana Network Engineer",
    "Network Technology Undergraduate Sri Lanka",
    "Network Engineer Sri Lanka",
    "Cybersecurity Student Sri Lanka",
    "Web Developer Sri Lanka",
    "Freelance Web Developer Sri Lanka",
    "Network Solutions Sri Lanka",
    "WordPress Developer Sri Lanka",
    "HyperX Innovations",
  ],
  authors: [{ name: "Hasitha Priyadarshana" }],
  creator: "Hasitha Priyadarshana",
  metadataBase: new URL("https://hasithapriyadarshana.com"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://hasithapriyadarshana.com",
    siteName: "Hasitha Priyadarshana",
    title: "Hasitha Priyadarshana | CCNA Certified Network Technology Undergraduate",
    description:
      "ICT undergraduate specializing in Network Technology, CCNA and Fortinet NSE 3 certified, with hands-on experience in network engineering, security, monitoring, and web development.",
    images: [
      {
        url: "/assets/HasithaPriyadarshana-opengraph.svg",
        width: 1200,
        height: 630,
        alt: "Hasitha Priyadarshana — Network Technology & Web Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Hasitha Priyadarshana | CCNA Certified Network Technology Undergraduate",
    description:
      "CCNA and Fortinet NSE 3 certified Network Technology undergraduate with hands-on experience in networking, security, monitoring, and web development.",
    images: ["/assets/HasithaPriyadarshana-opengraph.svg"],
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://hasithapriyadarshana.com",
  },
};

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Hasitha Priyadarshana",
  url: "https://hasithapriyadarshana.com",
  image: "https://hasithapriyadarshana.com/assets/images/about/me.svg",
  jobTitle: "Intern Managed Services | CCNA Certified Network Technology Undergraduate",
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "University of Sri Jayewardenepura",
  },
  knowsAbout: [
    "Managed Services",
    "Network Engineering",
    "Network Infrastructure Management",
    "Cybersecurity",
    "Web Development",
    "Cloud Computing",
    "Cisco Networking",
    "CCNA",
    "Fortinet NSE 3",
    "FortiGate",
    "Zabbix Monitoring",
    "WordPress",
    "Next.js",
    "React",
    "Network Security",
    "Firewall Configuration",
  ],
  sameAs: [
    "https://github.com/hasithapriyadarshana",
    "https://www.linkedin.com/in/hasithapriyadarshana/",
    "https://credly.com",
  ],
  worksFor: {
    "@type": "Organization",
    name: "HyperX Innovations",
  },
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Hasitha Priyadarshana",
  url: "https://hasithapriyadarshana.com",
  description:
    "Portfolio of Hasitha Priyadarshana — CCNA and Fortinet NSE 3 certified Network Technology undergraduate with hands-on experience in networking, cybersecurity, monitoring, and web development.",
  author: {
    "@type": "Person",
    name: "Hasitha Priyadarshana",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Oswald:wght@200;300;400;500;600;700&family=Poppins:wght@100;200;300;400;500;600;700;800;900&display=swap"
        />
        <link rel="preload" href="/assets/fonts/fa-light-300.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preload" href="/assets/fonts/remixicon.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
      </head>
      <body>
        <Preloader />
        <DisableRightClick />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
