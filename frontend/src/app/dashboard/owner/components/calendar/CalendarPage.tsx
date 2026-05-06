"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CalendarDays, Clock, User, Search, X, ChevronDown, Plus } from "lucide-react";
import { CalendarInput } from "./CalendarInput";

export function CalendarPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
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
    when: "2026-01-08",
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

  const platforms = [
    { name: "PLATFORM A", color: "bg-[#b68a35]" },
    { name: "PLATFORM B", color: "bg-[#a65d3f]" },
    { name: "PLATFORM C", color: "bg-[#9b9b9b]" },
    { name: "PLATFORM D", color: "bg-[#4a6741]" },
    { name: "PLATFORM E", color: "bg-[#7d7d7d]" },
  ];

  const calendarDays = Array.from({ length: 35 }, (_, i) => i - 3); // Jan 1st 2026 is Thursday (Index 4)


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



        <div className="flex-1 grid grid-cols-7 grid-rows-5 gap-0 border-t border-black/10">
          {calendarDays.map((d, i) => {
            const dayNum = d > 0 && d <= 31 ? d : null;
            const appts = appointments.filter(a => a.day === dayNum);

            return (
              <div
                key={i}
                onClick={() => { if (dayNum) { setSelectedDay(dayNum); setIsSidebarOpen(true); } }}
                className={`p-4 border-r border-b border-black/10 relative group transition-all ${dayNum ? "hover:bg-black/[0.02] cursor-pointer" : "bg-black/[0.01]"}`}
              >
                <div className="flex justify-between items-start mb-2">
                  <span className={`text-xs font-black ${!dayNum ? "text-black/10" : "text-black/30"}`}>
                    {d < 1 ? 31 + d : d > 31 ? d - 31 : d}
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
                     <p className="text-[10px] font-black uppercase tracking-tighter italic leading-none truncate">{a.client || a.label}</p>
                     <p className="text-[7px] font-bold text-black/40 uppercase tracking-wider truncate">{a.service || "Standard Service"}</p>
                     <p className="text-[7px] font-bold text-black/20 uppercase tracking-widest truncate">{a.room || "Room 101"}</p>
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


            <div className="space-y-8 overflow-y-auto pr-2 custom-scrollbar">
              {/* Section: Temporal Config */}
              <div className="space-y-3">
                <h4 className="text-[9px] font-black uppercase tracking-[0.2em] text-black/30 border-b border-black/5 pb-1">Temporal Config</h4>
                <div className="space-y-2">
                  <CalendarInput
                    label="When"
                    value={formData.when}
                    type="date"
                    icon={<CalendarDays size={14} />}
                    onChange={(v) => updateField("when", v)}
                  />
                  <div className="grid grid-cols-2 gap-2">
                    <CalendarInput
                      label="Time"
                      value={formData.time}
                      type="time"
                      icon={<Clock size={14} />}
                      onChange={(v) => updateField("time", v)}
                    />
                    <CalendarInput
                      label="End"
                      value={formData.end}
                      type="time"
                      icon={<Clock size={14} />}
                      onChange={(v) => updateField("end", v)}
                    />
                  </div>
                </div>
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
                    value={formData.searchClient}
                    onFocus={() => setSearchFocused(true)}
                    onBlur={() => setTimeout(() => setSearchFocused(false), 200)}
                    onChange={(e) => updateField("searchClient", e.target.value)}
                    className="w-full bg-black/5 border border-transparent rounded-lg px-4 py-3 text-[10px] font-black uppercase tracking-widest placeholder:text-black/20 focus:bg-white focus:border-black focus:ring-0 transition-all outline-none"
                  />
                  <Search size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-black/20 group-focus-within:text-black transition-colors" />

                  {searchFocused && formData.searchClient && (
                    <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-black/10 rounded-xl shadow-2xl z-[300] max-h-48 overflow-y-auto custom-scrollbar overflow-hidden">
                      {patients
                        .filter(p => p.name.toLowerCase().includes(formData.searchClient.toLowerCase()) || p.email.toLowerCase().includes(formData.searchClient.toLowerCase()))
                        .map(p => (
                          <button
                            key={p.id}
                            onClick={() => {
                              updateField("searchClient", p.name);
                              setSearchFocused(false);
                            }}
                            className="w-full px-4 py-3 text-left hover:bg-black/5 flex flex-col gap-0.5 border-b border-black/5 last:border-0 transition-colors"
                          >
                            <span className="text-[10px] font-black uppercase tracking-tighter italic">{p.name}</span>
                            <span className="text-[8px] font-bold text-black/20 uppercase tracking-widest">{p.email}</span>
                          </button>
                        ))
                      }
                    </div>
                  )}
                </div>
              </div>

              {/* Section: Appointment Details */}
              <div className="space-y-4">
                <h4 className="text-[9px] font-black uppercase tracking-[0.2em] text-black/30 border-b border-black/5 pb-1">Appointment Details</h4>
                <div className="space-y-2">
                  <CalendarInput
                    label="Service"
                    value={formData.service}
                    type="select"
                    options={contentTypes}
                    icon={<ChevronDown size={14} />}
                    onChange={(v) => updateField("service", v)}
                  />
                  <CalendarInput
                    label="Resources"
                    value={formData.resources}
                    type="select"
                    options={["Room 101", "Room 102", "Room 103"]}
                    icon={<ChevronDown size={14} />}
                    onChange={(v) => updateField("resources", v)}
                  />
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
