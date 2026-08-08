import { useState } from 'react'
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from 'framer-motion'
import { cn } from '@/lib/utils'

// Nguồn: 21st.dev @manuarora700/animated-tooltip — chuyển JSX, thay next/image +
// ảnh remote bằng avatar chữ cái tròn, re-theme gạch gradient sang teal/amber.
export function AnimatedTooltip({ items, className }) {
  const [hoveredId, setHoveredId] = useState(null)
  const springConfig = { stiffness: 100, damping: 5 }
  const x = useMotionValue(0)
  const rotate = useSpring(useTransform(x, [-100, 100], [-45, 45]), springConfig)
  const translateX = useSpring(
    useTransform(x, [-100, 100], [-50, 50]),
    springConfig,
  )

  const handleMouseMove = (event) => {
    const halfWidth = event.currentTarget.offsetWidth / 2
    x.set(event.nativeEvent.offsetX - halfWidth)
  }

  return (
    <div className={cn('flex items-center', className)}>
      {items.map((item) => (
        <div
          className="group relative -mr-4"
          key={item.id}
          onMouseEnter={() => setHoveredId(item.id)}
          onMouseLeave={() => setHoveredId(null)}
          // Focus bubbles trong React → tab tới nút cũng hiện tooltip, không chỉ rê chuột.
          onFocus={() => setHoveredId(item.id)}
          onBlur={() => setHoveredId(null)}
        >
          <AnimatePresence mode="popLayout">
            {hoveredId === item.id && (
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.6 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  transition: { type: 'spring', stiffness: 260, damping: 10 },
                }}
                exit={{ opacity: 0, y: 20, scale: 0.6 }}
                style={{ translateX, rotate }}
                // Vai trò thật dài (30+ ký tự) nên bỏ nowrap và giới hạn bề ngang,
                // không thì tooltip tràn ngang màn hình nhỏ.
                // Neo bằng bottom-full: tooltip cao thêm thì nở LÊN, không đè lên avatar.
                className="absolute bottom-full -left-1/2 z-50 mb-3 flex w-max max-w-56 translate-x-1/2 flex-col items-center justify-center rounded-md bg-foreground px-4 py-2 text-center text-xs shadow-xl"
              >
                <div className="absolute inset-x-10 -bottom-px z-30 h-px w-[20%] bg-gradient-to-r from-transparent via-[var(--color-primary)] to-transparent" />
                <div className="absolute left-10 -bottom-px z-30 h-px w-[40%] bg-gradient-to-r from-transparent via-[var(--color-highlight)] to-transparent" />
                <div className="relative z-30 text-base font-bold text-background">
                  {item.name}
                </div>
                <div className="text-xs text-background/70">
                  {item.designation}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          <button
            type="button"
            onMouseMove={handleMouseMove}
            aria-label={`${item.name} — ${item.designation}`}
            className="relative flex h-14 w-14 items-center justify-center overflow-hidden rounded-full border-2 border-background bg-muted text-base font-semibold text-primary transition duration-500 group-hover:z-30 group-hover:scale-105"
          >
            {/* Có ảnh thì dùng ảnh, không thì rơi về avatar chữ cái.
                alt rỗng vì nút đã có aria-label mô tả đầy đủ — để alt nữa là đọc trùng. */}
            {item.image ? (
              <img
                src={item.image}
                alt=""
                width="56"
                height="56"
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover"
              />
            ) : (
              item.initials
            )}
          </button>
        </div>
      ))}
    </div>
  )
}

export default AnimatedTooltip
