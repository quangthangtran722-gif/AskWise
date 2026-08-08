import { ArrowLeft } from 'lucide-react'
import { Link } from 'react-router-dom'
import Chat from '../components/Chat'
import { LanguageToggle } from '../components/ui/language-toggle'
import { useI18n } from '../i18n/useI18n'

export default function ChatPage() {
  const { t } = useI18n()

  return (
    <div className="flex min-h-dvh flex-col bg-background text-foreground">
      <header className="flex items-center gap-3 border-b border-border px-4 py-3 sm:px-6">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          {t.nav.home}
        </Link>
        <span className="text-sm font-semibold text-foreground">AskWise</span>
        {/* Đổi ngôn ngữ giữa phiên là reset phiên (seed đã gửi bằng ngôn ngữ cũ),
            nên nút để ở đây chủ yếu cho màn chọn tình huống. */}
        <LanguageToggle className="ml-auto" />
      </header>
      <Chat />
    </div>
  )
}
