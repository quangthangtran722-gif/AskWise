import { useCallback, useRef, useState } from 'react'
import { cn } from '@/lib/utils'

// Nguồn: 21st.dev @tom_ui/tilt-card (id 12246) — chuyển JSX, re-theme spotlight
// trắng → teal (token), bỏ biến thể dark (app light-only).
export function TiltCard({
  tiltLimit = 12,
  scale = 1.04,
  perspective = 1200,
  effect = 'gravitate',
  spotlight = true,
  className,
  style,
  children,
}) {
  const cardRef = useRef(null)
  const [transform, setTransform] = useState(
    `perspective(${perspective}px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`,
  )
  const [spotlightPos, setSpotlightPos] = useState({ x: 50, y: 50 })
  const [isHovered, setIsHovered] = useState(false)

  const dir = effect === 'evade' ? -1 : 1

  const handlePointerMove = useCallback(
    (e) => {
      // Tôn trọng prefers-reduced-motion: không nghiêng/không spotlight.
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
      const el = cardRef.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      const px = (e.clientX - rect.left) / rect.width
      const py = (e.clientY - rect.top) / rect.height
      const xRot = (py - 0.5) * (tiltLimit * 2) * dir
      const yRot = (px - 0.5) * -(tiltLimit * 2) * dir
      setTransform(
        `perspective(${perspective}px) rotateX(${xRot}deg) rotateY(${yRot}deg) scale3d(${scale}, ${scale}, ${scale})`,
      )
      if (spotlight) setSpotlightPos({ x: px * 100, y: py * 100 })
    },
    [tiltLimit, scale, perspective, dir, spotlight],
  )

  const handlePointerEnter = useCallback(() => setIsHovered(true), [])

  const handlePointerLeave = useCallback(() => {
    setTransform(
      `perspective(${perspective}px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`,
    )
    setIsHovered(false)
  }, [perspective])

  return (
    <div
      ref={cardRef}
      onPointerEnter={handlePointerEnter}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className={cn('relative overflow-hidden will-change-transform', className)}
      style={{
        transform,
        transition: 'transform 0.2s ease-out',
        transformStyle: 'preserve-3d',
        ...style,
      }}
    >
      {children}
      {spotlight && (
        <div
          className="pointer-events-none absolute inset-0 z-10 overflow-hidden"
          style={{ opacity: isHovered ? 1 : 0, transition: 'opacity 0.3s' }}
        >
          <div
            className="absolute h-[200%] w-[200%] rounded-full"
            style={{
              left: `${spotlightPos.x}%`,
              top: `${spotlightPos.y}%`,
              transform: 'translate(-50%, -50%)',
              background:
                'radial-gradient(circle, rgba(13,148,136,0.16) 0%, transparent 40%)',
            }}
          />
        </div>
      )}
    </div>
  )
}

export default TiltCard
