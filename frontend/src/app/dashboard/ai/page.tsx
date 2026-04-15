"use client";

import { motion } from "framer-motion";
import { 
  Bot, TrendingUp, Sparkles, MessageSquare, FileText, 
  BrainCircuit, ArrowUpRight, ArrowDownRight, Send, 
  ChevronLeft, BarChart3, Database, ShieldCheck
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function AIInsightsPage() {
  const [role, setRole] = useState<"owner" | "customer">("owner");
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
        intent: "EXTRACTION",
        entities: {
          service: consoleInput.toLowerCase().includes("consult") ? "Strategy Review" : "General Inquiry",
          time: "NEXT_WINDOW",
          confidence: 0.99
        },
        model: "TinyLlama-v1.1"
      }, null, 2));
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-[#FDFDFD] text-black font-sans flex">
      {/* Mini Sidebar */}
      <aside className="w-20 border-r border-gray-100 flex flex-col h-screen sticky top-0 bg-white items-center py-8 gap-8">
        <Link href="/dashboard" className="w-10 h-10 rounded-xl bg-black flex items-center justify-center text-white shadow-lg">
          <ChevronLeft className="w-6 h-6" />
        </Link>
        <div className="flex-1" />
        <div className="w-10 h-10 rounded-full bg-gray-50 border border-gray-100" />
      </aside>

      <main className="flex-1 flex flex-col">
        {/* Header */}
        <header className="h-20 bg-white border-b border-gray-50 flex items-center justify-between px-10 sticky top-0 z-10">
          <div className="flex items-center gap-6">
            <div>
              <h1 className="text-2xl font-serif">Intelligent Console</h1>
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-[0.2em] font-mono">Self-Hosted Inference Engine</p>
            </div>
            
            <div className="flex bg-gray-50 p-1 rounded-xl border border-gray-100">
              <button 
                onClick={() => setRole("owner")}
                className={`px-4 py-1.5 rounded-lg text-xs font-bold uppercase tracking-widest transition-all ${role === "owner" ? "bg-white text-black shadow-sm" : "text-gray-400"}`}
              >
                Owner
              </button>
              <button 
                onClick={() => setRole("customer")}
                className={`px-4 py-1.5 rounded-lg text-xs font-bold uppercase tracking-widest transition-all ${role === "customer" ? "bg-white text-black shadow-sm" : "text-gray-400"}`}
              >
                User
              </button>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-[10px] font-black uppercase tracking-widest text-gray-400 border border-gray-100 px-4 py-2 rounded-xl bg-white shadow-sm">
               Model Status: <span className="text-black font-black">LOCAL_READY</span>
            </div>
          </div>
        </header>

        <div className="p-10 max-w-7xl mx-auto w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-10">
            {/* AI Console Card */}
            <div className="bg-white rounded-[2.5rem] p-10 border border-gray-50 shadow-sm relative overflow-hidden group">
               <div className="flex items-center gap-4 mb-10 relative z-10">
                 <div className="w-12 h-12 rounded-2xl bg-black flex items-center justify-center text-white shadow-lg"><Bot className="w-6 h-6" /></div>
                 <div>
                    <h3 className="text-2xl font-bold tracking-tight">{role === 'owner' ? 'NLP Parser' : 'Smart Assistant'}</h3>
                    <p className="text-[10px] font-black uppercase tracking-widest text-gray-300">Entity Extraction Mode</p>
                 </div>
               </div>
               
               <form onSubmit={handleConsoleSubmit} className="space-y-6 mb-10 relative z-10">
                 <div className="relative">
                    <input 
                      type="text" 
                      value={consoleInput}
                      onChange={(e) => setConsoleInput(e.target.value)}
                      placeholder={role === 'owner' ? "Input prompt for entity extraction..." : "Ask me anything about your schedule..."}
                      className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-5 text-sm focus:outline-none focus:border-black/10 transition-all font-medium italic"
                    />
                    <button 
                      type="submit"
                      className="absolute right-3 top-1/2 -translate-y-1/2 p-3 rounded-xl bg-black text-white hover:bg-gray-800 transition-all shadow-md"
                    >
                      {isParsing ? <Sparkles className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                    </button>
                 </div>
               </form>

               <div className="p-6 rounded-2xl bg-black border border-gray-800 font-mono text-[11px] whitespace-pre text-white/40 overflow-x-auto h-56 relative z-10 selection:bg-white/20">
                  <div className="flex items-center gap-2 mb-4 text-white/20 border-b border-white/5 pb-4 uppercase tracking-widest font-black">
                     <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" /> {isParsing ? 'Processing Instance...' : 'Entity_Extraction_Sync'}
                  </div>
                  <div className={isParsing ? 'opacity-20' : 'opacity-100'}>
                    {jsonOutput}
                  </div>
               </div>
               
               <div className="absolute top-0 right-0 w-32 h-32 bg-gray-50 rounded-full translate-x-12 -translate-y-12 transition-transform group-hover:scale-110" />
            </div>

            {/* Predictive Card */}
            <div className="bg-white rounded-[2.5rem] p-10 border border-gray-50 shadow-sm flex flex-col relative overflow-hidden group">
               <div className="flex items-center gap-4 mb-10 relative z-10">
                 <div className="w-12 h-12 rounded-2xl bg-gray-50 border border-gray-100 flex items-center justify-center"><TrendingUp className="w-6 h-6" /></div>
                 <div>
                    <h3 className="text-2xl font-bold tracking-tight">{role === 'owner' ? 'Resource Analytics' : 'Schedule Efficiency'}</h3>
                    <p className="text-[10px] font-black uppercase tracking-widest text-gray-300">Predictive Modeling</p>
                 </div>
               </div>

               <div className="flex-1 space-y-10 relative z-10">
                 <div className="h-44 flex items-end gap-2 px-2 border-b border-gray-50 mb-8 pb-2">
                    {[40, 65, 30, 85, 50, 75, 95, 60, 45, 90].map((h, i) => (
                      <div key={i} className="flex-1 bg-gray-50 rounded-full relative group/bar overflow-hidden">
                        <motion.div 
                          className="absolute bottom-0 w-full bg-black rounded-full"
                          initial={{ height: 0 }}
                          animate={{ height: `${h}%` }}
                          transition={{ duration: 1.5, delay: i * 0.05, ease: "circOut" }}
                        />
                      </div>
                    ))}
                 </div>
                 
                 <div className="grid grid-cols-2 gap-6">
                    <div className="p-6 rounded-[2rem] bg-black text-white shadow-xl shadow-black/10">
                       <div className="text-[9px] font-black uppercase mb-2 opacity-40 tracking-widest">Confidence Index</div>
                       <div className="text-3xl font-serif font-black">98.2%</div>
                    </div>
                    <div className="p-6 rounded-[2rem] bg-white border border-gray-100 shadow-sm">
                       <div className="text-[9px] font-black uppercase mb-2 text-gray-300 tracking-widest">Inference Latency</div>
                       <div className="text-3xl font-serif font-black italic">42ms</div>
                    </div>
                 </div>
               </div>
               
               <div className="absolute top-0 right-0 w-32 h-32 bg-gray-50 rounded-full translate-x-12 -translate-y-12 transition-transform group-hover:scale-110" />
            </div>
          </div>

          {/* History Log */}
          <div className="bg-white rounded-[2.5rem] border border-gray-50 shadow-sm overflow-hidden">
            <div className="p-10 border-b border-gray-50 flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold tracking-tight leading-tight">Interaction History</h3>
                <p className="text-xs text-gray-400 font-medium italic mt-1">Audit trail for all AI-backed entity processing.</p>
              </div>
              <button className="text-[10px] font-black uppercase tracking-widest border border-gray-100 px-5 py-2 rounded-xl bg-gray-50 hover:bg-black hover:text-white transition-all">Clear Logs</button>
            </div>
            <div className="divide-y divide-gray-50">
               <HistoryItem 
                 input="Book a styling session for next Friday at noon" 
                 output="intent: BOOKING, time: 12:00, date: 2026-04-18" 
                 latency="88ms" 
               />
               <HistoryItem 
                 input="My website template needs dynamic slot updates" 
                 output="intent: CONFIG_UPDATE, entity: TEMPLATE_SLOT" 
                 latency="112ms" 
               />
               <HistoryItem 
                 input="What's the peak time for hair appointments?" 
                 output="query: TRENDS, context: PEAK_HOURS" 
                 latency="14ms" 
               />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

function HistoryItem({ input, output, latency }: { input: string, output: string, latency: string }) {
  return (
    <div className="p-8 flex items-center gap-10 group hover:bg-gray-50/50 transition-all">
       <div className="w-10 h-10 rounded-2xl border border-gray-100 flex items-center justify-center text-gray-300 group-hover:bg-black group-hover:text-white transition-colors">
         <MessageSquare className="w-4 h-4" />
       </div>
       <div className="flex-1">
         <div className="text-sm font-bold text-black mb-1">{input}</div>
         <div className="text-[10px] font-mono text-gray-400 uppercase tracking-widest font-black italic">{output}</div>
       </div>
       <div className="text-right">
         <div className="text-[9px] font-black uppercase tracking-widest text-gray-300 mb-1">Latency</div>
         <div className="text-sm font-black font-mono">{latency}</div>
       </div>
    </div>
  );
}
