import "../styles/index.css";

import type { Metadata } from "next";
import { Oswald, Poppins } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import Preloader from "@/components/common/Preloader";
import DisableRightClick from "@/components/common/DisableRightClick";

const oswald = Oswald({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700"],
  variable: "--font-oswald",
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Hasitha Priyadarshana | Network Technology Undergraduate & Web Developer",
    template: "%s | Hasitha Priyadarshana",
  },
  description:
    "Hasitha Priyadarshana is a Network Technology undergraduate at the University of Sri Jayewardenepura and a Web Developer specializing in networking, cybersecurity, web development, and technology solutions. Founder of HyperX Innovations.",
  keywords: [
    "Hasitha Priyadarshana",
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
    title: "Hasitha Priyadarshana | Network Technology Undergraduate & Web Developer",
    description:
      "Network Technology undergraduate at the University of Sri Jayewardenepura, web developer, and founder of HyperX Innovations. Specializing in networking, cybersecurity, and modern web development.",
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
    title: "Hasitha Priyadarshana | Network Technology Undergraduate & Web Developer",
    description:
      "Network Technology undergraduate, web developer, and founder of HyperX Innovations. Specializing in networking, cybersecurity, and web development.",
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
  jobTitle: "Network Technology Undergraduate & Web Developer",
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "University of Sri Jayewardenepura",
  },
  knowsAbout: [
    "Network Engineering",
    "Cybersecurity",
    "Web Development",
    "Cloud Computing",
    "Cisco Networking",
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
    "Portfolio of Hasitha Priyadarshana — Network Technology undergraduate, web developer, and founder of HyperX Innovations.",
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
    <html lang="en" className={`${oswald.variable} ${poppins.variable}`}>
      <head>
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
