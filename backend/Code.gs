/**
 * AskWise — Google Apps Script backend (Web App)
 *
 * Đây là bản đã hardening. Cách dùng: mở Apps Script project, Ctrl+A ở file
 * Code.gs rồi dán ĐÈ toàn bộ file này. Xem backend/HUONG-DAN-DEPLOY.md.
 *
 * File này KHÔNG được Vercel build — nó nằm trong repo chỉ để version cùng
 * frontend và làm nguồn sự thật khi bàn giao.
 */

// ===================== SYSTEM PROMPT (GIỮ NGUYÊN, KHÔNG SỬA) =====================
const SYSTEM_PROMPT = `
You are a Socratic tutor helping someone evaluate a real situation
that may involve a manipulated or scam job posting. Your goal is for
the USER to reach their own conclusion through guided questions —
you only share your own assessment at the very end, after they have
summarized their own thinking.

Guide the user through exactly 6 main questions, strictly in this
order:
(1) Pause — their first reaction or gut feeling.
(2) Trace the source — where the posting came from, who posted it.
(3) Spot the signs — what details seem unusual or too good.
(4) Reverse-search — how they could verify it independently
    (searching the exact text + "scam", reverse image search).
(5) Primary source — how they could confirm through an official
    company channel (website, verified careers page).
(6) Transparency — what they still cannot be sure about.

Rules:
- On your very FIRST reply only: open with 2-3 warm sentences —
  tell the user this is a quick guided exercise of 6 short
  questions practicing MIL (media & information literacy), an
  essential and often-overlooked skill for checking any suspicious
  posting by yourself; there are no right or wrong answers, just
  honest impressions; and you will share your own honest take at
  the end. Do not explain MIL further than one sentence. Then ask
  question 1 in the SAME message. Never repeat this intro.
- Label each main question with its number, e.g. "Question 3 of 6:".
  Follow-up questions are not numbered.
- Ask ONE question per turn, 1-2 sentences, conversational, not
  preachy.
- Briefly acknowledge the user's previous answer before each
  question, and base your question on what they said.
- Refer only to details the user actually provided. NEVER invent
  names, platforms, people, or facts that are not in the user's
  posting or answers. If something is unknown, call it unknown.
- If an answer is vague or the user misunderstood, ask AT MOST ONE
  gentle follow-up, including a small hint (e.g., what one could
  type into a search engine). If they still don't engage, state the
  hint briefly yourself and move to the next question.
- If the user seems impatient or disengaged ("i don't care", "ok
  then", "just tell me"), acknowledge it, tell them how few
  questions remain, and keep your remaining questions extra short.
  If they clearly want to stop, skip ahead to the Ending sequence.
- If the user asks for a verdict mid-way, warmly remind them the
  honest take comes at the end (it's only a few questions away) and
  continue.
- Apart from the early-exit case above, NEVER state any assessment
  or verdict before the user's own summary.

Ending sequence:
- After question 6, ask the user to summarize in their own words
  what they now believe about the posting and why.
- ONLY AFTER their summary, close with a short recap (max 5
  sentences): acknowledge their reasoning, list the key warning
  signs THEY uncovered, give your own honest assessment of the
  posting, and name one thing that still remains unverified.
- End by telling them that what they just practiced is called media
  & information literacy (MIL) — a skill they can now reuse on any
  suspicious posting.

Example of a good FIRST reply:
User: "Remote data entry job. $20/day. No experience needed. Contact
via Telegram only. Should I apply?"
You: "Great that you paused to check before applying! Let's practice
a skill called MIL (media & information literacy) — an essential
skill most people were never taught — through 6 short questions
about this posting. No right or wrong answers, and I'll give you my
honest take at the end. Question 1 of 6: what was your very first
gut feeling when you read this offer?"

Example of what you must NEVER do mid-conversation:
"This posting shows several red flags: Telegram-only contact, no
experience required..." (Verdict + list. Only the final recap may
contain your assessment.)

REMEMBER: one question per turn, at most one follow-up per step,
never invent details, and no verdict until the user's summary (or
until they clearly quit).`;

// ===================== CẤU HÌNH =====================
const MODEL = "gemini-3-flash-preview"; // Chỉ đổi sang bản GA SAU KHI đọc log (xem HUONG-DAN-DEPLOY.md)
const API_URL = "https://generativelanguage.googleapis.com/v1beta/models/";
const MAX_ATTEMPTS = 3; // 1 lần gọi + 2 lần thử lại
const RETRY_CODES = [429, 500, 502, 503, 504];
const RETRY_DELAYS_MS = [700, 1500]; // tổng thời gian chờ thêm tối đa ~2.2s

function jsonOut(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}

/** Gemini CHỈ nhận role "user" | "model". Frontend đang gửi "assistant". */
function normalizeRole(role) {
  return (role === "model" || role === "assistant" || role === "ai") ? "model" : "user";
}

/**
 * Dựng mảng contents cho Gemini:
 * - chuẩn hoá role
 * - gộp các lượt liên tiếp cùng role (xảy ra khi 1 lượt gửi lỗi rồi user gõ tiếp)
 * - đảm bảo lượt đầu tiên là "user"
 */
function buildContents(messages) {
  if (!Array.isArray(messages)) return [];
  const out = [];
  for (const m of messages) {
    if (!m || typeof m.text !== "string" || !m.text.trim()) continue;
    const role = normalizeRole(m.role);
    const prev = out[out.length - 1];
    if (prev && prev.role === role) {
      prev.parts[0].text += "\n\n" + m.text;
    } else {
      out.push({ role: role, parts: [{ text: m.text }] });
    }
  }
  while (out.length && out[0].role !== "user") out.shift();
  return out;
}

/**
 * Thinking model có thể trả về "thought part" không chứa text ở parts[0].
 * Phải quét hết parts, bỏ phần thought, rồi nối lại — không giả định parts[0].
 */
function extractReply(candidate) {
  const parts = candidate && candidate.content && candidate.content.parts;
  if (!Array.isArray(parts)) return "";
  return parts
    .filter(function (p) { return p && !p.thought && typeof p.text === "string"; })
    .map(function (p) { return p.text; })
    .join("")
    .trim();
}

// ===================== ENDPOINT =====================
function doPost(e) {
  const t0 = Date.now();
  try {
    if (!e || !e.postData || !e.postData.contents) {
      return jsonOut({ error: "EMPTY_BODY", message: "Không nhận được dữ liệu." });
    }

    let body;
    try {
      body = JSON.parse(e.postData.contents);
    } catch (parseErr) {
      console.error("BAD_JSON: " + String(parseErr));
      return jsonOut({ error: "BAD_JSON", message: "Dữ liệu gửi lên không phải JSON hợp lệ." });
    }

    const contents = buildContents(body.messages);
    if (!contents.length) {
      return jsonOut({ error: "NO_MESSAGES", message: "Hội thoại rỗng." });
    }

    const apiKey = PropertiesService.getScriptProperties().getProperty("GEMINI_KEY");
    if (!apiKey) {
      console.error("NO_API_KEY: thiếu GEMINI_KEY trong Script Properties.");
      return jsonOut({ error: "NO_API_KEY", message: "Máy chủ chưa được cấu hình khoá API." });
    }

    const payload = JSON.stringify({
      systemInstruction: { parts: [{ text: SYSTEM_PROMPT }] },
      contents: contents,
      generationConfig: { temperature: 0.5, maxOutputTokens: 2048 }
    });

    let lastError = { error: "UNKNOWN", message: "Không gọi được máy chủ AI." };

    for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {
      const res = UrlFetchApp.fetch(
        API_URL + MODEL + ":generateContent?key=" + apiKey,
        {
          method: "post",
          contentType: "application/json",
          payload: payload,
          muteHttpExceptions: true
        }
      );

      // ĐỌC STATUS TRƯỚC — không JSON.parse vội, vì gateway có thể trả về HTML.
      const code = res.getResponseCode();
      const raw = res.getContentText();

      // --- Lỗi tạm thời: nghỉ ngắn rồi thử lại ---
      if (RETRY_CODES.indexOf(code) !== -1) {
        console.warn("Gemini HTTP " + code + " (lần " + attempt + "/" + MAX_ATTEMPTS + ") — " + raw.slice(0, 300));
        lastError = { error: "UPSTREAM_" + code, message: "Máy chủ AI đang quá tải. Vui lòng thử lại." };
        if (attempt < MAX_ATTEMPTS) {
          Utilities.sleep(RETRY_DELAYS_MS[attempt - 1]);
          continue;
        }
        break;
      }

      // --- Lỗi cố định (400 payload sai, 403 key sai, 404 tên model sai): retry vô ích ---
      if (code !== 200) {
        console.error("Gemini HTTP " + code + " — " + raw.slice(0, 500));
        return jsonOut({ error: "UPSTREAM_" + code, message: "Gọi máy chủ AI thất bại (" + code + ")." });
      }

      let data;
      try {
        data = JSON.parse(raw);
      } catch (parseErr) {
        console.error("Gemini trả về không phải JSON — " + raw.slice(0, 500));
        return jsonOut({ error: "BAD_UPSTREAM_JSON", message: "Phản hồi từ máy chủ AI không đọc được." });
      }

      if (data.promptFeedback && data.promptFeedback.blockReason) {
        console.warn("Prompt bị chặn: " + data.promptFeedback.blockReason);
        return jsonOut({ error: "PROMPT_BLOCKED", message: "Nội dung bị bộ lọc an toàn chặn. Thử diễn đạt khác." });
      }

      const candidate = data.candidates && data.candidates[0];
      if (!candidate) {
        console.error("Không có candidate — " + raw.slice(0, 500));
        return jsonOut({ error: "NO_CANDIDATE", message: "AI không trả về nội dung. Vui lòng thử lại." });
      }

      const reply = extractReply(candidate);
      if (!reply) {
        console.error("Candidate rỗng, finishReason=" + candidate.finishReason + " — " + raw.slice(0, 500));
        return jsonOut({
          error: "EMPTY_TEXT",
          finishReason: candidate.finishReason || null,
          message: "AI trả về nội dung rỗng. Vui lòng thử lại."
        });
      }

      console.log(
        "OK · " + contents.length + " lượt · " + (Date.now() - t0) + "ms · " +
        "thử lần " + attempt + " · finishReason=" + candidate.finishReason
      );
      return jsonOut({ reply: reply });
    }

    console.error("Hết lượt thử sau " + (Date.now() - t0) + "ms — " + lastError.error);
    return jsonOut(lastError);

  } catch (err) {
    console.error("Exception: " + (err && err.stack ? err.stack : String(err)));
    return jsonOut({ error: "SERVER_EXCEPTION", message: String(err) });
  }
}

// ===================== TEST TRONG EDITOR =====================
function testChat() {
  // Dùng role "assistant" đúng như frontend gửi thật, để kiểm tra normalizeRole().
  const fake = {
    postData: {
      contents: JSON.stringify({
        messages: [
          { role: "user", text: "Remote data entry job. $20/day. No experience needed. Contact via Telegram only. Should I apply?" },
          { role: "assistant", text: "Question 1 of 6: what was your very first gut feeling?" },
          { role: "user", text: "Hơi nghi ngờ vì lương cao mà không cần kinh nghiệm." }
        ]
      })
    }
  };
  console.log(doPost(fake).getContent());
}

function doGet() {
  return ContentService.createTextOutput("AskWise backend is running ✓ Send POST requests here.");
}
