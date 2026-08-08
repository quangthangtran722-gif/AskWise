import { useEffect, useRef, useState } from 'react'
import { RotateCcw } from 'lucide-react'
import { useI18n } from '../../i18n/useI18n'

const TYPE_MS = 24
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReduced(mq.matches)
    const onChange = (e) => setReduced(e.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])
  return reduced
}

export default function SocraticDemo() {
  const { t } = useI18n()
  const SCRIPT = t.demo.script
  const reducedMotion = usePrefersReducedMotion()
  const [shown, setShown] = useState([])
  const [thinking, setThinking] = useState(false)
  const [done, setDone] = useState(false)
  const [playToken, setPlayToken] = useState(0)
  const logRef = useRef(null)

  useEffect(() => {
    let cancelled = false

    async function play() {
      setShown([])
      setThinking(false)
      setDone(false)

      if (reducedMotion) {
        setShown(SCRIPT.map((m) => ({ ...m })))
        setDone(true)
        return
      }

      for (const msg of SCRIPT) {
        if (cancelled) return
        if (msg.role === 'ai') {
          setThinking(true)
          await sleep(600)
          if (cancelled) return
          setThinking(false)
          setShown((prev) => [...prev, { role: 'ai', text: '' }])
          for (let c = 1; c <= msg.text.length; c++) {
            if (cancelled) return
            await sleep(TYPE_MS)
            setShown((prev) => {
              const next = prev.slice()
              next[next.length - 1] = { role: 'ai', text: msg.text.slice(0, c) }
              return next
            })
          }
          await sleep(500)
        } else {
          await sleep(350)
          if (cancelled) return
          setShown((prev) => [...prev, { role: 'user', text: msg.text }])
          await sleep(850)
        }
      }
      if (!cancelled) setDone(true)
    }

    play()
    return () => {
      cancelled = true
    }
  }, [reducedMotion, playToken, SCRIPT])

  useEffect(() => {
    logRef.current?.scrollTo({
      top: logRef.current.scrollHeight,
      behavior: reducedMotion ? 'auto' : 'smooth',
    })
  }, [shown, thinking, reducedMotion])

  return (
    <div className="relative mx-auto w-full max-w-md">
      <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-[0_20px_60px_-20px_rgba(0,255,255,0.25)]">
        <div className="flex items-center justify-between border-b border-border px-4 py-3">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2.5 w-2.5">
              <span
                className={`absolute inline-flex h-full w-full rounded-full bg-secondary transition-opacity ${
                  thinking ? 'animate-ping opacity-75' : 'opacity-0'
                }`}
              />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-secondary" />
            </span>
            <span className="text-sm font-medium text-foreground">
              {t.demo.header}
            </span>
          </div>
          <button
            type="button"
            onClick={() => setPlayToken((t) => t + 1)}
            disabled={!done && !reducedMotion}
            aria-label={t.demo.replay}
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground disabled:cursor-not-allowed disabled:opacity-40"
          >
            <RotateCcw className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>

        <div
          ref={logRef}
          aria-hidden="true"
          className="flex h-80 flex-col gap-3 overflow-y-auto px-4 py-4"
        >
          {shown.map((m, i) => (
            <div
              key={i}
              className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
                m.role === 'ai'
                  ? 'self-start rounded-bl-sm bg-muted text-foreground'
                  : 'self-end rounded-br-sm bg-primary text-primary-foreground'
              }`}
            >
              {m.text}
            </div>
          ))}
          {thinking && (
            <div className="flex w-fit items-center gap-1 self-start rounded-2xl rounded-bl-sm bg-muted px-3.5 py-3">
              <span className="typing-dot h-1.5 w-1.5 rounded-full bg-muted-foreground" />
              <span
                className="typing-dot h-1.5 w-1.5 rounded-full bg-muted-foreground"
                style={{ animationDelay: '0.15s' }}
              />
              <span
                className="typing-dot h-1.5 w-1.5 rounded-full bg-muted-foreground"
                style={{ animationDelay: '0.3s' }}
              />
            </div>
          )}
        </div>
      </div>

      <p className="sr-only">
        {t.demo.srIntro}{' '}
        {SCRIPT.map(
          (m) => `${m.role === 'ai' ? t.demo.aiName : t.demo.youName}: ${m.text}`,
        ).join(' ')}
      </p>
    </div>
  )
}
