"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  BarChart3, Users, Calendar, Settings, Bot, Search, Bell, 
  TrendingUp, Layers, ShieldCheck, CheckCircle2, FileText, 
  Plus, ExternalLink, Scissors, Code, Stethoscope, Briefcase,
  Layout, Database, Zap, Cpu, Lock, Globe, Mail, Clock, ChevronRight, CalendarClock, Trash2, LayoutDashboard,
  Palette, Sparkles, User, AlertCircle, Phone, Mail as MailIcon, CalendarDays, Activity, Timer, ZapOff,
  CircleDot, ChevronDown, Filter, MoreHorizontal
} from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";

export default function OwnerDashboard() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [clinicName, setClinicName] = useState("Kindred Wellness");
  const [activeTemplate, setActiveTemplate] = useState("monochrome"); // Strict black/white
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    const savedName = localStorage.getItem("flexslot_active_clinic_name") || "Kindred Wellness";
    setClinicName(savedName);
  }, []);

  return (
    <div className="min-h-screen bg-white text-black font-sans flex overflow-hidden">
      {/* Sidebar - Strict Monochrome Minimalist */}
      <aside className="w-64 bg-white border-r border-black/5 flex flex-col h-screen sticky top-0 z-20">
        <div className="h-20 flex items-center px-8">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 bg-black rounded-full flex items-center justify-center group-hover:scale-105 transition-transform">
              <CalendarClock className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold tracking-tighter text-xl uppercase">Kindred</span>
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
        <header className="h-20 bg-white/80 backdrop-blur-md border-b border-black/5 px-10 flex items-center justify-between sticky top-0 z-10">
           <div className="flex items-center gap-4">
              <h2 className="text-[10px] font-black text-black/30 uppercase tracking-[0.3em]">{activeTab === 'dashboard' ? 'Real-time Feed' : activeTab}</h2>
              <div className="w-1.5 h-1.5 rounded-full bg-black animate-pulse" />
           </div>
           <div className="flex items-center gap-6">
              <button className="p-2 hover:bg-black/5 rounded-full transition-colors relative">
                <Bell size={18} className="text-black" />
                <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-black rounded-full border-2 border-white" />
              </button>
              <div className="flex items-center gap-3 pl-6 border-l border-black/5">
                 <div className="text-right">
                    <div className="text-[10px] font-black uppercase tracking-widest leading-none">Admin Portal</div>
                    <div className="text-xs font-bold text-black/40 italic">Dr. Anderson</div>
                 </div>
                 <div className="w-10 h-10 rounded-full bg-black flex items-center justify-center text-white text-xs font-black shadow-xl">BA</div>
              </div>
           </div>
        </header>

        <div className="p-12 max-w-6xl mx-auto w-full space-y-16">
          {activeTab === "dashboard" && <MonochromeFeedSection />}
          {activeTab === "overview" && <OverviewSection />}
          {activeTab === "ui" && <div className="p-20 text-center italic text-black/20 font-black uppercase tracking-[0.5em]">Identity Module Active</div>}
          {activeTab === "slots" && <div className="p-20 text-center italic text-black/20 font-black uppercase tracking-[0.5em]">Scheduling Engine Loaded</div>}
          {activeTab === "audit" && <div className="p-20 text-center italic text-black/20 font-black uppercase tracking-[0.5em]">Patient Data Secure</div>}
        </div>
      </main>
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
      {active && <motion.div layoutId="nav-dot" className="absolute right-4 w-1 h-1 bg-white rounded-full" />}
    </button>
  );
}

function MonochromeFeedSection() {
  const [bookings, setBookings] = useState<any[]>([]);
  const [doneCount, setDoneCount] = useState(0);

  useEffect(() => {
    const saved = localStorage.getItem("flexslot_bookings");
    const savedDone = localStorage.getItem("flexslot_done_count");
    if (savedDone) setDoneCount(parseInt(savedDone));
    
    if (saved) {
      setBookings(JSON.parse(saved).reverse());
    } else {
      const dummy = [
        { id: '1', clientName: 'Alexander Wright', serviceName: 'General Consultation', slotTime: '10:30 AM' },
        { id: '2', clientName: 'Sarah Jenkins', serviceName: 'Diagnostic Scan', slotTime: '11:15 AM' },
        { id: '3', clientName: 'Michael Chen', serviceName: 'Orthopedic Follow-up', slotTime: '12:00 PM' },
        { id: '4', clientName: 'Emily Rodriguez', serviceName: 'Pediatric Checkup', slotTime: '01:30 PM' },
        { id: '5', clientName: 'David Thompson', serviceName: 'Cardiology Screening', slotTime: '02:45 PM' }
      ];
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
    setDoneCount(nextDone);
    localStorage.setItem("flexslot_bookings", JSON.stringify([...next].reverse()));
    localStorage.setItem("flexslot_done_count", nextDone.toString());
  };

  const total = bookings.length + doneCount;
  const ongoing = bookings[0];

  return (
    <div className="space-y-16">
      {/* Metrics - High Contrast Monochrome */}
      <div className="grid grid-cols-3 gap-8">
        <MetricCard label="Total Capacity" value={total} sub="Full Shift Goal" icon={<Plus size={18} />} />
        <MetricCard label="Sessions Logged" value={doneCount} sub="Successfully closed" icon={<CheckCircle2 size={18} />} />
        <MetricCard label="Remaining Stream" value={bookings.length} sub="Active patient signals" icon={<Timer size={18} />} />
      </div>

      {/* Ongoing - Bold Black & White Action Card */}
      <AnimatePresence mode="wait">
        {ongoing ? (
          <motion.div 
            key={ongoing.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="bg-black rounded-[3rem] p-12 text-white shadow-[0_32px_64px_rgba(0,0,0,0.15)] relative overflow-hidden"
          >
            <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-12">
              <div className="flex items-center gap-10">
                <div className="w-24 h-24 bg-white/5 rounded-[2rem] flex items-center justify-center backdrop-blur-3xl border border-white/10 shadow-inner">
                  <Activity className="w-10 h-10 text-white" />
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] px-2 py-1 bg-white text-black rounded-lg">Ongoing</span>
                    <span className="text-white/30 text-[10px] font-black uppercase tracking-widest">Signal_Live</span>
                  </div>
                  <h2 className="text-6xl font-black tracking-tighter uppercase italic leading-tight">{ongoing.clientName}</h2>
                  <p className="text-white/40 text-xs font-bold uppercase tracking-[0.2em] italic">{ongoing.serviceName} · Consultation In_Progress</p>
                </div>
              </div>
              <button 
                onClick={handleComplete}
                className="px-12 py-6 bg-white text-black rounded-full font-black text-xs uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-2xl shadow-white/10"
              >
                Complete Session
              </button>
            </div>
          </motion.div>
        ) : (
          <div className="p-20 border border-dashed border-black/10 rounded-[3rem] text-center text-black/20 font-black uppercase tracking-[0.5em] italic">
             No incoming clinical stream detected.
          </div>
        )}
      </AnimatePresence>

      {/* Feed - Strict Minimalist List */}
      <div className="space-y-10">
        <div className="flex items-center justify-between border-b border-black/5 pb-10">
           <div className="space-y-1">
              <h3 className="text-2xl font-black tracking-tighter uppercase italic">Upcoming Stream</h3>
              <p className="text-black/30 text-[10px] font-bold uppercase tracking-[0.2em] italic">Validated patient records for current shift</p>
           </div>
           <div className="flex items-center gap-4">
              <div className="relative group">
                <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-black/20 group-focus-within:text-black transition-colors" />
                <input type="text" placeholder="FILTER SIGNALS..." className="pl-12 pr-6 py-4 bg-black/5 border-transparent rounded-2xl text-[10px] font-black uppercase tracking-widest focus:outline-none focus:bg-white focus:ring-2 focus:ring-black transition-all w-64 shadow-inner" />
              </div>
              <button className="p-4 bg-black/5 rounded-2xl text-black hover:bg-black hover:text-white transition-all shadow-inner"><Filter size={20} /></button>
           </div>
        </div>

        <div className="space-y-3">
           <AnimatePresence mode="popLayout">
             {bookings.map((b, i) => (
               <motion.div 
                  key={b.id} 
                  layout
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className={`flex items-center justify-between p-10 rounded-[2.5rem] transition-all border border-transparent hover:border-black/5 hover:bg-black/5 group ${i === 0 ? 'bg-black/[0.02] border-black/5' : ''}`}
               >
                  <div className="flex items-center gap-10">
                     <div className="w-16 h-16 bg-white border border-black/5 rounded-3xl flex flex-col items-center justify-center shadow-inner group-hover:scale-110 transition-transform">
                        <span className="text-sm font-black text-black leading-none">{b.slotTime.split(' ')[0]}</span>
                        <span className="text-[8px] font-black text-black/30 uppercase tracking-widest mt-1">{b.slotTime.split(' ')[1]}</span>
                     </div>
                     <div className="space-y-1">
                        <h4 className="text-2xl font-black tracking-tighter uppercase italic leading-none">{b.clientName}</h4>
                        <div className="flex items-center gap-3">
                           <span className="text-[10px] font-bold text-black/30 uppercase tracking-widest italic">{b.serviceName}</span>
                           <div className="w-1 h-1 rounded-full bg-black/10" />
                           <span className="text-[10px] font-bold text-black/30 uppercase tracking-widest italic">Signal_Pending</span>
                        </div>
                     </div>
                  </div>
                  <div className="flex items-center gap-3">
                     <button className="p-5 text-black/20 hover:text-black hover:bg-white rounded-2xl transition-all"><Phone size={18} /></button>
                     <button className="p-5 text-black/20 hover:text-black hover:bg-white rounded-2xl transition-all"><MailIcon size={18} /></button>
                     <button className="p-5 text-black/20 hover:text-black hover:bg-white rounded-2xl transition-all"><MoreHorizontal size={18} /></button>
                  </div>
               </motion.div>
             ))}
           </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

function MetricCard({ label, value, sub, icon }: any) {
  return (
    <div className="bg-white border border-black/5 p-10 rounded-[3rem] shadow-sm hover:shadow-2xl hover:translate-y-[-8px] transition-all group overflow-hidden relative">
      <div className="flex items-center justify-between mb-10">
        <span className="text-[10px] font-black text-black/20 uppercase tracking-[0.2em]">{label}</span>
        <div className="p-3 bg-black/5 rounded-2xl group-hover:bg-black group-hover:text-white transition-all">
          {icon}
        </div>
      </div>
      <div className="space-y-1">
        <span className="text-6xl font-black tracking-tighter text-black leading-none italic">{value}</span>
        <p className="text-[10px] font-bold text-black/30 uppercase tracking-widest italic">{sub}</p>
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
           <div className="flex items-end gap-2 h-20">
              {[30, 60, 45, 90, 70].map((h, i) => <div key={i} className="flex-1 bg-black rounded-t-lg" style={{ height: `${h}%` }} />)}
           </div>
        </div>
        <div className="h-64 bg-black rounded-[3rem] p-10 text-white flex flex-col justify-between shadow-2xl shadow-black/20">
           <div className="text-[10px] font-black uppercase tracking-[0.3em] text-white/30">System Status</div>
           <div className="text-4xl font-black uppercase italic leading-tight">All Vectors Normal</div>
           <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
              <span className="text-[10px] font-black uppercase tracking-widest">Optimized</span>
           </div>
        </div>
        <div className="h-64 bg-black/5 rounded-[3rem] p-10 flex flex-col justify-between">
           <div className="text-[10px] font-black uppercase tracking-[0.3em] text-black/30">Signal Strength</div>
           <Bot className="w-12 h-12 text-black/10" />
           <div className="text-2xl font-black italic uppercase">Validated</div>
        </div>
      </div>
    </div>
  ); 
}
