import { useEffect, useRef } from 'react'
import { useInView, useMotionValue, useSpring } from 'framer-motion'

function formatNumber(value, separator) {
  const rounded = Math.round(value)
  const formatted = new Intl.NumberFormat('en-US').format(rounded)
  return separator ? formatted.replaceAll(',', separator) : formatted
}

export function CountUp({
  to,
  from = 0,
  duration = 1.8,
  delay = 0,
  className = '',
  separator = '.',
}) {
  const ref = useRef(null)
  const motionValue = useMotionValue(from)

  const damping = 20 + 40 * (1 / duration)
  const stiffness = 100 * (1 / duration)
  const springValue = useSpring(motionValue, { damping, stiffness })
  const isInView = useInView(ref, { once: true, margin: '0px' })

  useEffect(() => {
    if (ref.current) ref.current.textContent = formatNumber(from, separator)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (!isInView) return
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches

    if (prefersReducedMotion) {
      motionValue.set(to)
      return
    }

    const timeoutId = setTimeout(() => motionValue.set(to), delay * 1000)
    return () => clearTimeout(timeoutId)
  }, [isInView, motionValue, to, delay])

  useEffect(() => {
    const unsubscribe = springValue.on('change', (latest) => {
      if (ref.current) ref.current.textContent = formatNumber(latest, separator)
    })
    return unsubscribe
  }, [springValue, separator])

  return <span ref={ref} className={className} />
}
