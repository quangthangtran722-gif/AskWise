// Bộ chữ song ngữ. VI là bản gốc — khi sửa copy, sửa VI trước rồi mới dịch EN,
// đừng dịch ngược lại.
//
// Lưu ý về khung từ ngữ (khác nhau CÓ CHỦ ĐÍCH giữa 2 ngôn ngữ):
//   VI — cấm mọi khung "học/khoá học/bài tập/gia sư/học sinh/giáo viên".
//        AskWise tự định vị là công cụ thực dụng chống lừa đảo.
//   EN — dùng "AI tutor". Đây là bài dự thi MIL của UNESCO, giám khảo là giới
//        giáo dục truyền thông; câu "An AI tutor that refuses to give you the
//        answer" là câu chốt của pitch video, web tiếng Anh phải khớp với nó.
//
// Số liệu ở `stats` và trích dẫn ở `testimonials` là MINH HOẠ. Nhãn "Dữ liệu
// minh hoạ" / "Illustrative" phải giữ ở cả hai ngôn ngữ, đừng bỏ khi dịch.

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
    hero: {
      badge: 'Phương pháp Socrates · rèn kỹ năng tự nhận diện lừa đảo',
      headlineA: 'Không ai kết luận thay bạn.',
      headlineB: 'Bạn tự nhìn ra dấu hiệu.',
      intro:
        'Đưa vào một tin tuyển dụng đáng ngờ, AskWise đặt câu hỏi dẫn dắt từng bước để bạn thấy điều bất thường bằng chính mắt mình — thay vì nghe một lời cảnh báo rồi quên.',
      ctaPrimary: 'Thử ngay — miễn phí',
      ctaSecondary: 'Xem cách hoạt động',
      disclaimer:
        'Được vận hành bởi AI và có thể trả lời chưa chính xác hoàn toàn — hãy tự mình kiểm chứng, đừng để ai bảo bạn phải tin điều gì.',
    },
    demo: {
      header: 'AskWise · ví dụ minh hoạ',
      replay: 'Xem lại đoạn hội thoại mẫu',
      srIntro: 'Ví dụ minh hoạ cách AskWise trò chuyện:',
      aiName: 'AskWise',
      youName: 'Bạn',
      script: [
        { role: 'ai', text: 'Tin này khiến bạn thấy hấp dẫn hay nghi ngờ trước?' },
        { role: 'user', text: 'Nghi ngờ, nhưng lương cao thật sự hấp dẫn.' },
        { role: 'ai', text: 'Bạn có biết ai đứng sau tin tuyển dụng này không?' },
        { role: 'user', text: 'Không, chỉ có link Telegram để liên hệ.' },
      ],
    },
    why: {
      title: 'Vì sao không đưa đáp án ngay?',
      intro:
        'Socrates tin rằng chúng ta tin vào điều gì đó nhất khi tự mình nhận ra, không phải khi được bảo phải tin. Đó là nguyên tắc duy nhất mà AskWise tuân theo.',
      oldLabel: 'Cách cảnh báo thông thường',
      newLabel: 'Cùng AskWise',
      rows: [
        {
          old: 'Đưa đáp án ngay khi bạn hỏi',
          next: 'Đặt câu hỏi ngược để bạn tự suy luận',
        },
        {
          old: 'Bạn chép lại kết luận, quên sau vài ngày',
          next: 'Bạn tự ráp nối manh mối, nhớ lâu hơn',
        },
        {
          old: 'Không biết mình bỏ sót dấu hiệu nào',
          next: 'AI chỉ ra đúng chỗ bạn đang lướt qua',
        },
      ],
    },
    how: {
      title: 'Cách hoạt động',
      intro: 'Ba bước đơn giản, bắt đầu ngay từ tình huống đầu tiên.',
      steps: [
        {
          title: '1. Chọn một tin đáng ngờ',
          desc: 'Chọn 1 trong 6 tình huống tin tuyển dụng có dấu hiệu lừa đảo — không cần tài khoản.',
        },
        {
          title: '2. AskWise dẫn dắt 6 bước',
          desc: 'Thay vì phán thẳng, AskWise hỏi ngược để bạn tự lộ ra các dấu hiệu bất thường.',
        },
        {
          title: '3. Bạn tự kết luận',
          desc: 'Khi tự nhận ra cờ đỏ, bạn sẽ cảnh giác lâu dài — chứ không chỉ nghe cảnh báo suông.',
        },
      ],
    },
    features: {
      title: 'Vì sao AskWise hiệu quả',
      intro:
        'Không phải một công cụ tra cứu — mà là cách rèn cho bạn phản xạ tự thẩm định thông tin.',
      items: [
        {
          title: 'Không cho đáp án sẵn',
          description: 'AI không phán thay — bạn tự suy luận nên nhớ lâu và tự tin hơn.',
        },
        {
          title: 'Dẫn dắt 6 bước',
          description: 'Sáu câu hỏi ngắn đưa bạn đi từ trực giác đến kết luận có cơ sở.',
        },
        {
          title: 'Bám tình huống thật',
          description: 'Sáu dạng tin tuyển dụng lừa đảo phổ biến ngoài đời.',
        },
        {
          title: 'Miễn phí, không cần tài khoản',
          description: 'Vào là dùng ngay, không đăng ký, không rào cản.',
        },
        {
          title: 'Không thu thập dữ liệu',
          description: 'Bạn tự mang thông tin vào phân tích; không lưu hồ sơ cá nhân.',
        },
        {
          title: 'Nhận diện dấu hiệu bất thường',
          description: 'Bắt các cờ đỏ: lương cao bất thường, hối thúc, phí đặt cọc.',
        },
        {
          title: 'Kiểm chứng nguồn tin',
          description: 'Rèn thói quen đối chiếu qua kênh chính thống trước khi tin.',
        },
        {
          title: 'Áp dụng cho mọi thông tin',
          description: 'Kỹ năng không chỉ cho tin tuyển dụng — mà mọi thứ cần thẩm định.',
        },
      ],
    },
    stats: {
      badge: 'Dữ liệu minh hoạ — sẽ cập nhật số liệu thật khi ra mắt',
      bigTitle: 'Câu hỏi dẫn dắt đã đặt ra',
      bigDesc:
        'Mỗi câu hỏi giúp một người tự nhận ra dấu hiệu đáng ngờ thay vì bị phán thay.',
      panel: 'Tự thẩm định thông tin — không cần ai phán thay.',
      subs: [
        'Dạng lừa đảo đã phân tích',
        'Mỗi phiên phân tích',
        'Người dùng thấy tự tin hơn',
      ],
      subValues: ['6', '6 bước', '92%'],
    },
    testimonials: {
      title: 'Vì sao có thể tin tưởng',
      intro:
        'Sản phẩm còn mới nên các trích dẫn dưới đây là ví dụ minh hoạ cho trải nghiệm dự kiến — sẽ thay bằng phản hồi thật sau khi ra mắt.',
      teamLabel: 'Nhóm làm AskWise — rê chuột để xem từng người',
      illustrative: 'Ví dụ minh hoạ',
      quotes: [
        {
          quote:
            'Lúc đầu hơi khó chịu vì AI không phán thẳng là lừa đảo, nhưng qua vài câu hỏi mình tự thấy các dấu hiệu — giờ đọc tin tuyển dụng cảnh giác hơn hẳn.',
          role: 'Sinh viên năm 2',
        },
        {
          quote:
            'Mình từng suýt đặt cọc một "việc nhẹ lương cao". Thử phân tích ở đây mới nhận ra mấy cờ đỏ mình đã bỏ qua.',
          role: 'Người tìm việc',
        },
        {
          quote:
            'Mình cho người nhà lớn tuổi dùng thử để tập cảnh giác với tin nhắn lạ — cách đặt câu hỏi khiến họ tự suy nghĩ thay vì nghe theo.',
          role: 'Nhân viên văn phòng',
        },
      ],
    },
    cta: {
      title: 'Sẵn sàng tự đánh giá một tin đáng ngờ?',
      intro: 'Không cần tài khoản. Chọn một tình huống và bắt đầu phân tích ngay.',
      secondary: 'Cách hoạt động',
      primary: 'Phân tích ngay',
      copyright: (year) =>
        `© ${year} AskWise — dự án của nhóm THE TANK, UNESCO Youth Hackathon 2026. Không liên kết với Socrates lịch sử.`,
      disclaimer:
        'Nội dung do AI tạo ra có thể chưa chính xác — luôn tự kiểm chứng qua kênh chính thức của doanh nghiệp.',
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
    hero: {
      badge: 'The Socratic method · train yourself to spot scams',
      headlineA: 'Nobody hands you the verdict.',
      headlineB: 'You spot the signs yourself.',
      intro:
        'Bring in a suspicious job posting and AskWise walks you through it one question at a time, until you see what is off with your own eyes — instead of being warned and forgetting.',
      ctaPrimary: 'Try it — free',
      ctaSecondary: 'See how it works',
      disclaimer:
        'Powered by AI, so it can be wrong — check things for yourself, and never let anyone tell you what to believe.',
    },
    demo: {
      header: 'AskWise · illustrative example',
      replay: 'Replay the sample conversation',
      srIntro: 'An illustrative example of how AskWise talks:',
      aiName: 'AskWise',
      youName: 'You',
      script: [
        { role: 'ai', text: 'Does this posting feel appealing first, or suspicious first?' },
        { role: 'user', text: 'Suspicious — but the pay is genuinely tempting.' },
        { role: 'ai', text: 'Do you know who is actually behind this posting?' },
        { role: 'user', text: 'No, there is only a Telegram link to contact.' },
      ],
    },
    why: {
      title: 'Why not just give you the answer?',
      intro:
        'Socrates held that we believe something most firmly when we work it out ourselves, not when we are told to believe it. That is the one principle AskWise follows.',
      oldLabel: 'How warnings usually work',
      newLabel: 'With AskWise',
      rows: [
        {
          old: 'Hands you the verdict the moment you ask',
          next: 'Asks you back, so you reason it out',
        },
        {
          old: 'You copy the conclusion, forget it in days',
          next: 'You connect the clues, so it sticks',
        },
        {
          old: 'You never learn which sign you missed',
          next: 'The tutor points at the one you skimmed past',
        },
      ],
    },
    how: {
      title: 'How it works',
      intro: 'Three simple steps — start with the very first posting.',
      steps: [
        {
          title: '1. Pick a suspicious posting',
          desc: 'Choose one of six real recruitment-scam patterns — no account needed.',
        },
        {
          title: '2. AskWise walks you through six steps',
          desc: 'Instead of ruling on it, AskWise asks back until the odd details surface.',
        },
        {
          title: '3. You reach the conclusion',
          desc: 'Spotting the red flags yourself is what makes the caution last — a warning alone does not.',
        },
      ],
    },
    features: {
      title: 'Why AskWise works',
      intro:
        'Not a lookup tool — a way to build the reflex of checking things for yourself.',
      items: [
        {
          title: 'No ready-made answers',
          description: 'The tutor never rules for you, so your own reasoning is what sticks.',
        },
        {
          title: 'Six guided steps',
          description: 'Six short questions take you from a hunch to a grounded conclusion.',
        },
        {
          title: 'Built on real cases',
          description: 'Six recruitment-scam patterns actually circulating in Viet Nam.',
        },
        {
          title: 'Free, no account',
          description: 'Open it and start. No sign-up, no barrier.',
        },
        {
          title: 'No data collection',
          description: 'You bring the posting in; no personal profile is stored.',
        },
        {
          title: 'Spot the warning signs',
          description: 'Catch the red flags: unusual pay, urgency, upfront fees.',
        },
        {
          title: 'Verify the source',
          description: 'Build the habit of checking an official channel before believing.',
        },
        {
          title: 'Works on any claim',
          description: 'The skill is not limited to job postings — it applies to anything.',
        },
      ],
    },
    stats: {
      badge: 'Illustrative data — real figures will replace these at launch',
      bigTitle: 'Guiding questions asked',
      bigDesc:
        'Every question helps someone spot a warning sign themselves instead of being told.',
      panel: 'Judge information yourself — nobody needs to rule for you.',
      subs: [
        'Scam patterns covered',
        'Per analysis session',
        'Users felt more confident',
      ],
      subValues: ['6', '6 steps', '92%'],
    },
    testimonials: {
      title: 'Why you can trust this',
      intro:
        'The product is new, so the quotes below are illustrative of the intended experience — they will be replaced with real feedback after launch.',
      teamLabel: 'The team behind AskWise — hover to meet them',
      illustrative: 'Illustrative example',
      quotes: [
        {
          quote:
            'At first it was frustrating that the AI would not just say "scam", but after a few questions I saw the signs myself — I read job postings far more carefully now.',
          role: 'Second-year student',
        },
        {
          quote:
            'I nearly paid a deposit for an "easy money" job. Working through it here showed me the red flags I had walked straight past.',
          role: 'Job seeker',
        },
        {
          quote:
            'I had an older relative try it to build a habit against strange messages — being asked made them think, rather than just comply.',
          role: 'Office worker',
        },
      ],
    },
    cta: {
      title: 'Ready to judge a suspicious posting yourself?',
      intro: 'No account needed. Pick a posting and start analysing.',
      secondary: 'How it works',
      primary: 'Analyse now',
      copyright: (year) =>
        `© ${year} AskWise — a project by Team THE TANK, UNESCO Youth Hackathon 2026. Not affiliated with the historical Socrates.`,
      disclaimer:
        'AI-generated content can be inaccurate — always verify through the company’s official channels.',
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
