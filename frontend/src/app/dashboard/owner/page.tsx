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
  const [clinicName, setClinicName] = useState("Kindred Wellness");
  const [dateRange, setDateRange] = useState("May 1 - May 31, 2026");
  const [isApplying, setIsApplying] = useState(false);
  
  const [bookings, setBookings] = useState<any[]>([]);
  const [doneCount, setDoneCount] = useState(0);
  const [notesCount, setNotesCount] = useState(0);

  useEffect(() => {
    const savedBookings = localStorage.getItem("flexslot_bookings");
    const savedDone = localStorage.getItem("flexslot_done_count");
    const savedNotes = localStorage.getItem("flexslot_notes");

      const dummy = [
        { id: '1', clientName: 'Alexander Wright', serviceName: 'General Consultation', slotTime: '10:30 AM' },
        { id: '2', clientName: 'Sarah Jenkins', serviceName: 'Diagnostic Scan', slotTime: '11:15 AM' },
        { id: '3', clientName: 'Michael Chen', serviceName: 'Orthopedic Follow-up', slotTime: '12:00 PM' },
        { id: '4', clientName: 'Emily Rodriguez', serviceName: 'Pediatric Checkup', slotTime: '01:30 PM' },
        { id: '5', clientName: 'David Thompson', serviceName: 'Cardiology Screening', slotTime: '02:45 PM' },
        { id: '6', clientName: 'Jessica Lee', serviceName: 'Physical Therapy', slotTime: '03:30 PM' },
        { id: '7', clientName: 'Robert Garcia', serviceName: 'Dental Cleaning', slotTime: '04:15 PM' },
        { id: '8', clientName: 'Sophie Bennett', serviceName: 'Dermatology Review', slotTime: '05:00 PM' }
      ];

    if (savedDone) setDoneCount(parseInt(savedDone));
    if (savedNotes) setNotesCount(parseInt(savedNotes));
    
    if (savedBookings && JSON.parse(savedBookings).length > 0) {
      setBookings(JSON.parse(savedBookings).reverse());
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

      <aside className="w-64 bg-white border-r border-black/5 flex flex-col h-screen sticky top-0 z-20">
        <div className="h-20 flex items-center px-8">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 bg-black rounded-full flex items-center justify-center group-hover:scale-105 transition-transform shadow-lg shadow-black/20">
              <CalendarClock className="w-5 h-5 text-white" />
            </div>
            <span className="font-black tracking-tighter text-xl uppercase">Kindred</span>
          </Link>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-1">
          <SideNavItem icon={<LayoutDashboard size={18} />} label="Dashboard" active={activeTab === "dashboard"} onClick={() => setActiveTab("dashboard")} />
          <SideNavItem icon={<BarChart3 size={18} />} label="Analytics" active={activeTab === "overview"} onClick={() => setActiveTab("overview")} />
          <div className="h-px bg-black/5 my-4 mx-2" />
          <SideNavItem icon={<Layout size={18} />} label="Clinic Setup" active={activeTab === "ui"} onClick={() => setActiveTab("ui")} />
          <SideNavItem icon={<Calendar size={18} />} label="Schedules" active={activeTab === "slots"} onClick={() => setActiveTab("slots")} />
          <SideNavItem icon={<Users size={18} />} label="Patient List" active={activeTab === "audit"} onClick={() => setActiveTab("audit")} />
        </nav>

        <div className="p-6 border-t border-black/5">
           <button className="flex items-center gap-3 px-3 py-2 text-black/40 hover:text-black transition-colors font-bold text-xs uppercase tracking-widest w-full">
             <Settings size={14} /> System Registry
           </button>
        </div>
      </aside>

      <main className="flex-1 flex flex-col overflow-y-auto">
        <header className="h-20 bg-white border-b border-black/5 px-8 flex items-center justify-between sticky top-0 z-10 backdrop-blur-md">
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
          {activeTab === "slots" && <div className="p-20 text-center italic text-black/20 font-black uppercase tracking-[0.5em]">Scheduling Engine Loaded</div>}
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
        <div className="bg-white border border-black/5 rounded-[2.5rem] p-10 shadow-sm">
          <div className="flex justify-between items-center mb-10">
            <div className="flex items-center gap-3">
              <Calendar className="w-5 h-5" />
              <h3 className="text-sm font-black uppercase tracking-widest">Appointments</h3>
            </div>
            <button className="text-[10px] font-black uppercase tracking-widest text-black/30 hover:text-black transition-colors underline underline-offset-4 decoration-black/10">Appointment Report</button>
          </div>
          
          <div className="grid grid-cols-3 gap-6">
            <MetricBox label="Total Attended" value={doneCount.toString()} trend={`${Math.round((doneCount/(doneCount+bookings.length || 1))*100)}%`} up={true} />
            <MetricBox label="Total Pending" value={bookings.length.toString()} trend="Live" up={false} />
            <div className="bg-black/5 rounded-[2rem] p-8 flex flex-col items-center justify-center text-center">
               <h4 className="text-[10px] font-black uppercase tracking-widest text-black/30 mb-4">Clinical Notes</h4>
               <div className="relative w-24 h-24 mb-4">
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
                  <div className="absolute inset-0 flex items-center justify-center font-black text-xl italic">{notesCount}</div>
               </div>
               <p className="text-[10px] font-bold text-black/30 uppercase tracking-widest">Total Notes: {notesCount}</p>
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
                className="bg-black text-white rounded-[3rem] p-12 text-white shadow-[0_32px_64px_rgba(0,0,0,0.15)] relative overflow-hidden group"
              >
                <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-10">
                  <div className="flex items-center gap-10">
                    <div className="w-20 h-20 bg-white/10 rounded-2xl flex items-center justify-center backdrop-blur-xl border border-white/10">
                      <Activity className="w-8 h-8 text-white animate-pulse" />
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-3">
                        <span className="text-[10px] font-black uppercase tracking-widest px-2 py-1 bg-white text-black rounded-lg">Ongoing</span>
                        <span className="text-white/30 text-[10px] font-black uppercase tracking-widest">Room_01</span>
                      </div>
                      <h2 className="text-5xl font-black tracking-tighter uppercase italic">{ongoing.clientName}</h2>
                      <p className="text-white/40 text-xs font-bold uppercase tracking-widest italic">{ongoing.serviceName} · Consultation In_Progress</p>
                    </div>
                  </div>
                  <button 
                    onClick={onComplete}
                    className="px-12 py-6 bg-white text-black rounded-full font-black text-xs uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-2xl shadow-white/10"
                  >
                    Complete Session
                  </button>
                </div>
                <Sparkles className="absolute -bottom-6 -right-6 w-32 h-32 text-white/5 rotate-12" />
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
                             <p className="text-[10px] font-bold text-black/30 uppercase tracking-widest italic">{u.serviceName}</p>
                          </div>
                       </div>
                       <div className="flex items-center gap-2">
                          <button className="p-4 text-black/20 hover:text-black hover:bg-white rounded-2xl transition-all shadow-none hover:shadow-sm"><Phone size={16} /></button>
                          <button className="p-4 text-black/20 hover:text-black hover:bg-white rounded-2xl transition-all shadow-none hover:shadow-sm"><MailIcon size={16} /></button>
                       </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
                {upcoming.length === 0 && (
                  <div className="p-10 text-center text-black/10 font-black uppercase tracking-widest text-[10px] italic">No further signals in current cycle.</div>
                )}
             </div>
          </div>
        </div>
      </div>

      {/* Right Column - Status Analytics & New Clients */}
      <div className="col-span-4 space-y-8">
        <div className="bg-white border border-black/5 rounded-[2.5rem] p-10 shadow-sm relative overflow-hidden">
           <div className="flex justify-between items-center mb-8 relative z-10">
              <div className="flex items-center gap-3">
                <BarChart3 className="w-5 h-5" />
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

        <div className="bg-white border border-black/5 rounded-[2.5rem] p-10 shadow-sm">
           <div className="flex justify-between items-center mb-10">
              <div className="flex items-center gap-3">
                <Users className="w-5 h-5" />
                <h3 className="text-sm font-black uppercase tracking-widest">New Clients</h3>
              </div>
              <button className="text-[10px] font-black uppercase tracking-widest text-black/30 hover:text-black">More Detail</button>
           </div>
           <div className="bg-black/5 rounded-[2rem] p-10 text-center space-y-2 group hover:bg-black hover:text-white transition-all cursor-pointer">
              <div className="text-[10px] font-black text-black/20 group-hover:text-white/30 uppercase tracking-widest">Total Acquisitions</div>
              <div className="text-5xl font-black italic">2</div>
              <div className="flex items-center justify-center gap-1 text-[10px] font-black">
                 <ArrowUpRight size={12} />
                 100% vs Previous
              </div>
           </div>
           <button className="w-full mt-10 text-left text-[10px] font-black uppercase tracking-widest text-black/30 hover:text-black underline underline-offset-4 decoration-black/10 transition-colors">New Client Report</button>
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

function MetricBox({ label, value, trend, up }: { label: string, value: string, trend: string, up: boolean }) {
  return (
    <div className="bg-black/5 rounded-[2rem] p-10 text-center space-y-4 shadow-inner group hover:bg-black hover:text-white transition-all cursor-default">
       <h4 className="text-[10px] font-black uppercase tracking-widest text-black/30 group-hover:text-white/30">{label}</h4>
       <div className="text-6xl font-black italic">{value}</div>
       <div className="flex items-center justify-center gap-1 text-[10px] font-black uppercase tracking-widest">
          {up ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
          {trend} <span className="text-black/30 group-hover:text-white/30 font-bold ml-1">Volume</span>
       </div>
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
