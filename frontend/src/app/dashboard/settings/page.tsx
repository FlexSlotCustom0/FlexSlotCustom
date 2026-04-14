"use client";

import { motion } from "framer-motion";
import { Settings, Palette, Shield, Database, Globe, Bot, Save, Bell } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function SettingsPage() {
  const [theme, setTheme] = useState('sigma-dark');
  const [schema, setSchema] = useState(JSON.stringify({
    "theme": "sigma-dark",
    "branding": {
      "primary": "#3b82f6",
      "font": "Geist Sans"
    },
    "layout": "brutalist-grid",
    "isolation": "UUID_V4"
  }, null, 2));

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 flex">
      <aside className="w-64 glass border-r border-white/5 flex flex-col h-screen sticky top-0 hidden lg:flex">
        <div className="h-16 flex items-center px-6 border-b border-white/5">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center">
              <Settings className="w-4 h-4 text-white" />
            </div>
            <span className="font-semibold tracking-tight">System Settings</span>
          </div>
        </div>
        <div className="flex-1 py-6 px-3 space-y-1">
          <NavItem href="/dashboard" label="Overview" />
          <NavItem href="/dashboard/services" label="Services" />
          <NavItem href="/dashboard/bookings" label="Booking & Slots" />
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
            {/* UI Schema Editor */}
            <section className="glass-card rounded-3xl border border-white/5 overflow-hidden">
              <div className="p-6 border-b border-white/5 flex items-center gap-3 bg-white/5">
                <Palette className="w-5 h-5 text-blue-400" />
                <h3 className="font-bold">UI Schema Editor</h3>
              </div>
              <div className="p-8">
                <p className="text-xs text-slate-500 mb-4 font-mono uppercase tracking-tighter">
                  // Modify the JSON schema to update tenant branding and grid layouts instantly.
                </p>
                <textarea 
                  value={schema}
                  onChange={(e) => setSchema(e.target.value)}
                  spellCheck={false}
                  className="w-full h-48 bg-black/40 border border-white/10 rounded-xl p-4 font-mono text-xs text-blue-300 focus:outline-none focus:border-blue-500/50 resize-none scrollbar-hide"
                />
              </div>
            </section>

            {/* Security & RLS */}
            <section className="glass-card rounded-3xl border border-white/5 overflow-hidden">
              <div className="p-6 border-b border-white/5 flex items-center gap-3 bg-white/5">
                <Shield className="w-5 h-5 text-emerald-400" />
                <h3 className="font-bold">Security Compliance (RLS)</h3>
              </div>
              <div className="p-8">
                <div className="mb-6">
                   <div className="flex items-center gap-2 text-[10px] font-bold text-emerald-500 uppercase mb-2">
                     <span className="w-2 h-2 rounded-full bg-emerald-500" /> PostgreSQL Active Policy
                   </div>
                   <div className="p-4 rounded-xl bg-slate-950 border border-white/5 font-mono text-[10px] leading-relaxed text-slate-400">
                     <span className="text-emerald-500">CREATE POLICY</span> tenant_isolation_policy <span className="text-emerald-500">ON</span> bookings<br/>
                     <span className="text-emerald-500">FOR ALL</span><br/>
                     <span className="text-emerald-500">USING</span> (tenant_id = current_setting(<span className="text-blue-400">'app.current_tenant'</span>)::uuid);
                   </div>
                </div>
                
                <div className="flex items-start gap-4 p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/20">
                  <Database className="w-5 h-5 text-emerald-400 mt-1" />
                  <div>
                    <h4 className="font-medium text-emerald-400 text-sm">Hardened Multi-Tenancy</h4>
                    <p className="text-[10px] text-slate-400 leading-relaxed mt-1">
                      Data is logically isolated at the database level. Each transaction is scoped to the authenticated tenant UUID before execution.
                    </p>
                  </div>
                </div>
              </div>
            </section>
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
