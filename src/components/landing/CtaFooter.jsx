import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function CtaFooter() {
  return (
    <>
      <section className="border-t border-border bg-primary py-16">
        <div className="mx-auto flex max-w-4xl flex-col items-center gap-6 px-4 text-center sm:px-6">
          <h2 className="text-3xl font-semibold tracking-tight text-primary-foreground sm:text-4xl">
            Sẵn sàng tự tìm ra câu trả lời?
          </h2>
          <p className="max-w-xl text-lg leading-relaxed text-primary-foreground/85">
            Không cần tài khoản. Đặt câu hỏi đầu tiên ngay bây giờ.
          </p>
          <Link
            to="/phan-tich"
            className="inline-flex h-12 items-center gap-2 rounded-xl bg-card px-6 text-base font-semibold text-foreground transition-transform hover:-translate-y-0.5"
          >
            Thử ngay, miễn phí
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </section>

      <footer className="border-t border-border py-10">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-3 px-4 text-center text-sm text-muted-foreground sm:px-6">
          <p>© {new Date().getFullYear()} Socratic. Một dự án học tập, không liên kết với Socrates lịch sử.</p>
          <p>Nội dung do AI tạo ra có thể chưa chính xác — luôn đối chiếu với giáo viên hoặc tài liệu chính thống.</p>
        </div>
      </footer>
    </>
  )
}
