"use client"

import { useEffect, useState } from "react"
import { Cinzel } from "next/font/google"
import localFont from "next/font/local"
import { Instagram, Facebook, Twitter, Share2, Copy, Download, Check } from "lucide-react"
import { QRCodeCanvas } from "qrcode.react"
import { useSiteConfig } from "@/hooks/use-site-config"
import { layeredSectionTitleSize, sectionType } from "@/lib/section-typography"
import Image from "next/image"

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

const C = {
  navy: "#4b5d44",
  gold: "#6a7b5c",
  goldBright: "#4b5d44",
  goldSoft: "#6a7b5c",
  paper: "#f9f6ee",
} as const

const goldLine = `color-mix(in srgb, ${C.gold} 55%, transparent)`
const outsideInk = {
  text: "#ffffff",
  textSoft: "rgba(255, 255, 255, 0.82)",
  line: "rgba(255, 255, 255, 0.45)",
} as const

const palette = {
  body: C.navy,
  heading: C.goldBright,
  label: C.goldSoft,
  accent: C.gold,
} as const

const outsideDividerLineStyle = {
  background: `linear-gradient(to right, transparent, ${outsideInk.line}, transparent)`,
} as const

const insideDividerLineStyle = {
  background: `linear-gradient(to right, transparent, ${goldLine}, transparent)`,
} as const

const ct = {
  body: sectionType.text,
  bodyLg: sectionType.textRelaxed,
  label: sectionType.label,
  cardTitle: `${sectionType.subheader} lg:text-xl`,
  btn: sectionType.label,
} as const

const cardStyle = {
  background: `linear-gradient(180deg, color-mix(in srgb, ${C.goldSoft} 28%, ${C.paper}) 0%, ${C.paper} 48%, color-mix(in srgb, ${C.gold} 10%, ${C.paper}) 100%)`,
  borderWidth: "1px",
  borderStyle: "solid",
  borderColor: goldLine,
  boxShadow: `0 12px 36px color-mix(in srgb, ${C.navy} 28%, transparent), inset 0 1px 0 color-mix(in srgb, ${C.goldSoft} 55%, transparent)`,
} as const

const buttonStyle = {
  backgroundColor: C.navy,
  borderColor: "color-mix(in srgb, #3d4a36 35%, transparent)",
  color: C.paper,
  boxShadow: "0 10px 24px color-mix(in srgb, #4b5d44 28%, transparent)",
} as const

const QR_FG = C.navy

function OutsideDivider() {
  return (
    <div className="flex items-center justify-center gap-1.5">
      <span className="h-px w-6 sm:w-10" style={outsideDividerLineStyle} />
      <span
        className="h-0.5 w-0.5 rounded-full sm:h-1 sm:w-1"
        style={{ backgroundColor: outsideInk.line }}
        aria-hidden
      />
      <span
        className="h-px w-6 sm:w-10"
        style={{
          background: `linear-gradient(to left, transparent, ${outsideInk.line}, transparent)`,
        }}
      />
    </div>
  )
}

function InsideDivider() {
  return (
    <div className="flex items-center justify-center gap-1.5">
      <span className="h-px w-6 sm:w-10" style={insideDividerLineStyle} />
      <span
        className="h-0.5 w-0.5 rounded-full sm:h-1 sm:w-1"
        style={{ backgroundColor: goldLine }}
        aria-hidden
      />
      <span
        className="h-px w-6 sm:w-10"
        style={{
          background: `linear-gradient(to left, transparent, ${goldLine}, transparent)`,
        }}
      />
    </div>
  )
}

function SnapShareTitle() {
  return (
    <h2
      className="welcome-title-lockup relative mx-auto w-full max-w-full text-center"
      style={
        {
          "--title-size": layeredSectionTitleSize.main,
          "--script-size": layeredSectionTitleSize.script,
        } as React.CSSProperties
      }
    >
      <span
        className={`${theSeasons.className} block max-w-[14ch] mx-auto text-balance uppercase leading-[0.92] tracking-[0.06em] min-[400px]:tracking-[0.1em] sm:max-w-none sm:leading-[0.78] sm:tracking-[0.13em] md:tracking-[0.14em] pb-1 sm:pb-1.5`}
        style={{
          fontSize: "var(--title-size)",
          color: outsideInk.text,
        }}
      >
        Snap and Share
      </span>
      <span
        aria-hidden
        className={`${aboveTheBeyond.className} mx-auto block w-fit max-w-full px-1 leading-[0.88] sm:leading-[0.9] mt-2 sm:mt-2.5 md:mt-3`}
        style={{
          fontSize: "var(--script-size)",
          color: outsideInk.textSoft,
        }}
      >
        Share your memories
      </span>
      <span className="sr-only">Share your memories</span>
    </h2>
  )
}

function ContentCard({
  children,
  className = "",
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <div
      className={`relative overflow-hidden rounded-xl border backdrop-blur-xl sm:rounded-2xl sm:backdrop-blur-2xl ${className}`}
      style={cardStyle}
    >
      <div
        className="pointer-events-none absolute inset-0 rounded-[inherit]"
        style={{
          background: `linear-gradient(135deg, color-mix(in srgb, ${C.goldSoft} 28%, transparent) 0%, transparent 48%)`,
        }}
        aria-hidden
      />
      <div className="relative z-20 flex flex-col gap-3 px-3.5 py-4 sm:gap-4 sm:px-5 sm:py-6 md:px-6 md:py-7">
        {children}
      </div>
    </div>
  )
}

function PrimaryButton({
  onClick,
  children,
  className = "",
  active = false,
}: {
  onClick?: () => void
  children: React.ReactNode
  className?: string
  active?: boolean
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`${cinzel.className} group relative inline-flex w-full min-h-11 items-center justify-center gap-1.5 rounded-md border px-4 py-2.5 font-semibold uppercase tracking-[0.14em] shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md active:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 sm:w-auto sm:min-h-12 sm:rounded-sm sm:px-6 sm:py-3 sm:tracking-[0.2em] md:tracking-[0.24em] ${ct.btn} ${className}`}
      style={
        active
          ? {
              backgroundColor: "#3d4a36",
              borderColor: C.gold,
              color: C.paper,
              boxShadow: buttonStyle.boxShadow,
            }
          : buttonStyle
      }
      onMouseEnter={(e) => {
        if (active) return
        e.currentTarget.style.backgroundColor = "#3d4a36"
        e.currentTarget.style.borderColor = C.gold
      }}
      onMouseLeave={(e) => {
        if (active) return
        e.currentTarget.style.backgroundColor = C.navy
        e.currentTarget.style.borderColor = buttonStyle.borderColor
      }}
    >
      {children}
    </button>
  )
}

export function SnapShare() {
  const siteConfig = useSiteConfig()
  const [copiedHashtagIndex, setCopiedHashtagIndex] = useState<number | null>(null)
  const [copiedAllHashtags, setCopiedAllHashtags] = useState(false)
  const [copiedDriveLink, setCopiedDriveLink] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  const { groomNickname, brideNickname } = siteConfig.couple
  const coupleDisplayName = `${groomNickname} & ${brideNickname}`
  const websiteUrl = typeof window !== "undefined" ? window.location.href : "https://example.com"
  const uploadLink = siteConfig.snapShare.googleDriveLink
  const hashtags = siteConfig.snapShare.hashtag
  const allHashtagsText = hashtags.join(" ")
  const sanitizedGroomName = groomNickname.replace(/\s+/g, "")
  const sanitizedBrideName = brideNickname.replace(/\s+/g, "")

  const shareText = `Celebrate ${coupleDisplayName}'s wedding! Explore the details and share your special memories: ${websiteUrl} ${allHashtagsText}`

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 640)
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  const shareOnSocial = (platform: "instagram" | "facebook" | "twitter" | "tiktok") => {
    const encodedUrl = encodeURIComponent(websiteUrl)
    const encodedText = encodeURIComponent(shareText)

    const urls: Record<string, string> = {
      instagram: "https://www.instagram.com/",
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      twitter: `https://twitter.com/intent/tweet?text=${encodedText}`,
      tiktok: "https://www.tiktok.com/",
    }

    const target = urls[platform]
    if (target) window.open(target, "_blank", "width=600,height=400")
  }

  const downloadQRCode = () => {
    const canvas = document.getElementById("snapshare-qr") as HTMLCanvasElement | null
    if (!canvas) return
    const link = document.createElement("a")
    link.download = `${sanitizedGroomName.toLowerCase()}-${sanitizedBrideName.toLowerCase()}-wedding-qr.png`
    link.href = canvas.toDataURL("image/png")
    link.click()
  }

  const downloadAlbumQRCode = () => {
    const canvas = document.getElementById("album-qr") as HTMLCanvasElement | null
    if (!canvas) return
    const link = document.createElement("a")
    link.download = "album-qr.png"
    link.href = canvas.toDataURL("image/png")
    link.click()
  }

  const copyHashtag = async (hashtag: string, index: number) => {
    try {
      await navigator.clipboard.writeText(hashtag)
      setCopiedHashtagIndex(index)
      setTimeout(() => setCopiedHashtagIndex(null), 2000)
    } catch (err) {
      console.error("Failed to copy: ", err)
    }
  }

  const copyAllHashtags = async () => {
    try {
      await navigator.clipboard.writeText(allHashtagsText)
      setCopiedAllHashtags(true)
      setTimeout(() => setCopiedAllHashtags(false), 2000)
    } catch (err) {
      console.error("Failed to copy: ", err)
    }
  }

  const copyUploadLink = async () => {
    if (!uploadLink) return
    try {
      await navigator.clipboard.writeText(uploadLink)
      setCopiedDriveLink(true)
      setTimeout(() => setCopiedDriveLink(false), 2000)
    } catch (err) {
      console.error("Failed to copy: ", err)
    }
  }

  return (
    <section
      id="snap-share"
      className={`${theSeasons.variable} ${aboveTheBeyond.variable} relative z-10 bg-transparent pt-8 pb-8 sm:pt-10 sm:pb-10 md:pt-12 md:pb-12 lg:pt-14 lg:pb-14`}
    >
      <div className="relative z-20 mx-auto max-w-6xl px-3 @container/snap-share sm:px-6 md:px-8">
        <div className="relative z-20 px-2 text-center sm:px-10 md:px-12">
          <div className="mx-auto mb-5 sm:mb-6 md:mb-7">
            <OutsideDivider />
          </div>
          <div className="mx-auto mt-2 sm:mt-3 md:mt-4">
            <SnapShareTitle />
          </div>
          <p
            className={`font-goudy-italic mx-auto mt-4 max-w-2xl px-2 sm:mt-5 md:mt-6 ${ct.bodyLg}`}
            style={{ color: outsideInk.textSoft }}
          >
            Help us remember the little moments of {coupleDisplayName}&apos;s day — every smile,
            embrace, and candid laugh. Your photos and clips complete our love story.
          </p>
          <div className="flex items-center justify-center pt-3 sm:pt-4">
            <span className="h-px w-16 sm:w-24 md:w-32" style={{ background: outsideInk.line }} />
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 items-start gap-5 sm:mt-8 sm:gap-6 lg:grid-cols-2 lg:gap-8 md:mt-10">
          <ContentCard className="lg:order-1">
            <h4
              className={`${cinzel.className} ${ct.cardTitle} text-center font-semibold uppercase tracking-[0.08em]`}
              style={{ color: palette.heading }}
            >
              Our Favorite Moments
            </h4>
            <div className="grid w-full min-w-0 grid-cols-2 gap-2 sm:gap-3">
              <div
                className="relative aspect-[3/4] overflow-hidden rounded-lg border shadow-sm sm:min-h-[16rem] sm:rounded-xl md:min-h-[18rem]"
                style={{ borderColor: goldLine }}
              >
                <Image
                  src="/mobile_display/couple (5).png"
                  alt="Wedding moment 1"
                  fill
                  sizes="(max-width: 640px) 45vw, 280px"
                  className="object-cover object-top"
                  style={{ imageOrientation: "from-image" }}
                />
              </div>
              <div
                className="relative aspect-[3/4] overflow-hidden rounded-lg border shadow-sm sm:min-h-[16rem] sm:rounded-xl md:min-h-[18rem]"
                style={{ borderColor: goldLine }}
              >
                <Image
                  src="/mobile_display/couple (6).png"
                  alt="Wedding moment 2"
                  fill
                  sizes="(max-width: 640px) 45vw, 280px"
                  className="object-cover object-top"
                  style={{ imageOrientation: "from-image" }}
                />
              </div>
              <div
                className="relative col-span-2 aspect-[16/10] overflow-hidden rounded-lg border shadow-sm sm:aspect-[3/2] sm:rounded-xl"
                style={{ borderColor: goldLine }}
              >
                <Image
                  src="/desktop_view/couple (1).png"
                  alt="Wedding moment 3"
                  fill
                  sizes="(max-width: 1024px) 100vw, 560px"
                  className="object-cover object-center"
                />
              </div>
            </div>
            <p
              className={`font-goudy-italic ${ct.body} text-center`}
              style={{ color: palette.body }}
            >
              Share your snapshots to be featured in our keepsake gallery.
            </p>
          </ContentCard>

          <div className="w-full min-w-0 space-y-5 sm:space-y-6 lg:order-2">
           <ContentCard>
              <h4
                className={`${cinzel.className} ${ct.cardTitle} text-center font-semibold uppercase tracking-[0.08em]`}
                style={{ color: palette.heading }}
              >
                Share Our Wedding Website
              </h4>
              <p
                className={`font-goudy-italic ${ct.body} text-center`}
                style={{ color: palette.body }}
              >
                Spread the word about {coupleDisplayName}&apos;s celebration. Share this QR code so
                friends and family can join us.
              </p>
              <div
                className="mx-auto flex w-full max-w-[240px] flex-col items-center rounded-xl border p-3 shadow-sm sm:p-4"
                style={{ borderColor: goldLine, backgroundColor: C.paper }}
              >
                <div className="flex w-full max-w-full justify-center overflow-visible">
                  <QRCodeCanvas
                    id="snapshare-qr"
                    value={websiteUrl}
                    size={isMobile ? 160 : 200}
                    includeMargin
                    className="h-auto max-w-full"
                    fgColor={QR_FG}
                  />
                </div>
              </div>
              <div className="flex justify-center">
                <PrimaryButton onClick={downloadQRCode}>
                  <Download className="h-3.5 w-3.5 flex-shrink-0 sm:h-4 sm:w-4" />
                  Download QR
                </PrimaryButton>
              </div>
              <p
                className={`font-goudy-italic ${ct.body} text-center`}
                style={{ color: palette.body }}
              >
                Scan with any camera app to open the full invitation and schedule.
              </p>
            </ContentCard> 

            <ContentCard>
              <h5
                className={`${cinzel.className} ${ct.body} text-center font-semibold uppercase tracking-[0.1em]`}
                style={{ color: palette.heading }}
              >
                Wedding Hashtags
              </h5>
              <div className="w-full min-w-0 space-y-2">
                {hashtags.map((hashtag, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => copyHashtag(hashtag, index)}
                    className="flex w-full min-w-0 items-center justify-between gap-2 rounded-lg border px-3 py-2.5 transition-all duration-200 active:scale-[0.98]"
                    style={
                      copiedHashtagIndex === index
                        ? {
                            borderColor: C.gold,
                            backgroundColor: `color-mix(in srgb, ${C.gold} 12%, ${C.paper})`,
                          }
                        : {
                            borderColor: goldLine,
                            backgroundColor: C.paper,
                          }
                    }
                  >
                    <span
                      className={`font-goudy-italic ${ct.body} min-w-0 flex-1 break-all text-left font-semibold`}
                      style={{
                        color: copiedHashtagIndex === index ? palette.accent : palette.body,
                      }}
                    >
                      {hashtag}
                    </span>
                    <span
                      className={`${cinzel.className} flex flex-shrink-0 items-center gap-1 whitespace-nowrap ${sectionType.label} font-semibold uppercase tracking-wider`}
                      style={{
                        color: copiedHashtagIndex === index ? palette.accent : palette.label,
                      }}
                    >
                      {copiedHashtagIndex === index ? (
                        <>
                          <Check className="h-3 w-3" /> Copied
                        </>
                      ) : (
                        <>
                          <Copy className="h-3 w-3" /> Copy
                        </>
                      )}
                    </span>
                  </button>
                ))}
              </div>
              <button
                type="button"
                onClick={copyAllHashtags}
                className="flex w-full items-center justify-center gap-1.5 rounded-lg border py-2.5 transition-all duration-200 active:scale-[0.98]"
                style={
                  copiedAllHashtags
                    ? {
                        borderColor: C.gold,
                        backgroundColor: `color-mix(in srgb, ${C.gold} 12%, ${C.paper})`,
                        color: C.gold,
                      }
                    : buttonStyle
                }
              >
                {copiedAllHashtags ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                <span className={`${cinzel.className} ${ct.btn} font-semibold uppercase tracking-[0.1em]`}>
                  {copiedAllHashtags ? "All Copied!" : "Copy All"}
                </span>
              </button>
            </ContentCard> 

            <ContentCard>
              <h5
                className={`${cinzel.className} ${ct.cardTitle} text-center font-semibold uppercase tracking-[0.08em]`}
                style={{ color: palette.heading }}
              >
                Share on Social Media
              </h5>
              <p
                className={`font-goudy-italic ${ct.body} text-center`}
                style={{ color: palette.body }}
              >
                Help spread the word about {coupleDisplayName}&apos;s wedding across your favorite
                platforms.
              </p>
              <div className="grid w-full min-w-0 grid-cols-2 gap-2 sm:gap-3">
                {(
                  [
                    { platform: "instagram" as const, Icon: Instagram, label: "Instagram" },
                    { platform: "facebook" as const, Icon: Facebook, label: "Facebook" },
                    { platform: "tiktok" as const, Icon: Share2, label: "TikTok" },
                    { platform: "twitter" as const, Icon: Twitter, label: "Twitter" },
                  ] as const
                ).map(({ platform, Icon, label }) => (
                  <button
                    key={platform}
                    type="button"
                    onClick={() => shareOnSocial(platform)}
                    className="group flex w-full min-w-0 items-center justify-center gap-2 rounded-lg border px-3 py-3 shadow-sm transition-all duration-200 hover:shadow-md"
                    style={{
                      borderColor: goldLine,
                      backgroundColor: C.paper,
                    }}
                  >
                    <Icon className="h-4 w-4 flex-shrink-0 sm:h-5 sm:w-5" style={{ color: palette.accent }} />
                    <span
                      className={`${cinzel.className} ${ct.btn} truncate font-semibold uppercase tracking-[0.08em]`}
                      style={{ color: palette.heading }}
                    >
                      {label}
                    </span>
                  </button>
                ))}
              </div>
            </ContentCard> 

            {uploadLink && (
              <ContentCard>
                <p
                  className={`${cinzel.className} ${ct.label} w-full rounded-full border px-3 py-1.5 text-center uppercase leading-snug tracking-[0.14em] sm:tracking-[0.18em] break-words`}
                  style={{
                    color: C.gold,
                    borderColor: goldLine,
                    backgroundColor: `color-mix(in srgb, ${C.gold} 12%, ${C.paper})`,
                  }}
                >
                  Upload Your Photos &amp; Videos
                </p>
                <p
                  className={`font-goudy-italic ${ct.body} break-words text-center`}
                  style={{ color: palette.body }}
                >
                  {siteConfig.snapShare.instructions}
                </p>
                <div
                className="mx-auto flex w-full max-w-[240px] flex-col items-center rounded-xl border p-3 shadow-sm sm:p-4"
                style={{ borderColor: goldLine, backgroundColor: C.paper }}
              >
                  <div className="flex w-full max-w-full justify-center overflow-visible">
                    <QRCodeCanvas
                      id="album-qr"
                      value={uploadLink}
                      size={isMobile ? 160 : 200}
                      level="H"
                      includeMargin
                      className="h-auto max-w-full"
                      fgColor={QR_FG}
                    />
                  </div>
                  <p
                    className={`font-goudy-italic ${ct.body} mt-2 text-center sm:mt-3`}
                    style={{ color: palette.label }}
                  >
                    Scan with your camera app
                  </p>
                </div>
                <div className="mx-auto flex items-center justify-center pt-1 sm:pt-2">
                  <InsideDivider />
                </div>
                <div className="flex w-full flex-col justify-center gap-2 sm:flex-row sm:flex-wrap sm:gap-3">
                  <PrimaryButton onClick={copyUploadLink} active={copiedDriveLink}>
                    {copiedDriveLink ? (
                      <Check className="h-3.5 w-3.5 flex-shrink-0 sm:h-4 sm:w-4" />
                    ) : (
                      <Copy className="h-3.5 w-3.5 flex-shrink-0 sm:h-4 sm:w-4" />
                    )}
                    {copiedDriveLink ? "Copied!" : "Copy Link"}
                  </PrimaryButton>
                  <PrimaryButton onClick={downloadAlbumQRCode}>
                    <Download className="h-3.5 w-3.5 flex-shrink-0 sm:h-4 sm:w-4" />
                    Download QR
                  </PrimaryButton>
                  <a
                    href={uploadLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${cinzel.className} group relative inline-flex w-full min-h-11 items-center justify-center gap-1.5 rounded-md border px-4 py-2.5 font-semibold uppercase tracking-[0.14em] shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md active:translate-y-0 sm:w-auto sm:px-6 sm:py-3 sm:tracking-[0.2em] md:tracking-[0.24em] ${ct.btn}`}
                    style={buttonStyle}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = "#3d4a36"
                      e.currentTarget.style.borderColor = C.gold
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = C.navy
                      e.currentTarget.style.borderColor = buttonStyle.borderColor
                    }}
                  >
                    <Share2 className="h-3.5 w-3.5 flex-shrink-0 sm:h-4 sm:w-4" />
                    Upload Photos
                  </a>
                </div>
              </ContentCard>
            )}
          </div>
        </div>

        <div className="mt-6 space-y-2 text-center sm:mt-8 md:mt-10">
          <p
            className={`font-goudy-italic ${ct.bodyLg}`}
            style={{ color: outsideInk.textSoft }}
          >
            Thank you for helping make {coupleDisplayName}&apos;s wedding celebration memorable.
            Your photos and messages create beautiful memories we will treasure for a lifetime.
          </p>
          <p
            className={`${cinzel.className} ${ct.label} uppercase tracking-[0.18em] sm:tracking-[0.2em]`}
            style={{ color: outsideInk.text }}
          >
            Thank you for sharing the joy
          </p>
        </div>
      </div>
    </section>
  )
}
