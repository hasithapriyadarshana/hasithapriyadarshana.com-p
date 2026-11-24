"use client";

import { gsap } from "gsap";
import React, { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { animationCreate } from "@/utils/utils";
import ScrollToTop from "@/components/common/ScrollToTop";

import { ScrollSmoother, ScrollTrigger } from "@/plugins";
gsap.registerPlugin(ScrollSmoother, ScrollTrigger);

if (typeof window !== "undefined") {
  require("bootstrap/dist/js/bootstrap");
}

export default function Wrapper({ children }: any) {
  const pathname = usePathname();

  useEffect(() => {
    try {
      animationCreate();
    } catch (error) {
      console.error("Animation init failed", error);
    }
  }, []);

  useEffect(() => {
    let smoother: ReturnType<typeof ScrollSmoother.create> | undefined;

    try {
      const existing = (ScrollSmoother as unknown as { get?: () => { kill: () => void } }).get?.();
      if (existing) existing.kill();

      const wrapper = document.querySelector("#smooth-wrapper");
      const content = document.querySelector("#smooth-content");

      if (wrapper && content) {
        smoother = ScrollSmoother.create({
          smooth: 1.35,
          effects: true,
          smoothTouch: false,
          normalizeScroll: false,
          ignoreMobileResize: true,
        });
      }
    } catch (error) {
      console.error("ScrollSmoother init failed", error);
    }

    return () => {
      try {
        smoother?.kill();
      } catch (error) {
        console.error("ScrollSmoother cleanup failed", error);
      }
    };
  }, []);

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      try {
        ScrollTrigger.refresh();
      } catch (error) {
        console.error("ScrollTrigger refresh failed", error);
      }
    });
    return () => cancelAnimationFrame(frame);
  }, [pathname]);

  // round cursor
  const cursorBallRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const cursorBall = cursorBallRef.current;

    if (!cursorBall) return;

    // Mouse move listener to update cursor position
    const handleMouseMove = (e: MouseEvent) => {
      gsap.to(cursorBall, {
        duration: 0.3,
        x: e.clientX,
        y: e.clientY,
        opacity: 1,
        ease: "power2.out",
      });
    };

    // Hover effects for links
    const handleMouseEnter = () => {
      cursorBall.classList.add("hovered");
      gsap.to(cursorBall, {
        duration: 0.3,
        scale: 2,
        opacity: 0,
        ease: "power2.out",
      });
    };

    const handleMouseLeave = () => {
      cursorBall.classList.remove("hovered");
      gsap.to(cursorBall, {
        duration: 0.3,
        scale: 1,
        opacity: 1,
        ease: "power2.out",
      });
    };

    // Attach event listeners
    document.addEventListener("mousemove", handleMouseMove);
    const hoverElements = document.querySelectorAll("a");
    hoverElements.forEach((element) => {
      element.addEventListener("mouseenter", handleMouseEnter);
      element.addEventListener("mouseleave", handleMouseLeave);
    });

    // Cleanup event listeners on unmount
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      hoverElements.forEach((element) => {
        element.removeEventListener("mouseenter", handleMouseEnter);
        element.removeEventListener("mouseleave", handleMouseLeave);
      });
    };
  }, []);

  return (
    <>
      <div id="magic-cursor">
        <div id="ball" ref={cursorBallRef}></div>
      </div>
      {children}
      <ScrollToTop />
    </>
  );
}
