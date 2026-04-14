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
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.6 } },
  };

  const floatingVariant = {
    initial: { y: 0 },
    animate: { 
      y: [-10, 10, -10],
      transition: { duration: 6, repeat: Infinity }
    }
  };

  return (
    <div className="min-h-screen bg-black text-white selection:bg-gold-light/30">
      {/* Navigation */}
      <nav className="fixed w-full z-50 glass border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-accent-purple to-purple-600 flex items-center justify-center border border-white/20">
              <Calendar className="w-6 h-6 text-gold-light" />
            </div>
            <span className="font-bold text-xl tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-white/50">FlexSlot</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-white/70">
            <Link href="#features" className="hover:text-gold-light transition-colors">Infrastructure</Link>
            <Link href="#pulse" className="hover:text-gold-light transition-colors">System Metrics</Link>
            <Link href="#ai" className="hover:text-gold-light transition-colors">AI Playground</Link>
            <Link href="/dashboard" className="px-6 py-2.5 rounded-full bg-white/5 hover:bg-white/10 transition-all border border-white/10 text-white font-bold">
              Command Console
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-40 pb-32 lg:pt-56 lg:pb-48 overflow-hidden">
        {/* Background Radial Gradient */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#3a0353_0%,_#000000_70%)] -z-10 opacity-60" />
        
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold-light/10 border border-gold-light/30 text-gold-light text-xs font-bold uppercase tracking-[0.2em] mb-8">
              <span className="w-2 h-2 rounded-full bg-gold-light animate-pulse" />
              The Future of Booking
            </motion.div>
            
            <motion.h1 variants={itemVariants} className="text-6xl lg:text-8xl font-black tracking-tighter mb-8 leading-[0.9] text-white">
              Intelligence-Driven <br/>
              <span className="text-gold-gradient">Infrastructure.</span>
            </motion.h1>
            
            <motion.p variants={itemVariants} className="text-lg lg:text-xl text-white/50 mb-12 leading-relaxed font-light max-w-xl">
              A cloud-native, multi-tenant solution engineered for high-concurrency data integrity and privacy-first AI engagement.
            </motion.p>
            
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center gap-5">
              <Link href="/dashboard" className="w-full sm:w-auto px-10 py-5 rounded-full bg-gradient-to-r from-gold-light to-gold-deep text-black font-black transition-all flex items-center justify-center gap-3 hover:scale-105 active:scale-95 shadow-[0_0_30px_rgba(248,210,153,0.3)] group">
                Launch Demo
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link href="#" className="w-full sm:w-auto px-10 py-5 rounded-full border border-white/20 hover:bg-white/5 text-white font-bold transition-all flex items-center justify-center gap-2">
                View Technical Blueprint
              </Link>
            </motion.div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="relative hidden lg:block"
          >
            <motion.div 
              variants={floatingVariant}
              initial="initial"
              animate="animate"
              className="relative z-10 p-8 glass-card border border-white/10 rounded-[2.5rem] shadow-2xl backdrop-blur-3xl overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-4 opacity-20">
                <Database className="w-24 h-24" />
              </div>
              <div className="flex items-center gap-4 mb-8">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
                <div className="ml-4 h-6 px-3 rounded-full bg-white/5 text-[10px] uppercase font-bold text-white/40 flex items-center tracking-widest">
                  flexslot_dashboard_v3.2
                </div>
              </div>
              <div className="space-y-6">
                <div className="h-4 w-1/3 bg-white/10 rounded-full" />
                <div className="grid grid-cols-2 gap-4">
                  <div className="h-32 rounded-2xl bg-gradient-to-br from-gold-light/10 to-transparent border border-white/5 p-4">
                    <div className="text-[10px] text-white/30 font-bold mb-4 uppercase">Tenant UUID</div>
                    <div className="h-2 w-full bg-gold-light/20 rounded-full mb-2" />
                    <div className="h-2 w-2/3 bg-gold-light/20 rounded-full" />
                  </div>
                  <div className="h-32 rounded-2xl bg-white/5 border border-white/5 p-4 overflow-hidden relative">
                    <Terminal className="absolute -bottom-2 -right-2 w-16 h-16 opacity-10" />
                    <div className="text-[10px] text-white/30 font-bold mb-4 uppercase">Locking Status</div>
                    <div className="flex items-center gap-2 text-gold-light font-mono text-[10px]">
                      <Lock className="w-3 h-3" /> SELECT_FOR_UPDATE();
                    </div>
                  </div>
                </div>
                <div className="h-12 w-full bg-accent-purple/40 rounded-xl border border-white/10 flex items-center px-4 gap-3">
                  <Bot className="w-5 h-5 text-gold-light" />
                  <div className="h-2 flex-1 bg-white/10 rounded-full" />
                </div>
              </div>
            </motion.div>
            {/* Glow Decorative */}
            <div className="absolute -top-20 -left-20 w-64 h-64 bg-accent-purple rounded-full blur-[120px] opacity-40 -z-10" />
            <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-gold-light rounded-full blur-[150px] opacity-10 -z-10" />
          </motion.div>
        </div>
      </section>

      {/* Technical Bento Grid */}
      <section id="features" className="py-24 border-t border-white/5 bg-white/[0.02]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-20">
            <h2 className="text-3xl lg:text-5xl font-bold mb-4">The Technical Core</h2>
            <p className="text-white/40 max-w-2xl font-light">Deep-seated architectural logic abstracted into high-performance primitives.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <BentoCard 
              icon={<Layers />}
              title="Multi-Tenant Engine"
              detail="A mini-switcher swapping context between Sigma Brutalist and Minimalist."
              hook="Shared database with logical isolation using PostgreSQL RLS."
              color="border-blue-500/20"
            />
            <BentoCard 
              icon={<ShieldCheck />}
              title="Atomic Booking"
              detail="Row-level locking animation triggered on slot hover."
              hook="Hybrid concurrency control using pessimistic locking to prevent double-bookings."
              color="border-gold-light/20"
            />
            <BentoCard 
              icon={<Bot />}
              title="Privacy-First AI"
              detail="Direct pipe from natural language to entity-mapped JSON."
              hook="Self-hosted TinyLlama (1.1B) for zero-cost, server-side data extraction."
              color="border-purple-500/20"
            />
            <BentoCard 
              icon={<Zap />}
              title="Event-Driven Sync"
              detail="Async side effects verified with POLL_V3 background tasks."
              hook="Asynchronous side effects powered by FastAPI background workers."
              color="border-emerald-500/20"
            />
          </div>
        </div>
      </section>

      {/* System Pulse Section */}
      <section id="pulse" className="py-32 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[50%] h-full bg-accent-purple/5 -z-10 skew-x-[-12deg]" />
        
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div>
              <h2 className="text-4xl lg:text-6xl font-black mb-12 tracking-tighter">System Pulse</h2>
              
              <div className="space-y-8">
                <div className="flex items-center gap-10">
                  <div>
                    <div className="text-5xl font-black text-gold-light mb-2">{latency}<span className="text-xl">ms</span></div>
                    <div className="text-[10px] font-black uppercase tracking-widest text-white/30">Avg Request Latency</div>
                  </div>
                  <div className="h-12 w-px bg-white/10" />
                  <div>
                    <div className="text-5xl font-black text-white mb-2">99.9<span className="text-xl">%</span></div>
                    <div className="text-[10px] font-black uppercase tracking-widest text-white/30">Isolation Integrity</div>
                  </div>
                </div>

                <div className="p-8 glass-card border border-white/5 rounded-3xl space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="text-xs font-bold text-white/60">Worker Node Capacity</div>
                    <div className="text-xs font-mono text-gold-light tracking-widest">OK</div>
                  </div>
                  <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                    <motion.div 
                      className="h-full bg-gold-light shadow-[0_0_10px_rgba(248,210,153,0.5)]"
                      initial={{ width: "30%" }}
                      animate={{ width: "65%" }}
                    />
                  </div>
                  <p className="text-xs text-white/30 leading-relaxed font-mono">
                    [SYSTEM]: Redis-Cache cache-hit: 94%. Logical threads scaled to peak concurrency.
                  </p>
                </div>
              </div>
            </div>

            <div className="relative group">
              {/* Architecture Diagram Placeholder - Simplified SVG Design */}
              <div className="p-10 glass-card border border-white/10 rounded-[3rem] bg-gradient-to-br from-white/[0.05] to-transparent relative overflow-hidden transition-all group-hover:bg-white/[0.08]">
                <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none bg-[radial-gradient(circle_at_center,_white_1px,_transparent_1px)] bg-[size:24px_24px]" />
                <div className="relative space-y-12">
                   <div className="flex justify-center">
                     <div className="px-6 py-4 rounded-2xl bg-white text-black font-black text-xs uppercase tracking-widest shadow-xl">Next.js 15</div>
                   </div>
                   <div className="flex justify-center flex-col items-center gap-1">
                      <div className="w-0.5 h-8 bg-gold-light" />
                      <div className="w-2 h-2 rounded-full bg-gold-light shadow-glow" />
                   </div>
                   <div className="flex justify-center gap-4">
                      <div className="px-6 py-4 rounded-2xl border border-gold-light/30 text-gold-light font-black text-xs uppercase tracking-widest bg-gold-light/5">FastAPI Node</div>
                      <div className="px-6 py-4 rounded-2xl border border-white/10 text-white/40 font-black text-xs uppercase tracking-widest flex items-center gap-2">
                        <Bot className="w-4 h-4" /> TinyLlama
                      </div>
                   </div>
                   <div className="flex justify-center flex-col items-center gap-1">
                      <div className="w-0.5 h-8 bg-gold-light opacity-30" />
                      <div className="w-2 h-2 rounded-full bg-gold-light/30" />
                   </div>
                   <div className="flex justify-center translate-y-2">
                     <div className="px-6 py-6 rounded-3xl border border-white/10 bg-black/40 text-white font-black text-xs uppercase tracking-[0.2em] relative">
                       <Database className="w-12 h-12 text-gold-light/20 absolute -z-10 -top-2 left-1/2 -translate-x-1/2" />
                       PostgreSQL Persistence
                     </div>
                   </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AI Insight Interactive Playground */}
      <section id="ai" className="py-24 border-y border-white/5 bg-black">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-5xl font-black mb-4">Privacy-First Engine</h2>
            <p className="text-white/40 max-w-xl mx-auto font-light leading-relaxed">
              Processed entirely server-side to ensure maximum data locality and security. No third-party LLM leakage.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            <div className="p-10 glass-card rounded-[2.5rem] border border-white/10 space-y-8">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-gold-light/10 text-gold-light"><Send className="w-6 h-6" /></div>
                <h3 className="text-xl font-bold">Input Request</h3>
              </div>

              <form onSubmit={handleAiPlayground} className="space-y-6">
                 <div className="relative">
                    <textarea 
                       value={aiInput}
                       onChange={(e) => setAiInput(e.target.value)}
                       className="w-full h-40 bg-white/5 border border-white/10 rounded-3xl p-6 text-sm text-white focus:outline-none focus:border-gold-light/50 transition-all font-mono resize-none"
                    />
                    <button 
                       type="submit"
                       className="absolute bottom-4 right-4 p-4 rounded-2xl bg-gold-light text-black font-black hover:scale-105 transition-transform disabled:opacity-50"
                       disabled={isAiParsing}
                    >
                      {isAiParsing ? <Sparkles className="w-6 h-6 animate-spin" /> : <Send className="w-6 h-6" />}
                    </button>
                 </div>
                 <div className="flex items-center gap-3 text-[10px] font-bold text-white/30 uppercase tracking-[0.2em]">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Model Instance Ready: TinyLlama-1.1B
                 </div>
              </form>
            </div>

            <div className="p-10 glass-card rounded-[2.5rem] border border-gold-light/10 bg-gold-light/[0.02] flex flex-col">
              <div className="flex items-center gap-3 mb-8">
                <div className="p-2 rounded-xl bg-gold-light/20 text-gold-light"><Code2 className="w-6 h-6" /></div>
                <h3 className="text-xl font-bold">Structured Logic</h3>
              </div>
              
              <div className="flex-1 p-6 rounded-2xl bg-black/40 border border-white/5 font-mono text-xs text-gold-light whitespace-pre overflow-auto scrollbar-hide">
                <AnimatePresence mode="wait">
                  {isAiParsing ? (
                    <motion.div 
                      key="parsing"
                      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                      className="h-full flex flex-col items-center justify-center gap-4 text-white/30"
                    >
                      <Cpu className="w-12 h-12 animate-pulse" />
                      <div>EXTRACTING_ENTITIES...</div>
                    </motion.div>
                  ) : (
                    <motion.div 
                      key="output"
                      initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                    >
                      {aiOutput || "// Generated JSON entities will appear here"}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Technical Stack & Footer */}
      <footer className="py-24 border-t border-white/5 bg-black">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
            <div className="col-span-2">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 rounded-lg bg-gold-light flex items-center justify-center text-black">
                  <Calendar className="w-5 h-5" />
                </div>
                <span className="font-black text-xl tracking-tighter">FlexSlot Engine</span>
              </div>
              <p className="text-white/40 text-sm leading-relaxed max-w-sm font-light">
                Developed as a high-performance demonstration of multi-tenant cloud architecture, advanced concurrency control, and private LLM implementation.
              </p>
            </div>
            
            <div>
              <h4 className="text-xs font-black uppercase tracking-[0.2em] text-white/60 mb-6 font-mono">Technical Stack</h4>
              <div className="grid grid-cols-3 gap-4 text-white/30">
                <IconBadge name="Next.js" />
                <IconBadge name="FastAPI" />
                <IconBadge name="PostgreSQL" />
                <IconBadge name="Redis" />
                <IconBadge name="Ollama" />
                <IconBadge name="Tailwind" />
              </div>
            </div>

            <div>
              <h4 className="text-xs font-black uppercase tracking-[0.2em] text-white/60 mb-6 font-mono">Audit & Social</h4>
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-xs font-bold text-emerald-400/60 font-mono">
                  <CheckCircle2 className="w-4 h-4" /> Audit-Ready Records
                </div>
                <div className="flex gap-4">
                  <Link href="#" className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors text-white/50 hover:text-white">
                    <ExternalLink className="w-5 h-5" />
                  </Link>
                  <Link href="#" className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors text-white/50 hover:text-white">
                    <FileText className="w-5 h-5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-12 border-t border-white/5 flex flex-col md:row items-center justify-between gap-6 opacity-30">
            <div className="text-[10px] font-black uppercase tracking-[0.3em]">© 2026 FlexSlot Infrastructure. All Rights Reserved.</div>
            <div className="text-[10px] font-mono">v3.2.0-STABLE | BUILD_HASH_8F4C2D</div>
          </div>
        </div>
      </footer>
    </div>
  );
}

function BentoCard({ icon, title, detail, hook, color }: { icon: React.ReactNode, title: string, detail: string, hook: string, color: string }) {
  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className={`p-8 glass-card border border-white/10 rounded-[2.5rem] bg-gradient-to-br from-white/[0.03] to-transparent flex flex-col h-full group transition-all hover:bg-white/[0.06] hover:border-gold-light/20`}
    >
      <div className={`w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-white mb-8 group-hover:bg-gold-light group-hover:text-black transition-all duration-500`}>
        {icon}
      </div>
      <h3 className="text-lg font-black text-white mb-2">{title}</h3>
      <p className="text-sm text-white/40 leading-relaxed font-light mb-auto">{detail}</p>
      <div className="mt-6 pt-6 border-t border-white/5 text-[9px] font-mono text-gold-light uppercase tracking-widest leading-normal">
        {hook}
      </div>
    </motion.div>
  );
}

function IconBadge({ name }: { name: string }) {
  return (
    <div className="px-2 py-1 rounded bg-white/5 border border-white/5 flex items-center justify-center text-[10px] font-bold tracking-tighter hover:border-white/20 hover:text-white transition-all cursor-default uppercase">
      {name}
    </div>
  );
}
