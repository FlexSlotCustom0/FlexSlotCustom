"use client";

import { motion } from "framer-motion";
import { Plus, Search, Edit2, Trash2, Clock, DollarSign, LayoutGrid, List } from "lucide-react";
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
    <div className="min-h-screen bg-slate-950 text-slate-50 flex">
      {/* Reusable Sidebar component would be better, but building full page for wow factor */}
      <aside className="w-64 glass border-r border-white/5 flex flex-col h-screen sticky top-0 hidden lg:flex">
        <div className="h-16 flex items-center px-6 border-b border-white/5">
          <Link href="/dashboard" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center">
              <Clock className="w-4 h-4 text-white" />
            </div>
            <span className="font-semibold tracking-tight">FlexSlot</span>
          </Link>
        </div>
        <div className="flex-1 py-6 px-3 space-y-1">
          <NavItem href="/dashboard" label="Overview" />
          <NavItem href="/dashboard/services" label="Services" active />
          <NavItem href="/dashboard/customers" label="Customers" />
          <NavItem href="/dashboard/ai" label="AI Insights" />
          <NavItem href="/dashboard/settings" label="Settings" />
        </div>
      </aside>

      <main className="flex-1 flex flex-col">
        <header className="h-16 glass border-b border-white/5 flex items-center justify-between px-8 sticky top-0 z-10">
          <h1 className="text-xl font-bold">Service Catalog</h1>
          <div className="flex items-center gap-4">
            <button className="p-2 rounded-lg hover:bg-white/5 transition-colors text-slate-400">
              <Search className="w-5 h-5" />
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-xl text-sm font-semibold transition-all">
              <Plus className="w-4 h-4" /> Add Service
            </button>
          </div>
        </header>

        <div className="p-8">
          <div className="flex items-center justify-between mb-8">
            <div className="space-y-1">
              <h2 className="text-2xl font-bold tracking-tight">Manage Your Offerings</h2>
              <p className="text-slate-400 text-sm">Create, edit, and organize the services available for booking.</p>
            </div>
            <div className="flex bg-slate-900 border border-white/10 rounded-xl p-1">
              <button 
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg transition-all ${viewMode === 'grid' ? 'bg-slate-800 text-blue-400 shadow-lg' : 'text-slate-500 hover:text-slate-300'}`}
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button 
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg transition-all ${viewMode === 'list' ? 'bg-slate-800 text-blue-400 shadow-lg' : 'text-slate-500 hover:text-slate-300'}`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className={viewMode === 'grid' ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6" : "space-y-4"}>
            {SERVICES.map((service, idx) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className={`glass-card rounded-2xl border border-white/5 hover:border-blue-500/30 transition-all group ${viewMode === 'list' ? 'flex items-center p-4' : 'p-6'}`}
              >
                {viewMode === 'grid' ? (
                  <>
                    <div className="flex items-start justify-between mb-4">
                      <div className="p-3 rounded-xl bg-blue-500/10 text-blue-400 group-hover:scale-110 transition-transform">
                        <Clock className="w-6 h-6" />
                      </div>
                      <div className="flex gap-2">
                        <button className="p-2 rounded-lg hover:bg-white/5 text-slate-400 hover:text-white transition-colors">
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button className="p-2 rounded-lg hover:bg-red-500/10 text-slate-400 hover:text-red-400 transition-colors">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    <div className="mb-4">
                      <span className="text-xs font-bold uppercase tracking-wider text-blue-500/70 mb-1 block">{service.category}</span>
                      <h3 className="text-lg font-bold text-slate-100 group-hover:text-blue-400 transition-colors">{service.name}</h3>
                      <p className="text-sm text-slate-400 mt-2 line-clamp-2">{service.description}</p>
                    </div>
                    <div className="flex items-center justify-between pt-4 border-t border-white/5">
                      <div className="flex items-center gap-2 text-slate-300 font-medium">
                        <Clock className="w-4 h-4 text-slate-500" /> {service.duration}
                      </div>
                      <div className="text-lg font-bold text-white">
                        {service.price}
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400 mr-4">
                      <Clock className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold">{service.name}</h3>
                      <p className="text-sm text-slate-500">{service.category} • {service.duration}</p>
                    </div>
                    <div className="text-lg font-bold px-8">{service.price}</div>
                    <div className="flex gap-2">
                      <button className="p-2 rounded-lg hover:bg-white/5 text-slate-400 transition-colors"><Edit2 className="w-4 h-4" /></button>
                      <button className="p-2 rounded-lg hover:bg-red-500/10 text-slate-400 transition-colors"><Trash2 className="w-4 h-4" /></button>
                    </div>
                  </>
                )}
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
