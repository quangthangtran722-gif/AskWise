import { createContext, useCallback, useEffect, useMemo, useState } from 'react'
import { STRINGS } from './strings'

export const LOCALES = ['vi', 'en']
const STORAGE_KEY = 'askwise-lang'

export const LanguageContext = createContext(null)

function readInitialLocale() {
  // Tiếng Việt là mặc định: người dùng thật của AskWise ở VN. Giám khảo đọc
  // tiếng Anh thì bấm 1 nút — không tự đoán theo navigator.language, vì đoán sai
  // sẽ đẩy người Việt sang bản tiếng Anh mà họ không muốn.
  if (typeof window === 'undefined') return 'vi'
  const saved = window.localStorage.getItem(STORAGE_KEY)
  return LOCALES.includes(saved) ? saved : 'vi'
}

export function LanguageProvider({ children }) {
  const [locale, setLocaleState] = useState(readInitialLocale)

  useEffect(() => {
    // <html lang> phải đúng: screen reader chọn giọng đọc theo thuộc tính này,
    // đọc tiếng Việt bằng giọng Anh thì gần như không hiểu được.
    document.documentElement.lang = locale
    document.title = STRINGS[locale].meta.title
    window.localStorage.setItem(STORAGE_KEY, locale)
  }, [locale])

  const setLocale = useCallback((next) => {
    if (LOCALES.includes(next)) setLocaleState(next)
  }, [])

  const value = useMemo(() => ({ locale, setLocale }), [locale, setLocale])

  return (
    <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
  )
}
