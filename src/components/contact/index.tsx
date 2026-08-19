
import React from 'react'
import HeaderOne from '@/layouts/headers/HeaderOne'
import Breadcrumb from '../common/Breadcrumb'
import ContactArea from '../home/ContactArea'
import FooterOne from '@/layouts/footers/FooterOne'
import { DottedMap } from '@/components/ui/dotted-map'
import type { Marker } from '@/components/ui/dotted-map'

type MyMarker = Marker & {
  overlay: {
    countryCode: string
    label: string
  }
}

const markers: MyMarker[] = [
  {
    lat: 6.9271,
    lng: 79.8612,
    size: 2.8,
    pulse: true,
    overlay: { countryCode: "lk", label: "Colombo" },
  },
]

export default function Contact() {
  const id = React.useId()
  return (
    <>

      <HeaderOne />
      <div id="smooth-wrapper">
        <div id="smooth-content">
          <main>
            <Breadcrumb title="Say Hello" style_3={true} />
            <ContactArea />
          </main>
          <div className="relative h-[400px] w-full overflow-hidden" style={{ backgroundColor: "#E4E4DF" }}>
            <DottedMap<MyMarker>
              markers={markers}
              dotColor="#000000"
              markerColor="#c9a84c"
              renderMarkerOverlay={({ marker, x, y, r, index }) => {
                const { countryCode, label } = marker.overlay
                const href = `https://flagcdn.com/w80/${countryCode}.webp`

                const clipId = `${id}-flag-clip-${index}`.replace(/:/g, "-")
                const imgR = r * 0.75

                const fontSize = r * 0.9
                const pillH = r * 1.5
                const pillW = label.length * (fontSize * 0.62) + r * 1.4
                const pillX = x + r + r * 0.6
                const pillY = y - pillH / 2

                return (
                  <g style={{ pointerEvents: "none" }}>
                    <clipPath id={clipId}>
                      <circle cx={x} cy={y} r={imgR} />
                    </clipPath>

                    <image
                      href={href}
                      x={x - imgR}
                      y={y - imgR}
                      width={imgR * 2}
                      height={imgR * 2}
                      preserveAspectRatio="xMidYMid slice"
                      clipPath={`url(#${clipId})`}
                    />

                    <rect
                      x={pillX}
                      y={pillY}
                      width={pillW}
                      height={pillH}
                      rx={pillH / 2}
                      fill="rgba(0,0,0,0.55)"
                    />
                    <text
                      x={pillX + r * 0.7}
                      y={y + fontSize * 0.35}
                      fontSize={fontSize}
                      fill="white"
                    >
                      {label}
                    </text>
                  </g>
                )
              }}
            />
          </div>
          <FooterOne />
        </div>
      </div>

    </>
  )
}
