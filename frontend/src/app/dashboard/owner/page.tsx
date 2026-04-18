"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  BarChart3, Users, Calendar, Settings, Bot, Search, Bell, 
  TrendingUp, Layers, ShieldCheck, CheckCircle2, FileText, 
  Plus, ExternalLink, Scissors, Code, Stethoscope, Briefcase,
  Layout, Database, Zap, Cpu, Lock, Globe, Mail, Clock, ChevronRight, CalendarClock, Trash2, LayoutDashboard,
  Palette, Sparkles, User
} from "lucide-react";
import Link from "next/link";
import { api } from "@/lib/api";

export default function OwnerDashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const [clinicName, setClinicName] = useState("Happy Paws Clinic"); // Default for demo
  const [activeTemplate, setActiveTemplate] = useState("clinic-clean");

  const [showNotifications, setShowNotifications] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  const [bookings, setBookings] = useState<any[]>([]);

  const fetchBookings = async () => {
    try {
      const data = await api.getBookings();
      if (data && data.length > 0) {
        setBookings(data.reverse());
      } else {
        const saved = localStorage.getItem("flexslot_bookings");
        if (saved) setBookings(JSON.parse(saved).reverse());
      }
    } catch (error) {
      console.error("Failed to fetch bookings", error);
      const saved = localStorage.getItem("flexslot_bookings");
      if (saved) setBookings(JSON.parse(saved).reverse());
    }
  };

  useEffect(() => {
    const role = localStorage.getItem("flexslot_role");
    const savedName = localStorage.getItem("flexslot_active_clinic_name") || "Happy Paws Clinic";
    const savedTemplate = localStorage.getItem("flexslot_active_template") || "clinic-clean";
    setClinicName(savedName);
    setActiveTemplate(savedTemplate);
    
    fetchBookings();
    window.addEventListener('storage', fetchBookings);
    return () => window.removeEventListener('storage', fetchBookings);
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
            <span className="font-bold tracking-tight text-lg text-black">FlexSlot <span className="text-gray-400 font-serif italic">Custom</span></span>
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


        <div className="p-10 max-w-7xl mx-auto w-full space-y-12">
          {activeTab === "overview" && <OverviewSection bookings={bookings} activeTemplate={activeTemplate} />}
          {activeTab === "ui" && (
            <UIConfiguratorSection 
              activeTemplate={activeTemplate} 
              onSelectTemplate={handleTemplateSelect} 
            />
          )}
          {activeTab === "services" && <ServiceCatalogSection />}
          {activeTab === "slots" && <SlotManagerSection activeTemplate={activeTemplate} />}
          {activeTab === "audit" && <AuditTrailSection bookings={bookings} setBookings={setBookings} />}
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

function OverviewSection({ activeTemplate, bookings }: { activeTemplate: string, bookings: any[] }) {
  return (
    <div className="space-y-12">
      <div className="mb-12">
        <h1 className="text-5xl font-serif italic text-black">Clinical Command</h1>
        <p className="text-sm text-gray-400 font-medium italic mt-4">Real-time performance metrics and diagnostic insights for your practice.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <MetricCard 
          label="Patient Visits" 
          value={(bookings?.length + 842).toString()} 
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
              <p className="text-white/80 text-sm font-medium italic max-w-sm leading-relaxed">Your professional site is broadcasting to patients. Any changes here sync in sub-100ms across the FlexSlot Network.</p>
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
      <div className="flex justify-between items-end mb-12">
        <div>
          <h1 className="text-5xl font-serif text-black italic">Creative Studio</h1>
          <p className="text-sm text-gray-400 font-medium italic mt-4">Personalize your patient portal with curated clinical themes.</p>
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
  const [services, setServices] = useState<any[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  
  // Form State
  const [formData, setFormData] = useState({
    name: '',
    type: 'diagnostic',
    dur: '30m',
    fee: '$100',
    desc: ''
  });

  const fetchServices = () => {
    const saved = localStorage.getItem("flexslot_clinical_services");
    if (saved) {
      setServices(JSON.parse(saved));
    } else {
      const initial = [
        { id: 'T-101', name: 'General Wellness Check', dur: '45m', fee: '$85', desc: 'Comprehensive diagnostic screening and health report.', type: 'diagnostic' },
        { id: 'T-102', name: 'Specialist Consultation', dur: '30m', fee: '$150', desc: 'Expert clinical review for specific physiological concerns.', type: 'specialist' },
        { id: 'T-103', name: 'Clinical Follow-up', dur: '15m', fee: '$60', desc: 'Post-treatment validation and medical roadmap update.', type: 'followup' }
      ];
      setServices(initial);
      localStorage.setItem("flexslot_clinical_services", JSON.stringify(initial));
    }
  };

  useEffect(() => {
    fetchServices();
    window.addEventListener('storage', fetchServices);
    return () => window.removeEventListener('storage', fetchServices);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newS = {
      id: `T-${100 + services.length + 1}`,
      ...formData
    };
    const next = [...services, newS];
    setServices(next);
    localStorage.setItem("flexslot_clinical_services", JSON.stringify(next));
    setIsAdding(false);
    setFormData({ name: '', type: 'diagnostic', dur: '30m', fee: '$100', desc: '' });
  };

  const deleteService = (id: string) => {
    const next = services.filter(s => s.id !== id);
    setServices(next);
    localStorage.setItem("flexslot_clinical_services", JSON.stringify(next));
  };

  return (
    <div className="space-y-12 pb-24 relative">
      <AnimatePresence>
        {isAdding && (
          <>
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }}
              onClick={() => setIsAdding(false)}
              className="fixed inset-0 bg-black/20 backdrop-blur-md z-[100]" 
            />
            <motion.div 
              initial={{ x: '100%' }} 
              animate={{ x: 0 }} 
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 bottom-0 w-full max-w-xl bg-white shadow-2xl z-[110] p-12 overflow-y-auto"
            >
               <div className="flex justify-between items-center mb-12">
                  <div>
                    <h2 className="text-4xl font-serif italic text-black">Protocol Designer</h2>
                    <p className="text-sm text-gray-400 font-medium italic mt-2">Architect a new clinical service entry.</p>
                  </div>
                  <button onClick={() => setIsAdding(false)} className="p-4 hover:bg-gray-50 rounded-full transition-all group">
                    <Trash2 className="w-6 h-6 text-gray-300 group-hover:text-black" />
                  </button>
               </div>

               <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Protocol Designation</label>
                    <input 
                      required
                      value={formData.name}
                      onChange={e => setFormData({...formData, name: e.target.value})}
                      placeholder="e.g. Advanced Orthopedic Review"
                      className="w-full p-6 bg-gray-50 border border-black/5 rounded-2xl focus:outline-none focus:ring-2 focus:ring-black focus:bg-white transition-all font-bold"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Clinical Type</label>
                      <select 
                        value={formData.type}
                        onChange={e => setFormData({...formData, type: e.target.value})}
                        className="w-full p-6 bg-gray-50 border border-black/5 rounded-2xl focus:outline-none font-bold"
                      >
                        <option value="diagnostic">Diagnostic</option>
                        <option value="specialist">Specialist</option>
                        <option value="followup">Follow-up</option>
                      </select>
                    </div>
                    <div className="space-y-3">
                       <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Duration Allocation</label>
                       <input 
                        value={formData.dur}
                        onChange={e => setFormData({...formData, dur: e.target.value})}
                        placeholder="e.g. 45m"
                        className="w-full p-6 bg-gray-50 border border-black/5 rounded-2xl focus:outline-none focus:ring-2 focus:ring-black font-bold"
                      />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Consultation Fee</label>
                    <div className="relative">
                      <input 
                        value={formData.fee}
                        onChange={e => setFormData({...formData, fee: e.target.value})}
                        placeholder="$120"
                        className="w-full p-6 bg-gray-50 border border-black/5 rounded-2xl focus:outline-none focus:ring-2 focus:ring-black font-bold"
                      />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Protocol Summary</label>
                    <textarea 
                      value={formData.desc}
                      onChange={e => setFormData({...formData, desc: e.target.value})}
                      rows={4}
                      placeholder="Provide architectural detail of the clinical procedure..."
                      className="w-full p-6 bg-gray-50 border border-black/5 rounded-2xl focus:outline-none focus:ring-2 focus:ring-black font-medium italic"
                    />
                  </div>

                  <div className="pt-12">
                     <button type="submit" className="w-full py-6 bg-black text-white rounded-[2rem] font-black text-[11px] uppercase tracking-[0.3em] shadow-2xl hover:scale-[1.02] active:scale-95 transition-all">
                        Commit Protocol to Live Registry
                     </button>
                  </div>
               </form>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <div className="flex justify-between items-end mb-4">
        <div>
          <h1 className="text-5xl font-serif italic text-black">Treatment Protocols</h1>
          <p className="text-sm text-gray-400 font-medium italic mt-4">Managed healthcare services and specialized medical procedures.</p>
        </div>
        <div className="flex gap-4">
           <button 
             onClick={() => setIsAdding(true)}
             className="px-8 py-4 bg-black text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:scale-105 transition-all shadow-xl flex items-center gap-3"
           >
              <Plus className="w-4 h-4" /> Register New Protocol
           </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
         <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((s) => (
              <ServiceCard key={s.id} {...s} onDelete={() => deleteService(s.id)} />
            ))}
         </div>

         <div className="space-y-8">
            <div className="bg-white border border-black/5 rounded-[2.5rem] p-8 shadow-sm">
               <div className="text-[9px] font-black uppercase tracking-[0.2em] text-gray-400 mb-6 font-sans">Protocol Intelligence</div>
               <div className="space-y-6">
                  <div className="flex justify-between items-center pb-6 border-b border-black/5">
                     <span className="text-[11px] font-medium text-gray-500 italic">Median Fee</span>
                     <span className="text-xl font-serif font-black italic">$92.50</span>
                  </div>
                  <div className="flex justify-between items-center pb-6 border-b border-black/5">
                     <span className="text-[11px] font-medium text-gray-500 italic">Popular Service</span>
                     <span className="text-xs font-black uppercase text-black tracking-widest">Wellness</span>
                  </div>
                  <div className="flex justify-between items-center">
                     <span className="text-[11px] font-medium text-gray-500 italic">Service Density</span>
                     <span className="text-xs font-black uppercase text-emerald-500 tracking-widest">High_Load</span>
                  </div>
               </div>
            </div>


         </div>
      </div>
    </div>
  );
}

function ServiceCard({ id, name, dur, fee, desc, type, onDelete }: { id: string, name: string, dur: string, fee: string, desc: string, type: string, onDelete: () => void }) {
  const getIcon = () => {
    switch(type) {
      case 'specialist': return <Stethoscope className="w-6 h-6" />;
      case 'diagnostic': return <Scissors className="w-6 h-6" />;
      default: return <Briefcase className="w-6 h-6" />;
    }
  };

  return (
    <div className="bg-white rounded-[2.5rem] border border-black/5 p-10 hover:border-black/20 hover:shadow-2xl hover:shadow-black/[0.02] transition-all group flex flex-col justify-between">
       <div>
          <div className="flex justify-between items-start mb-10">
             <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center text-gray-300 group-hover:bg-black group-hover:text-white transition-all duration-500">
                {getIcon()}
             </div>
             <div className="flex items-center gap-2">
                <div className="text-[10px] font-black font-mono text-gray-300 uppercase tracking-widest p-2 border border-black/5 rounded-xl">{id}</div>
                <button 
                  onClick={onDelete}
                  className="p-2 text-gray-200 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
             </div>
          </div>
          <h3 className="text-2xl font-serif italic text-black mb-3 group-hover:tracking-tight transition-all duration-700 leading-tight">{name}</h3>
          <p className="text-[11px] text-gray-400 font-medium italic leading-relaxed mb-8">{desc}</p>
       </div>

       <div className="pt-8 border-t border-black/5 flex items-center justify-between">
          <div className="flex items-center gap-6">
             <div className="flex flex-col">
                <span className="text-[8px] font-black uppercase text-gray-300 tracking-widest mb-1">Time</span>
                <span className="text-sm font-black italic text-black">{dur}</span>
             </div>
             <div className="w-px h-8 bg-black/5" />
             <div className="flex flex-col">
                <span className="text-[8px] font-black uppercase text-gray-300 tracking-widest mb-1">Fee</span>
                <span className="text-sm font-black italic text-emerald-500">{fee}</span>
             </div>
          </div>
          <button className="p-3 bg-gray-50 hover:bg-black hover:text-white rounded-xl transition-all duration-300 opacity-60 group-hover:opacity-100">
             <Settings className="w-4 h-4" />
          </button>
       </div>
    </div>
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

interface Booking {
  id: string;
  clinicId?: string;
  clientName: string;
  clientEmail: string;
  clientPhone?: string;
  serviceName: string;
  slotTime: string;
  slotDate: string;
  createdAt: string;
}

function AuditTrailSection({ bookings, setBookings }: { bookings: any[], setBookings: React.Dispatch<React.SetStateAction<any[]>> }) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredBookings = bookings.filter(b => 
    (b.customer_name || b.clientName || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
    (b.customer_email || b.clientEmail || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
    (b.id || "").toString().toLowerCase().includes(searchQuery.toLowerCase()) ||
    (b.service_name || b.serviceName || "").toLowerCase().includes(searchQuery.toLowerCase())
  );

  const deleteEntry = (id: string) => {
    const next = bookings.filter(b => b.id !== id);
    setBookings(next);
    localStorage.setItem("flexslot_bookings", JSON.stringify(next.reverse()));
  };

  return (
    <div className="space-y-12">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-5xl font-serif italic text-black">Patient Registry</h2>
          <p className="text-sm text-gray-400 font-medium italic mt-4">Comprehensive archives of clinical engagements and patient history.</p>
        </div>
        <div className="flex gap-4">
           <Link href="/provider/appointment/upcoming" className="px-6 py-3 bg-black text-white rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2 hover:scale-105 transition-all shadow-lg">
             Open Live Feed <ExternalLink className="w-4 h-4" />
           </Link>
        </div>
      </div>

      <div className="space-y-8">
        <div className="space-y-8">
          <div className="grid grid-cols-3 gap-6">
             <div className="p-8 bg-white border border-black/5 rounded-[2.5rem] shadow-sm font-sans">
                <div className="text-[9px] font-black uppercase text-gray-400 tracking-[0.2em] mb-4">Registry Density</div>
                <div className="text-3xl font-serif font-black italic">{bookings.length + 142} <span className="text-[10px] font-sans font-black text-emerald-500 ml-1">↑ 12%</span></div>
             </div>
             <div className="p-8 bg-white border border-black/5 rounded-[2.5rem] shadow-sm font-sans">
                <div className="text-[9px] font-black uppercase text-gray-400 tracking-[0.2em] mb-4">Consultation Velocity</div>
                <div className="text-3xl font-serif font-black italic">14.2<span className="text-xs font-sans font-black text-gray-300 ml-1">u/hr</span></div>
             </div>
             <div className="p-8 bg-white border border-black/5 rounded-[2.5rem] shadow-sm font-sans">
                <div className="text-[9px] font-black uppercase text-gray-400 tracking-[0.2em] mb-4">Patient Retention</div>
                <div className="text-3xl font-serif font-black italic">98.4%</div>
             </div>
          </div>

          {/* Smart Command Bar */}
          <div className="relative group">
            <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-black/10 to-transparent" />
            <div className="relative bg-white/50 backdrop-blur-xl border border-black/5 rounded-[3rem] p-4 flex items-center gap-6 shadow-2xl shadow-black/[0.02]">
               <div className="w-16 h-16 bg-black rounded-[2.2rem] flex items-center justify-center text-white shadow-xl shadow-black/20">
                  <Search className="w-6 h-6" />
               </div>
               <input 
                 type="text"
                 placeholder="Search Patient ID, Clinical Name, or Identification Metadata..."
                 value={searchQuery}
                 onChange={(e) => setSearchQuery(e.target.value)}
                 className="flex-1 bg-transparent border-none outline-none text-xl font-bold placeholder:text-gray-300 text-black placeholder:italic"
               />
               <div className="flex items-center gap-3 pr-6 border-l border-black/5 pl-8">
                  <span className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-300 font-mono">Filter_Mode</span>
                  <div className="flex items-center gap-1.5 p-1 bg-gray-50 rounded-full border border-black/5">
                     <button className="px-4 py-2 bg-white text-black text-[9px] font-black uppercase tracking-widest rounded-full shadow-sm">All</button>
                     <button className="px-4 py-2 text-gray-400 text-[9px] font-black uppercase tracking-widest rounded-full hover:text-black transition-colors border border-transparent hover:bg-white">Verified</button>
                  </div>
               </div>
            </div>
            <div className="absolute inset-x-0 -bottom-px h-px bg-gradient-to-r from-transparent via-black/10 to-transparent" />
          </div>

          <div className="bg-white rounded-[2.5rem] border border-black/5 shadow-2xl shadow-black/[0.02] overflow-hidden">
             <div className="p-10 border-b border-black/5 flex justify-between items-center bg-gray-50/20">
                <div className="flex items-center gap-4">
                   <Users className="w-5 h-5 text-gray-400" />
                   <span className="text-xs font-black uppercase tracking-widest text-[#222]">Entry Logs</span>
                </div>
                <div className="flex items-center gap-3">
                   <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                   <span className="text-[10px] font-black text-emerald-600 uppercase tracking-[0.2em] italic">Real-Time Sync Protocol active</span>
                </div>
             </div>
             <div className="divide-y divide-black/5">
                {filteredBookings.length > 0 ? filteredBookings.map((b, i) => (
                  <AuditRow 
                    key={b.id}
                    id={b.id.toString()} 
                    name={b.customer_name || b.clientName} 
                    time={`${b.slot_time || b.slotTime} — ${b.slot_date || b.slotDate}`} 
                    status={b.status || "VERIFIED"} 
                    service={b.service_name || b.serviceName}
                    onDelete={() => deleteEntry(b.id)}
                  />
                )) : (
                  <div className="p-24 flex flex-col items-center justify-center text-center opacity-20">
                     <FileText className="w-16 h-16 mb-4" />
                     <span className="text-xs font-black uppercase tracking-widest">Registry Silent</span>
                  </div>
                )}
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}


function AuditRow({ id, name, time, status, service, onDelete }: { id: string, name: string, time: string, status: string, service?: string, onDelete: () => void }) {
  return (
    <div className="p-10 flex items-center justify-between hover:bg-gray-50/30 transition-all group">
       <div className="flex items-center gap-8">
          <div className="w-16 h-16 bg-gray-50 rounded-[1.5rem] border border-black/5 flex items-center justify-center text-gray-300 group-hover:bg-black group-hover:text-white transition-all duration-500 shadow-inner">
             <User className="w-7 h-7" />
          </div>
          <div className="space-y-1">
             <div className="font-serif italic text-2xl text-black group-hover:tracking-tight transition-all duration-700">{name}</div>
             <div className="flex items-center gap-4">
                <div className="text-[10px] font-black font-mono text-gray-300 tracking-[0.2em] uppercase">{id.split('-').pop()}</div>
                <div className="w-1 h-1 rounded-full bg-black/10" />
                <div className="text-[11px] text-gray-400 font-medium italic">{time}</div>
             </div>
          </div>
       </div>
       <div className="flex items-center gap-12">
          <div className="text-right hidden md:block">
             <div className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-500 mb-1">{service}</div>
             <div className="text-[9px] font-black uppercase tracking-widest text-black/20 italic font-mono">Verified_Record</div>
          </div>
          <div className="flex items-center gap-3">
             <div className="px-6 py-3 rounded-xl bg-white border border-black/5 text-[10px] font-black uppercase tracking-widest shadow-sm">
                {status}
             </div>
             <button 
               onClick={onDelete}
               className="p-3 bg-gray-50 hover:bg-red-500 hover:text-white rounded-xl transition-all duration-300 text-gray-300 opacity-0 group-hover:opacity-100 border border-black/5"
             >
                <Trash2 className="w-4 h-4" />
             </button>
          </div>
       </div>
    </div>
  );
}
