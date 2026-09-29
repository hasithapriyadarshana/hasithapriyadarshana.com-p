import React from "react";
import Breadcrumb from "../common/Breadcrumb";
import BlogDetailsArea from "./BlogDetailsArea";
import HeaderOne from "@/layouts/headers/HeaderOne";
import FooterOne from "@/layouts/footers/FooterOne";
import { BlogPost } from "@/types/blog";

interface BlogDetailsProps {
  post: BlogPost;
  relatedPosts: BlogPost[];
}

export default function BlogDetails({ post, relatedPosts }: BlogDetailsProps) {
  return (
    <>
      <HeaderOne />
      <div id="smooth-wrapper">
        <div id="smooth-content">
          <main>
            <Breadcrumb title={post.title} compact />
            <BlogDetailsArea post={post} relatedPosts={relatedPosts} />
          </main>
          <FooterOne />
        </div>
      </div>
    </>
  );
}
