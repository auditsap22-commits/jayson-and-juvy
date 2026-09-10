"use client"

import { useState, useEffect, useRef, type CSSProperties } from "react"
import { createPortal } from "react-dom"
import {
  Search,
  CheckCircle,
  XCircle,
  AlertCircle,
  User,
  Mail,
  MessageSquare,
  RefreshCw,
  X,
  Heart,
  Sparkles,
  Phone,
  UserPlus,
  Users,
} from "lucide-react"
import { Cinzel } from "next/font/google"
import localFont from "next/font/local"
import { modalTitleSize, sectionType, welcomeTitleSize } from "@/lib/section-typography"

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

const modalCardStyle = {
  background: `linear-gradient(180deg, color-mix(in srgb, ${C.goldSoft} 28%, ${C.paper}) 0%, ${C.paper} 48%, color-mix(in srgb, ${C.gold} 10%, ${C.paper}) 100%)`,
  borderColor: goldLine,
  borderWidth: "1px",
  borderStyle: "solid" as const,
  boxShadow: `0 12px 36px color-mix(in srgb, ${C.navy} 28%, transparent), inset 0 1px 0 color-mix(in srgb, ${C.goldSoft} 55%, transparent)`,
} as const

const innerSurfaceStyle = {
  background: `color-mix(in srgb, ${C.goldSoft} 18%, ${C.paper})`,
  borderColor: goldLine,
} as const

const modalInputClass = `w-full rounded-lg border px-2.5 py-1.5 font-goudy-italic ${sectionType.text} transition-all duration-300 focus:ring-2 sm:px-3 sm:py-2`

const modalInputStyle = {
  borderColor: goldLine,
  color: C.navy,
  backgroundColor: C.paper,
} as const

const modalLabelClass = `font-goudy-italic mb-1.5 flex flex-wrap items-center gap-1.5 ${sectionType.text} font-semibold sm:mb-2 sm:gap-2`

const dividerLineStyle = {
  background: `linear-gradient(to right, transparent, ${goldLine}, transparent)`,
} as const

const buttonStyle = {
  backgroundColor: C.navy,
  borderColor: "color-mix(in srgb, #3d4a36 35%, transparent)",
  color: C.paper,
  boxShadow: "0 10px 24px color-mix(in srgb, #4b5d44 28%, transparent)",
} as const

interface ApiGuest {
  id: string | number
  name: string
  role: string
  email: string
  contact: string
  message: string
  allowedGuests: number
  companions: Array<{ name: string; relationship: string }>
  tableNumber: string
  isVip: boolean
  status: string
  addedBy: string
  createdAt: string
  updatedAt: string
}

interface Guest {
  id: string | number
  Name: string
  Email: string
  Phone: string
  RSVP: string
  Guest: string
  Message: string
  Status: string
  AllowedGuests: number
  Companions?: Array<{ name: string; relationship: string }>
}

export function GuestList() {
  const [guests, setGuests] = useState<Guest[]>([])
  const [filteredGuests, setFilteredGuests] = useState<Guest[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedGuest, setSelectedGuest] = useState<Guest | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isSearching, setIsSearching] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [requestSuccess, setRequestSuccess] = useState<string | null>(null)
  const [showModal, setShowModal] = useState(false)
  const [hasResponded, setHasResponded] = useState(false)
  const [showRequestModal, setShowRequestModal] = useState(false)

  // Form state
  const [formData, setFormData] = useState({
    Name: "",
    Email: "",
    Phone: "",
    RSVP: "",
    Guest: "1",
    Message: "",
    Status: "pending",
  })

  // Companion state
  const [companions, setCompanions] = useState<Array<{ name: string; relationship: string }>>([])

  // Request form state
  const [requestFormData, setRequestFormData] = useState({
    Name: "",
    Email: "",
    Phone: "",
    Guest: "1",
    Message: "",
  })

  const searchRef = useRef<HTMLDivElement>(null)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  // Update companions array based on allowedGuests when a guest is selected
  useEffect(() => {
    if (selectedGuest && formData.RSVP === "Yes") {
      const allowedGuests = selectedGuest.AllowedGuests || 1
      const companionCount = Math.max(0, allowedGuests - 1) // Main guest + companions
      
      setCompanions((prev) => {
        // If we have existing companions from the selected guest, use them as base
        const existingCompanions = selectedGuest.Companions && selectedGuest.Companions.length > 0 
          ? [...selectedGuest.Companions] 
          : [...prev]
        
        const newCompanions = [...existingCompanions]
        if (newCompanions.length < companionCount) {
          // Add empty slots
          for (let i = newCompanions.length; i < companionCount; i++) {
            newCompanions.push({ name: '', relationship: '' })
          }
        } else if (newCompanions.length > companionCount) {
          // Remove excess slots
          newCompanions.splice(companionCount)
        }
        return newCompanions
      })
    } else {
      // Clear companions if not attending or no guest selected
      setCompanions([])
    }
  }, [selectedGuest, formData.RSVP])

  // Fetch all guests on component mount
  useEffect(() => {
    fetchGuests()
  }, [])

  // Filter guests based on search query with real-time auto-suggestion
  // Shows suggestions for ANY letter typed (even just 1 character)
  // Matches names that START with OR CONTAIN the typed letters (case-insensitive)
  // Results automatically narrow down as more letters are typed
  useEffect(() => {
    // Don't show suggestions if search is empty
    if (!searchQuery.trim()) {
      setFilteredGuests([])
      setIsSearching(false)
      return
    }

    // Convert search query to lowercase for case-insensitive matching
    const query = searchQuery.toLowerCase().trim()
    
    // Filter guests where name contains the search query anywhere in the name
    // This includes both:
    // - Names that START with the query (e.g., "Ro" matches "Rolando")
    // - Names that CONTAIN the query (e.g., "ro" matches "Aaron")
    const filtered = guests.filter((guest) => {
      // Safety check: ensure guest.Name exists and is not empty
      if (!guest.Name || guest.Name.trim() === "") {
        return false
      }
      
      const guestName = guest.Name.toLowerCase()
      return guestName.includes(query)
    })

    // Sort results to prioritize names that START with the query
    // This provides a better user experience
    const sorted = filtered.sort((a, b) => {
      const aName = a.Name.toLowerCase()
      const bName = b.Name.toLowerCase()
      const aStarts = aName.startsWith(query)
      const bStarts = bName.startsWith(query)
      
      // If one starts with query and other doesn't, prioritize the one that starts
      if (aStarts && !bStarts) return -1
      if (!aStarts && bStarts) return 1
      
      // Otherwise maintain alphabetical order
      return aName.localeCompare(bName)
    })

    setFilteredGuests(sorted)
    setIsSearching(sorted.length > 0)
  }, [searchQuery, guests])

  // Close search dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearching(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const fetchGuests = async () => {
    setIsLoading(true)
    try {
      // Fetch from local API route which connects to Google Sheets
      const response = await fetch("/api/guests")
      
      if (!response.ok) {
        throw new Error("Failed to fetch guests")
      }
      const data: ApiGuest[] = await response.json()
      
      // Map API response to expected Guest format
      const mappedGuests: Guest[] = data
        .filter((guest) => guest.name && guest.name.trim() !== "") // Filter out guests without names
        .map((guest) => ({
          id: guest.id,
          Name: guest.name,
          Email: guest.email || "",
          Phone: guest.contact || "",
          RSVP: guest.status === "confirmed" ? "Yes" : guest.status === "declined" ? "No" : "",
          Guest: guest.allowedGuests?.toString() || "1",
          Message: guest.message || "",
          Status: guest.status || "pending",
          AllowedGuests: guest.allowedGuests || 1,
          Companions: Array.isArray(guest.companions) ? guest.companions : [],
        }))
      
      setGuests(mappedGuests)
    } catch (error) {
      console.error("Error fetching guests:", error)
      setError("Failed to load guest list")
      setTimeout(() => setError(null), 5000)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSearchSelect = (guest: Guest) => {
    setSelectedGuest(guest)
    setSearchQuery(guest.Name)
    setIsSearching(false)
    
    // Set form data with existing guest info
    setFormData({
      Name: guest.Name,
      Email: guest.Email && guest.Email !== "Pending" && guest.Email !== "" ? guest.Email : "",
      Phone: guest.Phone || "",
      RSVP: guest.RSVP || "",
      Guest: guest.Guest && guest.Guest !== "" ? guest.Guest : "1",
      Message: guest.Message || "",
      Status: guest.Status || "pending",
    })
    
    // Load existing companions if available
    if (guest.Companions && guest.Companions.length > 0) {
      setCompanions(guest.Companions)
    } else {
      setCompanions([])
    }
    
    // Check if guest has already responded (status is confirmed or declined)
    setHasResponded(!!(guest.Status && (guest.Status === "confirmed" || guest.Status === "declined")))
    
    // Show modal
    setShowModal(true)
  }

  const handleFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmitRSVP = async () => {
    if (!selectedGuest) return

    if (!formData.RSVP) {
      setError("Please select if you can attend")
      setTimeout(() => setError(null), 5000)
      return
    }

    setIsLoading(true)
    setError(null)
    setSuccess(null)

    try {
      // Use the allowedGuests from selectedGuest
      const guestCount = formData.RSVP === "Yes" ? selectedGuest.AllowedGuests.toString() : "0"
      
      // Determine the status based on RSVP
      const status = formData.RSVP === "Yes" ? "confirmed" : formData.RSVP === "No" ? "declined" : "pending"
      
      const response = await fetch("/api/guests", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: String(selectedGuest.id),
          name: formData.Name,
          email: formData.Email || "Pending",
          contact: formData.Phone || "",
          status: status,
          allowedGuests: parseInt(guestCount),
          message: formData.Message,
          companions: companions,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to submit RSVP")
      }

      // Show success and close modal after delay
      setSuccess("Thank you for your response!")
      setHasResponded(true)
      
      // Trigger event to refresh Book of Guests
      window.dispatchEvent(new Event("rsvpUpdated"))
      
      // Refresh guest list in the background
      fetchGuests()
    } catch (error) {
      console.error("Error submitting RSVP:", error)
      setError("Failed to submit RSVP. Please try again.")
      setTimeout(() => setError(null), 5000)
    } finally {
      setIsLoading(false)
    }
  }

  const handleCloseModal = () => {
    setShowModal(false)
    setSelectedGuest(null)
    setSearchQuery("")
    setFormData({ Name: "", Email: "", Phone: "", RSVP: "", Guest: "1", Message: "", Status: "pending" })
    setCompanions([])
    setHasResponded(false)
    setError(null)
  }

  const handleSubmitRequest = async () => {
    if (!requestFormData.Name) {
      setError("Name is required")
      setTimeout(() => setError(null), 5000)
      return
    }

    setIsLoading(true)
    setError(null)
    setRequestSuccess(null)

    try {
      // Submit to guest-requests API
      const response = await fetch("/api/guest-requests", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          Name: requestFormData.Name,
          Email: requestFormData.Email || "",
          Phone: requestFormData.Phone || "",
          RSVP: "",
          Guest: requestFormData.Guest || "1",
          Message: requestFormData.Message || "",
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to submit request")
      }

      setRequestSuccess("Request submitted! We'll review and get back to you.")
      
      // Close modal and reset after showing success
      setTimeout(() => {
        setShowRequestModal(false)
        setRequestFormData({ Name: "", Email: "", Phone: "", Guest: "1", Message: "" })
        setSearchQuery("")
        setRequestSuccess(null)
      }, 3000)
    } catch (error) {
      console.error("Error submitting request:", error)
      setError("Failed to submit request. Please try again.")
      setTimeout(() => setError(null), 5000)
    } finally {
      setIsLoading(false)
    }
  }

  const handleCloseRequestModal = () => {
    setShowRequestModal(false)
    setRequestFormData({ Name: "", Email: "", Phone: "", Guest: "1", Message: "" })
    setError(null)
    setRequestSuccess(null)
  }

  return (
    <section
      id="guest-list"
      className={`${theSeasons.variable} ${aboveTheBeyond.variable} relative z-30 bg-transparent py-6 sm:py-10 md:py-12 lg:py-16`}
    >
      {/* Header */}
      <div className="relative z-10 mx-auto mb-4 max-w-5xl px-2 text-center @container/guest-list sm:mb-6 sm:px-3 md:mb-8 md:px-4 lg:mb-10">
        {/* Ornamental divider */}
        <div className="mx-auto mb-5 flex items-center justify-center gap-1.5 sm:mb-6 md:mb-7">
          <span className="h-px w-6 sm:w-10" style={{ background: `linear-gradient(to right, transparent, ${outsideInk.line}, transparent)` }} />
          <span className="h-0.5 w-0.5 rounded-full sm:h-1 sm:w-1" style={{ backgroundColor: outsideInk.line }} aria-hidden />
          <span className="h-px w-6 sm:w-10" style={{ background: `linear-gradient(to left, transparent, ${outsideInk.line}, transparent)` }} />
        </div>

        {/* Title block */}
        <div
          className="welcome-title-lockup relative mx-auto mt-2 w-full max-w-full text-center sm:mt-3 md:mt-4"
          style={
            {
              "--title-size": welcomeTitleSize.main,
              "--script-size": welcomeTitleSize.script,
            } as CSSProperties
          }
        >
          <span
            className={`${theSeasons.className} block uppercase leading-[0.78] tracking-[0.08em] min-[400px]:tracking-[0.11em] sm:tracking-[0.13em] md:tracking-[0.14em] pb-1 sm:pb-1.5`}
            style={{ fontSize: "var(--title-size)", color: outsideInk.text }}
          >
            RSVP
          </span>
          <span
            aria-hidden
            className={`${aboveTheBeyond.className} mx-auto block w-fit max-w-full px-1 leading-[0.88] sm:leading-[0.9] mt-2 sm:mt-2.5 md:mt-3`}
            style={{
              fontSize: "var(--script-size)",
              color: outsideInk.textSoft,
            }}
          >
            Confirm your attendance
          </span>
        </div>

        {/* Subtitle block */}
        <div className="mx-auto mt-5 max-w-xl space-y-2 px-2 sm:mt-6 sm:space-y-3">
          <p className={`font-goudy-italic ${sectionType.textRelaxed}`} style={{ color: outsideInk.textSoft }}>
            To help us plan a beautiful and intimate celebration, we kindly ask that you confirm your
            attendance. Please search for your name below to confirm your presence at our special day.
          </p>
          <p className={`font-goudy-italic ${sectionType.textRelaxed}`} style={{ color: outsideInk.textSoft }}>
            If we do not receive your response by the deadline, we will assume you are unable to attend.
          </p>
        </div>

        {/* Divider below header */}
        <div className="mt-4 flex items-center justify-center sm:mt-5">
          <span className="h-px w-16 sm:w-24 md:w-32" style={{ background: outsideInk.line }} />
        </div>
      </div>

      {/* Search Section */}
      <div className="relative z-10 max-w-2xl mx-auto px-2 sm:px-4 md:px-6 overflow-visible">
        {/* Card with elegant border */}
        <div
          className="relative overflow-visible rounded-lg border backdrop-blur-xl sm:rounded-xl md:rounded-2xl"
          style={modalCardStyle}
        >
          {/* Card content */}
          <div className="relative p-2.5 sm:p-4 md:p-5 lg:p-6 overflow-visible">
            <div className="relative z-10 space-y-3 sm:space-y-4 overflow-visible">
              <div className="flex items-center gap-2 sm:gap-3">
                <div
                  className="rounded-lg p-1.5 shadow-md sm:p-2"
                  style={{ backgroundColor: C.navy }}
                >
                  <Search className="h-3.5 w-3.5 sm:h-4 sm:w-4 md:h-5 md:w-5" style={{ color: C.paper }} />
                </div>
                <div>
                  <label className={`mb-0.5 block font-sans font-semibold sm:mb-1 ${sectionType.text}`} style={{ color: palette.heading }}>
                    Find Your Name
                  </label>
                  <p className={`font-sans ${sectionType.label}`} style={{ color: palette.body }}>
                    Type as you search to see instant results
                  </p>
                </div>
              </div>
              <div ref={searchRef} className="relative z-[100]">
                <div className="relative">
                  <Search className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 sm:left-3 sm:h-4 sm:w-4" style={{ color: C.gold }} />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Type your name..."
                    className="w-full rounded-lg border-2 py-2 pl-8 pr-2.5 font-sans text-xs shadow-sm transition-all duration-300 focus:shadow-md sm:py-2.5 sm:pl-10 sm:pr-3 sm:text-sm md:py-3"
                    style={{
                      borderColor: goldLine,
                      color: C.navy,
                      backgroundColor: C.paper,
                    }}
                  />
                </div>
                {/* Autocomplete dropdown */}
                {isSearching && filteredGuests.length > 0 && (
                  <div 
                    className="absolute z-[9999] mt-1 w-full overflow-hidden rounded-lg border shadow-xl backdrop-blur-lg sm:mt-1.5 sm:rounded-xl md:mt-2"
                    style={{
                      position: "absolute",
                      top: "100%",
                      left: 0,
                      right: 0,
                      backgroundColor: `color-mix(in srgb, ${C.paper} 95%, white)`,
                      borderColor: goldLine,
                    }}
                  >
                    {filteredGuests.map((guest, index) => (
                      <button
                        key={guest.id ?? index}
                        type="button"
                        onMouseDown={(e) => e.preventDefault()}
                        onClick={() => handleSearchSelect(guest)}
                        className="group flex w-full items-center gap-2 border-b px-2.5 py-2 text-left transition-all duration-200 last:border-b-0 sm:gap-3 sm:px-3 sm:py-2.5"
                        style={{ borderColor: goldLine }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = `color-mix(in srgb, ${C.goldSoft} 28%, ${C.paper})`
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = "transparent"
                        }}
                      >
                        <div className="relative flex-shrink-0">
                          <div
                            className="rounded-full p-1 shadow-sm transition-all duration-300 group-hover:shadow-md sm:p-1.5"
                            style={{ backgroundColor: C.navy }}
                          >
                            <User className="h-3 w-3 sm:h-3.5 sm:w-3.5" style={{ color: C.paper }} />
                          </div>
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="truncate text-xs font-semibold sm:text-sm" style={{ color: C.navy }}>
                            {guest.Name}
                          </div>
                          {guest.Email && guest.Email !== "Pending" && (
                            <div className={`${sectionType.label} mt-0.5 truncate`} style={{ color: palette.label }}>
                              {guest.Email}
                            </div>
                          )}
                        </div>
                        <div className="flex-shrink-0 transition-all duration-200 group-hover:translate-x-1" style={{ color: C.gold }}>
                          <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
                {searchQuery && filteredGuests.length === 0 && (
                  <div 
                    className="absolute z-[9999] mt-1.5 w-full overflow-hidden rounded-lg border-2 shadow-xl backdrop-blur-lg sm:mt-2"
                    style={{
                      position: "absolute",
                      top: "100%",
                      left: 0,
                      right: 0,
                      backgroundColor: `color-mix(in srgb, ${C.paper} 95%, white)`,
                      borderColor: goldLine,
                    }}
                  >
                    <div className="p-2.5 sm:p-3 md:p-4">
                      <div className="flex items-start gap-2 sm:gap-3 mb-2 sm:mb-3">
                        <div
                          className="flex-shrink-0 rounded-lg p-1.5 shadow-sm sm:p-2"
                          style={{ backgroundColor: C.navy }}
                        >
                          <UserPlus className="h-3 w-3 sm:h-4 sm:w-4" style={{ color: C.paper }} />
                        </div>
                        <div className="flex-1">
                          <h4 className="mb-1 text-xs font-semibold sm:text-sm" style={{ color: palette.heading }}>Not finding your name?</h4>
                          <p className={`${sectionType.label} leading-relaxed`} style={{ color: palette.body }}>
                            We'd love to have you with us! Send a request to join the celebration.
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => {
                          setRequestFormData({ ...requestFormData, Name: searchQuery })
                          setShowRequestModal(true)
                        }}
                        className={`flex w-full items-center justify-center rounded-lg py-2 ${sectionType.text} font-semibold shadow-md transition-all duration-300 hover:scale-[1.02] hover:shadow-lg active:scale-[0.98] sm:py-2.5`}
                        style={buttonStyle}
                      >
                        <UserPlus className="h-3 w-3 mr-1.5 sm:mr-2 inline" />
                        Request to Join
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* RSVP Modal — portaled to escape motion/filter stacking context */}
      {isMounted && showModal && createPortal(
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 p-1 backdrop-blur-sm animate-in fade-in sm:p-2 md:p-4"
          onClick={handleCloseModal}
        >
          <div
            className="relative mx-1 flex max-h-[95vh] w-full max-w-md flex-col overflow-hidden rounded-xl animate-in zoom-in-95 duration-300 @container/guest-modal sm:mx-2 sm:max-w-lg sm:rounded-2xl md:mx-4"
            style={modalCardStyle}
            onClick={(e) => e.stopPropagation()}
          >
            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-5 top-0 h-px sm:inset-x-8"
              style={{
                background: `linear-gradient(to right, transparent, ${C.gold}, transparent)`,
              }}
            />

            {/* Modal Header */}
            <div className="relative flex-shrink-0 px-4 pb-4 pt-5 text-center sm:px-6 sm:pb-5 sm:pt-6">
              {!hasResponded && (
                <button
                  onClick={handleCloseModal}
                  className="absolute right-2 top-2 rounded-full p-1 transition-colors hover:bg-black/5 sm:right-3 sm:top-3 sm:p-1.5"
                  style={{ color: palette.heading }}
                  aria-label="Close"
                >
                  <X className="h-4 w-4 sm:h-5 sm:w-5" />
                </button>
              )}

              <div className="mx-auto mb-4 flex items-center justify-center gap-1.5 sm:mb-5">
                <span className="h-px w-6 sm:w-10" style={dividerLineStyle} />
                <Heart className="h-3 w-3 sm:h-3.5 sm:w-3.5" style={{ color: palette.accent }} aria-hidden />
                <span className="h-px w-6 sm:w-10" style={dividerLineStyle} />
              </div>

              <h3
                className="welcome-title-lockup relative mx-auto w-full max-w-full text-center"
                style={
                  {
                    "--title-size": modalTitleSize.main,
                    "--script-size": modalTitleSize.script,
                  } as CSSProperties
                }
              >
                <span
                  className={`${theSeasons.className} block uppercase leading-[0.78] tracking-[0.08em] min-[400px]:tracking-[0.11em] sm:tracking-[0.13em] pb-1 sm:pb-1.5`}
                  style={{ fontSize: "var(--title-size)", color: palette.heading }}
                >
                  You are Invited
                </span>
                <span
                  aria-hidden
                  className={`${aboveTheBeyond.className} mx-auto block w-fit max-w-full px-1 leading-[0.88] sm:leading-[0.9] mt-2 sm:mt-2.5 md:mt-3`}
                  style={{
                    fontSize: "var(--script-size)",
                    color: palette.accent,
                  }}
                >
                  {selectedGuest?.Name || "to our celebration"}
                </span>
              </h3>

              <p
                className={`font-goudy-italic mx-auto mt-4 max-w-md sm:mt-5 ${sectionType.textSnug}`}
                style={{ color: palette.body }}
              >
                Hello <span style={{ color: palette.heading }}>{selectedGuest?.Name}</span>, you are
                invited to our wedding!
              </p>
              <p
                className={`font-goudy-italic mx-auto mt-2 ${sectionType.text}`}
                style={{ color: palette.body }}
              >
                We&apos;ve reserved{" "}
                <span className="font-semibold" style={{ color: palette.accent }}>
                  {selectedGuest?.AllowedGuests || 1}
                </span>{" "}
                {selectedGuest?.AllowedGuests === 1 ? "seat" : "seats"} for you.
              </p>
            </div>

            {/* Modal Content */}
            <div className="min-h-0 flex-1 overflow-y-auto px-4 pb-4 sm:px-6 sm:pb-5 md:px-7 md:pb-6">
                {hasResponded ? (
                  <div className="py-3 text-center sm:py-4 md:py-6">
                    <div
                      className="mb-3 inline-flex h-12 w-12 items-center justify-center rounded-full sm:mb-4 sm:h-14 sm:w-14 md:h-16 md:w-16"
                      style={{ backgroundColor: C.navy }}
                    >
                      <CheckCircle className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8" style={{ color: C.paper }} />
                    </div>
                    <h4
                      className={`${theSeasons.className} mb-2 uppercase tracking-[0.12em] sm:text-lg md:text-xl ${sectionType.subheader}`}
                      style={{ color: palette.heading }}
                    >
                      Thank You for Responding!
                    </h4>
                    <p
                      className={`font-goudy-italic mb-4 px-2 ${sectionType.text}`}
                      style={{ color: palette.body }}
                    >
                      We&apos;ve received your RSVP and look forward to celebrating with you!
                    </p>
                    <div
                      className="space-y-2.5 rounded-lg border p-3 sm:space-y-3 sm:p-4"
                      style={innerSurfaceStyle}
                    >
                      <div className="mb-1.5 flex items-center justify-center gap-2 sm:mb-2">
                        {selectedGuest?.RSVP === "Yes" && (
                          <>
                            <CheckCircle className="h-4 w-4 text-green-600 sm:h-5 sm:w-5" />
                            <span className="font-goudy-italic text-xs font-semibold text-green-600 sm:text-sm">
                              You&apos;re Attending!
                            </span>
                          </>
                        )}
                        {selectedGuest?.RSVP === "No" && (
                          <>
                            <XCircle className="h-4 w-4 text-red-600 sm:h-5 sm:w-5" />
                            <span className="font-goudy-italic text-xs font-semibold text-red-600 sm:text-sm">
                              Unable to Attend
                            </span>
                          </>
                        )}
                      </div>
                      {selectedGuest?.RSVP === "Yes" && (
                        <div className="rounded-lg border p-2.5 sm:p-3" style={innerSurfaceStyle}>
                          <div className="text-center">
                            <p
                              className={`font-goudy-italic mb-1 ${sectionType.label} font-medium`}
                              style={{ color: palette.label }}
                            >
                              Number of Guests
                            </p>
                            <p
                              className={`${theSeasons.className} text-lg sm:text-xl md:text-2xl`}
                              style={{ color: palette.heading }}
                            >
                              {selectedGuest.AllowedGuests || 1}
                            </p>
                          </div>
                        </div>
                      )}
                      {selectedGuest && selectedGuest.Message && selectedGuest.Message.trim() !== "" && (
                        <div className="border-t pt-2" style={{ borderColor: innerSurfaceStyle.borderColor }}>
                          <p
                            className={`font-goudy-italic px-1 ${sectionType.label} italic`}
                            style={{ color: palette.body }}
                          >
                            &ldquo;{selectedGuest.Message}&rdquo;
                          </p>
                        </div>
                      )}
                    </div>
                    <button
                      onClick={handleCloseModal}
                      className={`${cinzel.className} mt-4 rounded-sm border px-6 py-2.5 ${sectionType.label} font-semibold uppercase tracking-[0.2em] shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md sm:mt-5 sm:px-8 sm:py-3 md:mt-6`}
                      style={buttonStyle}
                    >
                      Close
                    </button>
                  </div>
                ) : (
                  // RSVP Form for guests who haven't responded
                  <form
                    onSubmit={(e) => {
                      e.preventDefault()
                      handleSubmitRSVP()
                    }}
                    className="space-y-2.5 sm:space-y-3 md:space-y-4"
                  >
                    <div>
                      <label className={modalLabelClass} style={{ color: palette.heading }}>
                        <Sparkles className="h-3.5 w-3.5 flex-shrink-0 sm:h-4 sm:w-4" style={{ color: palette.accent }} />
                        <span>Can you attend? *</span>
                      </label>
                      <div className="grid grid-cols-2 gap-1.5 sm:gap-2 md:gap-3">
                        <button
                          type="button"
                          onClick={() =>
                            setFormData((prev) => ({ ...prev, RSVP: "Yes", Guest: "1" }))
                          }
                          className={`relative rounded-lg border-2 p-2 transition-all duration-300 sm:p-2.5 md:p-3 lg:p-4 ${
                            formData.RSVP === "Yes"
                              ? "scale-[1.02] shadow-md"
                              : "hover:shadow-sm"
                          }`}
                          style={
                            formData.RSVP === "Yes"
                              ? {
                                  borderColor: palette.accent,
                                  backgroundColor: `color-mix(in srgb, ${C.gold} 12%, ${C.paper})`,
                                }
                              : {
                                  borderColor: innerSurfaceStyle.borderColor,
                                  backgroundColor: C.paper,
                                }
                          }
                        >
                          <div className="flex items-center justify-center gap-1.5 sm:gap-2">
                            <CheckCircle
                              className="h-4 w-4 flex-shrink-0 sm:h-5 sm:w-5"
                              style={{
                                color:
                                  formData.RSVP === "Yes" ? palette.accent : palette.label,
                              }}
                            />
                            <span
                              className="font-goudy-italic text-xs font-semibold sm:text-sm"
                              style={{ color: palette.heading }}
                            >
                              Yes!
                            </span>
                          </div>
                        </button>
                        <button
                          type="button"
                          onClick={() => setFormData((prev) => ({ ...prev, RSVP: "No" }))}
                          className={`relative rounded-lg border-2 p-2 transition-all duration-300 sm:p-2.5 md:p-3 lg:p-4 ${
                            formData.RSVP === "No"
                              ? "scale-[1.02] border-red-500 bg-red-50 shadow-md"
                              : "hover:shadow-sm"
                          }`}
                          style={
                            formData.RSVP === "No"
                              ? undefined
                              : {
                                  borderColor: innerSurfaceStyle.borderColor,
                                  backgroundColor: C.paper,
                                }
                          }
                        >
                          <div className="flex items-center justify-center gap-1.5 sm:gap-2">
                            <XCircle
                              className={`h-4 w-4 flex-shrink-0 sm:h-5 sm:w-5 ${
                                formData.RSVP === "No" ? "text-red-600" : ""
                              }`}
                              style={formData.RSVP === "No" ? undefined : { color: palette.label }}
                            />
                            <span
                              className={`font-goudy-italic text-xs font-semibold sm:text-sm ${
                                formData.RSVP === "No" ? "text-red-600" : ""
                              }`}
                              style={formData.RSVP !== "No" ? { color: palette.heading } : undefined}
                            >
                              Sorry, No
                            </span>
                          </div>
                        </button>
                      </div>
                    </div>

                    {formData.RSVP === "Yes" && companions.length > 0 && (
                      <div className="space-y-2.5 sm:space-y-3">
                        <label className={modalLabelClass} style={{ color: palette.heading }}>
                          <Users className="h-3.5 w-3.5 flex-shrink-0 sm:h-4 sm:w-4" style={{ color: palette.accent }} />
                          <span>Who&apos;s Coming With You?</span>
                        </label>
                        <p
                          className={`font-goudy-italic -mt-1 sm:-mt-1.5 ${sectionType.label}`}
                          style={{ color: palette.body }}
                        >
                          Please provide names and relationships for your{" "}
                          <span className="font-semibold" style={{ color: palette.heading }}>
                            {companions.length}
                          </span>{" "}
                          additional {companions.length === 1 ? "guest" : "guests"}
                        </p>
                        {companions.map((companion, index) => (
                          <div
                            key={index}
                            className="space-y-2 rounded-lg border p-2.5 sm:space-y-2.5 sm:p-3"
                            style={innerSurfaceStyle}
                          >
                            <div className="mb-1 flex items-center gap-1.5 sm:mb-1.5">
                              <User className="h-3 w-3 sm:h-3.5 sm:w-3.5" style={{ color: palette.accent }} />
                              <span
                                className={`font-goudy-italic ${sectionType.label} font-semibold`}
                                style={{ color: palette.heading }}
                              >
                                Guest {index + 2}
                              </span>
                            </div>
                            <div className="space-y-1.5 sm:space-y-2">
                              <div>
                                <label
                                  className={`font-goudy-italic mb-1 block ${sectionType.label} font-medium`}
                                  style={{ color: palette.label }}
                                >
                                  Full Name
                                </label>
                                <input
                                  type="text"
                                  value={companion.name}
                                  onChange={(e) => {
                                    const newCompanions = [...companions]
                                    newCompanions[index] = { ...newCompanions[index], name: e.target.value }
                                    setCompanions(newCompanions)
                                  }}
                                  placeholder={`Name of guest ${index + 2}`}
                                  className={modalInputClass}
                                  style={modalInputStyle}
                                />
                              </div>
                              <div>
                                <label
                                  className={`font-goudy-italic mb-1 block ${sectionType.label} font-medium`}
                                  style={{ color: palette.label }}
                                >
                                  Relationship with {selectedGuest?.Name || "Primary Guest"}
                                </label>
                                <input
                                  type="text"
                                  value={companion.relationship}
                                  onChange={(e) => {
                                    const newCompanions = [...companions]
                                    newCompanions[index] = {
                                      ...newCompanions[index],
                                      relationship: e.target.value,
                                    }
                                    setCompanions(newCompanions)
                                  }}
                                  placeholder="e.g., Spouse, Friend, Child, Parent"
                                  className={modalInputClass}
                                  style={modalInputStyle}
                                />
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    <div>
                      <label className={modalLabelClass} style={{ color: palette.heading }}>
                        <MessageSquare className="h-3.5 w-3.5 flex-shrink-0 sm:h-4 sm:w-4" style={{ color: palette.accent }} />
                        <span>Song Request</span>
                        <span className={`${sectionType.label} font-normal`} style={{ color: palette.body }}>
                          (Optional)
                        </span>
                      </label>
                      <input
                        type="text"
                        name="Message"
                        value={formData.Message}
                        onChange={handleFormChange}
                        placeholder="Share a song you'd love to hear on our special day"
                        className={modalInputClass}
                        style={modalInputStyle}
                      />
                    </div>

                    <div>
                      <label className={modalLabelClass} style={{ color: palette.heading }}>
                        <Mail className="h-3.5 w-3.5 flex-shrink-0 sm:h-4 sm:w-4" style={{ color: palette.accent }} />
                        <span>Your Email Address</span>
                        <span className={`${sectionType.label} font-normal`} style={{ color: palette.body }}>
                          (Optional)
                        </span>
                      </label>
                      <input
                        type="email"
                        name="Email"
                        value={formData.Email}
                        onChange={handleFormChange}
                        placeholder="your.email@example.com"
                        className={modalInputClass}
                        style={modalInputStyle}
                      />
                    </div>

                    <div>
                      <label className={modalLabelClass} style={{ color: palette.heading }}>
                        <Phone className="h-3.5 w-3.5 flex-shrink-0 sm:h-4 sm:w-4" style={{ color: palette.accent }} />
                        <span>Phone Number</span>
                        <span className={`${sectionType.label} font-normal`} style={{ color: palette.body }}>
                          (Optional)
                        </span>
                      </label>
                      <input
                        type="tel"
                        name="Phone"
                        value={formData.Phone}
                        onChange={handleFormChange}
                        placeholder="+63 912 345 6789"
                        className={modalInputClass}
                        style={modalInputStyle}
                      />
                    </div>

                    <div className="pt-2 sm:pt-3">
                      <button
                        type="submit"
                        disabled={isLoading}
                        className={`${cinzel.className} flex w-full items-center justify-center gap-1.5 rounded-sm border py-2.5 ${sectionType.label} font-semibold uppercase tracking-[0.2em] shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md disabled:opacity-70 sm:gap-2 sm:py-3`}
                        style={buttonStyle}
                      >
                        {isLoading ? (
                          <>
                            <RefreshCw className="h-3.5 w-3.5 sm:h-4 sm:w-4 animate-spin" />
                            <span className="text-xs sm:text-sm">Submitting...</span>
                          </>
                        ) : (
                          <>
                            <Heart className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                            <span className="text-xs sm:text-sm">Submit RSVP</span>
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                )}
              </div>

              {/* Error message */}
              {error && !success && (
                <div className="px-2 sm:px-2.5 md:px-4 lg:px-6 xl:px-8 pb-2 sm:pb-2.5 md:pb-4 lg:pb-6">
                  <div className="bg-red-50 border-2 border-red-200 rounded-xl p-2 sm:p-2.5 md:p-3 lg:p-4">
                    <div className="flex items-center gap-1.5 sm:gap-2">
                      <AlertCircle className="h-3.5 w-3.5 sm:h-4 sm:w-4 md:h-5 md:w-5 text-red-600 flex-shrink-0" />
                      <span className={`text-red-600 font-semibold ${sectionType.text}`}>{error}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>,
        document.body
      )}

        {/* RSVP Success — rendered outside RSVP modal to escape transform stacking context */}
        {isMounted && success && createPortal(
          <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 p-5 backdrop-blur-md animate-in fade-in duration-200 sm:p-8">
            <div className="w-full max-w-sm animate-in zoom-in-95 duration-200">
              <div className="overflow-hidden rounded-2xl" style={modalCardStyle}>
                <div
                  aria-hidden
                  className="h-[3px] w-full"
                  style={{
                    background: `linear-gradient(to right, transparent, ${C.gold}, transparent)`,
                  }}
                />
                <div className="px-6 pb-6 pt-6 text-center">
                  <div className="relative mb-4 inline-flex items-center justify-center">
                    <div
                      className="absolute h-14 w-14 animate-ping rounded-full"
                      style={{
                        animationDuration: "2.5s",
                        backgroundColor: `color-mix(in srgb, ${C.gold} 20%, transparent)`,
                      }}
                    />
                    <div
                      className="relative flex h-12 w-12 items-center justify-center rounded-full shadow-md"
                      style={{ backgroundColor: C.navy }}
                    >
                      <CheckCircle className="h-6 w-6" strokeWidth={2} style={{ color: C.paper }} />
                    </div>
                  </div>

                  <h4
                    className={`${theSeasons.className} mb-1 text-base uppercase tracking-[0.12em]`}
                    style={{ color: palette.heading }}
                  >
                    RSVP Confirmed
                  </h4>

                  {formData.RSVP === "Yes" && (
                    <p className="font-goudy-italic text-sm leading-snug" style={{ color: palette.body }}>
                      We&apos;re thrilled you&apos;ll be joining us — your spot is saved!
                    </p>
                  )}
                  {formData.RSVP === "No" && (
                    <p className="font-goudy-italic text-sm leading-snug" style={{ color: palette.body }}>
                      We&apos;ll miss you, but thank you for letting us know.
                    </p>
                  )}
                  {!formData.RSVP && (
                    <p className="font-goudy-italic text-sm leading-snug" style={{ color: palette.body }}>
                      Thank you for your response!
                    </p>
                  )}

                  <div className="my-4 flex items-center gap-3">
                    <span className="h-px flex-1" style={dividerLineStyle} />
                    <Heart className="h-2.5 w-2.5 flex-shrink-0" style={{ color: palette.accent }} />
                    <span className="h-px flex-1" style={dividerLineStyle} />
                  </div>

                  <p className="font-goudy-italic mb-4 text-sm leading-relaxed" style={{ color: palette.body }}>
                    Before you go, leave a message for the couple — your words will be a cherished memory
                    they can always look back on.
                  </p>

                  <a
                    href="#messages"
                    onClick={() => {
                      setSuccess(null)
                      setShowModal(false)
                      setSearchQuery("")
                      setSelectedGuest(null)
                      setTimeout(() => {
                        const el = document.getElementById("messages")
                        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" })
                      }, 100)
                    }}
                    className={`${cinzel.className} mb-3 inline-flex w-full items-center justify-center gap-2 rounded-sm border py-3 ${sectionType.label} font-semibold uppercase tracking-[0.2em] shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md active:scale-[0.98]`}
                    style={buttonStyle}
                  >
                    <MessageSquare className="h-3 w-3 flex-shrink-0" />
                    Leave a Message
                  </a>

                  <button
                    onClick={() => {
                      setSuccess(null)
                      setShowModal(false)
                      setSearchQuery("")
                      setSelectedGuest(null)
                    }}
                    className={`font-goudy-italic ${sectionType.label} tracking-wide transition-colors duration-200`}
                    style={{ color: palette.body }}
                  >
                    Maybe later — close
                  </button>
                </div>
              </div>
            </div>
          </div>,
        document.body
      )}

        {/* Request to Join Modal */}
        {isMounted && showRequestModal && createPortal(
          <div
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 p-1 backdrop-blur-sm animate-in fade-in sm:p-2 md:p-4"
            onClick={handleCloseRequestModal}
          >
            <div
              className="relative mx-1 flex max-h-[95vh] w-full max-w-md flex-col overflow-hidden rounded-xl animate-in zoom-in-95 duration-300 @container/guest-modal sm:mx-2 sm:max-w-lg sm:rounded-2xl md:mx-4"
              style={modalCardStyle}
              onClick={(e) => e.stopPropagation()}
            >
              <div
                aria-hidden
                className="pointer-events-none absolute inset-x-5 top-0 h-px sm:inset-x-8"
                style={{
                  background: `linear-gradient(to right, transparent, ${C.gold}, transparent)`,
                }}
              />

              <div className="relative flex-shrink-0 px-4 pb-4 pt-5 text-center sm:px-6 sm:pb-5 sm:pt-6">
                <button
                  onClick={handleCloseRequestModal}
                  className="absolute right-2 top-2 rounded-full p-1 transition-colors hover:bg-black/5 sm:right-3 sm:top-3 sm:p-1.5"
                  style={{ color: palette.heading }}
                  aria-label="Close"
                >
                  <X className="h-4 w-4 sm:h-5 sm:w-5" />
                </button>

                <div className="mx-auto mb-4 flex items-center justify-center gap-1.5 sm:mb-5">
                  <span className="h-px w-6 sm:w-10" style={dividerLineStyle} />
                  <UserPlus className="h-3 w-3 sm:h-3.5 sm:w-3.5" style={{ color: palette.accent }} aria-hidden />
                  <span className="h-px w-6 sm:w-10" style={dividerLineStyle} />
                </div>

                <h3
                  className="welcome-title-lockup relative mx-auto w-full max-w-full text-center"
                  style={
                    {
                      "--title-size": modalTitleSize.main,
                      "--script-size": modalTitleSize.script,
                    } as CSSProperties
                  }
                >
                  <span
                    className={`${theSeasons.className} block uppercase leading-[0.78] tracking-[0.08em] min-[400px]:tracking-[0.11em] sm:tracking-[0.13em] pb-1 sm:pb-1.5`}
                    style={{ fontSize: "var(--title-size)", color: palette.heading }}
                  >
                    Request to Join
                  </span>
                  <span
                    aria-hidden
                    className={`${aboveTheBeyond.className} mx-auto block w-fit max-w-full px-1 leading-[0.88] sm:leading-[0.9] mt-2 sm:mt-2.5 md:mt-3`}
                    style={{
                      fontSize: "var(--script-size)",
                      color: palette.accent,
                    }}
                  >
                    celebrate with us
                  </span>
                </h3>

                <p
                  className={`font-goudy-italic mx-auto mt-4 max-w-md sm:mt-5 ${sectionType.textSnug}`}
                  style={{ color: palette.body }}
                >
                  {requestFormData.Name ? (
                    <>
                      Hi <span style={{ color: palette.heading }}>{requestFormData.Name}</span> — want to
                      celebrate with us? Send a request!
                    </>
                  ) : (
                    <>Want to celebrate with us? Send a request!</>
                  )}
                </p>
              </div>

              <div className="min-h-0 flex-1 overflow-y-auto px-4 pb-4 sm:px-6 sm:pb-5 md:px-7 md:pb-6">
                <form
                  onSubmit={(e) => {
                    e.preventDefault()
                    handleSubmitRequest()
                  }}
                  className="space-y-2.5 sm:space-y-3 md:space-y-4"
                >
                  <div>
                    <label className={modalLabelClass} style={{ color: palette.heading }}>
                      <User className="h-3.5 w-3.5 flex-shrink-0 sm:h-4 sm:w-4" style={{ color: palette.accent }} />
                      <span>Full Name *</span>
                    </label>
                    <input
                      type="text"
                      name="Name"
                      value={requestFormData.Name}
                      onChange={(e) => setRequestFormData({ ...requestFormData, Name: e.target.value })}
                      required
                      placeholder="Enter your full name"
                      className={modalInputClass}
                      style={modalInputStyle}
                    />
                  </div>

                  <div>
                    <label className={modalLabelClass} style={{ color: palette.heading }}>
                      <Mail className="h-3.5 w-3.5 flex-shrink-0 sm:h-4 sm:w-4" style={{ color: palette.accent }} />
                      <span>Email Address</span>
                      <span className={`${sectionType.label} font-normal`} style={{ color: palette.body }}>
                        (Optional)
                      </span>
                    </label>
                    <input
                      type="email"
                      name="Email"
                      value={requestFormData.Email}
                      onChange={(e) => setRequestFormData({ ...requestFormData, Email: e.target.value })}
                      placeholder="your.email@example.com"
                      className={modalInputClass}
                      style={modalInputStyle}
                    />
                  </div>

                  <div>
                    <label className={modalLabelClass} style={{ color: palette.heading }}>
                      <Phone className="h-3.5 w-3.5 flex-shrink-0 sm:h-4 sm:w-4" style={{ color: palette.accent }} />
                      <span>Phone Number</span>
                      <span className={`${sectionType.label} font-normal`} style={{ color: palette.body }}>
                        (Optional)
                      </span>
                    </label>
                    <input
                      type="tel"
                      name="Phone"
                      value={requestFormData.Phone}
                      onChange={(e) => setRequestFormData({ ...requestFormData, Phone: e.target.value })}
                      placeholder="+63 912 345 6789"
                      className={modalInputClass}
                      style={modalInputStyle}
                    />
                  </div>

                  <div>
                    <label className={modalLabelClass} style={{ color: palette.heading }}>
                      <Users className="h-3.5 w-3.5 flex-shrink-0 sm:h-4 sm:w-4" style={{ color: palette.accent }} />
                      <span>Number of Guests *</span>
                    </label>
                    <input
                      type="number"
                      name="Guest"
                      value={requestFormData.Guest}
                      onChange={(e) => setRequestFormData({ ...requestFormData, Guest: e.target.value })}
                      min="1"
                      required
                      placeholder="How many guests?"
                      className={modalInputClass}
                      style={modalInputStyle}
                    />
                  </div>

                  <div>
                    <label className={modalLabelClass} style={{ color: palette.heading }}>
                      <MessageSquare className="h-3.5 w-3.5 flex-shrink-0 sm:h-4 sm:w-4" style={{ color: palette.accent }} />
                      <span>Message</span>
                      <span className={`${sectionType.label} font-normal`} style={{ color: palette.body }}>
                        (Optional)
                      </span>
                    </label>
                    <textarea
                      name="Message"
                      value={requestFormData.Message}
                      onChange={(e) => setRequestFormData({ ...requestFormData, Message: e.target.value })}
                      placeholder="Share why you'd like to join..."
                      rows={3}
                      className={`${modalInputClass} resize-none`}
                      style={modalInputStyle}
                    />
                  </div>

                  <div className="pt-2 sm:pt-3">
                    <button
                      type="submit"
                      disabled={isLoading}
                      className={`${cinzel.className} flex w-full items-center justify-center gap-1.5 rounded-sm border py-2.5 ${sectionType.label} font-semibold uppercase tracking-[0.2em] shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md disabled:opacity-70 sm:gap-2 sm:py-3`}
                      style={buttonStyle}
                    >
                      {isLoading ? (
                        <>
                          <RefreshCw className="h-3.5 w-3.5 sm:h-4 sm:w-4 animate-spin" />
                          <span className="text-xs sm:text-sm">Submitting...</span>
                        </>
                      ) : (
                        <>
                          <UserPlus className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                          <span className="text-xs sm:text-sm">Send Request</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>

              {/* Enhanced Success Overlay */}
              {requestSuccess && (
                <div
                  className="absolute inset-0 z-50 flex items-center justify-center p-2 backdrop-blur-md animate-in fade-in duration-300 sm:p-3 md:p-4"
                  style={{ backgroundColor: `color-mix(in srgb, ${C.paper} 98%, white)` }}
                >
                  <div className="mx-auto max-w-sm p-3 text-center sm:p-4 md:p-5 lg:p-6">
                    <div className="relative mb-3 inline-flex items-center justify-center sm:mb-4">
                      <div
                        className="absolute inset-0 animate-ping rounded-full border-2"
                        style={{ borderColor: `color-mix(in srgb, ${C.gold} 30%, transparent)` }}
                      />
                      <div
                        className="absolute inset-0 rounded-full border-2"
                        style={{ borderColor: `color-mix(in srgb, ${C.gold} 40%, transparent)` }}
                      />
                      <div
                        className="relative flex h-12 w-12 items-center justify-center rounded-full shadow-xl sm:h-14 sm:w-14 md:h-16 md:w-16 lg:h-20 lg:w-20"
                        style={{ backgroundColor: C.navy }}
                      >
                        <CheckCircle className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 lg:h-10 lg:w-10" strokeWidth={2.5} style={{ color: C.paper }} />
                      </div>
                    </div>
                    
                    <h4 className={`mb-2 font-serif font-bold sm:mb-3 ${sectionType.subheader}`} style={{ color: palette.heading }}>
                      Request Sent!
                    </h4>
                    
                    <div className="mb-2 space-y-1 sm:mb-3 sm:space-y-1.5">
                      <p className={`font-medium ${sectionType.text}`} style={{ color: palette.body }}>
                        We've received your request
                      </p>
                      <p className={sectionType.label} style={{ color: palette.label }}>
                        We'll review it and get back to you soon
                      </p>
                    </div>
                    
                    <div className="mt-2 flex items-center justify-center gap-1 sm:mt-3 sm:gap-1.5">
                      <div className="h-0.5 w-0.5 rounded-full sm:h-1 sm:w-1" style={{ backgroundColor: C.gold }} />
                      <p className={sectionType.label} style={{ color: palette.label }}>
                        This will close automatically
                      </p>
                      <div className="h-0.5 w-0.5 rounded-full sm:h-1 sm:w-1" style={{ backgroundColor: C.gold }} />
                    </div>
                  </div>
                </div>
              )}

              {/* Error message */}
              {error && !requestSuccess && (
                <div className="px-2 sm:px-2.5 md:px-4 lg:px-6 xl:px-8 pb-2 sm:pb-2.5 md:pb-4 lg:pb-6">
                  <div className="bg-red-50 border-2 border-red-200 rounded-xl p-2 sm:p-2.5 md:p-3 lg:p-4">
                    <div className="flex items-center gap-1.5 sm:gap-2">
                      <AlertCircle className="h-3.5 w-3.5 sm:h-4 sm:w-4 md:h-5 md:w-5 text-red-600 flex-shrink-0" />
                      <span className={`text-red-600 font-semibold ${sectionType.text}`}>{error}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>,
        document.body
      )}

      {/* Floating Status Messages (outside modals) */}
      {success && !showModal && !showRequestModal && !requestSuccess && (
        <div className="fixed top-16 sm:top-20 left-1/2 transform -translate-x-1/2 z-50 max-w-md w-full mx-2 sm:mx-4">
          <div className="bg-green-50 border-2 border-green-200 rounded-xl p-2 sm:p-3 md:p-4 shadow-lg animate-in slide-in-from-top">
            <div className="flex items-center gap-1.5 sm:gap-2">
              <CheckCircle className="h-3.5 w-3.5 sm:h-4 sm:w-4 md:h-5 md:w-5 text-green-600" />
              <span className={`text-green-600 font-semibold ${sectionType.text}`}>{success}</span>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}