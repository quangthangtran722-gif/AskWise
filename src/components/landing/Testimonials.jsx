import { Quote } from 'lucide-react'
import { AnimatedTooltip } from '../ui/animated-tooltip'
import { SpotlightCard } from '../ui/spotlight-card'
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

const TESTIMONIALS = [
  {
    quote:
      'Lúc đầu hơi khó chịu vì AI không phán thẳng là lừa đảo, nhưng qua vài câu hỏi mình tự thấy các dấu hiệu — giờ đọc tin tuyển dụng cảnh giác hơn hẳn.',
    name: 'Ví dụ minh hoạ',
    role: 'Sinh viên năm 2',
  },
  {
    quote:
      'Mình từng suýt đặt cọc một "việc nhẹ lương cao". Thử phân tích ở đây mới nhận ra mấy cờ đỏ mình đã bỏ qua.',
    name: 'Ví dụ minh hoạ',
    role: 'Người tìm việc',
  },
  {
    quote:
      'Mình cho người nhà lớn tuổi dùng thử để tập cảnh giác với tin nhắn lạ — cách đặt câu hỏi khiến họ tự suy nghĩ thay vì nghe theo.',
    name: 'Ví dụ minh hoạ',
    role: 'Nhân viên văn phòng',
  },
]

export default function Testimonials() {
  return (
    <section id="niem-tin" className="py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Vì sao có thể tin tưởng
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            Sản phẩm còn mới nên các trích dẫn dưới đây là ví dụ minh hoạ cho
            trải nghiệm dự kiến — sẽ thay bằng phản hồi thật sau khi ra mắt.
          </p>

          <div className="mt-6 flex items-center gap-4">
            <AnimatedTooltip items={TEAM} />
            <span className="text-sm text-muted-foreground">
              Nhóm làm AskWise — rê chuột để xem từng người
            </span>
          </div>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {TESTIMONIALS.map((t) => (
            <SpotlightCard
              key={t.quote}
              spotlightColor="rgba(0, 255, 255, 0.14)"
              className="flex h-full flex-col gap-4 p-6"
            >
              <Quote className="h-5 w-5 text-secondary" aria-hidden="true" />
              <p className="leading-relaxed text-foreground">{t.quote}</p>
              <div className="mt-auto text-sm">
                <p className="font-medium text-foreground">{t.name}</p>
                <p className="text-muted-foreground">{t.role}</p>
              </div>
            </SpotlightCard>
          ))}
        </div>
      </div>
    </section>
  )
}
