# AskWise — Trạng thái dự án

> Cập nhật lần cuối: 2026-08-01. File này ghi lại bối cảnh, quy tắc và việc tồn
> đọng để phiên làm việc sau (hoặc người khác) tiếp tục đúng hướng.

## 1. Sản phẩm

**AskWise** — web app dùng phương pháp Socratic giúp người dùng **tự nhận diện tin
tuyển dụng lừa đảo**. AI KHÔNG kết luận thẳng "đây có phải lừa đảo", mà đặt câu hỏi
dẫn dắt **6 bước** để người dùng tự thấy dấu hiệu bất thường, kết thúc bằng phần
**debrief 4 câu** + lời chốt.

- **Live**: https://ask-wise-rose.vercel.app/ (Vercel tự deploy mỗi khi push `main`)
- **Repo**: https://github.com/quangthangtran722-gif/AskWise
- **Backend**: Google Apps Script (gọi qua `src/services/aiService.js`). Backend tự
  đánh số câu "Câu hỏi X trên 6" / "Question X of 6"; frontend chuẩn hoá thành
  "Bước X/6" và strip `**` markdown trong `aiService.js` (`toStepLabel`).
- Backend yêu cầu payload `{messages:[{role, text}]}` với role `assistant` (app dùng
  `ai`, đã map trong aiService); gửi `Content-Type: text/plain` để né CORS preflight
  (đây là lý do trước đây bị 405).

### Cấu trúc chính
- `src/pages/` — `Landing` (`/`), `ChatPage` (`/phan-tich`).
- `src/components/landing/` — Navbar, Hero, WhySocratic, HowItWorks, Features, Stats,
  Testimonials, CtaFooter, SocraticDemo. (Tên file/component nội bộ còn giữ
  "Socratic" — KHÔNG cần đổi, chỉ đổi text hiển thị.)
- `src/components/Chat.jsx` — luồng: chọn case → 6 bước Socratic (API) → debrief 4 câu
  (client) → lời chốt. Có progress bar "Bước X/6", timeout 12s + nút "Thử lại".
- `src/components/ui/` — component tái dùng (shadcn + 21st.dev đã re-theme).
- `src/data/scenarios.json` (6 case) + `src/data/debrief.json`.

## 2. Design system đã CHỐT

- **Light mode mặc định, KHÔNG theo OS** (`color-scheme: light` trong `index.css`,
  đã xoá block `@media (prefers-color-scheme: dark)`). Mọi máy thấy 1 giao diện đã
  kiểm duyệt.
- **Token màu** (định nghĩa ở `src/index.css` `:root`):
  - Primary (teal): `--color-primary: #0D9488`
  - Accent (cam, CTA): `--color-accent: #EA580C` (nút dùng `--color-accent-button #c2410c` cho đủ tương phản)
  - Amber (highlight/cảnh báo): `--color-highlight: #F59E0B`
  - Vai trò: teal = tin cậy/nền tảng · cam = hành động/CTA · amber = chú ý/cảnh báo.
- **Style**: "Flat Design + Accessible & Ethical" (theo ui-ux-pro-max). Font Geist.
- **Quy trình BẮT BUỘC khi sửa/ thêm UI** (đúng thứ tự):
  1. **ui-ux-pro-max** (skill) — lấy hướng: `python .claude/skills/ui-ux-pro-max/scripts/search.py "<query>" --domain <style|ux|landing|product>`.
  2. **shadcn/ui** — component mặc định (Button... ở `src/components/ui/button.jsx`).
  3. **21st.dev** — CHỈ 1–2 điểm nhấn/lần, **giới hạn 2 lượt get_component/ngày** (free),
     **BẮT BUỘC re-theme** về token trên (không dùng màu mặc định neutral/blue/emerald),
     convert TSX→JSX, và bỏ ảnh remote (thay bằng avatar chữ/panel thương hiệu).

### Component 21st.dev đã tích hợp (đều đã re-theme)
parallax-floating (hero), tilt-card (3D — thẻ HowItWorks), animated-tooltip
(Testimonials, rê chuột hiện người), typing (chat), spotlight-card, count-up; và các
section Aceternity feature-hover (Features), Bold Stats (Stats), CTA 3 (CtaFooter).

## 3. Quy tắc NỘI DUNG

- **KHÔNG dùng khung "học / khóa học / bài tập / gia sư / học sinh / giáo viên"** ở
  bất kỳ đâu. AskWise là **công cụ thực dụng chống lừa đảo**, KHÔNG phải khóa học.
  (Đã rà sạch; nếu thêm text mới phải giữ đúng tinh thần này.)
- Giữ được: "phương pháp Socrates" (tên phương pháp) và "Socrates" (triết gia) — đây
  KHÔNG phải khung giáo dục.
- **6 case trong `scenarios.json` là nội dung thật đã nghiên cứu** (job scam VN:
  việc nhẹ lương cao/data entry, giả danh doanh nghiệp, nhiệm vụ like-follow, form
  SMS, việc Nhật lương cao, giả danh nhà tuyển dụng LinkedIn). **KHÔNG tự sinh thêm
  case mới nếu chưa được xác nhận.**
- Số liệu Stats/Testimonials hiện là **minh hoạ** — luôn gắn nhãn "Dữ liệu minh hoạ"
  / "Ví dụ minh hoạ", KHÔNG trình bày như số thật.

## 4. Việc TỒN ĐỌNG (ưu tiên cao → thấp)

- **(a) 🟠 Backend Apps Script chập chờn — ĐÃ CÓ BẢN VÁ, CHỜ NGỌC DEPLOY.**
  Nguyên nhân gốc đã xác định (2026-08-06): (1) `data.candidates[0]...` không check
  HTTP status → mọi lỗi upstream thành `TypeError: reading '0'`; (2) không retry khi
  Gemini trả 429/503; (3) frontend gửi `role:"assistant"` nhưng Gemini chỉ nhận
  `user`/`model`, backend passthrough; (4) `gemini-3-flash-preview` là thinking model
  → `parts[0]` có thể là thought part không có text, và độ trễ thật thường 15–20s ở
  bước 5–6 (đây mới là nguyên nhân "treo", không phải bug).
  - Bản vá backend: `backend/Code.gs` + `backend/HUONG-DAN-DEPLOY.md` (Ngọc nắm Apps
    Script, phải deploy bằng **Manage deployments → Edit → New version** để giữ URL).
  - Frontend đã sửa: timeout 12s → **25s**, đọc `{error, message}` từ body (Apps
    Script luôn trả HTTP 200 nên `response.ok` vô dụng), thêm chữ "AI đang phân tích…".
  - Ngọc đã deploy vòng 1 (2026-08-06) — đã kiểm chứng: `doGet` trả "AskWise", 3 guard
    trả `{error, message}` có cấu trúc thay vì `TypeError`. **Phần xử lý lỗi xong.**
  - Đo trên production: request KHÔNG gọi Gemini mất 1.5–6.7s, request CÓ gọi Gemini
    mất **79.9s** → nghẽn ở lệnh gọi Gemini. 80s ≈ 3 lần thử × ~26s, tức vòng retry
    đang nhân ba thời gian chờ (retry chỉ đúng khi lỗi trả về NHANH).
  - Vòng 2 đã chuẩn bị, **chờ Ngọc deploy**: `MODEL` → `gemini-2.5-flash` (GA),
    `DISABLE_THINKING = true`, `DEADLINE_MS = 20000`, và hàm `diagnose()` chạy tay
    trong editor để đo thẳng độ trễ 3 model (đo trước, đừng đoán).
  - **Chưa xong**: chưa ai chạy `diagnose()` nên con số ~26s/lần gọi vẫn là suy ra từ
    80s ÷ 3, chưa đo trực tiếp.
- **(b) 🟠 Testimonials còn placeholder** — avatar là chữ cái (M/L/H/T/N), nội dung là
  ví dụ minh hoạ. **Cần xác nhận persona đúng là "sinh viên / người tìm việc remote"
  trước khi thay ảnh & lời thật.** Component `ui/animated-tooltip.jsx` nhận `items`
  có `{id,name,designation,initials}` — thay `initials` bằng ảnh khi có.
- **(c) 🟠 Rebrand Socratic→AskWise chưa đồng bộ tài liệu ngoài** — app đã đổi hết
  text hiển thị sang AskWise, nhưng **Proposal / script video vẫn dùng tên cũ
  "Socratic"** → cần cập nhật để nhất quán.
- **(d) 🟡 A11y/reduced-motion của component mới chưa verify runtime** — đã THÊM guard
  `prefers-reduced-motion` ở code cho `parallax-floating` và `tilt-card`, nhưng **chưa
  test thực tế khi bật reduced-motion** (môi trường test không emulate được).
  `animated-tooltip` **chưa có guard reduced-motion**. Cần kiểm keyboard-nav + bật
  reduced-motion trong DevTools (Rendering → Emulate prefers-reduced-motion) để xác
  nhận.

### Ghi chú kỹ thuật
- `parallax-floating` & `tilt-card` dùng `requestAnimationFrame`/pointer gốc (KHÔNG
  dùng `useAnimationFrame` của framer-motion — nó không kích hoạt callback trong dự
  án này). rAF bị Chrome pause khi tab chạy nền → khi test tự động không thấy animate,
  nhưng user thật (tab foreground) vẫn chạy.
- `vercel.json` có rewrite SPA để mở thẳng `/phan-tich` không bị 404.
- Lint: `npx oxlint src/` (chỉ còn 1 warning fast-refresh ở button.jsx, vô hại).
- Còn ~vài file dead-code nhẹ: `ui/count-up.jsx` không còn ai import sau khi Stats đổi
  sang Bold Stats (giữ lại, vô hại).
