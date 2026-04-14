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
    <div className="min-h-screen bg-slate-950 text-slate-50 flex">
      <aside className="w-64 glass border-r border-white/5 flex flex-col h-screen sticky top-0 hidden lg:flex">
        <div className="h-16 flex items-center px-6 border-b border-white/5">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center">
              <BrainCircuit className="w-4 h-4 text-white" />
            </div>
            <span className="font-semibold tracking-tight">FlexSlot Intelligence</span>
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
        <header className="h-16 glass border-b border-white/5 flex items-center justify-between px-8 sticky top-0 z-10">
          <h1 className="text-xl font-bold">Predictive Intelligence Engine</h1>
          <div className="text-xs font-mono text-indigo-400 bg-indigo-500/10 px-3 py-1 rounded border border-indigo-500/20">
             Ollama Instance: <span className="animate-pulse">RUNNING</span>
          </div>
        </header>

        <div className="p-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Natural Language Console */}
            <div className="glass-card rounded-3xl p-8 border border-white/5 bg-slate-900/30">
               <div className="flex items-center gap-3 mb-6">
                 <div className="p-2 rounded-xl bg-indigo-500/10 text-indigo-400"><Bot className="w-6 h-6" /></div>
                 <h3 className="text-xl font-bold">Natural Language Console</h3>
               </div>
               
               <p className="text-sm text-slate-400 mb-6 font-mono leading-relaxed">
                 [DEBUG]: Direct pipe to TinyLlama-1.1B. Input natural language to verify structured entity extraction.
               </p>

               <form onSubmit={handleConsoleSubmit} className="space-y-4 mb-6">
                 <div className="relative">
                   <input 
                     type="text" 
                     value={consoleInput}
                     onChange={(e) => setConsoleInput(e.target.value)}
                     placeholder="e.g. Book a consult for next Tuesday morning"
                     className="w-full bg-slate-950 border border-white/10 rounded-xl px-5 py-4 text-sm focus:outline-none focus:border-indigo-500/50 transition-all font-mono"
                   />
                   <button 
                     type="submit"
                     className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 transition-colors"
                   >
                     {isParsing ? <Sparkles className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                   </button>
                 </div>
               </form>

               <div className="p-4 rounded-xl bg-black/60 border border-white/5 font-mono text-xs whitespace-pre text-emerald-400 overflow-x-auto h-48 scrollbar-hide">
                  <div className="flex items-center gap-2 mb-2 text-slate-500 border-b border-white/5 pb-2">
                     <span className="w-2 h-2 rounded-full bg-emerald-500" /> RAW_JSON_OUTPUT
                  </div>
                  {jsonOutput}
               </div>
            </div>

            {/* Predictive Analytics */}
            <div className="glass-card rounded-3xl p-8 border border-white/5 flex flex-col">
               <div className="flex items-center justify-between mb-8">
                 <div className="flex items-center gap-3">
                   <div className="p-2 rounded-xl bg-blue-500/10 text-blue-400"><TrendingUp className="w-6 h-6" /></div>
                   <h3 className="text-xl font-bold">Trend Reports</h3>
                 </div>
                 <select className="bg-slate-900 border border-white/10 rounded-lg text-[10px] font-bold uppercase tracking-widest px-2 py-1 outline-none">
                   <option>Weekly Projection</option>
                   <option>Monthly Outlook</option>
                 </select>
               </div>

               <div className="flex-1 space-y-6">
                 <div className="h-40 flex items-end gap-1 px-2 border-b border-white/5 mb-2 relative">
                    <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none">
                       <TrendingUp className="w-32 h-32" />
                    </div>
                    {[30, 45, 60, 40, 70, 90, 85].map((h, i) => (
                      <div key={i} className="flex-1 bg-indigo-500/20 rounded-t-sm relative group overflow-hidden">
                        <motion.div 
                          className="absolute bottom-0 w-full bg-indigo-500"
                          initial={{ height: 0 }}
                          animate={{ height: `${h}%` }}
                          transition={{ duration: 1, delay: i * 0.1 }}
                        />
                      </div>
                    ))}
                 </div>
                 
                 <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 rounded-2xl bg-slate-900 border border-white/5">
                       <div className="text-[10px] text-slate-500 font-bold uppercase mb-1">Peak Demand</div>
                       <div className="text-lg font-bold">Tuesdays</div>
                       <div className="text-[9px] text-emerald-400 font-bold">+18% increase expected</div>
                    </div>
                    <div className="p-4 rounded-2xl bg-slate-900 border border-white/5">
                       <div className="text-[10px] text-slate-500 font-bold uppercase mb-1">Service Trend</div>
                       <div className="text-lg font-bold truncate">Tax Audit</div>
                       <div className="text-[9px] text-blue-400 font-bold">Rising social interest</div>
                    </div>
                 </div>
               </div>
            </div>
          </div>

          {/* Prompt Logs/Interactions */}
          <div className="glass-card rounded-3xl border border-white/5 overflow-hidden">
            <div className="p-6 border-b border-white/5 flex items-center justify-between">
              <h3 className="font-bold">Recent Natural Language Extractions</h3>
              <select className="bg-slate-900 border border-white/10 rounded-lg px-3 py-1 text-sm outline-none">
                <option>All Extractions</option>
                <option>Successes Only</option>
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
    <div className="p-4 flex flex-col md:flex-row md:items-center gap-4 hover:bg-white/5 transition-colors group">
      <div className="flex-1">
        <div className="text-xs text-slate-500 mb-1 flex items-center gap-2">
          <MessageSquare className="w-3 h-3 text-indigo-400" /> User Input
        </div>
        <p className="text-sm font-medium text-slate-200 group-hover:text-white">{input}</p>
      </div>
      <div className="flex-1 font-mono text-xs bg-black/40 p-3 rounded-lg border border-white/5 text-emerald-400">
        {output}
      </div>
      <div className="flex flex-col items-end whitespace-nowrap">
        <span className="text-xs text-slate-500">Latency</span>
        <span className="text-sm font-bold text-slate-300">{latency}</span>
      </div>
    </div>
  );
}

function ForecastItem({ label, value, up }: { label: string, value: string, up?: boolean }) {
  return (
    <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900/50 border border-white/5">
      <span className="text-sm text-slate-400">{label}</span>
      <div className="flex items-center gap-1 font-bold">
        {value}
        {up ? <ArrowUpRight className="w-4 h-4 text-emerald-400" /> : <ArrowDownRight className="w-4 h-4 text-red-400" />}
      </div>
    </div>
  );
}

function NavItem({ href, label, active }: { href: string, label: string, active?: boolean }) {
  return (
    <Link 
      href={href}
      className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
        active 
          ? 'bg-blue-600/10 text-blue-400 border border-blue-500/20 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1)]' 
          : 'text-slate-400 hover:bg-white/5 hover:text-slate-200'
      }`}
    >
      {label}
    </Link>
  );
}
