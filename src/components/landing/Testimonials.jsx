import { Quote } from 'lucide-react'
import { SpotlightCard } from '../ui/spotlight-card'

const TESTIMONIALS = [
  {
    quote:
      'Lúc đầu hơi khó chịu vì AI không cho đáp án ngay, nhưng sau vài câu hỏi em tự hiểu ra — nhớ lâu hơn hẳn so với việc chép lời giải.',
    name: 'Ví dụ minh hoạ',
    role: 'Sinh viên năm 2',
  },
  {
    quote:
      'Con mình dùng để ôn Toán, mình thích cách nó buộc con phải giải thích lại bằng lời của mình.',
    name: 'Ví dụ minh hoạ',
    role: 'Phụ huynh',
  },
  {
    quote:
      'Phù hợp để gợi ý câu hỏi thảo luận trên lớp, không thay thế giáo viên mà hỗ trợ đúng lúc mình phân vân nhất.',
    name: 'Ví dụ minh hoạ',
    role: 'Giáo viên THPT',
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
            Socratic dựa trên phương pháp giảng dạy có căn cứ sư phạm lâu đời, không phải một
            chiêu trò AI. Sản phẩm còn mới nên các trích dẫn dưới đây là ví dụ minh hoạ cho trải
            nghiệm dự kiến, sẽ được thay bằng phản hồi thật sau khi ra mắt.
          </p>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {TESTIMONIALS.map((t) => (
            <SpotlightCard
              key={t.quote}
              spotlightColor="rgba(45, 212, 191, 0.16)"
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
