"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Calendar, Clock, User, Phone, Mail, ChevronRight, 
  Search, Filter, MoreHorizontal, CheckCircle2, 
  AlertCircle, ArrowLeft, LayoutDashboard, CalendarDays
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

  useEffect(() => {
    const fetchBookings = () => {
      const saved = localStorage.getItem("flexslot_bookings");
      if (saved) {
        setBookings(JSON.parse(saved).reverse());
      }
      setLoading(false);
    };

    fetchBookings();
    window.addEventListener('storage', fetchBookings);
    return () => window.removeEventListener('storage', fetchBookings);
  }, []);

  const filteredBookings = bookings.filter(b => 
    b.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    b.serviceName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#FDFDFD] text-black font-sans flex flex-col">
      {/* Header */}
      <header className="h-24 bg-white/80 backdrop-blur-xl border-b border-gray-100 flex items-center justify-between px-10 sticky top-0 z-50">
        <div className="flex items-center gap-6">
          <Link href="/dashboard/owner" className="p-3 hover:bg-gray-50 rounded-2xl transition-all group">
            <ArrowLeft className="w-5 h-5 text-gray-400 group-hover:text-black" />
          </Link>
          <div>
            <h1 className="text-2xl font-serif italic mb-1">Upcoming Appointments</h1>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[10px] font-black uppercase tracking-widest text-emerald-500">Live Provider Stream</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative hidden md:block">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" />
            <input 
              type="text" 
              placeholder="Search patients..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 pr-6 py-3 bg-gray-50 border border-gray-100 rounded-2xl text-[13px] font-bold w-64 focus:outline-none focus:ring-2 focus:ring-black/5"
            />
          </div>
          <button className="p-3 bg-black text-white rounded-2xl shadow-xl hover:scale-105 transition-all">
            <Filter className="w-5 h-5" />
          </button>
        </div>
      </header>

      <main className="flex-1 p-10 max-w-6xl mx-auto w-full">
        {loading ? (
          <div className="h-96 flex flex-col items-center justify-center gap-4">
            <div className="w-12 h-12 border-4 border-gray-100 border-t-black rounded-full animate-spin" />
            <span className="text-xs font-black uppercase tracking-widest text-gray-300 font-mono italic">Fetching Secure Records...</span>
          </div>
        ) : filteredBookings.length > 0 ? (
          <div className="space-y-6">
            <AnimatePresence mode="popLayout">
              {filteredBookings.map((booking, idx) => (
                <motion.div
                  key={booking.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ delay: idx * 0.05 }}
                  className="bg-white border border-gray-100 p-8 rounded-[2.5rem] shadow-sm hover:shadow-xl hover:border-black/5 transition-all group relative overflow-hidden"
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 h-full">
                    {/* Time & Card */}
                    <div className="flex items-center gap-8">
                      <div className="w-24 h-24 bg-gray-50 rounded-[2rem] flex flex-col items-center justify-center border border-gray-100 group-hover:bg-black group-hover:text-white transition-all">
                        <div className="text-[10px] font-black uppercase mb-1 opacity-50">{booking.slotDate.split('-')[1]}</div>
                        <div className="text-3xl font-serif">{booking.slotDate.split('-')[2]}</div>
                      </div>
                      
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <h2 className="text-2xl font-bold tracking-tight">{booking.clientName}</h2>
                          <span className="px-3 py-1 bg-emerald-50 text-emerald-600 text-[10px] font-black uppercase tracking-widest rounded-lg border border-emerald-100">Confirmed</span>
                        </div>
                        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400 font-medium italic">
                          <span className="flex items-center gap-2"><Clock className="w-4 h-4" /> {booking.slotTime}</span>
                          <span className="flex items-center gap-2"><CalendarDays className="w-4 h-4" /> {booking.slotDate}</span>
                          <span className="flex items-center gap-2 font-bold text-black opacity-40 uppercase tracking-widest text-[9px]"><Hash className="w-3 h-3" /> {booking.serviceName}</span>
                        </div>
                      </div>
                    </div>

                    {/* Contact & Actions */}
                    <div className="flex flex-col md:items-end gap-3 text-right">
                      <div className="flex gap-2">
                        <button className="p-3 bg-gray-50 hover:bg-green-50 hover:text-green-600 rounded-xl transition-all" title="Call Patient">
                          <Phone className="w-4 h-4" />
                        </button>
                        <button className="p-3 bg-gray-50 hover:bg-blue-50 hover:text-blue-600 rounded-xl transition-all" title="Email Patient">
                          <Mail className="w-4 h-4" />
                        </button>
                        <button className="p-3 bg-gray-50 hover:bg-gray-100 rounded-xl transition-all">
                          <MoreHorizontal className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="text-[9px] font-black text-gray-300 uppercase tracking-[0.2em] font-mono italic">
                        UID_{booking.id.split('-').pop()}
                      </div>
                    </div>
                  </div>
                  
                  {/* Visual Background Accent */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gray-50/50 rounded-bl-[5rem] -z-10 group-hover:bg-black/5 transition-colors" />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        ) : (
          <div className="py-24 text-center">
            <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
              {searchQuery ? <AlertCircle className="w-10 h-10 text-gray-200" /> : <Calendar className="w-10 h-10 text-gray-200" />}
            </div>
            <h3 className="text-xl font-bold mb-2">
              {searchQuery ? `No results for "${searchQuery}"` : "No upcoming appointments"}
            </h3>
            <p className="text-gray-400 italic">
              {searchQuery ? "Try a different patient name or treatment type." : "When clients book slots, they will appear here in real-time."}
            </p>
          </div>
        )}
      </main>

      {/* Floating Dashboard Link */}
      <div className="fixed bottom-10 right-10 z-50">
        <Link 
          href="/dashboard" 
          className="flex items-center gap-3 bg-black text-white px-8 py-4 rounded-2xl font-bold shadow-2xl hover:scale-105 transition-all"
        >
          <LayoutDashboard className="w-5 h-5" />
          Dashboard
        </Link>
      </div>
    </div>
  );
}

function Hash({ className }: { className?: string }) {
  return (
    <svg 
      className={className} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      <line x1="4" y1="9" x2="20" y2="9" /><line x1="4" y1="15" x2="20" y2="15" /><line x1="10" y1="3" x2="8" y2="21" /><line x1="16" y1="3" x2="14" y2="21" />
    </svg>
  );
}
