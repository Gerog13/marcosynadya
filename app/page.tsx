"use client"
import { useState } from "react"
import { HeroSection } from "@/components/hero-section"
import { CountdownSection } from "@/components/countdown-section"
import { EventDetailsSection } from "@/components/event-details-section"
import { GiftsSection } from "@/components/gifts-section"
import { RSVPSection } from "@/components/rsvp-section"
import { EnvelopeAnimation } from "@/components/envelope-animation"
import { MusicPlayer } from "@/components/music-player"
import { FooterSection } from "@/components/footer-section"

export default function WeddingLandingPage() {
  const [showEnvelope, setShowEnvelope] = useState(true)
  const [showMusicPlayer, setShowMusicPlayer] = useState(false)
  const [heroRevealed, setHeroRevealed] = useState(false)

  const handleEnvelopeComplete = () => {
    setShowEnvelope(false)
    setShowMusicPlayer(true)
  }

  const handleHeroReveal = () => {
    setHeroRevealed(true)
  }

  return (
    <>
      {showEnvelope && <EnvelopeAnimation onComplete={handleEnvelopeComplete} onHeroReveal={handleHeroReveal} />}
      <main className="min-h-screen">
        <HeroSection heroRevealed={heroRevealed} />
        <CountdownSection />
        <EventDetailsSection />
        <GiftsSection />
        <RSVPSection />
        <FooterSection />
      </main>
      
      {/* Music Player - visible after envelope is closed */}
      <MusicPlayer isVisible={showMusicPlayer} />
    </>
  )
}
