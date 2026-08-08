import { AlertTriangle, ArrowRight, Search, ShieldCheck } from 'lucide-react'
import { Link } from 'react-router-dom'
import Floating, { FloatingElement } from '../ui/parallax-floating'
import SocraticDemo from './SocraticDemo'
import { useI18n } from '../../i18n/useI18n'

export default function Hero() {
  const { t } = useI18n()

  return (
    <section className="relative overflow-hidden">
      {/* Lớp nền trôi theo con trỏ (parallax) — trang trí, dùng đủ 3 màu palette
          cyan/blue/amber + icon chủ đề chống lừa đảo. */}
      <Floating
        sensitivity={0.6}
        className="pointer-events-none z-0"
        aria-hidden="true"
      >
        {/* Trên nền tối, blob mờ phải đậm hơn hẳn bản light mới thấy được.
            Đây là chỗ blue #0000FF phát huy đúng vai trò: mảng glow, không phải icon. */}
        <FloatingElement depth={0.5} className="left-[6%] top-[16%]">
          <div className="h-28 w-28 rounded-full bg-[var(--color-primary)]/25 blur-3xl" />
        </FloatingElement>
        <FloatingElement depth={1} className="left-[80%] top-[10%]">
          <div className="h-28 w-28 rounded-full bg-[var(--color-highlight)]/25 blur-3xl" />
        </FloatingElement>
        <FloatingElement depth={1.5} className="left-[68%] top-[74%]">
          <div className="h-32 w-32 rounded-full bg-[var(--color-accent)]/50 blur-3xl" />
        </FloatingElement>

        <FloatingElement depth={1.2} className="left-[9%] top-[66%]">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-border bg-card text-[var(--color-primary)] shadow-sm">
            <ShieldCheck className="h-5 w-5" aria-hidden="true" />
          </div>
        </FloatingElement>
        <FloatingElement depth={2} className="left-[88%] top-[50%]">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-border bg-card text-[var(--color-highlight)] shadow-sm">
            <AlertTriangle className="h-5 w-5" aria-hidden="true" />
          </div>
        </FloatingElement>
        <FloatingElement depth={0.8} className="left-[46%] top-[4%]">
          {/* KHÔNG dùng --color-accent (blue) cho icon: blue trên nền card chỉ
              ~2:1, gần như tàng hình. Icon dùng họ cyan. */}
          <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-card text-[var(--color-secondary)] shadow-sm">
            <Search className="h-4 w-4" aria-hidden="true" />
          </div>
        </FloatingElement>
      </Floating>

      <div className="relative z-10 mx-auto grid max-w-6xl gap-12 px-4 py-16 sm:px-6 md:grid-cols-2 md:items-center md:py-24">
        <div>
          <p className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-muted-foreground">
            {t.hero.badge}
          </p>

          <h1 className="mt-5 text-4xl font-semibold leading-[1.1] tracking-tight text-foreground sm:text-5xl">
            {t.hero.headlineA}
            <br />
            <span className="text-primary">{t.hero.headlineB}</span>
          </h1>

          <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted-foreground">
            {t.hero.intro}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link
              to="/phan-tich"
              className="inline-flex h-12 items-center gap-2 rounded-xl bg-primary px-6 text-base font-semibold text-primary-foreground transition-all hover:-translate-y-0.5 hover:opacity-90"
            >
              {t.hero.ctaPrimary}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <a
              href="#cach-hoat-dong"
              className="inline-flex h-12 items-center rounded-xl px-6 text-base font-semibold text-foreground underline-offset-4 hover:underline"
            >
              {t.hero.ctaSecondary}
            </a>
          </div>

          <p className="mt-6 flex items-start gap-2 text-sm text-muted-foreground">
            <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-secondary" aria-hidden="true" />
            {t.hero.disclaimer}
          </p>
        </div>

        <SocraticDemo />
      </div>
    </section>
  )
}
