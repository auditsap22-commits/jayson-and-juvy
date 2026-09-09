"use client"

import { Section } from "@/components/section"
import { useState, useEffect, type ReactNode } from "react"
import { QRCodeSVG } from "qrcode.react"
import { useSiteConfig } from "@/hooks/use-site-config"
import Image from "next/image"
import localFont from "next/font/local"
import { Cinzel } from "next/font/google"
import {
  Shirt,
  Clock,
  Utensils,
  Copy,
  Check,
  Navigation,
  Heart,
  Camera,
  X,
  MapPin,
} from "lucide-react"

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

const detailsBackground = `
  radial-gradient(80% 55% at 50% 0%, color-mix(in srgb, #c9d2bc 22%, transparent), transparent 62%),
  radial-gradient(ellipse 70% 42% at 100% 0%, color-mix(in srgb, ${paperWash.wash} 28%, transparent), transparent 68%),
  radial-gradient(ellipse 70% 42% at 0% 100%, color-mix(in srgb, ${paperWash.wash} 22%, transparent), transparent 68%),
  linear-gradient(180deg, #ece6d6 0%, #e4ddcc 100%)
`

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

const detailText = {
  body: paperWash.sage,
  heading: paperWash.sage,
  label: paperWash.sageSoft,
  accent: paperWash.sageSoft,
} as const

const cardStyle = {
  background: paperWash.lift,
  borderColor: "color-mix(in srgb, #4b5d44 22%, transparent)",
  borderWidth: "1px",
  borderStyle: "solid",
  boxShadow:
    "0 8px 28px color-mix(in srgb, #4b5d44 10%, transparent), inset 0 1px 0 color-mix(in srgb, white 70%, transparent)",
} as const

const softPanelStyle = {
  borderColor: "color-mix(in srgb, #4b5d44 16%, transparent)",
  backgroundColor: paperWash.cream,
} as const

const QR_FG = paperWash.sage
const QR_BG = paperWash.lift

function SectionIconDivider({ icon }: { icon: React.ReactNode }) {
  return (
    <div className="flex items-center justify-center gap-2 pt-1 sm:pt-2">
      <span
        className="h-px w-8 sm:w-12 md:w-16"
        style={{
          background:
            "linear-gradient(to right, transparent, color-mix(in srgb, #4b5d44 38%, transparent))",
        }}
      />
      {icon}
      <span
        className="h-px w-8 sm:w-12 md:w-16"
        style={{
          background:
            "linear-gradient(to left, transparent, color-mix(in srgb, #4b5d44 38%, transparent))",
        }}
      />
    </div>
  )
}

function DetailsTitle() {
  return (
    <h2
      className="relative mx-auto w-full max-w-full text-center"
      style={
        {
          "--title-size": "clamp(2.15rem, 11vw, 4.5rem)",
          "--script-size": "clamp(1.1rem, 4.5vw, 2.25rem)",
        } as React.CSSProperties
      }
    >
      <span
        className={`${theSeasons.className} block uppercase leading-[0.78] tracking-[0.08em] min-[400px]:tracking-[0.11em] sm:tracking-[0.15em] md:tracking-[0.18em] pb-1 sm:pb-1.5`}
        style={{
          fontSize: "var(--title-size)",
          color: paperWash.sage,
        }}
      >
        Event Details
      </span>
      <span
        aria-hidden
        className={`${aboveTheBeyond.className} mx-auto block w-fit max-w-full px-1 leading-[0.88] sm:leading-[0.9] mt-2 sm:mt-2.5 md:mt-3`}
        style={{
          fontSize: "var(--script-size)",
          color: paperWash.sageSoft,
        }}
      >
        our special day
      </span>
      <span className="sr-only">our special day</span>
    </h2>
  )
}

// Slightly compact type inside card containers (not the page header)
const ct = {
  label: "text-[11px] sm:text-xs md:text-sm",
  labelSm: "text-[10px] sm:text-[11px] md:text-xs",
  body: "text-xs sm:text-sm md:text-base",
  bodyMd: "text-xs sm:text-sm md:text-base lg:text-lg",
  bodyLg: "text-sm sm:text-base md:text-lg",
  subhead: "text-xs sm:text-sm md:text-base lg:text-lg",
  time: "text-xs sm:text-sm md:text-base lg:text-xl",
  cardTitle: "text-sm sm:text-lg md:text-xl lg:text-2xl",
  overlayTitle: "text-sm sm:text-lg md:text-xl lg:text-2xl",
  overlaySub: "text-xs sm:text-sm md:text-base",
  month: "text-base sm:text-xl md:text-2xl lg:text-3xl",
  dayNum: "text-2xl sm:text-4xl md:text-5xl lg:text-6xl",
  year: "text-base sm:text-xl md:text-2xl lg:text-3xl",
  sectionTitle: "text-sm sm:text-lg md:text-xl lg:text-2xl",
  attireCardTitle: "text-sm sm:text-lg md:text-xl lg:text-2xl",
  btn: "text-xs sm:text-sm md:text-base",
  noteTitle: "text-xl sm:text-2xl md:text-3xl",
  reminderHead: "text-base sm:text-lg md:text-xl",
  reminderBody: "text-xs sm:text-sm md:text-base lg:text-lg",
} as const

const reminderInk = {
  navy: paperWash.sage,
  deep: "#3d4a36",
  slate: paperWash.sageSoft,
  gold: paperWash.sageSoft,
  champagne: "#c9d2bc",
} as const

function ColorPalette({
  colors,
  frame = "white",
}: {
  colors: readonly string[]
  frame?: "white" | "gold"
}) {
  const widthClass = colors.length > 4 ? "max-w-md" : "max-w-xs sm:max-w-sm"

  return (
    <div
      className={`mx-auto flex h-8 w-full overflow-hidden rounded-full border-2 sm:h-9 ${widthClass}`}
      role="img"
      aria-label={`Color palette: ${colors.join(", ")}`}
      style={{
        borderColor: frame === "gold" ? reminderInk.champagne : "#FFFFFF",
      }}
    >
      {colors.map((color) => (
        <div
          key={color}
          className="min-w-0 flex-1"
          style={{ backgroundColor: color }}
          title={color}
        />
      ))}
    </div>
  )
}

const INVITATION_WORD = "/decoration/deco/invitation-word-image.png"

function InvitationWordDeco({ side }: { side: "left" | "right" }) {
  return (
    <div
      className={`pointer-events-none absolute top-[7%] bottom-[7%] z-[5] w-[1.7rem] sm:w-[2.55rem] md:w-[3.4rem] lg:w-[4.15rem] ${
        side === "left"
          ? "left-2.5 sm:left-3.5 md:left-4"
          : "right-2.5 sm:right-3.5 md:right-4"
      }`}
      aria-hidden
    >
      <div
        className={`h-full w-full ${side === "right" ? "-scale-x-100" : ""}`}
        style={{
          backgroundColor: reminderInk.champagne,
          WebkitMaskImage: `url("${INVITATION_WORD}")`,
          maskImage: `url("${INVITATION_WORD}")`,
          WebkitMaskRepeat: "no-repeat",
          maskRepeat: "no-repeat",
          WebkitMaskSize: "contain",
          maskSize: "contain",
          WebkitMaskPosition: "center",
          maskPosition: "center",
        }}
      />
    </div>
  )
}

function ReminderTone({
  label,
  children,
  emphasized = false,
}: {
  label: string
  children: ReactNode
  emphasized?: boolean
}) {
  return (
    <div className="mx-auto w-full max-w-[34rem] space-y-2 text-center sm:space-y-2.5">
      <p
        className={`${cinzel.className} font-semibold uppercase ${
          emphasized
            ? "text-[11px] tracking-[0.28em] underline decoration-[1.5px] underline-offset-[0.35em] sm:text-xs md:text-[13px]"
            : "text-[10px] tracking-[0.22em] sm:text-[11px] md:text-xs"
        }`}
        style={{ color: reminderInk.gold }}
      >
        {label}
      </p>
      <p
        className={`font-goudy-italic ${ct.reminderBody} mx-auto max-w-prose text-pretty leading-[1.75] ${
          emphasized ? "font-semibold" : ""
        }`}
        style={{ color: reminderInk.champagne }}
      >
        {children}
      </p>
    </div>
  )
}

function ReminderCard({
  title,
  children,
}: {
  title: string
  children: ReactNode
}) {
  return (
    <article className="mx-auto flex w-full max-w-[34rem] flex-col items-center text-center">
      <h4
        className={`${cinzel.className} mb-5 max-w-[18ch] text-balance font-bold uppercase tracking-[0.12em] sm:mb-7 md:mb-8`}
        style={{
          color: reminderInk.champagne,
          fontSize: "clamp(0.98rem, 4.2vw, 1.85rem)",
        }}
      >
        {title}
      </h4>
      <div className="flex w-full flex-col items-center gap-6 sm:gap-8 md:gap-9">
        {children}
      </div>
    </article>
  )
}

const attireGuide = {
  entourage: {
    image: "/Details/entourage.png",
    imageAspect: "3/2",
    ladies: {
      colors: ["#DFE8DD", "#BFCFB8", "#8EA58C", "#738A6E", "#344C3D"] as const,
      description:
        "Ladies are requested to wear a floor-length gown in Evergreen or Moss. Sage, Mint, and Sage Hint from our palette may also be worn.",
    },
    gentlemen: {
      colors: ["#DFE8DD", "#344C3D"] as const,
      description:
        "Gentlemen are requested to wear a long-sleeved Sage Hint Barong Tagalog, paired with tailored Evergreen trousers and polished black formal shoes.",
    },
  },
  guests: {
    image: "/Details/guest.png",
    imageAspect: "3/2",
    ladies: {
      colors: ["#DFE8DD", "#BFCFB8", "#8EA58C", "#738A6E", "#344C3D"] as const,
      description:
        "Ladies may wear a midi, cocktail, or casual dress in Sage Hint, Mint, Sage, Moss, or Evergreen. Comfortable styles are most welcome, so long as they stay within the palette.",
    },
    gentlemen: {
      colors: ["#DFE8DD", "#BFCFB8", "#8EA58C", "#738A6E", "#344C3D"] as const,
      description:
        "Gentlemen may wear a collared shirt or a casual polo in Sage Hint, Mint, Sage, Moss, or Evergreen, paired with trousers and comfortable shoes.",
    },
  },
} as const

const dressCodePalette = [
  { name: "SAGE HINT", hex: "#DFE8DD" },
  { name: "MINT", hex: "#BFCFB8" },
  { name: "SAGE", hex: "#8EA58C" },
  { name: "MOSS", hex: "#738A6E" },
  { name: "EVERGREEN", hex: "#344C3D" },
] as const

const dressCodePalettePanelStyle = {
  borderColor: "color-mix(in srgb, #4b5d44 10%, transparent)",
  backgroundColor: paperWash.lift,
  color: paperWash.sage,
} as const

function DressCodePaletteSwatch({
  name,
  hex,
  isLast = false,
}: (typeof dressCodePalette)[number] & { isLast?: boolean }) {
  const n = Number.parseInt(hex.slice(1), 16)
  const r = (n >> 16) & 255
  const g = (n >> 8) & 255
  const b = n & 255
  const isLight = 0.299 * r + 0.587 * g + 0.114 * b > 165

  return (
    <div
      className={`flex min-w-0 flex-1 flex-col ${isLast ? "" : "border-r border-white"}`}
    >
      <div
        className="relative flex min-h-[132px] w-full items-center justify-center sm:min-h-[168px] md:min-h-[200px] lg:min-h-[232px]"
        style={{ backgroundColor: hex }}
      >
        <span
          className={`text-[6px] font-semibold uppercase tracking-[0.08em] sm:text-[7px] md:text-[8px] lg:text-[9px] ${
            isLight ? "text-[#3D3429]" : "text-white"
          }`}
          style={{ writingMode: "vertical-rl", textOrientation: "mixed" }}
        >
          {name}
        </span>
      </div>
    </div>
  )
}

function DressCodePaletteHeader() {
  return (
    <div
      className="px-3 py-5 sm:px-4 sm:py-6 md:px-5 md:py-7"
      style={dressCodePalettePanelStyle}
    >
      <div className="mx-auto max-w-3xl text-center">
        <h5
          className={`${cinzel.className} text-sm font-semibold uppercase tracking-[0.14em] sm:text-base md:text-lg lg:text-xl`}
        >
          Dress Code Palette
        </h5>
        <p
          className={`${aboveTheBeyond.className} mt-1 text-lg leading-none sm:mt-1.5 sm:text-xl md:text-2xl`}
          style={{ color: paperWash.sageSoft }}
        >
          Entourage and Guests
        </p>
        <div className="mx-auto mt-3 flex max-w-xs items-center justify-center gap-2 sm:mt-4 sm:max-w-sm md:max-w-md">
          <span className="h-px flex-1" style={{ backgroundColor: "color-mix(in srgb, #4b5d44 30%, transparent)" }} />
          <Heart className="h-2.5 w-2.5 shrink-0 sm:h-3 sm:w-3" style={{ color: paperWash.sageSoft }} aria-hidden />
          <span className="h-px flex-1" style={{ backgroundColor: "color-mix(in srgb, #4b5d44 30%, transparent)" }} />
        </div>
      </div>
    </div>
  )
}

function DressCodePaletteCaption() {
  return (
    <div
      className="px-3 py-5 text-center sm:px-4 sm:py-6 md:px-5 md:py-7"
      style={dressCodePalettePanelStyle}
    >
      <p className={`${cinzel.className} text-[10px] font-bold uppercase tracking-[0.12em] sm:text-xs md:text-sm`}>
        Color Guide
      </p>
      <p className="font-goudy-italic mt-1.5 text-[10px] italic leading-relaxed sm:mt-2 sm:text-xs md:text-sm">
        Please refer to the exact colors above for dress code.
      </p>
    </div>
  )
}

function DressCodePaletteSwatches() {
  return (
    <div
      className="flex w-full border-t border-white"
      role="img"
      aria-label="Dress code color palette: Sage Hint, Mint, Sage, Moss, Evergreen"
    >
      {dressCodePalette.map((color, index) => (
        <DressCodePaletteSwatch
          key={color.hex}
          {...color}
          isLast={index === dressCodePalette.length - 1}
        />
      ))}
    </div>
  )
}

function highlightAttirePhrase(text: string, phrase: string): ReactNode {
  const index = text.indexOf(phrase)
  if (index === -1) return text

  return (
    <>
      {text.slice(0, index)}
      <strong className="font-bold underline">{phrase}</strong>
      {text.slice(index + phrase.length)}
    </>
  )
}

function AttirePaletteGroup({
  label,
  colors,
  description,
}: {
  label: string
  colors?: readonly string[]
  description: ReactNode
}) {
  return (
    <div className="space-y-2 sm:space-y-2.5">
      <p
        className={`${cinzel.className} text-center ${ct.labelSm} uppercase tracking-[0.16em] font-semibold`}
        style={{ color: detailText.label }}
      >
        {label}
      </p>
      {colors ? <ColorPalette colors={colors} /> : null}
      <p
        className={`font-goudy-italic ${ct.body} px-1 text-center leading-relaxed`}
        style={{ color: detailText.body }}
      >
        {description}
      </p>
    </div>
  )
}

function AttireCard({
  title,
  image,
  alt,
  imageAspect,
  children,
}: {
  title: string
  image: string
  alt: string
  imageAspect: string
  children: ReactNode
}) {
  return (
    <div className="relative group h-full">
      <div
        className="absolute -inset-1 rounded-2xl opacity-0 blur-lg transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            "linear-gradient(to bottom right, color-mix(in srgb, #6a7b5c 18%, transparent), transparent)",
        }}
      />
      <div
        className="relative flex h-full flex-col overflow-hidden rounded-xl border transition-all duration-300 sm:rounded-2xl"
        style={cardStyle}
      >
        <div
          className="border-b px-4 py-3 sm:px-5 sm:py-4"
          style={{ borderColor: "color-mix(in srgb, #4b5d44 10%, transparent)" }}
        >
          <h4
            className={`${cinzel.className} ${ct.attireCardTitle} text-center uppercase tracking-[0.22em] font-semibold leading-tight`}
            style={{ color: detailText.heading }}
          >
            {title}
          </h4>
        </div>

        <div className="relative flex w-full shrink-0 items-center justify-center overflow-hidden" style={{ backgroundColor: paperWash.lift }}>
          <div className="relative w-full" style={{ aspectRatio: imageAspect }}>
            <Image
              src={image}
              alt={alt}
              fill
              className="object-contain object-center w-full h-full transition-transform duration-700 group-hover:scale-[1.01]"
              sizes="(max-width: 768px) 100vw, (max-width: 1280px) 80vw, 1024px"
            />
          </div>
        </div>

        <div
          className="flex flex-1 flex-col border-t px-4 py-4 sm:px-5 sm:py-5 md:px-6"
          style={{ borderColor: "color-mix(in srgb, #4b5d44 10%, transparent)" }}
        >
          {children}
        </div>
      </div>
    </div>
  )
}

type EventVenueCardProps = {
  badge: string
  images: string[]
  activeImageIndex: number
  locationName: string
  venueAddress: string
  venueDetail?: string
  day: string
  dateString: string
  time: string
  arrivalTime?: string
  venueSectionLabel: string
  mapsLink: string
  copyId: string
  fullVenue: string
  copiedItems: Set<string>
  onCopy: (text: string, id: string) => void
  onOpenMaps: (link: string) => void
  showDateDetails?: boolean
}

function EventVenueCard({
  badge,
  images,
  activeImageIndex,
  locationName,
  venueAddress,
  venueDetail,
  day,
  dateString,
  time,
  arrivalTime,
  venueSectionLabel,
  mapsLink,
  copyId,
  fullVenue,
  copiedItems,
  onCopy,
  onOpenMaps,
  showDateDetails = true,
}: EventVenueCardProps) {
  const eventDate = showDateDetails ? new Date(dateString) : null

  return (
    <div className="relative group">
      <div
        className="absolute -inset-1 rounded-2xl opacity-0 blur-lg transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            "linear-gradient(to bottom right, color-mix(in srgb, #6a7b5c 15%, transparent), transparent)",
        }}
      />

      <div
        className="relative rounded-xl sm:rounded-2xl overflow-hidden border transition-all duration-300"
        style={cardStyle}
      >
        <div className="relative w-full h-64 sm:h-72 md:h-80 lg:h-96 xl:h-[30rem] overflow-hidden">
          {images.length === 1 ? (
            <Image
              src={images[0]}
              alt={locationName}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 1280px"
              priority
            />
          ) : (
            images.map((src, index) => {
              const isActive = index === activeImageIndex
              return (
                <div
                  key={index}
                  className={`absolute inset-0 transition-[opacity,transform] duration-[1600ms] ease-[cubic-bezier(0.45,0.05,0.55,0.95)] ${
                    isActive
                      ? "opacity-100 scale-100 z-10"
                      : "opacity-0 scale-[1.06] z-0 pointer-events-none"
                  }`}
                >
                  <Image
                    src={src}
                    alt={locationName}
                    fill
                    className={`object-cover transition-transform duration-[9000ms] ease-out ${
                      isActive ? "scale-[1.08] group-hover:scale-[1.12]" : "scale-100"
                    }`}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 1280px"
                    priority={index === 0}
                  />
                </div>
              )
            })
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent z-20 pointer-events-none" />

          <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 md:bottom-6 md:left-6 right-3 sm:right-4 md:right-6 z-30">
            <span className={`${cinzel.className} inline-block mb-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm text-[10px] sm:text-xs uppercase tracking-[0.2em] text-white border border-white/30`}>
              {badge}
            </span>
            <h3 className={`${theSeasons.className} text-base sm:text-lg md:text-xl lg:text-2xl font-semibold text-white mb-1 sm:mb-1.5 drop-shadow-lg uppercase tracking-[0.12em] leading-tight`}>
              {locationName}
            </h3>
            <p className={`${theSeasons.className} text-[10px] sm:text-xs md:text-sm lg:text-base text-white/95 drop-shadow-md tracking-[0.06em] leading-snug`}>
              {venueAddress}
            </p>
          </div>
        </div>

        <div className="p-3 sm:p-5 md:p-7 lg:p-9">
          <div className="text-center mb-5 sm:mb-8 md:mb-10 space-y-2 sm:space-y-2.5 md:space-y-3">
            {showDateDetails && eventDate && (
              <>
                <p
                  className={`${cinzel.className} ${ct.label} font-semibold uppercase tracking-[0.2em]`}
                  style={{ color: detailText.heading }}
                >
                  {day}
                </p>

                <p
                  className={`${cinzel.className} ${ct.month} font-semibold leading-none`}
                  style={{ color: detailText.heading }}
                >
                  {eventDate.toLocaleString("default", { month: "long" })}
                </p>

                <div className="flex items-center justify-center gap-3 sm:gap-4 md:gap-5 py-1 sm:py-2">
                  <p
                    className={`${cinzel.className} ${ct.dayNum} font-semibold leading-none`}
                    style={{ color: detailText.accent }}
                  >
                    {eventDate.getDate()}
                  </p>
                  <div
                    className="h-10 sm:h-12 md:h-14 w-[2px] rounded-full"
                    style={{ backgroundColor: paperWash.sageSoft }}
                  />
                  <p
                    className={`${cinzel.className} ${ct.year} font-semibold leading-none`}
                    style={{ color: detailText.heading }}
                  >
                    {eventDate.getFullYear()}
                  </p>
                </div>
              </>
            )}

            {arrivalTime ? (
              <div className="space-y-1 sm:space-y-1.5">
                <p
                  className={`${cinzel.className} text-sm sm:text-base md:text-lg lg:text-xl font-semibold tracking-[0.1em] uppercase ${showDateDetails ? "" : "py-2 sm:py-3"}`}
                  style={{ color: detailText.heading }}
                >
                  Arrival: {arrivalTime}
                </p>
                <p
                  className={`${cinzel.className} text-sm sm:text-base md:text-lg lg:text-xl font-semibold tracking-[0.1em] uppercase`}
                  style={{ color: detailText.heading }}
                >
                  Ceremony: {time}
                </p>
              </div>
            ) : (
              <p
                className={`${cinzel.className} text-sm sm:text-base md:text-lg lg:text-xl font-semibold tracking-[0.14em] uppercase ${showDateDetails ? "" : "py-2 sm:py-3"}`}
                style={{ color: detailText.heading }}
              >
                At {time}
              </p>
            )}
          </div>

          <div className="rounded-xl p-3 sm:p-4 md:p-5 mb-4 sm:mb-6 border" style={softPanelStyle}>
            <div className="flex items-start gap-2 sm:gap-3 md:gap-4">
              <MapPin className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 mt-0.5 flex-shrink-0" style={{ color: detailText.accent }} />
              <div className="flex-1 min-w-0">
                <p className={`${cinzel.className} ${ct.label} font-semibold mb-1.5 sm:mb-2 uppercase tracking-wide`} style={{ color: detailText.label }}>
                  {venueSectionLabel}
                </p>
                <p className={`${theSeasons.className} text-sm sm:text-base md:text-lg lg:text-xl font-semibold leading-snug tracking-[0.06em] uppercase`} style={{ color: detailText.heading }}>
                  {locationName}
                </p>
                {venueDetail && (
                  <p className={`${theSeasons.className} ${ct.body} leading-relaxed mt-1 tracking-wide`} style={{ color: detailText.label }}>
                    {venueDetail}
                  </p>
                )}
                <p className={`${theSeasons.className} ${ct.body} leading-relaxed mt-1 tracking-[0.04em]`} style={{ color: detailText.body }}>
                  {venueAddress}
                </p>
              </div>
              <div className="flex flex-col items-center gap-1.5 sm:gap-2 flex-shrink-0">
                <div
                  className="p-1.5 sm:p-2 md:p-2.5 rounded-lg border shadow-sm"
                  style={{
                    backgroundColor: paperWash.lift,
                    borderColor: "color-mix(in srgb, #4b5d44 14%, transparent)",
                  }}
                >
                  <QRCodeSVG
                    value={mapsLink}
                    size={80}
                    level="M"
                    includeMargin={false}
                    fgColor={QR_FG}
                    bgColor={QR_BG}
                  />
                </div>
                <p className={`font-goudy-italic ${ct.label} text-center max-w-[90px]`} style={{ color: detailText.label }}>
                  Scan for directions
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 md:gap-4">
            <button
              type="button"
              onClick={() => onOpenMaps(mapsLink)}
              className={`${cinzel.className} flex-1 flex items-center justify-center gap-1.5 sm:gap-2 px-4 sm:px-5 py-2.5 sm:py-3 md:py-3.5 rounded-full border font-semibold uppercase tracking-[0.12em] ${ct.btn} transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]`}
              style={{
                backgroundColor: paperWash.sage,
                borderColor: "color-mix(in srgb, #3d4a36 35%, transparent)",
                color: paperWash.lift,
                boxShadow:
                  "0 6px 20px color-mix(in srgb, #4b5d44 28%, transparent)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#3d4a36"
                e.currentTarget.style.borderColor = paperWash.sageSoft
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = paperWash.sage
                e.currentTarget.style.borderColor =
                  "color-mix(in srgb, #3d4a36 35%, transparent)"
              }}
              aria-label={`Get directions to ${badge.toLowerCase()} venue`}
            >
              <Navigation className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 flex-shrink-0" />
              <span>Get Directions</span>
            </button>
            <button
              type="button"
              onClick={() => onCopy(fullVenue, copyId)}
              className={`${cinzel.className} flex-1 flex items-center justify-center gap-1.5 sm:gap-2 px-4 sm:px-5 py-2.5 sm:py-3 md:py-3.5 border-2 rounded-full font-semibold uppercase tracking-[0.12em] ${ct.btn} transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]`}
              style={{
                color: detailText.heading,
                backgroundColor: paperWash.cream,
                borderColor: "color-mix(in srgb, #4b5d44 20%, transparent)",
              }}
              aria-label={`Copy ${badge.toLowerCase()} venue address`}
            >
              {copiedItems.has(copyId) ? (
                <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 flex-shrink-0" style={{ color: paperWash.sage }} />
              ) : (
                <Copy className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 flex-shrink-0" />
              )}
              <span>{copiedItems.has(copyId) ? "Copied!" : "Copy Address"}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

// Colors sourced from globals.css @theme inline — edit there to update everywhere

export function Details() {
  const siteConfig = useSiteConfig()
  const [copiedItems, setCopiedItems] = useState<Set<string>>(new Set())
  const [currentCeremonyImageIndex, setCurrentCeremonyImageIndex] = useState(0)
  const [currentReceptionImageIndex, setCurrentReceptionImageIndex] = useState(0)
  const [showImageModal, setShowImageModal] = useState<string | null>(null)

  const ceremonyImages = siteConfig.ceremony.image
  const receptionImages = siteConfig.reception.image

  useEffect(() => {
    if (ceremonyImages.length <= 1) return
    const timer = setInterval(() => {
      setCurrentCeremonyImageIndex((prev) => (prev + 1) % ceremonyImages.length)
    }, 4500)
    return () => clearInterval(timer)
  }, [ceremonyImages.length])

  useEffect(() => {
    if (receptionImages.length <= 1) return
    const timer = setInterval(() => {
      setCurrentReceptionImageIndex((prev) => (prev + 1) % receptionImages.length)
    }, 4500)
    return () => clearInterval(timer)
  }, [receptionImages.length])

  const copyToClipboard = async (text: string, itemId: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedItems(prev => new Set(prev).add(itemId))
      setTimeout(() => {
        setCopiedItems(prev => {
          const newSet = new Set(prev)
          newSet.delete(itemId)
          return newSet
        })
      }, 2000)
    } catch (err) {
      console.error('Failed to copy text: ', err)
    }
  }

  // Venue information from site config
  const ceremonyVenueName = siteConfig.ceremony.location
  const ceremonyVenueDetail = ""
  const ceremonyAddress = siteConfig.ceremony.venue
  const ceremonyVenue = `${ceremonyVenueName}, ${ceremonyAddress}`
  const ceremonyMapsLink = siteConfig.ceremony.map

  const receptionVenueName = siteConfig.reception.location
  const receptionAddress = siteConfig.reception.venue
  const receptionVenue = `${receptionVenueName}, ${receptionAddress}`
  const receptionMapsLink =
    siteConfig.reception.map ||
    `https://maps.google.com/?q=${encodeURIComponent(receptionVenue)}`

  // Aliases used in the image modal
  const ceremonyLocationFormatted = ceremonyVenueName
  const receptionLocationFormatted = receptionVenueName
  const ceremonyLocation = ceremonyVenue
  const receptionLocation = receptionVenue
  const formattedCeremonyDate = siteConfig.ceremony.date
  const formattedReceptionDate = siteConfig.reception.date

  const openInMaps = (link: string) => {
    window.open(link, '_blank', 'noopener,noreferrer')
  }


  return (
    <div
      className={`${theSeasons.variable} ${aboveTheBeyond.variable} relative w-full`}
      style={{ background: detailsBackground }}
    >
      <Section
        id="details"
        className="relative z-10 pt-8 pb-8 sm:pt-10 sm:pb-10 md:pt-12 md:pb-12 lg:pt-14 lg:pb-14 overflow-hidden"
      >
        <CornerDecorations />

        {/* Header */}
        <div className="relative z-20 mb-6 px-6 pt-10 text-center sm:mb-8 sm:px-10 sm:pt-12 md:mb-10 md:px-12 md:pt-14">
          <p
            className={`${cinzel.className} mb-2 text-[0.525rem] font-semibold uppercase tracking-[0.34em] min-[400px]:text-[0.55rem] min-[400px]:tracking-[0.38em] sm:text-[0.575rem] sm:tracking-[0.44em]`}
            style={{ color: paperWash.sageSoft }}
          >
            Our Celebration
          </p>
          <div className="my-4 sm:my-5 md:my-6">
            <DetailsTitle />
          </div>
          <p
            className="font-goudy-italic mx-auto max-w-2xl px-2 text-[0.75rem] leading-[1.62] sm:text-[0.8125rem] sm:leading-[1.65] md:text-[0.84375rem]"
            style={{ color: paperWash.sage }}
          >
            Everything you need to know about our special day.
          </p>

          <SectionIconDivider
            icon={
              <MapPin
                className="h-3.5 w-3.5 sm:h-4 sm:w-4"
                style={{ color: paperWash.sageSoft }}
                aria-hidden
              />
            }
          />
        </div>

      {/* Venue and Event Information */}
      <div className="relative z-20 max-w-5xl mx-auto px-4 sm:px-6 md:px-8 mb-8 sm:mb-10 md:mb-12 space-y-6 sm:space-y-10 md:space-y-14">
        <EventVenueCard
          badge="Ceremony"
          images={ceremonyImages}
          activeImageIndex={currentCeremonyImageIndex}
          locationName={ceremonyVenueName}
          venueAddress={ceremonyAddress}
          venueDetail={ceremonyVenueDetail}
          day={siteConfig.ceremony.day}
          dateString={siteConfig.ceremony.date}
          time={siteConfig.ceremony.time}
          arrivalTime={siteConfig.ceremony.guestsTime}
          venueSectionLabel="Ceremony"
          mapsLink={ceremonyMapsLink}
          copyId="ceremony"
          fullVenue={ceremonyVenue}
          copiedItems={copiedItems}
          onCopy={copyToClipboard}
          onOpenMaps={openInMaps}
        />

        <div
          className="mx-auto max-w-xl rounded-xl px-6 py-8 text-center sm:rounded-2xl sm:px-10 sm:py-10"
          style={cardStyle}
        >
          <p
            className={`${cinzel.className} text-[0.625rem] font-semibold uppercase tracking-[0.32em] sm:text-[0.6875rem] sm:tracking-[0.38em]`}
            style={{ color: paperWash.sageSoft }}
          >
            Reception to follow
          </p>
          <div className="my-4 flex items-center justify-center gap-3 sm:my-5">
            <span
              className="h-px w-8 sm:w-12"
              style={{
                background:
                  "linear-gradient(to right, transparent, color-mix(in srgb, #4b5d44 38%, transparent))",
              }}
            />
            <Heart
              className="h-3 w-3 sm:h-3.5 sm:w-3.5"
              style={{ color: paperWash.sageSoft }}
              aria-hidden
            />
            <span
              className="h-px w-8 sm:w-12"
              style={{
                background:
                  "linear-gradient(to left, transparent, color-mix(in srgb, #4b5d44 38%, transparent))",
              }}
            />
          </div>
          <p
            className={`${theSeasons.className} text-sm font-semibold uppercase tracking-[0.14em] sm:text-base`}
            style={{ color: paperWash.sage }}
          >
            {siteConfig.reception.location}
          </p>
          <p
            className={`${cinzel.className} mt-2 text-[0.7rem] font-semibold uppercase tracking-[0.18em] sm:text-[0.75rem]`}
            style={{ color: paperWash.sageSoft }}
          >
            At {siteConfig.reception.time}
          </p>
          {siteConfig.reception.venue ? (
            <p
              className="font-goudy-italic mx-auto mt-3 max-w-[26rem] text-[0.8125rem] leading-[1.7] sm:mt-4 sm:text-[0.9375rem] sm:leading-[1.75]"
              style={{ color: paperWash.sage }}
            >
              {siteConfig.reception.venue}
            </p>
          ) : null}
        </div>
       
      </div>

      {/* Attire Guidelines */}
      <div className="relative z-20 mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
        <div className="mb-8 text-center sm:mb-10 md:mb-12">
          <SectionIconDivider
            icon={
              <Shirt
                className="h-3.5 w-3.5 sm:h-4 sm:w-4"
                style={{ color: paperWash.sageSoft }}
                aria-hidden
              />
            }
          />
          <h3
            className={`${theSeasons.className} ${ct.sectionTitle} mt-3 font-semibold uppercase leading-tight tracking-[0.12em] sm:mt-4 md:tracking-[0.15em]`}
            style={{ color: paperWash.sage }}
          >
            Attire Guidelines
          </h3>
          <p
            className={`font-goudy-italic ${ct.bodyLg} mt-3 leading-relaxed sm:mt-4`}
            style={{ color: paperWash.sage }}
          >
            Please dress according to the guidelines below. Guests are most welcome in casual attire within our palette.
          </p>
        </div>

        <div className="mb-6 grid grid-cols-1 items-start gap-6 sm:mb-8 sm:gap-8 md:mb-10">
          <div className="mx-auto w-full max-w-5xl space-y-6 sm:space-y-8">
            <AttireCard
              title="Entourage"
              image={attireGuide.entourage.image}
              imageAspect={attireGuide.entourage.imageAspect}
              alt="Entourage attire guide"
            >
              <div className="grid grid-cols-1 gap-5 sm:gap-6">
                <AttirePaletteGroup
                  label="Ladies"
                  description={highlightAttirePhrase(
                    attireGuide.entourage.ladies.description,
                    "floor-length gown",
                  )}
                />
                <AttirePaletteGroup
                  label="Gentlemen"
                  description={highlightAttirePhrase(
                    attireGuide.entourage.gentlemen.description,
                    "Sage Hint Barong Tagalog",
                  )}
                />
              </div>
            </AttireCard>

            <AttireCard
              title="Guests"
              image={attireGuide.guests.image}
              imageAspect={attireGuide.guests.imageAspect}
              alt="Guests attire guide"
            >
              <div className="grid grid-cols-1 gap-5 sm:gap-6">
                <AttirePaletteGroup
                  label="Ladies"
                  description={highlightAttirePhrase(
                    attireGuide.guests.ladies.description,
                    "casual dress",
                  )}
                />
                <AttirePaletteGroup
                  label="Gentlemen"
                  description={highlightAttirePhrase(
                    attireGuide.guests.gentlemen.description,
                    "casual polo",
                  )}
                />
              </div>
            </AttireCard>

            <div
              className="overflow-hidden rounded-xl border sm:rounded-2xl"
              style={cardStyle}
            >
              <DressCodePaletteHeader />
              <DressCodePaletteSwatches />
              <DressCodePaletteCaption />
            </div>
          </div>
        </div>

        {/* Gentle Reminders */}
        <div className="relative z-20 mx-auto mt-6 w-full max-w-3xl px-3 pb-2 sm:mt-8 sm:max-w-4xl sm:px-6 md:px-8 lg:max-w-5xl">
          <div
            className="relative overflow-hidden"
            style={{
              backgroundColor: reminderInk.deep,
              backgroundImage: `radial-gradient(90% 48% at 50% 0%, color-mix(in srgb, ${reminderInk.gold} 18%, transparent) 0%, transparent 62%)`,
              boxShadow: `0 18px 48px color-mix(in srgb, ${reminderInk.deep} 34%, transparent)`,
            }}
          >
            <div
              className="pointer-events-none absolute inset-[0.7rem] z-20 sm:inset-4 md:inset-[1.15rem]"
              aria-hidden
              style={{
                boxShadow: `
                  inset 0 0 0 1px ${reminderInk.gold},
                  inset 0 0 0 5px ${reminderInk.deep},
                  inset 0 0 0 6px ${reminderInk.champagne}
                `,
              }}
            />

            <InvitationWordDeco side="left" />
            <InvitationWordDeco side="right" />

            <div className="relative z-10 mx-auto flex w-full max-w-[40rem] flex-col items-center px-[3.15rem] py-11 text-center sm:max-w-[42rem] sm:px-16 sm:py-14 md:px-[4.75rem] md:py-16">
              <p
                className={`${cinzel.className} mb-8 text-[10px] font-semibold uppercase tracking-[0.32em] text-balance sm:mb-10 sm:text-[11px] md:mb-12`}
                style={{ color: reminderInk.gold }}
              >
                Gentle Reminders
              </p>

              <div className="flex w-full flex-col items-center gap-11 sm:gap-14 md:gap-16">
                <ReminderCard title="A Family Celebration">
                  <ReminderTone label="Formal">
                    Children are most welcome at our wedding. We would be delighted to
                    celebrate this day with your little ones and with every generation of
                    family and friends.
                  </ReminderTone>
                  <ReminderTone label="Warm">
                    Bring the kids! Our celebration is for the whole family, and we can&apos;t
                    wait to share the joy with them too.
                  </ReminderTone>
                  <ReminderTone label="Tagalog">
                    Malugod naming inaanyayahan ang inyong mga anak. Ang aming pagdiriwang
                    ay para sa buong pamilya, at masaya kaming makasama sila sa araw na ito.
                  </ReminderTone>
                </ReminderCard>

                <div
                  className="h-px w-14 sm:w-20"
                  style={{
                    background: `linear-gradient(90deg, transparent, ${reminderInk.gold}, transparent)`,
                  }}
                  aria-hidden
                />

                <ReminderCard title="Unplugged Ceremony">
                  <ReminderTone label="Formal">
                    We invite you to be fully present as we exchange our vows. Kindly keep
                    phones and cameras away during the ceremony and let our photographers
                    capture the moment.
                  </ReminderTone>
                  <ReminderTone label="Warm">
                    Be present, not on your phones! Enjoy our unplugged ceremony and let
                    our photographers do the clicking.
                  </ReminderTone>
                  <ReminderTone label="Tagalog">
                    Hangga&apos;t maaari, iwasan muna ang paggamit ng cellphone at camera
                    upang lubos nating mapahalagahan ang sagradong seremonya ng aming
                    pag-iisang dibdib.
                  </ReminderTone>
                </ReminderCard>

                <div
                  className="h-px w-14 sm:w-20"
                  style={{
                    background: `linear-gradient(90deg, transparent, ${reminderInk.gold}, transparent)`,
                  }}
                  aria-hidden
                />

                <ReminderCard title="Casual Welcome">
                  <ReminderTone label="Casual" emphasized>
                    Casual is most welcome. Come in comfortable clothes and shoes in Sage
                    Hint, Mint, Sage, Moss, or Evergreen — this is a home celebration, so
                    dress with ease. Kindly leave white for the couple.
                  </ReminderTone>
                  <ReminderTone label="Formal">
                    If you prefer to dress up, a midi or cocktail dress, or a collared
                    shirt, in our sage palette is lovely. Please still avoid white.
                  </ReminderTone>
                  <ReminderTone label="Tagalog">
                    Malugod naming inaanyayahan ang kaswal na pananamit. Magsuot po ng
                    komportable sa Sage Hint, Mint, Sage, Moss, o Evergreen. Iwasan
                    lamang po ang puti, dahil ito ay para sa ikakasal.
                  </ReminderTone>
                  <ColorPalette colors={attireGuide.guests.ladies.colors} frame="gold" />
                </ReminderCard>

                <div
                  className="h-px w-14 sm:w-20"
                  style={{
                    background: `linear-gradient(90deg, transparent, ${reminderInk.gold}, transparent)`,
                  }}
                  aria-hidden
                />

                <ReminderCard title="Arrival">
                  <ReminderTone label="Punctuality">
                    To ensure everything runs smoothly, please arrive at {siteConfig.ceremony.guestsTime}. This will give you enough time to find your seat, settle in comfortably, and fully enjoy the beautiful ceremony before it begins at {siteConfig.ceremony.time}. We truly appreciate your punctuality and look forward to celebrating this special moment with you.
                  </ReminderTone>
                </ReminderCard>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Enhanced Image Modal */}
      {showImageModal && (
        <div
          className="fixed inset-0 backdrop-blur-xl z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 animate-in fade-in duration-500"
          onClick={() => setShowImageModal(null)}
          style={{ backgroundColor: "rgba(61,74,54,0.96)" }}
        >
          {/* Decorative background elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div
              className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl animate-pulse"
              style={{ backgroundColor: "#f7f4eb", opacity: 0.12 }}
            />
            <div
              className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full blur-3xl animate-pulse"
              style={{ backgroundColor: "#f7f4eb", opacity: 0.14, animationDelay: "1s" }}
            />
          </div>

          <div
            className="relative max-w-6xl w-full max-h-[95vh] sm:max-h-[90vh] rounded-3xl overflow-hidden shadow-2xl border-2 animate-in zoom-in-95 duration-500 group"
            onClick={(e) => e.stopPropagation()}
            style={{ backgroundColor: reminderInk.deep, borderColor: paperWash.cream }}
          >
            {/* Decorative top accent */}
            <div
              className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r"
              style={{ background: "linear-gradient(to right, #f7f4eb, #f7f4eb, #3d4a36)" }}
            />

            {/* Enhanced close button */}
            <button
              onClick={() => setShowImageModal(null)}
              className="absolute top-4 right-4 sm:top-5 sm:right-5 md:top-6 md:right-6 z-20 hover:bg-motif-accent backdrop-blur-sm p-2.5 sm:p-3 rounded-xl shadow-xl transition-all duration-300 hover:scale-110 hover:shadow-2xl active:scale-95 border-2 group/close"
              title="Close (ESC)"
              style={{ backgroundColor: "#3d4a36", borderColor: "#f7f4eb", color: "#f7f4eb" }}
            >
              <X className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 group-hover/close:text-[#E1D5C7] transition-colors" />
            </button>

            {/* Venue badge */}
            <div className="absolute top-4 left-4 sm:top-5 sm:left-5 md:top-6 md:left-6 z-20">
              <div
                className="flex items-center gap-2 backdrop-blur-md px-4 py-2 rounded-full shadow-xl border-2"
                style={{ backgroundColor: "#3d4a36", borderColor: "#f7f4eb" }}
              >
                {showImageModal === "ceremony" ? (
                  <>
                    <Heart className="w-4 h-4" fill="#f7f4eb" style={{ color: "#f7f4eb" }} />
                    <span className="text-xs sm:text-sm font-bold" style={{ color: paperWash.cream }}>
                      Ceremony Venue
                    </span>
                  </>
                ) : (
                  <>
                    <Utensils className="w-4 h-4" style={{ color: paperWash.cream }} />
                    <span className="text-xs sm:text-sm font-bold" style={{ color: paperWash.cream }}>
                      Reception Venue
                    </span>
                  </>
                )}
              </div>
            </div>

            {/* Image section with enhanced effects */}
            <div
              className="relative w-full h-[50vh] sm:h-[60vh] md:h-[70vh] overflow-hidden"
              style={{ backgroundColor: "#3d4a36" }}
            >
              {/* Shimmer effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 animate-shimmer opacity-0 group-hover:opacity-100 transition-opacity duration-1000 z-0" />

              <Image
                src={
                  showImageModal === "ceremony"
                    ? ceremonyImages[currentCeremonyImageIndex] ?? ceremonyImages[0]
                    : receptionImages[currentReceptionImageIndex] ?? receptionImages[0]
                }
                alt={showImageModal === "ceremony" ? ceremonyLocationFormatted : receptionLocationFormatted}
                fill
                className="object-contain p-6 sm:p-8 md:p-10 transition-transform duration-700 group-hover:scale-105 z-10"
                sizes="95vw"
                priority
              />
            </div>

            {/* Enhanced content section */}
            <div
              className="relative border-t-2 p-5 sm:p-6 md:p-8 backdrop-blur-sm"
              style={{ backgroundColor: reminderInk.deep, borderColor: paperWash.cream }}
            >
              {/* Decorative line */}
              <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-motif-cream/30 to-transparent" />

              <div className="space-y-5">
                {/* Header with venue info */}
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                  <div className="space-y-2">
                    <h3
                      className={`${cinzel.className} text-xl sm:text-2xl md:text-3xl font-bold flex items-center gap-3`}
                      style={{ color: "#f7f4eb" }}
                    >
                      {showImageModal === "ceremony" ? (
                        <Heart className="w-6 h-6 text-motif-cream" fill="#f7f4eb" />
                      ) : (
                        <Utensils className="w-6 h-6 text-motif-cream" />
                      )}
                      {showImageModal === "ceremony" ? siteConfig.ceremony.venue : siteConfig.reception.venue}
                    </h3>
                    <div className="flex items-center gap-2 text-sm opacity-70" style={{ color: paperWash.cream }}>
                      <MapPin className="w-4 h-4" />
                      <span>
                        {showImageModal === "ceremony"
                          ? ceremonyLocationFormatted
                          : receptionLocationFormatted}
                      </span>
                    </div>

                    {/* Date & Time info */}
                    {showImageModal === "ceremony" && (
                      <div
                        className="flex items-center gap-2 text-sm font-medium px-3 py-2 rounded-lg border"
                        style={{
                          color: "#f7f4eb",
                          backgroundColor: "#3d4a36",
                          opacity: 0.9,
                          borderColor: "#f7f4eb",
                        }}
                      >
                        <Clock className="w-4 h-4 text-motif-cream shrink-0" />
                        <span>
                          {formattedCeremonyDate} at {siteConfig.ceremony.time}
                        </span>
                      </div>
                    )}
                    {showImageModal === "reception" && (
                      <div
                        className="flex items-center gap-2 text-sm font-medium px-3 py-2 rounded-lg border"
                        style={{
                          color: "#f7f4eb",
                          backgroundColor: "#3d4a36",
                          opacity: 0.9,
                          borderColor: "#f7f4eb",
                        }}
                      >
                        <Clock className="w-4 h-4 text-motif-cream" />
                        <span>
                          {formattedReceptionDate} - {siteConfig.reception.time}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Action buttons */}
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3">
                    <button
                      onClick={() =>
                        copyToClipboard(
                          showImageModal === "ceremony"
                            ? ceremonyLocation
                            : receptionLocation,
                          `modal-${showImageModal}`,
                        )
                      }
                      className="flex items-center justify-center gap-2 px-4 py-2.5 sm:px-5 sm:py-3 border-2 rounded-xl font-semibold text-sm transition-all duration-300 hover:scale-105 hover:shadow-lg active:scale-95 shadow-md whitespace-nowrap"
                      title="Copy address"
                      style={{ backgroundColor: reminderInk.deep, borderColor: paperWash.cream, color: paperWash.cream }}
                    >
                      {copiedItems.has(`modal-${showImageModal}`) ? (
                        <>
                          <Check className="w-4 h-4" />
                          <span>Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4" />
                          <span>Copy Address</span>
                        </>
                      )}
                    </button>

                    <button
                      onClick={() =>
                        openInMaps(showImageModal === "ceremony" ? ceremonyMapsLink : receptionMapsLink)
                      }
                      className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-semibold text-sm transition-all duration-300 hover:scale-105 hover:shadow-xl active:scale-95 shadow-lg whitespace-nowrap"
                      style={{ backgroundColor: paperWash.cream, color: reminderInk.deep }}
                    >
                      <Navigation className="w-4 h-4 sm:w-5 sm:h-5" />
                      <span>Get Directions</span>
                    </button>
                  </div>
                </div>

                {/* Additional info */}
                  <div className="flex items-center gap-2 text-xs opacity-65" style={{ color: paperWash.cream }}>
                  <span className="flex items-center gap-1.5">
                    <Camera className="w-3 h-3" />
                    Click outside to close
                  </span>
                  <span className="hidden sm:inline">•</span>
                  <span className="hidden sm:inline-flex items-center gap-1.5">Press ESC to close</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      </Section>
    </div>
  )
}