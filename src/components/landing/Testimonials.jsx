import { Quote } from 'lucide-react'
import { AnimatedTooltip } from '../ui/animated-tooltip'
import { SpotlightCard } from '../ui/spotlight-card'
import { useI18n } from '../../i18n/useI18n'
import avatar1 from '@/assets/testimonials/avatar-1.jpg'
import avatar2 from '@/assets/testimonials/avatar-2.jpg'
import avatar3 from '@/assets/testimonials/avatar-3.jpg'
import avatar4 from '@/assets/testimonials/avatar-4.jpg'

// Nhóm phát triển — mặt thật đi với danh tính thật. Rê chuột hiện tên + vai trò.
// KHÔNG dùng hàng avatar này làm "người dùng khen sản phẩm": các trích dẫn bên
// dưới là nội dung minh hoạ, gắn mặt thật vào đó là dựng social proof giả.
const TEAM = [
  {
    id: 1,
    name: 'Ngọc',
    designation: 'AI Engineering & System Integration',
    image: avatar1,
  },
  {
    id: 2,
    name: 'Huyền Anh',
    designation: 'Content & Video Production',
    image: avatar2,
  },
  {
    id: 3,
    name: 'Khoa',
    designation: 'Research & Content',
    image: avatar3,
  },
  {
    id: 4,
    name: 'Thắng',
    designation: 'UI/UX Design & Product Development',
    image: avatar4,
  },
]

export default function Testimonials() {
  const { t } = useI18n()
  const TESTIMONIALS = t.testimonials.quotes.map((q) => ({
    ...q,
    name: t.testimonials.illustrative,
  }))

  return (
    <section id="niem-tin" className="py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            {t.testimonials.title}
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            {t.testimonials.intro}
          </p>

          <div className="mt-6 flex items-center gap-4">
            <AnimatedTooltip items={TEAM} />
            <span className="text-sm text-muted-foreground">
              {t.testimonials.teamLabel}
            </span>
          </div>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {/* Tham số đặt tên `item`, KHÔNG phải `t` — `t` là từ điển i18n,
              trùng tên là che mất nó trong toàn bộ block này. */}
          {TESTIMONIALS.map((item) => (
            <SpotlightCard
              key={item.quote}
              spotlightColor="rgba(0, 255, 255, 0.14)"
              className="flex h-full flex-col gap-4 p-6"
            >
              <Quote className="h-5 w-5 text-secondary" aria-hidden="true" />
              <p className="leading-relaxed text-foreground">{item.quote}</p>
              <div className="mt-auto text-sm">
                <p className="font-medium text-foreground">{item.name}</p>
                <p className="text-muted-foreground">{item.role}</p>
              </div>
            </SpotlightCard>
          ))}
        </div>
      </div>
    </section>
  )
}
