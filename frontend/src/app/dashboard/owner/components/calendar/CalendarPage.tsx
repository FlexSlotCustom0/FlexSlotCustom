"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CalendarDays, Clock, User, Search, X, ChevronDown, Plus } from "lucide-react";
import { CalendarInput } from "./CalendarInput";

export function CalendarPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [selectedDay, setSelectedDay] = useState(8);
  const [searchFocused, setSearchFocused] = useState(false);

  // Patient database
  const patients = [
    { id: 'PAT-001', name: 'Alexander Wright', email: 'alex@example.com' },
    { id: 'PAT-002', name: 'Sarah Jenkins', email: 'sarah.j@example.com' },
    { id: 'PAT-003', name: 'Michael Chen', email: 'm.chen@example.com' },
    { id: 'PAT-004', name: 'Emily Rodriguez', email: 'emily.r@example.com' },
    { id: 'PAT-005', name: 'David Thompson', email: 'd.thompson@example.com' },
  ];

  // Manual Override State
  const [formData, setFormData] = useState({
    when: "2026-05-08",
    time: "09:00",
    end: "09:30",
    location: "Main Clinic",
    withPerson: "Dr. Jenkins",
    type: "Client",
    searchClient: "",
    service: "Motivational Quote",
    resources: "Room 101",
    flag: "Urgent"
  });

  const [appointments, setAppointments] = useState([]);

  const updateField = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    const newDay = parseInt(formData.when.split("-")[2]) || selectedDay;
    const newAppt = {
      id: Math.random().toString(36).substr(2, 9),
      day: newDay,
      time: formData.time,
      client: formData.searchClient || "Manual Allocation",
      room: formData.resources,
      service: formData.service,
      color: "bg-black"
    };
    setAppointments([...appointments, newAppt]);
    setSelectedDay(newDay);
    setIsSidebarOpen(false);
  };

  const contentTypes = [
    "Motivational Quote", "Customer Testimonial", "Blog Post", "Case Study", 
    "Fun Fact", "Weekly Recap", "FAQ", "Contest or Giveaway", 
    "Behind-the-Brand", "User-Generated Content"
  ];

  const currentMonthDate = new Date(formData.when);
  const year = currentMonthDate.getFullYear();
  const month = currentMonthDate.getMonth(); // 0-indexed

  const firstDayOfMonth = new Date(year, month, 1).getDay(); // 0 (Sun) to 6 (Sat)
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  
  // Previous month padding
  const prevMonthLastDay = new Date(year, month, 0).getDate();
  const prevMonthPadding = Array.from({ length: firstDayOfMonth }, (_, i) => -(firstDayOfMonth - 1 - i));
  
  // Current month days
  const currentMonthDays = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  
  // Next month padding (to fill 35 or 42 cells)
  const totalCells = (firstDayOfMonth + daysInMonth) > 35 ? 42 : 35;
  const nextMonthPadding = Array.from({ length: totalCells - (firstDayOfMonth + daysInMonth) }, (_, i) => daysInMonth + i + 1);

  const calendarDays = [...prevMonthPadding, ...currentMonthDays, ...nextMonthPadding];

  return (
    <div className="flex h-screen bg-[#e9e7e2] text-black overflow-hidden font-sans">
      {/* Main Grid - Full Width */}
      <div className="flex-1 p-12 flex flex-col gap-8 overflow-y-auto">
        <div className="px-4 mb-4">
          <h1 className="text-7xl font-black tracking-tighter leading-none mb-1 uppercase italic">
            {new Date(formData.when).toLocaleString('default', { month: 'long' })}
          </h1>
          <h2 className="text-4xl font-black text-black/10 tracking-tighter leading-none uppercase italic">
            {new Date(formData.when).getFullYear()}
          </h2>
        </div>

        <div className="grid grid-cols-7 gap-0">
          {["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"].map(day => (
            <div key={day} className="flex justify-center py-4">
              <div className="w-24 py-2 bg-black text-white rounded-full text-center shadow-lg">
                <span className="text-[10px] font-black uppercase tracking-widest">{day}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="flex-1 grid grid-cols-7 gap-0 border-t border-black/10 auto-rows-fr">
          {calendarDays.map((d, i) => {
            const isCurrentMonth = d > 0 && d <= daysInMonth;
            const dayNum = isCurrentMonth ? d : null;
            const appts = appointments.filter(a => a.day === dayNum);
            
            let displayNum = d;
            if (d < 1) displayNum = prevMonthLastDay + d;
            if (d > daysInMonth) displayNum = d - daysInMonth;

            return (
              <div 
                key={i} 
                onClick={() => { if(dayNum) { setSelectedDay(dayNum); setIsSidebarOpen(true); } }}
                className={`p-4 border-r border-b border-black/10 relative group transition-all ${dayNum ? "hover:bg-black/[0.02] cursor-pointer" : "bg-black/[0.01]"}`}
              >
                <div className="flex justify-between items-start mb-2">
                  <span className={`text-xs font-black ${!isCurrentMonth ? "text-black/10" : "text-black/30"}`}>
                    {displayNum}
                  </span>
                  {dayNum && appts.map(a => (
                    <div key={a.id} className={`w-6 h-6 rounded-full ${a.color} shadow-sm group-hover:scale-110 transition-transform`} />
                  ))}
                </div>
                {dayNum && appts.map(a => (
                  <div key={a.id} className="mt-3 flex flex-col gap-1 bg-white/50 p-2 rounded-xl border border-black/5">
                     <div className="flex justify-between items-center mb-1">
                        <span className="text-[7px] font-black text-black/30 uppercase tracking-widest">{a.time || "09:00"}</span>
                        <div className={`w-1.5 h-1.5 rounded-full ${a.color}`} />
                     </div>
                     <p className="text-[10px] font-black uppercase tracking-tighter italic leading-none truncate">{a.client}</p>
                     <p className="text-[7px] font-bold text-black/40 uppercase tracking-wider truncate">{a.service}</p>
                     <p className="text-[7px] font-bold text-black/20 uppercase tracking-widest truncate">{a.room}</p>
                  </div>
                ))}
                {!appts.length && dayNum && (
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                    <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center shadow-lg scale-90 group-hover:scale-100 transition-transform">
                      <Plus size={14} />
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div 
            initial={{ x: "100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "100%", opacity: 0 }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="w-[450px] bg-white border-l border-black/5 h-screen fixed top-0 right-0 shadow-[-20px_0_50px_rgba(0,0,0,0.1)] p-12 flex flex-col gap-12 z-[200] overflow-y-auto custom-scrollbar"
          >
            <div className="flex justify-between items-center">
              <div className="space-y-1">
                <h3 className="text-2xl font-black uppercase tracking-tighter italic leading-none">Manual Override</h3>
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-black/20 italic">Override Protocol v4.0</p>
              </div>
              <button onClick={() => setIsSidebarOpen(false)} className="p-3 hover:bg-black/5 rounded-2xl transition-all active:scale-90 group">
                <X size={24} className="text-black/20 group-hover:text-black transition-colors" />
              </button>
            </div>

            <div className="space-y-10">
              {/* Section: Temporal Config */}
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                   <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-black/30 whitespace-nowrap">Temporal Config</h4>
                   <div className="flex-1 h-px bg-black/5" />
                </div>
                <div className="space-y-3">
                  <CalendarInput 
                    label="When" 
                    value={formData.when} 
                    type="date"
                    icon={<CalendarDays size={18} />} 
                    onChange={(v) => updateField("when", v)}
                  />
                  <div className="grid grid-cols-2 gap-3">
                    <CalendarInput 
                      label="Time" 
                      value={formData.time} 
                      type="time"
                      icon={<Clock size={18} />} 
                      onChange={(v) => updateField("time", v)}
                    />
                    <CalendarInput 
                      label="End" 
                      value={formData.end} 
                      type="time"
                      icon={<Clock size={18} />} 
                      onChange={(v) => updateField("end", v)}
                    />
                  </div>
                </div>
              </div>

              {/* Section: Client Search */}
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                   <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-black/30 whitespace-nowrap">Client Registry</h4>
                   <div className="flex-1 h-px bg-black/5" />
                   <button className="text-[9px] font-black uppercase tracking-widest text-black/40 hover:text-black transition-colors">+ New Client</button>
                </div>
                <button 
                  onClick={() => setIsSearchModalOpen(true)}
                  className="w-full bg-black/5 border-2 border-transparent rounded-2xl px-6 py-5 flex items-center justify-between group hover:bg-white hover:border-black/10 transition-all shadow-sm"
                >
                  <div className="flex items-center gap-4">
                    <Search size={18} className="text-black/10 group-hover:text-black transition-colors" />
                    <span className="text-xs font-black uppercase tracking-[0.1em] text-black/30 group-hover:text-black transition-colors">
                      {formData.searchClient || "SEARCH FOR A CLIENT..."}
                    </span>
                  </div>
                  <div className="w-6 h-6 rounded-full bg-black/5 flex items-center justify-center">
                    <Plus size={12} className="text-black/20" />
                  </div>
                </button>
              </div>

              {/* Section: Appointment Details */}
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                   <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-black/30 whitespace-nowrap">Appointment Details</h4>
                   <div className="flex-1 h-px bg-black/5" />
                </div>
                <div className="space-y-3">
                  <CalendarInput 
                    label="Service" 
                    value={formData.service} 
                    type="select"
                    options={contentTypes}
                    icon={<ChevronDown size={18} />} 
                    onChange={(v) => updateField("service", v)}
                  />
                  <CalendarInput 
                    label="Resources" 
                    value={formData.resources} 
                    type="select"
                    options={["Room 101", "Room 102", "Room 103", "Room 104"]}
                    icon={<ChevronDown size={18} />} 
                    onChange={(v) => updateField("resources", v)}
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-6 space-y-3">
                <button 
                  onClick={handleSave}
                  className="w-full bg-black text-white py-5 rounded-2xl text-xs font-black uppercase tracking-[0.3em] shadow-[0_20px_40px_rgba(0,0,0,0.2)] hover:scale-[1.02] active:scale-[0.98] transition-all"
                >
                  Save Appointment
                </button>
                <button 
                  onClick={() => setIsSidebarOpen(false)}
                  className="w-full bg-white border-2 border-black/5 text-black/40 py-5 rounded-2xl text-xs font-black uppercase tracking-[0.3em] hover:text-black hover:border-black/10 active:scale-[0.98] transition-all"
                >
                  Cancel
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

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
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] bg-white rounded-[3rem] shadow-2xl z-[301] p-10 flex flex-col gap-8"
            >
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-black uppercase italic tracking-tighter">Select Client</h3>
                <button onClick={() => setIsSearchModalOpen(false)} className="p-2 hover:bg-black/5 rounded-full transition-colors"><X size={20} /></button>
              </div>

              <div className="relative group">
                <Search size={20} className="absolute left-6 top-1/2 -translate-y-1/2 text-black/20 group-focus-within:text-black transition-colors" />
                <input 
                  autoFocus
                  type="text" 
                  placeholder="SEARCH NAME OR EMAIL..."
                  className="w-full bg-black/5 border-2 border-transparent rounded-2xl pl-16 pr-6 py-5 text-sm font-black uppercase tracking-widest focus:bg-white focus:border-black/10 focus:ring-0 transition-all outline-none"
                  onChange={(e) => {
                    // Internal filtering handled below
                  }}
                />
              </div>

              <div className="max-h-[300px] overflow-y-auto custom-scrollbar space-y-2 pr-2">
                {patients.map(p => (
                  <button
                    key={p.id}
                    onClick={() => {
                      updateField("searchClient", p.name);
                      setIsSearchModalOpen(false);
                    }}
                    className="w-full p-6 text-left hover:bg-black/5 rounded-3xl flex flex-col gap-1 border border-black/[0.03] transition-all hover:scale-[1.02] active:scale-95 group"
                  >
                    <span className="text-sm font-black uppercase tracking-tighter italic group-hover:text-emerald-600 transition-colors">{p.name}</span>
                    <span className="text-[10px] font-bold text-black/20 uppercase tracking-widest">{p.email}</span>
                  </button>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
