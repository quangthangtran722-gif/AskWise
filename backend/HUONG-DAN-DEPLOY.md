# Hướng dẫn cập nhật backend Apps Script (cho Ngọc)

Mục tiêu: sửa lỗi backend "chập chờn" — thỉnh thoảng trả `TypeError: reading '0'`
hoặc treo >30s. File cần dán là `backend/Code.gs` trong repo này.

**Thời gian: ~10 phút.** Không cần đổi URL, không cần sửa frontend.

---

## Bước 0 — Kiểm tra runtime (30 giây, làm 1 lần)

Trong Apps Script editor: **⚙️ Project Settings** → xem mục *"Google Apps Script API"*
phần runtime. Nếu thấy tuỳ chọn **"Enable Chrome V8 runtime"** mà đang TẮT → bật lên.

> Vì sao: code mới dùng cú pháp hiện đại (`const`, `for...of`, arrow function).
> Chạy trên runtime cũ (Rhino) sẽ báo syntax error ngay dòng đầu.

## Bước 1 — Sao lưu bản cũ

Trong editor, mở `Code.gs` → Ctrl+A → Ctrl+C → dán vào một file text để dành.
Nếu bản mới có vấn đề thì dán ngược lại là xong.

## Bước 2 — Dán code mới

1. Mở `backend/Code.gs` từ repo (hoặc file Thắng gửi).
2. Copy **toàn bộ** file.
3. Trong Apps Script editor, ở file `Code.gs`: **Ctrl+A** rồi **Ctrl+V** (dán đè hết).
4. **Ctrl+S** để lưu.

> `SYSTEM_PROMPT` trong file mới **giữ nguyên 100%** bản cũ — không sửa một chữ nào.
> Chỉ phần xử lý lỗi bên dưới được viết lại.

## Bước 3 — Test ngay trong editor (QUAN TRỌNG)

Chọn hàm `testChat` ở thanh trên → bấm **Run**.

- ✅ **Đúng**: log ra `{"reply":"..."}` với nội dung tiếng Anh của AI.
- ❌ **Sai**: nếu ra `{"error":"..."}` thì **DỪNG LẠI**, chụp màn hình phần
  *Execution log* gửi Thắng. Đừng deploy khi test còn đỏ.

Hàm test này cố tình gửi `role: "assistant"` giống hệt frontend gửi thật, nên nếu
nó chạy được thì frontend cũng chạy được.

## Bước 4 — Deploy (chỗ hay sai nhất)

⚠️ **Lưu code KHÔNG làm web app cập nhật.** Phải deploy version mới:

**Deploy** → **Manage deployments** → bấm **✏️ (bút chì)** ở deployment đang chạy →
mục **Version** chọn **New version** → **Deploy**.

❌ **ĐỪNG bấm "New deployment"** — nó tạo URL mới, frontend sẽ trỏ vào URL cũ và
mọi thứ đứng im. Phải sửa (edit) deployment cũ để giữ nguyên URL.

Sau khi deploy, xác nhận URL vẫn kết thúc bằng:
`.../AKfycbyxIkhNc5Jl0LW0nYZCICGBWX4hXyKTa8pacRXqgxlB9A1SBN_mbhO1J3GpUTPVbhSrFA/exec`

## Bước 5 — Kiểm tra thật

Mở https://ask-wise-rose.vercel.app/phan-tich → chọn 1 case → chạy hết 6 bước.

---

## Sau đó: đọc log để biết lỗi thật là gì

Đây mới là phần quan trọng nhất — **đừng đổi model vội**, hãy để chạy vài ngày rồi
đọc số liệu.

**Extensions → Apps Script Dashboard → Executions** (hoặc View → Logs).

Mỗi lượt thành công giờ ghi 1 dòng:

```
OK · 7 lượt · 8421ms · thử lần 1 · finishReason=STOP
```

Đọc như sau:

| Thấy gì trong log | Nghĩa là | Làm gì tiếp |
|---|---|---|
| `thử lần 2` / `thử lần 3` xuất hiện thường xuyên | Gemini hay quá tải, nhưng **retry đã tự chữa** | Không cần làm gì, đã xong |
| `OK` nhưng thường >15000ms | Model preview **chậm**, không phải hỏng | Đổi `MODEL` sang bản GA `gemini-2.5-flash` |
| `UPSTREAM_429` lặp nhiều | Chạm giới hạn quota | Xin tăng quota hoặc đổi model GA |
| `EMPTY_TEXT` + `finishReason=MAX_TOKENS` | Câu trả lời bị cắt giữa chừng | Tăng `maxOutputTokens` từ 2048 lên 4096 |
| `PROMPT_BLOCKED` | Nội dung case bị bộ lọc an toàn chặn | Báo Thắng, cần sửa text case |
| `UPSTREAM_404` | Tên model bị Google đổi/gỡ | Đổi `MODEL` sang bản GA ngay |

Đổi model chỉ cần sửa đúng 1 dòng ở đầu file, rồi **làm lại Bước 3 → Bước 4**:

```js
const MODEL = "gemini-2.5-flash";
```

---

## ⚠️ Đừng làm điều này

Nếu định giảm độ trễ bằng cách thêm `thinkingLevel` / `thinkingConfig` vào
`generationConfig` — **tra đúng tên field trong docs Gemini trước, và chạy
`testChat()` kiểm tra**. Field lạ trong `generationConfig` bị Gemini trả về
`400 INVALID_ARGUMENT`, tức là thay vì nhanh hơn thì hỏng toàn bộ.

---

## Những gì đã thay đổi (tóm tắt kỹ thuật)

| # | Vấn đề bản cũ | Cách xử lý |
|---|---|---|
| 1 | `data.candidates[0].content.parts[0].text` không check gì → `TypeError: reading '0'` khi Gemini trả lỗi | Check status code → check `promptFeedback` → check `candidates` → check text, mỗi lớp trả JSON có mã lỗi riêng |
| 2 | Không retry khi Gemini quá tải (429/503) | Tự thử lại tối đa 2 lần (chờ 0.7s rồi 1.5s) |
| 3 | `role: "assistant"` (chuẩn OpenAI) gửi thẳng vào Gemini — Gemini chỉ nhận `user`/`model` | `normalizeRole()` chuyển đổi ở backend |
| 4 | Thinking model trả "thought part" ở `parts[0]` không có text → reply rỗng | `extractReply()` quét hết parts, bỏ phần `thought` |
| 5 | Hai lượt `user` liên tiếp khi 1 request lỗi giữa chừng | `buildContents()` tự gộp lượt trùng role |
| 6 | `JSON.parse` chạy trước khi check status → gateway trả HTML là sập | Đọc status code trước, `JSON.parse` bọc try riêng |
| 7 | Không có log → không ai biết lỗi thật là gì | `console.log/warn/error` ở mọi nhánh, có kèm thời gian chạy |
