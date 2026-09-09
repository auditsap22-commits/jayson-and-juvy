"use client"

import { useState, useEffect, useCallback } from "react"
import { createPortal } from "react-dom"
import Link from "next/link"
import Image from "next/image"
import localFont from "next/font/local"
import { X, ChevronLeft, ChevronRight, ArrowRight } from "lucide-react"
import { Cinzel } from "next/font/google"
import { Section } from "@/components/section"
import { layeredSectionTitleSize, sectionType } from "@/lib/section-typography"

const paperWash = {
  cream: "#f7f4eb",
  lift: "#f9f6ee",
  sage: "#4b5d44",
  sageSoft: "#6a7b5c",
  wash: "#8b9d78",
} as const

const galleryBackground = `
  radial-gradient(80% 55% at 50% 0%, color-mix(in srgb, #c9d2bc 22%, transparent), transparent 62%),
  radial-gradient(ellipse 70% 42% at 100% 0%, color-mix(in srgb, ${paperWash.wash} 28%, transparent), transparent 68%),
  radial-gradient(ellipse 70% 42% at 0% 100%, color-mix(in srgb, ${paperWash.wash} 22%, transparent), transparent 68%),
  linear-gradient(180deg, #ece6d6 0%, #e4ddcc 100%)
`

const cinzel = Cinzel({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
})

const theSeasons = localFont({
  src: "../../Font/Fontspring-DEMO-theseasons-reg.otf",
  display: "swap",
  variable: "--font-the-seasons",
})

const aboveTheBeyond = localFont({
  src: "../../Font/above-the-beyond-script.otf",
  display: "swap",
  variable: "--font-above-beyond",
})

function CornerDecorations() {
  return (
    <>
      <div className="pointer-events-none absolute left-0 top-0 z-10 w-[clamp(8.5rem,42vw,16.5rem)]">
        <Image
          src="/decoration/left-top-decoration.png"
          alt=""
          width={1138}
          height={1172}
          className="h-auto w-full"
          sizes="(max-width: 768px) 42vw, 264px"
        />
      </div>
      <div className="pointer-events-none absolute right-0 top-0 z-10 w-[clamp(7.5rem,38vw,14.5rem)]">
        <Image
          src="/decoration/right-top-decoration.png"
          alt=""
          width={1283}
          height={1226}
          className="h-auto w-full"
          sizes="(max-width: 768px) 38vw, 232px"
        />
      </div>
      <div className="pointer-events-none absolute bottom-0 left-0 z-10 w-[clamp(7.5rem,38vw,14.5rem)]">
        <Image
          src="/decoration/left-bottom-decoration.png"
          alt=""
          width={1115}
          height={1411}
          className="h-auto w-full"
          sizes="(max-width: 768px) 38vw, 232px"
        />
      </div>
      <div className="pointer-events-none absolute bottom-0 right-0 z-10 w-[clamp(8.5rem,42vw,16.5rem)]">
        <Image
          src="/decoration/right-bottom-decoration.png"
          alt=""
          width={988}
          height={1487}
          className="h-auto w-full"
          sizes="(max-width: 768px) 42vw, 264px"
        />
      </div>
    </>
  )
}

function OrnamentalDivider() {
  return (
    <div className="flex items-center justify-center gap-1.5">
      <span
        className="h-px w-6 sm:w-10"
        style={{
          background:
            "linear-gradient(to right, transparent, color-mix(in srgb, #4b5d44 38%, transparent))",
        }}
      />
      <span
        className="h-0.5 w-0.5 rounded-full sm:h-1 sm:w-1"
        style={{ backgroundColor: paperWash.sageSoft }}
        aria-hidden
      />
      <span
        className="h-px w-6 sm:w-10"
        style={{
          background:
            "linear-gradient(to left, transparent, color-mix(in srgb, #4b5d44 38%, transparent))",
        }}
      />
    </div>
  )
}

function GalleryTitle() {
  return (
    <h2
      className="welcome-title-lockup relative mx-auto w-full max-w-full text-center mt-8 sm:mt-10 md:mt-12"
      style={
        {
          "--title-size": layeredSectionTitleSize.main,
          "--script-size": layeredSectionTitleSize.script,
        } as React.CSSProperties
      }
    >
      <span
        className={`${theSeasons.className} block uppercase leading-[0.78] tracking-[0.08em] min-[400px]:tracking-[0.11em] sm:tracking-[0.13em] md:tracking-[0.14em] mt-4 pb-1 sm:mt-5 sm:pb-1.5 md:mt-6`}
        style={{
          fontSize: "var(--title-size)",
          color: paperWash.sage,
        }}
      >
        Gallery
      </span>
      <span
        aria-hidden
        className={`${aboveTheBeyond.className} mx-auto block w-fit max-w-full px-1 leading-[0.88] sm:leading-[0.9] mt-2 sm:mt-2.5 md:mt-3`}
        style={{
          fontSize: "var(--script-size)",
          color: paperWash.sageSoft,
        }}
      >
        our favorite moments
      </span>
      <span className="sr-only">our favorite moments</span>
    </h2>
  )
}

const galleryItems = [
  { image: "/mobile_display/couple (1).png", text: " " },
  { image: "/mobile_display/couple (2).png", text: " " },
  { image: "/mobile_display/couple (3).png", text: " " },
  { image: "/mobile_display/couple (4).png", text: " " },
  { image: "/mobile_display/couple (5).png", text: " " },
  { image: "/mobile_display/couple (6).png", text: " " },
]

export function Gallery() {
  const [selectedImage, setSelectedImage] = useState<(typeof galleryItems)[0] | null>(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  // reserved for potential skeleton tracking; not used after fade-in simplification
  const [touchStartX, setTouchStartX] = useState<number | null>(null)
  const [touchDeltaX, setTouchDeltaX] = useState(0)
  const [zoomScale, setZoomScale] = useState(1)
  const [pan, setPan] = useState({ x: 0, y: 0 })
  const [pinchStartDist, setPinchStartDist] = useState<number | null>(null)
  const [pinchStartScale, setPinchStartScale] = useState(1)
  const [lastTap, setLastTap] = useState(0)
  const [panStart, setPanStart] = useState<{ x: number; y: number; panX: number; panY: number } | null>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    // Simulate loading for better UX
    const timer = setTimeout(() => setIsLoading(false), 500)
    return () => clearTimeout(timer)
  }, [])

  const navigateImage = useCallback((direction: 'prev' | 'next') => {
    setCurrentIndex((prevIndex) => {
      let newIndex = prevIndex
      if (direction === 'next') {
        newIndex = (prevIndex + 1) % galleryItems.length
      } else {
        newIndex = (prevIndex - 1 + galleryItems.length) % galleryItems.length
      }
      setSelectedImage(galleryItems[newIndex])
      return newIndex
    })
  }, [])

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (!selectedImage) return
      if (e.key === 'ArrowLeft') navigateImage('prev')
      if (e.key === 'ArrowRight') navigateImage('next')
      if (e.key === 'Escape') setSelectedImage(null)
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [selectedImage, currentIndex, navigateImage])

  // Prevent background scroll when lightbox is open
  useEffect(() => {
    if (selectedImage) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [selectedImage])

  // Preload adjacent images for smoother nav
  useEffect(() => {
    if (selectedImage) {
      const next = new window.Image()
      next.src = galleryItems[(currentIndex + 1) % galleryItems.length].image
      const prev = new window.Image()
      prev.src = galleryItems[(currentIndex - 1 + galleryItems.length) % galleryItems.length].image
    }
  }, [selectedImage, currentIndex])

  const clamp = (val: number, min: number, max: number) => Math.min(max, Math.max(min, val))
  const resetZoom = () => {
    setZoomScale(1)
    setPan({ x: 0, y: 0 })
    setPanStart(null)
  }

  return (
    <div
      className={`${theSeasons.variable} ${aboveTheBeyond.variable} relative w-full overflow-x-hidden`}
      style={{ background: galleryBackground }}
    >
      <Section
        id="gallery"
        className="relative z-10 overflow-hidden pt-8 pb-8 sm:pt-10 sm:pb-10 md:pt-12 md:pb-12 lg:pt-14 lg:pb-14"
      >
      <CornerDecorations />

      <div className="relative z-20 mx-auto mb-6 max-w-5xl px-4 text-center @container/gallery sm:mb-8 sm:px-10 md:mb-10 md:px-12">
        <div className="mx-auto mb-5 sm:mb-6 md:mb-7">
          <OrnamentalDivider />
        </div>
        <GalleryTitle />
        <p
          className={`font-goudy-italic mx-auto mt-4 max-w-xl px-2 sm:mt-5 md:mt-6 ${sectionType.textRelaxed}`}
          style={{ color: paperWash.sage }}
        >
          From our first chapter to this beautiful season of commitment — every moment has been a
          testament to love, faith, and grace.
        </p>
      </div>

      {/* Gallery content — images outside container */}
      <div className="relative z-20 w-full max-w-6xl mx-auto px-6 sm:px-10 md:px-12 pb-2 sm:pb-3">
        {isLoading ? (
          <div className="flex items-center justify-center h-64 sm:h-80 md:h-96">
            <div
              className="h-12 w-12 animate-spin rounded-full border-[3px]"
              style={{
                borderColor: "color-mix(in srgb, #4b5d44 30%, transparent)",
                borderTopColor: paperWash.sage,
              }}
            />
          </div>
        ) : (
          <>
            {/* Mobile: swipeable sliding gallery (scroll-snap carousel) */}
            <div className="sm:hidden">
              <div
                className="flex gap-3 overflow-x-auto px-1 pb-3 snap-x snap-mandatory scroll-px-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
                aria-label="Gallery carousel"
              >
                {galleryItems.map((item, index) => (
                  <button
                    key={item.image + index}
                    type="button"
                    className="group relative snap-center shrink-0 w-[82%] cursor-pointer overflow-hidden rounded-lg transition-all duration-300"
                    onClick={() => {
                      resetZoom()
                      setSelectedImage(item)
                      setCurrentIndex(index)
                    }}
                    aria-label={`Open image ${index + 1}`}
                  >
                    <div
                      className="pointer-events-none absolute -inset-0.5 rounded-lg opacity-0 blur-sm transition-opacity duration-300 group-active:opacity-100"
                      style={{
                        background:
                          "color-mix(in srgb, #6a7b5c 25%, transparent)",
                      }}
                    />

                    <div className="relative aspect-[3/4] overflow-hidden rounded-lg">
                      <Image
                        src={item.image}
                        alt={item.text || `Gallery image ${index + 1}`}
                        fill
                        sizes="82vw"
                        className="object-cover transition-transform duration-500 group-active:scale-[1.02]"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-active:opacity-100 transition-opacity duration-300" />
                    </div>

                    <div
                      className="absolute top-2 right-2 rounded-full px-2 py-1 backdrop-blur-sm"
                      style={{
                        backgroundColor:
                          "color-mix(in srgb, #4b5d44 65%, transparent)",
                      }}
                    >
                      <span
                        className="text-xs font-medium"
                        style={{ color: paperWash.cream }}
                      >
                        {index + 1}/{galleryItems.length}
                      </span>
                    </div>
                  </button>
                ))}
              </div>

              <p
                className="font-goudy-italic mt-3 text-center text-[0.8125rem] italic leading-[1.55] tracking-[0.02em] sm:text-[0.92rem]"
                style={{ color: paperWash.sageSoft }}
              >
                Swipe to explore
              </p>
            </div>

            {/* Tablet/Desktop: grid */}
            <div className="hidden sm:grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-5 lg:gap-6">
              {galleryItems.map((item, index) => (
                <button
                  key={item.image + index}
                  type="button"
                  className="group relative w-full cursor-pointer overflow-hidden rounded-xl transition-all duration-300"
                  onClick={() => {
                    resetZoom()
                    setSelectedImage(item)
                    setCurrentIndex(index)
                  }}
                  aria-label={`Open image ${index + 1}`}
                >
                  <div
                    className="pointer-events-none absolute -inset-0.5 rounded-xl opacity-0 blur-sm transition-opacity duration-300 group-hover:opacity-100"
                    style={{
                      background:
                        "color-mix(in srgb, #6a7b5c 22%, transparent)",
                    }}
                  />

                  <div className="relative aspect-[3/4] md:aspect-square overflow-hidden rounded-xl">
                    <Image
                      src={item.image}
                      alt={item.text || `Gallery image ${index + 1}`}
                      fill
                      sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 20vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>

                  <div
                    className="absolute top-2 right-2 rounded-full px-2 py-1 opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100"
                    style={{
                      backgroundColor:
                        "color-mix(in srgb, #4b5d44 65%, transparent)",
                    }}
                  >
                    <span
                      className="text-xs font-medium"
                      style={{ color: paperWash.cream }}
                    >
                      {index + 1}/{galleryItems.length}
                    </span>
                  </div>
                </button>
              ))}
            </div>

            <div className="relative mt-10 px-2 pb-6 text-center sm:mt-12 sm:pb-8 md:mt-14 md:pb-10">
              <div className="mx-auto mb-5 sm:mb-6">
                <OrnamentalDivider />
              </div>
              <div className="flex justify-center">
                <Link
                  href="/gallery"
                  className={`${cinzel.className} group inline-flex items-center justify-center gap-3 rounded-full border py-[0.28rem] pl-6 pr-[0.28rem] text-[0.625rem] font-semibold uppercase tracking-[0.2em] transition-all duration-300 hover:-translate-y-0.5 sm:gap-3.5 sm:pl-7 sm:text-[0.6875rem]`}
                  style={{
                    backgroundColor: paperWash.sage,
                    borderColor: "color-mix(in srgb, #4b5d44 35%, transparent)",
                    color: paperWash.cream,
                    boxShadow: "0 8px 22px color-mix(in srgb, #4b5d44 22%, transparent)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "#3d4a36"
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = paperWash.sage
                  }}
                >
                  <span>View Full Gallery</span>
                  <span
                    className="flex h-[2.15rem] w-[2.15rem] items-center justify-center rounded-full"
                    style={{
                      backgroundColor: paperWash.cream,
                      color: paperWash.sage,
                    }}
                  >
                    <ArrowRight
                      className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5"
                      strokeWidth={2.25}
                      aria-hidden
                    />
                  </span>
                </Link>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Lightbox Modal */}
      {mounted && selectedImage && createPortal(
        <div
          className="fixed inset-0 z-[9999] bg-black/95 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4"
          onClick={() => {
            setSelectedImage(null)
            resetZoom()
          }}
        >
            <div
              className="relative max-w-6xl w-full h-full sm:h-auto flex flex-col items-center justify-center"
              onTouchStart={(e) => {
                if (e.touches.length === 1) {
                  const now = Date.now()
                  if (now - lastTap < 300) {
                    setZoomScale((s) => (s > 1 ? 1 : 2))
                    setPan({ x: 0, y: 0 })
                  }
                  setLastTap(now)
                  const t = e.touches[0]
                  setTouchStartX(t.clientX)
                  setTouchDeltaX(0)
                  if (zoomScale > 1) {
                    setPanStart({ x: t.clientX, y: t.clientY, panX: pan.x, panY: pan.y })
                  }
                }
                if (e.touches.length === 2) {
                  const dx = e.touches[0].clientX - e.touches[1].clientX
                  const dy = e.touches[0].clientY - e.touches[1].clientY
                  const dist = Math.hypot(dx, dy)
                  setPinchStartDist(dist)
                  setPinchStartScale(zoomScale)
                }
              }}
              onTouchMove={(e) => {
                if (e.touches.length === 2 && pinchStartDist) {
                  const dx = e.touches[0].clientX - e.touches[1].clientX
                  const dy = e.touches[0].clientY - e.touches[1].clientY
                  const dist = Math.hypot(dx, dy)
                  const scale = clamp((dist / pinchStartDist) * pinchStartScale, 1, 3)
                  setZoomScale(scale)
                } else if (e.touches.length === 1) {
                  const t = e.touches[0]
                  if (zoomScale > 1 && panStart) {
                    const dx = t.clientX - panStart.x
                    const dy = t.clientY - panStart.y
                    setPan({ x: panStart.panX + dx, y: panStart.panY + dy })
                  } else if (touchStartX !== null) {
                    setTouchDeltaX(t.clientX - touchStartX)
                  }
                }
              }}
              onTouchEnd={() => {
                setPinchStartDist(null)
                setPanStart(null)
                if (zoomScale === 1 && Math.abs(touchDeltaX) > 50) {
                  navigateImage(touchDeltaX > 0 ? 'prev' : 'next')
                }
                setTouchStartX(null)
                setTouchDeltaX(0)
              }}
            >
            {/* Top bar with counter and close */}
            <div className="absolute top-0 left-0 right-0 z-30 flex items-center justify-between p-4 sm:p-6">
              {/* Image counter */}
              <div
                className="rounded-full border px-4 py-2 backdrop-blur-md"
                style={{
                  backgroundColor: "rgba(0,0,0,0.4)",
                  borderColor:
                    "color-mix(in srgb, var(--color-welcome-green) 50%, transparent)",
                }}
              >
                <span
                  className="text-sm font-medium sm:text-base"
                  style={{ color: "var(--color-welcome-bg)" }}
                >
                  {currentIndex + 1} / {galleryItems.length}
                </span>
              </div>
              
              {/* Close button */}
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  setSelectedImage(null)
                  resetZoom()
                }}
                className="bg-black/40 hover:bg-black/60 backdrop-blur-md rounded-full p-2 sm:p-3 transition-all duration-200 border border-white/20 hover:border-white/40"
                aria-label="Close lightbox"
              >
                <X size={20} className="sm:w-6 sm:h-6 text-white" />
              </button>
            </div>

            {/* Navigation buttons */}
            {galleryItems.length > 1 && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    navigateImage('prev')
                    resetZoom()
                  }}
                  className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-20 bg-black/40 hover:bg-black/60 backdrop-blur-md rounded-full p-3 sm:p-4 transition-all duration-200 border border-white/20 hover:border-white/40"
                  aria-label="Previous image"
                >
                  <ChevronLeft size={24} className="sm:w-7 sm:h-7 text-white" />
                </button>

                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    navigateImage('next')
                    resetZoom()
                  }}
                  className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-20 bg-black/40 hover:bg-black/60 backdrop-blur-md rounded-full p-3 sm:p-4 transition-all duration-200 border border-white/20 hover:border-white/40"
                  aria-label="Next image"
                >
                  <ChevronRight size={24} className="sm:w-7 sm:h-7 text-white" />
                </button>
              </>
            )}

            {/* Image container */}
            <div className="relative w-full h-full flex items-center justify-center pt-16 sm:pt-20 pb-4 sm:pb-6 overflow-hidden">
              <div
                className="relative inline-block max-w-full max-h-full"
                onClick={(e) => e.stopPropagation()}
              >
                <Image
                  src={selectedImage.image || "/placeholder.svg"}
                  alt={selectedImage.text || "Gallery image"}
                  width={1200}
                  height={1600}
                  sizes="100vw"
                  priority
                  style={{
                    transform: `translate3d(${pan.x}px, ${pan.y}px, 0) scale(${zoomScale})`,
                    transition: pinchStartDist ? "none" : "transform 200ms ease-out",
                  }}
                  className="max-w-full max-h-[75vh] w-auto h-auto sm:max-h-[85vh] object-contain rounded-lg shadow-2xl will-change-transform"
                />
                
                {/* Zoom reset button */}
                {zoomScale > 1 && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      resetZoom()
                    }}
                    className="absolute bottom-2 right-2 bg-black/60 hover:bg-black/80 backdrop-blur-md text-white rounded-full px-3 py-1.5 text-xs font-medium border border-white/20 transition-all duration-200"
                  >
                    Reset Zoom
                  </button>
                )}
              </div>
            </div>

            {/* Bottom hint for mobile */}
            {galleryItems.length > 1 && (
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 sm:hidden z-20">
                <p className="text-xs text-white/60 bg-black/40 backdrop-blur-sm rounded-full px-3 py-1.5 border border-white/10">
                  Swipe to navigate
                </p>
              </div>
            )}
          </div>
        </div>,
        document.body
      )}
      </Section>
    </div>
  )
}