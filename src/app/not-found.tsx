"use client";

import Wrapper from "@/layouts/Wrapper";
import Link from "next/link";

export default function NotFound() {
  return (
    <Wrapper>
      <section
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
          textAlign: "center",
          padding: "2rem",
        }}
      >
        <h1
          style={{
            fontSize: "clamp(80px, 15vw, 160px)",
            fontWeight: 700,
            lineHeight: 1,
            color: "#1a1a2e",
            marginBottom: "0.5rem",
          }}
        >
          404
        </h1>
        <h2
          style={{
            fontSize: "clamp(18px, 3vw, 28px)",
            fontWeight: 500,
            color: "#333",
            marginBottom: "1rem",
          }}
        >
          Page Not Found
        </h2>
        <p
          style={{
            fontSize: "16px",
            color: "#666",
            maxWidth: "460px",
            marginBottom: "2rem",
          }}
        >
          The page you are looking for might have been removed, had its name
          changed, or is temporarily unavailable.
        </p>
        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", justifyContent: "center" }}>
          <Link href="/" className="theme-btn" style={{ textDecoration: "none" }}>
            Back to Home <i className="ri-home-line"></i>
          </Link>
        </div>
      </section>
    </Wrapper>
  );
}
