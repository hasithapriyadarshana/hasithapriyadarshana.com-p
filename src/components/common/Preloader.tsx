"use client"

import React, { useEffect, useState } from "react"
import { DotLottieReact } from "@lottiefiles/dotlottie-react"

export default function Preloader() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1200)
    return () => clearTimeout(timer)
  }, [])

  if (!loading) return null

  return (
    <div className="preloader-overlay">
      <DotLottieReact
        src="https://lottie.host/2c7b58fb-1b8d-46e1-bf20-5e9305095e8c/F1qKjPKsRk.lottie"
        loop
        autoplay
        className="preloader-lottie"
      />
    </div>
  )
}
