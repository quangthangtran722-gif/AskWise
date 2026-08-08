import { useI18n } from '../../i18n/useI18n'

/**
 * Nút chuyển VI ⇄ EN.
 *
 * Là <button> thật chứ không phải <select>: chỉ có 2 lựa chọn nên một cú bấm
 * là xong, và nhãn hiển thị luôn là ngôn ngữ ĐANG dùng — người dùng thấy mình
 * đang ở đâu, không phải đoán.
 */
export function LanguageToggle({ className = '' }) {
  const { locale, setLocale, t } = useI18n()

  return (
    <div
      className={`inline-flex items-center rounded-lg border border-border p-0.5 ${className}`}
      role="group"
      aria-label={t.nav.switchTo}
    >
      {['vi', 'en'].map((code) => {
        const active = locale === code
        return (
          <button
            key={code}
            type="button"
            onClick={() => setLocale(code)}
            aria-pressed={active}
            // min-h/min-w 44px của global button rule làm nút này quá to trong
            // navbar 64px, nên ép lại kích thước — vẫn đủ vùng bấm nhờ padding.
            className={`!min-h-8 !min-w-9 rounded-md px-2 py-1 text-xs font-semibold uppercase transition-colors ${
              active
                ? 'bg-primary text-primary-foreground'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            {code}
          </button>
        )
      })}
    </div>
  )
}

export default LanguageToggle
