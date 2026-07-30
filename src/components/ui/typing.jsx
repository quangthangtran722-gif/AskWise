import { cn } from '@/lib/utils'

// Nguồn: 21st.dev @loading-ui/typing (id 19978) — chuyển TSX→JSX, việt hoá sr-only.
// Màu chấm kế thừa `color` hiện tại qua bg-current → set màu bằng text-* ở nơi dùng
// (re-theme về token --color-primary #0D9488, không dùng màu mặc định).
export function Typing({ className, dots = 3, ...props }) {
  return (
    <>
      <style>{`
        @keyframes loading-ui-typing {
          0%, 100% { transform: translateY(0); opacity: 0.5; }
          50% { transform: translateY(-50%); opacity: 1; }
        }
      `}</style>
      <span
        role="status"
        className={cn('inline-flex items-center gap-[12%]', className)}
        {...props}
      >
        {Array.from({ length: dots }, (_, index) => (
          <span
            key={index}
            aria-hidden="true"
            className="inline-block aspect-square grow rounded-full bg-current"
            style={{
              animation: 'loading-ui-typing var(--duration, 1s) infinite',
              animationDelay: `calc(var(--delay, 160ms) * ${index})`,
            }}
          />
        ))}
        <span className="sr-only">Đang soạn…</span>
      </span>
    </>
  )
}

export default Typing
