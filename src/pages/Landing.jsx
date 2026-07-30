import CtaFooter from '../components/landing/CtaFooter'
import Hero from '../components/landing/Hero'
import HowItWorks from '../components/landing/HowItWorks'
import Navbar from '../components/landing/Navbar'
import Stats from '../components/landing/Stats'
import Testimonials from '../components/landing/Testimonials'
import WhySocratic from '../components/landing/WhySocratic'

export default function Landing() {
  return (
    <div className="flex min-h-dvh flex-col bg-background text-foreground">
      <Navbar />
      <main>
        <Hero />
        <WhySocratic />
        <HowItWorks />
        <Stats />
        <Testimonials />
      </main>
      <CtaFooter />
    </div>
  )
}
