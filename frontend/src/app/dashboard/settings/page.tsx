"use client";

import { motion } from "framer-motion";
import { Settings, Palette, Shield, Database, Globe, Bot, Save, Bell } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function SettingsPage() {
  const [theme, setTheme] = useState('discrete-monochrome');
  const [schema, setSchema] = useState(JSON.stringify({
    "theme": "discrete-monochrome",
    "branding": {
      "foreground": "#ffffff",
      "font": "Geist Mono"
    },
    "layout": "high-density-grid",
    "isolation": "UUID_CLUSTER_V4"
  }, null, 2));

  return (
    <div className="min-h-screen bg-background text-foreground flex">
      <aside className="w-64 glass border-r border-border/10 flex flex-col h-screen sticky top-0 hidden lg:flex">
        <div className="h-16 flex items-center px-6 border-b border-border/10">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center">
              <Settings className="w-4 h-4 text-black" />
            </div>
            <span className="font-bold tracking-tight">System Configuration</span>
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
        <header className="h-16 glass border-b border-border/10 flex items-center justify-between px-8 sticky top-0 z-10">
          <h1 className="text-xl font-black">Tenant Control Plane</h1>
          <button className="flex items-center gap-3 px-8 py-2.5 bg-white text-black rounded-full text-[10px] font-black uppercase tracking-widest hover:opacity-90 transition-all shadow-2xl">
            <Save className="w-4 h-4" /> Save Configuration
          </button>
        </header>

        <div className="p-10 max-w-5xl mx-auto w-full">
          <div className="mb-12">
            <h2 className="text-4xl font-black tracking-tighter mb-2">Global Parameters</h2>
            <p className="text-foreground/30 font-light text-lg">Fine-tune your high-density environment and discrete AI behavior.</p>
          </div>

          <div className="space-y-10">
            {/* UI Schema Editor */}
            <section className="glass-card rounded-[2.5rem] border border-white/10 overflow-hidden bg-white/[0.01]">
              <div className="p-8 border-b border-white/5 flex items-center gap-4 bg-white/5">
                <Palette className="w-6 h-6 text-white" />
                <h3 className="text-xl font-black tracking-tight">Branding Schema</h3>
              </div>
              <div className="p-10">
                <p className="text-[10px] text-white/20 mb-6 font-mono uppercase tracking-[0.3em]">
                  // Update the JSON parameters to apply discrete branding instantly.
                </p>
                <textarea 
                  value={schema}
                  onChange={(e) => setSchema(e.target.value)}
                  spellCheck={false}
                  className="w-full h-56 bg-black border border-white/10 rounded-2xl p-6 font-mono text-[11px] text-white/50 focus:outline-none focus:border-white/30 resize-none scrollbar-hide"
                />
              </div>
            </section>

            {/* Security & RLS */}
            <section className="glass-card rounded-[2.5rem] border border-white/10 overflow-hidden bg-white/[0.01]">
              <div className="p-8 border-b border-white/5 flex items-center gap-4 bg-white/5">
                <Shield className="w-6 h-6 text-white" />
                <h3 className="text-xl font-black tracking-tight">Isolation Compliance</h3>
              </div>
              <div className="p-10">
                <div className="mb-10">
                   <div className="flex items-center gap-3 text-[10px] font-black text-white uppercase mb-4 tracking-widest">
                     <span className="w-2 h-2 rounded-full bg-white animate-pulse" /> Active Partition Policy
                   </div>
                   <div className="p-6 rounded-2xl bg-black border border-white/5 font-mono text-[10px] leading-relaxed text-white/40">
                     <span className="text-white">CREATE POLICY</span> isolation_control <span className="text-white">ON</span> persistence_grid<br/>
                     <span className="text-white">FOR ALL</span><br/>
                     <span className="text-white">USING</span> (tenant_id = current_setting(<span className="text-white/60">'scope.tenant_id'</span>)::uuid);
                   </div>
                </div>
                
                <div className="flex items-start gap-6 p-8 rounded-[1.5rem] bg-white text-black">
                  <Database className="w-8 h-8 opacity-20 mt-1" />
                  <div>
                    <h4 className="font-black text-lg tracking-tight">PostgreSQL Row-Level Guard</h4>
                    <p className="text-xs leading-relaxed mt-2 opacity-50 font-bold">
                      Data is logically isolated at the database level. Each transaction is scoped to the authenticated tenant UUID before execution, ensuring absolute logical boundaries.
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
