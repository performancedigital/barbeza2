import { useState, useCallback } from 'react'
import { LoadingScreen } from '@/components/landing/LoadingScreen'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { HeroSection } from '@/components/landing/HeroSection'
import { StatsBar } from '@/components/landing/StatsBar'
import { ServicesSection } from '@/components/landing/ServicesSection'
import { VideoSection } from '@/components/landing/VideoSection'
import { SpaceSection } from '@/components/landing/SpaceSection'
import { GallerySection } from '@/components/landing/GallerySection'
import { TestimonialsSection } from '@/components/landing/TestimonialsSection'
import { BookingSection } from '@/components/landing/BookingSection'
import { LocationSection } from '@/components/landing/LocationSection'
import { WhatsAppFloat } from '@/components/ui/WhatsAppFloat'
import { ScrollToTop } from '@/components/ui/ScrollToTop'
import { GoldDivider } from '@/components/ui/GoldDivider'

export function LandingPage() {
  const [loaded, setLoaded] = useState(false)
  const handleDone = useCallback(() => setLoaded(true), [])

  return (
    <>
      {!loaded && <LoadingScreen onDone={handleDone} />}

      <div style={{ opacity: loaded ? 1 : 0, transition: 'opacity 0.5s ease' }}>
        <Navbar />

        <main>
          <HeroSection />
          <StatsBar />
          <GoldDivider className="max-w-7xl mx-auto px-6" icon="diamond" />
          <ServicesSection />
          <GoldDivider className="max-w-7xl mx-auto px-6" icon="scissor" />
          <VideoSection />
          <SpaceSection />
          <GoldDivider className="max-w-7xl mx-auto px-6" icon="diamond" />
          <GallerySection />
          <GoldDivider className="max-w-7xl mx-auto px-6" icon="scissor" />
          <TestimonialsSection />
          <BookingSection />
          <LocationSection />
        </main>

        <Footer />
        <WhatsAppFloat />
        <ScrollToTop />
      </div>
    </>
  )
}
