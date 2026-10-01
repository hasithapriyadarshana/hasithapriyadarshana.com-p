"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import type { BlogPost } from "@/types/blog";
import styles from "./BlogArea.module.css";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function BlogArea({ posts }: { posts: BlogPost[] }) {
  if (posts.length === 0) return null;

  return (
    <section className="blog-area" id="blog" style={{ padding: "100px 0 60px" }}>
      <div className="container">
        <div className="row align-items-end mb-5">
          <div className="col-lg-8 col-md-8">
            <div className="section-title section-black-title mb-0 wow fadeInUp delay-0-2s">
              <span className="sub-title">Articles & Insights</span>
              <h2 style={{ color: "#ffffff" }}>Latest Stories</h2>
            </div>
          </div>
          <div className="col-lg-4 col-md-4 text-md-end mt-3 mt-md-0">
            <div className={styles.navControls}>
              <button className={`${styles.navBtn} blog-carousel-prev`} aria-label="Previous article">
                <i className="ri-arrow-left-line"></i>
              </button>
              <button className={`${styles.navBtn} blog-carousel-next`} aria-label="Next article">
                <i className="ri-arrow-right-line"></i>
              </button>
            </div>
          </div>
        </div>

        <Swiper
          className={styles.swiperWrapper}
          modules={[Autoplay, Navigation, Pagination]}
          spaceBetween={24}
          slidesPerView={1}
          loop={posts.length > 2}
          autoplay={{
            delay: 4500,
            disableOnInteraction: false,
          }}
          navigation={{
            prevEl: ".blog-carousel-prev",
            nextEl: ".blog-carousel-next",
          }}
          breakpoints={{
            640: {
              slidesPerView: 1,
            },
            768: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 3,
            },
          }}
        >
          {posts.map((post) => {
            const imageSrc = post.image.startsWith("/") || post.image.startsWith("http")
              ? post.image
              : `/${post.image}`;

            return (
              <SwiperSlide key={post.id} style={{ height: "auto" }}>
                <article className={styles.card}>
                  <div className={styles.imageWrapper}>
                    <a href={`/blog/${post.slug}`}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={imageSrc} alt={post.title} loading="lazy" />
                    </a>
                  </div>
                  <div className={styles.cardContent}>
                    <div className={styles.meta}>
                      <span>{post.date}</span>
                      {post.readTime && <span>• {post.readTime}</span>}
                    </div>
                    <h3 className={styles.cardTitle}>
                      <a href={`/blog/${post.slug}`}>{post.title}</a>
                    </h3>
                    <p className={styles.excerpt}>{post.excerpt}</p>
                    <a href={`/blog/${post.slug}`} className={styles.readMoreBtn}>
                      Read article <i className="ri-arrow-right-line"></i>
                    </a>
                  </div>
                </article>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </section>
  );
}
