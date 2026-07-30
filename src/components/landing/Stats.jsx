import { CountUp } from '../ui/count-up'

const STATS = [
  { to: 128000, suffix: '+', label: 'Câu hỏi dẫn dắt đã đặt ra' },
  { to: 6, suffix: '', label: 'Dạng lừa đảo đã phân tích' },
  { to: 92, suffix: '%', label: 'Người dùng thấy tự tin hơn sau khi thử' },
]

export default function Stats() {
  return (
    <section className="border-t border-border bg-muted/40 py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <p className="inline-flex items-center rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-muted-foreground">
          Dữ liệu minh hoạ — sẽ cập nhật số liệu thật khi ra mắt
        </p>

        <div className="mt-8 grid gap-8 sm:grid-cols-3">
          {STATS.map((stat) => (
            <div key={stat.label}>
              <p className="text-4xl font-semibold tracking-tight text-primary sm:text-5xl">
                <span aria-hidden="true">
                  <CountUp to={stat.to} duration={1.6} />
                  {stat.suffix}
                </span>
                <span className="sr-only">
                  {stat.to.toLocaleString('vi-VN')}
                  {stat.suffix}
                </span>
              </p>
              <p className="mt-2 text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
