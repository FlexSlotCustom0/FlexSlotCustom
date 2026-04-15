"use client";

import { motion, AnimatePresence } from "framer-motion";
import { 
  Calendar, Clock, Database, Lock, ShieldAlert, Cpu, 
  ChevronRight, ChevronLeft, MoreHorizontal, CheckCircle2,
  AlertCircle, Hash, Zap
} from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function BookingsPage() {
  const [role, setRole] = useState<"owner" | "customer">("owner");
  const [lockingSlot, setLockingSlot] = useState<number | null>(null);
  const [lockedSlots, setLockedSlots] = useState<number[]>([]);

  const handleSlotClick = (id: number) => {
    if (lockedSlots.includes(id)) return;
    setLockingSlot(id);
    setTimeout(() => {
      setLockedSlots(prev => [...prev, id]);
      setLockingSlot(null);
    }, 1500);
  };

  const slots = Array.from({ length: 12 }, (_, i) => ({
    id: i + 1,
    time: `${9 + Math.floor(i / 2)}:${i % 2 === 0 ? '00' : '30'} ${9 + Math.floor(i / 2) < 12 ? 'AM' : 'PM'}`,
    patient: i === 2 ? "Alex Miller" : i === 5 ? "John Doe" : null
  }));

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
              <h1 className="text-2xl font-serif">Clinic Schedule</h1>
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-[0.2em] font-mono">Patient Flow & Capacity</p>
            </div>
            
            <div className="flex bg-gray-50 p-1 rounded-xl border border-gray-100">
              <button 
                onClick={() => setRole("owner")}
                className={`px-4 py-1.5 rounded-lg text-xs font-bold uppercase tracking-widest transition-all ${role === "owner" ? "bg-white text-black shadow-sm" : "text-gray-400"}`}
              >
                Owner
              </button>
              <button 
                onClick={() => setRole("customer")}
                className={`px-4 py-1.5 rounded-lg text-xs font-bold uppercase tracking-widest transition-all ${role === "customer" ? "bg-white text-black shadow-sm" : "text-gray-400"}`}
              >
                My Bookings
              </button>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-4 py-2 bg-emerald-50 text-emerald-600 rounded-xl border border-emerald-100">
              <Zap className="w-4 h-4" />
              <span className="text-[10px] font-black uppercase tracking-widest">PostgreSQL RLS Active</span>
            </div>
          </div>
        </header>

        <div className="p-10 max-w-7xl mx-auto w-full">
          <AnimatePresence mode="wait">
            {role === "owner" ? (
              <motion.div 
                key="owner"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="space-y-10"
              >
                <div className="flex justify-between items-end">
                  <div className="max-w-2xl">
                    <h2 className="text-5xl font-serif tracking-tight mb-4 text-black">Master Calendar</h2>
                    <p className="text-gray-400 italic font-medium leading-relaxed">
                      Managing simultaneous requests with <span className="text-black font-bold">Pessimistic Locking</span>. Each slot selection creates a temporary database reservation to prevent double-booking.
                    </p>
                  </div>
                  <div className="flex gap-4">
                    <div className="text-right">
                      <div className="text-[10px] font-black text-gray-300 uppercase tracking-[0.1em] mb-1">System Load</div>
                      <div className="text-sm font-mono font-bold">12ms Latency</div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                  {slots.map((slot) => {
                    const isLocking = lockingSlot === slot.id;
                    const isLocked = lockedSlots.includes(slot.id);

                    return (
                      <motion.button
                        key={slot.id}
                        onClick={() => handleSlotClick(slot.id)}
                        disabled={isLocked || isLocking}
                        className={`relative p-8 rounded-[2.5rem] border transition-all text-left group overflow-hidden ${
                          isLocked ? 'bg-black border-black shadow-xl shadow-black/10' :
                          isLocking ? 'bg-gray-50 border-gray-100 animate-pulse' :
                          'bg-white border-gray-100 hover:border-black/10 hover:shadow-lg'
                        }`}
                        whileHover={{ y: -5 }}
                      >
                        <div className="flex justify-between items-start mb-10">
                          <div className={`p-3 rounded-2xl ${isLocked ? 'bg-white/10' : 'bg-gray-50'}`}>
                            <Clock className={`w-5 h-5 ${isLocked ? 'text-white' : 'text-gray-400'}`} />
                          </div>
                          {isLocked ? (
                            <Lock className="w-5 h-5 text-white/40" />
                          ) : (
                            <CheckCircle2 className="w-5 h-5 text-gray-100" />
                          )}
                        </div>
                        
                        <div>
                          <div className={`text-2xl font-serif mb-1 ${isLocked ? 'text-white' : 'text-black'}`}>{slot.time}</div>
                          <div className={`text-[10px] font-black uppercase tracking-widest ${isLocked ? 'text-white/40' : 'text-gray-300'}`}>
                            {isLocked ? 'RESERVED' : isLocking ? 'SQL LOCK...' : 'OPEN SLOT'}
                          </div>
                        </div>

                        {/* Visual Partition Indicator */}
                        <div className={`absolute top-0 right-0 w-16 h-16 opacity-10 transition-transform group-hover:scale-110 ${isLocked ? 'bg-white' : 'bg-black'} rounded-bl-[3rem]`} />
                      </motion.button>
                    );
                  })}
                </div>

                {/* Audit Log */}
                <div className="bg-white border border-gray-100 rounded-[2.5rem] p-8 shadow-sm">
                  <div className="flex items-center gap-3 mb-6">
                    <Database className="w-5 h-5" />
                    <h3 className="font-bold">Transaction History</h3>
                  </div>
                  <div className="space-y-4">
                    <LogRow time="09:41 AM" msg="Exclusive lock acquired for Slot #4 [Provider: Dr. Smith]" type="system" />
                    <LogRow time="09:40 AM" msg="New appointment confirmed: Alex Miller" type="booking" />
                    <LogRow time="09:38 AM" msg="RLS Partition isolation check: SUCCESS" type="security" />
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div 
                key="customer"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-10"
              >
                <div className="flex justify-between items-end">
                  <div>
                    <h2 className="text-5xl font-serif tracking-tight mb-4">My Itinerary</h2>
                    <p className="text-gray-400 italic font-medium">Keep track of your scheduled services and upcoming appointments.</p>
                  </div>
                  <button className="bg-black text-white px-8 py-3 rounded-2xl text-xs font-bold tracking-widest uppercase shadow-lg hover:bg-gray-800 transition-all">New Booking</button>
                </div>

                <div className="space-y-4">
                  <BookingItem title="Business Strategy Consultation" location="Sigma Office" date="Tuesday, Oct 24" time="10:00 AM" status="Confirmed" />
                  <BookingItem title="Premium Hair Styling" location="Nova Salon" date="Friday, Oct 27" time="02:30 PM" status="Processing" />
                  <BookingItem title="Eye Checkup" location="City Health" date="Monday, Nov 02" time="09:00 AM" status="Confirmed" />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}

function LogRow({ time, msg, type }: { time: string, msg: string, type: string }) {
  const colors = {
    system: "text-blue-500",
    booking: "text-emerald-500",
    security: "text-purple-500"
  };
  return (
    <div className="flex items-center gap-4 text-xs font-mono py-2 border-b border-gray-50 last:border-0">
      <span className="text-gray-300 font-bold">{time}</span>
      <span className={`uppercase font-black tracking-widest text-[9px] w-16 ${colors[type as keyof typeof colors]}`}>{type}</span>
      <span className="text-gray-500 font-medium">{msg}</span>
    </div>
  );
}

function BookingItem({ title, location, date, time, status }: { title: string, location: string, date: string, time: string, status: string }) {
  return (
    <div className="bg-white border border-gray-50 p-8 rounded-[2.5rem] flex items-center justify-between shadow-sm group hover:scale-[1.01] transition-transform duration-300">
      <div className="flex items-center gap-8">
        <div className="w-20 h-20 bg-gray-50 rounded-3xl flex flex-col items-center justify-center border border-gray-100 group-hover:bg-black group-hover:text-white transition-colors">
          <div className="text-[10px] font-black uppercase mb-1">{date.split(',')[0]}</div>
          <div className="text-2xl font-serif">{date.split(' ')[2]}</div>
        </div>
        <div>
          <h4 className="text-xl font-bold mb-1">{title}</h4>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-xs text-gray-400 font-medium">
              <Clock className="w-3.5 h-3.5" /> {time}
            </div>
            <div className="w-1 h-1 bg-gray-200 rounded-full" />
            <div className="text-xs text-gray-400 font-medium italic">{location}</div>
          </div>
        </div>
      </div>
      
      <div className="flex items-center gap-6">
        <div className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest ${status === 'Confirmed' ? 'bg-emerald-50 text-emerald-600' : 'bg-orange-50 text-orange-600'}`}>
          {status}
        </div>
        <button className="p-3 hover:bg-gray-50 rounded-2xl transition-colors">
          <MoreHorizontal className="w-5 h-5 text-gray-300" />
        </button>
      </div>
    </div>
  );
}
