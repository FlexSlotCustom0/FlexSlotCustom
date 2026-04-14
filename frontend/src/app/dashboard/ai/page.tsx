"use client";

import { motion } from "framer-motion";
import { Bot, TrendingUp, Sparkles, MessageSquare, FileText, BrainCircuit, ArrowUpRight, ArrowDownRight } from "lucide-react";
import Link from "next/link";

export default function AIInsightsPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 flex">
      <aside className="w-64 glass border-r border-white/5 flex flex-col h-screen sticky top-0 hidden lg:flex">
        <div className="h-16 flex items-center px-6 border-b border-white/5">
          <Link href="/dashboard" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center">
              <Bot className="w-4 h-4 text-white" />
            </div>
            <span className="font-semibold tracking-tight">FlexSlot AI</span>
          </Link>
        </div>
        <div className="flex-1 py-6 px-3 space-y-1">
          <NavItem href="/dashboard" label="Overview" />
          <NavItem href="/dashboard/services" label="Services" />
          <NavItem href="/dashboard/customers" label="Customers" />
          <NavItem href="/dashboard/ai" label="AI Insights" active />
          <NavItem href="/dashboard/settings" label="Settings" />
        </div>
      </aside>

      <main className="flex-1 flex flex-col">
        <header className="h-16 glass border-b border-white/5 flex items-center justify-between px-8 sticky top-0 z-10">
          <h1 className="text-xl font-bold">Intelligent Intelligence Engine</h1>
          <div className="flex items-center gap-2 text-xs font-semibold px-3 py-1 bg-indigo-500/10 text-indigo-400 rounded-full border border-indigo-500/20">
            <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
            V3.1 ONBOARD
          </div>
        </header>

        <div className="p-8">
          <div className="mb-10">
            <h2 className="text-3xl font-bold mb-2">Predictive Analytics & Trends</h2>
            <p className="text-slate-400">Leveraging our local <span className="text-indigo-400 font-mono">TinyLlama-1.1B</span> model to optimize your business operations.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Trend Report Summary */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="glass-card rounded-3xl p-8 border border-white/5 bg-gradient-to-br from-indigo-950/20 to-transparent"
            >
              <div className="flex items-center justify-between mb-8">
                <div className="p-3 rounded-2xl bg-indigo-500/10 text-indigo-400">
                  <TrendingUp className="w-8 h-8" />
                </div>
                <div className="text-right">
                  <div className="text-sm text-slate-500 mb-1">Confidence Score</div>
                  <div className="text-2xl font-bold text-indigo-400">94.2%</div>
                </div>
              </div>
              
              <h3 className="text-xl font-bold mb-4">Demand Forecast</h3>
              <p className="text-slate-400 leading-relaxed mb-6 italic">
                "Analysis of conversational booking requests indicates a significant surge in 'Evening Strategy' inquiries specifically for Tuesdays and Thursdays between 4 PM and 7 PM."
              </p>
              
              <div className="space-y-4">
                <ForecastItem label="Projected Growth" value="+22%" up />
                <ForecastItem label="Wait Time Impact" value="-12 min" up />
                <ForecastItem label="Conversion Rate" value="18.5%" />
              </div>
            </motion.div>

            {/* AI Generation Status */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="glass-card rounded-3xl p-8 border border-white/5"
            >
              <div className="flex items-center justify-between mb-8">
                <div className="p-3 rounded-2xl bg-emerald-500/10 text-emerald-400">
                  <Sparkles className="w-8 h-8" />
                </div>
                <button className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-sm font-medium transition-all">
                  Run New Sync
                </button>
              </div>
              
              <h3 className="text-xl font-bold mb-6">Automated Content Engine</h3>
              
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-slate-900 flex items-center justify-center border border-white/5">
                    <FileText className="w-6 h-6 text-slate-500" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-medium">SEO Service Descriptions</span>
                      <span className="text-xs text-emerald-400">Complete</span>
                    </div>
                    <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                      <div className="h-full w-full bg-emerald-500" />
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-slate-900 flex items-center justify-center border border-white/5">
                    <MessageSquare className="w-6 h-6 text-slate-500" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-medium">Conversational UI Flows</span>
                      <span className="text-xs text-blue-400">Optimizing...</span>
                    </div>
                    <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                      <motion.div 
                        className="h-full bg-blue-500" 
                        initial={{ width: "0%" }}
                        animate={{ width: "75%" }}
                      />
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-slate-900 flex items-center justify-center border border-white/5">
                    <BrainCircuit className="w-6 h-6 text-slate-500" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-medium">Knowledge Graph Expansion</span>
                      <span className="text-xs text-slate-500">Waitlisted</span>
                    </div>
                    <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                      <div className="h-full w-0 bg-slate-700" />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
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
