
"use client"
import React from 'react'
import Link from 'next/link'
import { getRecentBlogs } from '@/data/blog_data'

export default function BlogArea() {
  const posts = getRecentBlogs(3)

  return (
    <>
      <section className="blog-area">
        <div className="container">
          <div className="row">
            <div className="col-xl-12 col-lg-12">
              <div className="section-title wow fadeInUp delay-0-2s">
                <h2>Stories</h2>
              </div>
            </div>
          </div>

          {posts.map((post, index) => (
            <div key={post.id} className="row blog-post-box align-items-center">
              <div className="col-lg-6">
                <div className="blog-post-img">
                  <Link href={`/blog/${post.slug}`}>
                    <img src={`/${post.image}`} alt={post.title} width={1024} height={590} loading="lazy" />
                  </Link>
                  <div className="blog-post-category">
                    <a href="#">{post.category}</a>
                  </div>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="blog-post-caption">
                  <h3>Posted on {post.date}</h3>
                  <h2><Link className="link-decoration" href={`/blog/${post.slug}`}>{post.title}</Link></h2>
                   <Link className="theme-btn theme-btn-two" href={`/blog/${post.slug}`} aria-label={`Read more about ${post.title}`}>Read more <i className="ri-arrow-right-line"></i></Link>
                </div>
              </div>
            </div>
          ))}

        </div>
      </section>
    </>
  )
}
