"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, CalendarDays, Clock, User, Search, X, ChevronDown } from "lucide-react";
import { CalendarInput } from "./CalendarInput";

export function CalendarPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedDay, setSelectedDay] = useState(8);

  const days = [
    { num: 5, label: "MON", appointments: 12 },
    { num: 6, label: "TUE", appointments: 8 },
    { num: 7, label: "WED", appointments: 15 },
    { num: 8, label: "THU", appointments: 4 },
    { num: 9, label: "FRI", appointments: 20 },
    { num: 10, label: "SAT", appointments: 2 },
    { num: 11, label: "SUN", appointments: 0 },
  ];

  const timeSlots = ["08:00 AM", "09:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", "01:00 PM", "02:00 PM", "03:00 PM", "04:00 PM", "05:00 PM", "06:00 PM", "07:00 PM"];

  const handleSave = () => {
    setIsSidebarOpen(false);
  };

  return (
    <div className="flex h-full gap-8">
      <div className="flex-1 space-y-8">
        <header className="flex items-center justify-between">
          <div className="space-y-1">
             <h2 className="text-4xl font-black uppercase tracking-tighter italic">Schedule Matrix</h2>
             <p className="text-[10px] font-black uppercase tracking-[0.2em] text-black/20 italic">Time-Slot Allocation Protocol</p>
          </div>
          <button onClick={() => setIsSidebarOpen(true)} className="px-10 py-4 bg-black text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-2xl shadow-black/20 hover:scale-105 active:scale-95 transition-all">New Allocation</button>
        </header>

        {/* Calendar Grid */}
        <div className="bg-white border border-black/5 rounded-[3rem] p-10 shadow-sm">
          <div className="grid grid-cols-7 gap-4 mb-12">
            {days.map(d => (
              <button 
                key={d.num} 
                onClick={() => setSelectedDay(d.num)}
                className={`p-6 rounded-[2rem] flex flex-col items-center gap-2 transition-all ${selectedDay === d.num ? "bg-black text-white shadow-2xl scale-105" : "bg-black/[0.02] hover:bg-black/5"}`}
              >
                <span className="text-[10px] font-black uppercase opacity-40">{d.label}</span>
                <span className="text-2xl font-black italic">{d.num}</span>
                <div className={`w-1.5 h-1.5 rounded-full ${d.appointments > 10 ? "bg-emerald-500" : d.appointments > 0 ? "bg-amber-500" : "bg-transparent"}`} />
              </button>
            ))}
          </div>

          <div className="space-y-1">
            {timeSlots.map(time => (
              <div key={time} className="group flex items-center gap-6 h-20 border-t border-black/5 first:border-0 hover:bg-black/[0.02] transition-colors relative">
                <div className="w-20 text-[10px] font-black text-black/20 uppercase tracking-widest text-right">{time}</div>
                <div className="flex-1 h-px bg-black/5" />
                {time === "10:00 AM" && selectedDay === 8 && (
                  <div className="absolute left-32 right-10 top-2 bottom-2 bg-black text-white rounded-2xl p-4 flex justify-between items-center shadow-xl group/item">
                    <div className="space-y-1">
                       <p className="text-[8px] font-black uppercase tracking-widest text-white/40">Dr. Jenkins · Room 102</p>
                       <h4 className="text-sm font-black uppercase tracking-tighter italic">Alexander Wright</h4>
                    </div>
                    <div className="flex items-center gap-2 opacity-0 group-hover/item:opacity-100 transition-opacity">
                       <button className="p-2 hover:bg-white/10 rounded-lg transition-all"><X size={14} /></button>
                       <ChevronRight size={16} />
                    </div>
                  </div>
                )}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                   <button onClick={() => setIsSidebarOpen(true)} className="bg-white border border-black/10 px-4 py-2 rounded-full text-[8px] font-black uppercase tracking-widest shadow-sm hover:scale-105 transition-all">Quick Reserve</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div 
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="w-[400px] bg-white border-l border-black/5 h-screen sticky top-0 shadow-2xl p-10 flex flex-col gap-10 z-[200]"
          >
            <div className="flex justify-between items-center">
              <h3 className="text-sm font-black uppercase tracking-widest italic">Manual Override</h3>
              <button onClick={() => setIsSidebarOpen(false)} className="p-2 hover:bg-black/5 rounded-full transition-colors"><X size={20} /></button>
            </div>

            <div className="space-y-8 overflow-y-auto pr-2 custom-scrollbar">
              {/* Section: Temporal Config */}
              <div className="space-y-3">
                <h4 className="text-[9px] font-black uppercase tracking-[0.2em] text-black/30 border-b border-black/5 pb-1">Temporal Config</h4>
                <div className="space-y-2">
                  <CalendarInput label="When" value="08/05/2026" icon={<CalendarDays size={14} />} />
                  <div className="grid grid-cols-2 gap-2">
                    <CalendarInput label="Time" value="9:00 AM" icon={<Clock size={14} />} />
                    <CalendarInput label="End" value="9:30 AM" icon={<Clock size={14} />} />
                  </div>
                  <CalendarInput label="Location" value="Main Clinic" icon={<ChevronDown size={14} />} />
                  <CalendarInput label="With" value="Dr. Jenkins" icon={<ChevronDown size={14} />} />
                </div>
              </div>

              {/* Section: Client/Personal/Group Toggle */}
              <div className="grid grid-cols-3 border border-black/10 rounded-xl overflow-hidden shadow-inner">
                 {["Client", "Personal", "Group"].map((type, i) => (
                   <button 
                     key={type} 
                     className={`py-2 flex flex-col items-center gap-1 border-r border-black/10 last:border-0 transition-all ${i === 0 ? "bg-black text-white" : "bg-white text-black/40 hover:text-black hover:bg-black/5"}`}
                   >
                     <User size={12} />
                     <span className="text-[8px] font-black uppercase">{type}</span>
                   </button>
                 ))}
              </div>

              {/* Section: Client Search */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                   <span className="text-[9px] font-black uppercase tracking-widest">Client</span>
                   <button className="text-[8px] font-black uppercase tracking-widest text-black hover:underline active:scale-95 transition-all">+ New Client</button>
                </div>
                <div className="relative group">
                  <input 
                    type="text" 
                    placeholder="Search for a client*" 
                    className="w-full bg-black/5 border border-transparent rounded-lg px-4 py-3 text-[10px] font-black uppercase tracking-widest placeholder:text-black/20 focus:bg-white focus:border-black focus:ring-0 transition-all outline-none"
                  />
                  <Search size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-black/20 group-focus-within:text-black transition-colors" />
                </div>
              </div>

              {/* Section: Appointment Details */}
              <div className="space-y-4">
                <h4 className="text-[9px] font-black uppercase tracking-[0.2em] text-black/30 border-b border-black/5 pb-1">Appointment Details</h4>
                <div className="space-y-2">
                  <CalendarInput label="Service" value="Select a Service" icon={<ChevronDown size={14} />} />
                  <CalendarInput label="Resources" value="Select Resources" icon={<ChevronDown size={14} />} />
                  <CalendarInput label="Flag" value="Select a Flag" icon={<ChevronDown size={14} />} />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 space-y-2">
                <button 
                  onClick={handleSave}
                  className="w-full bg-black text-white py-3 rounded-xl text-[10px] font-black uppercase tracking-[0.3em] shadow-xl shadow-black/20 hover:bg-emerald-600 hover:shadow-emerald-500/20 active:scale-95 transition-all"
                >
                  Save Appointment
                </button>
                <button 
                  onClick={() => setIsSidebarOpen(false)}
                  className="w-full bg-white border border-black/10 text-black py-3 rounded-xl text-[10px] font-black uppercase tracking-[0.3em] hover:bg-black/5 active:scale-95 transition-all"
                >
                  Cancel
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
