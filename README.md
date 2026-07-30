# AskWise — Trợ lý phân tích tin tuyển dụng đáng ngờ

Ứng dụng web dùng phương pháp Socratic: thay vì kết luận thẳng một tin tuyển dụng
có phải lừa đảo hay không, AI đặt câu hỏi dẫn dắt từng bước (6 bước) để người dùng
tự nhận ra dấu hiệu bất thường, kết thúc bằng phần debrief 4 câu.

## Tech stack
- **Vite 8 + React 19** (JavaScript)
- **Tailwind CSS v4** + **shadcn/ui** (Radix) — design tokens teal `#0D9488` / cam
  `#EA580C` / amber `#F59E0B`, khoá **light mode**
- **react-router-dom**, **framer-motion**, **lucide-react**
- Một số component tham khảo từ **21st.dev** (đã re-theme): spotlight-card, count-up,
  typing, parallax-floating
- Backend: **Google Apps Script** (gọi qua `src/services/aiService.js`)

## Chạy local
```bash
npm install
npm run dev      # http://localhost:5173
```

## Scripts
- `npm run dev` — chạy dev server
- `npm run build` — build production (ra thư mục `dist/`)
- `npm run preview` — xem thử bản build
- `npx oxlint src/` — lint

## Cấu trúc chính
- `src/pages/` — `Landing` (`/`) và `ChatPage` (`/phan-tich`)
- `src/components/landing/` — các section landing (Hero, WhySocratic, HowItWorks…)
- `src/components/Chat.jsx` — luồng chat: chọn case → 6 bước Socratic → debrief
- `src/components/ui/` — component tái sử dụng (shadcn + 21st.dev đã re-theme)
- `src/data/` — `scenarios.json` (6 case) + `debrief.json`

## Ghi chú
- App khoá **light mode** để mọi máy hiển thị nhất quán.
- Nội dung do AI sinh ra có thể chưa chính xác — luôn tự kiểm chứng.
