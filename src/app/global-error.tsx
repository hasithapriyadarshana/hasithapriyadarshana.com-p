"use client";

import { useEffect } from "react";

const RELOAD_KEY = "hp-nav-reload";
const MAX_RELOADS = 3;
const WINDOW_MS = 120000;

function tryAutoReload() {
  try {
    const now = Date.now();
    const raw = sessionStorage.getItem(RELOAD_KEY);
    const state = raw ? JSON.parse(raw) : { count: 0, ts: now };
    if (now - state.ts > WINDOW_MS) {
      state.count = 0;
      state.ts = now;
    }
    if (state.count < MAX_RELOADS) {
      state.count += 1;
      sessionStorage.setItem(RELOAD_KEY, JSON.stringify(state));
      window.location.reload();
      return true;
    }
  } catch {
    // sessionStorage unavailable — fall through to manual UI
  }
  return false;
}

export default function GlobalError({
  error,
}: {
  error: Error & { digest?: string };
}) {
  useEffect(() => {
    console.error(error);
    tryAutoReload();
  }, [error]);

  return (
    <html lang="en">
      <body>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "100vh",
            gap: "16px",
            padding: "24px",
            textAlign: "center",
            fontFamily: "system-ui, sans-serif",
          }}
        >
          <h1 style={{ fontSize: "22px", fontWeight: 600 }}>
            Something went wrong
          </h1>
          <p style={{ maxWidth: "420px", fontSize: "14px", opacity: 0.7 }}>
            We couldn&apos;t finish loading this page. Please reload to try again.
          </p>
          <button
            onClick={() => window.location.reload()}
            style={{
              borderRadius: "6px",
              background: "#c9a84c",
              color: "#000",
              padding: "10px 20px",
              fontSize: "14px",
              border: "none",
              cursor: "pointer",
            }}
          >
            Reload
          </button>
        </div>
      </body>
    </html>
  );
}
