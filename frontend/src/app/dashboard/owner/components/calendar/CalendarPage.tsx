"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, CalendarDays, Clock, User, Search, X, ChevronDown } from "lucide-react";
import { CalendarInput } from "./CalendarInput";

export function CalendarPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedDay, setSelectedDay] = useState(8);
  const [searchFocused, setSearchFocused] = useState(false);

  // Helper to get formatted date string (YYYY-MM-DD)
  const getYYYYMMDD = (day: number) => `2026-05-${day < 10 ? `0${day}` : day}`;


  // Patient database from PATIENT LIST PAGE
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
    service: "Consultation",
    resources: "Room 101",
    flag: "Urgent"
  });


  const updateField = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };


  const [appointments, setAppointments] = useState([
    {
      id: "1",
      day: 8,
      time: "10:00 AM",
      client: "Alexander Wright",
      with: "Dr. Jenkins",
      location: "Room 102"
    }
  ]);

  const days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(2026, 4, 4 + i); // Start from May 4th (Monday)
    // If selectedDay is outside this initial week, we should ideally shift, 
    // but for this prototype let's keep it simple or expand it.
    return { 
      num: 4 + i, 
      label: d.toLocaleDateString('en-US', { weekday: 'short' }).toUpperCase() 
    };
  });



  const timeSlots = ["08:00 AM", "09:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", "01:00 PM", "02:00 PM", "03:00 PM", "04:00 PM", "05:00 PM", "06:00 PM", "07:00 PM"];

  const handleSave = () => {
    // Format time for display (HH:mm -> hh:mm AM/PM) to match timeSlots
    const formatTime = (t: string) => {
      const [h, m] = t.split(":");
      const hour = parseInt(h);
      const ampm = hour >= 12 ? "PM" : "AM";
      const h12 = hour % 12 || 12;
      const hStr = h12 < 10 ? `0${h12}` : `${h12}`;
      return `${hStr}:${m} ${ampm}`;
    };

    const newDay = parseInt(formData.when.split("-")[2]) || selectedDay;
    const newAppt = {
      id: Math.random().toString(36).substr(2, 9),
      day: newDay,
      time: formatTime(formData.time),
      client: formData.searchClient || "Unknown Client",
      with: formData.withPerson,
      location: formData.location
    };
    setAppointments([...appointments, newAppt]);
    setSelectedDay(newDay);
    setIsSidebarOpen(false);
  };



  const removeAppointment = (id: string) => {
    setAppointments(appointments.filter(a => a.id !== id));
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
            {days.map(d => {
              const apptCount = appointments.filter(a => a.day === d.num).length;
              return (
                <button 
                  key={d.num} 
                  onClick={() => setSelectedDay(d.num)}
                  className={`p-6 rounded-[2rem] flex flex-col items-center gap-2 transition-all ${selectedDay === d.num ? "bg-black text-white shadow-2xl scale-105" : "bg-black/[0.02] hover:bg-black/5"}`}
                >
                  <span className="text-[10px] font-black uppercase opacity-40">{d.label}</span>
                  <span className="text-2xl font-black italic">{d.num}</span>
                  <div className={`w-1.5 h-1.5 rounded-full ${apptCount > 2 ? "bg-emerald-500" : apptCount > 0 ? "bg-amber-500" : "bg-transparent"}`} />
                </button>
              );
            })}

          </div>

          <div className="space-y-1">
            {timeSlots.map(time => (
              <div key={time} className="group flex items-center gap-6 h-20 border-t border-black/5 first:border-0 hover:bg-black/[0.02] transition-colors relative">
                <div className="w-20 text-[10px] font-black text-black/20 uppercase tracking-widest text-right">{time}</div>
                <div className="flex-1 h-px bg-black/5" />
                {appointments.filter(a => a.day === selectedDay && a.time === time).map(appt => (
                  <div key={appt.id} className="absolute left-32 right-10 top-2 bottom-2 bg-black text-white rounded-2xl p-4 flex justify-between items-center shadow-xl group/item z-10">
                    <div className="space-y-0.5">
                       <p className="text-[7px] font-black uppercase tracking-[0.2em] text-white/40">{appt.with} · {appt.location}</p>
                       <h4 className="text-xs font-black uppercase tracking-widest italic text-white leading-tight">{appt.client}</h4>
                    </div>

                    <div className="flex items-center gap-2 opacity-0 group-hover/item:opacity-100 transition-opacity">
                       <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          removeAppointment(appt.id);
                        }}
                        className="p-2 hover:bg-white/10 rounded-lg transition-all"
                       >
                        <X size={14} />
                       </button>
                       <ChevronRight size={16} />
                    </div>
                  </div>
                ))}

                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center z-20 pointer-events-none">
                   <button 
                    onClick={() => {
                      const [h, m_ampm] = time.split(":");
                      const [m, ampm] = m_ampm.split(" ");
                      let hour = parseInt(h);
                      if (ampm === "PM" && hour !== 12) hour += 12;
                      if (ampm === "AM" && hour === 12) hour = 0;
                      const hStr = hour < 10 ? `0${hour}` : `${hour}`;
                      
                      setFormData(prev => ({ 
                        ...prev, 
                        time: `${hStr}:${m}`,
                        when: getYYYYMMDD(selectedDay)
                      }));
                      setIsSidebarOpen(true);
                    }} 
                    className="bg-white border border-black/10 px-4 py-2 rounded-full text-[8px] font-black uppercase tracking-widest shadow-sm hover:scale-105 transition-all pointer-events-auto"
                   >
                    Quick Reserve
                   </button>
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
                  <CalendarInput 
                    label="Location" 
                    value={formData.location} 
                    type="select"
                    options={["Main Clinic", "City Branch", "West Side", "Dental Care Unit"]}
                    icon={<ChevronDown size={14} />} 
                    onChange={(v) => updateField("location", v)}
                  />
                  <CalendarInput 
                    label="With" 
                    value={formData.withPerson} 
                    type="select"
                    options={["Dr. Jenkins", "Dr. Smith", "Dr. Sarah", "Dr. Michael"]}
                    icon={<ChevronDown size={14} />} 
                    onChange={(v) => updateField("withPerson", v)}
                  />
                </div>
              </div>



              {/* Section: Client/Personal/Group Toggle */}
              <div className="grid grid-cols-3 border border-black/10 rounded-xl overflow-hidden shadow-inner">
                 {["Client", "Personal", "Group"].map((type) => (
                   <button 
                     key={type} 
                     onClick={() => updateField("type", type)}
                     className={`py-2 flex flex-col items-center gap-1 border-r border-black/10 last:border-0 transition-all ${formData.type === type ? "bg-black text-white" : "bg-white text-black/40 hover:text-black hover:bg-black/5"}`}
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
                    value={formData.searchClient}
                    onFocus={() => setSearchFocused(true)}
                    onBlur={() => setTimeout(() => setSearchFocused(false), 200)}
                    onChange={(e) => updateField("searchClient", e.target.value)}
                    className="w-full bg-black/5 border border-transparent rounded-lg px-4 py-3 text-[10px] font-black uppercase tracking-widest placeholder:text-black/20 focus:bg-white focus:border-black focus:ring-0 transition-all outline-none"
                  />
                  <Search size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-black/20 group-focus-within:text-black transition-colors" />
                  
                  {/* Search Results Dropdown */}
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
                      {patients.filter(p => p.name.toLowerCase().includes(formData.searchClient.toLowerCase()) || p.email.toLowerCase().includes(formData.searchClient.toLowerCase())).length === 0 && (
                        <div className="px-4 py-3 text-[8px] font-black uppercase text-black/20 italic">No matching signals found</div>
                      )}
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
                    options={[
                      "General Consultation", 
                      "Emergency Triage", 
                      "Surgical Protocol", 
                      "Diagnostic X-Ray", 
                      "Laboratory Analysis", 
                      "Post-Op Recovery", 
                      "Pediatric Screening",
                      "Dental Prophylaxis",
                      "Veterinary Wellness"
                    ]}
                    icon={<ChevronDown size={14} />} 
                    onChange={(v) => updateField("service", v)}
                  />
                  <CalendarInput 
                    label="Resources" 
                    value={formData.resources} 
                    type="select"
                    options={[
                      "Room 101 - Primary", 
                      "Room 102 - Surgery", 
                      "Room 103 - Recovery", 
                      "Room 104 - Pediatric", 
                      "Room 105 - Diagnostic",
                      "Lab 01 - Bio-Analytic",
                      "X-Ray Bay 01",
                      "Intensive Care Unit"
                    ]}
                    icon={<ChevronDown size={14} />} 
                    onChange={(v) => updateField("resources", v)}
                  />
                  <CalendarInput 
                    label="Flag" 
                    value={formData.flag} 
                    type="select"
                    options={[
                      "Standard Protocol", 
                      "CRITICAL / URGENT", 
                      "VIP / PRIORITY", 
                      "Follow-up Mandatory", 
                      "Research Participant",
                      "High-Profile Signal",
                      "Financial Clearance Pending"
                    ]}
                    icon={<ChevronDown size={14} />} 
                    onChange={(v) => updateField("flag", v)}
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
