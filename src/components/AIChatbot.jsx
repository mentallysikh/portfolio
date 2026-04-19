import { useState, useRef, useEffect } from "react";
import { X, Send, Bot, User, Minimize2, Maximize2, Terminal } from "lucide-react";

const SYSTEM_PROMPT = `You are Randeep Arora's personal portfolio AI assistant. Answer questions about Randeep concisely and professionally.

Here is everything you know about Randeep:

NAME: Randeep Singh Arora
LOCATION: Dwarka, New Delhi, India
EMAIL: singhrandeep623@gmail.com
LINKEDIN: linkedin.com/in/randeep-arora-1b336a105
GITHUB: github.com/mentallysikh
PORTFOLIO: sikhomode.space

CURRENT ROLE: DevOps Trainee at CloudKeeper (2026–Present)
- Works with AWS and GCP (compute, storage, IAM)
- Hands-on with Docker containerization and Kubernetes basics
- CI/CD pipelines, version control, deployment workflows
- Infrastructure configuration and cloud-based application support
- Scalable architecture and cloud best practices

PAST EXPERIENCE:
- Virtual Assistant at Amazon.com (Sep 2024–May 2025): customer support using CRM and Linux-based tools
- Front-End Developer Intern at Appflix Studios (Aug–Oct 2023): HTML/CSS/JS, responsive redesign

EDUCATION:
- MCA (Master of Computer Applications), Vivekananda Institute of Professional Studies, 2024–2026
- BCA, Maharaja Surajmal Institute of Technology, 2021–2024, CGPA: 9.0

TECHNICAL SKILLS:
- Cloud: AWS (EC2, S3, IAM), Google Cloud Platform
- Containers: Docker, Kubernetes (basics)
- DevOps: CI/CD pipelines, Git, GitHub, deployment workflows
- Systems: Linux, Shell scripting
- Programming: Python, Java, C++, SQL
- Web: HTML5, CSS3, JavaScript, REST APIs
- AI/ML: Pandas, Scikit-Learn, OpenCV, MediaPipe
- Tools: VS Code, Power BI, GitHub

LANGUAGES: English (Fluent), Hindi (Fluent), German (Beginner 🇩🇪)

PROJECTS:
1. Containerized Python Application – Docker, Python, Linux, OpenCV
2. Gesture Control Engine – Python, OpenCV, MediaPipe, real-time hand tracking
3. Sales Prediction & Analytics Dashboard – Python, SQL, Power BI, Scikit-Learn
4. Website UX/UI Revamp for Appflix Studio – HTML, CSS, JavaScript

CERTIFICATIONS:
- IBM Data Science Professional Certificate (2025)
- Microsoft Power BI – Be10x, Credential ID: 27 (2025)

Currently learning: Kubernetes (CKA), Terraform, AWS Solutions Architect, GitHub Actions, Prometheus & Grafana, German B1

Keep answers short (2-4 sentences max unless a list is needed). Be friendly and professional. If asked something not about Randeep, say you can only help with questions about Randeep Arora's portfolio.`;

const SUGGESTIONS = [
  "What does Randeep do at CloudKeeper?",
  "What are his top skills?",
  "Tell me about his projects",
  "Is he open to opportunities?",
  "What certifications does he have?",
];

export default function AIChatbot({ theme, onClose }) {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "Hey! I'm Randeep's AI assistant. Ask me anything about his skills, experience, or projects. 👋",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [minimized, setMinimized] = useState(false);
  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const isDark = theme === "dark";

  const send = async (text) => {
    const q = text || input.trim();
    if (!q || loading) return;
    setInput("");

    const newMessages = [...messages, { role: "user", content: q }];
    setMessages(newMessages);
    setLoading(true);

    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          system: SYSTEM_PROMPT,
          messages: newMessages.map((m) => ({ role: m.role, content: m.content })),
        }),
      });
      const data = await res.json();
      const reply = data?.content?.[0]?.text || "Sorry, I couldn't get a response. Try again!";
      setMessages((prev) => [...prev, { role: "assistant", content: reply }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Connection error. Please try again in a moment." },
      ]);
    }
    setLoading(false);
  };

  const bg = isDark ? "bg-zinc-900" : "bg-white";
  const border = isDark ? "border-zinc-700" : "border-zinc-200";
  const textMain = isDark ? "text-zinc-100" : "text-zinc-900";
  const textMuted = isDark ? "text-zinc-500" : "text-zinc-400";
  const inputBg = isDark ? "bg-zinc-800 border-zinc-700 text-zinc-100 placeholder-zinc-600" : "bg-zinc-50 border-zinc-200 text-zinc-900 placeholder-zinc-400";
  const userBubble = isDark ? "bg-cyan-500/20 text-cyan-100 border border-cyan-500/30" : "bg-cyan-600 text-white";
  const botBubble = isDark ? "bg-zinc-800 text-zinc-200 border border-zinc-700" : "bg-zinc-100 text-zinc-800 border border-zinc-200";
  const accent = isDark ? "text-cyan-400" : "text-cyan-600";

  return (
    <div
      className={`fixed bottom-6 right-6 z-[200] ${border} border shadow-2xl transition-all duration-300 ${bg} ${
        minimized ? "w-64 h-12" : "w-[360px] sm:w-[400px] h-[520px]"
      } flex flex-col`}
      style={{ boxShadow: isDark ? "0 0 40px rgba(34,211,238,0.1)" : "0 20px 60px rgba(0,0,0,0.15)" }}
    >
      {/* Header */}
      <div className={`flex items-center justify-between px-4 py-3 border-b ${border} flex-shrink-0`}>
        <div className="flex items-center gap-2">
          <div className={`w-6 h-6 flex items-center justify-center ${isDark ? "bg-cyan-400/15 border border-cyan-400/40" : "bg-cyan-100 border border-cyan-300"}`}>
            <Terminal size={12} className={accent} />
          </div>
          <span className={`text-xs font-mono font-bold ${accent}`}>randeep.ai</span>
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
        </div>
        <div className="flex items-center gap-1">
          <button onClick={() => setMinimized((m) => !m)} className={`p-1 ${textMuted} hover:${textMain} transition-colors`}>
            {minimized ? <Maximize2 size={13} /> : <Minimize2 size={13} />}
          </button>
          <button onClick={onClose} className={`p-1 ${textMuted} hover:${textMain} transition-colors`}>
            <X size={13} />
          </button>
        </div>
      </div>

      {!minimized && (
        <>
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 text-sm">
            {messages.map((m, i) => (
              <div key={i} className={`flex gap-2 ${m.role === "user" ? "flex-row-reverse" : "flex-row"}`}>
                <div className={`w-6 h-6 flex-shrink-0 flex items-center justify-center ${
                  m.role === "user"
                    ? isDark ? "bg-zinc-700" : "bg-zinc-200"
                    : isDark ? "bg-cyan-400/15 border border-cyan-400/30" : "bg-cyan-50 border border-cyan-200"
                }`}>
                  {m.role === "user"
                    ? <User size={11} className={textMuted} />
                    : <Bot size={11} className={accent} />}
                </div>
                <div className={`max-w-[78%] px-3 py-2 text-xs leading-relaxed font-mono ${
                  m.role === "user" ? userBubble : botBubble
                }`}>
                  {m.content}
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex gap-2 items-center">
                <div className={`w-6 h-6 flex-shrink-0 flex items-center justify-center ${isDark ? "bg-cyan-400/15 border border-cyan-400/30" : "bg-cyan-50 border border-cyan-200"}`}>
                  <Bot size={11} className={accent} />
                </div>
                <div className={`px-3 py-2 text-xs font-mono ${botBubble}`}>
                  <span className="flex gap-1">
                    <span className="animate-bounce" style={{ animationDelay: "0ms" }}>.</span>
                    <span className="animate-bounce" style={{ animationDelay: "150ms" }}>.</span>
                    <span className="animate-bounce" style={{ animationDelay: "300ms" }}>.</span>
                  </span>
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Suggestions (only on first message) */}
          {messages.length === 1 && (
            <div className={`px-4 pb-2 flex flex-wrap gap-1.5 border-t ${border} pt-3`}>
              {SUGGESTIONS.map((s) => (
                <button
                  key={s}
                  onClick={() => send(s)}
                  className={`text-[10px] font-mono px-2 py-1 border transition-colors ${
                    isDark
                      ? "border-zinc-700 text-zinc-400 hover:border-cyan-400/50 hover:text-cyan-400"
                      : "border-zinc-200 text-zinc-500 hover:border-cyan-400 hover:text-cyan-600"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <div className={`px-4 pb-4 pt-2 border-t ${border} flex gap-2`}>
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && send()}
              placeholder="Ask about Randeep..."
              className={`flex-1 text-xs px-3 py-2 border font-mono outline-none focus:border-cyan-400/60 transition-colors ${inputBg}`}
            />
            <button
              onClick={() => send()}
              disabled={loading || !input.trim()}
              className={`px-3 py-2 flex items-center justify-center transition-all ${
                isDark
                  ? "bg-cyan-400 text-zinc-950 hover:bg-cyan-300 disabled:opacity-40"
                  : "bg-cyan-600 text-white hover:bg-cyan-700 disabled:opacity-40"
              }`}
            >
              <Send size={13} />
            </button>
          </div>
        </>
      )}
    </div>
  );
}
