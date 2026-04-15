"use client";

import { motion } from "framer-motion";
import { 
  Settings, Palette, Shield, Database, Globe, Bot, Save, 
  Bell, ChevronLeft, Lock, Cpu, Eye, User, Store
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function SettingsPage() {
  const [role, setRole] = useState<"owner" | "customer">("owner");
  const [schema, setSchema] = useState(JSON.stringify({
    "branding": {
      "theme": "monochrome-premium",
      "font": "Instrument Serif",
      "accent": "emerald-500"
    },
    "security": {
      "isolation": "RLS_ENFORCED",
      "partition": "tenant_uuid_v4"
    }
  }, null, 2));

  return (
    <div className="min-h-screen bg-[#FDFDFD] text-black font-sans flex">
      {/* Navigation Rail */}
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
              <h1 className="text-2xl font-serif">System Console</h1>
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-[0.2em] font-mono">Configuration & Governance</p>
            </div>
            
            <div className="flex bg-gray-50 p-1 rounded-xl border border-gray-100">
              <button 
                onClick={() => setRole("owner")}
                className={`flex items-center gap-2 px-4 py-1.5 rounded-lg text-xs font-bold uppercase tracking-widest transition-all ${role === "owner" ? "bg-white text-black shadow-sm" : "text-gray-400"}`}
              >
                <Store className="w-3.5 h-3.5" /> Studio
              </button>
              <button 
                onClick={() => setRole("customer")}
                className={`flex items-center gap-2 px-4 py-1.5 rounded-lg text-xs font-bold uppercase tracking-widest transition-all ${role === "customer" ? "bg-white text-black shadow-sm" : "text-gray-400"}`}
              >
                <User className="w-3.5 h-3.5" /> Profile
              </button>
            </div>
          </div>

          <div className="flex items-center gap-4">
             <button className="flex items-center gap-2 px-6 py-3 bg-black text-white rounded-xl text-xs font-bold hover:bg-gray-800 transition-all shadow-md">
                <Save className="w-4 h-4" /> Commit Changes
             </button>
          </div>
        </header>

        <div className="p-10 max-w-5xl mx-auto w-full">
          <div className="mb-12">
            <h2 className="text-5xl font-serif tracking-tight mb-2 italic">Global Parameters</h2>
            <p className="text-gray-400 font-medium italic">Orchestrate your {role === 'owner' ? 'tenant environment' : 'personal experience'} with precision.</p>
          </div>

          <div className="space-y-12">
            {/* Branding section */}
            <section className="bg-white rounded-[2.5rem] border border-gray-50 shadow-sm overflow-hidden group">
               <div className="p-8 border-b border-gray-50 flex items-center justify-between bg-gray-50/30">
                 <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm text-black transition-transform group-hover:scale-110"><Palette className="w-6 h-6" /></div>
                    <h3 className="text-xl font-bold">Aesthetic Schema</h3>
                 </div>
                 <Eye className="w-5 h-5 text-gray-200" />
               </div>
               
               <div className="p-10">
                 <div className="text-[10px] font-black uppercase tracking-widest text-gray-300 mb-6 font-mono">
                    // Edit JSON parameters to override global styles
                 </div>
                 <textarea 
                    value={schema}
                    onChange={(e) => setSchema(e.target.value)}
                    spellCheck={false}
                    className="w-full h-48 bg-black text-white p-8 rounded-3xl font-mono text-xs leading-relaxed focus:outline-none focus:ring-2 focus:ring-gray-100 selection:bg-white/10"
                 />
               </div>
            </section>

            {/* Governance section */}
            <section className="bg-white rounded-[2.5rem] border border-gray-50 shadow-sm overflow-hidden group">
               <div className="p-8 border-b border-gray-50 flex items-center justify-between bg-gray-50/30">
                 <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm text-black transition-transform group-hover:scale-110"><Shield className="w-6 h-6" /></div>
                    <h3 className="text-xl font-bold">Privacy Governance</h3>
                 </div>
                 <Lock className="w-5 h-5 text-gray-200" />
               </div>
               
               <div className="p-10 space-y-8">
                  <div className="p-6 rounded-3xl bg-gray-50 border border-gray-100 font-mono text-[10px] leading-relaxed text-gray-400">
                    <span className="text-black font-bold">ENFORCE POLICY</span> isolation_control <span className="text-black font-bold">ON</span> grid_v4<br/>
                    <span className="text-black font-bold">USING</span> (role_scope = '{role.toUpperCase()}');
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <SettingsToggle label="Data Anonymization" desc="Hide personal details in logs" active />
                    <SettingsToggle label="Real-time Sync" desc="Propagate changes matching G-Cal" active />
                    <SettingsToggle label="AI Assistance" desc="Allow LLM to parse private intents" active={false} />
                    <SettingsToggle label="Global Discovery" desc="List my services in marketplace" active />
                  </div>
               </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}

function SettingsToggle({ label, desc, active }: { label: string, desc: string, active: boolean }) {
  return (
    <div className="flex items-center justify-between p-6 rounded-2xl border border-gray-50 hover:bg-gray-50/50 transition-all cursor-pointer">
      <div className="flex-1">
        <div className="text-sm font-bold text-black mb-0.5">{label}</div>
        <div className="text-[10px] text-gray-400 font-medium italic">{desc}</div>
      </div>
      <div className={`w-10 h-5 rounded-full relative transition-colors ${active ? 'bg-black' : 'bg-gray-100'}`}>
        <div className={`absolute top-1 w-3 h-3 rounded-full bg-white transition-all ${active ? 'left-6' : 'left-1'}`} />
      </div>
    </div>
  );
}
