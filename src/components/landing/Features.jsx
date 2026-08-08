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
import { useI18n } from '../../i18n/useI18n'

// Nguồn: 21st.dev @manuarora700/feature-section-with-hover-effects — chuyển JSX,
// đổi @tabler → lucide, bỏ dark:, re-theme token, và viết lại nội dung chống lừa đảo.
// Lưu component chứ không lưu element: mảng element JSX bị lint bắt thiếu `key`,
// và element dựng sẵn ở module scope thì không nhận được prop về sau.
const ICONS = [
  MessageCircleQuestion,
  ListChecks,
  Briefcase,
  BadgeCheck,
  Lock,
  AlertTriangle,
  Search,
  Globe,
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
  const { t } = useI18n()
  const FEATURES = t.features.items.map((f, i) => {
    const Icon = ICONS[i]
    return { ...f, icon: <Icon /> }
  })

  return (
    <section className="border-t border-border bg-muted/30 py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            {t.features.title}
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            {t.features.intro}
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
