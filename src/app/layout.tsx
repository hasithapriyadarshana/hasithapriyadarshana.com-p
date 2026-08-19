import "../styles/index.css";

import type { Metadata } from "next";
import Preloader from "@/components/common/Preloader";

export const metadata: Metadata = {
  title: {
    default: "Hasitha Priyadarshana | Network Technology & Web Developer",
    template: "%s | Hasitha Priyadarshana",
  },
  description:
    "Portfolio of Hasitha Priyadarshana — Network Technology undergraduate at the University of Sri Jayewardenepura, web developer, and founder of HyperX Innovations. Specializing in networking, cybersecurity, cloud computing, and modern web development.",
  keywords: [
    "Hasitha Priyadarshana",
    "network technology",
    "cybersecurity",
    "web developer",
    "Sri Lanka",
    "University of Sri Jayewardenepura",
    "HyperX Innovations",
    "freelance developer",
    "portfolio",
  ],
  authors: [{ name: "Hasitha Priyadarshana" }],
  creator: "Hasitha Priyadarshana",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://hasithapriyadarshana.com",
    siteName: "Hasitha Priyadarshana",
    title: "Hasitha Priyadarshana | Network Technology & Web Developer",
    description:
      "Portfolio of Hasitha Priyadarshana — Network Technology undergraduate, web developer, and founder of HyperX Innovations.",
    images: [
      {
        url: "/assets/HasithaPriyadarshana-opengraph.svg",
        width: 1200,
        height: 630,
        alt: "Hasitha Priyadarshana",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Hasitha Priyadarshana | Network Technology & Web Developer",
    description:
      "Portfolio of Hasitha Priyadarshana — Network Technology undergraduate, web developer, and founder of HyperX Innovations.",
    images: ["/assets/HasithaPriyadarshana-opengraph.svg"],
  },
  robots: {
    index: true,
    follow: true,
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
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Oswald:wght@200..700&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
        />
      </head>
      <body>
        <Preloader />
        {children}
      </body>
    </html>
  );
}
