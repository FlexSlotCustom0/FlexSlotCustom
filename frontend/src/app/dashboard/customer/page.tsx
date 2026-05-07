"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Search, Filter, Calendar, MapPin, Star, Bot, Clock, 
  Send, Sparkles, CheckCircle2, ChevronRight, Bell, 
  Settings, RefreshCw, Layers, ShieldCheck, Heart,
  Briefcase, Scissors, Stethoscope, BriefcaseIcon, ExternalLink,
  Lock, RefreshCwIcon, HeartPulse, PawPrint, Syringe, CalendarClock
} from "lucide-react";
import Link from "next/link";

export default function CustomerDashboard() {
  const [activeTab, setActiveTab] = useState("explore");

  return (
    <div className="min-h-screen bg-[#FDFDFD] text-black font-sans flex overflow-hidden">
      {/* Sidebar */}
      <aside className="w-72 border-r border-gray-100 flex flex-col h-screen sticky top-0 bg-white z-20">
        <div className="h-24 flex items-center px-8 border-b border-gray-50">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-white border border-gray-100 rounded-xl flex items-center justify-center group-hover:scale-105 transition-all shadow-sm overflow-hidden">
              <img src="/flexslot_logo.png" alt="FlexSlotCustom Logo" className="w-full h-full object-contain p-1" />
            </div>
            <div className="flex flex-col">
              <span className="font-bold tracking-tight text-base text-[#1e3a8a]">FlexSlotCustom</span>
              <span className="text-[8px] font-black uppercase tracking-[0.2em] text-gray-300 italic">Client Portal</span>
            </div>
          </Link>
        </div>

        <div className="flex-1 overflow-y-auto px-4 py-8 space-y-1">
          <SideNavItem icon={<Search />} label="Clinics Explorer" active={activeTab === "explore"} onClick={() => setActiveTab("explore")} />
          <SideNavItem icon={<Calendar />} label="Patient History" active={activeTab === "bookings"} onClick={() => setActiveTab("bookings")} />
          

        </div>

        <div className="p-6 border-t border-gray-50">
           <Link href="/dashboard/settings" className="w-full flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-black transition-colors font-bold text-sm">
             <Settings className="w-4 h-4" /> Account Health
           </Link>
        </div>
      </aside>

      <main className="flex-1 flex flex-col overflow-y-auto">


        <div className="p-10 max-w-7xl mx-auto w-full space-y-12">
           <AnimatePresence mode="wait">
              {activeTab === "explore" && <ExploreMarketSection key="ex" />}
              {activeTab === "bookings" && <MyAppointmentsSection key="bk" />}
           </AnimatePresence>
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
          ? 'bg-[#1e3a8a] text-white shadow-xl shadow-blue-900/10'
          : 'text-gray-400 hover:bg-blue-50/50 hover:text-[#1e3a8a]'
        }`}
    >
      {icon}
      {label}
      {active && <motion.div layoutId="nav-pill-cust" className="absolute right-3 w-1.5 h-1.5 bg-white rounded-full" />}
    </button>
  );
}

function ExploreMarketSection() {
  const [publishedClinics, setPublishedClinics] = useState<any[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("flexslot_public_clinics");
    if (saved) {
      const allClinics = JSON.parse(saved);
      // Filter out legacy/demo clinics as requested by user
      const filtered = allClinics.filter((c: any) => 
        c.name !== "Alpha Vet Care" && 
        c.name !== "Antigravity Clinic"
      );
      
      setPublishedClinics(filtered);
      
      // Sync back to local storage if items were removed
      if (filtered.length !== allClinics.length) {
        localStorage.setItem("flexslot_public_clinics", JSON.stringify(filtered));
      }
    }
  }, []);

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-10">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-5xl font-serif tracking-tight mb-2 text-black">Clinical Search</h1>
          <p className="text-gray-400 font-medium italic">Discover GP, Specialists, and Veterinary experts.</p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
         {publishedClinics.length > 0 ? publishedClinics.map((clinic, i) => (
           <MarketCard 
             key={i}
             id={clinic.id}
             name={clinic.name} 
             cat={clinic.category} 
             rating={clinic.rating} 
             image={clinic.id === 'clinic-clean' ? 'bg-blue-50' : 'bg-orange-50'} 
           />
         )) : (
           <>
            <MarketCard name="City Medical Group" cat="Healthcare" rating={4.9} image="bg-blue-50" />
            <MarketCard name="Paw & Tail Veterinary" cat="Vet Care" rating={5.0} image="bg-emerald-50" />
            <MarketCard name="Dental Associates" cat="Specialist" rating={4.7} image="bg-gray-50" />
           </>
         )}
      </div>
    </motion.div>
  );
}

function MarketCard({ name, cat, rating, image, id }: { name: string, cat: string, rating: number, image: string, id?: string }) {
  return (
    <div className="bg-white border border-gray-100 p-6 rounded-[2.5rem] shadow-sm hover:shadow-xl transition-all group overflow-hidden">
       <div className={`w-full aspect-video ${image} rounded-3xl mb-6 flex items-center justify-center`}>
          {id && <div className="text-[10px] font-black uppercase tracking-widest text-[#000000a0]">Previewing {id}</div>}
       </div>
       <div className="flex justify-between items-start mb-6">
          <div>
             <h3 className="text-xl font-bold mb-1 tracking-tight text-black">{name}</h3>
             <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">{cat}</p>
          </div>
          <div className="flex items-center gap-1">
             <Star className="w-3 h-3 text-black fill-black" />
             <span className="text-xs font-bold">{rating}</span>
          </div>
       </div>
       <Link 
          href={id ? `/templates/${id}` : "#"}
          className="w-full py-4 bg-gray-50 rounded-2xl flex items-center justify-center gap-2 text-[10px] font-black uppercase tracking-widest hover:bg-black hover:text-white transition-all shadow-sm"
       >
          View Clinic <ExternalLink className="w-3.5 h-3.5" />
       </Link>
    </div>
  );
}


function MyAppointmentsSection() {
  const [records, setRecords] = useState<any[]>([]);
  const [isSyncing, setIsSyncing] = useState(false);

  const syncRecords = () => {
    setIsSyncing(true);
    setTimeout(() => {
      const saved = localStorage.getItem("flexslot_bookings");
      if (saved) {
        setRecords(JSON.parse(saved).reverse());
      } else {
        setRecords([
          { id: 'B-Demo1', clientName: 'Alexander Wright', serviceName: 'General Wellness', slotDate: '2026-04-20', slotTime: '10:30 AM' },
          { id: 'B-Demo2', clientName: 'Alexander Wright', serviceName: 'Specialist Consultation', slotDate: '2026-04-24', slotTime: '02:00 PM' }
        ]);
      }
      setIsSyncing(false);
    }, 1500);
  };

  useEffect(() => {
    syncRecords();
  }, []);

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-16">
       <div className="flex justify-between items-end">
          <div className="space-y-4">
             <h1 className="text-5xl font-serif text-black italic leading-tight">Patient Itinerary</h1>
             <p className="text-sm text-gray-400 font-medium italic">Validated history of clinical engagements and future medical appointments.</p>
          </div>
          <button 
            onClick={syncRecords}
            disabled={isSyncing}
            className="flex items-center gap-3 px-8 py-4 bg-white border border-black/5 rounded-[2rem] text-[10px] font-black uppercase tracking-widest hover:bg-black hover:text-white shadow-xl transition-all disabled:opacity-50 group"
          >
             <RefreshCw className={`w-4 h-4 ${isSyncing ? 'animate-spin' : 'group-hover:rotate-180 transition-transform duration-700'}`} />
             {isSyncing ? 'Synchronizing Clinical Stream...' : 'Re-sync Records'}
          </button>
       </div>

       <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {records.length > 0 ? records.map((r) => (
            <AppointmentRow 
               key={r.id} 
               title={r.serviceName} 
               owner="Kindred Medical" 
               time={`${r.slotDate} | ${r.slotTime}`} 
               status={new Date(r.slotDate) > new Date() ? "UPCOMING" : "ARCHIVED"} 
            />
          )) : (
            <div className="col-span-2 p-24 bg-gray-50/50 rounded-[3rem] border border-black/5 flex flex-col items-center justify-center text-center">
               <Layers className="w-12 h-12 text-gray-200 mb-6" />
               <div className="text-[10px] font-black uppercase tracking-widest text-gray-300 italic">No clinical records found in the current stream.</div>
            </div>
          )}
       </div>
    </motion.div>
  );
}

function AppointmentRow({ title, owner, time, status }: { title: string, owner: string, time: string, status: string }) {
  return (
    <div className="bg-white border border-black/5 p-10 rounded-[3rem] flex items-center justify-between shadow-2xl shadow-black/[0.01] hover:shadow-black/[0.04] hover:border-black/20 hover:scale-[1.02] transition-all group">
       <div className="flex items-center gap-10">
          <div className="w-20 h-20 bg-gray-50 rounded-[2rem] flex flex-col items-center justify-center font-bold text-black group-hover:bg-black group-hover:text-white transition-all duration-700 shadow-inner">
             <div className="text-[9px] uppercase tracking-widest opacity-30 group-hover:opacity-100">APR</div>
             <div className="text-2xl font-serif leading-none mt-1">{time.split('-')[2]?.split(' ')[0] || '20'}</div>
          </div>
          <div className="space-y-1">
             <h4 className="text-2xl font-serif italic mb-1 text-black group-hover:tracking-tight transition-all duration-700 leading-tight">{title}</h4>
             <p className="text-[11px] text-gray-400 font-medium italic">{owner} · {time}</p>
          </div>
       </div>
       <div className={`px-5 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest shadow-sm ${
         status === 'UPCOMING' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : 'bg-gray-100 text-gray-400 border border-gray-200'
       }`}>
          {status}
       </div>
    </div>
  );
}
