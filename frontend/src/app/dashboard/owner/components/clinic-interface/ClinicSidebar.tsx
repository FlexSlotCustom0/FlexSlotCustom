"use client";

import { motion } from "framer-motion";
import { Zap, Sparkles } from "lucide-react";

interface ClinicSidebarProps {
  clinicName: string;
  setClinicName: (name: string) => void;
  setIsPreviewOpen: (open: boolean) => void;
}

export function ClinicSidebar({
  clinicName,
  setClinicName,
  setIsPreviewOpen
}: ClinicSidebarProps) {
  return (
    <div className="col-span-4 space-y-8">
      <div className="premium-card relative overflow-hidden group">
        <div className="relative z-10 space-y-8">
           <div className="space-y-4">
              <h3 className="text-sm font-black uppercase tracking-widest flex items-center gap-2"><Zap size={16} /> Portal Health</h3>
              <div className="space-y-2">
                 <div className="flex justify-between text-[10px] font-black uppercase">
                    <span>Identity Sync</span>
                    <span className="text-emerald-500">98%</span>
                 </div>
                 <div className="h-1.5 bg-black/5 rounded-full overflow-hidden">
                    <motion.div initial={{ width: 0 }} animate={{ width: '98%' }} className="h-full bg-black" />
                 </div>
              </div>
           </div>

           <div className="pt-6 border-t border-black/5 space-y-4">
              <div className="space-y-2">
                <label className="text-[9px] font-black uppercase tracking-widest text-black/30">Registry Alias</label>
                <div className="relative">
                  <input 
                    type="text" 
                    value={clinicName.replace(' ', '_').toLowerCase()}
                    onChange={(e) => setClinicName(e.target.value)}
                    className="w-full bg-black/5 border-none rounded-xl px-4 py-3 text-xs font-black uppercase italic tracking-tighter focus:ring-1 ring-black/10 outline-none"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[9px] font-black text-black/20">.PORTAL</span>
                </div>
              </div>
           </div>

           <div className="bg-black text-white p-8 rounded-[2.5rem] space-y-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl -mr-16 -mt-16" />
              <div className="relative z-10 space-y-2">
                 <div className="text-[9px] font-black uppercase text-white/40 tracking-widest">Active Relay</div>
                 <p className="text-2xl font-black italic tracking-tighter uppercase">{clinicName.replace(' ', '_')}.portal</p>
              </div>
              <button onClick={() => setIsPreviewOpen(true)} className="w-full py-5 bg-white text-black rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all hover:scale-105 active:scale-95 shadow-xl shadow-white/10">
                 Live Preview Stream
              </button>
              <Sparkles className="absolute -bottom-6 -right-6 w-32 h-32 text-white/5 rotate-12 group-hover:scale-110 transition-transform" />
           </div>
        </div>
      </div>
    </div>
  );
}
