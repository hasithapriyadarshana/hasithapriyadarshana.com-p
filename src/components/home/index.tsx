
import React from 'react'
import HeroArea from './HeroArea'
import BrandArea from './BrandArea'
import AboutArea from './AboutArea'
import LicensesArea from './LicensesArea'
import ServiceArea from './ServiceArea'
import HeaderOne from '@/layouts/headers/HeaderOne'
import PortfolioArea from './PortfolioArea'
import GalleryArea from './GalleryArea'
import TestimonoalArea from './TestimonoalArea'
import ContactArea from './ContactArea'
import FooterOne from '@/layouts/footers/FooterOne'

export default function Home() {
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
            <LicensesArea />
            <ServiceArea />
            <PortfolioArea />
            <TestimonoalArea />
            <ContactArea />
          </main>
          <FooterOne />
        </div>
      </div> 
    </>
  )
}
