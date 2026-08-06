const APPS_SCRIPT_URL =
  'https://script.google.com/macros/s/AKfycbyxIkhNc5Jl0LW0nYZCICGBWX4hXyKTa8pacRXqgxlB9A1SBN_mbhO1J3GpUTPVbhSrFA/exec'

// Backend dùng thinking model + gửi lại toàn bộ lịch sử mỗi lượt, nên các bước
// cuối (5–6) thường mất 15–20s. Cắt ở 12s là tự tạo ra lỗi giả.
// Backend cũng tự retry 429/503 (tối đa ~2.2s), ngân sách này đã tính cả phần đó.
const TIMEOUT_MS = 25000

// Backend đánh số câu bằng "Câu hỏi X trên 6" (VN) hoặc "Question X of 6" (EN).
// Chuẩn hoá về "Bước X/6" ngay tại frontend, không đụng system prompt/backend.
function toStepLabel(text) {
  return text
    .replace(
      /(?:Câu\s*hỏi|Câu|Question)\s*(\d+)\s*(?:trên|of|\/)\s*(\d+)/gi,
      'Bước $1/$2',
    )
    // Chat hiển thị text thuần, không render markdown → bỏ dấu ** cho sạch.
    .replace(/\*\*/g, '')
}

/**
 * Gọi Socratic tutor backend (Google Apps Script).
 *
 * @param {Array<{role: string, text: string}>} conversationHistory
 *   Lịch sử hội thoại, mỗi phần tử gồm role ('ai' | 'user') và text.
 * @returns {Promise<string>} Câu trả lời (text) tiếp theo của AI tutor.
 */
export async function askSocraticTutor(conversationHistory) {
  // App dùng role 'ai' để hiển thị, nhưng backend yêu cầu 'assistant'.
  const messages = conversationHistory.map((m) => ({
    role: m.role === 'ai' ? 'assistant' : m.role,
    text: m.text,
  }))

  // Huỷ request nếu backend không phản hồi trong 12s (backend hay treo lâu).
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS)

  try {
    const response = await fetch(APPS_SCRIPT_URL, {
      method: 'POST',
      // text/plain tránh CORS preflight (OPTIONS) mà Apps Script không xử lý,
      // đây cũng là nguyên nhân phổ biến gây lỗi 405.
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify({ messages }),
      signal: controller.signal,
    })

    if (!response.ok) {
      throw new Error(`Apps Script trả về lỗi ${response.status}`)
    }

    const raw = await response.text()

    let data
    try {
      data = JSON.parse(raw)
    } catch {
      // Backend LUÔN trả JSON qua ContentService. Nhận được text thuần nghĩa là
      // request đã lạc đường (Apps Script bỏ cuộc giữa chừng → Google trả về trang
      // doGet). Tuyệt đối không hiển thị chuỗi này như câu trả lời của AI.
      throw new Error('Máy chủ AI trả về dữ liệu không hợp lệ. Vui lòng thử lại.')
    }

    // Apps Script LUÔN trả HTTP 200 (ContentService không set được status code),
    // nên lỗi backend nằm trong body dưới dạng { error, message }.
    // Không đọc ở đây thì mọi lỗi đều thành một câu chung chung, mất chẩn đoán.
    if (data && typeof data.error === 'string') {
      throw new Error(
        typeof data.message === 'string' && data.message.trim()
          ? data.message
          : 'Máy chủ AI gặp lỗi. Vui lòng thử lại.',
      )
    }

    // Chấp nhận nhiều dạng key phổ biến để linh hoạt với backend.
    const reply =
      data.reply ?? data.text ?? data.message ?? data.answer ?? data.response

    if (typeof reply !== 'string' || !reply.trim()) {
      throw new Error('Phản hồi từ AI không có nội dung hợp lệ.')
    }

    return toStepLabel(reply.trim())
  } catch (err) {
    if (err.name === 'AbortError') {
      throw new Error(
        'Máy chủ phản hồi quá lâu (quá 25 giây). Vui lòng thử lại.',
      )
    }
    throw err
  } finally {
    clearTimeout(timer)
  }
}
