"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { 
  BarChart3, Users, Calendar, Settings, Bot, Search, Bell, 
  TrendingUp, Layers, ShieldCheck, CheckCircle2, FileText, 
  Plus, ExternalLink, Scissors, Code, Stethoscope, Briefcase,
  Layout, Database, Zap, Cpu, Lock, Globe, Mail, Clock, ChevronRight, CalendarClock, Trash2
} from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";

export default function OwnerDashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const [clinicName, setClinicName] = useState("Happy Paws Clinic"); // Default for demo

  useEffect(() => {
    const role = localStorage.getItem("flexslot_role");
    const savedName = localStorage.getItem("flexslot_active_clinic_name") || "Happy Paws Clinic";
    setClinicName(savedName);
  }, []);

  return (
    <div className="min-h-screen bg-[#FDFDFD] text-black font-sans flex overflow-hidden">
      {/* Sidebar Navigation */}
      <aside className="w-72 border-r border-gray-100 flex flex-col h-screen sticky top-0 bg-white z-20">
        <div className="h-20 flex items-center px-8 border-b border-gray-50">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-black flex items-center justify-center">
              <CalendarClock className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold tracking-tight text-lg text-black">Kindred <span className="text-gray-400 font-serif italic">Calendar</span></span>
          </Link>
        </div>

        <div className="flex-1 overflow-y-auto px-4 py-8 space-y-1">
          <SideNavItem icon={<BarChart3 />} label="Analytics" active={activeTab === "overview"} onClick={() => setActiveTab("overview")} />
          <SideNavItem icon={<Layout />} label="Clinic Themes" active={activeTab === "ui"} onClick={() => setActiveTab("ui")} />
          <SideNavItem icon={<Briefcase />} label="Treatments" active={activeTab === "services"} onClick={() => setActiveTab("services")} />
          <SideNavItem icon={<Calendar />} label="Clinic Schedule" active={activeTab === "slots"} onClick={() => setActiveTab("slots")} />
          <SideNavItem icon={<Users />} label="Patient Registry" active={activeTab === "audit"} onClick={() => setActiveTab("audit")} />
          
          <div className="pt-10 px-4">
             <div className="p-4 rounded-2xl bg-gray-50 border border-gray-100">
               <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3 italic">Clinic Partition</div>
               <div className="flex items-center gap-2 mb-2">
                 <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                 <span className="text-[10px] font-mono font-bold truncate text-black">UUID: 550e8400-e29b</span>
               </div>
               <p className="text-[9px] text-gray-400 italic">RLS Policy: ENFORCED</p>
             </div>
          </div>
        </div>

        <div className="p-6 border-t border-gray-50">
           <Link href="/dashboard/settings" className="w-full flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-black transition-colors font-bold text-sm">
             <Settings className="w-4 h-4" /> System Governance
           </Link>
        </div>
      </aside>

      <main className="flex-1 flex flex-col overflow-y-auto">
        <header className="h-20 bg-white/80 backdrop-blur-md border-b border-gray-100 flex items-center justify-between px-10 sticky top-0 z-10">
          <h2 className="text-xl font-serif text-black italic">Clinic HQ</h2>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-xl border border-gray-100">
              <Zap className="w-4 h-4 text-emerald-500 animate-pulse" />
              <span className="text-[10px] font-black uppercase tracking-widest text-black">Postgres RLS: ACTIVE</span>
            </div>
            <button className="p-2 rounded-xl hover:bg-gray-50 transition-colors relative">
               <Bell className="w-5 h-5 text-gray-400" />
               <span className="absolute top-2 right-2.5 w-2 h-2 bg-black rounded-full ring-2 ring-white" />
            </button>
            <div className="w-10 h-10 rounded-full bg-black flex items-center justify-center text-white font-bold text-sm shadow-xl">DR</div>
          </div>
        </header>

        <div className="p-10 max-w-7xl mx-auto w-full space-y-12">
          {activeTab === "overview" && <OverviewSection />}
          {activeTab === "ui" && <UIConfiguratorSection />}
          {activeTab === "services" && <ServiceCatalogSection />}
          {activeTab === "slots" && <SlotManagerSection />}
          {activeTab === "audit" && <AuditTrailSection />}
        </div>
      </main>
    </div>
  );
}

function SideNavItem({ icon, label, active, onClick }: { icon: React.ReactNode, label: string, active?: boolean, onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-4 py-4 rounded-2xl text-sm font-bold tracking-tight transition-all relative group ${active
          ? 'bg-black text-white shadow-xl shadow-black/10'
          : 'text-gray-400 hover:bg-gray-50 hover:text-black'
        }`}
    >
      {icon}
      {label}
      {active && <motion.div layoutId="nav-glow-owner" className="absolute right-3 w-1.5 h-1.5 bg-white rounded-full" />}
    </button>
  );
}

function MetricCard({ label, value, trend, icon }: { label: string, value: string, trend: string, icon: React.ReactNode }) {
  return (
    <div className="bg-white p-8 rounded-[2.5rem] border border-gray-50 shadow-sm group hover:scale-[1.02] transition-all">
      <div className="flex justify-between items-start mb-6">
        <div className="p-3 bg-gray-50 rounded-2xl group-hover:bg-black group-hover:text-white transition-colors">
          {icon}
        </div>
        <span className="text-[10px] font-black font-mono px-3 py-1.5 rounded-lg bg-black text-white">{trend}</span>
      </div>
      <div className="text-3xl font-serif font-black mb-1">{value}</div>
      <div className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-300">{label}</div>
    </div>
  );
}

function OverviewSection() {
  return (
    <div className="space-y-10">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <MetricCard label="Patient Visits" value="842" trend="+12%" icon={<Calendar />} />
        <MetricCard label="Pharmacy Rev" value="$8,240" trend="+5%" icon={<TrendingUp />} />
        <MetricCard label="Diagnostic Load" value="High" trend="AI_GEN" icon={<Bot />} />
      </div>
      <div className="bg-white rounded-[2.5rem] p-10 border border-gray-50 shadow-sm relative group overflow-hidden">
         <div className="flex items-center justify-between mb-8">
            <h3 className="font-bold text-lg">Patient Flow Index</h3>
            <div className="text-[10px] font-black text-gray-300 uppercase tracking-widest font-mono italic">Clinical Prediction Engine</div>
         </div>
         <div className="h-40 flex items-end gap-2 px-2 border-b border-gray-50 mb-4 pb-2">
            {[30, 45, 60, 40, 70, 90, 85, 50, 65, 80, 55, 75].map((h, i) => (
              <div key={i} className="flex-1 bg-gray-50 rounded-full relative overflow-hidden">
                <motion.div className="absolute bottom-0 w-full bg-black rounded-full" initial={{ height: 0 }} animate={{ height: `${h}%` }} transition={{ duration: 1.5, delay: i * 0.05 }} />
              </div>
            ))}
         </div>
      </div>
    </div>
  );
}

function UIConfiguratorSection() {
  const [schema, setSchema] = useState(JSON.stringify({
    "practice_type": "Specialist",
    "theme": "monochrome-pro",
    "patient_portal": "active"
  }, null, 2));
  return (
    <div className="space-y-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm p-10">
           <h3 className="font-bold text-xl mb-6">Visual Identity</h3>
           <div className="space-y-4">
              <div className="p-6 rounded-3xl bg-black text-white flex justify-between items-center group cursor-pointer hover:scale-105 transition-all">
                 <div>
                    <div className="font-bold">Monospace Pro</div>
                    <div className="text-[10px] opacity-40 uppercase tracking-widest font-black">Active Theme</div>
                 </div>
                 <CheckCircle2 className="w-5 h-5 text-emerald-500" />
              </div>
              <div className="p-6 rounded-3xl bg-gray-50 border border-gray-100 flex justify-between items-center group cursor-pointer hover:bg-white hover:border-black/10 transition-all">
                 <div className="font-bold text-gray-400">Emerald Medical</div>
                 <ChevronRight className="w-5 h-5 text-gray-200" />
              </div>
           </div>
        </div>
        <div className="bg-black text-white/40 rounded-[2.5rem] p-10 font-mono text-xs overflow-hidden h-[300px]">
           <textarea value={schema} onChange={(e) => setSchema(e.target.value)} className="w-full h-full bg-transparent outline-none focus:text-white transition-colors resize-none" />
        </div>
      </div>
    </div>
  );
}

function ServiceCatalogSection() {
  return (
    <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden">
       <table className="w-full text-left">
          <thead className="bg-gray-50/50 text-[10px] font-black uppercase text-gray-400 tracking-widest border-b border-gray-50">
             <tr>
                <th className="px-10 py-5">Treatment</th>
                <th className="px-10 py-5">Duration</th>
                <th className="px-10 py-5">Consultation Fee</th>
                <th className="px-10 py-5 text-right">Actions</th>
             </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
             <CatalogRow name="General Wellness Check" dur="45m" fee="$85" />
             <CatalogRow name="Specialist Consult" dur="30m" fee="$150" />
             <CatalogRow name="Clinical Follow-up" dur="15m" fee="$60" />
          </tbody>
       </table>
    </div>
  );
}

function CatalogRow({ name, dur, fee }: { name: string, dur: string, fee: string }) {
  return (
    <tr className="hover:bg-gray-50/20 transition-all group">
       <td className="px-10 py-6 font-bold">{name}</td>
       <td className="px-10 py-6 text-sm text-gray-400 italic">{dur}</td>
       <td className="px-10 py-6 text-sm font-black italic">{fee}</td>
       <td className="px-10 py-6 text-right">
          <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors"><FileText className="w-4 h-4 text-gray-300" /></button>
       </td>
    </tr>
  );
}

function SlotManagerSection() {
  const [slots, setSlots] = useState<{ id: string, time: string, date: string, available: boolean }[]>([]);
  const [newTime, setNewTime] = useState("09:00");
  const [newDate, setNewDate] = useState(new Date().toISOString().split('T')[0]);

  useEffect(() => {
    const saved = localStorage.getItem("flexslot_available_slots");
    if (saved) {
      setSlots(JSON.parse(saved));
    } else {
      // Seed some data
      const initial = [
        { id: 'S1', time: '09:00 AM', date: '2026-04-20', available: true },
        { id: 'S2', time: '10:30 AM', date: '2026-04-20', available: true },
        { id: 'S3', time: '02:15 PM', date: '2026-04-21', available: true },
      ];
      setSlots(initial);
      localStorage.setItem("flexslot_available_slots", JSON.stringify(initial));
    }
  }, []);

  const addSlot = () => {
    const newSlot = {
      id: `S${Date.now()}`,
      time: newTime,
      date: newDate,
      available: true
    };
    const next = [...slots, newSlot];
    setSlots(next);
    localStorage.setItem("flexslot_available_slots", JSON.stringify(next));
  };

  const removeSlot = (id: string) => {
    const next = slots.filter(s => s.id !== id);
    setSlots(next);
    localStorage.setItem("flexslot_available_slots", JSON.stringify(next));
  };

  return (
    <div className="space-y-8">
      <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 flex flex-wrap gap-4 items-end">
        <div>
          <label className="text-[10px] font-black uppercase text-gray-400 mb-2 block tracking-widest">Select Date</label>
          <input 
            type="date" 
            value={newDate} 
            onChange={(e) => setNewDate(e.target.value)}
            className="px-4 py-3 rounded-xl border border-gray-100 focus:outline-none focus:ring-2 focus:ring-black/5"
          />
        </div>
        <div>
          <label className="text-[10px] font-black uppercase text-gray-400 mb-2 block tracking-widest">Select Time</label>
          <input 
            type="time" 
            value={newTime} 
            onChange={(e) => setNewTime(e.target.value)}
            className="px-4 py-3 rounded-xl border border-gray-100 focus:outline-none focus:ring-2 focus:ring-black/5"
          />
        </div>
        <button 
          onClick={addSlot}
          className="bg-black text-white px-8 py-3.5 rounded-xl font-bold flex items-center gap-2 hover:bg-gray-800 transition-all"
        >
          <Plus className="w-4 h-4" /> Add Slot
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {slots.map((slot) => (
          <div key={slot.id} className="bg-white border border-gray-100 p-6 rounded-[2rem] shadow-sm hover:border-red-100 transition-all group relative">
            <div className="text-[10px] font-black text-gray-300 uppercase mb-4 tracking-widest">{slot.id}</div>
            <div className="text-xl font-bold mb-1">{slot.time}</div>
            <div className="text-[10px] text-gray-400 font-medium mb-4 italic">{slot.date}</div>
            <div className={`text-[9px] font-black uppercase tracking-widest flex items-center gap-1 ${slot.available ? 'text-emerald-500' : 'text-orange-500'}`}>
               <CheckCircle2 className="w-3 h-3" /> {slot.available ? 'AVAILABLE' : 'BOOKED'}
            </div>
            
            <button 
              onClick={() => removeSlot(slot.id)}
              className="absolute top-4 right-4 p-2 text-gray-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

function AuditTrailSection() {
  const [bookings, setBookings] = useState<any[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("flexslot_bookings");
    if (saved) {
      setBookings(JSON.parse(saved).reverse());
    }
  }, []);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 text-black">
       <div className="lg:col-span-2 bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden divide-y divide-gray-50">
          <div className="p-8 flex justify-between items-center">
            <div className="text-[10px] font-black uppercase tracking-widest text-gray-300">Live Appointment Stream</div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest">Real-time sync</span>
            </div>
          </div>
          {bookings.length > 0 ? bookings.map((b, i) => (
            <AuditRow 
              key={i}
              id={`B-${1000 + i}`} 
              name={b.clientName} 
              time={`${b.slotTime} (${b.slotDate})`} 
              status="RESERVED" 
              service={b.serviceName}
            />
          )) : (
            <div className="p-20 text-center text-gray-300 italic">No bookings yet.</div>
          )}
       </div>
       <div className="bg-black text-white rounded-[2.5rem] p-10 flex flex-col items-center justify-center text-center">
          <ShieldCheck className="w-12 h-12 text-emerald-500 mb-6" />
          <div className="font-bold text-lg mb-2">HIPAA_SECURED</div>
          <p className="text-[10px] text-white/40 uppercase tracking-[0.2em] font-mono">Row-Level Security Active</p>
          <div className="mt-10 pt-8 border-t border-white/10 w-full">
            <div className="text-[9px] font-black uppercase tracking-widest text-gray-500 mb-4">Encryption Keys</div>
            <div className="flex gap-1 justify-center">
              {Array.from({ length: 12 }).map((_, i) => (
                <div key={i} className="w-1 h-3 bg-emerald-500/20 rounded-full" />
              ))}
            </div>
          </div>
       </div>
    </div>
  );
}

function AuditRow({ id, name, time, status, service }: { id: string, name: string, time: string, status: string, service?: string }) {
  return (
    <div className="p-8 flex items-center justify-between hover:bg-gray-50/50 transition-all">
       <div className="flex items-center gap-6">
          <div className="text-[10px] font-black font-mono text-gray-300">{id}</div>
          <div>
             <div className="font-bold">{name}</div>
             <div className="text-xs text-gray-400 italic mb-1">{time}</div>
             {service && <div className="text-[9px] font-black uppercase tracking-widest text-emerald-500">{service}</div>}
          </div>
       </div>
       <div className="px-4 py-1.5 rounded-lg bg-black text-white text-[10px] font-black uppercase tracking-widest">
          {status}
       </div>
    </div>
  );
}
