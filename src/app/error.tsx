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

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
    tryAutoReload();
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 px-6 text-center">
      <h1 className="text-2xl font-semibold">Something went wrong</h1>
      <p className="max-w-md text-sm opacity-70">
        We couldn&apos;t finish loading this page. Please try again.
      </p>
      <div className="flex gap-3">
        <button
          onClick={() => reset()}
          className="rounded-md border border-current px-5 py-2 text-sm"
        >
          Try again
        </button>
        <button
          onClick={() => window.location.reload()}
          className="rounded-md bg-[#c9a84c] px-5 py-2 text-sm text-black"
        >
          Reload
        </button>
      </div>
    </div>
  );
}
