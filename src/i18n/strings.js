// Bộ chữ song ngữ. VI là bản gốc — khi sửa copy, sửa VI trước rồi mới dịch EN,
// đừng dịch ngược lại.
//
// Lưu ý về khung từ ngữ (khác nhau CÓ CHỦ ĐÍCH giữa 2 ngôn ngữ):
//   VI — cấm mọi khung "học/khoá học/bài tập/gia sư/học sinh/giáo viên".
//        AskWise tự định vị là công cụ thực dụng chống lừa đảo.
//   EN — dùng "AI tutor". Đây là bài dự thi MIL của UNESCO, giám khảo là giới
//        giáo dục truyền thông; câu "An AI tutor that refuses to give you the
//        answer" là câu chốt của pitch video, web tiếng Anh phải khớp với nó.

export const STRINGS = {
  vi: {
    meta: {
      title: 'AskWise — Tự nhận diện tin tuyển dụng lừa đảo',
    },
    nav: {
      howItWorks: 'Cách hoạt động',
      whyTrust: 'Vì sao tin tưởng',
      cta: 'Phân tích ngay',
      home: 'Trang chủ',
      switchTo: 'Chuyển sang tiếng Anh',
    },
    chat: {
      selectTitle: 'Chọn một tình huống để luyện tập',
      selectIntro:
        'Mỗi tình huống là một tin đăng đáng ngờ có thật ngoài đời. Chọn một tin, rồi cùng đi qua 6 câu hỏi để tự đánh giá độ tin cậy.',
      startAnalysis: 'Bắt đầu phân tích →',
      stepOf: (current, total) => `Bước ${current}/${total}`,
      stepAria: (current, total) => `Bước ${current} trên ${total}`,
      aiLabel: 'AI',
      youLabel: 'Bạn',
      thinking: 'AI đang phân tích…',
      inputLabel: 'Nhập câu trả lời của bạn',
      inputPlaceholder: 'Nhập câu trả lời của bạn...',
      send: 'Gửi',
      sending: 'Đang gửi...',
      retry: 'Thử lại',
      doneTitle: 'Bạn đã hoàn thành phiên phân tích. 🎉',
      chooseAnother: 'Chọn case khác',
      errorGeneric: 'Không kết nối được tới AI. Vui lòng thử lại.',
    },
    errors: {
      timeout: 'Máy chủ phản hồi quá lâu (quá 25 giây). Vui lòng thử lại.',
      badPayload: 'Máy chủ AI trả về dữ liệu không hợp lệ. Vui lòng thử lại.',
      serverGeneric: 'Máy chủ AI gặp lỗi. Vui lòng thử lại.',
      emptyReply: 'Phản hồi từ AI không có nội dung hợp lệ.',
      http: (status) => `Apps Script trả về lỗi ${status}`,
    },
  },

  en: {
    meta: {
      title: 'AskWise — Spot recruitment scams yourself',
    },
    nav: {
      howItWorks: 'How it works',
      whyTrust: 'Why trust this',
      cta: 'Analyse now',
      home: 'Home',
      switchTo: 'Switch to Vietnamese',
    },
    chat: {
      selectTitle: 'Pick a posting to work through',
      selectIntro:
        'Each one is a real recruitment scam pattern seen in Viet Nam. Pick a posting, then work through six questions and judge it for yourself.',
      startAnalysis: 'Start analysing →',
      stepOf: (current, total) => `Step ${current}/${total}`,
      stepAria: (current, total) => `Step ${current} of ${total}`,
      aiLabel: 'AI',
      youLabel: 'You',
      thinking: 'The tutor is thinking…',
      inputLabel: 'Type your answer',
      inputPlaceholder: 'Type your answer...',
      send: 'Send',
      sending: 'Sending...',
      retry: 'Try again',
      doneTitle: 'Session complete. 🎉',
      chooseAnother: 'Pick another posting',
      errorGeneric: 'Could not reach the AI. Please try again.',
    },
    errors: {
      timeout: 'The server took too long (over 25 seconds). Please try again.',
      badPayload: 'The AI server returned unreadable data. Please try again.',
      serverGeneric: 'The AI server hit an error. Please try again.',
      emptyReply: 'The AI reply came back empty.',
      http: (status) => `Apps Script returned error ${status}`,
    },
  },
}
