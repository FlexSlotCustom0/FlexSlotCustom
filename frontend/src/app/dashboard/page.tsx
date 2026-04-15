"use client";

import { motion } from "framer-motion";
import { BarChart3, Users, Calendar, Settings, Bot, Search, Bell, TrendingUp, Layers, ShieldCheck, CheckCircle2, FileText, Send } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const [currentTenant, setCurrentTenant] = useState({ name: "Sigma Consulting", id: "550e8400-e29b-41d4-a716-446655440000", slug: "sigma-consult" });

  return (
    <div className="min-h-screen bg-background text-foreground flex">
      {/* Sidebar */}
      <aside className="w-64 glass border-r border-border/10 flex flex-col h-screen sticky top-0">
        <div className="h-16 flex items-center px-6 border-b border-border/10">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-foreground flex items-center justify-center">
              <Layers className="w-4 h-4 text-background" />
            </div>
            <span className="font-semibold tracking-tight text-foreground">FlexSlotCustom Command</span>
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

        <div className="p-4 border-t border-border/10 font-mono">
          <div className="p-3 rounded-xl bg-white/[0.05] border border-white/5 text-xs text-foreground/40">
            <div className="flex items-center gap-2 mb-2 text-foreground/60 font-bold uppercase tracking-widest text-[10px]">
              <ShieldCheck className="w-3 h-3 text-white" /> System Audit
            </div>
            <div className="space-y-1">
              <div className="flex justify-between"><span>Tenant Partition:</span> <span className="text-[10px] text-white/60">UUID-v4</span></div>
              <div className="flex justify-between"><span>RLS Policy:</span> <span className="text-[10px] text-white px-1 bg-white/10 rounded font-bold">ENFORCED</span></div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col">
        {/* Header */}
        <header className="h-16 glass border-b border-border/10 flex items-center justify-between px-8 sticky top-0 z-10">
          <div className="flex items-center gap-4">
            {/* Tenant Switcher */}
            <div className="flex items-center gap-2 bg-white/[0.05] border border-border/10 rounded-full pl-2 pr-1 py-1">
              <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center text-[10px] font-bold text-black">
                {currentTenant.name.charAt(0)}
              </div>
              <select
                className="bg-transparent text-sm font-medium border-none focus:ring-0 outline-none pr-6 appearance-none cursor-pointer text-white/60"
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
              <Bell className="w-5 h-5 text-white/40" />
              <span className="absolute top-1 right-1.5 w-2 h-2 bg-white rounded-full ring-2 ring-background" />
            </button>
            <div className="w-8 h-8 rounded-full bg-white/10 border border-border/10" />
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="p-8 flex-1 overflow-y-auto bg-[radial-gradient(ellipse_at_top,_#1a1a1a_0%,_var(--background)_100%)]">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 flex justify-between items-end"
          >
            <div>
              <h1 className="text-3xl font-bold mb-1">Command Center</h1>
              <p className="text-white/30 text-sm font-light">Real-time status of the <span className="text-white font-semibold">{currentTenant.name}</span> partition.</p>
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
            <div className="lg:col-span-2 glass-card rounded-[2.5rem] p-8 border border-border/10">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-lg font-bold uppercase tracking-tight">Resource Utilization</h2>
                <div className="text-[10px] text-white/20 flex items-center gap-4 font-black uppercase tracking-widest">
                  <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-white" /> DB Instance</div>
                  <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-white/20" /> Threads</div>
                </div>
              </div>
              <div className="h-64 flex items-end gap-3 px-2">
                {[40, 65, 30, 85, 50, 75, 95].map((h, i) => (
                  <div key={i} className="flex-1 bg-white/[0.02] rounded-t-2xl relative group overflow-hidden border-x border-t border-white/5">
                    <motion.div
                      className="absolute bottom-0 w-full bg-white/5 rounded-t-2xl"
                      initial={{ height: 0 }}
                      animate={{ height: `${h}%` }}
                      transition={{ duration: 1, delay: i * 0.1 }}
                    />
                    <motion.div
                      className="absolute bottom-0 w-full bg-white rounded-t-2xl opacity-80"
                      initial={{ height: 0 }}
                      animate={{ height: `${h - 20}%` }}
                      transition={{ duration: 1.5, delay: i * 0.1 }}
                    />
                  </div>
                ))}
              </div>
              <div className="flex justify-between mt-6 text-[9px] font-black text-white/20 px-6 uppercase tracking-[0.4em]">
                <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
              </div>
            </div>

            {/* AI Insights Card */}
            <div className="glass-card rounded-[2.5rem] p-8 border border-border/10 flex flex-col">
              <div className="flex items-center gap-3 mb-8">
                <div className="p-3 rounded-2xl bg-white text-black">
                  <Bot className="w-6 h-6" />
                </div>
                <h2 className="text-lg font-bold">Telemetric AI</h2>
              </div>

              <div className="flex-1 space-y-6">
                <div className="p-6 rounded-3xl bg-white/[0.03] border border-white/5">
                  <div className="text-[9px] font-black text-white/20 uppercase tracking-[0.3em] mb-4">Model: TinyLlama 1.1B</div>
                  <p className="text-sm text-white/60 leading-relaxed italic font-serif">
                    "Partition {currentTenant.slug} persistent. Concurrent requests handled via row-level isolation."
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-5 rounded-3xl bg-white/[0.02] border border-white/5 text-center">
                    <div className="text-[9px] text-white/20 uppercase mb-2 font-black tracking-widest">Tokens/S</div>
                    <div className="font-bold text-white">142.0</div>
                  </div>
                  <div className="p-5 rounded-3xl bg-white/[0.02] border border-white/5 text-center">
                    <div className="text-[9px] text-white/20 uppercase mb-2 font-black tracking-widest">Latency</div>
                    <div className="font-bold text-white">42ms</div>
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
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-bold tracking-tight transition-all ${active
          ? 'bg-white text-black shadow-lg'
          : 'text-white/30 hover:bg-white/5 hover:text-white'
        }`}
    >
      {label}
    </Link>
  );
}

function StatCard({ title, value, trend, highlight }: { title: string, value: string, trend: string, highlight?: boolean }) {
  return (
    <div className={`p-8 rounded-[2rem] border ${highlight ? 'bg-white text-black border-white' : 'glass-card border-border/10'}`}>
      <h3 className={`text-[10px] font-black uppercase tracking-[0.2em] mb-4 ${highlight ? 'text-black/40' : 'text-white/20'}`}>{title}</h3>
      <div className="flex items-end justify-between">
        <span className="text-4xl font-black tracking-tighter">{value}</span>
        <span className={`text-[10px] font-black px-3 py-1.5 rounded-lg ${highlight ? 'bg-black text-white' : 'bg-white/10 text-white/60'}`}>
          {trend}
        </span>
      </div>
    </div>
  );
}
