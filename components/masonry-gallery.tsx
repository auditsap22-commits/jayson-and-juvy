"use client"

import { useEffect, useRef, useState } from "react"
import { createPortal } from "react-dom"
import Image from "next/image"

type ImageItem = {
  src: string
  category: "desktop" | "mobile" | "front" | "gallery"
  width: number
  height: number
  orientation: "portrait" | "landscape"
}

export default function MasonryGallery({ images }: { images: ImageItem[] }) {
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null)
  const [mounted, setMounted] = useState(false)
  const topRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (lightboxIdx == null) return
      if (e.key === "Escape") setLightboxIdx(null)
      if (e.key === "ArrowRight") setLightboxIdx((idx) => (idx == null ? null : (idx + 1) % images.length))
      if (e.key === "ArrowLeft") setLightboxIdx((idx) => (idx == null ? null : (idx - 1 + images.length) % images.length))
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [images.length, lightboxIdx])

  const getCardAspect = (image: ImageItem) => {
    if (image.orientation === "portrait" || image.category === "mobile") {
      return "aspect-[4/5]"
    }
    return "aspect-[4/3]"
  }

  return (
    <div ref={topRef} className="relative">
      {/* Header (buttons removed per request) */}
      <div className="mb-6 flex justify-end">
        <div className="font-goudy-italic text-sm" style={{ color: "#6a7b5c" }}>
          {images.length} photos
        </div>
      </div>

      {/* Masonry grid */}
      {images.length === 0 ? (
        <div className="text-center text-[#606C60]/80 font-sans">No images to display.</div>
      ) : (
        <div className="columns-2 sm:columns-2 md:columns-3 lg:columns-4 gap-3 sm:gap-4">
          {images.map((img, idx) => (
          <button
            key={img.src}
            type="button"
            className="group mb-3 sm:mb-4 block w-full cursor-pointer break-inside-avoid text-left"
            onClick={() => setLightboxIdx(idx)}
            aria-label="Open image"
          >
            <div className="relative w-full overflow-hidden rounded-xl border border-[#606C60]/40 bg-white/5 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 hover:border-[#606C60]/60">
              <div className={`relative w-full ${getCardAspect(img)}`}>
                <Image
                  src={img.src}
                  alt=""
                  fill
                  unoptimized
                  sizes="(max-width: 640px) 50vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  className="rounded-xl object-cover object-top transition-transform duration-300 group-hover:scale-[1.02]"
                  loading="lazy"
                />
              </div>
              <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-t from-[#606C60]/40 via-transparent to-transparent z-10" />
            </div>
          </button>
          ))}
        </div>
      )}

      {/* Lightbox */}
      {mounted && lightboxIdx != null && images[lightboxIdx] && createPortal(
        <div
          className="fixed inset-0 z-[9999] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setLightboxIdx(null)}
        >
          <div className="relative max-w-6xl w-full flex items-center justify-center" onClick={(e) => e.stopPropagation()}>
            <button
              className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 text-[#E1D5C7] bg-[#606C60]/80 hover:bg-[#606C60] border border-[#606C60]/50 hover:border-[#606C60] rounded-full px-4 py-2.5 transition-all duration-200 shadow-lg hover:scale-110"
              onClick={() => setLightboxIdx((i) => (i == null ? null : (i - 1 + images.length) % images.length))}
            >
              ‹
            </button>
            <div className="relative max-h-[80vh] w-auto">
              <Image
                src={images[lightboxIdx].src}
                alt=""
                width={images[lightboxIdx].width}
                height={images[lightboxIdx].height}
                unoptimized
                className="max-h-[80vh] w-auto rounded-xl shadow-2xl border border-[#606C60]/30 object-contain"
                priority
              />
            </div>
            <button
              className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 text-[#E1D5C7] bg-[#606C60]/80 hover:bg-[#606C60] border border-[#606C60]/50 hover:border-[#606C60] rounded-full px-4 py-2.5 transition-all duration-200 shadow-lg hover:scale-110"
              onClick={() => setLightboxIdx((i) => (i == null ? null : (i + 1) % images.length))}
            >
              ›
            </button>
            <button
              className="absolute top-3 right-3 text-[#E1D5C7] bg-[#606C60]/80 hover:bg-[#606C60] border border-[#606C60]/50 hover:border-[#606C60] rounded-full px-4 py-2 transition-all duration-200 shadow-lg hover:scale-105 font-sans text-sm"
              onClick={() => setLightboxIdx(null)}
            >
              Close
            </button>
          </div>
        </div>,
        document.body
      )}

      {/* Back to top */}
      <div className="mt-8 flex justify-center">
        <button
          type="button"
          className="px-6 py-3 rounded-full bg-gradient-to-r from-[#E1D5C7] to-[#E1D5C7]/90 text-[#606C60] font-semibold border border-[#606C60] hover:from-[#E1D5C7]/90 hover:to-[#E1D5C7] hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl font-sans"
          onClick={() => topRef.current?.scrollIntoView({ behavior: "smooth" })}
        >
          Back to top
        </button>
      </div>
    </div>
  )
}


