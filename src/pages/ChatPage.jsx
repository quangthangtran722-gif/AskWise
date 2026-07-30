import { ArrowLeft } from 'lucide-react'
import { Link } from 'react-router-dom'
import Chat from '../components/Chat'

export default function ChatPage() {
  return (
    <div className="flex min-h-dvh flex-col bg-background text-foreground">
      <header className="flex items-center gap-3 border-b border-border px-4 py-3 sm:px-6">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          Trang chủ
        </Link>
        <span className="text-sm font-semibold text-foreground">AskWise</span>
      </header>
      <Chat />
    </div>
  )
}
