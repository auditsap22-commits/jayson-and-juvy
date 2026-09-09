"use client"

import { useMemo, useState, type ReactNode } from "react"
import type { SiteConfig } from "@/lib/site-config"
import { Plus } from "lucide-react"
import { Cinzel } from "next/font/google"
import localFont from "next/font/local"
import Image from "next/image"
import { useSiteConfig } from "@/hooks/use-site-config"
import { layeredSectionTitleSize, sectionType } from "@/lib/section-typography"

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

const reminderInk = {
  navy: "#4b5d44",
  deep: "#3d4a36",
  slate: "#6a7b5c",
  gold: "#6a7b5c",
  champagne: "#c9d2bc",
} as const

const paperWash = {
  cream: "#f7f4eb",
  lift: "#f9f6ee",
  sage: "#4b5d44",
  sageSoft: "#6a7b5c",
  wash: "#8b9d78",
} as const

const creamWash = `
  radial-gradient(80% 55% at 50% 0%, color-mix(in srgb, #c9d2bc 22%, transparent), transparent 62%),
  radial-gradient(ellipse 70% 42% at 100% 0%, color-mix(in srgb, ${paperWash.wash} 28%, transparent), transparent 68%),
  radial-gradient(ellipse 70% 42% at 0% 100%, color-mix(in srgb, ${paperWash.wash} 22%, transparent), transparent 68%),
  linear-gradient(180deg, #ece6d6 0%, #e4ddcc 100%)
`

const palette = {
  body: paperWash.sage,
  heading: paperWash.sage,
  label: paperWash.sageSoft,
  accent: paperWash.sageSoft,
} as const

const faqPalette = {
  body: palette.body,
  heading: palette.heading,
  label: palette.label,
  accent: reminderInk.gold,
} as const

const headerDividerLineStyle = {
  background:
    "linear-gradient(to right, transparent, color-mix(in srgb, #4b5d44 38%, transparent), transparent)",
} as const

const ct = {
  label: sectionType.label,
  body: sectionType.textRelaxed,
  bodyLg: sectionType.textRelaxed,
  question: sectionType.text,
} as const

const linkClass =
  "underline font-semibold transition-colors hover:opacity-80"

interface FAQItem {
  question: string
  answer: string | ReactNode
}

function OrnamentalDivider() {
  return (
    <div className="flex items-center justify-center gap-1.5">
      <span className="h-px w-6 sm:w-10" style={headerDividerLineStyle} />
      <span className="h-0.5 w-0.5 rounded-full sm:h-1 sm:w-1" style={{ backgroundColor: "color-mix(in srgb, #4b5d44 45%, transparent)" }} aria-hidden />
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

function FaqTitle() {
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
        Frequently Asked Questions
      </span>
      <span
        aria-hidden
        className={`${aboveTheBeyond.className} mx-auto block w-fit max-w-full px-1 leading-[0.88] sm:leading-[0.9] mt-2 sm:mt-2.5 md:mt-3`}
        style={{
          fontSize: "var(--script-size)",
          color: paperWash.sageSoft,
        }}
      >
        Everything you need to know
      </span>
      <span className="sr-only">Everything you need to know</span>
    </h2>
  )
}

function getFaqItems(siteConfig: SiteConfig): FAQItem[] {
  const guestArrival = siteConfig.ceremony.guestsTime ?? "8:30 AM"
  const rsvpPhone = siteConfig.details.rsvp.phone.trim()
  const showRsvpPhone =
    rsvpPhone.length > 0 && !/to be announced/i.test(rsvpPhone)

  return [
    {
      question: "When is the wedding?",
      answer: `Our wedding will be held on ${siteConfig.ceremony.date}, ${siteConfig.ceremony.day}. The ceremony begins at ${siteConfig.ceremony.time} at ${siteConfig.ceremony.location}, and the reception follows at ${siteConfig.reception.time} at ${siteConfig.reception.location}.`,
    },
    {
      question: "What time should I arrive?",
      answer: `Please arrive by ${guestArrival} so you have time to find your seat and settle in. The ceremony will begin promptly at ${siteConfig.ceremony.time}. Entourage members are requested to assemble at ${siteConfig.ceremony.entourageTime}.`,
    },
    {
      question: "Where will the ceremony and reception take place?",
      answer: (
        <>
          The ceremony will be held at {siteConfig.ceremony.location}, {siteConfig.ceremony.venue},
          beginning at {siteConfig.ceremony.time}. The reception will follow at{" "}
          {siteConfig.reception.time} at {siteConfig.reception.location},{" "}
          {siteConfig.reception.venue}.{" "}
          <a
            href={siteConfig.ceremony.map}
            target="_blank"
            rel="noopener noreferrer"
            className={linkClass}
            style={{ color: faqPalette.accent }}
          >
            Open ceremony location in Google Maps
          </a>
          {" · "}
          <a
            href={siteConfig.reception.map}
            target="_blank"
            rel="noopener noreferrer"
            className={linkClass}
            style={{ color: faqPalette.accent }}
          >
            Open reception location in Google Maps
          </a>
          .
        </>
      ),
    },
    {
      question: "How do I RSVP?",
      answer: (
        <>
          Please RSVP using the{" "}
          <a
            href="#guest-list"
            className={linkClass}
            style={{ color: faqPalette.accent }}
            onClick={(e) => {
              e.preventDefault()
              document.getElementById("guest-list")?.scrollIntoView({ behavior: "smooth" })
            }}
          >
            guest list
          </a>{" "}
          on this invitation: search for your name and confirm your attendance.
          {"\n\n"}
          Please respond by {siteConfig.details.rsvp.deadline.replace(/\.\s*$/, "")}.
          {showRsvpPhone
            ? `\n\nIf you have questions, please contact ${siteConfig.details.rsvp.coordinator} at ${rsvpPhone}.`
            : `\n\nIf you have questions, please contact ${siteConfig.details.rsvp.coordinator}.`}
        </>
      ),
    },
    {
      question: 'Do we really need to RSVP? We already said "Yes" to the couple.',
      answer:
        "Yes, please. We will be needing your formal RSVP to consolidate guest details and finalize the headcount for catering and seating purposes.",
    },
    {
      question: "Can I sit anywhere at the reception?",
      answer:
        "Please don't. It took us a lot of effort and discussion to finish the seating arrangement, which is planned for everyone's convenience and preference.",
    },
    {
      question: 'Can I bring a "Plus One" to the event?',
      answer:
        "As much as we would love to accommodate all our friends and family, we have a limited number of guests. Please understand that this event is strictly by invitation only.",
    },
    {
      question: "Can I bring my child to the event?",
      answer:
        "Yes. Children are most welcome. Our celebration is for the whole family, and we would be delighted to share the day with your little ones.",
    },
    {
      question:
        'I said "No" to the RSVP but I had a change of plans—I can attend now! What should I do?',
      answer:
        "Please check with us first as we have a strict guest list. If seats become available, we will let you know as soon as possible. Please do not attend unannounced, as we may not have any available seats for you.",
    },
    {
      question: "What if I RSVP'd but cannot attend?",
      answer:
        "We would love to have you at our wedding, but we understand that there are circumstances beyond our control. However, please let us know as soon as possible so we can reallocate your seat/s.",
    },
    {
      question: "Is there parking available?",
      answer:
        `Yes, parking is available at ${siteConfig.ceremony.location} and at ${siteConfig.reception.location}. Please arrive a little early so you have time to park comfortably.`,
    },
    {
      question: "What is the dress code?",
      answer:
        "Please follow the attire guide in Event Details. Casual is most welcome — a casual dress, midi or cocktail dress, collared shirt, or casual polo in Sage Hint, Mint, Sage, Moss, or Evergreen. Kindly avoid white, which is reserved for the couple.",
    },
    {
      question: "Will the ceremony be unplugged?",
      answer:
        "Yes. The greatest gift you can give us during our ceremony is your presence. Guests may take a few photos, but we kindly ask that it be kept minimal so our official photographers can capture every moment. We promise to share the photos with you afterward.",
    },
    {
      question: "Can I take photos or videos during the reception?",
      answer:
        "Yes. While our ceremony will be mostly unplugged, we would love for you to capture the joy throughout the reception. We prepared this celebration wholeheartedly and we want everyone to enjoy it fully.",
    },
    {
      question: "When is the appropriate time to leave?",
      answer:
        "It took us some time to plan a heartfelt wedding that everyone would hopefully enjoy. We humbly request that you celebrate with us until the program ends. Let's laugh, take pictures, and have fun!",
    },
    {
      question: "What if I have dietary restrictions or allergies?",
      answer:
        "Please let us know about any dietary restrictions or allergies when you RSVP. We want to ensure everyone can enjoy the celebration comfortably.",
    },
    {
      question: "How can I help the couple have a great time during their wedding?",
      answer:
        "• Pray with us for favorable weather and the continuous blessings of our Lord as we enter this new chapter of our lives as husband and wife.\n\n• RSVP as soon as your schedule is cleared.\n\n• Dress according to the attire guide and color palette.\n\n• Arrive on time.\n\n• Follow the seating arrangement at the reception.\n\n• Stay until the end of the program.\n\n• Join the activities and enjoy!",
    },
  ]
}

function FaqAnswer({ answer }: { answer: string | ReactNode }) {
  if (typeof answer !== "string") {
    return (
      <div
        className={`font-goudy-italic ${ct.body} whitespace-pre-line`}
        style={{ color: faqPalette.body }}
      >
        {answer}
      </div>
    )
  }

  return (
    <p
      className={`font-goudy-italic ${ct.body} whitespace-pre-line`}
      style={{ color: faqPalette.body }}
    >
      {answer}
    </p>
  )
}

export function FAQ() {
  const siteConfig = useSiteConfig()
  const faqItems = useMemo(() => getFaqItems(siteConfig), [siteConfig])
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section
      id="faq"
      className={`${theSeasons.variable} ${aboveTheBeyond.variable} relative z-10 isolate overflow-hidden pt-8 pb-8 sm:pt-10 sm:pb-10 md:pt-12 md:pb-12 lg:pt-14 lg:pb-14`}
      style={{ background: creamWash }}
    >
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

      {/* Header */}
      <div className="relative z-20 mx-auto max-w-5xl px-6 pt-10 text-center @container/faq sm:px-10 sm:pt-12 md:px-12 md:pt-14">
        <div className="mx-auto mb-5 sm:mb-6 md:mb-7">
          <OrnamentalDivider />
        </div>
        <div className="mx-auto">
          <FaqTitle />
        </div>
        <p
          className={`font-goudy-italic mx-auto mt-4 max-w-2xl px-2 sm:mt-5 md:mt-6 ${ct.bodyLg}`}
          style={{ color: palette.body }}
        >
          Helpful notes so you can simply arrive, celebrate, and enjoy this new chapter with us.
        </p>
        <div className="flex items-center justify-center pt-3 sm:pt-4">
          <span className="h-px w-16 sm:w-24 md:w-32" style={headerDividerLineStyle} />
        </div>
      </div>

      {/* FAQ accordion */}
      <div className="relative z-20 mx-auto mt-6 w-full max-w-3xl px-4 pb-2 sm:mt-8 sm:max-w-4xl sm:px-6 md:px-8 lg:max-w-5xl">
        <div className="space-y-2.5 sm:space-y-3">
            {faqItems.map((item, index) => {
              const isOpen = openIndex === index
              const contentId = `faq-item-${index}`
              const number = String(index + 1).padStart(2, "0")
              return (
                <div
                  key={index}
                  className="relative z-20 overflow-hidden rounded-xl border transition-all duration-300"
                  style={{
                    borderColor: isOpen
                      ? `color-mix(in srgb, ${reminderInk.gold} 55%, transparent)`
                      : "color-mix(in srgb, #4b5d44 14%, transparent)",
                    backgroundColor: isOpen
                      ? `color-mix(in srgb, ${reminderInk.gold} 10%, ${paperWash.cream})`
                      : paperWash.lift,
                    boxShadow: isOpen
                      ? `inset 3px 0 0 ${reminderInk.gold}`
                      : "0 8px 28px color-mix(in srgb, #4b5d44 7%, transparent), inset 0 1px 0 color-mix(in srgb, white 70%, transparent)",
                  }}
                >
                  <button
                    type="button"
                    onClick={() => toggleItem(index)}
                    className="flex w-full items-start gap-3 px-3.5 py-3.5 text-left outline-none transition-colors duration-200 sm:gap-4 sm:px-5 sm:py-4 md:px-6"
                    aria-expanded={isOpen}
                    aria-controls={contentId}
                  >
                    <span
                      className={`${cinzel.className} mt-0.5 shrink-0 text-[10px] font-semibold tracking-[0.16em] sm:text-[11px]`}
                      style={{ color: isOpen ? faqPalette.accent : faqPalette.label }}
                    >
                      {number}
                    </span>
                    <span
                      className={`${cinzel.className} ${ct.question} min-w-0 flex-1 font-semibold leading-snug transition-colors duration-200`}
                      style={{ color: isOpen ? faqPalette.accent : faqPalette.heading }}
                    >
                      {item.question}
                    </span>
                    <span
                      className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center transition-colors duration-300 sm:h-8 sm:w-8"
                      style={{ color: isOpen ? faqPalette.accent : faqPalette.label }}
                      aria-hidden
                    >
                      <Plus
                        className={`h-3.5 w-3.5 transition-transform duration-300 sm:h-4 sm:w-4 ${isOpen ? "rotate-45" : ""}`}
                        strokeWidth={2.25}
                      />
                    </span>
                  </button>

                  <div
                    id={contentId}
                    role="region"
                    className={`grid transition-all duration-300 ease-out ${
                      isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <div
                        className="border-t px-3.5 pb-4 pt-3 sm:px-5 sm:pb-5 sm:pt-4 md:px-6"
                        style={{
                          borderColor: `color-mix(in srgb, ${reminderInk.gold} 28%, transparent)`,
                        }}
                      >
                        <FaqAnswer answer={item.answer} />
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
        </div>
      </div>
    </section>
  )
}
