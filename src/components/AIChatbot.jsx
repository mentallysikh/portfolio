import { useState, useRef, useEffect } from "react";
import { X, Send, Bot, User, Minimize2, Maximize2, Sparkles, RefreshCw } from "lucide-react";

const SYSTEM_PROMPT = `You are Randeep Arora's personal AI portfolio assistant — sharp, friendly, and concise. Answer ONLY about Randeep. Keep answers to 2–4 sentences unless a list is clearest.

PROFILE:
Name: Randeep Singh Arora | Location: Dwarka, New Delhi, India
Email: singhrandeep623@gmail.com | LinkedIn: linkedin.com/in/randeep-arora-1b336a105
GitHub: github.com/mentallysikh | Portfolio: sikhomode.space

CURRENT ROLE: DevOps Trainee @ CloudKeeper (2026–Present)
• AWS & GCP (EC2, S3, IAM, compute, storage)
• Docker containerization & Kubernetes orchestration basics
• CI/CD pipelines, version control, deployment workflows
• Infrastructure config & cloud-based application support

PAST EXPERIENCE:
• Virtual Assistant @ Amazon (Sep 2024–May 2025): CRM, Linux-based tools, customer support
• Front-End Dev Intern @ Appflix Studios (Aug–Oct 2023): HTML/CSS/JS responsive redesign

EDUCATION:
• MCA – Vivekananda Institute of Professional Studies (2024–2026)
• BCA – Maharaja Surajmal Institute of Technology (2021–2024) CGPA: 9.0

SKILLS:
Cloud: AWS (EC2, S3, IAM), GCP | Containers: Docker, Kubernetes | DevOps: CI/CD, Git, GitHub
Systems: Linux, Shell scripting | Languages: Python, Java, C++, SQL
Web: HTML5, CSS3, JavaScript, REST APIs | AI/ML: Pandas, Scikit-Learn, OpenCV, MediaPipe
Tools: VS Code, Power BI | Spoken: English (Fluent), Hindi (Fluent), German (Beginner)

PROJECTS:
1. Containerized Python Application — Docker, Python, Linux, OpenCV
2. Gesture Control Engine — Python, OpenCV, MediaPipe, real-time hand tracking
3. Sales Prediction Dashboard — Python, SQL, Power BI, Scikit-Learn
4. Website UX/UI Revamp — Appflix Studio, HTML/CSS/JS

CERTIFICATIONS:
• IBM Data Science Professional Certificate (2025)
• Microsoft Power BI — Be10x (2025)

CURRENTLY LEARNING: Kubernetes CKA, Terraform, AWS Solutions Architect, GitHub Actions, Prometheus & Grafana, German B1

If asked something NOT about Randeep, reply: "I only answer questions about Randeep's portfolio. Ask me about his skills, projects, or experience!"`;

const SUGGESTIONS = [
  "What does he do at CloudKeeper?",
  "Tell me about his projects",
  "What cloud skills does he have?",
  "Is he open to opportunities?",
];

// ─── Paste your FREE Gemini API key here ─────────────────────────────────────
// Get one free at: https://aistudio.google.com → API Keys → Create API Key
const GEMINI_KEY = import.meta.env.VITE_GEMINI_KEY;
// ─────────────────────────────────────────────────────────────────────────────

// Uses gemini-2.5-flash — free tier: 10 RPM, 250 RPD
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent?key=${import.meta.env.VITE_GEMINI_KEY}`;

export default function AIChatbot({ theme, onClose }) {
  const [messages, setMessages] = useState([
    { role: "assistant", content: "Hey! I'm Randeep's AI assistant. Ask me anything about his skills, experience, or projects! 👋" },
  ]);
  const [input, setInput]     = useState("");
  const [loading, setLoading] = useState(false);
  const [minimized, setMin]   = useState(false);
  const bottomRef = useRef(null);
  const inputRef  = useRef(null);
  const isDark    = theme === "dark";

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages, loading]);

  const send = async (text) => {
    const q = (text || input).trim();
    if (!q || loading) return;
    setInput("");

    const history = [...messages, { role: "user", content: q }];
    setMessages(history);
    setLoading(true);

    try {
      // Build Gemini contents — inject system prompt into first user message
      const userMessages = history.filter((m, i) => !(i === 0 && m.role === "assistant"));
      const contents = userMessages.map((m, i) => ({
        role: m.role === "user" ? "user" : "model",
        parts: [{ text: i === 0 ? `${SYSTEM_PROMPT}\n\nUser: ${m.content}` : m.content }],
      }));

      const res  = await fetch(GEMINI_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contents }),
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error.message);

      const reply = data.candidates?.[0]?.content?.parts?.[0]?.text || "No response. Try again!";
      setMessages((prev) => [...prev, { role: "assistant", content: reply }]);
    } catch (e) {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: `⚠️ ${e.message || "Connection failed. Try again."}` },
      ]);
    }
    setLoading(false);
  };

  const clearChat = () =>
    setMessages([{ role: "assistant", content: "Chat cleared! Ask me anything about Randeep. 👋" }]);

  // ── Styles ──
  const bg      = isDark ? "bg-[#07101f] border-[rgba(0,245,255,0.15)]" : "bg-white border-[rgba(0,119,182,0.2)]";
  const hdr     = isDark ? "bg-[#040b14] border-b border-[rgba(0,245,255,0.1)]" : "bg-gray-50 border-b border-gray-200";
  const inpCls  = isDark
    ? "bg-[#040b14] border border-[rgba(0,245,255,0.15)] text-[#e8f4fd] placeholder-[#4a6580] focus:border-[rgba(0,245,255,0.5)]"
    : "bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-400 focus:border-blue-400";
  const uBub    = isDark ? "bg-[rgba(0,245,255,0.1)] border border-[rgba(0,245,255,0.2)] text-[#c8e8f0]" : "bg-blue-600 text-white";
  const bBub    = isDark ? "bg-[#040b14] border border-[rgba(0,245,255,0.08)] text-[#a8c4d8]" : "bg-gray-100 text-gray-800 border border-gray-200";
  const acc     = isDark ? "text-[#00f5ff]" : "text-blue-600";
  const mut     = isDark ? "text-[#4a6580]" : "text-gray-400";
  const sug     = isDark
    ? "border-[rgba(0,245,255,0.12)] text-[#4a6580] hover:border-[rgba(0,245,255,0.4)] hover:text-[#00f5ff] hover:bg-[rgba(0,245,255,0.04)]"
    : "border-gray-200 text-gray-500 hover:border-blue-400 hover:text-blue-600";

  return (
    <div
      className={`fixed bottom-6 right-6 z-[200] border shadow-2xl transition-all duration-300 flex flex-col ${bg} ${
        minimized ? "w-52 h-11" : "w-[370px] sm:w-[410px] h-[520px]"
      }`}
      style={{ boxShadow: isDark ? "0 0 40px rgba(0,245,255,0.08), 0 20px 60px rgba(0,0,0,0.5)" : "0 20px 60px rgba(0,0,0,0.12)" }}
    >
      {/* Header */}
      <div className={`flex items-center justify-between px-4 py-2.5 flex-shrink-0 ${hdr}`}>
        <div className="flex items-center gap-2">
          <div className={`w-5 h-5 flex items-center justify-center ${isDark ? "bg-[rgba(0,245,255,0.1)] border border-[rgba(0,245,255,0.3)]" : "bg-blue-50 border border-blue-200"}`}>
            <Sparkles size={10} className={acc} />
          </div>
          <span className={`text-xs font-semibold mono ${acc}`}>randeep.ai</span>
          <span className={`text-[10px] mono ${mut}`}>/ gemini-2.5</span>
          <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
        </div>
        <div className="flex items-center gap-1">
          <button onClick={clearChat} className={`p-1 ${mut} hover:text-white transition-colors`} title="Clear chat"><RefreshCw size={11} /></button>
          <button onClick={() => setMin((m) => !m)} className={`p-1 ${mut} hover:text-white transition-colors`}>{minimized ? <Maximize2 size={11} /> : <Minimize2 size={11} />}</button>
          <button onClick={onClose} className={`p-1 ${mut} hover:text-white transition-colors`}><X size={11} /></button>
        </div>
      </div>

      {!minimized && (
        <>
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map((m, i) => (
              <div key={i} className={`flex gap-2 ${m.role === "user" ? "flex-row-reverse" : ""}`}>
                <div className={`w-5 h-5 flex-shrink-0 flex items-center justify-center ${
                  m.role === "user"
                    ? isDark ? "bg-[#0c1628]" : "bg-gray-200"
                    : isDark ? "bg-[rgba(0,245,255,0.1)] border border-[rgba(0,245,255,0.25)]" : "bg-blue-50 border border-blue-200"
                }`}>
                  {m.role === "user" ? <User size={9} className={mut} /> : <Bot size={9} className={acc} />}
                </div>
                <div className={`max-w-[80%] px-3 py-2 text-[11px] leading-relaxed mono whitespace-pre-wrap ${m.role === "user" ? uBub : bBub}`}>
                  {m.content}
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex gap-2 items-center">
                <div className={`w-5 h-5 flex-shrink-0 flex items-center justify-center ${isDark ? "bg-[rgba(0,245,255,0.1)] border border-[rgba(0,245,255,0.25)]" : "bg-blue-50 border border-blue-200"}`}>
                  <Bot size={9} className={acc} />
                </div>
                <div className={`px-3 py-2 mono text-xs ${bBub}`}>
                  <span className="flex gap-1">
                    {[0, 150, 300].map((d) => (
                      <span key={d} className="animate-bounce inline-block" style={{ animationDelay: `${d}ms` }}>·</span>
                    ))}
                  </span>
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Suggestions */}
          {messages.length === 1 && (
            <div className={`px-4 pb-2 flex flex-wrap gap-1.5 border-t pt-2 ${isDark ? "border-[rgba(0,245,255,0.08)]" : "border-gray-100"}`}>
              {SUGGESTIONS.map((s) => (
                <button key={s} onClick={() => send(s)} className={`text-[9px] mono px-2 py-1 border transition-all rounded-sm ${sug}`}>{s}</button>
              ))}
            </div>
          )}

          {/* Input */}
          <div className={`px-4 pb-4 pt-2 border-t flex gap-2 ${isDark ? "border-[rgba(0,245,255,0.08)]" : "border-gray-100"}`}>
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && send()}
              placeholder="Ask about Randeep..."
              className={`flex-1 text-[11px] px-3 py-2 font-mono outline-none transition-colors ${inpCls}`}
            />
            <button
              onClick={() => send()}
              disabled={loading || !input.trim()}
              className="px-3 py-2 flex items-center justify-center disabled:opacity-40 transition-all hover:brightness-110"
              style={{ background: "var(--cyan)", color: "var(--bg-0)" }}
            >
              <Send size={12} />
            </button>
          </div>
        </>
      )}
    </div>
  );
}
