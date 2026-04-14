"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Clock, Database, Lock, ShieldAlert, Cpu } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function BookingsShowcase() {
  const [lockingSlot, setLockingSlot] = useState<number | null>(null);
  const [lockedSlots, setLockedSlots] = useState<number[]>([]);

  const handleSlotClick = (id: number) => {
    if (lockedSlots.includes(id)) return;
    
    setLockingSlot(id);
    // Simulate SELECT ... FOR UPDATE latency
    setTimeout(() => {
      setLockedSlots(prev => [...prev, id]);
      setLockingSlot(null);
    }, 1200);
  };

  const slots = Array.from({ length: 12 }, (_, i) => ({
    id: i + 1,
    time: `${9 + Math.floor(i / 2)}:${i % 2 === 0 ? '00' : '30'} ${9 + Math.floor(i / 2) < 12 ? 'AM' : 'PM'}`,
  }));

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 flex">
      <aside className="w-64 glass border-r border-white/5 flex flex-col h-screen sticky top-0 hidden lg:flex">
        <div className="h-16 flex items-center px-6 border-b border-white/5 font-bold tracking-tight">
          Concurrency Engine
        </div>
        <div className="flex-1 py-6 px-3 space-y-1">
          <NavItem href="/dashboard" label="Overview" />
          <NavItem href="/dashboard/services" label="Services" />
          <NavItem href="/dashboard/bookings" label="Booking & Slots" active />
          <NavItem href="/dashboard/customers" label="Customers" />
          <NavItem href="/dashboard/ai" label="AI Insights" />
          <NavItem href="/dashboard/settings" label="Settings" />
        </div>
        <div className="p-4 border-t border-white/5">
          <div className="p-3 rounded-xl bg-slate-900 border border-white/10">
             <div className="text-[10px] font-bold text-blue-500 uppercase mb-2 flex items-center gap-1">
               <Database className="w-3 h-3" /> Transaction Log
             </div>
             <div className="space-y-2 font-mono text-[9px] text-slate-500">
               <div>[09:41:02] BEGIN TRANSACTION;</div>
               {lockingSlot && <div className="text-blue-400 animate-pulse">[09:42:10] SELECT * FROM slots WHERE id={lockingSlot} FOR UPDATE;</div>}
               {lockedSlots.length > 0 && <div className="text-emerald-500">[09:42:11] ROW_LOCK ACQUIRED; COMMIT;</div>}
             </div>
          </div>
        </div>
      </aside>

      <main className="flex-1 flex flex-col">
        <header className="h-16 glass border-b border-white/5 flex items-center justify-between px-8 sticky top-0 z-10">
          <h1 className="text-xl font-bold flex items-center gap-2">
            Availability Grid <span className="text-[10px] bg-emerald-500/10 text-emerald-500 px-2 py-0.5 rounded border border-emerald-500/20">LIVE PARTITION</span>
          </h1>
          <div className="flex items-center gap-4 text-xs font-mono text-slate-500">
             <div className="flex items-center gap-2">
               <span className="w-2 h-2 rounded-full bg-blue-500 animate-ping" /> Synchronous IO
             </div>
             <div className="flex items-center gap-2">
               <span className="w-2 h-2 rounded-full bg-emerald-500" /> ACID Compliant
             </div>
          </div>
        </header>

        <div className="p-8">
          <div className="mb-10 max-w-2xl">
            <h2 className="text-3xl font-bold mb-4">The Concurrency Showcase</h2>
            <p className="text-slate-400 leading-relaxed italic border-l-2 border-blue-500/50 pl-4 bg-blue-500/5 py-2">
              Demonstrating <strong>Pessimistic Concurrency Control</strong>. Selecting a slot initiates an exclusive row-level lock on the PostgreSQL instance, preventing double-bookings during the transaction lifetime.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {slots.map((slot) => {
              const isLocking = lockingSlot === slot.id;
              const isLocked = lockedSlots.includes(slot.id);

              return (
                <button
                  key={slot.id}
                  onClick={() => handleSlotClick(slot.id)}
                  disabled={isLocked || isLocking}
                  className={`relative p-6 rounded-3xl border-2 transition-all text-left overflow-hidden group ${
                    isLocked ? 'border-emerald-500/20 bg-emerald-500/5' :
                    isLocking ? 'border-blue-500 bg-blue-500/10' :
                    'border-white/5 bg-white/5 hover:border-blue-500/50'
                  }`}
                >
                  <div className="flex justify-between items-start mb-4">
                    <Clock className={`w-5 h-5 ${isLocked ? 'text-emerald-400' : isLocking ? 'text-blue-400' : 'text-slate-500 group-hover:text-blue-400'}`} />
                    {isLocked && <Lock className="w-4 h-4 text-emerald-400" />}
                  </div>
                  
                  <div className="font-bold text-lg mb-1">{slot.time}</div>
                  <div className={`text-[10px] font-bold uppercase tracking-widest ${isLocked ? 'text-emerald-500' : isLocking ? 'text-blue-500' : 'text-slate-500'}`}>
                    {isLocked ? 'Confirmed' : isLocking ? 'SELECTING...' : 'Available'}
                  </div>

                  <AnimatePresence>
                    {isLocking && (
                      <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="absolute inset-0 bg-blue-600/20 backdrop-blur-[2px] flex flex-col items-center justify-center gap-2"
                      >
                        <Cpu className="w-8 h-8 text-blue-400 animate-spin" />
                        <span className="text-[9px] font-mono text-blue-300 font-bold bg-slate-900 px-2 rounded tracking-tighter">FOR UPDATE</span>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </button>
              );
            })}
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="glass-card p-8 rounded-3xl border border-white/5">
               <div className="flex items-center gap-3 mb-6">
                 <div className="p-3 rounded-2xl bg-blue-500/10 text-blue-400"><ShieldAlert className="w-6 h-6" /></div>
                 <h3 className="text-xl font-bold">Atomicity Check</h3>
               </div>
               <p className="text-sm text-slate-400 leading-relaxed mb-6">
                 If two users attempt to lock the same row simultaneously, the second transaction is forced into a <code className="text-blue-400">WAIT</code> state until the first either <code className="text-emerald-400">COMMITS</code> or <code className="text-red-400">ROLLBACKS</code>.
               </p>
               <div className="flex gap-2">
                 <span className="px-3 py-1 bg-slate-900 rounded-full border border-white/5 text-[10px] font-mono text-slate-500">SERIALIZABLE</span>
                 <span className="px-3 py-1 bg-slate-900 rounded-full border border-white/5 text-[10px] font-mono text-slate-500">ROW_LOCK</span>
               </div>
            </div>
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
