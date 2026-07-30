import {
  AlertTriangle,
  BadgeCheck,
  Briefcase,
  Globe,
  ListChecks,
  Lock,
  MessageCircleQuestion,
  Search,
} from 'lucide-react'
import { cn } from '@/lib/utils'

// Nguồn: 21st.dev @manuarora700/feature-section-with-hover-effects — chuyển JSX,
// đổi @tabler → lucide, bỏ dark:, re-theme token, và viết lại nội dung chống lừa đảo.
const FEATURES = [
  {
    title: 'Không cho đáp án sẵn',
    description:
      'AI không phán thay — bạn tự suy luận nên nhớ lâu và tự tin hơn.',
    icon: <MessageCircleQuestion />,
  },
  {
    title: 'Dẫn dắt 6 bước',
    description:
      'Sáu câu hỏi ngắn đưa bạn đi từ trực giác đến kết luận có cơ sở.',
    icon: <ListChecks />,
  },
  {
    title: 'Bám tình huống thật',
    description:
      'Sáu dạng tin tuyển dụng lừa đảo phổ biến ngoài đời để luyện tập.',
    icon: <Briefcase />,
  },
  {
    title: 'Miễn phí, không cần tài khoản',
    description: 'Vào là dùng ngay, không đăng ký, không rào cản.',
    icon: <BadgeCheck />,
  },
  {
    title: 'Không thu thập dữ liệu',
    description:
      'Bạn tự mang thông tin vào phân tích; không lưu hồ sơ cá nhân.',
    icon: <Lock />,
  },
  {
    title: 'Nhận diện dấu hiệu bất thường',
    description:
      'Học cách bắt các cờ đỏ: lương cao bất thường, hối thúc, phí đặt cọc.',
    icon: <AlertTriangle />,
  },
  {
    title: 'Kiểm chứng nguồn tin',
    description:
      'Rèn thói quen đối chiếu qua kênh chính thống trước khi tin.',
    icon: <Search />,
  },
  {
    title: 'Áp dụng cho mọi thông tin',
    description:
      'Kỹ năng không chỉ cho tin tuyển dụng — mà mọi thứ cần thẩm định.',
    icon: <Globe />,
  },
]

function Feature({ title, description, icon, index }) {
  return (
    <div
      className={cn(
        'group/feature relative flex flex-col py-10 lg:border-r lg:border-border/50',
        (index === 0 || index === 4) && 'lg:border-l lg:border-border/50',
        index < 4 && 'lg:border-b lg:border-border/50',
      )}
    >
      {index < 4 && (
        <div className="pointer-events-none absolute inset-0 h-full w-full bg-gradient-to-t from-muted to-transparent opacity-0 transition duration-200 group-hover/feature:opacity-100" />
      )}
      {index >= 4 && (
        <div className="pointer-events-none absolute inset-0 h-full w-full bg-gradient-to-b from-muted to-transparent opacity-0 transition duration-200 group-hover/feature:opacity-100" />
      )}
      <div className="relative z-10 mb-4 px-10 text-primary">{icon}</div>
      <div className="relative z-10 mb-2 px-10 text-lg font-bold">
        <div className="absolute inset-y-0 left-0 h-6 w-1 origin-center rounded-tr-full rounded-br-full bg-border transition-all duration-200 group-hover/feature:h-8 group-hover/feature:bg-primary" />
        <span className="inline-block text-foreground transition duration-200 group-hover/feature:translate-x-2">
          {title}
        </span>
      </div>
      <p className="relative z-10 max-w-xs px-10 text-sm text-muted-foreground">
        {description}
      </p>
    </div>
  )
}

export default function Features() {
  return (
    <section className="border-t border-border bg-muted/30 py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Vì sao AskWise hiệu quả
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            Không phải một công cụ tra cứu — mà là cách rèn cho bạn phản xạ tự
            thẩm định thông tin.
          </p>
        </div>

        <div className="relative z-10 mx-auto mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map((feature, index) => (
            <Feature key={feature.title} {...feature} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
