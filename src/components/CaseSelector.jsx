import {
  Briefcase,
  Building2,
  ClipboardList,
  Plane,
  Smartphone,
  UserRoundSearch,
} from 'lucide-react'
import { SpotlightCard } from './ui/spotlight-card'

// Map tên icon trong data → component Lucide (SVG, không dùng emoji).
const ICONS = {
  Briefcase,
  Building2,
  Smartphone,
  ClipboardList,
  Plane,
  UserRoundSearch,
}

// Spotlight cyan theo token --color-primary #00FFFF (không dùng màu mặc định).
const SPOTLIGHT_TEAL = 'rgba(0, 255, 255, 0.18)'

export default function CaseSelector({ scenarios, onSelect }) {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-8 px-4 py-10 sm:px-6">
      <header className="flex flex-col gap-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
          Chọn một tình huống để luyện tập
        </h1>
        <p className="mx-auto max-w-xl text-base leading-relaxed text-muted-foreground">
          Mỗi tình huống là một tin đăng đáng ngờ có thật ngoài đời. Chọn một tin,
          rồi cùng đi qua 6 câu hỏi để tự đánh giá độ tin cậy.
        </p>
      </header>

      <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {scenarios.map((scenario) => {
          const Icon = ICONS[scenario.icon] ?? Briefcase
          return (
            <li key={scenario.id}>
              <SpotlightCard
                className="h-full transition-colors duration-200 hover:border-primary"
                spotlightColor={SPOTLIGHT_TEAL}
              >
                <button
                  type="button"
                  onClick={() => onSelect(scenario)}
                  className="flex h-full w-full flex-col items-start gap-3 rounded-2xl p-5 text-left transition-transform duration-150 ease-out focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring active:scale-[0.98] motion-reduce:transition-none motion-reduce:active:scale-100"
                >
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-muted text-primary">
                    <Icon className="h-6 w-6" aria-hidden="true" strokeWidth={1.75} />
                  </span>
                  <h2 className="text-lg font-semibold text-foreground">
                    {scenario.title}
                  </h2>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {scenario.summary}
                  </p>
                  <span className="mt-auto pt-2 text-sm font-semibold text-primary">
                    Bắt đầu phân tích →
                  </span>
                </button>
              </SpotlightCard>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
