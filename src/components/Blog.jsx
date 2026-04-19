import { useState, useEffect } from "react";
import { X, Clock, ChevronRight, BookOpen, Lock, Plus, Trash2, Eye, EyeOff, Save, LogOut, PenLine, ArrowLeft } from "lucide-react";

// ─────────────────────────────────────────────────────────────────────────────
// ADMIN PASSWORD — default is: randeep2026
// To change: open browser console → run:
//   await crypto.subtle.digest('SHA-256', new TextEncoder().encode('yournewpassword'))
//     .then(b => [...new Uint8Array(b)].map(x=>x.toString(16).padStart(2,'0')).join(''))
// Then paste the result below
const ADMIN_HASH = "4fe4a6863707cab8056ce29dd38cd6200d6cb4016f792f5858415896e4cf7cbb";
// ─────────────────────────────────────────────────────────────────────────────

const DEFAULT_POSTS = [
  {
    id: "1",
    title: "Docker in Practice: From Dev to Deployment",
    date: "Apr 2026",
    readTime: "6 min",
    color: "#00f5ff",
    tags: ["Docker", "DevOps", "Containers"],
    excerpt: "My hands-on journey containerizing a Python app — writing Dockerfiles, building images, managing networks, and deploying with Compose.",
    content: `Docker fundamentally changed how I think about software deployment. Instead of "it works on my machine," you ship the entire environment.

**Writing the Dockerfile**
The Dockerfile is your blueprint. Start with a base image (python:3.11-slim for a small footprint), COPY your code, install dependencies, EXPOSE the port, and define CMD.

\`\`\`dockerfile
FROM python:3.11-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY . .
EXPOSE 8000
CMD ["python", "app.py"]
\`\`\`

**Building and Running**
\`docker build -t myapp:v1 .\` creates the image. \`docker run -p 8000:8000 myapp:v1\` spins it up. Simple and reproducible.

**Docker Compose for Multi-Container**
Real apps need databases, caches, and services. Compose orchestrates all of them in a single YAML — spinning up a web app, PostgreSQL, and Redis with one \`docker compose up\`.

**Key takeaway:** Containers eliminate environment inconsistencies. Once you build the image, it runs identically everywhere.`,
  },
  {
    id: "2",
    title: "AWS vs GCP: My First 3 Months Hands-On",
    date: "Mar 2026",
    readTime: "7 min",
    color: "#00ff88",
    tags: ["AWS", "GCP", "Cloud"],
    excerpt: "A practical comparison after three months working with both platforms at CloudKeeper — IAM, compute, storage, and where each shines.",
    content: `Working with both AWS and GCP at CloudKeeper gave me a practical understanding of where each platform excels.

**IAM: Both powerful, GCP more intuitive**
AWS IAM is incredibly granular. GCP's IAM is simpler: roles are bound to resources, and the inheritance model (Organization to Folder to Project) is cleaner to reason about.

**Compute: EC2 vs Compute Engine**
EC2 has a massive instance catalog. GCP's Compute Engine offers custom machine types (exact vCPUs and RAM), great for cost optimization.

**Storage: S3 vs Cloud Storage**
S3's bucket policies, versioning, and lifecycle rules are industry-standard. GCP Cloud Storage is simpler but achieves the same goals.

**When I'd choose each:**
AWS: existing enterprise tooling, Lambda/serverless, wide third-party support. GCP: Kubernetes (GKE is the best managed K8s), BigQuery for analytics, simpler pricing.

**Biggest learning:** The concepts transfer. Understand IAM, compute, storage, networking on one platform and you can navigate the other.`,
  },
  {
    id: "3",
    title: "Linux CLI Skills Every DevOps Engineer Needs",
    date: "Feb 2026",
    readTime: "5 min",
    color: "#b97cff",
    tags: ["Linux", "CLI", "DevOps"],
    excerpt: "The 20% of Linux commands that handle 80% of real DevOps work — process management, log parsing, and network debugging.",
    content: `After daily Linux work at CloudKeeper and Amazon, here are the commands that actually matter in production.

**Process Management**
ps aux | grep [process] — find running processes. kill -9 [PID] — force-kill. htop — visual process monitor. systemctl status/start/stop [service] — manage system services.

**Log Analysis**
tail -f /var/log/app.log — follow logs in real-time. grep -i "error" app.log | tail -50 — find recent errors. journalctl -u nginx --since "1 hour ago" — systemd service logs.

**File Operations**
find / -name "*.conf" -type f 2>/dev/null — find configs. rsync -avz source/ dest/ — sync files efficiently. tar -czf backup.tar.gz /data — compress directories.

**Network Debugging**
curl -v https://api.example.com — test HTTP endpoints. ss -tlnp — check open ports. ping, traceroute, dig — connectivity and DNS.

**The mindset:** Pipe commands together. cat | grep | awk | sort | uniq — one-liners that replace entire scripts.`,
  },
];

async function hashPassword(pw) {
  const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(pw));
  return [...new Uint8Array(buf)].map((x) => x.toString(16).padStart(2, "0")).join("");
}

function loadPosts() {
  try { return JSON.parse(localStorage.getItem("ra-blog-posts")) || DEFAULT_POSTS; }
  catch { return DEFAULT_POSTS; }
}
function savePosts(posts) { localStorage.setItem("ra-blog-posts", JSON.stringify(posts)); }

const COLORS = ["#00f5ff", "#00ff88", "#b97cff", "#ff6b35"];

function PostReader({ post, theme, onBack }) {
  const isDark = theme === "dark";
  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center gap-3 px-6 py-4 border-b flex-shrink-0"
        style={{ borderColor: isDark ? "rgba(0,245,255,0.08)" : "rgba(0,0,0,0.08)" }}>
        <button onClick={onBack}
          className="flex items-center gap-1.5 text-xs mono transition-colors"
          style={{ color: isDark ? "#4a6580" : "#5a7a99" }}
          onMouseEnter={(e) => e.currentTarget.style.color = post.color}
          onMouseLeave={(e) => e.currentTarget.style.color = isDark ? "#4a6580" : "#5a7a99"}>
          <ArrowLeft size={13} /> back to posts
        </button>
        <div className="flex-1" />
        <span className="text-[10px] mono flex items-center gap-1" style={{ color: isDark ? "#4a6580" : "#5a7a99" }}>
          <Clock size={9} /> {post.readTime} read
        </span>
      </div>

      <div className="flex-1 overflow-y-auto px-6 py-6">
        <div className="flex flex-wrap gap-1.5 mb-4">
          {post.tags.map((t) => (
            <span key={t} className="text-[9px] mono px-2 py-0.5"
              style={{ background: `${post.color}10`, color: post.color, border: `1px solid ${post.color}25` }}>{t}</span>
          ))}
        </div>
        <h2 className="text-2xl font-black mb-2 leading-tight"
          style={{ color: isDark ? "#e8f4fd" : "#0f2040", letterSpacing: "-0.01em" }}>{post.title}</h2>
        <div className="text-[10px] mono mb-8" style={{ color: isDark ? "#4a6580" : "#5a7a99" }}>{post.date}</div>

        <div className="space-y-4 max-w-2xl">
          {post.content.split("\n\n").map((para, i) => {
            if (para.startsWith("```")) {
              const code = para.replace(/```\w*\n?/, "").replace(/```$/, "");
              return (
                <pre key={i} className="p-4 text-[11px] mono overflow-x-auto"
                  style={{ background: isDark ? "#040b14" : "#f8fafc", border: `1px solid ${isDark ? "rgba(0,245,255,0.1)" : "rgba(0,0,0,0.06)"}`, color: isDark ? "#8ba9c0" : "#2d5074" }}>
                  {code}
                </pre>
              );
            }
            if (para.startsWith("**") && para.endsWith("**")) {
              return <h3 key={i} className="font-bold text-sm pt-2" style={{ color: post.color }}>{para.replace(/\*\*/g, "")}</h3>;
            }
            return <p key={i} className="text-sm leading-loose" style={{ color: isDark ? "#8ba9c0" : "#2d5074" }}>{para}</p>;
          })}
        </div>
      </div>
    </div>
  );
}

function PostCard({ post, theme, onClick, onDelete, isAdmin }) {
  const isDark = theme === "dark";
  return (
    <div
      className="group p-5 flex flex-col gap-3 cursor-pointer transition-all duration-200 relative"
      style={{ background: isDark ? "rgba(7,13,26,0.75)" : "rgba(255,255,255,0.85)", border: `1px solid ${isDark ? "rgba(0,245,255,0.08)" : "rgba(0,119,182,0.1)"}`, backdropFilter: "blur(12px)" }}
      onMouseEnter={(e) => { e.currentTarget.style.borderColor = `${post.color}35`; e.currentTarget.style.transform = "translateY(-2px)"; }}
      onMouseLeave={(e) => { e.currentTarget.style.borderColor = isDark ? "rgba(0,245,255,0.08)" : "rgba(0,119,182,0.1)"; e.currentTarget.style.transform = "none"; }}
      onClick={onClick}
    >
      {isAdmin && (
        <button onClick={(e) => { e.stopPropagation(); onDelete(post.id); }}
          className="absolute top-3 right-3 p-1.5 opacity-0 group-hover:opacity-100 transition-opacity text-red-400 hover:bg-red-400/10"
          title="Delete post">
          <Trash2 size={12} />
        </button>
      )}
      <div className="flex items-center justify-between gap-2">
        <div className="flex flex-wrap gap-1.5">
          {post.tags.map((t) => (
            <span key={t} className="text-[9px] mono px-2 py-0.5"
              style={{ background: `${post.color}10`, color: post.color, border: `1px solid ${post.color}25` }}>{t}</span>
          ))}
        </div>
        <span className="text-[10px] mono flex-shrink-0 flex items-center gap-1" style={{ color: isDark ? "#4a6580" : "#5a7a99" }}>
          <Clock size={9} />{post.readTime}
        </span>
      </div>
      <h3 className="font-bold text-sm leading-snug" style={{ color: isDark ? "#e8f4fd" : "#0f2040" }}>{post.title}</h3>
      <p className="text-xs leading-relaxed flex-1" style={{ color: isDark ? "#8ba9c0" : "#2d5074" }}>{post.excerpt}</p>
      <div className="flex items-center justify-between pt-3 border-t text-[10px] mono"
        style={{ borderColor: isDark ? "rgba(0,245,255,0.07)" : "rgba(0,119,182,0.09)" }}>
        <span style={{ color: isDark ? "#4a6580" : "#5a7a99" }}>{post.date}</span>
        <span className="flex items-center gap-1" style={{ color: post.color }}>read post <ChevronRight size={11} /></span>
      </div>
    </div>
  );
}

function AdminLogin({ theme, onLogin, onCancel }) {
  const [pw, setPw]     = useState("");
  const [err, setErr]   = useState("");
  const [show, setShow] = useState(false);
  const isDark = theme === "dark";

  const attempt = async () => {
    if (!pw.trim()) return;
    const h = await hashPassword(pw);
    if (h === ADMIN_HASH) { onLogin(); setErr(""); }
    else { setErr("Incorrect password."); setPw(""); }
  };

  return (
    <div className="flex flex-col items-center justify-center h-full gap-5 px-8">
      <div className="w-12 h-12 flex items-center justify-center"
        style={{ background: "rgba(0,245,255,0.08)", border: "1px solid rgba(0,245,255,0.2)" }}>
        <Lock size={20} className="text-[#00f5ff]" />
      </div>
      <div className="text-center">
        <div className="font-bold text-sm mb-1" style={{ color: isDark ? "#e8f4fd" : "#0f2040" }}>Admin Access</div>
        <div className="text-xs mono" style={{ color: isDark ? "#4a6580" : "#5a7a99" }}>Enter password to manage blog posts</div>
      </div>
      <div className="w-full max-w-xs flex flex-col gap-2">
        <div className="flex gap-2">
          <input
            type={show ? "text" : "password"}
            value={pw}
            onChange={(e) => setPw(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && attempt()}
            placeholder="Password"
            autoFocus
            className="flex-1 px-3 py-2 text-xs mono outline-none"
            style={{ background: isDark ? "#040b14" : "#f8fafc", border: `1px solid ${isDark ? "rgba(0,245,255,0.15)" : "rgba(0,119,182,0.2)"}`, color: isDark ? "#e8f4fd" : "#0f2040" }}
          />
          <button onClick={() => setShow((s) => !s)} className="px-2" style={{ color: isDark ? "#4a6580" : "#5a7a99" }}>
            {show ? <EyeOff size={14} /> : <Eye size={14} />}
          </button>
        </div>
        {err && <p className="text-[10px] text-red-400 mono">{err}</p>}
        <button onClick={attempt}
          className="py-2 text-xs font-bold mono transition-all"
          style={{ background: "var(--cyan)", color: "var(--bg-0)" }}>
          Login
        </button>
        <button onClick={onCancel}
          className="py-2 text-xs mono transition-all border"
          style={{ borderColor: isDark ? "rgba(0,245,255,0.15)" : "rgba(0,119,182,0.2)", color: isDark ? "#4a6580" : "#5a7a99" }}>
          Cancel
        </button>
      </div>
    </div>
  );
}

function AdminEditor({ theme, onSave, onCancel }) {
  const isDark = theme === "dark";
  const [title,    setTitle]    = useState("");
  const [excerpt,  setExcerpt]  = useState("");
  const [content,  setContent]  = useState("");
  const [tags,     setTags]     = useState("");
  const [readTime, setReadTime] = useState("5 min");
  const [color,    setColor]    = useState("#00f5ff");

  const handleSave = () => {
    if (!title.trim() || !content.trim()) return;
    const now = new Date();
    const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
    onSave({
      id: Date.now().toString(),
      title: title.trim(),
      excerpt: excerpt.trim() || content.trim().slice(0, 120) + "…",
      content: content.trim(),
      tags: tags.split(",").map((t) => t.trim()).filter(Boolean),
      readTime,
      color,
      date: `${months[now.getMonth()]} ${now.getFullYear()}`,
    });
  };

  const inp = `w-full px-3 py-2 text-xs mono outline-none transition-colors ${
    isDark
      ? "bg-[#040b14] border border-[rgba(0,245,255,0.15)] text-[#e8f4fd] placeholder-[#4a6580] focus:border-[rgba(0,245,255,0.4)]"
      : "bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-400"
  }`;

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between px-6 py-4 border-b flex-shrink-0"
        style={{ borderColor: isDark ? "rgba(0,245,255,0.08)" : "rgba(0,0,0,0.08)" }}>
        <div className="flex items-center gap-2">
          <PenLine size={14} className="text-[#00f5ff]" />
          <span className="text-sm font-bold mono" style={{ color: isDark ? "#e8f4fd" : "#0f2040" }}>New Post</span>
        </div>
        <button onClick={onCancel} className="text-[10px] mono" style={{ color: isDark ? "#4a6580" : "#5a7a99" }}>cancel</button>
      </div>

      <div className="flex-1 overflow-y-auto px-6 py-5 space-y-4">
        <div>
          <label className="text-[10px] mono block mb-1.5" style={{ color: isDark ? "#4a6580" : "#5a7a99" }}>Title *</label>
          <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Post title..." className={inp} />
        </div>
        <div>
          <label className="text-[10px] mono block mb-1.5" style={{ color: isDark ? "#4a6580" : "#5a7a99" }}>Tags (comma separated)</label>
          <input value={tags} onChange={(e) => setTags(e.target.value)} placeholder="Docker, DevOps, Linux" className={inp} />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-[10px] mono block mb-1.5" style={{ color: isDark ? "#4a6580" : "#5a7a99" }}>Read time</label>
            <input value={readTime} onChange={(e) => setReadTime(e.target.value)} placeholder="5 min" className={inp} />
          </div>
          <div>
            <label className="text-[10px] mono block mb-1.5" style={{ color: isDark ? "#4a6580" : "#5a7a99" }}>Accent color</label>
            <div className="flex gap-2">
              {COLORS.map((c) => (
                <button key={c} onClick={() => setColor(c)}
                  className="w-6 h-6 rounded-sm transition-transform hover:scale-110"
                  style={{ background: c, outline: color === c ? `2px solid ${c}` : "none", outlineOffset: "2px" }} />
              ))}
            </div>
          </div>
        </div>
        <div>
          <label className="text-[10px] mono block mb-1.5" style={{ color: isDark ? "#4a6580" : "#5a7a99" }}>Excerpt (optional)</label>
          <textarea value={excerpt} onChange={(e) => setExcerpt(e.target.value)}
            placeholder="Short description shown on the card..." rows={2} className={`${inp} resize-none`} />
        </div>
        <div>
          <label className="text-[10px] mono block mb-1.5" style={{ color: isDark ? "#4a6580" : "#5a7a99" }}>
            Content * — use **bold** for headings, triple backticks for code blocks
          </label>
          <textarea value={content} onChange={(e) => setContent(e.target.value)}
            placeholder="Write your post here..." rows={14} className={`${inp} resize-none`} />
        </div>
      </div>

      <div className="px-6 py-4 border-t flex gap-3"
        style={{ borderColor: isDark ? "rgba(0,245,255,0.08)" : "rgba(0,0,0,0.08)" }}>
        <button onClick={handleSave} disabled={!title.trim() || !content.trim()}
          className="flex items-center gap-2 px-5 py-2 text-xs font-bold mono disabled:opacity-40"
          style={{ background: "var(--cyan)", color: "var(--bg-0)" }}>
          <Save size={12} /> Publish Post
        </button>
        <button onClick={onCancel}
          className="px-5 py-2 text-xs mono border transition-colors"
          style={{ borderColor: isDark ? "rgba(0,245,255,0.15)" : "rgba(0,119,182,0.2)", color: isDark ? "#8ba9c0" : "#2d5074" }}>
          Cancel
        </button>
      </div>
    </div>
  );
}

// ── Main Blog Drawer ──────────────────────────────────────────────────────────
export default function Blog({ theme, open, onClose }) {
  const [posts,     setPosts]     = useState(loadPosts);
  const [reading,   setReading]   = useState(null);
  // adminView: false | "login" | "list" | "editor"
  const [adminView, setAdminView] = useState(false);
  const isDark = theme === "dark";

  const handleLogin      = () => setAdminView("list");
  const handleLogout     = () => setAdminView(false);
  const handleCancelLogin = () => setAdminView(false);
  const handleDeletePost = (id) => {
    const next = posts.filter((p) => p.id !== id);
    setPosts(next);
    savePosts(next);
  };
  const handleNewPost = (post) => {
    const next = [post, ...posts];
    setPosts(next);
    savePosts(next);
    setAdminView("list");
  };

  // Escape key navigation
  useEffect(() => {
    const onKey = (e) => {
      if (e.key !== "Escape") return;
      if (reading) { setReading(null); return; }
      if (adminView === "login") { setAdminView(false); return; }
      if (adminView === "editor") { setAdminView("list"); return; }
      onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [reading, adminView, onClose]);

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  if (!open) return null;

  const showHeader = !reading && adminView !== "editor" && adminView !== "login";

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-[400]"
        style={{ background: "rgba(2,4,9,0.7)", backdropFilter: "blur(6px)" }}
        onClick={() => {
          if (reading) { setReading(null); return; }
          if (adminView === "login") { setAdminView(false); return; }
          onClose();
        }}
      />

      {/* Drawer */}
      <div
        className="fixed top-0 right-0 h-full z-[401] flex flex-col"
        style={{
          width: "min(680px, 100vw)",
          background: isDark ? "#070d1a" : "#f8fafc",
          borderLeft: `1px solid ${isDark ? "rgba(0,245,255,0.12)" : "rgba(0,119,182,0.15)"}`,
          boxShadow: "-20px 0 60px rgba(0,0,0,0.4)",
          animation: "slideInRight 0.3s cubic-bezier(0.22,1,0.36,1) forwards",
        }}
      >
        {/* Header — shown on public and admin list views */}
        {showHeader && (
          <div className="flex items-center justify-between px-6 py-4 border-b flex-shrink-0"
            style={{ borderColor: isDark ? "rgba(0,245,255,0.08)" : "rgba(0,119,182,0.1)" }}>
            <div className="flex items-center gap-3">
              <div className="w-7 h-7 flex items-center justify-center"
                style={{ background: "rgba(0,245,255,0.08)", border: "1px solid rgba(0,245,255,0.2)" }}>
                <BookOpen size={13} className="text-[#00f5ff]" />
              </div>
              <div>
                <div className="font-bold text-sm" style={{ color: isDark ? "#e8f4fd" : "#0f2040" }}>Blog</div>
                <div className="text-[10px] mono" style={{ color: isDark ? "#4a6580" : "#5a7a99" }}>{posts.length} posts</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {adminView === "list" && (
                <>
                  <button onClick={() => setAdminView("editor")}
                    className="flex items-center gap-1.5 px-3 py-1.5 text-[10px] mono border transition-colors"
                    style={{ borderColor: "rgba(0,245,255,0.25)", color: "#00f5ff" }}>
                    <Plus size={10} /> New Post
                  </button>
                  <button onClick={handleLogout} className="p-1.5" style={{ color: isDark ? "#4a6580" : "#5a7a99" }} title="Logout">
                    <LogOut size={13} />
                  </button>
                </>
              )}
              {adminView === false && (
                <button onClick={() => setAdminView("login")}
                  className="p-1.5 transition-colors"
                  style={{ color: isDark ? "#4a6580" : "#5a7a99" }}
                  title="Admin login">
                  <Lock size={13} />
                </button>
              )}
              <button onClick={onClose} className="p-1.5 transition-colors" style={{ color: isDark ? "#4a6580" : "#5a7a99" }}>
                <X size={16} />
              </button>
            </div>
          </div>
        )}

        {/* Body */}
        <div className="flex-1 overflow-hidden">
          {reading ? (
            <PostReader post={reading} theme={theme} onBack={() => setReading(null)} />
          ) : adminView === "login" ? (
            <AdminLogin theme={theme} onLogin={handleLogin} onCancel={handleCancelLogin} />
          ) : adminView === "editor" ? (
            <AdminEditor theme={theme} onSave={handleNewPost} onCancel={() => setAdminView("list")} />
          ) : (
            <div className="h-full overflow-y-auto px-6 py-6">
              {posts.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-48 gap-3">
                  <BookOpen size={28} style={{ color: isDark ? "#4a6580" : "#5a7a99" }} />
                  <p className="text-xs mono" style={{ color: isDark ? "#4a6580" : "#5a7a99" }}>No posts yet.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {posts.map((post) => (
                    <PostCard key={post.id} post={post} theme={theme}
                      onClick={() => setReading(post)}
                      onDelete={handleDeletePost}
                      isAdmin={adminView === "list"}
                    />
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
