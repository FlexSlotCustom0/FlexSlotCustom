"use client";

import { motion } from "framer-motion";
import { Plus, Search, Edit2, Trash2, Clock, DollarSign, LayoutGrid, List, Bot, Sparkles } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const SERVICES = [
  { id: 1, name: "Business Consultation", duration: "60 min", price: "$120", category: "Strategy", description: "Advanced strategic planning for growing businesses." },
  { id: 2, name: "SEO Audit", duration: "45 min", price: "$85", category: "Marketing", description: "Complete analysis of your website's search engine performance." },
  { id: 3, name: "Tax Planning", duration: "30 min", price: "$50", category: "Finance", description: "Personalized advice for year-end tax optimization." },
  { id: 4, name: "Platform Training", duration: "90 min", price: "$150", category: "Support", description: "Onboarding for new team members on the FlexSlot platform." },
];

export default function ServicesPage() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  return (
    <div className="min-h-screen bg-background text-foreground flex">
      <aside className="w-64 glass border-r border-border/10 flex flex-col h-screen sticky top-0 hidden lg:flex">
        <div className="h-16 flex items-center px-6 border-b border-border/10 font-bold tracking-tight">
          Catalog Engine
        </div>
        <div className="flex-1 py-6 px-3 space-y-1">
          <NavItem href="/dashboard" label="Overview" />
          <NavItem href="/dashboard/services" label="Services" active />
          <NavItem href="/dashboard/bookings" label="Booking & Slots" />
          <NavItem href="/dashboard/customers" label="Customers" />
          <NavItem href="/dashboard/ai" label="AI Insights" />
          <NavItem href="/dashboard/settings" label="Settings" />
        </div>
      </aside>

      <main className="flex-1 flex flex-col">
        <header className="h-16 glass border-b border-border/10 flex items-center justify-between px-8 sticky top-0 z-10">
          <h1 className="text-xl font-black">Service Catalog</h1>
          <div className="flex items-center gap-4">
            <button className="flex items-center gap-2 px-6 py-2 border border-white/20 rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-white/10 transition-all">
              <Sparkles className="w-4 h-4" /> AI Content Gen
            </button>
            <button className="flex items-center gap-2 px-6 py-2 bg-white text-black rounded-full text-[10px] font-black uppercase tracking-widest hover:opacity-90 transition-all">
              <Plus className="w-4 h-4" /> Add Service
            </button>
          </div>
        </header>

        <div className="p-10">
          {/* AI Banner */}
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12 p-8 rounded-[2.5rem] border border-white/10 flex items-center gap-8 bg-white/[0.02]"
          >
            <div className="w-16 h-16 rounded-2xl bg-white flex items-center justify-center text-black">
              <Bot className="w-8 h-8" />
            </div>
            <div className="flex-1">
              <h3 className="font-black text-xl flex items-center gap-4">
                Telemetric Generator
                <span className="text-[10px] px-3 py-1 bg-white/5 rounded-full border border-white/10 font-black tracking-widest">v1.1</span>
              </h3>
              <p className="text-sm text-foreground/30 mt-2 font-light max-w-xl">
                Instantly create high-density service descriptions to accelerate tenant onboarding and SEO performance.
              </p>
            </div>
            <button className="px-8 py-3 bg-white text-black rounded-full text-[10px] font-black uppercase tracking-widest hover:opacity-90 transition-all shadow-xl shadow-white/5">
              Batch Process
            </button>
          </motion.div>

          <div className="flex items-center justify-between mb-12">
            <div className="space-y-1">
              <h2 className="text-3xl font-black tracking-tighter">Tenant Offerings</h2>
              <p className="text-foreground/30 text-sm font-light">Manage partition-specific services and pricing models.</p>
            </div>
            <div className="flex border border-white/10 rounded-2xl p-1 bg-white/5">
              <button 
                onClick={() => setViewMode('grid')}
                className={`p-2.5 rounded-xl transition-all ${viewMode === 'grid' ? 'bg-white text-black shadow-lg' : 'text-white/20'}`}
              >
                <LayoutGrid className="w-5 h-5" />
              </button>
              <button 
                onClick={() => setViewMode('list')}
                className={`p-2.5 rounded-xl transition-all ${viewMode === 'list' ? 'bg-white text-black shadow-lg' : 'text-white/20'}`}
              >
                <List className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className={viewMode === 'grid' ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" : "space-y-4"}>
            {SERVICES.map((service, idx) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.05 }}
                className="glass-card rounded-[2rem] border border-white/5 hover:border-white/20 transition-all p-8 group flex flex-col h-full"
              >
                <div className="flex items-start justify-between mb-8">
                  <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white/40"><Clock className="w-6 h-6" /></div>
                  <div className="flex gap-2">
                    <button className="p-2.5 rounded-xl hover:bg-white/5 text-white/20 hover:text-white transition-all"><Edit2 className="w-4 h-4" /></button>
                    <button className="p-2.5 rounded-xl hover:bg-white/5 text-white/20 hover:text-white transition-all"><Trash2 className="w-4 h-4" /></button>
                  </div>
                </div>
                <div className="mb-8 flex-1">
                  <span className="text-[9px] font-black uppercase tracking-[0.3em] text-white/20 mb-3 block">{service.category}</span>
                  <h3 className="text-xl font-black text-white mb-3">{service.name}</h3>
                  <p className="text-sm text-foreground/30 font-light leading-relaxed">{service.description}</p>
                </div>
                <div className="flex items-center justify-between pt-8 border-t border-white/5">
                   <span className="text-[10px] font-black uppercase tracking-widest text-white/20">{service.duration}</span>
                   <span className="text-xl font-black text-white">{service.price}</span>
                </div>
              </motion.div>
            ))}
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
