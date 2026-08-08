import CtaFooter from '../components/landing/CtaFooter'
import Features from '../components/landing/Features'
import Hero from '../components/landing/Hero'
import HowItWorks from '../components/landing/HowItWorks'
import Navbar from '../components/landing/Navbar'
import Stats from '../components/landing/Stats'
import Testimonials from '../components/landing/Testimonials'
import WhySocratic from '../components/landing/WhySocratic'

// KHÔNG đặt bg-background ở wrapper: lớp aurora (body::before trong index.css)
// là `fixed` nằm sau nội dung, một nền đục ở đây sẽ che sạch nó.
// Màu nền cơ sở đã có sẵn trên <body>.
export default function Landing() {
  return (
    <div className="flex min-h-dvh flex-col text-foreground">
      <Navbar />
      <main>
        <Hero />
        <WhySocratic />
        <HowItWorks />
        <Features />
        <Stats />
        <Testimonials />
      </main>
      <CtaFooter />
    </div>
  )
}
