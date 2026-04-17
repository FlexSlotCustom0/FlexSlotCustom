"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Calendar, Clock, User, Phone, Mail, ChevronRight, 
  Search, Filter, MoreHorizontal, CheckCircle2, 
  AlertCircle, ArrowLeft, LayoutDashboard, CalendarDays, Sparkles
} from "lucide-react";
import Link from "next/link";

interface Booking {
  id: string;
  clinicId: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  serviceName: string;
  slotTime: string;
  slotDate: string;
  createdAt: string;
}

export default function UpcomingAppointments() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTheme, setActiveTheme] = useState("clinic-clean");

  useEffect(() => {
    const fetchBookings = () => {
      const saved = localStorage.getItem("flexslot_bookings");
      const theme = localStorage.getItem("flexslot_active_template") || "clinic-clean";
      setActiveTheme(theme);
      if (saved) {
        setBookings(JSON.parse(saved).reverse());
      }
      setLoading(false);
    };

    fetchBookings();
    window.addEventListener('storage', fetchBookings);
    return () => window.removeEventListener('storage', fetchBookings);
  }, []);

  const getThemeAccent = () => {
    switch(activeTheme) {
      case 'paws-premium': return 'emerald';
      case 'pulse-modern': return 'indigo';
      case 'vet-warm': return 'orange';
      case 'wild-med': return 'green';
      default: return 'black';
    }
  };

  const accent = getThemeAccent();

  const filteredBookings = bookings.filter(b => 
    b.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    b.serviceName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const groupedBookings = filteredBookings.reduce((acc: any, b) => {
    if (!acc[b.slotDate]) acc[b.slotDate] = [];
    acc[b.slotDate].push(b);
    return acc;
  }, {});

  const sortedDates = Object.keys(groupedBookings).sort();

  const cancelBooking = (id: string) => {
    const next = bookings.filter(b => b.id !== id);
    setBookings(next);
    localStorage.setItem("flexslot_bookings", JSON.stringify(next.reverse()));
  };

  return (
    <div className={`min-h-screen bg-[#FDFDFD] text-black font-sans flex flex-col transition-colors duration-1000`}>
      {/* Mesh Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
        <div className={`absolute top-[-10%] right-[-10%] w-[500px] h-[500px] opacity-10 rounded-full blur-[120px] ${accent === 'black' ? 'bg-gray-400' : `bg-${accent}-500`}`} />
        <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] bg-gray-50 rounded-full blur-[100px]" />
      </div>

      <header className="h-28 bg-white/40 backdrop-blur-3xl border-b border-black/5 flex items-center justify-between px-12 sticky top-0 z-[100]">
        <div className="flex items-center gap-10">
          <Link href="/dashboard/owner" className="p-4 bg-white rounded-2xl border border-black/5 shadow-sm hover:scale-105 transition-all text-black group">
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          </Link>
          <div className="space-y-1">
             <div className="flex items-center gap-3">
               <h1 className="text-5xl font-serif font-black italic tracking-tight text-black">Live Clinical Feed</h1>
             </div>

          </div>
        </div>

        <div className="flex items-center gap-6">
          <div className="relative">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-black/20" />
            <input 
              type="text" 
              placeholder="Search patients or treatments..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-14 pr-8 py-5 bg-white border border-black/5 rounded-[2rem] text-[13px] font-bold w-96 shadow-sm focus:outline-none focus:ring-2 focus:ring-black focus:bg-white transition-all"
            />
          </div>
        </div>
      </header>

      <main className="flex-1 p-12 max-w-7xl mx-auto w-full">
        {loading ? (
          <div className="h-[60vh] flex flex-col items-center justify-center gap-6">
            <div className={`w-16 h-16 border-4 border-gray-100 border-t-black rounded-full animate-spin`} />
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-black animate-pulse">Establishing Secure Clinical Handshake...</span>
          </div>
        ) : sortedDates.length > 0 ? (
          <div className="space-y-24">
            {sortedDates.map((date, dIdx) => (
              <div key={date} className="relative grid grid-cols-[160px_1fr] gap-16">
                {/* Vertical Date Pillar */}
                <div className="sticky top-40 h-fit text-right space-y-2 mt-4">
                  <span className="text-sm font-black text-black/20 uppercase tracking-[0.3em] font-mono">{new Date(date).toLocaleDateString('en-US', { weekday: 'short' })}</span>
                  <h2 className="text-7xl font-serif font-black italic text-black/5 leading-none mb-[-1rem] pr-2">{new Date(date).getDate()}</h2>
                  <h3 className="text-3xl font-serif font-bold italic text-black pr-4 border-r-4 border-black border-opacity-10">
                    {new Date(date).toLocaleDateString('en-US', { month: 'short' })}
                  </h3>
                </div>

                {/* Content Stream */}
                <div className="space-y-8">
                  <AnimatePresence mode="popLayout">
                    {groupedBookings[date].map((booking: any, idx: number) => (
                      <motion.div
                        key={booking.id}
                        layout
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ delay: idx * 0.1 }}
                        className="bg-white/80 backdrop-blur-xl border border-black/5 p-10 rounded-[3rem] shadow-2xl shadow-black/[0.02] hover:shadow-black/[0.1] hover:border-black/20 transition-all group relative overflow-hidden"
                      >
                        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-12">
                          <div className="flex items-center gap-10">
                            {/* Time Badge */}
                            <div className="relative">
                               <div className="w-28 h-28 bg-gray-50 rounded-[2.5rem] flex flex-col items-center justify-center border border-black/5 group-hover:bg-black group-hover:text-white transition-all duration-500 shadow-inner">
                                  <Clock className="w-5 h-5 mb-2 opacity-30 group-hover:opacity-100" />
                                  <div className="text-lg font-black tracking-tight">{booking.slotTime.split(' ')[0]}</div>
                                  <div className="text-[9px] font-black uppercase tracking-widest opacity-40">{booking.slotTime.split(' ')[1]}</div>
                               </div>
                            </div>
                            
                            <div className="space-y-3">
                              <div className="flex items-center gap-4">
                                <h4 className="text-4xl font-serif font-black italic text-black group-hover:tracking-wider transition-all duration-700">{booking.clientName}</h4>
                              </div>
                              <div className="flex flex-wrap items-center gap-6">
                                <div className="flex items-center gap-2 group/info">
                                  <div className={`p-2 bg-${accent}-500/10 text-${accent}-500 rounded-lg group-hover/info:bg-black group-hover/info:text-white transition-colors`}>
                                     <CalendarDays className="w-3.5 h-3.5" />
                                  </div>
                                  <span className="text-[10px] font-black uppercase tracking-widest text-black/40">{booking.serviceName}</span>
                                </div>
                                <div className="h-4 w-px bg-black/5 hidden md:block" />
                                <div className="flex items-center gap-2">
                                  <Phone className="w-3.5 h-3.5 text-black/20" />
                                  <span className="text-[11px] font-bold font-mono text-black/60 italic">{booking.clientPhone}</span>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="flex lg:flex-col items-end gap-6 h-full justify-between">
                             <div className="flex gap-3">
                                <a href={`tel:${booking.clientPhone}`} className="p-5 bg-gray-50 hover:bg-black hover:text-white rounded-[1.5rem] transition-all duration-300 shadow-sm border border-black/5">
                                  <Phone className="w-4 h-4" />
                                </a>
                                <a href={`mailto:${booking.clientEmail}`} className="p-5 bg-gray-50 hover:bg-black hover:text-white rounded-[1.5rem] transition-all duration-300 shadow-sm border border-black/5">
                                  <Mail className="w-4 h-4" />
                                </a>
                                <button 
                                  onClick={() => cancelBooking(booking.id)}
                                  className="p-5 bg-gray-50 hover:bg-red-500 hover:text-white rounded-[1.5rem] transition-all duration-300 shadow-sm border border-black/5"
                                >
                                  <CheckCircle2 className="w-4 h-4" />
                                </button>
                             </div>
                             <div className="flex items-center gap-3">
                                <span className="text-[9px] font-black text-black/20 uppercase tracking-[0.3em] font-mono">ID_{booking.id.split('-').pop()}</span>
                                <div className="w-12 h-[2px] bg-black/5" />
                                <span className="text-[10px] font-black text-black font-serif italic">Active Consultation</span>
                             </div>
                          </div>
                        </div>
                        
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 pointer-events-none" />
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="min-h-[50vh] flex flex-col items-center justify-center text-center">
            <div className="w-32 h-32 bg-gray-50 rounded-full flex items-center justify-center border border-black/5 mb-8 shadow-inner">
               <AlertCircle className="w-12 h-12 text-gray-200" />
            </div>
            <h3 className="text-3xl font-serif font-black italic mb-3">No Signals Detected</h3>
            <p className="max-w-md text-gray-400 font-medium italic">
              {searchQuery ? `The patient database found zero matches for "${searchQuery}". Try refining your clinical query.` : "Your live feed is currently silent. Real-time patient requests will broadcast here as they occur."}
            </p>
          </div>
        )}
      </main>

      <div className="fixed bottom-12 right-12 z-[200]">
        <Link 
          href="/dashboard/owner" 
          className="group flex items-center gap-4 bg-black text-white pr-10 pl-8 py-5 rounded-[2rem] font-black text-[11px] uppercase tracking-[0.2em] shadow-[0_20px_50px_rgba(0,0,0,0.3)] hover:scale-[1.05] active:scale-95 transition-all"
        >
          <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center group-hover:rotate-12 transition-transform">
             <LayoutDashboard className="w-4 h-4 text-white" />
          </div>
          Return to HQ
        </Link>
      </div>
    </div>
  );
}
