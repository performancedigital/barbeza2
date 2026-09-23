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
import { useContent } from '@/context/ContentContext'

export function LandingPage() {
  const [loaded, setLoaded] = useState(false)
  const handleDone = useCallback(() => setLoaded(true), [])
  const { content } = useContent()
  const { sections } = content

  return (
    <>
      {!loaded && <LoadingScreen onDone={handleDone} />}

      <div style={{ opacity: loaded ? 1 : 0, transition: 'opacity 0.5s ease' }}>
        <Navbar />

        <main>
          <HeroSection />
          {sections.stats !== false && <StatsBar />}
          <GoldDivider className="max-w-7xl mx-auto px-6" icon="diamond" />
          {sections.services !== false && <ServicesSection />}
          <GoldDivider className="max-w-7xl mx-auto px-6" icon="scissor" />
          {sections.video !== false && <VideoSection />}
          {sections.space !== false && <SpaceSection />}
          <GoldDivider className="max-w-7xl mx-auto px-6" icon="diamond" />
          {sections.gallery !== false && <GallerySection />}
          <GoldDivider className="max-w-7xl mx-auto px-6" icon="scissor" />
          {sections.testimonials !== false && <TestimonialsSection />}
          {sections.booking !== false && <BookingSection />}
          {sections.location !== false && <LocationSection />}
        </main>

        <Footer />
        <WhatsAppFloat />
        <ScrollToTop />
      </div>
    </>
  )
}
