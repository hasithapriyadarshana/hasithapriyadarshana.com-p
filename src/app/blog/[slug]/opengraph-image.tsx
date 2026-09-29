import { ImageResponse } from "next/og";
import { getPublishedPost } from "@/lib/blogs";

export const runtime = "nodejs";
export const alt = "Blog post cover image";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPublishedPost(slug);

  if (!post || !post.image) {
    return new ImageResponse(
      (
        <div
          style={{
            fontSize: 48,
            background: "#0a0f0c",
            color: "#edf4ef",
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: "sans-serif",
          }}
        >
          <span style={{ color: "#d5ff3f", fontSize: 24, textTransform: "uppercase", letterSpacing: "0.2em" }}>
            Hasitha Priyadarshana
          </span>
          <h1 style={{ fontSize: 56, marginTop: 16 }}>Blog Article</h1>
        </div>
      ),
      { ...size }
    );
  }

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          backgroundColor: "#060a08",
        }}
      >
        {/* Cover image as background */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={post.image}
          alt={post.title}
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            objectFit: "cover",
            opacity: 0.85,
          }}
        />
        {/* Gradient Overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to top, rgba(6, 10, 8, 0.95) 0%, rgba(6, 10, 8, 0.5) 60%, rgba(6, 10, 8, 0.2) 100%)",
          }}
        />
        {/* Banner Content */}
        <div
          style={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
            padding: "50px 60px",
            width: "100%",
            height: "100%",
            color: "#edf4ef",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              marginBottom: "16px",
            }}
          >
            <span
              style={{
                backgroundColor: "#d5ff3f",
                color: "#0a0f0c",
                padding: "6px 16px",
                borderRadius: "4px",
                fontSize: "16px",
                fontWeight: 800,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
              }}
            >
              {post.category || "Blog"}
            </span>
            <span
              style={{
                color: "#cbd5ce",
                fontSize: "16px",
                fontWeight: 600,
              }}
            >
              • {post.readTime}
            </span>
          </div>
          <h1
            style={{
              fontSize: "48px",
              fontWeight: 800,
              lineHeight: 1.15,
              color: "#ffffff",
              margin: 0,
              maxWidth: "1050px",
            }}
          >
            {post.title}
          </h1>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginTop: "28px",
              paddingTop: "20px",
              borderTop: "1px solid rgba(213, 255, 63, 0.3)",
            }}
          >
            <span
              style={{
                color: "#d5ff3f",
                fontSize: "18px",
                fontWeight: 700,
                letterSpacing: "0.05em",
              }}
            >
              hasithapriyadarshana.com
            </span>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
