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
  X, RefreshCw, Star
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
          {activeTab === "ui" && <ClinicSetupSection />}
          {activeTab === "calendar" && <CalendarPage />}
          {activeTab === "audit" && <PatientListSection />}

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


function ClinicSetupSection() {
  const [activeSubTab, setActiveSubTab] = useState("identity");
  const [selectedTemplate, setSelectedTemplate] = useState("clinic-sigma");
  const [clinicName, setClinicName] = useState("Kindred Wellness");
  const [clinicTagline, setClinicTagline] = useState("At Kindred Wellness the essence of our service is simply 'you'.");
  const [clinicBanner, setClinicBanner] = useState<string | null>(null);
  const [clinicPhoto, setClinicPhoto] = useState<string | null>(null);
  const [contact, setContact] = useState({ phone: "+1 234 567 8900", email: "care@kindred.com" });
  const [hours, setHours] = useState({ open: "08:00", close: "20:00" });
  
  const [doctors, setDoctors] = useState([
    { id: 1, name: "Dr. Alexander Wright", room: "Suite A", specialty: "General Physician", quote: "Education and treatment is my mission.", status: "Present", delay: 0, photo: null as string | null },
    { id: 2, name: "Dr. Sarah Jenkins", room: "Diagnostic 1", specialty: "Dermatologist", quote: "Healing the skin, restoring confidence.", status: "Late", delay: 15, photo: null as string | null },
    { id: 3, name: "Dr. Michael Chen", room: "Room 4", specialty: "Psychologist", quote: "Healing the clients from the inside out.", status: "Present", delay: 0, photo: null as string | null }
  ]);

  const [services, setServices] = useState([
    { id: 1, name: "General Consultation", photo: null as string | null },
    { id: 2, name: "Dermatology Scan", photo: null as string | null },
    { id: 3, name: "Physiotherapy", photo: null as string | null }
  ]);

  const [news, setNews] = useState([
    { id: 1, title: "New MRI Wing Opening", desc: "A groundbreaking development that's set to transform the landscape of healthcare...", date: "June 2026", photo: null as string | null },
    { id: 2, title: "Holiday Schedule Update", desc: "The clinic will be adjusting its hours for the upcoming holiday season...", date: "May 2026", photo: null as string | null }
  ]);

  const [reviews, setReviews] = useState([
    { id: 1, text: "Clean and prompt attention. Ambiance is great. Easy location.", author: "Sarah M.", rating: 5 },
    { id: 2, text: "I received outstanding service from the medical team. They were calm, caring, and professional.", author: "James K.", rating: 5 },
    { id: 3, text: "Dr. Wright is the absolute best doctor I have ever had.", author: "Emily R.", rating: 5 }
  ]);

  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [isDeploying, setIsDeploying] = useState(false);

  const handleFileUpload = (callback: (url: string) => void) => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = (e: any) => {
      const file = e.target.files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => callback(reader.result as string);
        reader.readAsDataURL(file);
      }
    };
    input.click();
  };

  useEffect(() => {
    const saved = localStorage.getItem("flexslot_clinic_config");
    if (saved) {
      try {
        const c = JSON.parse(saved);
        if (c.selectedTemplate) setSelectedTemplate(c.selectedTemplate);
        if (c.clinicName) setClinicName(c.clinicName);
        if (c.clinicTagline) setClinicTagline(c.clinicTagline);
        if (c.clinicBanner) setClinicBanner(c.clinicBanner);
        if (c.clinicPhoto) setClinicPhoto(c.clinicPhoto);
        if (c.contact) setContact(c.contact);
        if (c.hours) setHours(c.hours);
        if (c.doctors) setDoctors(c.doctors);
        if (c.services) setServices(c.services);
        if (c.news) setNews(c.news);
        if (c.reviews) setReviews(c.reviews);
      } catch {}
    }
  }, []);

  const handleDeploy = () => {
    setIsDeploying(true);
    const config = {
      selectedTemplate, clinicName, clinicTagline, clinicBanner, clinicPhoto, contact, hours, doctors, services, news, reviews
    };
    localStorage.setItem("flexslot_clinic_config", JSON.stringify(config));
    setTimeout(() => { setIsDeploying(false); }, 1500);
  };

  const tpl: Record<string, { heroBg: string; heroText: string; bodyBg: string; bodyText: string; accent: string; accentText: string; cardBg: string; cardBorder: string; navBg: string; navText: string; sectionBg: string; muted: string }> = {
    "clinic-sigma": { heroBg: "#000", heroText: "#fff", bodyBg: "#ffffff", bodyText: "#111", accent: "#000", accentText: "#fff", cardBg: "#fafafa", cardBorder: "#eee", navBg: "#000", navText: "#fff", sectionBg: "#f5f5f5", muted: "#888" },
    "clinic-clean": { heroBg: "#f5f0eb", heroText: "#2d2a26", bodyBg: "#faf8f5", bodyText: "#2d2a26", accent: "#c4a882", accentText: "#fff", cardBg: "#fff", cardBorder: "#e8e0d6", navBg: "#2d2a26", navText: "#f5f0eb", sectionBg: "#f0ebe4", muted: "#9b8e7e" },
    "clinic-medical": { heroBg: "#0f2d52", heroText: "#fff", bodyBg: "#ffffff", bodyText: "#1a1a1a", accent: "#2196F3", accentText: "#fff", cardBg: "#f8fbff", cardBorder: "#d6e8f7", navBg: "#0f2d52", navText: "#fff", sectionBg: "#eef5fc", muted: "#6b8db5" }
  };

  const templates = [
    { id: "clinic-sigma", name: "Sigma Engine", theme: "Brutalist", desc: "Monochrome precision for high-performance clinics.", colors: ["#000", "#fff", "#333"] },
    { id: "clinic-clean", name: "Pure Minimal", theme: "Scandi", desc: "Airy, light-focused design for patient comfort.", colors: ["#f5f0eb", "#2d2a26", "#c4a882"] },
    { id: "clinic-medical", name: "Classic Health", theme: "Trust", desc: "Traditional blue-tones for professional trust.", colors: ["#0f2d52", "#2196F3", "#fff"] }
  ];
  const ct = tpl[selectedTemplate] || tpl["clinic-sigma"];



  return (
    <div className="space-y-10 max-w-7xl animate-in fade-in slide-in-from-bottom-4 duration-1000 relative">
      <AnimatePresence>
        {isDeploying && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[2000] bg-white/80 backdrop-blur-md flex items-center justify-center"
          >
            <div className="flex flex-col items-center gap-4">
               <RefreshCw className="w-12 h-12 text-black animate-spin" />
               <span className="text-[12px] font-black uppercase tracking-[0.5em]">Synchronizing Registry...</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex justify-between items-end">
        <div className="space-y-2">
          <h2 className="text-7xl font-black tracking-tighter uppercase italic leading-none">Architect</h2>
          <p className="text-black/30 text-xs font-bold uppercase tracking-[0.4em] italic">Engineering the clinical interface & patient experience</p>
        </div>
        <div className="flex gap-4">
          <button 
            onClick={() => setIsPreviewOpen(true)}
            className="px-8 py-4 bg-white border border-black text-black rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-black hover:text-white transition-all flex items-center gap-2"
          >
            <ExternalLink size={14} /> Live Preview
          </button>
          <button 
            onClick={handleDeploy}
            className="px-8 py-4 bg-black text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-2xl shadow-black/20 hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
          >
            <Zap size={14} fill="currentColor" /> Deploy Identity
          </button>
        </div>
      </div>

      {/* Sub-Navigation */}
      <div className="flex gap-8 border-b border-black/5 pb-4">
        {["identity", "staff_services", "engagement", "schedule"].map(tab => (
          <button 
            key={tab}
            onClick={() => setActiveSubTab(tab)}
            className={`text-[10px] font-black uppercase tracking-[0.3em] transition-all ${activeSubTab === tab ? 'text-black border-b-2 border-black pb-4 -mb-[18px]' : 'text-black/20 hover:text-black/40'}`}
          >
            {tab.replace('_', ' & ')}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-12 gap-10">
        <div className="col-span-8 space-y-8">
          
          {activeSubTab === "identity" && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
              {/* Template & Branding */}
              <section className="bg-white border border-black/5 rounded-[2.5rem] p-10 shadow-sm space-y-8">
                <h3 className="text-xs font-black uppercase tracking-widest flex items-center gap-2">
                  <Layout size={16} /> Global Blueprint
                </h3>
                <div className="grid grid-cols-3 gap-6">
                  {templates.map(t => (
                    <button 
                      key={t.id}
                      onClick={() => setSelectedTemplate(t.id)}
                      className={`group relative text-left p-6 rounded-[2rem] border-2 transition-all ${selectedTemplate === t.id ? 'border-black bg-black text-white shadow-2xl scale-[1.02]' : 'border-black/5 hover:border-black/20'}`}
                    >
                      <div className="flex gap-1 mb-4">
                        {t.colors.map((c, i) => <div key={i} className="w-5 h-5 rounded-full border border-black/10" style={{ backgroundColor: c }} />)}
                      </div>
                      <h4 className="text-xl font-black italic uppercase tracking-tighter mb-2">{t.name}</h4>
                      <p className={`text-[9px] font-bold uppercase leading-relaxed ${selectedTemplate === t.id ? 'text-white/60' : 'text-black/30'}`}>{t.desc}</p>
                      {selectedTemplate === t.id && <CheckCircle2 className="absolute top-6 right-6 w-5 h-5 text-white" />}
                    </button>
                  ))}
                </div>
              </section>

              {/* Clinic Media */}
              <section className="bg-white border border-black/5 rounded-[2.5rem] p-10 shadow-sm space-y-8">
                <h3 className="text-xs font-black uppercase tracking-widest flex items-center gap-2">
                  <Sparkles size={16} /> Clinic Media
                </h3>
                <div className="grid grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label className="text-[9px] font-black uppercase tracking-widest text-black/30">Background Banner</label>
                    <div 
                      onClick={() => handleFileUpload((url) => setClinicBanner(url))}
                      className="h-40 rounded-[1.5rem] border-2 border-dashed border-black/10 flex flex-col items-center justify-center gap-2 cursor-pointer hover:bg-black/5 transition-all group overflow-hidden relative"
                    >
                      {clinicBanner ? (
                        <img src={clinicBanner} alt="banner" className="absolute inset-0 w-full h-full object-cover" />
                      ) : (
                        <>
                          <Layout className="w-6 h-6 text-black/20 group-hover:scale-110 transition-transform" />
                          <span className="text-[8px] font-black uppercase tracking-widest text-black/20">Click to Upload Banner</span>
                        </>
                      )}
                    </div>
                  </div>
                  <div className="space-y-3">
                 <div className="pt-4 border-t border-black/5 space-y-4">
                <div className="space-y-2">
                  <label className="text-[9px] font-black uppercase tracking-widest text-black/30">Clinic Label</label>
                  <input type="text" value={clinicName} onChange={(e) => setClinicName(e.target.value)} className="w-full bg-black/5 border-none rounded-xl px-4 py-3 text-xs font-bold focus:ring-1 ring-black/10 outline-none" />
                </div>
                <div className="space-y-2">
                  <label className="text-[9px] font-black uppercase tracking-widest text-black/30">Welcome Tagline</label>
                  <textarea value={clinicTagline} onChange={(e) => setClinicTagline(e.target.value)} className="w-full bg-black/5 border-none rounded-xl px-4 py-3 text-xs font-bold focus:ring-1 ring-black/10 outline-none resize-none h-16" />
                </div>
              </div>     <div 
                      onClick={() => handleFileUpload((url) => setClinicPhoto(url))}
                      className="w-32 h-32 rounded-full border-2 border-dashed border-black/10 flex items-center justify-center cursor-pointer hover:bg-black/5 transition-all group overflow-hidden relative"
                    >
                      {clinicPhoto ? (
                        <img src={clinicPhoto} alt="profile" className="absolute inset-0 w-full h-full object-cover" />
                      ) : (
                        <User className="w-8 h-8 text-black/20 group-hover:scale-110 transition-transform" />
                      )}
                    </div>
                  </div>
                </div>
              </section>

              {/* Business Info */}
              <section className="bg-white border border-black/5 rounded-[2.5rem] p-10 shadow-sm grid grid-cols-2 gap-10">
                <div className="space-y-6">
                  <h3 className="text-xs font-black uppercase tracking-widest flex items-center gap-2">
                    <Phone size={16} /> Contact Relay
                  </h3>
                  <div className="space-y-4">
                    <div className="space-y-1">
                      <label className="text-[8px] font-black uppercase tracking-widest text-black/30 block ml-1">Phone Line</label>
                      <input type="text" value={contact.phone} onChange={(e) => setContact({...contact, phone: e.target.value})} className="w-full bg-black/5 border-none rounded-xl px-4 py-3 text-xs font-bold outline-none" />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[8px] font-black uppercase tracking-widest text-black/30 block ml-1">Email Terminal</label>
                      <input type="text" value={contact.email} onChange={(e) => setContact({...contact, email: e.target.value})} className="w-full bg-black/5 border-none rounded-xl px-4 py-3 text-xs font-bold outline-none" />
                    </div>
                  </div>
                </div>
                <div className="space-y-6">
                  <h3 className="text-xs font-black uppercase tracking-widest flex items-center gap-2">
                    <Clock size={16} /> Operational Cycle
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[8px] font-black uppercase tracking-widest text-black/30 block ml-1">Open</label>
                      <input type="time" value={hours.open} onChange={(e) => setHours({...hours, open: e.target.value})} className="w-full bg-black/5 border-none rounded-xl px-4 py-3 text-xs font-bold outline-none" />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[8px] font-black uppercase tracking-widest text-black/30 block ml-1">Close</label>
                      <input type="time" value={hours.close} onChange={(e) => setHours({...hours, close: e.target.value})} className="w-full bg-black/5 border-none rounded-xl px-4 py-3 text-xs font-bold outline-none" />
                    </div>
                  </div>
                </div>
              </section>
            </motion.div>
          )}

          {activeSubTab === "staff_services" && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
              {/* Doctor Status Management */}
              <section className="bg-white border border-black/5 rounded-[2.5rem] p-10 shadow-sm space-y-8">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-black uppercase tracking-widest flex items-center gap-2">
                    <Stethoscope size={16} /> Practitioner Flow
                  </h3>
                  <button onClick={() => setDoctors([...doctors, { id: Date.now(), name: "New Doctor", room: "TBD", specialty: "General Physician", quote: "Dedicated to patient care.", status: "Present", delay: 0, photo: null }])} className="p-2 bg-black text-white rounded-full"><Plus size={16} /></button>
                </div>
                <div className="space-y-4">
                  {doctors.map(doc => (
                    <div key={doc.id} className="flex gap-6 p-6 bg-black/[0.02] rounded-[2rem] items-start border border-black/5 hover:bg-black/5 transition-all">
                      <div 
                        onClick={() => handleFileUpload((url) => setDoctors(doctors.map(d => d.id === doc.id ? {...d, photo: url} : d)))}
                        className="w-20 h-20 rounded-2xl bg-black/5 border border-black/10 flex items-center justify-center cursor-pointer hover:bg-black/10 transition-all shrink-0 overflow-hidden"
                      >
                        {doc.photo ? <img src={doc.photo} alt="" className="w-full h-full object-cover" /> : <User size={24} className="text-black/20" />}
                      </div>
                      <div className="flex-1 space-y-3">
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="text-[7px] font-black uppercase tracking-widest text-black/20 block">Name</label>
                            <input type="text" value={doc.name} onChange={(e) => setDoctors(doctors.map(d => d.id === doc.id ? {...d, name: e.target.value} : d))} className="bg-transparent border-none text-sm font-black uppercase italic tracking-tighter w-full outline-none" />
                          </div>
                          <div>
                            <label className="text-[7px] font-black uppercase tracking-widest text-black/20 block">Specialty</label>
                            <input type="text" value={doc.specialty || ""} onChange={(e) => setDoctors(doctors.map(d => d.id === doc.id ? {...d, specialty: e.target.value} : d))} className="bg-transparent border-none text-[10px] font-bold uppercase tracking-widest w-full outline-none text-black/50" />
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="text-[7px] font-black uppercase tracking-widest text-black/20 block">Room</label>
                            <input type="text" value={doc.room} onChange={(e) => setDoctors(doctors.map(d => d.id === doc.id ? {...d, room: e.target.value} : d))} className="bg-transparent border-none text-[9px] font-bold text-black/30 uppercase tracking-widest w-full outline-none" />
                          </div>
                          <div>
                            <label className="text-[7px] font-black uppercase tracking-widest text-black/20 block">Quote</label>
                            <input type="text" value={doc.quote || ""} onChange={(e) => setDoctors(doctors.map(d => d.id === doc.id ? {...d, quote: e.target.value} : d))} className="bg-transparent border-none text-[9px] font-bold italic text-black/30 w-full outline-none" />
                          </div>
                        </div>
                        <div className="flex items-center gap-4 pt-1">
                          <div className="flex gap-1.5">
                            {["Present", "Late", "Away"].map(s => (
                              <button 
                                key={s} 
                                onClick={() => setDoctors(doctors.map(d => d.id === doc.id ? {...d, status: s} : d))}
                                className={`px-2.5 py-1 text-[7px] font-black uppercase tracking-widest rounded-md transition-all ${doc.status === s ? (s === 'Present' ? 'bg-emerald-600 text-white' : s === 'Late' ? 'bg-amber-500 text-white' : 'bg-gray-400 text-white') : 'text-black/20 hover:text-black bg-black/5'}`}
                              >
                                {s}
                              </button>
                            ))}
                          </div>
                          <div className="flex items-center gap-2 ml-auto">
                            <span className="text-[7px] font-black uppercase text-black/20">Delay:</span>
                            <input type="number" value={doc.delay} onChange={(e) => setDoctors(doctors.map(d => d.id === doc.id ? {...d, delay: parseInt(e.target.value) || 0} : d))} className="w-12 bg-white border border-black/10 rounded px-1.5 py-0.5 text-[9px] font-black outline-none text-center" />
                            <span className="text-[7px] font-black uppercase text-black/20">min</span>
                            <button onClick={() => setDoctors(doctors.filter(d => d.id !== doc.id))} className="text-black/10 hover:text-red-500 transition-colors ml-2"><Trash2 size={14} /></button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Services */}
              <section className="bg-white border border-black/5 rounded-[2.5rem] p-10 shadow-sm space-y-8">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-black uppercase tracking-widest flex items-center gap-2">
                    <Activity size={16} /> Services Protocol
                  </h3>
                  <button onClick={() => setServices([...services, { id: Date.now(), name: "New Service", photo: null }])} className="p-2 bg-black text-white rounded-full"><Plus size={16} /></button>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {services.map(s => (
                    <div key={s.id} className="p-5 bg-black/[0.02] rounded-[2rem] border border-black/5 flex items-center gap-4 group hover:bg-black/5 transition-all">
                      <div 
                        onClick={() => handleFileUpload((url) => setServices(services.map(x => x.id === s.id ? {...x, photo: url} : x)))}
                        className="w-12 h-12 rounded-xl bg-black/5 border border-black/10 flex items-center justify-center cursor-pointer shrink-0 overflow-hidden"
                      >
                        {s.photo ? <img src={s.photo} alt="" className="w-full h-full object-cover" /> : <Activity size={16} className="text-black/20" />}
                      </div>
                      <input type="text" value={s.name} onChange={(e) => setServices(services.map(x => x.id === s.id ? {...x, name: e.target.value} : x))} className="bg-transparent border-none text-xs font-black uppercase tracking-widest flex-1 outline-none" />
                      <button onClick={() => setServices(services.filter(x => x.id !== s.id))} className="opacity-0 group-hover:opacity-100 text-black/10 hover:text-red-500"><X size={14} /></button>
                    </div>
                  ))}
                </div>
              </section>
            </motion.div>
          )}

          {activeSubTab === "engagement" && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
              <section className="bg-white border border-black/5 rounded-[2.5rem] p-10 shadow-sm space-y-8">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-black uppercase tracking-widest flex items-center gap-2"><Sparkles size={16} /> News & Broadcasts</h3>
                  <button onClick={() => setNews([...news, { id: Date.now(), title: "New Announcement", desc: "Enter a brief description...", date: new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" }), photo: null }])} className="p-2 bg-black text-white rounded-full"><Plus size={16} /></button>
                </div>
                <div className="space-y-4">
                  {news.map(n => (
                    <div key={n.id} className="flex gap-6 p-6 bg-black/[0.02] rounded-[2rem] border border-black/5 items-center group hover:bg-black/5 transition-all">
                      <div 
                        onClick={() => handleFileUpload((url) => setNews(news.map(x => x.id === n.id ? {...x, photo: url} : x)))}
                        className="w-20 h-20 rounded-2xl bg-black/5 border border-black/10 flex items-center justify-center cursor-pointer hover:bg-black/10 transition-all shrink-0 overflow-hidden"
                      >
                        {n.photo ? <img src={n.photo} alt="" className="w-full h-full object-cover" /> : <FileText size={20} className="text-black/20" />}
                      </div>
                      <div className="flex-1 space-y-1">
                        <input type="text" value={n.title} onChange={(e) => setNews(news.map(x => x.id === n.id ? {...x, title: e.target.value} : x))} className="bg-transparent border-none text-sm font-black uppercase italic tracking-tighter w-full outline-none" />
                        <textarea value={n.desc || ""} onChange={(e) => setNews(news.map(x => x.id === n.id ? {...x, desc: e.target.value} : x))} className="bg-transparent border-none text-[9px] font-bold text-black/40 w-full outline-none resize-none h-8" placeholder="Description..." />
                        <input type="text" value={n.date} onChange={(e) => setNews(news.map(x => x.id === n.id ? {...x, date: e.target.value} : x))} className="bg-transparent border-none text-[8px] font-bold text-black/20 uppercase tracking-widest w-full outline-none" />
                      </div>
                      <button onClick={() => setNews(news.filter(x => x.id !== n.id))} className="opacity-0 group-hover:opacity-100 text-black/10 hover:text-red-500"><Trash2 size={16} /></button>
                    </div>
                  ))}
                </div>
              </section>

              <section className="bg-white border border-black/5 rounded-[2.5rem] p-10 shadow-sm space-y-8">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-black uppercase tracking-widest flex items-center gap-2"><TrendingUp size={16} /> Patient Reviews</h3>
                  <button onClick={() => setReviews([...reviews, { id: Date.now(), text: "New review text here...", author: "Patient", rating: 5 }])} className="p-2 bg-black text-white rounded-full"><Plus size={16} /></button>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {reviews.map(r => (
                    <div key={r.id} className="p-6 bg-black/[0.02] rounded-[2rem] border border-black/5 space-y-3 group hover:bg-black/5 transition-all">
                      <div className="flex gap-0.5 mb-1">
                        {[1,2,3,4,5].map(s => (
                          <button key={s} onClick={() => setReviews(reviews.map(x => x.id === r.id ? {...x, rating: s} : x))}>
                            <Star size={14} fill={s <= (r.rating || 5) ? '#facc15' : 'none'} className={s <= (r.rating || 5) ? 'text-yellow-400' : 'text-black/10'} />
                          </button>
                        ))}
                      </div>
                      <textarea value={r.text} onChange={(e) => setReviews(reviews.map(x => x.id === r.id ? {...x, text: e.target.value} : x))} className="bg-transparent border-none text-[10px] font-bold italic text-black/60 w-full resize-none outline-none h-16" />
                      <div className="flex justify-between items-center">
                        <input type="text" value={r.author} onChange={(e) => setReviews(reviews.map(x => x.id === r.id ? {...x, author: e.target.value} : x))} className="bg-transparent border-none text-[8px] font-black uppercase tracking-widest text-black/30 outline-none" />
                        <button onClick={() => setReviews(reviews.filter(x => x.id !== r.id))} className="opacity-0 group-hover:opacity-100 text-black/10 hover:text-red-500"><Trash2 size={14} /></button>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </motion.div>
          )}
        </div>

        {/* Sidebar Controls */}
        <div className="col-span-4 space-y-8">
          <section className="bg-white border border-black/5 rounded-[2.5rem] p-10 shadow-sm space-y-8">
            <h3 className="text-xs font-black uppercase tracking-widest flex items-center gap-2"><Activity size={16} /> Portal Health</h3>
            <div className="space-y-6">
               <div className="flex justify-between items-center">
                  <span className="text-[9px] font-black uppercase text-black/30">Doctor On-Call</span>
                  <span className="text-[10px] font-black">{doctors.filter(d => d.status === 'Present').length} Units</span>
               </div>
               <div className="flex justify-between items-center">
                  <span className="text-[9px] font-black uppercase text-black/30">Service Latency</span>
                  <span className="text-[10px] font-black text-red-500">+{doctors.reduce((acc, curr) => acc + curr.delay, 0)} min</span>
               </div>
               <div className="h-px bg-black/5" />
               <div className="space-y-2">
                 <label className="text-[9px] font-black uppercase text-black/30">Clinic Identifier</label>
                 <input type="text" value={clinicName} onChange={(e) => setClinicName(e.target.value)} className="w-full bg-black/5 border-none rounded-xl px-4 py-3 text-xs font-bold outline-none" />
               </div>
            </div>
          </section>

          <div className="bg-black text-white rounded-[2.5rem] p-10 space-y-6 shadow-2xl relative overflow-hidden group">
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

      {/* Patient Portal Preview Modal */}
      <AnimatePresence>
        {isPreviewOpen && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[1000] flex flex-col"
            style={{ background: ct.bodyBg }}
          >
            {/* Top Admin Bar */}
            <div className="h-12 flex items-center justify-between px-8 bg-black/90 text-white shrink-0">
              <div className="flex items-center gap-3">
                 <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                 <span className="text-[9px] font-bold uppercase tracking-[0.3em] opacity-60">Preview Mode — {templates.find(t => t.id === selectedTemplate)?.name} Template</span>
              </div>
              <button onClick={() => setIsPreviewOpen(false)} className="px-4 py-1.5 bg-white/10 hover:bg-white/20 rounded-lg text-[9px] font-bold uppercase tracking-widest transition-all">Close Preview</button>
            </div>

            <div className="flex-1 overflow-y-auto">
              {/* ─── NAVIGATION BAR ─── */}
              <nav style={{ background: ct.navBg, color: ct.navText }} className="px-12 py-4 flex items-center justify-between sticky top-0 z-50">
                <div className="flex items-center gap-4">
                  {clinicPhoto && <img src={clinicPhoto} alt="" className="w-10 h-10 rounded-full object-cover border-2 border-white/20" />}
                  <span className="text-lg font-bold tracking-tight">{clinicName}</span>
                </div>
                <div className="flex items-center gap-8 text-[11px] font-medium tracking-wide">
                  {[
                    { label: "Home", target: "portal-hero" },
                    { label: "About", target: "portal-hero" },
                    { label: "Services", target: "portal-services" },
                    { label: "Doctors", target: "portal-doctors" },
                    { label: "Contact", target: "portal-contact" },
                  ].map(link => (
                    <span key={link.label} onClick={() => document.getElementById(link.target)?.scrollIntoView({ behavior: "smooth", block: "start" })} className="opacity-60 hover:opacity-100 cursor-pointer transition-opacity">{link.label}</span>
                  ))}
                  <button onClick={() => document.getElementById("portal-booking")?.scrollIntoView({ behavior: "smooth", block: "start" })} style={{ background: ct.accent, color: ct.accentText }} className="px-5 py-2 rounded-lg text-[10px] font-bold uppercase tracking-wider">Book Now</button>
                </div>
              </nav>

              {/* HERO SECTION */}
              <section id="portal-hero" style={{ background: ct.heroBg }} className="relative min-h-[480px] flex items-center overflow-hidden">
                {clinicBanner && <img src={clinicBanner} alt="" className="absolute inset-0 w-full h-full object-cover" />}
                <div className="absolute inset-0" style={{ background: `linear-gradient(135deg, ${ct.heroBg}ee 0%, ${ct.heroBg}88 50%, transparent 100%)` }} />
                <div className="relative z-10 px-16 max-w-2xl space-y-6">
                  <h1 style={{ color: ct.heroText }} className="text-5xl font-bold leading-tight tracking-tight">
                    Welcome to {clinicName}
                  </h1>
                  <p style={{ color: ct.heroText }} className="text-base opacity-60 leading-relaxed">
                    {clinicTagline}
                  </p>
                  <button style={{ border: `2px solid ${ct.heroText}`, color: ct.heroText }} className="px-8 py-3 rounded-lg text-sm font-semibold uppercase tracking-wider hover:opacity-80 transition-opacity bg-transparent">
                    Read More
                  </button>
                </div>
              </section>

              {/* ─── QUICK INFO BAR ─── */}
              <div id="portal-contact" style={{ background: ct.accent, color: ct.accentText }} className="grid grid-cols-3 divide-x divide-white/10">
                <div className="p-6 flex items-center gap-4 justify-center">
                  <Phone size={18} className="opacity-60" />
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-wider opacity-60">Phone</p>
                    <p className="text-sm font-semibold">{contact.phone}</p>
                  </div>
                </div>
                <div className="p-6 flex items-center gap-4 justify-center">
                  <Clock size={18} className="opacity-60" />
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-wider opacity-60">Hours</p>
                    <p className="text-sm font-semibold">{hours.open} — {hours.close}</p>
                  </div>
                </div>
                <div className="p-6 flex items-center gap-4 justify-center">
                  <Mail size={18} className="opacity-60" />
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-wider opacity-60">Email</p>
                    <p className="text-sm font-semibold">{contact.email}</p>
                  </div>
                </div>
              </div>

              {/* ─── DELAY WARNING ─── */}
              {doctors.some(d => d.status === 'Late') && (
                <div className="mx-16 mt-8 bg-amber-50 border border-amber-200 p-5 rounded-xl flex items-center gap-4">
                   <AlertCircle className="text-amber-600 shrink-0" size={18} />
                   <p className="text-sm text-amber-800">Schedule notice: Current average delay is <strong>+{doctors.reduce((a,c)=>a+c.delay,0)} minutes</strong>. Appointment times may shift slightly.</p>
                </div>
              )}

              {/* ─── DOCTORS SECTION (VIDA STYLE) ─── */}
              <section id="portal-doctors" className="px-16 py-16" style={{ background: ct.sectionBg }}>
                <div className="mb-10">
                  <h2 className="text-3xl font-bold tracking-tight" style={{ color: ct.bodyText }}>Our Doctors and Medical Professionals</h2>
                  <p className="text-sm mt-1" style={{ color: ct.muted }}>Our Specialists</p>
                </div>
                <div className="grid grid-cols-4 gap-6">
                  {doctors.map(d => (
                    <div key={d.id} className="rounded-2xl overflow-hidden shadow-lg transition-all hover:shadow-xl hover:-translate-y-1" style={{ background: ct.cardBg, borderColor: ct.cardBorder, borderWidth: 1 }}>
                      <div className="aspect-[3/4] relative overflow-hidden" style={{ background: ct.sectionBg }}>
                        {d.photo ? (
                          <img src={d.photo} alt="" className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <User size={48} style={{ color: ct.muted }} className="opacity-30" />
                          </div>
                        )}
                      </div>
                      <div className="p-5 space-y-2">
                        <p className="text-[11px] font-semibold uppercase tracking-wider" style={{ color: d.status === 'Late' ? '#d97706' : ct.accent }}>{d.specialty || "General"}</p>
                        <div className="flex items-center justify-between">
                          <h4 className="text-base font-bold" style={{ color: ct.bodyText }}>{d.name}</h4>
                          <ChevronRight size={16} style={{ color: ct.accent }} />
                        </div>
                        <p className="text-xs italic leading-relaxed" style={{ color: ct.muted }}>"{d.quote || "Dedicated to patient care."}"</p>
                        {d.status === 'Late' && d.delay > 0 && (
                          <p className="text-[10px] font-bold text-amber-600 mt-1">⏱ Running {d.delay} min late</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* ─── SERVICES SECTION ─── */}
              <section id="portal-services" className="px-16 py-16" style={{ background: ct.bodyBg }}>
                <h2 className="text-3xl font-bold tracking-tight mb-2" style={{ color: ct.bodyText }}>Our Services</h2>
                <p className="text-sm mb-10" style={{ color: ct.muted }}>Comprehensive healthcare solutions for you and your family</p>
                <div className="grid grid-cols-3 gap-6">
                  {services.map(s => (
                    <div key={s.id} className="rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-all hover:-translate-y-0.5 cursor-pointer" style={{ background: ct.cardBg, border: `1px solid ${ct.cardBorder}` }}>
                      <div className="h-40 overflow-hidden" style={{ background: ct.sectionBg }}>
                        {s.photo ? <img src={s.photo} alt="" className="w-full h-full object-cover" /> : (
                          <div className="w-full h-full flex items-center justify-center"><Activity size={32} style={{ color: ct.muted }} className="opacity-20" /></div>
                        )}
                      </div>
                      <div className="p-5 flex items-center justify-between">
                        <span className="text-sm font-semibold" style={{ color: ct.bodyText }}>{s.name}</span>
                        <ChevronRight size={16} style={{ color: ct.accent }} />
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* ─── REVIEWS (GOOGLE STYLE) ─── */}
              {reviews.length > 0 && (
                <section className="px-16 py-16" style={{ background: ct.sectionBg }}>
                  <h2 className="text-3xl font-bold tracking-tight mb-10" style={{ color: ct.bodyText }}>Patient Reviews</h2>
                  <div className="grid grid-cols-3 gap-6">
                    {reviews.map(r => (
                      <div key={r.id} className="rounded-2xl p-6 space-y-4 shadow-sm hover:shadow-md transition-shadow" style={{ background: ct.cardBg, border: `1px solid ${ct.cardBorder}` }}>
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm" style={{ background: ct.accent }}>
                            {r.author[0]}
                          </div>
                          <div>
                            <p className="text-sm font-bold" style={{ color: ct.bodyText }}>{r.author}</p>
                            <p className="text-[10px]" style={{ color: ct.muted }}>Verified Patient</p>
                          </div>
                        </div>
                        <div className="flex gap-0.5">
                          {Array.from({ length: r.rating || 5 }).map((_, i) => (
                            <Star key={i} size={14} fill="#facc15" className="text-yellow-400" />
                          ))}
                        </div>
                        <p className="text-sm leading-relaxed" style={{ color: ct.bodyText }}>{r.text}</p>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* ─── NEWS & UPDATES (VIDA STYLE) ─── */}
              {news.length > 0 && (
                <section className="px-16 py-16" style={{ background: ct.bodyBg }}>
                  <h2 className="text-3xl font-bold tracking-tight mb-2" style={{ color: ct.bodyText }}>News & Updates</h2>
                  <p className="text-sm mb-10" style={{ color: ct.muted }}>List of our featured resources</p>
                  <div className="grid grid-cols-4 gap-6">
                    {news.map(n => (
                      <div key={n.id} className="group cursor-pointer">
                        <div className="aspect-video rounded-xl overflow-hidden mb-4 shadow-sm" style={{ background: ct.sectionBg }}>
                          {n.photo ? <img src={n.photo} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" /> : (
                            <div className="w-full h-full flex items-center justify-center"><FileText size={24} style={{ color: ct.muted }} className="opacity-20" /></div>
                          )}
                        </div>
                        <h4 className="text-sm font-bold leading-snug mb-2 group-hover:underline" style={{ color: ct.accent }}>{n.title}</h4>
                        <p className="text-xs leading-relaxed mb-2" style={{ color: ct.muted }}>{n.desc || ""}</p>
                        <span className="text-[11px] font-semibold flex items-center gap-1" style={{ color: ct.bodyText }}>read more <ChevronRight size={12} /></span>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* ─── CTA / BOOKING ─── */}
              <section id="portal-booking" className="px-16 py-20 text-center" style={{ background: ct.heroBg }}>
                <h2 className="text-4xl font-bold mb-4" style={{ color: ct.heroText }}>Book Your Appointment</h2>
                <p className="text-base mb-8 opacity-60" style={{ color: ct.heroText }}>Schedule your visit online in seconds. We're ready to care for you.</p>
                <button className="px-10 py-4 rounded-xl text-sm font-bold uppercase tracking-wider shadow-2xl hover:scale-105 active:scale-95 transition-all" style={{ background: ct.accentText === '#fff' ? '#fff' : ct.accent, color: ct.accentText === '#fff' ? ct.accent : ct.accentText }}>
                  Request Instant Slot
                </button>
              </section>

              {/* ─── FOOTER ─── */}
              <footer style={{ background: ct.navBg, color: ct.navText }} className="px-16 py-10">
                <div className="flex justify-between items-start">
                  <div className="space-y-2">
                    <h3 className="text-lg font-bold">{clinicName}</h3>
                    <p className="text-xs opacity-40">{contact.email} · {contact.phone}</p>
                    <p className="text-xs opacity-40">Open {hours.open} — {hours.close}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] uppercase tracking-widest opacity-30">Powered by</p>
                    <p className="text-sm font-bold mt-1">FlexSlot</p>
                  </div>
                </div>
              </footer>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function PatientListSection() {
  const patients = [
    { id: "P-001", name: "Alexander Wright", email: "a.wright@clinic.com", phone: "+1 234 567 8901", status: "Active", lastVisit: "2 hours ago" },
    { id: "P-002", name: "Sarah Jenkins", email: "s.jenkins@clinic.com", phone: "+1 234 567 8902", status: "Active", lastVisit: "Yesterday" },
    { id: "P-003", name: "Michael Chen", email: "m.chen@clinic.com", phone: "+1 234 567 8903", status: "On-Hold", lastVisit: "3 days ago" },
    { id: "P-004", name: "Emily Rodriguez", email: "e.rod@clinic.com", phone: "+1 234 567 8904", status: "Active", lastVisit: "1 week ago" }
  ];

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex justify-between items-end">
        <div className="space-y-2">
          <h2 className="text-6xl font-black tracking-tighter uppercase italic leading-none">Registry</h2>
          <p className="text-black/30 text-xs font-bold uppercase tracking-[0.4em] italic">Manage your historical patient database and signals</p>
        </div>
        <div className="flex gap-4">
           <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-black/20" size={16} />
              <input type="text" placeholder="Search Patients..." className="pl-12 pr-6 py-4 bg-black/5 rounded-2xl text-[10px] font-black uppercase tracking-widest outline-none w-64 focus:bg-black/10 transition-all" />
           </div>
           <button className="p-4 bg-black text-white rounded-2xl shadow-lg hover:scale-105 transition-all"><Download size={20} /></button>
        </div>
      </div>

      <div className="bg-white border border-black/5 rounded-[3rem] overflow-hidden shadow-sm">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-black/5">
              <th className="px-8 py-6 text-[9px] font-black uppercase tracking-widest text-black/30">ID</th>
              <th className="px-8 py-6 text-[9px] font-black uppercase tracking-widest text-black/30">Patient Identity</th>
              <th className="px-8 py-6 text-[9px] font-black uppercase tracking-widest text-black/30">Status</th>
              <th className="px-8 py-6 text-[9px] font-black uppercase tracking-widest text-black/30">Last Activity</th>
              <th className="px-8 py-6 text-[9px] font-black uppercase tracking-widest text-black/30 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-black/5">
            {patients.map(p => (
              <tr key={p.id} className="hover:bg-black/[0.01] transition-colors group">
                <td className="px-8 py-6 text-[10px] font-black text-black/20 group-hover:text-black transition-colors">{p.id}</td>
                <td className="px-8 py-6">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-black/5 rounded-xl flex items-center justify-center font-black italic text-black/20 group-hover:bg-black group-hover:text-white transition-all">{p.name[0]}</div>
                    <div>
                      <div className="text-sm font-black uppercase italic tracking-tighter">{p.name}</div>
                      <div className="text-[9px] font-bold text-black/30 uppercase tracking-widest">{p.email}</div>
                    </div>
                  </div>
                </td>
                <td className="px-8 py-6">
                  <div className="flex items-center gap-2">
                    <div className={`w-1.5 h-1.5 rounded-full ${p.status === 'Active' ? 'bg-emerald-500' : 'bg-black/20'}`} />
                    <span className="text-[10px] font-black uppercase tracking-widest text-black/40">{p.status}</span>
                  </div>
                </td>
                <td className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-black/20 italic">{p.lastVisit}</td>
                <td className="px-8 py-6 text-right">
                  <button className="p-2 text-black/10 hover:text-black transition-colors"><MoreHorizontal size={16} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

