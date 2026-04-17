"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  BarChart3, Users, Calendar, Settings, Bot, Search, Bell, 
  TrendingUp, Layers, ShieldCheck, CheckCircle2, FileText, 
  Plus, ExternalLink, Scissors, Code, Stethoscope, Briefcase,
  Layout, Database, Zap, Cpu, Lock, Globe, Mail, Clock, ChevronRight, CalendarClock, Trash2, LayoutDashboard,
  Palette, Sparkles
} from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";

export default function OwnerDashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const [clinicName, setClinicName] = useState("Happy Paws Clinic"); // Default for demo
  const [activeTemplate, setActiveTemplate] = useState("clinic-clean");

  const [showNotifications, setShowNotifications] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    const role = localStorage.getItem("flexslot_role");
    const savedName = localStorage.getItem("flexslot_active_clinic_name") || "Happy Paws Clinic";
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

  const getThemeColor = () => {
    switch(activeTemplate) {
      case 'clinic-clean': return 'from-blue-50/50';
      case 'paws-premium': return 'from-emerald-50/50';
      case 'pulse-modern': return 'from-indigo-50/50';
      case 'vet-warm': return 'from-orange-50/50';
      case 'wild-med': return 'from-green-50/50';
      default: return 'from-gray-50/50';
    }
  };

  return (
    <div className={`min-h-screen bg-[#FDFDFD] text-black font-sans flex overflow-hidden transition-colors duration-1000`}>
      <AnimatePresence>
        {isUpdating && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed bottom-10 right-10 z-[100] bg-black text-white px-8 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-2xl flex items-center gap-3 border border-white/10"
          >
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
            Syncing Brand Assets: {activeTemplate}
          </motion.div>
        )}
      </AnimatePresence>
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
          <Link href="/provider/appointment/upcoming" className="w-full flex items-center gap-3 px-4 py-4 rounded-2xl text-sm font-bold tracking-tight text-gray-400 hover:bg-gray-50 hover:text-black transition-all">
            <LayoutDashboard className="w-5 h-5 text-emerald-500" />
            Upcoming Feed
          </Link>
          <SideNavItem icon={<Users />} label="Patient Registry" active={activeTab === "audit"} onClick={() => setActiveTab("audit")} />
          

        </div>

        <div className="p-6 border-t border-gray-50">
           <Link href="/dashboard/settings" className="w-full flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-black transition-colors font-bold text-sm">
             <Settings className="w-4 h-4" /> System Governance
           </Link>
        </div>
      </aside>

      <main className={`flex-1 flex flex-col overflow-y-auto bg-gradient-to-br ${getThemeColor()} to-transparent transition-all duration-1000`}>
        <header className="h-20 bg-white/80 backdrop-blur-md border-b border-gray-100 flex items-center justify-between px-10 sticky top-0 z-[60]">
          <h2 className="text-xl font-serif text-black italic">Clinic HQ</h2>
          <div className="flex items-center gap-6">

            
            <div className="relative">
              <button 
                onClick={() => setShowNotifications(!showNotifications)}
                className={`p-2 rounded-xl transition-all relative ${showNotifications ? 'bg-black text-white' : 'hover:bg-gray-50 text-gray-400'}`}
              >
                 <Bell className="w-5 h-5" />
                 {!showNotifications && <span className="absolute top-2 right-2.5 w-2 h-2 bg-black rounded-full ring-2 ring-white" />}
              </button>

              <AnimatePresence>
                {showNotifications && (
                  <>
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      onClick={() => setShowNotifications(false)}
                      className="fixed inset-0 z-[-1]"
                    />
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      className="absolute right-0 mt-4 w-96 bg-white border border-gray-100 rounded-[2rem] shadow-2xl z-[70] p-4 overflow-hidden"
                    >
                      <div className="p-4 border-b border-gray-50 flex items-center justify-between mb-4">
                        <span className="text-xs font-black uppercase tracking-widest text-black">Cloud Signals</span>
                        <span className="text-[10px] font-bold text-emerald-500 bg-emerald-50 px-2 py-0.5 rounded-full">3 New</span>
                      </div>
                      <div className="space-y-2">
                        <NotificationItem 
                          title="New Appointment Request" 
                          time="2 mins ago" 
                          desc="Sarah Chen requested a Dental Checkup"
                          isNew
                        />
                        <NotificationItem 
                          title="Payment Finalized" 
                          time="14 mins ago" 
                          desc="Invoice #4928 successfully processed"
                          isNew
                        />
                        <NotificationItem 
                          title="Slot Lock Trigger" 
                          time="1h ago" 
                          desc="Auto-lock engaged for Tuesday AM slots"
                        />
                      </div>
                      <Link 
                        href="/provider/appointment/upcoming"
                        onClick={() => setShowNotifications(false)}
                        className="mt-6 block w-full py-4 bg-gray-50 hover:bg-black hover:text-white transition-all text-center rounded-2xl text-[10px] font-black uppercase tracking-widest"
                      >
                        Navigate to Live Feed
                      </Link>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>

            <div className="w-10 h-10 rounded-full bg-black flex items-center justify-center text-white font-bold text-sm shadow-xl">DR</div>
          </div>
        </header>

        <div className="p-10 max-w-7xl mx-auto w-full space-y-12">
          {activeTab === "overview" && <OverviewSection activeTemplate={activeTemplate} />}
          {activeTab === "ui" && (
            <UIConfiguratorSection 
              activeTemplate={activeTemplate} 
              onSelectTemplate={handleTemplateSelect} 
            />
          )}
          {activeTab === "services" && <ServiceCatalogSection />}
          {activeTab === "slots" && <SlotManagerSection />}
          {activeTab === "audit" && <AuditTrailSection />}
        </div>
      </main>
    </div>
  );
}

function NotificationItem({ title, time, desc, isNew = false }: { title: string, time: string, desc: string, isNew?: boolean }) {
  return (
    <div className={`p-4 rounded-[1.5rem] transition-all cursor-pointer group ${isNew ? 'bg-gray-50 hover:bg-white border-white border group' : 'hover:bg-gray-50'}`}>
      <div className="flex justify-between items-start mb-1">
        <h5 className="text-xs font-bold text-black group-hover:italic">{title}</h5>
        <span className="text-[9px] font-medium text-gray-400 italic">{time}</span>
      </div>
      <p className="text-[10px] text-gray-400 font-medium leading-relaxed">{desc}</p>
      {isNew && <div className="mt-2 w-1.5 h-1.5 bg-black rounded-full" />}
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

function MetricCard({ label, value, trend, icon, desc }: { label: string, value: string, trend: string, icon: React.ReactNode, desc: string }) {
  return (
    <div className="bg-white p-8 rounded-[2.5rem] border border-black/5 shadow-sm group hover:scale-[1.02] hover:border-black/20 transition-all flex flex-col justify-between h-full">
      <div>
        <div className="flex justify-between items-start mb-6">
          <div className="p-3 bg-gray-50 rounded-2xl group-hover:bg-black group-hover:text-white transition-colors">
            {icon}
          </div>
          <span className="text-[10px] font-black font-mono px-3 py-1.5 rounded-lg bg-black text-white">{trend}</span>
        </div>
        <div className="text-3xl font-serif font-black mb-1 text-black">{value}</div>
        <div className="text-[10px] font-black uppercase tracking-[0.2em] text-black/80">{label}</div>
      </div>
      <p className="mt-4 text-[10px] text-gray-400 font-medium italic leading-relaxed">{desc}</p>
    </div>
  );
}

function OverviewSection({ activeTemplate }: { activeTemplate: string }) {
  return (
    <div className="space-y-12">
      <div className="flex flex-col gap-2">
        <h2 className="text-3xl font-serif italic text-black">Performance Analytics</h2>
        <p className="text-sm text-gray-400 font-medium italic">Comprehensive overview of clinical throughput and financial signals.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <MetricCard 
          label="Patient Visits" 
          value="842" 
          trend="+12%" 
          icon={<Calendar />} 
          desc="Total unique clinical consultations recorded in the current billing cycle."
        />
        <MetricCard 
          label="Clinical Revenue" 
          value="$8,240" 
          trend="+5%" 
          icon={<TrendingUp />} 
          desc="Net therapeutic and consultation profit before secondary operational costs."
        />
        <MetricCard 
          label="Diagnostic Load" 
          value="High" 
          trend="AI_OPT" 
          icon={<Bot />} 
          desc="Real-time computational load for Smart-Triage parsing and patient intents."
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white rounded-[2.5rem] p-10 border border-black/5 shadow-sm relative group overflow-hidden">
           <div className="flex items-center justify-between mb-8">
              <div>
                <h3 className="font-bold text-lg mb-1">Patient Flow Index</h3>
                <p className="text-[10px] text-gray-400 font-medium italic">Temporal distribution of clinical arrivals.</p>
              </div>
              <div className="text-[10px] font-black text-black/40 uppercase tracking-widest font-mono italic">Clinical Prediction Engine</div>
           </div>
           <div className="h-40 flex items-end gap-2 px-2 border-b border-gray-100 mb-6 pb-2">
              {[30, 45, 60, 40, 70, 90, 85, 50, 65, 80, 55, 75].map((h, i) => (
                <div key={i} className="flex-1 bg-gray-50 rounded-full relative overflow-hidden">
                  <motion.div className="absolute bottom-0 w-full bg-black rounded-full" initial={{ height: 0 }} animate={{ height: `${h}%` }} transition={{ duration: 1.5, delay: i * 0.05 }} />
                </div>
              ))}
           </div>
           <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-widest text-black/30">
              <span className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-black" /> AM PEAK</span>
              <span className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-gray-200" /> PM STABLE</span>
           </div>
        </div>

        <div className="bg-emerald-500 rounded-[2.5rem] p-10 shadow-2xl shadow-emerald-500/20 border border-black/10 relative group overflow-hidden flex flex-col justify-between">
           <div className="relative z-10">
              <div className="flex items-center gap-3 mb-4">
                <div className="px-3 py-1 bg-white/20 rounded-full text-[9px] font-black text-white uppercase tracking-widest">Live Status</div>
                <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
              </div>
              <h3 className="text-white font-bold text-3xl mb-3 tracking-tight">Your clinic is live.</h3>
              <p className="text-white/80 text-sm font-medium italic max-w-sm leading-relaxed">Your professional site is broadcasting to patients. Any changes here sync in sub-100ms across the Kindred Network.</p>
           </div>
           <div className="relative z-10 flex gap-4 mt-10">
              <Link 
                href={`/templates/${activeTemplate}?manage=true`}
                className="px-8 py-5 bg-white text-black rounded-[1.5rem] font-black text-[11px] uppercase tracking-widest flex items-center gap-3 hover:scale-105 transition-all shadow-xl"
              >
                 <Layout className="w-4 h-4" /> Visual Builder
              </Link>
              <Link 
                href={`/templates/${activeTemplate}`}
                className="px-8 py-5 bg-black/10 text-white border border-white/20 rounded-[1.5rem] font-black text-[11px] uppercase tracking-widest flex items-center gap-3 hover:bg-black/20 transition-all"
              >
                 <ExternalLink className="w-4 h-4" /> Live Preview
              </Link>
           </div>
           {/* Decoration */}
           <div className="absolute top-[-20%] right-[-10%] w-64 h-64 bg-white/10 rounded-full blur-[80px]" />
           <Sparkles className="absolute bottom-6 right-6 w-12 h-12 text-white/10" />
        </div>
      </div>
    </div>
  );
}

function UIConfiguratorSection({ activeTemplate, onSelectTemplate }: { activeTemplate: string, onSelectTemplate: (t: string) => void }) {
  const templates = [
    { id: 'clinic-clean', name: 'Clinical Pure', color: 'blue', desc: 'Minimalist medical aesthetic with high trust indicators.' },
    { id: 'paws-premium', name: 'Elite Haven', color: 'emerald', desc: 'High-end veterinary luxury with serif elegance.' },
    { id: 'pulse-modern', name: 'Neo Pulse', color: 'indigo', desc: 'Cutting-edge digital interface for modern practices.' },
    { id: 'vet-warm', name: 'Gentle Care', color: 'orange', desc: 'Warm, approachable design for boutique specialty clinics.' },
    { id: 'wild-med', name: 'Safari Health', color: 'green', desc: 'Clean, professional medical template for broad outreach.' }
  ];

  return (
    <div className="space-y-12">
      <div className="flex justify-between items-end mb-6">
        <div>
          <h1 className="text-4xl font-serif text-black italic">Creative Studio</h1>
          <p className="text-sm text-gray-400 font-medium italic mt-2">Personalize your patient portal with curated clinical themes.</p>
        </div>
        <Link 
           href={`/templates/${activeTemplate}?manage=true`}
           className="px-8 py-4 bg-black text-white rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl flex items-center gap-3 hover:scale-[1.02] transition-all"
        >
          <Sparkles className="w-4 h-4" /> Finalize Global Styles
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {templates.map((theme) => (
          <div 
            key={theme.id}
            onClick={() => onSelectTemplate(theme.id)}
            className={`group rounded-[2.5rem] p-1 border transition-all cursor-pointer relative overflow-hidden ${activeTemplate === theme.id ? 'border-black' : 'border-black/5 hover:border-black/20'}`}
          >
            <div className="aspect-[4/3] rounded-[2.2rem] bg-gray-50 flex items-center justify-center relative overflow-hidden border border-black/5">
              <div className={`absolute inset-0 bg-gradient-to-br transition-opacity duration-500 ${theme.id === 'clinic-clean' ? 'from-blue-50 to-white' : theme.id === 'paws-premium' ? 'from-emerald-50 to-white' : 'from-gray-100 to-white'} opacity-0 group-hover:opacity-100`} />
              <div className="relative z-10 flex flex-col items-center gap-4">
                <Palette className={`w-10 h-10 transition-transform duration-500 group-hover:scale-110 ${activeTemplate === theme.id ? 'text-black' : 'text-gray-300'}`} />
                {activeTemplate === theme.id && (
                  <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} className="px-3 py-1 bg-black text-white text-[8px] font-black uppercase tracking-widest rounded-full">Active Concept</motion.div>
                )}
              </div>
            </div>
            
            <div className="p-8">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-bold text-lg">{theme.name}</h3>
                <div className="text-[10px] font-black font-mono text-gray-400">ID_{theme.id.split('-')[0].toUpperCase()}</div>
              </div>
              <p className="text-[10px] text-gray-400 font-medium leading-relaxed italic mb-6">{theme.desc}</p>
              
              <div className="flex gap-2">
                <button 
                  onClick={(e) => { e.stopPropagation(); onSelectTemplate(theme.id); }}
                  className={`flex-1 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all ${activeTemplate === theme.id ? 'bg-black text-white' : 'bg-gray-50 text-gray-400 hover:bg-black hover:text-white'}`}
                >
                  {activeTemplate === theme.id ? 'Selected' : 'Use Theme'}
                </button>
                <Link 
                  href={`/templates/${theme.id}`}
                  onClick={(e) => e.stopPropagation()}
                  className="p-4 rounded-2xl bg-gray-50 border border-black/5 hover:bg-white hover:shadow-xl transition-all"
                >
                  <ExternalLink className="w-4 h-4 text-black" />
                </Link>
              </div>
            </div>
          </div>
        ))}
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

function SlotManagerSection({ activeTemplate }: { activeTemplate: string }) {
  const [slots, setSlots] = useState<{ id: string, time: string, date: string, available: boolean }[]>([]);
  const [newTime, setNewTime] = useState("09:00");
  const [newDate, setNewDate] = useState(new Date().toISOString().split('T')[0]);

  useEffect(() => {
    const fetchSlots = () => {
      const saved = localStorage.getItem("flexslot_available_slots");
      if (saved) {
        setSlots(JSON.parse(saved));
      } else {
        const initial = [
          { id: 'S-901', time: '09:00 AM', date: '2026-04-20', available: true },
          { id: 'S-902', time: '10:30 AM', date: '2026-04-20', available: false },
          { id: 'S-903', time: '11:00 AM', date: '2026-04-21', available: true },
          { id: 'S-904', time: '01:30 PM', date: '2026-04-21', available: true },
        ];
        setSlots(initial);
        localStorage.setItem("flexslot_available_slots", JSON.stringify(initial));
      }
    };
    fetchSlots();
    window.addEventListener('storage', fetchSlots);
    return () => window.removeEventListener('storage', fetchSlots);
  }, []);

  const addSlot = () => {
    const t = newTime;
    const [h, m] = t.split(':');
    const ampm = parseInt(h) >= 12 ? 'PM' : 'AM';
    const formattedHour = parseInt(h) % 12 || 12;
    const timeStr = `${formattedHour}:${m} ${ampm}`;

    const newSlot = {
      id: `S${Date.now()}`,
      time: timeStr,
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

  const groupedSlots = slots.reduce((acc: any, slot) => {
    if (!acc[slot.date]) acc[slot.date] = [];
    acc[slot.date].push(slot);
    return acc;
  }, {});

  const sortedDates = Object.keys(groupedSlots).sort();

  const getAccentColor = () => {
    switch(activeTemplate) {
      case 'paws-premium': return 'emerald';
      case 'pulse-modern': return 'indigo';
      case 'vet-warm': return 'orange';
      case 'wild-med': return 'green';
      default: return 'black';
    }
  };

  const accent = getAccentColor();

  return (
    <div className="space-y-16">
      <div className="flex justify-between items-start">
        <div className="space-y-1">

          <h2 className="text-5xl font-serif italic text-black">Master Schedule</h2>

        </div>
        <div className="p-4 bg-white/50 backdrop-blur-xl rounded-[2rem] border border-black/5 flex items-center gap-6 shadow-2xl shadow-black/[0.02]">
           <div className="flex -space-x-2">
              {[1, 2, 3].map(i => <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-gray-100 flex items-center justify-center text-[10px] font-black">DR</div>)}
           </div>
           <div className="text-[10px] font-black uppercase tracking-widest text-black/40">3 Active Providers</div>
        </div>
      </div>

      <div className="bg-white/40 backdrop-blur-3xl p-1 rounded-[3rem] border border-black/5 shadow-2xl shadow-black/[0.05] relative group">
        <div className="bg-white rounded-[2.8rem] p-10 flex flex-wrap gap-8 items-end relative z-10">
          <div className="flex-1 min-w-[240px]">
            <label className="flex items-center gap-2 text-[10px] font-black uppercase text-black/30 mb-4 tracking-[0.2em] italic">
              <Calendar className="w-3 h-3" /> Target Date Range
            </label>
            <input 
              type="date" 
              value={newDate} 
              onChange={(e) => setNewDate(e.target.value)}
              className="w-full px-8 py-5 rounded-2xl border border-black/5 bg-gray-50/30 focus:outline-none focus:ring-2 focus:ring-black focus:bg-white transition-all font-bold text-lg"
            />
          </div>
          <div className="flex-1 min-w-[240px]">
             <label className="flex items-center gap-2 text-[10px] font-black uppercase text-black/30 mb-4 tracking-[0.2em] italic">
              <Clock className="w-3 h-3" /> Specific Time Entry
            </label>
            <input 
              type="time" 
              value={newTime} 
              onChange={(e) => setNewTime(e.target.value)}
              className="w-full px-8 py-5 rounded-2xl border border-black/5 bg-gray-50/30 focus:outline-none focus:ring-2 focus:ring-black focus:bg-white transition-all font-bold text-lg"
            />
          </div>
          <button 
            onClick={addSlot}
            className="px-12 py-6 bg-black text-white rounded-[1.8rem] font-black text-[11px] uppercase tracking-[0.2em] flex items-center gap-4 hover:scale-[1.02] active:scale-95 transition-all shadow-2xl shadow-black/20 group-hover:bg-gradient-to-r group-hover:from-black group-hover:to-gray-800"
          >
            <Plus className="w-5 h-5" /> Push to Live
          </button>
        </div>
        {/* Decorative elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none -z-10" />
      </div>

      <div className="space-y-24">
        {sortedDates.length > 0 ? sortedDates.map((date, idx) => (
          <div key={date} className="relative">
            <div className="flex items-center gap-8 mb-12">
               <div className="flex flex-col">
                  <span className="text-6xl font-serif font-black italic opacity-5 mb-[-1.5rem] tracking-tighter capitalize">{new Date(date).toLocaleDateString('en-US', { weekday: 'long' })}</span>
                  <h3 className="text-3xl font-serif font-black italic text-black relative z-10 pl-4 border-l-4 border-black">
                    {new Date(date).toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}
                  </h3>
               </div>
               <div className="flex-1 h-px bg-gradient-to-r from-black/20 to-transparent" />
               <div className="text-[10px] font-black uppercase tracking-widest text-black/20 flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-black/10" /> Block_{idx + 1}
               </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {groupedSlots[date].map((slot: any) => (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  key={slot.id} 
                  className={`p-1 rounded-[2.5rem] transition-all group overflow-hidden ${slot.available ? 'hover:scale-[1.05]' : 'grayscale opacity-40'}`}
                >
                  <div className={`bg-white p-8 rounded-[2.4rem] border transition-all h-full flex flex-col justify-between ${slot.available ? 'border-black/5 hover:border-black/20' : 'border-dashed border-gray-200'}`}>
                    <div>
                      <div className="flex justify-between items-center mb-10">
                         <div className={`w-10 h-10 rounded-xl flex items-center justify-center bg-${accent === 'black' ? 'gray-50' : accent + '-50'} group-hover:bg-black group-hover:text-white transition-all`}>
                            <Clock className="w-4 h-4" />
                         </div>
                         {slot.available && (
                           <button 
                             onClick={() => removeSlot(slot.id)}
                             className="p-3 text-gray-200 hover:text-red-500 hover:bg-red-50 rounded-2xl opacity-0 group-hover:opacity-100 transition-all active:scale-90"
                           >
                             <Trash2 className="w-4 h-4" />
                           </button>
                         )}
                      </div>
                      <div className="text-3xl font-black text-black mb-2 tracking-tighter">{slot.time}</div>
                    </div>
                    
                    <div className="flex items-center justify-between pt-8 border-t border-gray-50 mt-8">
                       <span className={`text-[10px] font-black uppercase tracking-widest ${slot.available ? 'text-black' : 'text-gray-400'}`}>
                         {slot.available ? 'Confirmed Live' : 'Reservation Locked'}
                       </span>
                       <div className={`w-3 h-3 rounded-full ${slot.available ? 'bg-emerald-500 animate-pulse' : 'bg-gray-200'}`} />
                    </div>
                  </div>
                </motion.div>
              ))}
              
              {/* Add Quick Slot UI */}
              <div 
                onClick={() => { setNewDate(date); addSlot(); }}
                className="p-1 rounded-[2.5rem] border-2 border-dashed border-gray-100 flex items-center justify-center group cursor-pointer hover:border-black/20 hover:bg-gray-50/30 transition-all h-[240px]"
              >
                 <div className="flex flex-col items-center gap-4 text-gray-300 group-hover:text-black transition-all">
                    <div className="w-12 h-12 rounded-full flex items-center justify-center border-2 border-current">
                       <Plus className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-widest">Append Quick Slot</span>
                 </div>
              </div>
            </div>
          </div>
        )) : (
          <div className="py-48 flex flex-col items-center justify-center text-center">
             <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mb-8 border border-black/5">
                <CalendarClock className="w-10 h-10 text-gray-200" />
             </div>
             <h4 className="text-2xl font-serif italic text-black mb-2">No Active Clinical Pipeline</h4>
             <p className="text-sm text-gray-400 font-medium italic">Push a new allocation from the command center above.</p>
          </div>
        )}
      </div>
    </div>
  );
}

function AuditTrailSection() {
  const [bookings, setBookings] = useState<any[]>([]);

  useEffect(() => {
    const fetchBookings = () => {
      const saved = localStorage.getItem("flexslot_bookings");
      if (saved) {
        setBookings(JSON.parse(saved).reverse());
      } else {
        // Initial Dummy Bookings
        const initialBookings = [
          {
            id: "B-1001",
            clientName: "Alexander Wright",
            clientEmail: "alex@example.com",
            slotTime: "10:30 AM",
            slotDate: "2026-04-20",
            serviceName: "Dental Checkup",
            createdAt: new Date().toISOString()
          },
          {
            id: "B-1002",
            clientName: "Bella (Golden Retriever)",
            clientEmail: "owner@pets.com",
            slotTime: "02:00 PM",
            slotDate: "2026-04-19",
            serviceName: "Vaccination",
            createdAt: new Date().toISOString()
          }
        ];
        setBookings(initialBookings);
        localStorage.setItem("flexslot_bookings", JSON.stringify(initialBookings));
      }
    };

    fetchBookings();
    window.addEventListener('storage', fetchBookings);
    return () => window.removeEventListener('storage', fetchBookings);
  }, []);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 text-black">
       <div className="lg:col-span-2 bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden divide-y divide-gray-50">
          <div className="p-8 flex justify-between items-center">
            <div className="text-[10px] font-black uppercase tracking-widest text-gray-300">Live Appointment Stream</div>
            <div className="flex items-center gap-4">
              <Link href="/provider/appointment/upcoming" className="text-[10px] font-black text-black uppercase tracking-widest flex items-center gap-2 hover:opacity-60 transition-all">
                Open Portal <ExternalLink className="w-3 h-3" />
              </Link>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest">Real-time sync</span>
              </div>
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
