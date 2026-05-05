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
  const [activeTab, setActiveTab] = useState("dashboard"); // Feed is now default "dashboard"
  const [clinicName, setClinicName] = useState("Kindred Wellness");
  const [activeTemplate, setActiveTemplate] = useState("clinic-clean");
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    const savedName = localStorage.getItem("flexslot_active_clinic_name") || "Kindred Wellness";
    const savedTemplate = localStorage.getItem("flexslot_active_template") || "clinic-clean";
    setClinicName(savedName);
    setActiveTemplate(savedTemplate);
  }, []);

  const handleTemplateSelect = (t: string) => {
    setIsUpdating(true);
    setActiveTemplate(t);
    localStorage.setItem("flexslot_active_template", t);
    setTimeout(() => setIsUpdating(false), 1200);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 font-sans flex overflow-hidden">
      {/* Sidebar - Modern & Minimal */}
      <aside className="w-64 bg-white border-r border-slate-200/60 flex flex-col h-screen sticky top-0 z-20 shadow-[4px_0_24px_rgba(0,0,0,0.02)]">
        <div className="h-20 flex items-center px-8">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 bg-slate-900 rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform">
              <CalendarClock className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold tracking-tight text-lg">Kindred</span>
          </Link>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-1.5">
          <SideNavItem icon={<LayoutDashboard size={18} />} label="Dashboard" active={activeTab === "dashboard"} onClick={() => setActiveTab("dashboard")} />
          <SideNavItem icon={<BarChart3 size={18} />} label="Insights" active={activeTab === "overview"} onClick={() => setActiveTab("overview")} />
          <div className="h-px bg-slate-100 my-4 mx-2" />
          <SideNavItem icon={<Layout size={18} />} label="Branding" active={activeTab === "ui"} onClick={() => setActiveTab("ui")} />
          <SideNavItem icon={<Calendar size={18} />} label="Scheduling" active={activeTab === "slots"} onClick={() => setActiveTab("slots")} />
          <SideNavItem icon={<Users size={18} />} label="Patients" active={activeTab === "audit"} onClick={() => setActiveTab("audit")} />
        </nav>

        <div className="p-6 border-t border-slate-100">
           <button className="flex items-center gap-3 px-3 py-2 text-slate-400 hover:text-slate-900 transition-colors font-semibold text-sm w-full">
             <Settings size={16} /> Preferences
           </button>
        </div>
      </aside>

      <main className="flex-1 flex flex-col overflow-y-auto">
        <header className="h-20 bg-white/80 backdrop-blur-md border-b border-slate-200/60 px-10 flex items-center justify-between sticky top-0 z-10">
           <div className="flex items-center gap-4">
              <h2 className="text-sm font-bold text-slate-500 uppercase tracking-widest">{activeTab === 'dashboard' ? 'Daily Feed' : activeTab}</h2>
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
           </div>
           <div className="flex items-center gap-4">
              <button className="p-2.5 hover:bg-slate-50 rounded-full transition-colors relative">
                <Bell size={20} className="text-slate-500" />
                <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full border-2 border-white" />
              </button>
              <div className="w-8 h-8 rounded-full bg-slate-900 flex items-center justify-center text-white text-xs font-bold shadow-sm">DR</div>
           </div>
        </header>

        <div className="p-10 max-w-6xl mx-auto w-full space-y-12">
          {activeTab === "dashboard" && <ModernFeedSection />}
          {activeTab === "overview" && <OverviewSection />}
          {activeTab === "ui" && (
            <div className="space-y-10">
              <SectionHeader title="Visual Identity" desc="Refine your practice's digital presence with high-fidelity themes." />
              <div className="grid grid-cols-3 gap-6">
                <ThemeCard name="Pristine" desc="Clinical Minimalism" active={activeTemplate === 'clinic-clean'} onClick={() => handleTemplateSelect('clinic-clean')} />
                <ThemeCard name="Kindred" desc="Warm Veterinary" active={activeTemplate === 'vet-warm'} onClick={() => handleTemplateSelect('vet-warm')} />
                <ThemeCard name="Cyber" desc="Advanced Diagnostic" active={activeTemplate === 'pulse-modern'} onClick={() => handleTemplateSelect('pulse-modern')} />
              </div>
            </div>
          )}
          {activeTab === "slots" && <SlotManagerSection />}
          {activeTab === "audit" && <AuditLogsSection />}
        </div>
      </main>
    </div>
  );
}

function SectionHeader({ title, desc }: { title: string, desc: string }) {
  return (
    <div className="space-y-1">
      <h3 className="text-3xl font-bold tracking-tight text-slate-900">{title}</h3>
      <p className="text-slate-400 text-sm font-medium">{desc}</p>
    </div>
  );
}

function SideNavItem({ icon, label, active, onClick }: { icon: any, label: string, active?: boolean, onClick: () => void }) {
  return (
    <button 
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all relative group ${active 
        ? 'bg-slate-900 text-white shadow-lg shadow-slate-200' 
        : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
      }`}
    >
      {icon}
      {label}
    </button>
  );
}

function ModernFeedSection() {
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
        { id: '5', clientName: 'David Thompson', serviceName: 'Cardiology Screening', slotTime: '02:45 PM' },
        { id: '6', clientName: 'Jessica Lee', serviceName: 'Physical Therapy', slotTime: '03:30 PM' },
        { id: '7', clientName: 'Robert Garcia', serviceName: 'Dental Cleaning', slotTime: '04:15 PM' },
        { id: '8', clientName: 'Sophie Bennett', serviceName: 'Dermatology Review', slotTime: '05:00 PM' }
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
    <div className="space-y-10">
      {/* Sleek Metrics Bar */}
      <div className="grid grid-cols-3 gap-6">
        <MetricCard label="Total Shift Goal" value={total} sub="Total appointments" icon={<Plus className="text-indigo-500" size={20} />} />
        <MetricCard label="Completed" value={doneCount} sub={`${Math.round((doneCount/total)*100 || 0)}% of shift`} icon={<CheckCircle2 className="text-emerald-500" size={20} />} />
        <MetricCard label="Pending" value={bookings.length} sub="Patients remaining" icon={<Timer className="text-amber-500" size={20} />} />
      </div>

      {/* Ongoing - High Contrast & Simple */}
      <AnimatePresence mode="wait">
        {ongoing ? (
          <motion.div 
            key={ongoing.id}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, x: 20 }}
            className="bg-slate-900 rounded-[2rem] p-10 text-white shadow-2xl shadow-slate-200 relative overflow-hidden group"
          >
            <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-10">
              <div className="flex items-center gap-8">
                <div className="w-20 h-20 bg-white/10 rounded-2xl flex items-center justify-center backdrop-blur-xl border border-white/10">
                  <Activity className="w-8 h-8 text-white animate-pulse" />
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="px-2.5 py-0.5 bg-emerald-500 text-[10px] font-bold uppercase tracking-wider rounded-full">Active Now</span>
                    <span className="text-white/40 text-xs font-medium italic">Consultation room 1</span>
                  </div>
                  <h2 className="text-5xl font-bold tracking-tight">{ongoing.clientName}</h2>
                  <p className="text-white/60 text-sm mt-1 font-medium italic">{ongoing.serviceName} · Started 12m ago</p>
                </div>
              </div>
              <button 
                onClick={handleComplete}
                className="px-10 py-5 bg-white text-slate-900 rounded-2xl font-bold hover:scale-[1.02] active:scale-95 transition-all shadow-xl shadow-white/10"
              >
                Complete Session
              </button>
            </div>
            <Sparkles className="absolute -bottom-6 -right-6 w-32 h-32 text-white/5 rotate-12" />
          </motion.div>
        ) : (
          <div className="p-12 border-2 border-dashed border-slate-100 rounded-[2rem] text-center text-slate-300 italic">
             No active consultation in the current shift.
          </div>
        )}
      </AnimatePresence>

      {/* Feed Area - Structured & Clear */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
           <h3 className="text-xl font-bold tracking-tight text-slate-800">Upcoming Stream</h3>
           <div className="flex items-center gap-3">
              <div className="relative">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input type="text" placeholder="Filter..." className="pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-slate-900 transition-all w-48 shadow-sm" />
              </div>
              <button className="p-2 bg-white border border-slate-200 rounded-xl text-slate-500 hover:bg-slate-50 transition-colors shadow-sm"><Filter size={18} /></button>
           </div>
        </div>

        <div className="bg-white border border-slate-200/60 rounded-[2.5rem] p-2 shadow-sm">
           <div className="space-y-1">
             <AnimatePresence mode="popLayout">
               {bookings.map((b, i) => (
                 <motion.div 
                    key={b.id} 
                    layout
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className={`flex items-center justify-between p-6 rounded-[2rem] transition-all hover:bg-slate-50 group ${i === 0 ? 'bg-slate-50/50' : ''}`}
                 >
                    <div className="flex items-center gap-6">
                       <div className="w-14 h-14 bg-white border border-slate-200 rounded-2xl flex flex-col items-center justify-center shadow-sm group-hover:scale-105 transition-transform">
                          <span className="text-sm font-bold text-slate-900">{b.slotTime.split(' ')[0]}</span>
                          <span className="text-[10px] font-black text-slate-400 uppercase">{b.slotTime.split(' ')[1]}</span>
                       </div>
                       <div>
                          <h4 className="text-lg font-bold text-slate-900">{b.clientName}</h4>
                          <div className="flex items-center gap-2 mt-0.5">
                             <div className="w-1.5 h-1.5 rounded-full bg-slate-300" />
                             <span className="text-xs text-slate-500 font-medium italic">{b.serviceName}</span>
                          </div>
                       </div>
                    </div>
                    <div className="flex items-center gap-2">
                       <button className="p-3 text-slate-400 hover:text-slate-900 hover:bg-white rounded-xl transition-all shadow-none hover:shadow-sm"><Phone size={18} /></button>
                       <button className="p-3 text-slate-400 hover:text-slate-900 hover:bg-white rounded-xl transition-all shadow-none hover:shadow-sm"><MailIcon size={18} /></button>
                       <button className="p-3 text-slate-400 hover:text-slate-900 hover:bg-white rounded-xl transition-all shadow-none hover:shadow-sm"><MoreHorizontal size={18} /></button>
                    </div>
                 </motion.div>
               ))}
             </AnimatePresence>
             {bookings.length === 0 && (
               <div className="p-20 text-center space-y-4">
                  <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto">
                    <ZapOff className="text-slate-300" />
                  </div>
                  <p className="text-slate-400 font-medium italic">The stream is currently silent.</p>
               </div>
             )}
           </div>
        </div>
      </div>
    </div>
  );
}

function MetricCard({ label, value, sub, icon }: any) {
  return (
    <div className="bg-white border border-slate-200/60 p-8 rounded-[2.5rem] shadow-sm hover:shadow-xl hover:translate-y-[-4px] transition-all group">
      <div className="flex items-center justify-between mb-4">
        <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">{label}</span>
        <div className="p-2.5 bg-slate-50 rounded-xl group-hover:bg-slate-900 group-hover:text-white transition-colors">
          {icon}
        </div>
      </div>
      <div className="flex items-baseline gap-2">
        <span className="text-4xl font-bold tracking-tight text-slate-900">{value}</span>
        <span className="text-xs font-medium text-slate-400 italic">{sub}</span>
      </div>
    </div>
  );
}

function ThemeCard({ name, desc, active, onClick }: any) {
  return (
    <button onClick={onClick} className={`p-8 rounded-[2.5rem] border text-left transition-all relative group h-full ${active ? 'bg-slate-900 text-white border-slate-900 shadow-2xl' : 'bg-white border-slate-200 text-slate-900 hover:border-slate-400'}`}>
      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-6 ${active ? 'bg-white/10' : 'bg-slate-50'}`}>
        <PaletteIcon className={active ? 'text-white' : 'text-slate-400'} size={24} />
      </div>
      <h4 className="text-xl font-bold mb-1">{name}</h4>
      <p className={`text-xs font-medium italic ${active ? 'text-white/60' : 'text-slate-400'}`}>{desc}</p>
      {active && <div className="absolute top-6 right-6 w-2 h-2 bg-emerald-400 rounded-full shadow-[0_0_12px_rgba(52,211,153,0.5)]" />}
    </button>
  );
}

// Sub-components for other tabs to prevent errors
function OverviewSection() { return <div className="p-20 text-center italic text-slate-400">Advanced Analytics Module Loading...</div>; }
function SlotManagerSection() { return <div className="p-20 text-center italic text-slate-400">Slot Configuration Engine Offline</div>; }
function AuditLogsSection() { return <div className="p-20 text-center italic text-slate-400">Patient Data Protection Active</div>; }
function PaletteIcon({ className, size }: any) { return <div className={className}><Layers size={size} /></div>; }
