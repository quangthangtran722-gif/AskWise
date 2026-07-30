import { AlertTriangle, ArrowRight, Search, ShieldCheck } from 'lucide-react'
import { Link } from 'react-router-dom'
import Floating, { FloatingElement } from '../ui/parallax-floating'
import SocraticDemo from './SocraticDemo'

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* Lớp nền trôi theo con trỏ (parallax) — trang trí, dùng đủ 3 màu palette
          teal/cam/amber + icon chủ đề chống lừa đảo. */}
      <Floating
        sensitivity={0.6}
        className="pointer-events-none z-0"
        aria-hidden="true"
      >
        <FloatingElement depth={0.5} className="left-[6%] top-[16%]">
          <div className="h-24 w-24 rounded-full bg-[var(--color-primary)]/15 blur-2xl" />
        </FloatingElement>
        <FloatingElement depth={1} className="left-[80%] top-[10%]">
          <div className="h-28 w-28 rounded-full bg-[var(--color-highlight)]/25 blur-2xl" />
        </FloatingElement>
        <FloatingElement depth={1.5} className="left-[68%] top-[74%]">
          <div className="h-20 w-20 rounded-full bg-[var(--color-accent)]/15 blur-2xl" />
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
          <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-card text-[var(--color-accent)] shadow-sm">
            <Search className="h-4 w-4" aria-hidden="true" />
          </div>
        </FloatingElement>
      </Floating>

      <div className="relative z-10 mx-auto grid max-w-6xl gap-12 px-4 py-16 sm:px-6 md:grid-cols-2 md:items-center md:py-24">
        <div>
          <p className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-muted-foreground">
            Phương pháp Socrates · rèn kỹ năng tự nhận diện lừa đảo
          </p>

          <h1 className="mt-5 text-4xl font-semibold leading-[1.1] tracking-tight text-foreground sm:text-5xl">
            Không kết luận đây có phải lừa đảo.
            <br />
            <span className="text-primary">Đặt câu hỏi</span> để bạn tự nhận ra.
          </h1>

          <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted-foreground">
            AskWise là AI đồng hành giúp bạn tự đánh giá độ tin cậy của một tin tuyển dụng
            đáng ngờ: thay vì nói thẳng đây có phải lừa đảo hay không, AI đặt câu hỏi dẫn dắt
            từng bước để bạn tự nhận ra dấu hiệu bất thường — và nhớ lâu hơn nhiều so với việc
            chỉ được cảnh báo suông.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link
              to="/phan-tich"
              className="inline-flex h-12 items-center gap-2 rounded-xl bg-primary px-6 text-base font-semibold text-primary-foreground transition-all hover:-translate-y-0.5 hover:opacity-90"
            >
              Thử ngay — miễn phí
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <a
              href="#cach-hoat-dong"
              className="inline-flex h-12 items-center rounded-xl px-6 text-base font-semibold text-foreground underline-offset-4 hover:underline"
            >
              Xem cách hoạt động
            </a>
          </div>

          <p className="mt-6 flex items-start gap-2 text-sm text-muted-foreground">
            <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-secondary" aria-hidden="true" />
            Được vận hành bởi AI và có thể trả lời chưa chính xác hoàn toàn — hãy tự mình kiểm
            chứng, đừng để ai bảo bạn phải tin điều gì.
          </p>
        </div>

        <SocraticDemo />
      </div>
    </section>
  )
}
