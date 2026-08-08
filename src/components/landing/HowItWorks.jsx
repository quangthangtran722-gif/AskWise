import { Compass, Lightbulb, MessageSquarePlus } from 'lucide-react'
import { TiltCard } from '../ui/tilt-card'
import { useI18n } from '../../i18n/useI18n'

const ICONS = [MessageSquarePlus, Compass, Lightbulb]

export default function HowItWorks() {
  const { t } = useI18n()
  const STEPS = t.how.steps.map((s, i) => ({ ...s, icon: ICONS[i] }))

  return (
    <section id="cach-hoat-dong" className="py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            {t.how.title}
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            {t.how.intro}
          </p>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {STEPS.map(({ icon: Icon, title, desc }) => (
            <TiltCard
              key={title}
              tiltLimit={8}
              scale={1.03}
              className="rounded-2xl border border-border bg-card p-6"
            >
              <div className="relative z-20">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </div>
                <h3 className="mt-5 text-lg font-semibold text-foreground">
                  {title}
                </h3>
                <p className="mt-2 leading-relaxed text-muted-foreground">
                  {desc}
                </p>
              </div>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  )
}
