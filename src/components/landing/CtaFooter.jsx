import { ArrowRight, Plus } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Button } from '../ui/button'

export default function CtaFooter() {
  return (
    <>
      {/* CTA — 21st.dev @sshahaider/cta-3, re-theme token + Việt hoá + nối route. */}
      <section className="px-4 py-20 sm:px-6">
        <div
          className="relative mx-auto flex w-full max-w-3xl flex-col justify-between gap-y-6 border-y border-border px-6 py-10"
          style={{
            backgroundImage:
              'radial-gradient(35% 80% at 25% 0%, color-mix(in srgb, var(--color-primary) 12%, transparent), transparent)',
          }}
        >
          <Plus
            className="absolute top-[-12.5px] left-[-11.5px] z-[1] size-6 text-primary/70"
            strokeWidth={1}
            aria-hidden="true"
          />
          <Plus
            className="absolute top-[-12.5px] right-[-11.5px] z-[1] size-6 text-primary/70"
            strokeWidth={1}
            aria-hidden="true"
          />
          <Plus
            className="absolute bottom-[-12.5px] left-[-11.5px] z-[1] size-6 text-primary/70"
            strokeWidth={1}
            aria-hidden="true"
          />
          <Plus
            className="absolute right-[-11.5px] bottom-[-12.5px] z-[1] size-6 text-primary/70"
            strokeWidth={1}
            aria-hidden="true"
          />

          <div className="pointer-events-none absolute -inset-y-6 left-0 w-px border-l border-border" />
          <div className="pointer-events-none absolute -inset-y-6 right-0 w-px border-r border-border" />
          <div className="absolute top-0 left-1/2 -z-10 h-full border-l border-dashed border-border" />

          <div className="space-y-2">
            <h2 className="text-center text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              Sẵn sàng tự đánh giá một tin đáng ngờ?
            </h2>
            <p className="text-center leading-relaxed text-muted-foreground">
              Không cần tài khoản. Chọn một tình huống và bắt đầu phân tích ngay.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <Button variant="outline" className="h-11" asChild>
              <a href="#cach-hoat-dong">Cách hoạt động</a>
            </Button>
            <Button className="h-11" asChild>
              <Link to="/phan-tich">
                Phân tích ngay
                <ArrowRight className="ml-1 size-4" aria-hidden="true" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <footer className="border-t border-border py-10">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-3 px-4 text-center text-sm text-muted-foreground sm:px-6">
          <p>© {new Date().getFullYear()} AskWise. Một dự án học tập, không liên kết với Socrates lịch sử.</p>
          <p>Nội dung do AI tạo ra có thể chưa chính xác — luôn đối chiếu với giáo viên hoặc tài liệu chính thống.</p>
        </div>
      </footer>
    </>
  )
}
