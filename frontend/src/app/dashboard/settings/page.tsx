"use client";

import { motion } from "framer-motion";
import { Settings, Palette, Shield, Database, Globe, Bot, Save, Bell } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function SettingsPage() {
  const [theme, setTheme] = useState('sigma-dark');

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 flex">
      <aside className="w-64 glass border-r border-white/5 flex flex-col h-screen sticky top-0 hidden lg:flex">
        <div className="h-16 flex items-center px-6 border-b border-white/5">
          <Link href="/dashboard" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center">
              <Settings className="w-4 h-4 text-white" />
            </div>
            <span className="font-semibold tracking-tight">System Settings</span>
          </Link>
        </div>
        <div className="flex-1 py-6 px-3 space-y-1">
          <NavItem href="/dashboard" label="Overview" />
          <NavItem href="/dashboard/services" label="Services" />
          <NavItem href="/dashboard/customers" label="Customers" />
          <NavItem href="/dashboard/ai" label="AI Insights" />
          <NavItem href="/dashboard/settings" label="Settings" active />
        </div>
      </aside>

      <main className="flex-1 flex flex-col">
        <header className="h-16 glass border-b border-white/5 flex items-center justify-between px-8 sticky top-0 z-10">
          <h1 className="text-xl font-bold">Tenant Configuration</h1>
          <button className="flex items-center gap-2 px-5 py-2 bg-blue-600 hover:bg-blue-500 rounded-xl text-sm font-bold transition-all shadow-lg shadow-blue-500/20">
            <Save className="w-4 h-4" /> Save Changes
          </button>
        </header>

        <div className="p-8 max-w-5xl mx-auto w-full">
          <div className="mb-10">
            <h2 className="text-3xl font-bold mb-2">Global System Config</h2>
            <p className="text-slate-400 text-sm">Fine-tune your multi-tenant environment and AI behavior parameters.</p>
          </div>

          <div className="space-y-8">
            {/* Business Identity */}
            <section className="glass-card rounded-3xl border border-white/5 overflow-hidden">
              <div className="p-6 border-b border-white/5 flex items-center gap-3 bg-white/5">
                <Globe className="w-5 h-5 text-blue-400" />
                <h3 className="font-bold">Business Persona</h3>
              </div>
              <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Business Name</label>
                  <input type="text" defaultValue="Sigma Consulting" className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500/30 transition-all font-medium" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Tenant Slug (URL)</label>
                  <div className="flex items-center">
                    <span className="px-4 py-3 bg-slate-800 rounded-l-xl text-xs text-slate-500 border border-white/10 border-r-0">flexslot.io/</span>
                    <input type="text" defaultValue="sigma-consult" className="w-full bg-slate-900/50 border border-white/10 rounded-r-xl px-4 py-3 focus:outline-none font-medium" />
                  </div>
                </div>
              </div>
            </section>

            {/* Dynamic Theming */}
            <section className="glass-card rounded-3xl border border-white/5 overflow-hidden">
              <div className="p-6 border-b border-white/5 flex items-center gap-3 bg-white/5">
                <Palette className="w-5 h-5 text-purple-400" />
                <h3 className="font-bold">UI Theme Engine</h3>
              </div>
              <div className="p-8 space-y-8">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <ThemeOption active={theme === 'sigma-dark'} onClick={() => setTheme('sigma-dark')} label="Sigma Dark" color="bg-slate-900" />
                  <ThemeOption active={theme === 'brutalist'} onClick={() => setTheme('brutalist')} label="Brutalist" color="bg-zinc-100" />
                  <ThemeOption active={theme === 'emerald'} onClick={() => setTheme('emerald')} label="Emerald Depth" color="bg-emerald-950" />
                  <ThemeOption active={theme === 'cyber'} onClick={() => setTheme('cyber')} label="Cybernetic" color="bg-indigo-950" />
                </div>
                <div className="p-6 rounded-2xl bg-slate-900/50 border border-white/10 border-dashed flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="font-medium">Custom JSON Schema</p>
                    <p className="text-xs text-slate-500">Override base components with a raw configuration file.</p>
                  </div>
                  <button className="px-4 py-2 bg-white/5 hover:bg-white/10 rounded-xl text-xs transition-all">Upload Schema</button>
                </div>
              </div>
            </section>

            {/* AI Engine Settings */}
            <section className="glass-card rounded-3xl border border-white/5 overflow-hidden">
              <div className="p-6 border-b border-white/5 flex items-center gap-3 bg-white/5">
                <Bot className="w-5 h-5 text-indigo-400" />
                <h3 className="font-bold">LLM Infrastructure</h3>
              </div>
              <div className="p-8 space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Active Model</h4>
                    <p className="text-xs text-slate-500">Self-hosted instances on your private cluster.</p>
                  </div>
                  <select className="bg-slate-900 border border-white/10 rounded-xl px-4 py-2 text-sm outline-none">
                    <option>TinyLlama 1.1B v1.4 (Default)</option>
                    <option>DeepSeek R1-Distill-7B</option>
                  </select>
                </div>
                <div className="space-y-4 pt-4 border-t border-white/5">
                  <ConfigToggle label="Asynchronous AI Parsing" description="Process natural language requests in background workers to reduce UI latency." defaultChecked />
                  <ConfigToggle label="Data Locality Compliance" description="Ensure all AI computational tasks remain strictly on your server-side infrastructure." defaultChecked />
                  <ConfigToggle label="Automated SEO Extraction" description="Automatically generate descriptions for every new service created." />
                </div>
              </div>
            </section>

            {/* Security & Isolation */}
            <section className="glass-card rounded-3xl border border-white/5 overflow-hidden">
              <div className="p-6 border-b border-white/5 flex items-center gap-3 bg-white/5">
                <Shield className="w-5 h-5 text-emerald-400" />
                <h3 className="font-bold">Data Isolation & Security</h3>
              </div>
              <div className="p-8 space-y-6">
                <div className="flex items-start gap-4 p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/20">
                  <Database className="w-5 h-5 text-emerald-400 mt-1" />
                  <div>
                    <h4 className="font-medium text-emerald-400">PostgreSQL Row Level Security (RLS)</h4>
                    <p className="text-sm text-slate-400 leading-relaxed">System-wide RLS is currently <strong>Active</strong>. Your tenant data is logically isolated at the persistence layer using UUID-based partitioning.</p>
                  </div>
                </div>
                <div className="flex items-center justify-between pt-2">
                  <div className="flex items-center gap-2 text-sm">
                    <Bell className="w-4 h-4 text-slate-500" />
                    Notify me on cross-tenant access attempts
                  </div>
                  <input type="checkbox" className="w-5 h-5 rounded-md bg-slate-900 border-white/10 text-blue-600 focus:ring-blue-500" defaultChecked />
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}

function ConfigToggle({ label, description, defaultChecked }: { label: string, description: string, defaultChecked?: boolean }) {
  return (
    <div className="flex items-center justify-between">
      <div className="space-y-1 pr-8">
        <h4 className="text-sm font-medium">{label}</h4>
        <p className="text-xs text-slate-500">{description}</p>
      </div>
      <label className="relative inline-flex items-center cursor-pointer">
        <input type="checkbox" className="sr-only peer" defaultChecked={defaultChecked} />
        <div className="w-11 h-6 bg-slate-800 rounded-full peer peer-focus:ring-2 peer-focus:ring-blue-500/50 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
      </label>
    </div>
  );
}

function ThemeOption({ active, onClick, label, color }: { active: boolean, onClick: () => void, label: string, color: string }) {
  return (
    <button 
      onClick={onClick}
      className={`relative p-1 rounded-2xl border-2 transition-all ${active ? 'border-blue-500 scale-105' : 'border-transparent hover:border-white/10'}`}
    >
      <div className={`h-24 rounded-xl ${color} mb-2 border border-white/5 overflow-hidden`}>
        <div className="w-1/3 h-full bg-black/20" />
      </div>
      <span className="text-xs font-bold text-slate-300">{label}</span>
    </button>
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
