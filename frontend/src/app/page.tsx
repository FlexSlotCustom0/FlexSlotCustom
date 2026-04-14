"use client";

import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowRight, Bot, Calendar, Layers, ShieldCheck, Zap, 
  Cpu, Database, Clock, Lock, Send, Sparkles, Code2, 
  CheckCircle2, ExternalLink, FileText, Terminal
} from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function LandingPage() {
  const [isAiParsing, setIsAiParsing] = useState(false);
  const [aiInput, setAiInput] = useState("I need a consult next Tuesday at 10 AM");
  const [aiOutput, setAiOutput] = useState("");
  const [latency, setLatency] = useState(42);

  // Simulated live metrics
  useEffect(() => {
    const interval = setInterval(() => {
      setLatency(38 + Math.floor(Math.random() * 10));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const handleAiPlayground = (e: React.FormEvent) => {
    e.preventDefault();
    setIsAiParsing(true);
    setAiOutput("");
    setTimeout(() => {
      setAiOutput(JSON.stringify({
        intent: "REQUEST_APPOINTMENT",
        entities: {
          type: "consultation",
          day: "Tuesday",
          slot: "10:00:00",
          timezone: "UTC+5:30"
        },
        probability: 0.98,
        engine: "TinyLlama-1.1B"
      }, null, 2));
      setIsAiParsing(false);
    }, 1500);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } },
  };

  const floatingVariant = {
    initial: { y: 0 },
    animate: { 
      y: [-10, 10, -10],
      transition: { duration: 6, repeat: Infinity }
    }
  };

  return (
    <div className="min-h-screen bg-black text-white selection:bg-white/30">
      {/* Navigation */}
      <nav className="fixed w-full z-50 glass border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center border border-white/20">
              <Calendar className="w-6 h-6 text-black" />
            </div>
            <span className="font-bold text-xl tracking-tight">FlexSlot</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-white/50">
            <Link href="#features" className="hover:text-white transition-colors">Infrastructure</Link>
            <Link href="#pulse" className="hover:text-white transition-colors">System Metrics</Link>
            <Link href="#ai" className="hover:text-white transition-colors">AI Playground</Link>
            <Link href="/dashboard" className="px-6 py-2.5 rounded-full bg-white text-black hover:bg-white/90 transition-all border border-white/10 font-bold">
              Console
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-40 pb-32 lg:pt-56 lg:pb-48 overflow-hidden">
        {/* Background Radial Gradient - Strictly Black/White */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#1a1a1a_0%,_#000000_100%)] -z-10" />
        
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/20 text-white/40 text-[10px] font-black uppercase tracking-[0.3em] mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
              Black & White Infrastructure
            </motion.div>
            
            <motion.h1 variants={itemVariants} className="text-6xl lg:text-8xl font-black tracking-tighter mb-8 leading-[0.9]">
              Monochrome <br/>
              <span className="text-white/40">Execution.</span>
            </motion.h1>
            
            <motion.p variants={itemVariants} className="text-lg lg:text-xl text-white/30 mb-12 leading-relaxed font-light max-w-xl">
              A high-density Multi-Tenant SaaS solution engineered for extreme concurrency and data isolation. Refined into a distilled monochrome aesthetic.
            </motion.p>
            
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center gap-5">
              <Link href="/dashboard" className="w-full sm:w-auto px-10 py-5 rounded-full bg-white text-black font-black transition-all flex items-center justify-center gap-3 hover:bg-white/90 active:scale-95 group">
                Enter Dashboard
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link href="#" className="w-full sm:w-auto px-10 py-5 rounded-full border border-white/20 hover:bg-white/5 text-white font-bold transition-all flex items-center justify-center gap-2">
                Technical Stack
              </Link>
            </motion.div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="relative hidden lg:block"
          >
            <motion.div 
              variants={floatingVariant}
              initial="initial"
              animate="animate"
              className="relative z-10 p-10 glass-card border border-white/10 rounded-[3rem] shadow-[0_0_50px_rgba(255,255,255,0.05)] bg-white/[0.02]"
            >
              <div className="flex items-center gap-3 mb-10 opacity-30">
                <div className="w-3 h-3 rounded-full bg-white" />
                <div className="w-3 h-3 rounded-full bg-white/50" />
                <div className="w-3 h-3 rounded-full bg-white/20" />
              </div>
              
              <div className="space-y-8">
                <div className="h-6 w-1/3 bg-white/10 rounded-full" />
                <div className="grid grid-cols-2 gap-6">
                  <div className="h-40 rounded-[2rem] bg-white/[0.05] border border-white/5 p-6 flex flex-col justify-between">
                     <div className="text-[10px] font-black uppercase tracking-widest text-white/20">Data Partition</div>
                     <div className="space-y-3">
                       <div className="h-2 w-full bg-white/20 rounded-full" />
                       <div className="h-2 w-2/3 bg-white/10 rounded-full" />
                     </div>
                  </div>
                  <div className="h-40 rounded-[2rem] bg-white border border-white/5 p-6 flex flex-col justify-between">
                     <div className="text-[10px] font-black uppercase tracking-widest text-black/20">System Lock</div>
                     <Lock className="w-10 h-10 text-black" />
                  </div>
                </div>
                <div className="h-16 w-full border border-white/10 rounded-2xl flex items-center px-6 gap-4 bg-white/5">
                   <Bot className="w-6 h-6 text-white/40" />
                   <div className="h-2 flex-1 bg-white/10 rounded-full" />
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Technical Bento Grid */}
      <section id="features" className="py-32 border-t border-white/5 bg-[#050505]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-24">
            <h2 className="text-4xl lg:text-6xl font-black mb-6 tracking-tighter">Technical Core</h2>
            <p className="text-white/20 max-w-2xl font-light text-lg">Architectural primitives distilled into a high-contrast environment.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <BentoCard 
              icon={<Layers />}
              title="Multi-Tenant"
              detail="Logical isolation powered by PostgreSQL RLS."
              hook="STRICT_DATA_ISOLATION_v3"
            />
            <BentoCard 
              icon={<ShieldCheck />}
              title="Atomic Lock"
              detail="Pessimistic concurrency control for slot safety."
              hook="ROW_LEVEL_LOCK_ACTIVE"
            />
            <BentoCard 
              icon={<Bot />}
              title="Private AI"
              detail="Self-hosted TinyLlama (1.1B) for local parsing."
              hook="SERVER_SIDE_LLM_LOADED"
            />
            <BentoCard 
              icon={<Zap />}
              title="Background Sync"
              detail="Event-driven FastAPI worker architecture."
              hook="SYNC_WORKER_0_HEALTHY"
            />
          </div>
        </div>
      </section>

      {/* System Pulse Section */}
      <section id="pulse" className="py-40 border-t border-white/5 bg-black">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-24 items-center">
            <div>
              <h2 className="text-4xl lg:text-7xl font-black mb-16 tracking-tighter">System Pulse</h2>
              <div className="space-y-12">
                <div className="flex items-center gap-16">
                  <div>
                    <div className="text-6xl font-black mb-2">{latency}<span className="text-xl text-white/30">ms</span></div>
                    <div className="text-[10px] font-black uppercase tracking-[0.4em] text-white/20">Latency</div>
                  </div>
                  <div className="h-16 w-px bg-white/10" />
                  <div>
                    <div className="text-6xl font-black mb-2">100<span className="text-xl text-white/30">%</span></div>
                    <div className="text-[10px] font-black uppercase tracking-[0.4em] text-white/20">Integrity</div>
                  </div>
                </div>

                <div className="p-10 border border-white/10 rounded-[2.5rem] space-y-6 bg-white/[0.01]">
                  <div className="text-xs font-black uppercase tracking-widest text-white/40">Resource Utilization</div>
                  <div className="h-3 w-full bg-white/5 rounded-full overflow-hidden">
                    <motion.div 
                      className="h-full bg-white"
                      initial={{ width: "20%" }}
                      animate={{ width: "72%" }}
                    />
                  </div>
                  <p className="text-[10px] font-mono text-white/20 leading-loose">
                    [KERNEL]: Logical threads persistent. Redis cache: 98% hit rate. No deadlocks detected in Postgres partition clusters.
                  </p>
                </div>
              </div>
            </div>

            <div className="p-12 border border-white/10 rounded-[3rem] bg-white/[0.02] relative group">
               <div className="space-y-12 relative">
                  <div className="flex justify-center">
                     <div className="px-8 py-5 rounded-2xl bg-white text-black font-black text-sm uppercase tracking-widest">Next.js 15</div>
                  </div>
                  <div className="flex justify-center items-center py-4">
                     <div className="w-px h-12 bg-white/20" />
                  </div>
                  <div className="flex justify-center gap-6">
                     <div className="px-8 py-5 rounded-2xl border border-white/20 text-white font-black text-sm uppercase tracking-widest">FastAPI</div>
                     <div className="px-8 py-5 rounded-2xl border border-white/10 text-white/30 font-black text-sm uppercase tracking-widest">Ollama</div>
                  </div>
                  <div className="flex justify-center items-center py-4">
                     <div className="w-px h-12 bg-white/20" />
                  </div>
                  <div className="flex justify-center">
                     <div className="px-10 py-8 rounded-3xl bg-white/5 border border-white/10 text-white font-black text-lg uppercase tracking-widest relative">
                       PostgreSQL
                       <Database className="absolute -top-6 -right-6 w-12 h-12 text-white/10" />
                     </div>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* AI Playground */}
      <section id="ai" className="py-32 border-t border-white/5 bg-[#050505]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-24">
            <h2 className="text-4xl lg:text-7xl font-black mb-6">Distilled AI</h2>
            <p className="text-white/20 max-w-xl mx-auto text-lg font-light">Self-hosted local inference. Zero-leak privacy.</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-10">
            <div className="p-12 border border-white/10 rounded-[3rem] bg-black">
               <textarea 
                  value={aiInput}
                  onChange={(e) => setAiInput(e.target.value)}
                  className="w-full h-48 bg-white/5 border-none p-0 text-lg text-white font-light focus:ring-0 resize-none placeholder:text-white/10"
                  placeholder="Input natural language..."
               />
               <button 
                  onClick={handleAiPlayground}
                  className="mt-8 px-10 py-5 rounded-full bg-white text-black font-black hover:opacity-90 transition-all flex items-center gap-3"
                  disabled={isAiParsing}
               >
                 {isAiParsing ? "Parsing..." : "Extract Logic"}
                 <Send className="w-5 h-5" />
               </button>
            </div>

            <div className="p-12 border border-white/5 rounded-[3rem] bg-white/[0.01] font-mono text-xs whitespace-pre overflow-auto min-h-[300px]">
               <AnimatePresence mode="wait">
                  {isAiParsing ? (
                    <motion.div 
                      key="p"
                      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                      className="h-full flex items-center justify-center text-white/20 uppercase tracking-[0.5em]"
                    >
                      Process_Entities...
                    </motion.div>
                  ) : (
                    <motion.div key="r" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                      {aiOutput || "// Structured JSON logic will render here"}
                    </motion.div>
                  )}
               </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-32 border-t border-white/10 bg-black">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-20 mb-32">
            <div className="col-span-2">
               <div className="flex items-center gap-4 mb-10">
                  <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-black font-black">FS</div>
                  <span className="text-2xl font-black uppercase tracking-tighter">FlexSlot Infrastructure</span>
               </div>
               <p className="text-white/20 max-w-sm leading-relaxed font-light">
                 A professional demonstration of cloud-native multi-tenant architecture and private AI primitives. Optimized for performance and high-density data integrity.
               </p>
            </div>
            
            <div className="space-y-8">
               <h4 className="text-[10px] font-black uppercase tracking-[0.5em] text-white/20">Core Stack</h4>
               <ul className="grid grid-cols-2 gap-4 text-xs font-bold text-white/40">
                 <li>Next.js 15</li>
                 <li>FastAPI</li>
                 <li>Postgres</li>
                 <li>Redis</li>
                 <li>Ollama</li>
                 <li>Tailwind</li>
               </ul>
            </div>

            <div className="space-y-10">
               <h4 className="text-[10px] font-black uppercase tracking-[0.5em] text-white/20">Connectivity</h4>
               <div className="flex gap-6">
                  <Link href="#" className="text-white/20 hover:text-white transition-colors"><ExternalLink /></Link>
                  <Link href="#" className="text-white/20 hover:text-white transition-colors"><FileText /></Link>
               </div>
               <div className="flex items-center gap-3 text-[10px] font-black uppercase text-emerald-500/50">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" /> SYSTEM_ONLINE_v32
               </div>
            </div>
          </div>

          <div className="pt-20 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-10 opacity-20">
             <div className="text-[10px] font-black uppercase tracking-[0.5em]">© 2026 FlexSlot Infrastructure.</div>
             <div className="text-[10px] font-mono tracking-widest text-center">BUILD_SUCCESSFUL // SHA_8F4C2D // DISCRETE_MODE_ACTIVE</div>
          </div>
        </div>
      </footer>
    </div>
  );
}

function BentoCard({ icon, title, detail, hook }: { icon: React.ReactNode, title: string, detail: string, hook: string }) {
  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className="p-10 border border-white/10 rounded-[3rem] bg-white/[0.02] flex flex-col h-full hover:bg-white/[0.05] transition-all group border-b-[3px] border-b-white/5"
    >
      <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center text-black mb-10 group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <h3 className="text-xl font-black uppercase tracking-tight mb-4">{title}</h3>
      <p className="text-sm text-white/30 leading-relaxed font-light mb-auto">{detail}</p>
      <div className="mt-10 pt-8 border-t border-white/5 text-[9px] font-mono text-white/40 uppercase tracking-[0.3em]">
        {hook}
      </div>
    </motion.div>
  );
}
