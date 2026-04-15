"use client";

import { useState } from "react";
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
  const [chatInput, setChatInput] = useState("");
  const [isParsing, setIsParsing] = useState(false);
  const [lockingSlot, setLockingSlot] = useState<number | null>(null);
  const [lockedSlots, setLockedSlots] = useState<number[]>([4]);

  const handleBooking = (id: number) => {
    if (lockedSlots.includes(id)) return;
    setLockingSlot(id);
    setTimeout(() => {
      setLockedSlots(prev => [...prev, id]);
      setLockingSlot(null);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#FDFDFD] text-black font-sans flex overflow-hidden">
      {/* Sidebar */}
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
          <SideNavItem icon={<Search />} label="Clinics Explorer" active={activeTab === "explore"} onClick={() => setActiveTab("explore")} />
          <SideNavItem icon={<Bot />} label="Diagnostic AI" active={activeTab === "ai"} onClick={() => setActiveTab("ai")} />
          <SideNavItem icon={<Calendar />} label="Patient History" active={activeTab === "bookings"} onClick={() => setActiveTab("bookings")} />
          
          <div className="pt-10 px-4 space-y-4">
             <div className="p-5 rounded-3xl bg-black text-white shadow-xl shadow-black/10">
                <HeartPulse className="w-8 h-8 mb-4 text-emerald-500" />
                <h4 className="font-bold text-sm mb-1 tracking-tight">Clinical Assistant</h4>
                <p className="text-[10px] text-white/50 leading-relaxed italic mb-4">"I can triage your request and find the next specialist slot."</p>
                <button className="w-full py-2.5 bg-white text-black rounded-xl text-[10px] font-black uppercase tracking-widest">Start Triage</button>
             </div>
          </div>
        </div>

        <div className="p-6 border-t border-gray-50">
           <Link href="/dashboard/settings" className="w-full flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-black transition-colors font-bold text-sm">
             <Settings className="w-4 h-4" /> Account Health
           </Link>
        </div>
      </aside>

      <main className="flex-1 flex flex-col overflow-y-auto">
        <header className="h-20 bg-white/80 backdrop-blur-md border-b border-gray-100 flex items-center justify-between px-10 sticky top-0 z-10">
          <h2 className="text-xl font-serif text-black italic">Patient Portal</h2>
          <div className="flex items-center gap-6">
             <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-gray-300">
               <ShieldCheck className="w-4 h-4 text-emerald-500" /> Server-side Isolated
             </div>
             <button className="p-2 rounded-xl hover:bg-gray-50 transition-colors relative">
               <Bell className="w-5 h-5 text-gray-400" />
               <span className="absolute top-2 right-2.5 w-2 h-2 bg-black rounded-full ring-2 ring-white" />
            </button>
            <div className="w-10 h-10 rounded-full bg-gray-50 border border-gray-100 flex items-center justify-center font-bold text-xs uppercase shadow-sm">AM</div>
          </div>
        </header>

        <div className="p-10 max-w-7xl mx-auto w-full space-y-12">
           <AnimatePresence mode="wait">
              {activeTab === "explore" && <ExploreMarketSection key="ex" />}
              {activeTab === "ai" && <AIBookingSection key="ai" chatInput={chatInput} setChatInput={setChatInput} isParsing={isParsing} setIsParsing={setIsParsing} handleBooking={handleBooking} lockingSlot={lockingSlot} lockedSlots={lockedSlots} />}
              {activeTab === "bookings" && <MyAppointmentsSection key="bk" />}
           </AnimatePresence>
        </div>
      </main>
    </div>
  );
}

function SideNavItem({ icon, label, active, onClick }: { icon: any, label: string, active?: boolean, onClick: () => void }) {
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
      {active && <motion.div layoutId="nav-pill-cust" className="absolute right-3 w-1.5 h-1.5 bg-white rounded-full" />}
    </button>
  );
}

function ExploreMarketSection() {
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-10">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-5xl font-serif tracking-tight mb-2 text-black">Clinical Search</h1>
          <p className="text-gray-400 font-medium italic">Discover GP, Specialists, and Veterinary experts.</p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
         <MarketCard name="City Medical Group" cat="Healthcare" rating={4.9} image="bg-blue-50" />
         <MarketCard name="Paw & Tail Veterinary" cat="Vet Care" rating={5.0} image="bg-emerald-50" />
         <MarketCard name="Dental Associates" cat="Specialist" rating={4.7} image="bg-gray-50" />
      </div>
    </motion.div>
  );
}

function MarketCard({ name, cat, rating, image }: any) {
  return (
    <div className="bg-white border border-gray-100 p-6 rounded-[2.5rem] shadow-sm hover:shadow-xl transition-all group overflow-hidden">
       <div className={`w-full aspect-video ${image} rounded-3xl mb-6`} />
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
       <button className="w-full py-4 bg-gray-50 rounded-2xl flex items-center justify-center gap-2 text-[10px] font-black uppercase tracking-widest hover:bg-black hover:text-white transition-all shadow-sm">
          Book Consultation <ExternalLink className="w-3.5 h-3.5" />
       </button>
    </div>
  );
}

function AIBookingSection({ chatInput, setChatInput, isParsing, setIsParsing, handleBooking, lockingSlot, lockedSlots }: any) {
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
         <div className="space-y-8">
            <h2 className="text-4xl font-serif text-black">AI Diagnosis Proxy</h2>
            <div className="bg-white rounded-[2.5rem] border border-gray-100 p-8 shadow-sm space-y-6">
               <div className="relative">
                  <textarea value={chatInput} onChange={(e) => setChatInput(e.target.value)} placeholder="Triage request: E.g. Need a checkup for my cat..." className="w-full h-32 bg-gray-50 border border-gray-100 rounded-3xl p-6 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-black/5 resize-none italic" />
                  <button onClick={() => { setIsParsing(true); setTimeout(() => setIsParsing(false), 2000); }} className="absolute right-4 bottom-4 p-4 bg-black text-white rounded-2xl shadow-xl hover:scale-105 transition-all">
                     {isParsing ? <Sparkles className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
                  </button>
               </div>
               <div className="p-6 rounded-3xl bg-black font-mono text-[10px] text-white/40 overflow-hidden relative min-h-[140px]">
                  {isParsing ? "...TRIAGE_IN_PROGRESS..." : chatInput ? <span className="text-emerald-500">INTENT: CLINICAL_BOOKING</span> : "// Waiting for triage signal..."}
               </div>
            </div>
         </div>
         <div className="space-y-8">
            <h3 className="font-bold flex items-center gap-2 text-black"><Layers className="w-5 h-5 text-gray-300" /> Resource locking</h3>
            <div className="grid grid-cols-2 gap-4">
               {["09:00 AM", "10:30 AM", "12:00 PM", "02:30 PM", "04:00 PM", "05:30 PM"].map((time, i) => {
                  const id = i+1;
                  const isLocked = lockedSlots.includes(id);
                  const isLocking = lockingSlot === id;
                  return (
                    <button key={id} onClick={() => handleBooking(id)} disabled={isLocked || isLocking} className={`p-6 rounded-3xl border text-left transition-all ${isLocked ? 'bg-gray-100 border-gray-100 opacity-50 grayscale' : isLocking ? 'border-black bg-white scale-95 shadow-lg' : 'bg-white border-gray-100 hover:border-black/20 hover:shadow-xl'}`}>
                       <div className="flex justify-between items-center mb-6">
                          <Clock className={`w-4 h-4 ${isLocked ? 'text-gray-200' : 'text-gray-400'}`} />
                          {isLocking && <RefreshCw className="w-4 h-4 animate-spin text-black" />}
                          {isLocked && <Lock className="w-4 h-4 text-gray-300" />}
                       </div>
                       <div className={`font-bold text-lg ${isLocked ? 'text-gray-300' : 'text-black'}`}>{time}</div>
                       <div className="text-[9px] font-black uppercase tracking-widest text-gray-300 mt-1">{isLocked ? 'LOCKED_IO' : 'AVAILABLE'}</div>
                    </button>
                  );
               })}
            </div>
         </div>
      </div>
    </motion.div>
  );
}

function MyAppointmentsSection() {
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-10">
       <div className="flex justify-between items-end">
          <h1 className="text-4xl font-serif text-black italic">Patient Itinerary</h1>
          <button className="flex items-center gap-2 px-6 py-3 bg-white border border-gray-100 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-gray-50 shadow-sm text-black">
             <RefreshCw className="w-4 h-4 text-black" /> Re-sync Records
          </button>
       </div>
       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <AppointmentRow title="Checkup (Max)" owner="Paw & Tail" time="Tuesday, 10:30 AM" status="CONFIRMED" />
          <AppointmentRow title="Dental Cleaning" owner="Dental Assoc." time="Friday, 02:00 PM" status="FOLLOWUP" />
       </div>
    </motion.div>
  );
}

function AppointmentRow({ title, owner, time, status }: any) {
  return (
    <div className="bg-white border border-gray-100 p-8 rounded-[2.5rem] flex items-center justify-between shadow-sm hover:scale-[1.01] transition-all">
       <div className="flex items-center gap-8">
          <div className="w-16 h-16 bg-gray-50 rounded-2xl flex flex-col items-center justify-center font-bold text-black group-hover:bg-black group-hover:text-white transition-colors duration-500">
             <div className="text-[8px] uppercase opacity-40">OCT</div>
             <div className="text-xl font-serif leading-none mt-1">24</div>
          </div>
          <div>
             <h4 className="text-lg font-bold mb-1 text-black">{title}</h4>
             <p className="text-xs text-gray-400 italic">{owner} · {time}</p>
          </div>
       </div>
       <div className={`px-4 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest ${status === 'CONFIRMED' ? 'bg-emerald-50 text-emerald-600' : 'bg-gray-100 text-gray-400'}`}>
          {status}
       </div>
    </div>
  );
}
