"use client";

import { motion } from "framer-motion";
import { BarChart3, Users, Calendar, Settings, Bot, Search, Bell, TrendingUp } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 flex">
      {/* Sidebar */}
      <aside className="w-64 glass border-r border-white/5 flex flex-col h-screen sticky top-0">
        <div className="h-16 flex items-center px-6 border-b border-white/5">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center">
              <Calendar className="w-4 h-4 text-white" />
            </div>
            <span className="font-semibold tracking-tight">Sigma Dashboard</span>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto py-6 px-3 space-y-1">
          <NavItem href="/dashboard" label="Overview" active={activeTab === 'overview'} />
          <NavItem href="/dashboard/services" label="Services" active={activeTab === 'bookings'} />
          <NavItem href="/dashboard/customers" label="Customers" active={activeTab === 'customers'} />
          <NavItem href="/dashboard/ai" label="AI Insights" active={activeTab === 'ai'} />
          <NavItem href="/dashboard/settings" label="Settings" active={activeTab === 'settings'} />
        </div>

        <div className="p-4 border-t border-white/5">
          <Link href="/" className="flex items-center justify-center px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-sm font-medium transition-colors">
            Exit to Platform
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col">
        {/* Header */}
        <header className="h-16 glass border-b border-white/5 flex items-center justify-between px-8 sticky top-0 z-10">
          <div className="relative w-64">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search bookings..." 
              className="w-full bg-slate-900/50 border border-white/10 rounded-full pl-10 pr-4 py-1.5 text-sm focus:outline-none focus:border-blue-500/50 transition-colors"
            />
          </div>
          <div className="flex items-center gap-4">
            <button className="relative p-2 rounded-full hover:bg-white/5 transition-colors">
              <Bell className="w-5 h-5 text-slate-400" />
              <span className="absolute top-1 right-1.5 w-2 h-2 bg-blue-500 rounded-full" />
            </button>
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 border border-white/10" />
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="p-8 flex-1 overflow-y-auto">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h1 className="text-2xl font-bold mb-1">Welcome back, Admin</h1>
            <p className="text-slate-400 text-sm">Here's your aggregated tenant data for today.</p>
          </motion.div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <StatCard title="Total Appointments" value="142" trend="+12.5%" />
            <StatCard title="Active Services" value="8" trend="0%" />
            <StatCard title="AI Handled Interactions" value="89" trend="+24.2%" highlight />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Chart Area */}
            <div className="lg:col-span-2 glass-card rounded-2xl p-6 border border-white/5">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold">Booking Velocity</h2>
                <select className="bg-slate-900 border border-white/10 rounded-lg px-3 py-1 text-sm focus:outline-none">
                  <option>Last 7 Days</option>
                  <option>This Month</option>
                </select>
              </div>
              <div className="h-64 flex items-end gap-2">
                {/* Mock Chart */}
                {[40, 25, 60, 45, 80, 55, 90].map((h, i) => (
                  <div key={i} className="flex-1 bg-slate-800 rounded-t-lg relative group">
                    <motion.div 
                      className="absolute bottom-0 w-full bg-gradient-to-t from-blue-600/50 to-blue-400 rounded-t-lg"
                      initial={{ height: 0 }}
                      animate={{ height: `${h}%` }}
                      transition={{ duration: 1, delay: i * 0.1 }}
                    />
                  </div>
                ))}
              </div>
              <div className="flex justify-between mt-4 text-xs text-slate-500 px-2">
                <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
              </div>
            </div>

            {/* AI Insights Card */}
            <div className="glass-card rounded-2xl p-6 border border-white/5 flex flex-col">
              <div className="flex items-center gap-2 mb-6">
                <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400">
                  <Bot className="w-5 h-5" />
                </div>
                <h2 className="text-lg font-semibold">AI Trend Reports</h2>
              </div>
              
              <div className="flex-1 space-y-4">
                <div className="p-4 rounded-xl bg-slate-900/50 border border-white/5">
                  <div className="flex items-center gap-2 mb-2 text-sm text-blue-400 font-medium">
                    <TrendingUp className="w-4 h-4" /> Demand Shift Detected
                  </div>
                  <p className="text-sm text-slate-400 leading-relaxed">
                    Based on natural language inquiries, there is a 40% increase in requests for "Consultation" services next Tuesday. Consider opening more slots.
                  </p>
                </div>
                
                <div className="p-4 rounded-xl bg-slate-900/50 border border-white/5">
                  <div className="flex items-center gap-2 mb-2 text-sm text-emerald-400 font-medium">
                    <TrendingUp className="w-4 h-4" /> Optimized Profile
                  </div>
                  <p className="text-sm text-slate-400 leading-relaxed">
                    Auto-generated SEO descriptions are driving 15% more traffic to your tenant landing page.
                  </p>
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
      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
        active 
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
