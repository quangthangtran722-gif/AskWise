import { useEffect, useRef, useState } from 'react'
import scenarios from '../data/scenarios.json'
import debrief from '../data/debrief.json'
import { askSocraticTutor } from '../services/aiService'
import CaseSelector from './CaseSelector'
import { Button } from './ui/button'
import { Typing } from './ui/typing'
import './Chat.css'

const DEBRIEF_STEPS = debrief.steps
const DEBRIEF_CLOSING = debrief.closing

// Backend đánh số "Question 6 of 6" ở câu cuối; nhận diện để chuyển sang debrief.
function isFinalQuestion(text) {
  return /6\s*(of|\/|trên)\s*6/i.test(text)
}

function Chat() {
  const [messages, setMessages] = useState([])
  const [draft, setDraft] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  // 'select' = chọn case | 'chat' = hỏi-đáp backend | 'debrief' = 4 câu client | 'done'
  const [phase, setPhase] = useState('select')
  const [debriefStep, setDebriefStep] = useState(0)
  const bottomRef = useRef(null)
  // Nguồn sự thật duy nhất của hội thoại — tránh stale-closure ghi đè.
  const convRef = useRef([])

  useEffect(() => {
    // scrollIntoView với behavior tường minh sẽ ghi đè CSS scroll-behavior,
    // nên phải tự kiểm tra prefers-reduced-motion ở tầng JS.
    const prefersReduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches
    bottomRef.current?.scrollIntoView({
      behavior: prefersReduced ? 'auto' : 'smooth',
      block: 'end',
    })
  }, [messages, isLoading])

  // Cập nhật đồng thời ref (đọc ngay) và state (render).
  function commit(next) {
    convRef.current = next
    setMessages(next)
  }

  function append(role, text) {
    commit([...convRef.current, { id: convRef.current.length + 1, role, text }])
  }

  async function sendToTutor(history) {
    setError('')
    setIsLoading(true)
    try {
      const reply = await askSocraticTutor(history)
      append('ai', reply)
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Không kết nối được tới AI. Vui lòng thử lại.',
      )
    } finally {
      setIsLoading(false)
    }
  }

  // Chọn 1 case → seed tình huống (role user) và gửi lên backend ngay.
  function startSession(scenario) {
    const seed = { id: 1, role: 'user', text: scenario.seed }
    setPhase('chat')
    setDebriefStep(0)
    setError('')
    setDraft('')
    commit([seed])
    sendToTutor([seed])
  }

  // Về lại màn chọn case, xoá toàn bộ hội thoại.
  function resetToSelect() {
    convRef.current = []
    setMessages([])
    setDebriefStep(0)
    setError('')
    setDraft('')
    setPhase('select')
  }

  function lastAiText() {
    for (let i = convRef.current.length - 1; i >= 0; i -= 1) {
      if (convRef.current[i].role === 'ai') return convRef.current[i].text
    }
    return ''
  }

  // Ghi câu trả lời debrief, rồi hiện câu kế tiếp hoặc lời chốt.
  function answerDebrief(answerText) {
    append('user', answerText)
    const next = debriefStep + 1
    if (next < DEBRIEF_STEPS.length) {
      append('ai', DEBRIEF_STEPS[next].question)
      setDebriefStep(next)
    } else {
      append('ai', DEBRIEF_CLOSING)
      setDebriefStep(next)
      setPhase('done')
    }
  }

  async function handleSubmit(e) {
    e.preventDefault()
    const text = draft.trim()
    if (!text || isLoading) return

    // Câu tự luận của debrief (câu 4) đi qua cùng ô nhập liệu.
    if (phase === 'debrief' && DEBRIEF_STEPS[debriefStep]?.type === 'text') {
      setDraft('')
      answerDebrief(text)
      return
    }

    setDraft('')

    // Đây là câu trả lời cho câu 6 (câu cuối backend)? → sang debrief, KHÔNG
    // gọi backend lần thứ 7.
    const wasFinal = phase === 'chat' && isFinalQuestion(lastAiText())
    append('user', text)

    if (wasFinal) {
      setPhase('debrief')
      setDebriefStep(0)
      append('ai', DEBRIEF_STEPS[0].question)
      return
    }

    await sendToTutor(convRef.current)
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e)
    }
  }

  if (phase === 'select') {
    return <CaseSelector scenarios={scenarios} onSelect={startSession} />
  }

  // Backend thỉnh thoảng lỗi transient / timeout — cho gửi lại lượt đang chờ.
  const lastMsg = messages[messages.length - 1]
  const canRetry =
    !!error && !isLoading && phase === 'chat' && lastMsg?.role === 'user'

  const showChoice =
    phase === 'debrief' && DEBRIEF_STEPS[debriefStep]?.type === 'choice'
  const showTextInput =
    phase === 'chat' ||
    (phase === 'debrief' && DEBRIEF_STEPS[debriefStep]?.type === 'text')

  // Bước hiện tại (1..6), suy ra từ nhãn "Bước N/6" của câu hỏi backend mới nhất
  // — chỉ đọc, không đụng logic API/seed/debrief.
  const currentStep = (() => {
    for (let i = messages.length - 1; i >= 0; i -= 1) {
      if (messages[i].role === 'ai') {
        const m = messages[i].text.match(/Bước\s*(\d+)\s*\/\s*6/i)
        if (m) return Math.min(Number(m[1]), 6)
      }
    }
    return 0
  })()

  return (
    <div className="chat">
      {phase === 'chat' && currentStep >= 1 && (
        <div
          className="chat-progress"
          role="progressbar"
          aria-valuemin={1}
          aria-valuemax={6}
          aria-valuenow={currentStep}
          aria-label={`Bước ${currentStep} trên 6`}
        >
          <div className="chat-progress-track">
            {Array.from({ length: 6 }, (_, i) => (
              <span
                key={i}
                className={`chat-progress-seg${i < currentStep ? ' is-done' : ''}`}
              />
            ))}
          </div>
          <span className="chat-progress-label">Bước {currentStep}/6</span>
        </div>
      )}

      <div className="chat-log" role="log" aria-live="polite">
        {messages.map((message) => (
          <div key={message.id} className={`bubble bubble-${message.role}`}>
            <span className="bubble-label">
              {message.role === 'ai' ? 'AI' : 'Bạn'}
            </span>
            <p>{message.text}</p>
          </div>
        ))}

        {isLoading && (
          <div className="bubble bubble-ai" aria-live="polite">
            <span className="bubble-label">AI</span>
            {/* Chờ có thể tới ~20s (thinking model) — nói rõ để không bị hiểu là treo.
                Chấm động chỉ là trang trí; câu chữ mới là thứ đọc cho screen reader. */}
            <div className="mt-2 flex items-center gap-2.5">
              <Typing
                aria-hidden="true"
                className="w-8 py-1 text-[var(--color-primary)]"
              />
              <span className="text-sm opacity-60">AI đang phân tích…</span>
            </div>
          </div>
        )}

        {error && (
          <div className="chat-error" role="alert">
            <span>{error}</span>
            {canRetry && (
              <Button
                type="button"
                variant="outline"
                className="min-h-11 shrink-0"
                onClick={() => sendToTutor(convRef.current)}
              >
                Thử lại
              </Button>
            )}
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {showChoice && (
        <div className="debrief-options">
          {DEBRIEF_STEPS[debriefStep].options.map((option) => (
            <Button
              key={option}
              type="button"
              variant="outline"
              className="h-auto min-h-11 w-full justify-start rounded-xl px-4 py-2.5 text-left text-base font-normal whitespace-normal"
              onClick={() => answerDebrief(option)}
            >
              {option}
            </Button>
          ))}
        </div>
      )}

      {showTextInput && (
        <form className="chat-input" onSubmit={handleSubmit}>
          <label htmlFor="chat-message" className="sr-only">
            Nhập câu trả lời của bạn
          </label>
          <textarea
            id="chat-message"
            rows={1}
            placeholder="Nhập câu trả lời của bạn..."
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={isLoading}
          />
          <Button
            type="submit"
            disabled={!draft.trim() || isLoading}
            className="h-11 shrink-0 rounded-xl bg-[var(--color-accent-button)] px-5 text-base text-accent-foreground hover:bg-[var(--color-accent-button)] hover:opacity-90"
          >
            {isLoading ? 'Đang gửi...' : 'Gửi'}
          </Button>
        </form>
      )}

      {phase === 'done' && (
        <div className="chat-done">
          <p role="status">Bạn đã hoàn thành phiên phân tích. 🎉</p>
          <Button variant="outline" onClick={resetToSelect}>
            Chọn case khác
          </Button>
        </div>
      )}
    </div>
  )
}

export default Chat
