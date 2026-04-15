"use client";

import { motion } from "framer-motion";
import { Plus, Search, Edit2, Trash2, Clock, DollarSign, LayoutGrid, List, Bot, Sparkles, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const SERVICES = [
  { id: 1, name: "Luxury Hair Styling", duration: "60 min", price: "$120", category: "Salon", description: "Premium hair styling and treatment for special occasions." },
  { id: 2, name: "Web App Development", duration: "Dev Cycle", price: "$2,500+", category: "Dev Studio", description: "Custom Next.js applications built for high performance and scalability." },
  { id: 3, name: "Health Consultation", duration: "30 min", price: "$80", category: "Medical", description: "Private consultation with specialist physicians." },
  { id: 4, name: "Business Audit", duration: "90 min", price: "$450", category: "Business", description: "Detailed analysis of workflow efficiency and slot optimization." },
];

export default function ServicesPage() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  return (
    <div className="min-h-screen bg-[#FDFDFD] text-black font-sans flex">
      {/* Mini Sidebar back to Dashboard */}
      <aside className="w-20 border-r border-gray-100 flex flex-col h-screen sticky top-0 bg-white items-center py-8 gap-8">
        <Link href="/dashboard" className="w-10 h-10 rounded-xl bg-black flex items-center justify-center text-white">
          <ChevronRight className="w-6 h-6 rotate-180" />
        </Link>
        <div className="flex-1" />
        <div className="w-10 h-10 rounded-full bg-gray-50 border border-gray-100" />
      </aside>

      <main className="flex-1 flex flex-col">
        <header className="h-20 bg-white border-b border-gray-50 flex items-center justify-between px-10 sticky top-0 z-10">
          <div>
            <h1 className="text-2xl font-serif">Service Catalog</h1>
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-[0.2em] font-mono">Inventory Management</p>
          </div>
          <div className="flex items-center gap-4">
            <button className="flex items-center gap-2 px-5 py-2.5 border border-gray-100 rounded-xl text-xs font-bold hover:bg-gray-50 transition-all">
              <Sparkles className="w-4 h-4" /> AI Generate
            </button>
            <button className="flex items-center gap-2 px-5 py-2.5 bg-black text-white rounded-xl text-xs font-bold hover:bg-gray-800 transition-all shadow-md">
              <Plus className="w-4 h-4" /> Add New
            </button>
          </div>
        </header>

        <div className="p-10">
          {/* AI Banner */}
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12 p-10 rounded-[2.5rem] border border-gray-50 flex items-center gap-8 bg-white shadow-sm"
          >
            <div className="w-16 h-16 rounded-2xl bg-black flex items-center justify-center text-white shadow-lg">
              <Bot className="w-8 h-8" />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-xl flex items-center gap-4">
                Smart Catalog Assistant
                <span className="text-[10px] px-3 py-1 bg-gray-50 rounded-full border border-gray-100 font-black tracking-widest uppercase">Self-Hosted</span>
              </h3>
              <p className="text-sm text-gray-400 mt-2 font-medium max-w-xl italic leadnig-relaxed">
                "Hi John, I've analyzed your Salon's performance. Adding a 'Evening Glow' 30min slot could increase revenue by 12% on Thursdays."
              </p>
            </div>
            <button className="px-6 py-3 bg-black text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-gray-800 transition-all shadow-sm">
              Apply Suggestion
            </button>
          </motion.div>

          <div className="flex items-center justify-between mb-12">
            <div className="space-y-1">
              <h2 className="text-3xl font-serif">Active Offerings</h2>
              <p className="text-gray-400 text-sm font-medium italic">Manage your multi-tenant service definitions.</p>
            </div>
            <div className="flex border border-gray-100 rounded-2xl p-1 bg-white shadow-sm font-mono">
              <button 
                onClick={() => setViewMode('grid')}
                className={`p-2.5 rounded-xl transition-all ${viewMode === 'grid' ? 'bg-black text-white shadow-md' : 'text-gray-300 hover:text-black'}`}
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button 
                onClick={() => setViewMode('list')}
                className={`p-2.5 rounded-xl transition-all ${viewMode === 'list' ? 'bg-black text-white shadow-md' : 'text-gray-300 hover:text-black'}`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className={viewMode === 'grid' ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-8" : "space-y-4"}>
            {SERVICES.map((service, idx) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.05 }}
                className="bg-white rounded-[2.5rem] border border-gray-50 hover:border-black/5 hover:shadow-xl transition-all p-8 group flex flex-col h-full relative overflow-hidden"
              >
                <div className="flex items-start justify-between mb-8 relative z-10">
                  <div className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center text-black group-hover:bg-black group-hover:text-white transition-colors"><Clock className="w-5 h-5" /></div>
                  <div className="flex gap-1">
                    <button className="p-2.5 rounded-xl hover:bg-gray-50 text-gray-300 hover:text-black transition-all"><Edit2 className="w-4 h-4" /></button>
                    <button className="p-2.5 rounded-xl hover:bg-gray-50 text-gray-300 hover:text-red-500 transition-all"><Trash2 className="w-4 h-4" /></button>
                  </div>
                </div>
                <div className="mb-8 flex-1 relative z-10">
                  <span className="text-[9px] font-black uppercase tracking-[0.2em] text-gray-300 mb-3 block">{service.category}</span>
                  <h3 className="text-xl font-bold text-black mb-3">{service.name}</h3>
                  <p className="text-sm text-gray-400 font-medium italic leading-relaxed">{service.description}</p>
                </div>
                <div className="flex items-center justify-between pt-8 border-t border-gray-50 relative z-10">
                   <div className="flex items-center gap-2">
                     <span className="text-[10px] font-black uppercase tracking-widest text-gray-300">{service.duration}</span>
                     <div className="w-1 h-1 rounded-full bg-gray-100" />
                     <span className="text-[10px] font-black uppercase tracking-widest text-emerald-500">Live</span>
                   </div>
                   <span className="text-2xl font-serif font-black">{service.price}</span>
                </div>
                
                {/* Visual Accent */}
                <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-gray-50 rounded-full opacity-50 group-hover:scale-110 transition-transform" />
              </motion.div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
