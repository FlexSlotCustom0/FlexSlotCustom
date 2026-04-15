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
    <div className="min-h-screen bg-background text-foreground flex">
      <aside className="w-64 glass border-r border-border/10 flex flex-col h-screen sticky top-0 hidden lg:flex">
        <div className="h-16 flex items-center px-6 border-b border-border/10 font-bold tracking-tight">
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
        <div className="p-4 border-t border-border/10">
          <div className="p-3 rounded-xl bg-white/[0.05] border border-white/5 font-mono">
             <div className="text-[10px] font-black text-white/40 uppercase mb-2 flex items-center gap-1">
               <Database className="w-3 h-3" /> Transaction Log
             </div>
             <div className="space-y-1 text-[9px] text-white/20">
                <div>[09:41:02] BEGIN;</div>
                {lockingSlot && <div className="text-white animate-pulse tracking-tighter">[LOCKING] SELECT_FOR_UPDATE(id:{lockingSlot});</div>}
                {lockedSlots.length > 0 && <div className="text-white font-bold">[COMMIT] ROW_LOCK_ACQUIRED;</div>}
             </div>
          </div>
        </div>
      </aside>

      <main className="flex-1 flex flex-col">
        <header className="h-16 glass border-b border-border/10 flex items-center justify-between px-8 sticky top-0 z-10">
          <h1 className="text-xl font-black flex items-center gap-2">
            Availability Grid <span className="text-[9px] bg-white text-black px-2 py-0.5 rounded font-black tracking-widest uppercase">Partition_v3</span>
          </h1>
          <div className="flex items-center gap-6 text-[10px] font-black uppercase text-white/30 tracking-widest">
             <div className="flex items-center gap-2">
               <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" /> Sync_IO
             </div>
             <div className="flex items-center gap-2">
               <div className="w-1.5 h-1.5 rounded-full bg-white/20" /> ACID_READY
             </div>
          </div>
        </header>

        <div className="p-10 flex-1 overflow-y-auto">
          <div className="mb-16 max-w-2xl">
            <h2 className="text-4xl lg:text-6xl font-black mb-6 tracking-tighter">Concurrency Control</h2>
            <p className="text-foreground/40 leading-relaxed font-light text-lg">
              Demonstrating <strong className="text-white font-bold">Pessimistic Locking</strong>. Selecting a slot initiates an exclusive row-level lock to prevent race conditions in multi-tenant environments.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {slots.map((slot) => {
              const isLocking = lockingSlot === slot.id;
              const isLocked = lockedSlots.includes(slot.id);

              return (
                <button
                  key={slot.id}
                  onClick={() => handleSlotClick(slot.id)}
                  disabled={isLocked || isLocking}
                  className={`relative p-8 rounded-[2rem] border-2 transition-all text-left overflow-hidden group ${
                    isLocked ? 'border-white bg-white text-black' :
                    isLocking ? 'border-white/40 bg-white/5 animate-pulse' :
                    'border-white/5 bg-white/[0.02] hover:border-white/20'
                  }`}
                >
                  <div className="flex justify-between items-start mb-6">
                    <Clock className={`w-5 h-5 ${isLocked ? 'text-black/40' : 'text-white/20'}`} />
                    {isLocked && <Lock className="w-4 h-4 text-black/40" />}
                  </div>
                  
                  <div className={`font-black text-xl mb-1 ${isLocked ? 'text-black' : 'text-white'}`}>{slot.time}</div>
                  <div className={`text-[10px] font-black uppercase tracking-widest ${isLocked ? 'text-black/30' : 'text-white/20'}`}>
                    {isLocked ? 'COMMITTED' : isLocking ? 'LOCKING...' : 'AVAILABLE'}
                  </div>
                </button>
              );
            })}
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
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-bold tracking-tight transition-all ${
        active 
          ? 'bg-white text-black' 
          : 'text-white/30 hover:bg-white/5 hover:text-white'
      }`}
    >
      {label}
    </Link>
  );
}
