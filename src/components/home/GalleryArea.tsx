"use client"
import Image from 'next/image';
import React from 'react'

import gallery_img_1 from "@/assets/images/carousel/hasithapriyadarshana-carousel-1.jpg";
import gallery_img_2 from "@/assets/images/carousel/hasithapriyadarshana-carousel-2.jpg";
import gallery_img_3 from "@/assets/images/carousel/hasithapriyadarshana-carousel-3.jpg";
import gallery_img_4 from "@/assets/images/carousel/hasithapriyadarshana-carousel-4.jpg";
import gallery_img_5 from "@/assets/images/carousel/hasithapriyadarshana-carousel-5.jpg";
import gallery_img_6 from "@/assets/images/carousel/hasithapriyadarshana-carousel-6.jpg";
import gallery_img_7 from "@/assets/images/carousel/hasithapriyadarshana-carousel-7.jpg";

import { StaticImageData } from 'next/image';

interface DataType {
  id: number;
  image: StaticImageData;
}

const gallery_data: DataType[] = [
  { id: 1, image: gallery_img_1 },
  { id: 2, image: gallery_img_2 },
  { id: 3, image: gallery_img_3 },
  { id: 4, image: gallery_img_4 },
  { id: 5, image: gallery_img_5 },
  { id: 6, image: gallery_img_6 },
  { id: 7, image: gallery_img_7 },
];

const row1 = gallery_data.slice(0, 4);
const row2 = gallery_data.slice(3);

export default function GalleryArea() {
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

        <div className="gallery-row">
          <div className="gallery-track gallery-scroll-left">
            {[...row1, ...row1].map((item, i) => (
              <div key={`r1-${i}`} className="gallery-slide">
                <Image src={item.image} alt="hasithapriyadarshana" fill style={{ objectFit: "cover" }} />
              </div>
            ))}
          </div>
        </div>

        <div className="gallery-row">
          <div className="gallery-track gallery-scroll-right">
            {[...row2, ...row2].map((item, i) => (
              <div key={`r2-${i}`} className="gallery-slide">
                <Image src={item.image} alt="hasithapriyadarshana" fill style={{ objectFit: "cover" }} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
