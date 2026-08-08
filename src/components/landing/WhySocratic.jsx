import { Check, X } from 'lucide-react'
import { useI18n } from '../../i18n/useI18n'

export default function WhySocratic() {
  const { t } = useI18n()
  const ROWS = t.why.rows

  return (
    <section className="border-t border-border bg-muted/40 py-20">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            {t.why.title}
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            {t.why.intro}
          </p>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-border bg-card p-6">
            <p className="mb-4 text-sm font-semibold tracking-wide text-muted-foreground uppercase">
              {t.why.oldLabel}
            </p>
            <ul className="space-y-4">
              {ROWS.map((row) => (
                <li key={row.old} className="flex items-start gap-3 text-foreground/80">
                  <X className="mt-0.5 h-5 w-5 shrink-0 text-destructive" aria-hidden="true" />
                  <span>{row.old}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-primary/30 bg-card p-6 ring-1 ring-primary/10">
            <p className="mb-4 text-sm font-semibold tracking-wide text-primary uppercase">
              {t.why.newLabel}
            </p>
            <ul className="space-y-4">
              {ROWS.map((row) => (
                <li key={row.next} className="flex items-start gap-3 text-foreground">
                  <Check className="mt-0.5 h-5 w-5 shrink-0 text-secondary" aria-hidden="true" />
                  <span>{row.next}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
