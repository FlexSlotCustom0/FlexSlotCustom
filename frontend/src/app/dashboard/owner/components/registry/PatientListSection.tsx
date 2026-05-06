"use client";

import { useState } from "react";
import { Search, Download, ArrowUpRight, ArrowDownRight, MoreHorizontal, X, Plus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function PatientListSection() {
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const patients = [
    { id: 'PAT-001', name: 'Alexander Wright', email: 'alex@example.com', status: 'Active', visits: 12, lastVisit: '2026-05-01' },
    { id: 'PAT-002', name: 'Sarah Jenkins', email: 'sarah.j@example.com', status: 'Follow-up', visits: 4, lastVisit: '2026-04-28' },
    { id: 'PAT-003', name: 'Michael Chen', email: 'm.chen@example.com', status: 'New', visits: 1, lastVisit: '2026-05-04' },
    { id: 'PAT-004', name: 'Emily Rodriguez', email: 'emily.r@example.com', status: 'Active', visits: 8, lastVisit: '2026-04-15' },
    { id: 'PAT-005', name: 'David Thompson', email: 'd.thompson@example.com', status: 'Inactive', visits: 15, lastVisit: '2026-03-20' },
  ];

  const filteredPatients = patients.filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    p.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="bg-white border border-black/5 rounded-[3rem] p-10 shadow-sm space-y-8">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-xl font-black uppercase tracking-tighter italic">Patient Registry</h2>
          <p className="text-[10px] font-bold text-black/20 uppercase tracking-widest">Total: 2,481 Signals Detected</p>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setIsSearchModalOpen(true)}
            className="flex items-center gap-3 px-6 py-3 bg-black/5 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-black/10 transition-all active:scale-95"
          >
            <Search size={14} className="text-black/40" />
            <span>Search Signals...</span>
          </button>
          <button className="p-3 bg-black/5 rounded-xl text-black/40 hover:text-black transition-colors"><Download size={16} /></button>
          <button className="px-6 py-3 bg-black text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-xl shadow-black/20 hover:scale-105 active:scale-95 transition-all">+ Add Profile</button>
        </div>
      </div>

      <div className="overflow-hidden border border-black/5 rounded-[2rem]">
        <table className="w-full text-left">
          <thead className="bg-black/5">
            <tr>
              <th className="px-8 py-5 text-[9px] font-black uppercase tracking-widest text-black/40">Patient ID</th>
              <th className="px-8 py-5 text-[9px] font-black uppercase tracking-widest text-black/40">Identity</th>
              <th className="px-8 py-5 text-[9px] font-black uppercase tracking-widest text-black/40">Status</th>
              <th className="px-8 py-5 text-[9px] font-black uppercase tracking-widest text-black/40">Visits</th>
              <th className="px-8 py-5 text-[9px] font-black uppercase tracking-widest text-black/40">Last Signal</th>
              <th className="px-8 py-5 text-[9px] font-black uppercase tracking-widest text-black/40"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-black/5">
            {filteredPatients.map(p => (
              <tr key={p.id} className="hover:bg-black/[0.01] transition-colors group">
                <td className="px-8 py-6 text-[10px] font-black italic">{p.id}</td>
                <td className="px-8 py-6">
                  <div className="flex flex-col">
                    <span className="text-sm font-black uppercase tracking-tighter italic">{p.name}</span>
                    <span className="text-[9px] font-bold text-black/20 uppercase tracking-widest">{p.email}</span>
                  </div>
                </td>
                <td className="px-8 py-6">
                  <span className={`px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest ${
                    p.status === 'Active' ? 'bg-emerald-500/10 text-emerald-600' : 
                    p.status === 'Follow-up' ? 'bg-amber-500/10 text-amber-600' : 
                    p.status === 'New' ? 'bg-blue-500/10 text-blue-600' : 'bg-black/5 text-black/40'
                  }`}>{p.status}</span>
                </td>
                <td className="px-8 py-6">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-black italic">{p.visits}</span>
                    {p.visits > 10 ? <ArrowUpRight size={12} className="text-emerald-500" /> : <ArrowDownRight size={12} className="text-black/10" />}
                  </div>
                </td>
                <td className="px-8 py-6 text-[10px] font-bold text-black/30">{p.lastVisit}</td>
                <td className="px-8 py-6 text-right">
                  <button className="p-2 text-black/10 hover:text-black transition-colors"><MoreHorizontal size={16} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Patient Search Pop-up Modal */}
      <AnimatePresence>
        {isSearchModalOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsSearchModalOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-md z-[300]"
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] bg-white rounded-[3rem] shadow-2xl z-[301] p-12 flex flex-col gap-8"
            >
              <div className="flex justify-between items-center">
                <div className="space-y-1">
                  <h3 className="text-2xl font-black uppercase italic tracking-tighter">Signal Decoder</h3>
                  <p className="text-[10px] font-black uppercase tracking-widest text-black/20">Search Registry v2.1</p>
                </div>
                <button onClick={() => setIsSearchModalOpen(false)} className="p-3 hover:bg-black/5 rounded-2xl transition-colors active:scale-90"><X size={24} /></button>
              </div>

              <div className="relative group">
                <Search size={24} className="absolute left-8 top-1/2 -translate-y-1/2 text-black/20 group-focus-within:text-black transition-colors" />
                <input 
                  autoFocus
                  type="text" 
                  placeholder="DECODE IDENTITY OR EMAIL..."
                  className="w-full bg-black/5 border-2 border-transparent rounded-3xl pl-20 pr-8 py-6 text-lg font-black uppercase tracking-widest focus:bg-white focus:border-black/10 focus:ring-0 transition-all outline-none"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <div className="max-h-[400px] overflow-y-auto custom-scrollbar space-y-3 pr-2">
                {filteredPatients.length > 0 ? filteredPatients.map(p => (
                  <button
                    key={p.id}
                    onClick={() => {
                      // Logic to view patient details could go here
                      setIsSearchModalOpen(false);
                    }}
                    className="w-full p-8 text-left hover:bg-black/5 rounded-[2.5rem] flex items-center justify-between border border-black/[0.03] transition-all hover:scale-[1.02] active:scale-95 group"
                  >
                    <div className="flex flex-col gap-1">
                      <span className="text-lg font-black uppercase tracking-tighter italic group-hover:text-emerald-600 transition-colors">{p.name}</span>
                      <span className="text-xs font-bold text-black/20 uppercase tracking-widest">{p.email}</span>
                    </div>
                    <div className="text-right flex flex-col items-end gap-2">
                      <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest ${
                        p.status === 'Active' ? 'bg-emerald-500/10 text-emerald-600' : 'bg-black/5 text-black/40'
                      }`}>{p.status}</span>
                      <span className="text-[10px] font-black text-black/20">{p.id}</span>
                    </div>
                  </button>
                )) : (
                  <div className="py-20 text-center space-y-4">
                    <div className="w-16 h-16 bg-black/5 rounded-full flex items-center justify-center mx-auto">
                      <Search size={24} className="text-black/10" />
                    </div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-black/20 text-center">No Signals Found matching your query</p>
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
