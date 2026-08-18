"use client"
import React, { useEffect } from 'react'

import gallery_img_1 from "@/assets/images/carousel/hasithapriyadarshana-carousel-1.jpg";
import gallery_img_2 from "@/assets/images/carousel/hasithapriyadarshana-carousel-2.jpg";
import gallery_img_3 from "@/assets/images/carousel/hasithapriyadarshana-carousel-3.jpg";
import gallery_img_4 from "@/assets/images/carousel/hasithapriyadarshana-carousel-4.jpg";
import gallery_img_5 from "@/assets/images/carousel/hasithapriyadarshana-carousel-5.jpg";
import gallery_img_6 from "@/assets/images/carousel/hasithapriyadarshana-carousel-6.jpg";
import gallery_img_7 from "@/assets/images/carousel/hasithapriyadarshana-carousel-7.jpg";

const images = [
  { id: 1, src: gallery_img_1.src },
  { id: 2, src: gallery_img_2.src },
  { id: 3, src: gallery_img_3.src },
  { id: 4, src: gallery_img_4.src },
  { id: 5, src: gallery_img_5.src },
  { id: 6, src: gallery_img_6.src },
  { id: 7, src: gallery_img_7.src },
];

export default function GalleryArea() {
  useEffect(() => {
    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      addAnimation();
    }

    function addAnimation() {
      const scrollers = document.querySelectorAll(".gallery-scroller");
      scrollers.forEach((scroller) => {
        scroller.setAttribute("data-animated", "true");
        const scrollerInner = scroller.querySelector(".gallery-scroller__inner");
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
      <div className="gallery-area" id="gallery">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-xl-7">
              <div className="section-title text-center mb-50">
                <h2>A Glimpse of Me</h2>
              </div>
            </div>
          </div>
        </div>

        <div className="gallery-scroller" data-direction="left" data-speed="slow">
          <div className="gallery-scroller__inner">
            {images.map((img) => (
              <img key={img.id} src={img.src} alt="hasithapriyadarshana" />
            ))}
          </div>
        </div>

        <div className="gallery-scroller" data-direction="right" data-speed="slow">
          <div className="gallery-scroller__inner">
            {[...images].reverse().map((img) => (
              <img key={`r-${img.id}`} src={img.src} alt="hasithapriyadarshana" />
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
