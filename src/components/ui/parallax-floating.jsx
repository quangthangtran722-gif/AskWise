import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
} from 'react'
import { cn } from '@/lib/utils'
import { useMousePositionRef } from '@/hooks/use-mouse-position-ref'

// Nguồn: 21st.dev @danielpetho/parallax-floating (id 656) — chuyển TSX→JS.
// Thay useAnimationFrame (framer-motion) bằng requestAnimationFrame gốc cho ổn
// định, + guard prefers-reduced-motion.
const FloatingContext = createContext(null)

function Floating({
  children,
  className,
  sensitivity = 1,
  easingFactor = 0.05,
  ...props
}) {
  const containerRef = useRef(null)
  const elementsMap = useRef(new Map())
  const mousePositionRef = useMousePositionRef(containerRef)
  const reducedMotion = useRef(false)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    reducedMotion.current = mq.matches
    const onChange = () => {
      reducedMotion.current = mq.matches
    }
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  const registerElement = useCallback((id, element, depth) => {
    elementsMap.current.set(id, {
      element,
      depth,
      currentPosition: { x: 0, y: 0 },
    })
  }, [])

  const unregisterElement = useCallback((id) => {
    elementsMap.current.delete(id)
  }, [])

  useEffect(() => {
    let rafId
    const loop = () => {
      // Bỏ qua khi user yêu cầu giảm chuyển động.
      if (containerRef.current && !reducedMotion.current) {
        elementsMap.current.forEach((data) => {
          const strength = (data.depth * sensitivity) / 20
          const targetX = mousePositionRef.current.x * strength
          const targetY = mousePositionRef.current.y * strength
          data.currentPosition.x += (targetX - data.currentPosition.x) * easingFactor
          data.currentPosition.y += (targetY - data.currentPosition.y) * easingFactor
          data.element.style.transform = `translate3d(${data.currentPosition.x}px, ${data.currentPosition.y}px, 0)`
        })
      }
      rafId = requestAnimationFrame(loop)
    }
    rafId = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(rafId)
  }, [sensitivity, easingFactor, mousePositionRef])

  return (
    <FloatingContext.Provider value={{ registerElement, unregisterElement }}>
      <div
        ref={containerRef}
        className={cn('absolute top-0 left-0 h-full w-full', className)}
        {...props}
      >
        {children}
      </div>
    </FloatingContext.Provider>
  )
}

export default Floating

export function FloatingElement({ children, className, depth = 1 }) {
  const elementRef = useRef(null)
  const idRef = useRef(Math.random().toString(36).substring(7))
  const context = useContext(FloatingContext)

  useEffect(() => {
    if (!elementRef.current || !context) return
    const id = idRef.current
    const nonNullDepth = depth ?? 0.01
    context.registerElement(id, elementRef.current, nonNullDepth)
    return () => context.unregisterElement(id)
  }, [depth, context])

  return (
    <div
      ref={elementRef}
      className={cn('absolute will-change-transform', className)}
    >
      {children}
    </div>
  )
}
