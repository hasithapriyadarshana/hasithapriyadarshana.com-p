"use client"
import Link from "next/link";
import Image from "next/image";
import UseSticky from "@/hooks/UseSticky";
import NavMenu from "./NavMenu"; 
import { useState } from "react";
import Sidebar from "@/components/common/Sidebar";

export default function HeaderOne({ articlePage = false }: { articlePage?: boolean }) {

  const { sticky } = UseSticky()
  const [open, setOpen] = useState(false);

  return (
    <>
      <header className={`main-header${articlePage ? ' blog-article-header' : ''}${sticky ? ' fixed-header' : ''}`}>
        <div className="header-upper">
          <div className="container">
            <div className="header-inner">
              <div className="row align-items-center">
                <div className="col-xl-2 col-lg-2 col-md-6 col-6 col-sm-3">
                  <div className="logo-area">
                    <div className="logo">
                      <Link href="/" aria-label="Hasitha Priyadarshana - Home"><Image src="/assets/images/Hasitha.svg" alt="Hasitha Priyadarshana Logo" width={150} height={59} priority /></Link>
                    </div>
                  </div>
                </div>
                <div className="col-xl-10 col-lg-10 col-md-6 col-6 col-sm-9">
                  <div className="main-menu d-none d-lg-block">
                    <nav id="mobile-menu">
                      <NavMenu /> 
                    </nav>
                  </div>
                  <div className="side-menu-icon d-lg-none text-end">
                    <button aria-label="Open menu" onClick={() => setOpen(!open)} className="info-toggle-btn f-right sidebar-toggle-btn"><i className="fal fa-bars"></i></button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <Sidebar open={open} setOpen={setOpen} />
    </>
  )
}
