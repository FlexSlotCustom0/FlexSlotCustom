"use client";

import { motion } from "framer-motion";
import { BarChart3, Users, Calendar, Settings, Bot, Search, Bell, TrendingUp, Layers, ShieldCheck, CheckCircle2, FileText, Send } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const [currentTenant, setCurrentTenant] = useState({ name: "Sigma Consulting", id: "550e8400-e29b-41d4-a716-446655440000", slug: "sigma-consult" });

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 flex">
      {/* Sidebar */}
      <aside className="w-64 glass border-r border-white/5 flex flex-col h-screen sticky top-0">
        <div className="h-16 flex items-center px-6 border-b border-white/5">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center">
              <Layers className="w-4 h-4 text-white" />
            </div>
            <span className="font-semibold tracking-tight">FlexSlot Command</span>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto py-6 px-3 space-y-1">
          <NavItem href="/dashboard" label="Overview" active={activeTab === 'overview'} />
          <NavItem href="/dashboard/services" label="Services" />
          <NavItem href="/dashboard/bookings" label="Booking & Slots" />
          <NavItem href="/dashboard/customers" label="Customers" />
          <NavItem href="/dashboard/ai" label="AI Insights" />
          <NavItem href="/dashboard/settings" label="Settings" />
        </div>

        <div className="p-4 border-t border-white/5 font-mono">
          <div className="p-3 rounded-xl bg-black/40 border border-white/5 text-xs text-white/70">
            <div className="flex items-center gap-2 mb-2 text-gold-light/50 font-bold uppercase tracking-widest">
              <ShieldCheck className="w-3 h-3 text-gold-deep" /> System Audit
            </div>
            <div className="space-y-1">
              <div className="flex justify-between"><span>Tenant Partition:</span> <span className="text-[10px] text-gold-light">UUID-v4</span></div>
              <div className="flex justify-between"><span>RLS Policy:</span> <span className="text-[10px] text-accent-purple px-1 bg-accent-purple/10 rounded font-bold">ENFORCED</span></div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col">
        {/* Header */}
        <header className="h-16 glass border-b border-white/5 flex items-center justify-between px-8 sticky top-0 z-10">
          <div className="flex items-center gap-4">
            {/* Tenant Switcher */}
            <div className="flex items-center gap-2 bg-slate-900 border border-white/10 rounded-full pl-2 pr-1 py-1">
              <div className="w-6 h-6 rounded-full bg-gold-deep flex items-center justify-center text-[10px] font-bold text-black">
                {currentTenant.name.charAt(0)}
              </div>
              <select
                className="bg-transparent text-sm font-medium border-none focus:ring-0 outline-none pr-6 appearance-none cursor-pointer text-gold-light"
                onChange={(e) => setCurrentTenant(prev => ({ ...prev, name: e.target.value }))}
              >
                <option value="Sigma Consulting">Sigma Consulting</option>
                <option value="Brutalist Design Corp">Brutalist Design Corp</option>
                <option value="Emerald Advisors">Emerald Advisors</option>
              </select>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button className="relative p-2 rounded-full hover:bg-white/5 transition-colors">
              <Bell className="w-5 h-5 text-gold-light/60" />
              <span className="absolute top-1 right-1.5 w-2 h-2 bg-gold-deep rounded-full ring-2 ring-slate-950" />
            </button>
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-gold-deep to-accent-purple border border-white/10" />
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="p-8 flex-1 overflow-y-auto bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-accent-purple/10 via-background to-background">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 flex justify-between items-end"
          >
            <div>
              <h1 className="text-3xl font-bold mb-1 text-gold-light">Command Center</h1>
              <p className="text-white/60 text-sm">Real-time status of the <span className="text-gold-deep font-semibold">{currentTenant.name}</span> partition.</p>
            </div>
          </motion.div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <StatCard title="Active tenant Bookings" value="842" trend="+12.5%" />
            <StatCard title="Isolation Integrity" value="100%" trend="STABLE" highlight />
            <StatCard title="Data Partition Status" value="ISOLATED" trend="RLS ACTIVE" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Chart Area */}
            <div className="lg:col-span-2 glass-card rounded-2xl p-6 border border-white/5">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold">Tenant Resource Utilization</h2>
                <div className="text-xs text-slate-400 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-blue-400" /> Shared DB Instance
                  <span className="w-2 h-2 rounded-full bg-emerald-400" /> Logical Threads
                </div>
              </div>
              <div className="h-64 flex items-end gap-2 px-2">
                {[40, 65, 30, 85, 50, 75, 95].map((h, i) => (
                  <div key={i} className="flex-1 bg-slate-900/50 rounded-t-lg relative group overflow-hidden">
                    <motion.div
                      className="absolute bottom-0 w-full bg-blue-500/10 rounded-t-lg"
                      initial={{ height: 0 }}
                      animate={{ height: `${h}%` }}
                      transition={{ duration: 1, delay: i * 0.1 }}
                    />
                    <motion.div
                      className="absolute bottom-0 w-full bg-gradient-to-t from-blue-600 to-blue-400 rounded-t-lg border-t border-blue-400/50"
                      initial={{ height: 0 }}
                      animate={{ height: `${h - 20}%` }}
                      transition={{ duration: 1.5, delay: i * 0.1 }}
                    />
                  </div>
                ))}
              </div>
              <div className="flex justify-between mt-4 text-[10px] font-bold text-slate-500 px-4 uppercase tracking-widest">
                <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
              </div>
            </div>

            {/* AI Insights Card */}
            <div className="glass-card rounded-2xl p-6 border border-white/5 flex flex-col">
              <div className="flex items-center gap-2 mb-6">
                <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400">
                  <Bot className="w-5 h-5" />
                </div>
                <h2 className="text-lg font-semibold">Live AI Telemetry</h2>
              </div>

              <div className="flex-1 space-y-4">
                <div className="p-4 rounded-xl bg-slate-950/50 border border-white/5">
                  <div className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest mb-2">Model: TinyLlama 1.1B</div>
                  <p className="text-sm text-slate-300 leading-relaxed font-serif italic">
                    "Partition {currentTenant.slug} is experiencing peak concurrency. Background workers scaled to 4 threads."
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 rounded-xl bg-slate-900 border border-white/5 text-center">
                    <div className="text-[10px] text-slate-500 uppercase mb-1">NL Tokens/Sec</div>
                    <div className="font-bold">142.0</div>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-900 border border-white/5 text-center">
                    <div className="text-[10px] text-slate-500 uppercase mb-1">Query Latency</div>
                    <div className="font-bold">42ms</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

function NavItem({ href, label, active }: { href: string, label: string, active?: boolean }) {
  return (
    <Link
      href={href}
      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${active
          ? 'bg-blue-600/10 text-blue-400 border border-blue-500/20 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1)]'
          : 'text-slate-400 hover:bg-white/5 hover:text-slate-200'
        }`}
    >
      {label}
    </Link>
  );
}

function StatCard({ title, value, trend, highlight }: { title: string, value: string, trend: string, highlight?: boolean }) {
  return (
    <div className={`p-6 rounded-2xl border ${highlight ? 'bg-gradient-to-b from-blue-900/40 to-slate-900 border-blue-500/30' : 'glass-card border-white/5'}`}>
      <h3 className={`text-sm font-medium mb-1 ${highlight ? 'text-blue-300' : 'text-slate-400'}`}>{title}</h3>
      <div className="flex items-end justify-between">
        <span className="text-3xl font-bold">{value}</span>
        <span className={`text-xs font-semibold px-2 py-1 rounded-md bg-emerald-500/10 text-emerald-400`}>
          {trend}
        </span>
      </div>
    </div>
  );
}
