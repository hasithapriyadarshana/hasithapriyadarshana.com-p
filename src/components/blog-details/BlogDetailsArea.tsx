import Link from "next/link";
import Image from "next/image";
import React from "react";
import { BlogPost } from "@/types/blog";
import ReactMarkdown from "react-markdown";
import { formatBlogDate } from "@/lib/blogs";

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
                         <Image src={post.image.startsWith("/") || post.image.startsWith("http") ? post.image : `/${post.image}`} alt={post.title} width={1024} height={590} unoptimized style={{ width: "100%", height: "auto" }} />
                      </div>
                      <div className="postbox__meta">
                        <span>
                          <span>
                            <i className="fa-light fa-user"></i>Hasitha
                            Priyadarshana
                          </span>
                        </span>
                        <span>
                          <span>
                            <i className="fa-light fa-clock"></i>
                            {formatBlogDate(post.publishDate || post.date)}
                          </span>
                        </span>
                        <span>
                          <span>
                            <i className="ri-folder-line"></i>
                            {post.category}
                          </span>
                        </span>
                      </div>
                      <div className="postbox__details-content-wrapper">
                        <div className="blog-content">
                          <ReactMarkdown components={{
                            img: ({ src = "", alt = "" }) => {
                              const imageSrc = typeof src === "string" ? src : "";
                              const match = imageSrc.match(/#width=(\d+)$/);
                              const width = match ? Math.min(100, Math.max(25, Number(match[1]))) : 100;
                              return <Image src={(imageSrc.replace(/#width=\d+$/, "")).startsWith("/") || (imageSrc.replace(/#width=\d+$/, "")).startsWith("http") ? imageSrc.replace(/#width=\d+$/, "") : `/${imageSrc.replace(/#width=\d+$/, "")}`} alt={alt} width={800} height={450} unoptimized style={{ width: `${width}%`, height: "auto" }} />;
                            },
                          }}>{post.content}</ReactMarkdown>
                        </div>
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
                                      <Image
                                        src={rp.image.startsWith("/") || rp.image.startsWith("http") ? rp.image : `/${rp.image}`}
                                        unoptimized
                                        style={{ width: "100%", height: "auto" }}
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
                                      <span>{formatBlogDate(rp.publishDate || rp.date)}</span>
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
