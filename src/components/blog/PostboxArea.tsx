
"use client"
import React from 'react'
import Link from 'next/link'
import { blog_data, getAllCategories, getAllTags, getRecentBlogs } from '@/data/blog_data'

export default function PostboxArea() {
  const categories = getAllCategories()
  const tags = getAllTags()
  const recentPosts = getRecentBlogs(3)

  return (
    <>
      <section className="blog-page-area">
        <div className="container">
          <div className="row">
            <div className="col-xxl-8 col-lg-8">
              <div className="postbox__wrapper">
                {blog_data.map((post) => (
                  <article key={post.id} className="postbox__item format-image mb-50 transition-3">
                    <div className="postbox__thumb w-img">
                      <Link href={`/blog/${post.slug}`}>
                        <img src={`/${post.image}`} alt={post.title} width={1024} height={590} loading="lazy" />
                      </Link>
                    </div>
                    <div className="postbox__content">
                      <div className="postbox__meta">
                        <span>
                          <a href=""><i className="fa-light fa-user"></i>Hasitha Priyadarshana</a>
                        </span>
                        <span>
                          <a href=""><i className="fa-light fa-clock"></i>{post.date}</a>
                        </span>
                        <span>
                          <a href=""><i className="ri-folder-line"></i>{post.category}</a>
                        </span>
                      </div>
                      <h3 className="postbox__title">
                        <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                      </h3>
                      <div className="postbox__text">
                        <p>{post.excerpt}</p>
                      </div>
                      <div className="postbox__read-more">
                         <Link href={`/blog/${post.slug}`} className="theme-btn" aria-label={`Read more about ${post.title}`}>Read more</Link>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
            <div className="col-xxl-4 col-lg-4">
              <div className="blog_sidebar__wrapper pl-40">
                <div className="sidebar__widget mb-45">
                  <div className="sidebar__widget-content">
                    <div className="sidebar__author">
                      <div className="sidebar__author-content">
                        <h3 className="sidebar__author-title">Hasitha Priyadarshana</h3>
                        <p>Network Technology undergraduate, web developer, and founder of HyperX Innovations.</p>
                        <div className="sidebar__author-social d-flex align-items-center justify-content-center">
                           <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><i className="fa-brands fa-linkedin-in"></i></a>
                          <a href="https://github.com" target="_blank" rel="noopener noreferrer" aria-label="GitHub"><i className="fa-brands fa-github"></i></a>
                          <a href="mailto:chathasitha@gmail.com" aria-label="Send email"><i className="fa-solid fa-envelope"></i></a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="sidebar__widget mb-45">
                  <h3 className="sidebar__widget-title">Recent Post</h3>
                  <div className="sidebar__widget-content">
                    <div className="sidebar__post">
                      {recentPosts.map((rp) => (
                        <div key={rp.id} className="rc__post d-flex align-items-center">
                          <div className="rc__post-thumb">
                            <Link href={`/blog/${rp.slug}`}><img src={`/${rp.thumbnail}`} alt={rp.title} width={100} height={80} loading="lazy" /></Link>
                          </div>
                          <div className="rc__post-content">
                            <h3 className="rc__post-title">
                              <Link href={`/blog/${rp.slug}`}>{rp.title}</Link>
                            </h3>
                            <div className="rc__meta">
                              <span>{rp.date}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="sidebar__widget mb-45">
                  <h3 className="sidebar__widget-title">Categories</h3>
                  <div className="sidebar__widget-content">
                    <ul>
                      {categories.map((cat) => (
                        <li key={cat}><Link href="/blog">{cat}</Link></li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="sidebar__widget mb-40">
                  <h3 className="sidebar__widget-title">Tags</h3>
                  <div className="sidebar__widget-content">
                    <div className="tagcloud">
                      {tags.map((tag) => (
                        <a key={tag} href="#">{tag}</a>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
