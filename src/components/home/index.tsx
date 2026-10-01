
import React from 'react'
import HeroArea from './HeroArea'
import BrandArea from './BrandArea'
import AboutArea from './AboutArea'
import ServiceArea from './ServiceArea'
import HeaderOne from '@/layouts/headers/HeaderOne'
import PortfolioArea from './PortfolioArea'
import GalleryArea from './GalleryArea'
import TestimonoalArea from './TestimonoalArea'
import BlogArea from './BlogArea'
import ContactArea from './ContactArea'
import FooterOne from '@/layouts/footers/FooterOne'
import type { BlogPost } from '@/types/blog'

export default function Home({ posts }: { posts: BlogPost[] }) {
  return (
    <>
      <HeaderOne />
      <div id="smooth-wrapper">
        <div id="smooth-content">
          <main>
            <HeroArea />
            <BrandArea />
            <GalleryArea />
            <AboutArea />
            <ServiceArea />
            <PortfolioArea />
            <TestimonoalArea />
            <BlogArea posts={posts} />
            <ContactArea />
          </main>
          <FooterOne />
        </div>
      </div> 
    </>
  )
}
