"use client";

import { motion } from "framer-motion";
import { Bot, TrendingUp, Sparkles, MessageSquare, FileText, BrainCircuit, ArrowUpRight, ArrowDownRight, Send } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function AIInsightsPage() {
  const [consoleInput, setConsoleInput] = useState("");
  const [isParsing, setIsParsing] = useState(false);
  const [jsonOutput, setJsonOutput] = useState('{\n  "status": "AWAITING_INPUT"\n}');

  const handleConsoleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!consoleInput.trim()) return;
    
    setIsParsing(true);
    setTimeout(() => {
      setIsParsing(false);
      setJsonOutput(JSON.stringify({
        intent: "BOOKING",
        entities: {
          service: consoleInput.toLowerCase().includes("consult") ? "Strategy Consultation" : "General Inquiry",
          time_frame: "NEXT_WEEK",
          raw: consoleInput
        },
        confidence: 0.982
      }, null, 2));
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex">
      <aside className="w-64 glass border-r border-border/10 flex flex-col h-screen sticky top-0 hidden lg:flex">
        <div className="h-16 flex items-center px-6 border-b border-border/10">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center">
              <BrainCircuit className="w-4 h-4 text-black" />
            </div>
            <span className="font-bold tracking-tight">Intelligence Console</span>
          </div>
        </div>
        <div className="flex-1 py-6 px-3 space-y-1">
          <NavItem href="/dashboard" label="Overview" />
          <NavItem href="/dashboard/services" label="Services" />
          <NavItem href="/dashboard/bookings" label="Booking & Slots" />
          <NavItem href="/dashboard/customers" label="Customers" />
          <NavItem href="/dashboard/ai" label="AI Insights" active />
          <NavItem href="/dashboard/settings" label="Settings" />
        </div>
      </aside>

      <main className="flex-1 flex flex-col">
        <header className="h-16 glass border-b border-border/10 flex items-center justify-between px-8 sticky top-0 z-10">
          <h1 className="text-xl font-black">Predictive Engine</h1>
          <div className="text-[10px] font-black uppercase tracking-widest text-white/40 bg-white/5 px-3 py-1 rounded border border-white/10">
             Ollama Instance: <span className="animate-pulse text-white">READY</span>
          </div>
        </header>

        <div className="p-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-10">
            {/* Natural Language Console */}
            <div className="glass-card rounded-[2.5rem] p-10 border border-white/10 bg-white/[0.01]">
               <div className="flex items-center gap-4 mb-8">
                 <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-black shadow-xl"><Bot className="w-6 h-6" /></div>
                 <h3 className="text-2xl font-black tracking-tighter">Extraction Console</h3>
               </div>
               
               <p className="text-xs text-foreground/30 mb-8 font-mono leading-relaxed italic">
                 [SYSTEM]: Direct pipe to TinyLlama-1.1B. Processing raw string input.
               </p>

               <form onSubmit={handleConsoleSubmit} className="space-y-6 mb-10">
                 <div className="relative">
                    <input 
                      type="text" 
                      value={consoleInput}
                      onChange={(e) => setConsoleInput(e.target.value)}
                      placeholder="e.g. Schedule a strategy review for Friday"
                      className="w-full bg-white/[0.03] border border-white/10 rounded-[1.5rem] px-6 py-5 text-sm focus:outline-none focus:border-white/30 transition-all font-mono text-white"
                    />
                    <button 
                      type="submit"
                      className="absolute right-3 top-1/2 -translate-y-1/2 p-3 rounded-xl bg-white text-black hover:opacity-90 transition-all"
                    >
                      {isParsing ? <Sparkles className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                    </button>
                 </div>
               </form>

               <div className="p-6 rounded-[1.5rem] bg-black border border-white/5 font-mono text-[11px] whitespace-pre text-white/40 overflow-x-auto h-56 scrollbar-hide relative">
                  <div className="flex items-center gap-2 mb-4 text-white/20 border-b border-white/5 pb-4 uppercase tracking-widest">
                     <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" /> {isParsing ? 'Processing...' : 'Entity_Log_v3'}
                  </div>
                  <div className={isParsing ? 'opacity-20 transition-all' : 'opacity-100'}>
                    {jsonOutput}
                  </div>
               </div>
            </div>

            {/* Predictive Analytics */}
            <div className="glass-card rounded-[2.5rem] p-10 border border-white/10 bg-white/[0.01] flex flex-col">
               <div className="flex items-center gap-4 mb-10">
                 <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center"><TrendingUp className="w-6 h-6" /></div>
                 <h3 className="text-2xl font-black tracking-tighter">Trend Analysis</h3>
               </div>

               <div className="flex-1 space-y-10">
                 <div className="h-44 flex items-end gap-1 px-4 border-b border-white/5 mb-4 relative">
                    {[30, 45, 60, 40, 70, 90, 85, 50, 65, 80].map((h, i) => (
                      <div key={i} className="flex-1 bg-white/5 rounded-t-sm relative group overflow-hidden">
                        <motion.div 
                          className="absolute bottom-0 w-full bg-white/20 group-hover:bg-white/40 transition-colors"
                          initial={{ height: 0 }}
                          animate={{ height: `${h}%` }}
                          transition={{ duration: 1, delay: i * 0.05 }}
                        />
                      </div>
                    ))}
                 </div>
                 
                 <div className="grid grid-cols-2 gap-6">
                    <div className="p-6 rounded-[1.5rem] bg-white text-black">
                       <div className="text-[9px] font-black uppercase mb-2 opacity-50 tracking-widest">Peak Period</div>
                       <div className="text-xl font-black">Tuesdays</div>
                       <div className="text-[10px] uppercase font-bold mt-1 opacity-60">+18% Confidence</div>
                    </div>
                    <div className="p-6 rounded-[1.5rem] bg-white/5 border border-white/10">
                       <div className="text-[9px] font-black uppercase mb-2 text-white/30 tracking-widest">Volume Trend</div>
                       <div className="text-xl font-black text-white">UPWARD</div>
                       <div className="text-[10px] uppercase font-bold mt-1 text-white/20">STABLE FLOW</div>
                    </div>
                 </div>
               </div>
            </div>
          </div>

          {/* Prompt Logs/Interactions */}
          <div className="glass-card rounded-[2.5rem] border border-white/10 overflow-hidden shadow-2xl">
            <div className="p-8 border-b border-white/10 bg-white/[0.01] flex items-center justify-between">
              <h3 className="font-black text-lg tracking-tighter">Extraction History</h3>
              <select className="bg-black border border-white/10 rounded-full px-5 py-2 text-[10px] font-black uppercase tracking-widest outline-none cursor-pointer">
                <option>ALL_EXTRACTIONS</option>
                <option>SUCCESS_ONLY</option>
              </select>
            </div>
            <div className="divide-y divide-white/5">
              <ExtractionRow 
                input="I need to see someone for a strategy audit next tuesday afternoon"
                output='{ "service": "Audit", "time": "14:00", "date": "2026-04-21" }'
                latency="142ms"
              />
              <ExtractionRow 
                input="Cancel my 10am tomorrow and move it to Friday please"
                output='{ "action": "RESCHEDULE", "target": "2026-04-15:10:00", "to": "2026-04-18" }'
                latency="189ms"
              />
              <ExtractionRow 
                input="What's your most popular service lately?"
                output='{ "query": "POPULAR_SERVICES", "context": "CURRENT_WEEK" }'
                latency="121ms"
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

function ExtractionRow({ input, output, latency }: { input: string, output: string, latency: string }) {
  return (
    <div className="p-8 flex flex-col lg:flex-row lg:items-center gap-8 hover:bg-white/[0.01] transition-all group">
      <div className="flex-1">
        <div className="text-[9px] font-black uppercase tracking-widest text-white/20 mb-3 flex items-center gap-2">
          <MessageSquare className="w-3 h-3" /> Input Request
        </div>
        <p className="text-base font-bold text-white group-hover:text-white/80 transition-colors">{input}</p>
      </div>
      <div className="flex-1 font-mono text-[10px] bg-black p-5 rounded-2xl border border-white/5 text-white/50 tracking-tight">
        {output}
      </div>
      <div className="flex flex-col items-end whitespace-nowrap min-w-[100px]">
        <span className="text-[9px] font-black uppercase tracking-widest text-white/20 mb-1">Latency</span>
        <span className="text-sm font-black text-white">{latency}</span>
      </div>
    </div>
  );
}

function NavItem({ href, label, active }: { href: string, label: string, active?: boolean }) {
  return (
    <Link 
      href={href}
      className={`flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-bold tracking-tight transition-all ${
        active 
          ? 'bg-white text-black shadow-lg' 
          : 'text-white/20 hover:bg-white/5 hover:text-white'
      }`}
    >
      {label}
    </Link>
  );
}
