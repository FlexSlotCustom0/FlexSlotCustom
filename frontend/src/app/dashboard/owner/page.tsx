"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  BarChart3, Users, Calendar, Settings, Bot, Search, Bell,
  TrendingUp, Layers, ShieldCheck, CheckCircle2, FileText,
  Plus, ExternalLink, Scissors, Code, Stethoscope, Briefcase,
  Layout, Database, Zap, Cpu, Lock, Globe, Mail, Clock, ChevronRight, CalendarClock, Trash2, LayoutDashboard,
  Palette, Sparkles, User, AlertCircle, Phone, Mail as MailIcon, CalendarDays, Activity, Timer, ZapOff,
  CircleDot, ChevronDown, Filter, MoreHorizontal, Download, ArrowUpRight, ArrowDownRight, PieChart,
  X, RefreshCw
} from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";

export default function OwnerDashboard() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [clinicName, setClinicName] = useState("FlexSlotCoustom");
  const [dateRange, setDateRange] = useState("May 1 - May 31, 2026");
  const [isApplying, setIsApplying] = useState(false);

  const [bookings, setBookings] = useState<any[]>([]);
  const [doneCount, setDoneCount] = useState(0);
  const [notesCount, setNotesCount] = useState(0);

  useEffect(() => {
    const savedBookings = localStorage.getItem("flexslot_bookings");
    const savedDone = localStorage.getItem("flexslot_done_count");
    const savedNotes = localStorage.getItem("flexslot_notes");

    if (savedDone) setDoneCount(parseInt(savedDone));
    if (savedNotes) setNotesCount(parseInt(savedNotes));

    const dummy = [
      { id: '1', clientName: 'Alexander Wright', serviceName: 'General Consultation', slotTime: '10:30 AM', practitioner: 'Dr. Anderson' },
      { id: '2', clientName: 'Sarah Jenkins', serviceName: 'Diagnostic Scan', slotTime: '11:15 AM', practitioner: 'Dr. Jenkins' },
      { id: '3', clientName: 'Michael Chen', serviceName: 'Orthopedic Follow-up', slotTime: '12:00 PM', practitioner: 'Dr. Wright' },
      { id: '4', clientName: 'Emily Rodriguez', serviceName: 'Pediatric Checkup', slotTime: '01:30 PM', practitioner: 'Dr. Anderson' },
      { id: '5', clientName: 'David Thompson', serviceName: 'Cardiology Screening', slotTime: '02:45 PM', practitioner: 'Dr. Jenkins' },
      { id: '6', clientName: 'Jessica Lee', serviceName: 'Physical Therapy', slotTime: '03:30 PM', practitioner: 'Dr. Anderson' },
      { id: '7', clientName: 'Robert Garcia', serviceName: 'Dental Cleaning', slotTime: '04:15 PM', practitioner: 'Dr. Wright' },
      { id: '8', clientName: 'Sophie Bennett', serviceName: 'Dermatology Review', slotTime: '05:00 PM', practitioner: 'Dr. Jenkins' }
    ];

    let loadedBookings = null;
    try {
      loadedBookings = savedBookings ? JSON.parse(savedBookings) : null;
    } catch (e) { }

    // Force reset if practitioner data is missing (legacy data fix)
    if (loadedBookings && loadedBookings.length > 0 && loadedBookings[0].practitioner) {
      setBookings(loadedBookings.reverse());
    } else {
      setBookings(dummy);
      localStorage.setItem("flexslot_bookings", JSON.stringify(dummy));
    }
  }, []);

  const handleComplete = () => {
    if (bookings.length === 0) return;
    const next = [...bookings];
    next.shift();
    setBookings(next);

    const nextDone = doneCount + 1;
    const nextNotes = notesCount + 1;

    setDoneCount(nextDone);
    setNotesCount(nextNotes);

    localStorage.setItem("flexslot_bookings", JSON.stringify([...next].reverse()));
    localStorage.setItem("flexslot_done_count", nextDone.toString());
    localStorage.setItem("flexslot_notes", nextNotes.toString());
  };

  const handleApplyFilters = () => {
    setIsApplying(true);
    setTimeout(() => setIsApplying(false), 800);
  };

  return (
    <div className="min-h-screen bg-white text-black font-sans flex overflow-hidden">
      <AnimatePresence>
        {isApplying && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-white/60 backdrop-blur-sm flex items-center justify-center"
          >
            <div className="flex flex-col items-center gap-4">
              <RefreshCw className="w-8 h-8 text-black animate-spin" />
              <span className="text-[10px] font-black uppercase tracking-[0.3em]">Syncing Neural Feed...</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <aside className="w-72 bg-white border-r border-black/5 flex flex-col h-screen sticky top-0 z-20">
        <div className="h-20 flex items-center px-8">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 bg-black rounded-full flex items-center justify-center group-hover:scale-105 transition-transform shadow-lg shadow-black/20">
              <CalendarClock className="w-5 h-5 text-white" />
            </div>
            <span className="font-black tracking-tighter text-lg uppercase truncate">FlexSlotCoustom</span>
          </Link>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-1">
          <SideNavItem icon={<LayoutDashboard size={18} />} label="Dashboard" active={activeTab === "dashboard"} onClick={() => setActiveTab("dashboard")} />

          <div className="h-px bg-black/5 my-4 mx-2" />
          <SideNavItem icon={<Layout size={18} />} label="Clinic Setup" active={activeTab === "ui"} onClick={() => setActiveTab("ui")} />
          <SideNavItem icon={<CalendarDays size={18} />} label="Calendar" active={activeTab === "calendar"} onClick={() => setActiveTab("calendar")} />
          <SideNavItem icon={<Users size={18} />} label="Patient List" active={activeTab === "audit"} onClick={() => setActiveTab("audit")} />
        </nav>

        <div className="p-6 border-t border-black/5">
          <button className="flex items-center gap-3 px-3 py-2 text-black/40 hover:text-black transition-colors font-bold text-xs uppercase tracking-widest w-full">
            <Settings size={14} /> System Registry
          </button>
        </div>
      </aside>

      <main className="flex-1 flex flex-col overflow-y-auto relative">
        <header className="h-20 bg-white border-b border-black/5 px-8 flex items-center justify-between sticky top-0 z-[100] backdrop-blur-md">
          <div className="flex items-center gap-6 flex-1">
            <h1 className="text-xl font-black uppercase tracking-tighter italic">Dashboard</h1>
            <div className="flex items-center gap-2 bg-black/5 p-1 rounded-xl ml-4">
              <button
                onClick={() => {
                  const months = [
                    { label: "This Month", range: "May 1 - May 31, 2026" },
                    { label: "Last Month", range: "Apr 1 - Apr 30, 2026" },
                    { label: "2 Months Ago", range: "Mar 1 - Mar 31, 2026" }
                  ];
                  const currentIndex = months.findIndex(m => m.range === dateRange);
                  const nextIndex = (currentIndex + 1) % months.length;
                  setDateRange(months[nextIndex].range);
                }}
                className="px-4 py-2 bg-white text-[10px] font-black uppercase tracking-widest rounded-lg shadow-sm hover:bg-black hover:text-white transition-all min-w-[100px]"
              >
                {dateRange.includes("May") ? "This Month" : dateRange.includes("Apr") ? "Last Month" : "2 Months Ago"}
              </button>
              <div className="flex items-center gap-2 px-4 py-2 text-[10px] font-black uppercase tracking-widest text-black/40 cursor-default">
                <Calendar size={14} />
                {dateRange}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <FilterDropdown label="All Practitioners" options={["Dr. Anderson", "Dr. Jenkins", "Dr. Wright"]} />
            <FilterDropdown label="All Locations" options={["Main Clinic", "West Wing", "Remote"]} />
            <button
              onClick={handleApplyFilters}
              className="px-8 py-3 bg-black text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-xl shadow-black/20 hover:scale-105 active:scale-95 transition-all"
            >
              Apply Filters
            </button>
          </div>
        </header>

        <div className="p-8 space-y-8">
          {activeTab === "dashboard" && (
            <MonochromeCommandCenter
              bookings={bookings}
              doneCount={doneCount}
              notesCount={notesCount}
              onComplete={handleComplete}
            />
          )}
          {activeTab === "overview" && <OverviewSection />}
          {activeTab === "ui" && <div className="p-20 text-center italic text-black/20 font-black uppercase tracking-[0.5em]">Identity Module Active</div>}
          {activeTab === "calendar" && <CalendarPage />}
          {activeTab === "audit" && <div className="p-20 text-center italic text-black/20 font-black uppercase tracking-[0.5em]">Patient Data Secure</div>}
        </div>
      </main>
    </div>
  );
}

function FilterDropdown({ label, options }: { label: string, options: string[] }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(label);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`px-6 py-3 bg-white border rounded-xl flex items-center gap-3 text-[10px] font-black uppercase tracking-widest transition-all ${isOpen ? 'border-black text-black' : 'border-black/5 text-black/40 hover:border-black/20'}`}
      >
        {selected}
        <ChevronDown size={14} className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute top-full right-0 mt-2 w-48 bg-white border border-black/5 rounded-2xl shadow-2xl z-[50] overflow-hidden p-2"
          >
            {options.map(o => (
              <button
                key={o}
                onClick={() => { setSelected(o); setIsOpen(false); }}
                className="w-full text-left px-4 py-3 text-[10px] font-black uppercase tracking-widest hover:bg-black/5 rounded-xl transition-colors"
              >
                {o}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function MonochromeCommandCenter({ bookings, doneCount, notesCount, onComplete }: any) {
  const ongoing = bookings[0];
  const upcoming = bookings.slice(1, 5);

  return (
    <div className="grid grid-cols-12 gap-8">
      {/* Left Column - Clinical Overview & Stream */}
      <div className="col-span-8 space-y-8">
        <div className="bg-white border border-black/5 rounded-[1.5rem] p-4 shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-2">
              <h3 className="text-[10px] font-black uppercase tracking-widest">Appointments</h3>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <MetricBox label="Total Attended" value={doneCount.toString()} />
            <MetricBox label="Total Pending" value={bookings.length.toString()} />
            <div className="bg-black/5 rounded-[1.25rem] p-4 flex flex-col items-center justify-center text-center min-h-[100px]">
              <h4 className="text-[8px] font-black uppercase tracking-widest text-black/30 mb-2">Clinical Notes</h4>
              <div className="relative w-12 h-12 mb-2">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="40" fill="transparent" stroke="rgba(0,0,0,0.05)" strokeWidth="12" />
                  <motion.circle
                    cx="50" cy="50" r="40" fill="transparent" stroke="black" strokeWidth="12"
                    strokeDasharray="251.2"
                    initial={{ strokeDashoffset: 251.2 }}
                    animate={{ strokeDashoffset: 251.2 - (notesCount * 25.12) }}
                    transition={{ duration: 1 }}
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center font-black text-sm italic">{notesCount}</div>
              </div>
              <p className="text-[8px] font-bold text-black/30 uppercase tracking-widest">Notes: {notesCount}</p>
            </div>
          </div>
        </div>

        {/* Integrated Ongoing & Upcoming Feed */}
        <div className="space-y-6">
          <AnimatePresence mode="wait">
            {ongoing ? (
              <motion.div 
                key={ongoing.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="bg-emerald-50/80 backdrop-blur-3xl text-black rounded-[2rem] p-5 shadow-[0_24px_48px_rgba(16,185,129,0.08)] relative overflow-hidden group"
              >
                {/* Futuristic Background Accents */}
                <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-400/10 rounded-full blur-[80px] -mr-24 -mt-24" />
                
                <div className="relative z-10 flex flex-col gap-4">
                  {/* Top Row: Meta & Timer */}
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-white/50 rounded-xl flex items-center justify-center backdrop-blur-3xl">
                        <Activity className="w-4 h-4 text-emerald-500 animate-pulse" />
                      </div>
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-2">
                           <span className="text-[8px] font-black uppercase tracking-widest px-1.5 py-0.5 bg-emerald-500/20 text-emerald-600 rounded">ID: {ongoing.id.slice(0, 8)}</span>
                           <span className="text-[8px] font-black uppercase tracking-widest px-1.5 py-0.5 bg-black/5 text-black/60 rounded">Room_01</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex gap-1.5">
                       <Badge label="24 YRS" color="bg-black/5" />
                       <Badge label="MALE" color="bg-black/5" />
                       <Badge label="O+" color="bg-emerald-500/10 text-emerald-600" />
                    </div>
                  </div>

                  {/* Middle Row: Patient Name & Reason */}
                  <div className="flex items-end justify-between gap-4">
                    <div className="space-y-1">
                      <h2 className="text-4xl font-black tracking-tighter uppercase italic leading-none text-transparent bg-clip-text bg-gradient-to-br from-black to-black/40">{ongoing.clientName}</h2>
                      <div className="flex items-center gap-2 pt-1">
                        <span className="px-2 py-0.5 bg-emerald-500 text-white text-[8px] font-black uppercase tracking-widest rounded-full">Routine Checkup</span>
                        <p className="text-black/40 text-[8px] font-bold uppercase tracking-[0.2em] italic">Consultation In_Progress</p>
                      </div>
                    </div>
                    
                    <button 
                      onClick={onComplete}
                      className="px-5 py-2.5 bg-black text-white rounded-lg font-black text-[9px] uppercase tracking-widest hover:bg-emerald-600 transition-all shadow-[0_10px_20px_rgba(0,0,0,0.1)] active:scale-95 shrink-0"
                    >
                      Complete
                    </button>
                  </div>

                  {/* Footer Row: Doctor info */}
                  <div className="pt-3 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-black/5 flex items-center justify-center">
                         <Stethoscope size={10} className="text-emerald-500" />
                      </div>
                      <div>
                         <p className="text-[8px] font-black text-black/80 uppercase tracking-widest italic">{ongoing.practitioner}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ) : (
              <div className="p-20 border-2 border-dashed border-black/5 rounded-[3rem] text-center text-black/20 font-black uppercase tracking-widest italic">
                Shift Stream Terminated.
              </div>
            )}
          </AnimatePresence>

          {/* Upcoming Feed List */}
          <div className="bg-white border border-black/5 rounded-[3rem] p-10 shadow-sm space-y-8">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-black uppercase tracking-tighter italic">Upcoming Feed</h3>
              <span className="text-[10px] font-black uppercase tracking-widest text-black/20 italic">{upcoming.length} Signals_Queued</span>
            </div>

            <div className="space-y-2">
              <AnimatePresence mode="popLayout">
                {upcoming.map((u, i) => (
                  <motion.div
                    key={u.id}
                    layout
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-center justify-between p-6 rounded-[2rem] hover:bg-black/5 transition-all group"
                  >
                    <div className="flex items-center gap-6">
                      <div className="w-12 h-12 bg-black/5 rounded-2xl flex flex-col items-center justify-center group-hover:bg-black group-hover:text-white transition-all">
                        <span className="text-[10px] font-black leading-none">{u.slotTime.split(' ')[0]}</span>
                        <span className="text-[8px] font-black opacity-40 uppercase">{u.slotTime.split(' ')[1]}</span>
                      </div>
                      <div>
                        <h4 className="text-lg font-black uppercase tracking-tighter italic">{u.clientName}</h4>
                        <p className="text-[10px] font-bold text-black/30 uppercase tracking-widest italic">{u.serviceName} · {u.practitioner}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button className="p-4 text-black/20 hover:text-black hover:bg-white rounded-2xl transition-all shadow-none hover:shadow-sm"><Phone size={16} /></button>
                      <button className="p-4 text-black/20 hover:text-black hover:bg-white rounded-2xl transition-all shadow-none hover:shadow-sm"><MailIcon size={16} /></button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>

      {/* Right Column - Status Analytics & New Clients */}
      <div className="col-span-4 space-y-8">
        <div className="bg-white border border-black/5 rounded-[2.5rem] p-10 shadow-sm relative overflow-hidden">
          <div className="flex justify-between items-center mb-8 relative z-10">
            <div className="flex items-center gap-3">
              <h3 className="text-sm font-black uppercase tracking-widest">Status Feed</h3>
            </div>
            <div className="text-[10px] font-black uppercase tracking-widest text-black/20 italic">6/5/26</div>
          </div>

          <div className="flex items-end gap-6 h-48 border-b border-black/5 pb-6 mb-6 px-4 relative">
            <motion.div
              animate={{ height: `${Math.min(90, (doneCount * 10) + 10)}%` }}
              className="flex-1 bg-black rounded-t-xl shadow-2xl relative group"
            >
              <div className="absolute -top-8 left-1/2 -translate-x-1/2 text-[9px] font-black bg-black text-white px-2 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">Completed: {doneCount}</div>
            </motion.div>
            <motion.div
              animate={{ height: `${Math.min(90, (bookings.length * 5) + 20)}%` }}
              className="flex-1 bg-black/40 rounded-t-xl relative group"
            >
              <div className="absolute -top-8 left-1/2 -translate-x-1/2 text-[9px] font-black bg-black text-white px-2 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">Pending: {bookings.length}</div>
            </motion.div>
            <motion.div
              animate={{ height: "40%" }}
              className="flex-1 bg-black/10 rounded-t-xl relative group"
            >
              <div className="absolute -top-8 left-1/2 -translate-x-1/2 text-[9px] font-black bg-black text-white px-2 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">Confirmed Signal</div>
            </motion.div>
          </div>

          <div className="space-y-3">
            <StatusLegend label="Completed" color="bg-black" value={doneCount.toString()} />
            <StatusLegend label="Arrived" color="bg-black/60" value="0" />
            <StatusLegend label="Confirmed" color="bg-black/40" value="0" />
            <StatusLegend label="Pending" color="bg-black/20" value={bookings.length.toString()} />
            <StatusLegend label="Rescheduled" color="bg-black/10" value="0" />
          </div>
        </div>

      </div>
    </div>
  );
}

function StatusLegend({ label, color, value }: { label: string, color: string, value: string }) {
  return (
    <div className="flex items-center justify-between text-[9px] font-black uppercase tracking-widest group cursor-default">
      <div className="flex items-center gap-3">
        <div className={`w-2.5 h-2.5 rounded-full ${color} group-hover:scale-125 transition-transform`} />
        <span className="text-black/40 group-hover:text-black transition-colors">{label}</span>
      </div>
      <span className="text-black/20 group-hover:text-black transition-colors italic">{value}</span>
    </div>
  );
}

function Badge({ label, color = "bg-black/5" }: { label: string, color?: string }) {
  return (
    <span className={`text-[8px] font-black uppercase tracking-widest px-2 py-1 rounded-md border border-white/5 ${color}`}>
      {label}
    </span>
  );
}

function MetricBox({ label, value }: { label: string, value: string }) {
  return (
    <div className="bg-black/5 rounded-[1.25rem] p-4 flex flex-col items-center justify-center text-center space-y-1 shadow-inner group hover:bg-black hover:text-white transition-all cursor-default min-h-[100px]">
      <h4 className="text-[8px] font-black uppercase tracking-widest text-black/30 group-hover:text-white/30">{label}</h4>
      <div className="text-3xl font-black italic">{value}</div>
    </div>
  );
}

function SideNavItem({ icon, label, active, onClick }: { icon: any, label: string, active?: boolean, onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-bold transition-all relative group ${active
        ? 'bg-black text-white shadow-2xl shadow-black/20'
        : 'text-black/40 hover:bg-black/5 hover:text-black'
        }`}
    >
      {icon}
      {label}
    </button>
  );
}

function CalendarPage() {
  const [activeView, setActiveView] = useState("Week");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [currentWeek, setCurrentWeek] = useState("Mon 4/5 - Sun 10/5/2026");
  const [isSaving, setIsSaving] = useState(false);

  const days = ["Mon 4 May", "Tue 5 May", "Wed 6 May", "Thu 7 May", "Fri 8 May", "Sat 9 May", "Sun 10 May"];
  const times = ["8 AM", "9 AM", "10 AM", "11 AM", "12 PM", "1 PM", "2 PM", "3 PM", "4 PM", "5 PM", "6 PM", "7 PM", "8 PM"];

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      setIsSidebarOpen(false);
    }, 1200);
  };

  return (
    <div className="flex h-[calc(100vh-140px)] -m-8 relative overflow-hidden bg-white">
      <AnimatePresence>
        {isSaving && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-white/80 backdrop-blur-md flex items-center justify-center"
          >
            <div className="flex flex-col items-center gap-4">
               <RefreshCw className="w-10 h-10 text-black animate-spin" />
               <span className="text-[10px] font-black uppercase tracking-[0.4em]">Registering Signal...</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Calendar Section */}
      <div className="flex-1 flex flex-col min-w-0 border-r border-black/5">
        {/* Calendar Header */}
        <div className="h-14 border-b border-black/5 flex items-center justify-between px-6 bg-white shrink-0">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <button 
                onClick={() => setCurrentWeek("Mon 27/4 - Sun 3/5/2026")}
                className="p-1 hover:bg-black/5 rounded transition-colors"
              >
                <ChevronRight size={14} className="rotate-180" />
              </button>
              <span className="text-[10px] font-black uppercase tracking-widest min-w-[150px] text-center">{currentWeek}</span>
              <button 
                onClick={() => setCurrentWeek("Mon 11/5 - Sun 17/5/2026")}
                className="p-1 hover:bg-black/5 rounded transition-colors"
              >
                <ChevronRight size={14} />
              </button>
            </div>
            <button 
              onClick={() => setCurrentWeek("Mon 4/5 - Sun 10/5/2026")}
              className="px-3 py-1 bg-black/5 rounded text-[10px] font-black uppercase tracking-widest hover:bg-black hover:text-white transition-all active:scale-95"
            >
              Today
            </button>
          </div>
          
          <div className="flex items-center gap-1 bg-black/5 p-1 rounded-lg">
            {["Day", "M-F", "Week", "Month"].map(view => (
              <button 
                key={view}
                onClick={() => setActiveView(view)}
                className={`px-3 py-1 text-[9px] font-black uppercase tracking-widest rounded transition-all ${activeView === view ? "bg-black text-white shadow-lg" : "text-black/40 hover:text-black"}`}
              >
                {view}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button className="p-2 hover:bg-black/5 rounded transition-colors active:rotate-180 duration-500"><RefreshCw size={14} /></button>
            <button className="p-2 hover:bg-black/5 rounded transition-colors"><Search size={14} /></button>
            <button className="px-3 py-1 border border-black/10 rounded text-[9px] font-black uppercase tracking-widest hover:bg-black hover:text-white transition-all active:scale-95">Time Finder</button>
            {!isSidebarOpen && (
              <button 
                onClick={() => setIsSidebarOpen(true)}
                className="ml-2 w-8 h-8 bg-black text-white rounded-full flex items-center justify-center hover:scale-110 active:scale-90 transition-all shadow-lg"
              >
                <Plus size={16} />
              </button>
            )}
          </div>
        </div>

        {/* Calendar Grid */}
        <div className="flex-1 overflow-y-auto overflow-x-auto custom-scrollbar">
          <div className="min-w-[800px]">
            {/* Days Header */}
            <div className="grid grid-cols-[80px_repeat(7,1fr)] border-b border-black/5">
              <div className="h-10 border-r border-black/5" />
              {days.map(day => (
                <div key={day} className="h-10 flex items-center justify-center text-[9px] font-black uppercase tracking-widest border-r border-black/5 bg-black/5">
                  {day}
                </div>
              ))}
            </div>

            {/* Time Rows */}
            <div className="relative">
              {times.map((time, idx) => (
                <div key={time} className="grid grid-cols-[80px_repeat(7,1fr)] group">
                  <div className="h-16 flex items-start justify-center pt-2 text-[9px] font-black text-black/20 border-r border-black/5">
                    {time}
                  </div>
                  {Array.from({ length: 7 }).map((_, i) => (
                    <div 
                      key={i} 
                      className="h-16 border-r border-black/5 border-b border-black/5 group-hover:bg-black/[0.01] transition-colors relative cursor-pointer"
                      onClick={() => setIsSidebarOpen(true)}
                    >
                      {/* Example Bookings */}
                      {idx === 1 && i === 1 && (
                        <div className="absolute inset-x-1 top-1 bottom-1 bg-black text-white p-2 rounded-lg shadow-xl z-10 hover:scale-[1.02] transition-transform">
                          <p className="text-[8px] font-black uppercase leading-tight">John Smith</p>
                          <p className="text-[7px] font-bold opacity-60">9:00AM - 11:00AM</p>
                        </div>
                      )}
                      {idx === 1 && i === 2 && (
                        <div className="absolute inset-x-1 top-1 bottom-1 bg-black/5 border border-black/10 text-black p-2 rounded-lg z-10 hover:bg-black/10 transition-colors">
                          <p className="text-[8px] font-black uppercase leading-tight">Mary Lee</p>
                          <p className="text-[7px] font-bold opacity-40">9:00AM - 11:00AM</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ))}
              {/* Current Time Indicator Line */}
              <div className="absolute top-[384px] left-[80px] right-0 h-0.5 bg-black/10 z-0 pointer-events-none" />
            </div>
          </div>
        </div>
      </div>

      {/* Right Sidebar - New Appointment */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div 
            initial={{ x: 320 }}
            animate={{ x: 0 }}
            exit={{ x: 320 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="w-[320px] bg-white flex flex-col border-l border-black/5 overflow-y-auto shrink-0 shadow-[-20px_0_40px_rgba(0,0,0,0.02)] z-50"
          >
            <div className="p-4 bg-black text-white flex items-center justify-between sticky top-0 z-10">
              <span className="text-[10px] font-black uppercase tracking-widest italic">New Appointment</span>
              <X size={14} className="cursor-pointer hover:rotate-90 transition-transform" onClick={() => setIsSidebarOpen(false)} />
            </div>

            <div className="p-5 space-y-6">
              {/* Section: When & Where */}
              <div className="space-y-4">
                <h4 className="text-[9px] font-black uppercase tracking-[0.2em] text-black/30 border-b border-black/5 pb-1">When & Where</h4>
                
                <div className="space-y-3">
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

function CalendarInput({ label, value, icon }: { label: string, value: string, icon: any }) {
  return (
    <div className="flex items-center justify-between px-3 py-2.5 bg-black/5 rounded-lg border border-transparent hover:border-black/10 hover:bg-black/[0.07] transition-all cursor-pointer group active:scale-[0.98]">
      <div className="flex flex-col">
        <span className="text-[7px] font-black text-black/20 uppercase tracking-widest group-hover:text-black/40 transition-colors">{label}</span>
        <span className="text-[10px] font-black uppercase tracking-widest">{value}</span>
      </div>
      <div className="text-black/40 group-hover:text-black transition-colors">
        {icon}
      </div>
    </div>
  );
}

function OverviewSection() {
  return (
    <div className="space-y-16">
      <div className="flex justify-between items-end">
        <div className="space-y-2">
          <h1 className="text-7xl font-black tracking-tighter uppercase italic leading-none">Intelligence</h1>
          <p className="text-black/30 text-xs font-bold uppercase tracking-[0.3em] italic">Full spectrum analytical data mapping for current cycle</p>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-10">
        <div className="h-64 bg-black/5 rounded-[3rem] p-10 flex flex-col justify-between">
          <div className="text-[10px] font-black uppercase tracking-[0.3em] text-black/30">Temporal Load</div>
        </div>
      </div>
    </div>
  );
}
