import { Compass, Lightbulb, MessageSquarePlus } from 'lucide-react'
import { SpotlightCard } from '../ui/spotlight-card'

const STEPS = [
  {
    icon: MessageSquarePlus,
    title: '1. Đặt câu hỏi hoặc dán bài tập',
    desc: 'Gõ câu hỏi hoặc dán đề bài bạn đang mắc kẹt — không cần tài khoản.',
  },
  {
    icon: Compass,
    title: '2. AI dẫn dắt từng bước',
    desc: 'Thay vì đưa đáp án, Socratic hỏi ngược để lộ ra chỗ bạn đang hiểu sai hoặc thiếu dữ kiện.',
  },
  {
    icon: Lightbulb,
    title: '3. Bạn tự rút ra kết luận',
    desc: 'Khi tự tìm ra câu trả lời, kiến thức sẽ ở lại lâu hơn nhiều so với việc đọc lời giải có sẵn.',
  },
]

export default function HowItWorks() {
  return (
    <section id="cach-hoat-dong" className="py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Cách hoạt động
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            Ba bước đơn giản, bắt đầu ngay từ lượt hỏi đầu tiên.
          </p>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {STEPS.map(({ icon: Icon, title, desc }) => (
            <SpotlightCard key={title} spotlightColor="rgba(13, 148, 136, 0.16)" className="p-6">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Icon className="h-5 w-5" aria-hidden="true" />
              </div>
              <h3 className="mt-5 text-lg font-semibold text-foreground">{title}</h3>
              <p className="mt-2 leading-relaxed text-muted-foreground">{desc}</p>
            </SpotlightCard>
          ))}
        </div>
      </div>
    </section>
  )
}
