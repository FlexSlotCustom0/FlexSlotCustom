"use client";

import { motion } from "framer-motion";
import { 
  Plus, Search, Edit2, Trash2, Clock, DollarSign, LayoutGrid, List, Bot, Sparkles, ChevronRight,
  ShieldPlus, Activity, Stethoscope, Heart, Thermometer, Microscope
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const TREATMENTS = [
  { id: 1, name: "Cardiological Screening", duration: "45 min", price: "$250", category: "Diagnostics", description: "Comprehensive heart health assessment including ECG and stress test." },
  { id: 2, name: "Pediatric Consultation", duration: "30 min", price: "$90", category: "General Practice", description: "Routine health checkup and developmental assessment for children." },
  { id: 3, name: "Veterinary Surgery", duration: "90 min", price: "$450+", category: "Pet Care", description: "Minor surgical procedures for small animals and house pets." },
  { id: 4, name: "Dermatological Mapping", duration: "60 min", price: "$180", category: "Specialist", description: "Full-body skin assessment and mole mapping for early detection." },
];

export default function TreatmentsPage() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  return (
    <div className="min-h-screen bg-[#FDFDFD] text-black font-sans flex">
      {/* Mini Sidebar back to Dashboard */}
      <aside className="w-20 border-r border-gray-100 flex flex-col h-screen sticky top-0 bg-white items-center py-8 gap-8">
        <Link href="/dashboard" className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-lg shadow-blue-600/20">
          <ChevronRight className="w-6 h-6 rotate-180" />
        </Link>
        <div className="flex-1" />
        <div className="w-10 h-10 rounded-full bg-gray-50 border border-gray-100" />
      </aside>

      <main className="flex-1 flex flex-col">
        <header className="h-20 bg-white border-b border-gray-50 flex items-center justify-between px-10 sticky top-0 z-10">
          <div>
            <h1 className="text-2xl font-serif text-blue-600">Treatment Registry</h1>
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-[0.2em] font-mono">Clinical Procedure Inventory</p>
          </div>
          <div className="flex items-center gap-4">
            <button className="flex items-center gap-2 px-5 py-2.5 border border-gray-100 rounded-xl text-xs font-bold hover:bg-gray-50 transition-all">
              <Sparkles className="w-4 h-4 text-blue-600" /> AI Optimizer
            </button>
            <button className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-xl text-xs font-bold hover:bg-blue-700 transition-all shadow-md">
              <Plus className="w-4 h-4" /> Define Treatment
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
            <div className="w-16 h-16 rounded-2xl bg-blue-600 flex items-center justify-center text-white shadow-lg">
              <Bot className="w-8 h-8" />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-xl flex items-center gap-4">
                Clinic Intel Assistant
                <span className="text-[10px] px-3 py-1 bg-blue-50 text-blue-600 rounded-full border border-blue-100 font-black tracking-widest uppercase">Validated</span>
              </h3>
              <p className="text-sm text-gray-400 mt-2 font-medium max-w-xl italic leading-relaxed">
                "Hi Dr. Peterson, I've analyzed your patient load. Adding a 'Fast-Track Diagnostic' 15min slot could reduce wait times by 18% during peak hours."
              </p>
            </div>
            <button className="px-6 py-3 bg-blue-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-blue-700 transition-all shadow-sm">
              Implement Optimization
            </button>
          </motion.div>

          <div className="flex items-center justify-between mb-12">
            <div className="space-y-1">
              <h2 className="text-3xl font-serif">Active Procedures</h2>
              <p className="text-gray-400 text-sm font-medium italic">Configure medical and veterinary treatments for your practitioners.</p>
            </div>
            <div className="flex border border-gray-100 rounded-2xl p-1 bg-white shadow-sm font-mono">
              <button 
                onClick={() => setViewMode('grid')}
                className={`p-2.5 rounded-xl transition-all ${viewMode === 'grid' ? 'bg-blue-600 text-white shadow-md' : 'text-gray-300 hover:text-black'}`}
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button 
                onClick={() => setViewMode('list')}
                className={`p-2.5 rounded-xl transition-all ${viewMode === 'list' ? 'bg-blue-600 text-white shadow-md' : 'text-gray-300 hover:text-black'}`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className={viewMode === 'grid' ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-8" : "space-y-4"}>
            {TREATMENTS.map((treatment, idx) => (
              <motion.div
                key={treatment.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.05 }}
                className="bg-white rounded-[2.5rem] border border-gray-50 hover:border-blue-600/10 hover:shadow-xl transition-all p-8 group flex flex-col h-full relative overflow-hidden"
              >
                <div className="flex items-start justify-between mb-8 relative z-10">
                  <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors"><Clock className="w-5 h-5" /></div>
                  <div className="flex gap-1">
                    <button className="p-2.5 rounded-xl hover:bg-gray-50 text-gray-300 hover:text-blue-600 transition-all"><Edit2 className="w-4 h-4" /></button>
                    <button className="p-2.5 rounded-xl hover:bg-gray-50 text-gray-300 hover:text-red-500 transition-all"><Trash2 className="w-4 h-4" /></button>
                  </div>
                </div>
                <div className="mb-8 flex-1 relative z-10">
                  <span className="text-[9px] font-black uppercase tracking-[0.2em] text-gray-300 mb-3 block">{treatment.category}</span>
                  <h3 className="text-xl font-bold text-black mb-3">{treatment.name}</h3>
                  <p className="text-sm text-gray-400 font-medium italic leading-relaxed">{treatment.description}</p>
                </div>
                <div className="flex items-center justify-between pt-8 border-t border-gray-50 relative z-10">
                   <div className="flex items-center gap-2">
                     <span className="text-[10px] font-black uppercase tracking-widest text-gray-300">{treatment.duration}</span>
                     <div className="w-1 h-1 rounded-full bg-gray-100" />
                     <span className="text-[10px] font-black uppercase tracking-widest text-blue-500">Clinical Only</span>
                   </div>
                   <span className="text-2xl font-serif font-black">{treatment.price}</span>
                </div>
                
                {/* Visual Accent */}
                <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-blue-50 rounded-full opacity-50 group-hover:scale-110 transition-transform" />
              </motion.div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
