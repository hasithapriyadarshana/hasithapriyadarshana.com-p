
import React from 'react'
import PostboxArea from './PostboxArea'
import Breadcrumb from '../common/Breadcrumb'
import HeaderOne from '@/layouts/headers/HeaderOne'
import FooterOne from '@/layouts/footers/FooterOne'
import type { BlogPost } from '@/types/blog'

export default function Blog({ posts }: { posts: BlogPost[] }) {
  return (
    <>
      <HeaderOne />
      <div id="smooth-wrapper">
        <div id="smooth-content">
          <main>
            <Breadcrumb title="Blogs" style_4={true} />
            <PostboxArea posts={posts} />
          </main>
          <FooterOne />
        </div>
      </div>
    </>
  )
}
