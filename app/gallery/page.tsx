import Image from "next/image"
import MasonryGallery from "@/components/masonry-gallery"
import { getSiteConfig } from "@/lib/site-config"
import { fetchGalleryImages } from "@/lib/fetch-gallery-images"
import localFont from "next/font/local"
import { Cinzel } from "next/font/google"

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

export const dynamic = "force-static"

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

function GalleryCoupleLabel({ groom, bride }: { groom: string; bride: string }) {
  const lineStyle = {
    background:
      "linear-gradient(to right, transparent, color-mix(in srgb, #4b5d44 35%, transparent))",
  }

  return (
    <div className="flex items-center justify-center gap-2.5 sm:gap-3.5">
      <span className="h-px w-5 sm:w-7 md:w-9" style={lineStyle} aria-hidden />
      <p
        className={`${cinzel.className} shrink-0 py-0.5 text-[0.525rem] font-semibold uppercase leading-normal tracking-[0.34em] min-[400px]:text-[0.55rem] min-[400px]:tracking-[0.38em] sm:text-[0.575rem] sm:tracking-[0.44em]`}
        style={{ color: paperWash.sage }}
      >
        With {groom}
        <span
          className={`${aboveTheBeyond.className} mx-1.5 inline-block normal-case tracking-normal sm:mx-2`}
          style={{
            fontSize: "1.35em",
            color: paperWash.sageSoft,
            verticalAlign: "middle",
          }}
          aria-hidden
        >
          &
        </span>
        {bride}
      </p>
      <span
        className="h-px w-5 sm:w-7 md:w-9"
        style={{
          background:
            "linear-gradient(to left, transparent, color-mix(in srgb, #4b5d44 35%, transparent))",
        }}
        aria-hidden
      />
    </div>
  )
}

function GalleryTitle() {
  return (
    <h1
      className="relative mx-auto w-full max-w-full text-center"
      style={
        {
          "--title-size": "clamp(2.15rem, 11vw, 4.5rem)",
          "--script-size": "clamp(1.1rem, 4.5vw, 2.25rem)",
        } as React.CSSProperties
      }
    >
      <span
        className={`${theSeasons.className} block uppercase leading-[0.78] tracking-[0.08em] min-[400px]:tracking-[0.11em] sm:tracking-[0.13em] md:tracking-[0.14em] pb-1 sm:pb-1.5`}
        style={{
          fontSize: "var(--title-size)",
          color: paperWash.sage,
        }}
      >
        Gallery
      </span>
      <span
        aria-hidden
        className={`${aboveTheBeyond.className} mx-auto mt-2 block w-fit max-w-full px-1 leading-[0.88] sm:mt-2.5 sm:leading-[0.9] md:mt-3`}
        style={{
          fontSize: "var(--script-size)",
          color: paperWash.sageSoft,
        }}
      >
        our favorite moments
      </span>
      <span className="sr-only">our favorite moments</span>
    </h1>
  )
}

function toGalleryItems(
  srcs: string[],
  category: "desktop" | "mobile",
) {
  const isMobile = category === "mobile"
  return srcs.map((src) => ({
    src,
    category,
    width: isMobile ? 900 : 1600,
    height: isMobile ? 1200 : 900,
    orientation: (isMobile ? "portrait" : "landscape") as "portrait" | "landscape",
  }))
}

export default async function GalleryPage() {
  const siteConfig = await getSiteConfig()
  const { desktop, mobile } = await fetchGalleryImages()
  const images = [
    ...toGalleryItems(desktop, "desktop"),
    ...toGalleryItems(mobile, "mobile"),
  ]

  return (
    <main
      className={`${theSeasons.variable} ${aboveTheBeyond.variable} relative min-h-screen overflow-x-hidden`}
      style={{ background: galleryBackground }}
    >
      <CornerDecorations />

      <section className="relative z-20 mx-auto max-w-7xl px-3 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
        <div className="mb-6 px-3 text-center sm:mb-8 sm:px-4 md:mb-10">
          <GalleryCoupleLabel
            groom={siteConfig.couple.groomNickname}
            bride={siteConfig.couple.brideNickname}
          />
          <div className="my-4 sm:my-5 md:my-6">
            <GalleryTitle />
          </div>
          <p
            className="font-goudy-italic mx-auto max-w-2xl px-2 text-[0.75rem] leading-[1.62] sm:text-[0.8125rem] sm:leading-[1.65] md:text-[0.84375rem]"
            style={{ color: paperWash.sage }}
          >
            From our first chapter to this beautiful season of commitment — every moment has been a
            testament to love, faith, and grace.
          </p>

          <div className="flex items-center justify-center gap-2 pt-3 sm:pt-4">
            <span
              className="h-px w-8 sm:w-12 md:w-16"
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
              className="h-px w-8 sm:w-12 md:w-16"
              style={{
                background:
                  "linear-gradient(to left, transparent, color-mix(in srgb, #4b5d44 38%, transparent))",
              }}
            />
          </div>
        </div>

        {images.length > 0 ? (
          <MasonryGallery images={images} />
        ) : (
          <p
            className="text-center font-goudy-italic text-sm"
            style={{ color: paperWash.sageSoft }}
          >
            No images to display.
          </p>
        )}
      </section>
    </main>
  )
}
