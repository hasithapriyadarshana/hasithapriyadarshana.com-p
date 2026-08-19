"use client";
import React, { useEffect } from "react";

const logos = Array.from({ length: 16 }, (_, i) => ({
  id: i + 1,
  src: `assets/images/client-logos/hasitha-priyadarshana-${i + 1}.svg`,
}));

export default function BrandArea() {
  useEffect(() => {
    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      addAnimation();
    }

    function addAnimation() {
      const scrollers = document.querySelectorAll(".scroller");
      scrollers.forEach((scroller) => {
        scroller.setAttribute("data-animated", "true");
        const scrollerInner = scroller.querySelector(".scroller__inner");
        if (!scrollerInner) return;
        const scrollerContent = Array.from(scrollerInner.children);
        scrollerContent.forEach((item) => {
          const duplicatedItem = item.cloneNode(true) as HTMLElement;
          duplicatedItem.setAttribute("aria-hidden", "true");
          scrollerInner.appendChild(duplicatedItem);
        });
      });
    }
  }, []);

  return (
    <>
      <div className="company-design-area">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <h2>Brands I Worked With</h2>
              <div className="company-list">
                <div
                  className="scroller"
                  data-direction="left"
                  data-speed="slow"
                >
                  <div className="scroller__inner">
                    {logos.map((logo) => (
                      <img
                        key={logo.id}
                        src={logo.src}
                        alt="Company"
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
