import { ShieldCheck } from 'lucide-react'
import { useI18n } from '../../i18n/useI18n'

// Nguồn: 21st.dev @uilayout.contact/stats-bold — re-theme token, bỏ ảnh remote,
// viết lại số liệu về sản phẩm. Số liệu là minh hoạ (xem badge).
export default function Stats() {
  const { t } = useI18n()
  const SUB_STATS = t.stats.subs.map((label, i) => ({
    label,
    value: t.stats.subValues[i],
  }))

  return (
    <section className="flex flex-col justify-center border-t border-border bg-background">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-14 px-4 py-20 sm:px-6">
        <p className="inline-flex w-fit items-center rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-muted-foreground">
          {t.stats.badge}
        </p>

        <div className="items-center justify-between gap-8 border-b border-border pb-8 md:flex">
          <div className="flex flex-col items-baseline gap-4 md:flex-row">
            <span className="shrink-0 text-7xl font-medium tracking-tighter text-primary sm:text-8xl lg:text-9xl">
              128K+
            </span>
            <div className="max-w-xs">
              <h3 className="text-xl font-semibold tracking-tight text-foreground">
                {t.stats.bigTitle}
              </h3>
              <p className="text-pretty text-sm text-muted-foreground">
                {t.stats.bigDesc}
              </p>
            </div>
          </div>

          <div
            className="mt-6 flex h-52 w-full shrink-0 flex-col items-center justify-center gap-3 rounded-lg border border-border sm:w-96 md:mt-0"
            style={{
              backgroundColor:
                'color-mix(in srgb, var(--color-primary) 8%, transparent)',
            }}
          >
            <ShieldCheck className="h-12 w-12 text-primary" aria-hidden="true" />
            <p className="px-6 text-center text-sm font-medium text-foreground">
              {t.stats.panel}
            </p>
          </div>
        </div>

        <div className="flex justify-between gap-5">
          {SUB_STATS.map((stat) => (
            <div key={stat.label}>
              <p className="mb-2 text-4xl font-medium tracking-tighter text-foreground md:text-5xl">
                {stat.value}
              </p>
              <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
