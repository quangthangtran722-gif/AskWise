# Hướng dẫn cập nhật backend Apps Script (cho Ngọc)

File cần dán là `backend/Code.gs` trong repo này.
**Thời gian: ~10 phút.** Không cần đổi URL, không cần sửa frontend.

---

## 📌 ĐỌC TRƯỚC — đây là lần cập nhật thứ 2

Lần 1 (Ngọc đã làm, cảm ơn) chữa phần **đọc kết quả sai** → hết `TypeError: reading '0'`.
Đã kiểm chứng bằng 4 phép thử trên production, phần đó **chạy đúng rồi**.

Nhưng còn một bệnh khác chưa đụng tới: **kết quả về quá chậm**. Đo thực tế:

| Loại request | Thời gian |
|---|---|
| Không gọi Gemini (test guard) | 1.5 – 6.7 s |
| Có gọi Gemini (1 câu ngắn nhất) | **79.9 s** |

Chênh hơn 10 lần → nghẽn nằm ở lệnh gọi Gemini, không phải ở Apps Script.
80s ≈ 3 lần thử × ~26s, tức là vòng retry lần trước đang **nhân ba** thời gian chờ
(retry chỉ đáng làm khi lỗi trả về nhanh; ở đây lỗi mất 26s mới trả về).

Lần 2 này sửa 3 thứ:

1. `MODEL` đổi từ `gemini-3-flash-preview` (preview, chậm) → `gemini-2.5-flash` (bản GA)
2. Tắt "thinking" — model dòng 2.5 mặc định suy nghĩ trước khi trả lời, ở đây không cần
3. Thêm `DEADLINE_MS` — quá 20s thì ngừng thử lại, không để retry nhân thời gian nữa

Và một thay đổi trong `SYSTEM_PROMPT`: ép AI đánh số câu bằng **đúng một chuỗi cố định**
`"Câu hỏi X trên 6:"`. Trước đây AI tự đổi chữ giữa chừng ("Câu hỏi 5 **của** 6") làm
hỏng thanh tiến trình và làm app không nhận ra câu số 6.

---

## Bước 0.5 — Chạy `diagnose()` TRƯỚC khi dán (2 phút)

Đây là phần quan trọng nhất của lần này: **đo trước, đừng tin lời ai**.

Trong editor, chọn hàm **`diagnose`** → **Run**. Nó gọi thẳng 3 model với cùng một câu
ngắn, không đi qua retry hay system prompt, rồi in ra thời gian từng cái:

```
=== KẾT QUẢ ĐO ĐỘ TRỄ ===
gemini-2.5-flash  (tắt thinking) → HTTP 200 · 1180ms · OK
gemini-2.5-flash  (mặc định)     → HTTP 200 · 4230ms · OK
gemini-3-flash-preview (bản cũ)  → HTTP 503 · 26100ms · ...
```

*(số ở trên là ví dụ minh hoạ, không phải kết quả thật)*

Chụp lại kết quả này gửi Thắng. Đọc như sau:

- Dòng 1 **nhanh và HTTP 200** → cấu hình mới đúng, cứ dán code và deploy.
- Dòng 1 trả **HTTP 400** → `thinkingConfig` không được chấp nhận. Mở `Code.gs`, sửa
  `const DISABLE_THINKING = true;` thành `false`, rồi tiếp tục bình thường.
- Cả 3 dòng đều chậm như nhau → vấn đề không nằm ở model, dừng lại và báo Thắng.

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

Mở https://ask-wise-rose.vercel.app/phan-tich → chọn 1 case → **chạy hết cả 6 bước**
(đừng dừng ở bước 3). Cần xác nhận 3 điều:

- [ ] Mỗi lượt trả lời trong khoảng **dưới 10 giây**
- [ ] Nhãn hiện đúng **"Bước 1/6 … Bước 6/6"**, không lọt ra chữ "Câu hỏi 5 của 6"
- [ ] Sau bước 6, app chuyển sang **4 câu debrief** (không gọi backend nữa) rồi tới lời chốt

Nếu cả 3 mục đều đạt thì xong việc. Mục nào trượt, chụp màn hình + log gửi Thắng.

---

## Sau đó: đọc log để theo dõi

**Extensions → Apps Script Dashboard → Executions** (hoặc View → Logs).

Mỗi lượt thành công giờ ghi 1 dòng:

```
OK · 7 lượt · 8421ms · thử lần 1 · finishReason=STOP
```

Đọc như sau:

| Thấy gì trong log | Nghĩa là | Làm gì tiếp |
|---|---|---|
| `thử lần 2` / `thử lần 3` xuất hiện thường xuyên | Gemini hay quá tải, nhưng **retry đã tự chữa** | Không cần làm gì |
| `OK` nhưng thường >15000ms | Model vẫn chậm dù đã đổi | Chạy lại `diagnose()`, gửi kết quả cho Thắng |
| `Bỏ retry: đã chạy ...ms` | Trần 20s đã chặn được vòng retry nhân thời gian | Đúng như thiết kế; nếu lặp nhiều thì model đang chậm |
| `UPSTREAM_429` lặp nhiều | Chạm giới hạn quota | Xin tăng quota |
| `UPSTREAM_400` ngay sau khi deploy | `thinkingConfig` không được model chấp nhận | Sửa `DISABLE_THINKING = false`, deploy lại |
| `EMPTY_TEXT` + `finishReason=MAX_TOKENS` | Câu trả lời bị cắt giữa chừng | Tăng `maxOutputTokens` từ 2048 lên 4096 |
| `PROMPT_BLOCKED` | Nội dung case bị bộ lọc an toàn chặn | Báo Thắng, cần sửa text case |
| `UPSTREAM_404` | Tên model bị Google đổi/gỡ | Chạy `diagnose()` tìm model còn sống |

Đổi model chỉ cần sửa đúng 1 dòng ở đầu file, rồi **làm lại Bước 3 → Bước 4**.

---

## ⚠️ Hai điều đừng làm

**1. Đừng sửa cách đánh số câu trong `SYSTEM_PROMPT`.** Đoạn ép AI dùng đúng chuỗi
`"Câu hỏi X trên 6:"` trông thừa nhưng không phải: frontend so khớp chuỗi này để
vẽ thanh tiến trình và để biết khi nào hết 6 câu. Đổi chữ ở đây là hỏng cả hai.

**2. Đừng thêm field lạ vào `generationConfig`.** Field không hợp lệ bị Gemini trả
`400 INVALID_ARGUMENT` — hỏng toàn bộ chứ không phải chỉ bỏ qua. `thinkingConfig`
hiện dùng được vì model đang là dòng 2.5; đổi model khác thì phải chạy `diagnose()`
kiểm tra lại trước.

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
| 8 | Retry nhân ba thời gian chờ khi lỗi trả về CHẬM (80s ≈ 3 × 26s) | `DEADLINE_MS` 20s — quá trần thì ngừng thử lại |
| 9 | `gemini-3-flash-preview` chậm ~26s/lần gọi | Đổi sang `gemini-2.5-flash` (GA) + tắt thinking |
| 10 | AI tự đổi chữ đánh số ("Câu hỏi 5 **của** 6") làm hỏng thanh tiến trình và làm app không nhận ra câu số 6 | `SYSTEM_PROMPT` ép đúng một chuỗi cố định |
| 11 | Không có cách đo xem chậm là do model hay do code | Thêm hàm `diagnose()` chạy tay trong editor |
