import React, { useState, useEffect, useRef } from 'react';
import { 
  Mail, Linkedin, Github, Code, Sparkles, 
  Cpu, Zap, MessageSquare, Send, 
  ArrowUpRight, Box, Layers, Minimize2, FileText, CheckCircle 
} from 'lucide-react';

export default function FuturePortfolio() {
  const [messages, setMessages] = useState([
    { role: 'model', text: "Hello. I am Randeep's digital avatar. Ask me about his projects, skills, or experience." }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatEndRef = useRef(null);

  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [formStatus, setFormStatus] = useState('idle');

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsLoading(true);

    setTimeout(() => {
      let responseText = "I'm not sure about that. Try asking about his 'projects', 'skills', or 'contact' info.";
      const lowerInput = userMsg.toLowerCase();

      if (lowerInput.includes('hello') || lowerInput.includes('hi')) {
        responseText = "Hello! I am Randeep's digital assistant. How can I help you today?";
      }
      else if (lowerInput.includes('skill') || lowerInput.includes('stack') || lowerInput.includes('tech')) {
        responseText = "Randeep is proficient in Python, Java, C++, React, SQL, and OpenCV. He specializes in Full Stack Development and AI integration.";
      }
      else if (lowerInput.includes('project') || lowerInput.includes('work')) {
        responseText = "He has built impressive projects like a Gesture Controlled Mouse (Computer Vision), a Deepfake Detection System, and this AI-powered portfolio!";
      }
      else if (lowerInput.includes('experience') || lowerInput.includes('job') || lowerInput.includes('amazon')) {
        responseText = "Randeep worked at Amazon as a Customer Service Associate (2024-2025) and as a Frontend Intern at Appflix Studio (2023).";
      }
      else if (lowerInput.includes('contact') || lowerInput.includes('email') || lowerInput.includes('reach')) {
        responseText = "You can reach him at arorarandeep06@gmail.com. He is actively looking for SDE Internships and Full-time Software roles.";
      }
      else if (lowerInput.includes('role') || lowerInput.includes('intern') || lowerInput.includes('position')) {
        responseText = "Randeep is open to Software Development Engineer (SDE) Internships, Frontend Developer roles, and AI/ML positions.";
      }

      setMessages(prev => [...prev, { role: 'model', text: responseText }]);
      setIsLoading(false);
    }, 1000);
  };

  const handleContactSubmit = (e) => {
    e.preventDefault();
    setFormStatus('sending');
    setTimeout(() => {
      setFormStatus('success');
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setFormStatus('idle'), 3000);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#030014] text-white font-sans selection:bg-purple-500/30 overflow-x-hidden">
      
      {/* AMBIENT BACKGROUND GLOWS */}
      <div className="fixed top-[-20%] left-[-10%] w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="fixed bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-6xl mx-auto px-6 py-12 relative z-10">
        
        {/* HERO SECTION */}
        <header className="mb-24 flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-purple-300 mb-6 backdrop-blur-md">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
              Open to Work: SDE Internships & Projects
            </div>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight bg-gradient-to-b from-white to-white/60 bg-clip-text text-transparent mb-4">
              Randeep Arora
            </h1>
            <p className="text-xl text-gray-400 max-w-lg leading-relaxed mb-8">
              Building the future with <span className="text-white font-medium">Modern Web Tech</span> and <span className="text-white font-medium">Artificial Intelligence</span>.
            </p>
            
            {/* DOWNLOAD RESUME BUTTON - UPDATED LINK */}
            <a 
              href="/Resume - Randeep Arora - Updated.pdf" 
              download
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-medium transition-all shadow-lg hover:shadow-blue-500/25"
            >
              <FileText size={20} />
              <span>Download Resume</span>
            </a>
          </div>
          
          <div className="flex gap-4">
            <SocialBtn icon={<Linkedin size={20}/>} href="https://www.linkedin.com/in/randeep-arora-1b336a105/" />
            <SocialBtn icon={<Github size={20}/>} href="https://github.com/mentallysikh" />
          </div>
        </header>

        {/* BENTO GRID LAYOUT */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-24">
          
          {/* CARD 1: MAIN PROJECT */}
          <a 
            href="https://github.com/mentallysikh/gesture-controlled-virtual-system" 
            target="_blank" 
            rel="noopener noreferrer"
            className="md:col-span-2 bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-xl hover:bg-white/10 transition-colors group cursor-pointer"
          >
            <div className="flex justify-between items-start mb-8">
              <div className="p-3 bg-purple-500/20 rounded-2xl text-purple-300">
                <Layers size={32} />
              </div>
              <div className="flex items-center gap-2 text-gray-500 group-hover:text-white transition-colors">
                <span className="text-xs font-bold tracking-wider">VIEW CODE</span>
                <ArrowUpRight size={20} />
              </div>
            </div>
            <h3 className="text-2xl font-bold mb-2">Gesture Control Engine</h3>
            <p className="text-gray-400 mb-6">
              A computer vision system that replaces physical peripherals. Built with Python, OpenCV, and MediaPipe to track hand landmarks in real-time with 98% accuracy.
            </p>
            <div className="flex gap-3">
              <Tag text="Python" />
              <Tag text="OpenCV" />
              <Tag text="Computer Vision" />
            </div>
          </a>

          {/* CARD 2: AI CHAT */}
          <div className="row-span-2 bg-gradient-to-b from-blue-900/40 to-purple-900/40 border border-white/10 rounded-3xl p-1 backdrop-blur-xl relative overflow-hidden">
            <div className="absolute inset-0 bg-noise opacity-20 pointer-events-none"></div>
            <div className="h-full flex flex-col bg-[#0a0a0a]/80 rounded-[22px] overflow-hidden relative z-10">
              <div className="p-4 border-b border-white/5 flex justify-between items-center bg-white/5">
                <div className="flex items-center gap-2">
                  <Sparkles size={16} className="text-yellow-400" />
                  <span className="font-medium text-sm">Ask my AI</span>
                </div>
                <div className="text-[10px] text-gray-500">POWERED BY SIM-AI</div>
              </div>
              
              <div className="flex-1 p-4 overflow-y-auto space-y-3 scrollbar-hide">
                {messages.map((msg, i) => (
                  <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[85%] text-sm p-3 rounded-2xl ${
                      msg.role === 'user' 
                      ? 'bg-blue-600 text-white rounded-br-none' 
                      : 'bg-white/10 text-gray-200 rounded-bl-none'
                    }`}>
                      {msg.text}
                    </div>
                  </div>
                ))}
                {isLoading && <div className="text-xs text-gray-500 animate-pulse ml-2">Thinking...</div>}
                <div ref={chatEndRef}></div>
              </div>

              <form onSubmit={handleSend} className="p-3 border-t border-white/10 flex gap-2 relative z-20">
                <input 
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about my skills..."
                  className="flex-1 bg-transparent text-sm text-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400"
                />
                <button type="submit" className="p-2 bg-blue-600 rounded-xl hover:bg-blue-500 transition-colors cursor-pointer">
                  <Send size={16} />
                </button>
              </form>
            </div>
          </div>

          {/* CARD 3: DEEPFAKE PROJECT */}
          <a 
            href="https://github.com/mentallysikh" 
            target="_blank" 
            rel="noopener noreferrer"
            className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-xl hover:bg-white/10 transition-colors group cursor-pointer"
          >
            <div className="flex justify-between items-start mb-6">
              <div className="p-3 bg-blue-500/20 rounded-2xl text-blue-300">
                <Cpu size={24} />
              </div>
              <ArrowUpRight className="text-gray-500 group-hover:text-white transition-colors" />
            </div>
            <h3 className="text-xl font-bold mb-2">Deepfake Detection</h3>
            <p className="text-gray-400 text-sm mb-4">
              MCA Capstone. Utilizing CNNs to detect synthetic media artifacts in video streams.
            </p>
            <div className="flex flex-wrap gap-2">
              <Tag text="TensorFlow" />
              <Tag text="React" />
            </div>
          </a>

          {/* CARD 4: SKILL STACK */}
          <div className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-xl flex flex-col justify-center">
            <h3 className="text-lg font-bold mb-4 text-gray-200">Tech Stack</h3>
            <div className="flex flex-wrap gap-2">
              {['Java', 'Python', 'C++', 'React', 'SQL', 'Power BI', 'Git', 'Prompt Eng'].map(skill => (
                <span key={skill} className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg text-xs text-gray-300 hover:bg-white/10 transition-colors cursor-default">
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* CARD 5: EXPERIENCE */}
          <div className="md:col-span-3 bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-xl">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
              <Box size={20} className="text-purple-400" />
              Experience
            </h3>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="relative pl-6 border-l border-white/10">
                <div className="absolute left-[-5px] top-0 w-2.5 h-2.5 bg-purple-500 rounded-full glow-purple"></div>
                <h4 className="font-bold text-lg">Customer Service Associate</h4>
                <p className="text-purple-300 text-sm mb-2">Amazon • 2024-2025</p>
                <p className="text-gray-400 text-sm leading-relaxed">
                  First point of resolution for complex customer issues. Utilized internal CRM tools to analyze order data and ensure high satisfaction metrics.
                </p>
              </div>
              <div className="relative pl-6 border-l border-white/10">
                <div className="absolute left-[-5px] top-0 w-2.5 h-2.5 bg-blue-500 rounded-full glow-blue"></div>
                <h4 className="font-bold text-lg">Frontend Intern</h4>
                <p className="text-blue-300 text-sm mb-2">Appflix Studio • 2023</p>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Developed responsive web modules using HTML/CSS/JS. Focused on performance optimization and cross-browser compatibility testing.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* CONTACT SECTION */}
        <div className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-xl max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4">Let's Connect</h2>
            <p className="text-gray-400">Have a project in mind or just want to say hi? I'll get back to you as soon as possible.</p>
          </div>
          
          <form onSubmit={handleContactSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <input 
                type="text" 
                placeholder="Name"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                required
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors"
              />
              <input 
                type="email" 
                placeholder="Email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                required
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors"
              />
            </div>
            <textarea 
              placeholder="Message"
              value={formData.message}
              onChange={(e) => setFormData({...formData, message: e.target.value})}
              required
              rows="4"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors"
            ></textarea>
            
            <button 
              type="submit" 
              disabled={formStatus === 'sending' || formStatus === 'success'}
              className={`w-full py-4 rounded-xl font-bold transition-all flex items-center justify-center gap-2 ${
                formStatus === 'success' 
                  ? 'bg-green-500 text-white' 
                  : 'bg-blue-600 hover:bg-blue-500 text-white'
              }`}
            >
              {formStatus === 'sending' ? (
                'Sending...'
              ) : formStatus === 'success' ? (
                <>
                  <CheckCircle size={20} />
                  Message Sent!
                </>
              ) : (
                <>
                  <Send size={20} />
                  Send Message
                </>
              )}
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}

// Helper Components
const SocialBtn = ({ icon, href }) => (
  <a 
    href={href} 
    target={href.startsWith('http') ? "_blank" : "_self"}
    rel="noopener noreferrer"
    className="w-12 h-12 flex items-center justify-center rounded-full bg-white/5 border border-white/10 text-gray-400 hover:bg-white/10 hover:text-white hover:scale-110 transition-all"
  >
    {icon}
  </a>
);

const Tag = ({ text }) => (
  <span className="px-3 py-1 rounded-full bg-white/5 text-xs font-medium text-gray-300 border border-white/5">
    {text}
  </span>
);