import { useState, useEffect } from "react";
import { useReveal, SectionHeader } from "./useReveal";
import { BookOpen, Tag, Clock, ArrowRight, X } from "lucide-react";

const posts = [
  {
    id: 1,
    title: "Getting Started with Docker: Containers Demystified",
    date: "Apr 2026",
    readTime: "5 min read",
    tags: ["Docker", "DevOps", "Containers"],
    summary: "Containers changed how we deploy software. Here's how I went from zero to running my first Dockerized Python app at CloudKeeper.",
    content: `When I joined CloudKeeper as a DevOps Trainee, Docker was one of the first technologies I had to get hands-on with — fast. Here's what I wish someone had told me on day one.

**What is a Container?**
Think of a container as a lightweight, portable box that holds your application and everything it needs to run — the code, runtime, libraries, and config. Unlike VMs, containers share the host OS kernel, making them much faster to start and more efficient with resources.

**My First Dockerfile**
The moment things clicked for me was writing my first Dockerfile for a Python script:

\`\`\`
FROM python:3.11-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY . .
CMD ["python", "app.py"]
\`\`\`

Build it, run it, done. The app behaves the same on my laptop, on staging, and in production.

**Key Commands to Know**
- \`docker build -t myapp .\` — builds your image
- \`docker run -p 8080:8080 myapp\` — runs it with port mapping
- \`docker ps\` — see running containers
- \`docker logs <id>\` — debug output

**What's Next?**
Once you're comfortable with single containers, the natural progression is Docker Compose (multi-container apps) and then Kubernetes for orchestration at scale — which I'm actively learning now.

Containers aren't magic, but they're pretty close. Start small, experiment often, break things in dev so production stays clean.`,
  },
  {
    id: 2,
    title: "AWS vs GCP: My Take After Working with Both",
    date: "Mar 2026",
    readTime: "6 min read",
    tags: ["AWS", "GCP", "Cloud"],
    summary: "Two major clouds, one trainee's perspective. What's different, what's similar, and which one feels more intuitive to work with day-to-day.",
    content: `At CloudKeeper, I get exposure to both AWS and GCP regularly. Here's my honest comparison after a few months of working with both.

**The Big Picture**
AWS is the market leader with a staggering number of services. GCP is Google's offering — arguably cleaner APIs and excellent data/ML tooling. Both are enterprise-grade and both will get you where you need to go.

**Identity & Access Management**
Both have robust IAM systems. AWS IAM uses policies attached to users, groups, and roles. GCP uses a simpler "who has what role on which resource" model that I personally find more intuitive when starting out. The principle of least privilege applies to both — never give more permissions than needed.

**Compute**
- AWS EC2 = GCP Compute Engine (VMs)
- AWS Lambda = GCP Cloud Functions (serverless)
- AWS EKS = GCP GKE (managed Kubernetes — GKE is often praised as more polished since Google invented Kubernetes)

**Storage**
- AWS S3 = GCP Cloud Storage. Both are object storage, both have similar pricing structures. S3 has a slight edge in ecosystem integrations.

**My Day-to-Day Feel**
GCP's console feels a bit more organized for a beginner. AWS has more community resources, Stack Overflow answers, and YouTube tutorials — which matters a lot when you're learning.

**Verdict**
Don't choose a religion — learn both. The concepts (VPC, IAM, object storage, managed Kubernetes) transfer directly. The syntax and console change, but the thinking stays the same.`,
  },
  {
    id: 3,
    title: "Linux Commands Every DevOps Engineer Should Know",
    date: "Feb 2026",
    readTime: "4 min read",
    tags: ["Linux", "DevOps", "CLI"],
    summary: "The terminal is your best friend in DevOps. Here are the commands I use most at work and why understanding them deeply matters.",
    content: `Linux is the backbone of most cloud infrastructure. Whether you're SSHing into an EC2 instance, debugging a container, or writing a deployment script — you need to be comfortable in the terminal.

**File & Directory Navigation**
\`\`\`
ls -la          # list all files with permissions
cd /var/log     # navigate to logs
pwd             # where am I?
find / -name "config.yaml" 2>/dev/null   # find a file
\`\`\`

**Process Management**
\`\`\`
ps aux          # all running processes
top / htop      # live resource monitor
kill -9 <pid>   # force kill a process
systemctl status nginx   # check a service
\`\`\`

**Networking**
\`\`\`
curl -I https://example.com   # check HTTP headers
netstat -tulnp  # open ports and listeners
ping 8.8.8.8    # connectivity check
ssh -i key.pem user@ip   # SSH into a server
\`\`\`

**Log Analysis**
\`\`\`
tail -f /var/log/syslog   # follow logs in real time
grep "ERROR" app.log      # filter for errors
cat access.log | awk '{print $1}' | sort | uniq -c | sort -rn
\`\`\`

**Disk & Memory**
\`\`\`
df -h    # disk usage
du -sh * # folder sizes
free -h  # memory usage
\`\`\`

**Why It Matters**
In cloud environments, GUIs aren't always available. When a production server is misbehaving at 2am, your command-line fluency is what gets things back online. Practice these daily — they become muscle memory fast.`,
  },
];

function PostModal({ post, onClose, theme }) {
  const isDark = theme === "dark";
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  return (
    <div className="fixed inset-0 z-[150] flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
      <div
        className={`relative z-10 w-full max-w-2xl max-h-[85vh] overflow-y-auto border ${
          isDark ? "bg-zinc-900 border-zinc-700" : "bg-white border-zinc-200"
        } shadow-2xl`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal header */}
        <div className={`sticky top-0 flex items-start justify-between gap-4 p-6 border-b ${isDark ? "border-zinc-800 bg-zinc-900" : "border-zinc-100 bg-white"}`}>
          <div>
            <div className="flex flex-wrap gap-1.5 mb-2">
              {post.tags.map((t) => <span key={t} className="tag">{t}</span>)}
            </div>
            <h2 className={`text-lg font-bold leading-snug ${isDark ? "text-zinc-100" : "text-zinc-900"}`}>{post.title}</h2>
            <div className={`flex gap-3 mt-2 text-xs font-mono ${isDark ? "text-zinc-500" : "text-zinc-400"}`}>
              <span>{post.date}</span>
              <span>·</span>
              <span>{post.readTime}</span>
            </div>
          </div>
          <button onClick={onClose} className={`flex-shrink-0 p-1 ${isDark ? "text-zinc-500 hover:text-zinc-200" : "text-zinc-400 hover:text-zinc-700"} transition-colors`}>
            <X size={18} />
          </button>
        </div>
        {/* Content */}
        <div className={`p-6 prose prose-sm max-w-none font-mono text-xs leading-relaxed whitespace-pre-wrap ${isDark ? "text-zinc-400" : "text-zinc-600"}`}>
          {post.content}
        </div>
      </div>
    </div>
  );
}

function PostCard({ post, onOpen, delay, theme }) {
  const ref = useReveal();
  const isDark = theme === "dark";

  return (
    <div
      ref={ref}
      className={`reveal neon-border card-hover p-5 cursor-pointer flex flex-col gap-3 ${isDark ? "bg-zinc-900/50" : "bg-white border-zinc-200"}`}
      style={{ transitionDelay: `${delay}s` }}
      onClick={() => onOpen(post)}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex flex-wrap gap-1.5">
          {post.tags.map((t) => <span key={t} className="tag">{t}</span>)}
        </div>
        <div className={`flex items-center gap-1 text-[10px] font-mono flex-shrink-0 ${isDark ? "text-zinc-600" : "text-zinc-400"}`}>
          <Clock size={10} />
          {post.readTime}
        </div>
      </div>
      <h3 className={`font-bold text-sm leading-snug ${isDark ? "text-zinc-100" : "text-zinc-900"}`}>{post.title}</h3>
      <p className={`text-xs leading-relaxed ${isDark ? "text-zinc-500" : "text-zinc-500"}`}>{post.summary}</p>
      <div className={`flex items-center justify-between pt-2 border-t ${isDark ? "border-zinc-800" : "border-zinc-100"}`}>
        <span className={`text-xs font-mono ${isDark ? "text-zinc-600" : "text-zinc-400"}`}>{post.date}</span>
        <span className={`flex items-center gap-1 text-xs font-mono ${isDark ? "text-cyan-400" : "text-cyan-600"} group-hover:gap-2 transition-all`}>
          read post <ArrowRight size={11} />
        </span>
      </div>
    </div>
  );
}

export default function Blog({ theme }) {
  const [open, setOpen] = useState(null);
  const isDark = theme === "dark";

  return (
    <section id="blog" className="py-24 px-6 max-w-6xl mx-auto">
      <SectionHeader
        label="// 06 — blog"
        title="Notes & Writing"
        subtitle="DevOps learnings, cloud breakdowns, and things I wish I knew sooner."
      />

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {posts.map((p, i) => (
          <PostCard key={p.id} post={p} onOpen={setOpen} delay={i * 0.1} theme={theme} />
        ))}
      </div>

      <div className={`mt-8 border border-dashed p-4 text-center ${isDark ? "border-zinc-800" : "border-zinc-200"}`}>
        <span className={`text-xs font-mono ${isDark ? "text-zinc-600" : "text-zinc-400"}`}>
          More posts coming soon — follow on{" "}
          <a href="https://linkedin.com/in/randeep-arora-1b336a105" target="_blank" rel="noreferrer" className={isDark ? "text-cyan-400 hover:underline" : "text-cyan-600 hover:underline"}>
            LinkedIn ↗
          </a>
        </span>
      </div>

      {open && <PostModal post={open} onClose={() => setOpen(null)} theme={theme} />}
    </section>
  );
}
