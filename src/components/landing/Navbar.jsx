import { Link } from 'react-router-dom'

export default function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/85 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link to="/" className="flex items-center gap-2 text-lg font-semibold text-foreground">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground">
            A
          </span>
          AskWise
        </Link>

        <nav className="hidden items-center gap-8 text-sm font-medium text-muted-foreground md:flex">
          <a href="#cach-hoat-dong" className="transition-colors hover:text-foreground">
            Cách hoạt động
          </a>
          <a href="#niem-tin" className="transition-colors hover:text-foreground">
            Vì sao tin tưởng
          </a>
        </nav>

        <Link
          to="/phan-tich"
          className="inline-flex h-11 items-center justify-center rounded-xl bg-primary px-5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
        >
          Phân tích ngay
        </Link>
      </div>
    </header>
  )
}
