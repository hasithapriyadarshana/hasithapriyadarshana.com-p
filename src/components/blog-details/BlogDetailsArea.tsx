import Link from "next/link";
import React from "react";
import { BlogPost } from "@/types/blog";

interface BlogDetailsAreaProps {
  post: BlogPost;
  relatedPosts: BlogPost[];
}

export default function BlogDetailsArea({
  post,
  relatedPosts,
}: BlogDetailsAreaProps) {
  return (
    <section className="postbox__area grey-bg-4 pt-120 pb-120">
      <div className="container">
        <div className="row">
          <div className="col-xxl-12">
            <div className="postbox__wrappers">
              <div className="postbox__mains">
                <div className="row">
                  <div className="col-lg-8">
                    <div className="postbox__main-wrapper">
                      <div className="postbox__thumb w-img mb-30">
                        <img src={`/${post.image}`} alt={post.title} width={1024} height={590} loading="lazy" />
                      </div>
                      <div className="postbox__meta">
                        <span>
                          <a href="">
                            <i className="fa-light fa-user"></i>Hasitha
                            Priyadarshana
                          </a>
                        </span>
                        <span>
                          <a href="">
                            <i className="fa-light fa-clock"></i>
                            {post.date}
                          </a>
                        </span>
                        <span>
                          <a href="">
                            <i className="ri-folder-line"></i>
                            {post.category}
                          </a>
                        </span>
                      </div>
                      <div className="postbox__details-content-wrapper">
                        <h3 className="postbox__details-title">
                          {post.title}
                        </h3>
                        <p
                          style={{ fontSize: "18px", fontWeight: 500, marginBottom: "24px" }}
                          dangerouslySetInnerHTML={{ __html: post.excerpt }}
                        />
                        <div
                          className="blog-content"
                          dangerouslySetInnerHTML={{ __html: post.content }}
                        />
                      </div>
                      <div className="postbox__share-wrapper mb-60">
                        <div className="row align-items-center">
                          <div className="col-xl-7">
                            <div className="tagcloud tagcloud-sm">
                              <span>Tags:</span>
                              {post.tags.map((tag) => (
                                <a key={tag} href="#">
                                  {tag}
                                </a>
                              ))}
                            </div>
                          </div>
                          <div className="col-xl-5">
                            <div className="postbox__share text-xl-end">
                              <span>Share On:</span>
                              <a
                                href={`https://www.linkedin.com/sharing/share-offsite/?url=https://hasithapriyadarshana.com/blog/${post.slug}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Share on LinkedIn"
                              >
                                <i className="fa-brands fa-linkedin-in"></i>
                              </a>
                              <a
                                href={`https://twitter.com/intent/tweet?url=https://hasithapriyadarshana.com/blog/${post.slug}&text=${encodeURIComponent(post.title)}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Share on Twitter"
                              >
                                <i className="fab fa-twitter"></i>
                              </a>
                              <a
                                href={`https://www.facebook.com/sharer/sharer.php?u=https://hasithapriyadarshana.com/blog/${post.slug}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Share on Facebook"
                              >
                                <i className="fab fa-facebook-f"></i>
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-xxl-4 col-lg-4">
                    <div className="blog_sidebar__wrapper pl-40">
                      <div className="sidebar__widget mb-45">
                        <div className="sidebar__widget-content">
                          <div className="sidebar__author">
                            <div className="sidebar__author-content">
                              <h3 className="sidebar__author-title">
                                Hasitha Priyadarshana
                              </h3>
                              <p>
                                Network Technology undergraduate, web developer,
                                and founder of HyperX Innovations. Writing about
                                networking, cybersecurity, web development, and
                                technology.
                              </p>
                              <div className="sidebar__author-social d-flex align-items-center justify-content-center">
                                <a
                                  href="https://linkedin.com"
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  aria-label="LinkedIn"
                                >
                                  <i className="fa-brands fa-linkedin-in"></i>
                                </a>
                                <a
                                  href="https://github.com"
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  aria-label="GitHub"
                                >
                                  <i className="fa-brands fa-github"></i>
                                </a>
                                <a href="mailto:chathasitha@gmail.com" aria-label="Send email">
                                  <i className="fa-solid fa-envelope"></i>
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      {relatedPosts.length > 0 && (
                        <div className="sidebar__widget mb-45">
                          <h3 className="sidebar__widget-title">
                            Related Posts
                          </h3>
                          <div className="sidebar__widget-content">
                            <div className="sidebar__post">
                              {relatedPosts.map((rp) => (
                                <div
                                  key={rp.id}
                                  className="rc__post d-flex align-items-center"
                                >
                                  <div className="rc__post-thumb">
                                    <Link href={`/blog/${rp.slug}`}>
                                      <img
                                        src={`/${rp.thumbnail}`}
                                        alt={rp.title}
                                        width={100}
                                        height={80}
                                        loading="lazy"
                                      />
                                    </Link>
                                  </div>
                                  <div className="rc__post-content">
                                    <h3 className="rc__post-title">
                                      <Link href={`/blog/${rp.slug}`}>
                                        {rp.title}
                                      </Link>
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
                      )}
                      <div className="sidebar__widget mb-45">
                        <h3 className="sidebar__widget-title">Categories</h3>
                        <div className="sidebar__widget-content">
                          <ul>
                            <li>
                              <Link href="/blog">Network Solutions</Link>
                            </li>
                            <li>
                              <Link href="/blog">Website Design</Link>
                            </li>
                            <li>
                              <Link href="/blog">WordPress Solutions</Link>
                            </li>
                            <li>
                              <Link href="/blog">Website Maintenance</Link>
                            </li>
                            <li>
                              <Link href="/blog">Website Migration</Link>
                            </li>
                            <li>
                              <Link href="/blog">
                                Social Media Marketing
                              </Link>
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div className="sidebar__widget mb-40">
                        <h3 className="sidebar__widget-title">Tags</h3>
                        <div className="sidebar__widget-content">
                          <div className="tagcloud">
                            {post.tags.map((tag) => (
                              <a key={tag} href="#">
                                {tag}
                              </a>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
