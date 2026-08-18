"use client"
import React, { useEffect, useState } from 'react'

export default function Preloader() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500)
    return () => clearTimeout(timer)
  }, [])

  if (!loading) return null

  return (
    <div className="preloader-wrapper">
      <div className="preloader">
        <div className="preloader-logo">H</div>
        <div className="preloader-bar">
          <div className="preloader-bar-fill"></div>
        </div>
      </div>
    </div>
  )
}
