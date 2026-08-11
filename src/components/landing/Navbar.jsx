import { Link } from 'react-router-dom'
import { LanguageToggle } from '../ui/language-toggle'
import { useI18n } from '../../i18n/useI18n'
import logoMark from '@/assets/logo-mark.png'

export default function Navbar() {
  const { t } = useI18n()

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/85 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link to="/" className="flex items-center gap-2 text-lg font-semibold text-foreground">
          {/* Nền sáng là BẮT BUỘC, không phải trang trí: màu chủ đạo của logo
              (#0c5160) gần trùng giá trị với nền navbar nên đặt thẳng lên nền
              tối thì logo thành một vệt mờ. Ô sáng tách khối cho nó.
              alt rỗng: chữ "AskWise" ngay bên cạnh đã là tên thương hiệu rồi,
              để alt nữa thì screen reader đọc trùng hai lần. */}
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-white p-0.5">
            <img
              src={logoMark}
              alt=""
              width="32"
              height="32"
              className="h-full w-full object-contain"
            />
          </span>
          AskWise
        </Link>

        <nav className="hidden items-center gap-8 text-sm font-medium text-muted-foreground md:flex">
          <a href="#cach-hoat-dong" className="transition-colors hover:text-foreground">
            {t.nav.howItWorks}
          </a>
          <a href="#niem-tin" className="transition-colors hover:text-foreground">
            {t.nav.whyTrust}
          </a>
        </nav>

        <div className="flex items-center gap-3">
          <LanguageToggle />
          <Link
            to="/phan-tich"
            className="inline-flex h-11 items-center justify-center rounded-xl bg-primary px-5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
          >
            {t.nav.cta}
          </Link>
        </div>
      </div>
    </header>
  )
}
