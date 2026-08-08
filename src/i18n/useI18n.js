import { useContext } from 'react'
import { LanguageContext } from './LanguageContext'
import { STRINGS } from './strings'

/**
 * Trả về bộ chữ của ngôn ngữ đang chọn + hàm đổi ngôn ngữ.
 *
 * Cố tình KHÔNG dùng kiểu t('a.b.c') tra khoá bằng chuỗi: khoá gõ sai sẽ im
 * lặng trả về undefined và chỉ lộ ra khi lên production. Ở đây `t` là object
 * lồng nhau nên gõ sai là lỗi ngay lúc render, và editor gợi ý được.
 */
export function useI18n() {
  const ctx = useContext(LanguageContext)
  if (!ctx) {
    throw new Error('useI18n phải nằm trong <LanguageProvider>')
  }
  return { ...ctx, t: STRINGS[ctx.locale] }
}
