"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Calendar, Clock, Plus, Trash2, Check, AlertCircle, 
  ChevronLeft, ChevronRight, Filter, Settings, Zap, Release
} from "lucide-react";
import Link from "next/link";

interface Slot {
  id: string;
  start_time: string;
  end_time: string;
  status: "available" | "booked" | "blocked";
}

export default function SchedulerPage() {
  const [slots, setSlots] = useState<Slot[]>([]);
  const [loading, setLoading] = useState(true);
  const [isReleasing, setIsReleasing] = useState(false);
  
  // Bulk Create State
  const [bulkDate, setBulkDate] = useState(new Date().toISOString().split('T')[0]);
  const [startTime, setStartTime] = useState("09:00");
  const [endTime, setEndTime] = useState("17:00");
  const [duration, setDuration] = useState(30);
  const [slotCount, setSlotCount] = useState<number | "">("");
  
  // AI State
  const [aiCommand, setAiCommand] = useState("");
  const [isAiProcessing, setIsAiProcessing] = useState(false);

  const fetchSlots = async () => {
    try {
      const clinicId = localStorage.getItem("flexslot_clinic_id") || "dummy-clinic-id";
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/scheduler/`, {
        headers: { "X-Clinic-ID": clinicId }
      });
      const data = await res.json();
      setSlots(data);
    } catch (err) {
      console.error("Failed to fetch slots:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSlots();
  }, []);

  const handleBulkRelease = async () => {
    setIsReleasing(true);
    try {
      const clinicId = localStorage.getItem("flexslot_clinic_id") || "dummy-clinic-id";
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/scheduler/bulk-create`, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "X-Clinic-ID": clinicId 
        },
        body: JSON.stringify({
          date: bulkDate,
          start_time: startTime,
          end_time: endTime,
          slot_duration: duration,
          number_of_slots: slotCount || null
        })
      });
      if (res.ok) {
        await fetchSlots();
        alert("Inventory Registry Updated.");
      }
    } catch (err) {
      console.error("Failed to release slots:", err);
    } finally {
      setIsReleasing(false);
    }
  };

  const handleAiRelease = async () => {
    if (!aiCommand) return;
    setIsAiProcessing(true);
    try {
        // In a real app, this would call a backend endpoint that uses Groq
        // For now, we simulate the "Best Method" of AI parsing
        console.log("AI Parsing command:", aiCommand);
        
        // Mocking AI parsing result
        const mockResult = {
            date: new Date().toISOString().split('T')[0],
            start_time: "08:00",
            end_time: "12:00",
            slot_duration: 20,
            number_of_slots: 10
        };

        // Update UI with AI suggestions
        setBulkDate(mockResult.date);
        setStartTime(mockResult.start_time);
        setEndTime(mockResult.end_time);
        setDuration(mockResult.slot_duration);
        setSlotCount(mockResult.number_of_slots);
        
        alert("AI interpreted your command. Review settings below.");
    } catch (err) {
        console.error("AI Error:", err);
    } finally {
        setIsAiProcessing(false);
    }
  };


  const toggleSlotStatus = async (slotId: string, currentStatus: string) => {
    const newStatus = currentStatus === "available" ? "blocked" : "available";
    try {
      const clinicId = localStorage.getItem("flexslot_clinic_id") || "dummy-clinic-id";
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/scheduler/${slotId}`, {
        method: "PATCH",
        headers: { 
          "Content-Type": "application/json",
          "X-Clinic-ID": clinicId 
        },
        body: JSON.stringify({ status: newStatus })
      });
      setSlots(slots.map(s => s.id === slotId ? { ...s, status: newStatus as any } : s));
    } catch (err) {
      console.error("Failed to update slot:", err);
    }
  };

  const deleteSlot = async (slotId: string) => {
    if (!confirm("Are you sure you want to delete this slot?")) return;
    try {
      const clinicId = localStorage.getItem("flexslot_clinic_id") || "dummy-clinic-id";
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/scheduler/${slotId}`, {
        method: "DELETE",
        headers: { "X-Clinic-ID": clinicId }
      });
      setSlots(slots.filter(s => s.id !== slotId));
    } catch (err) {
      console.error("Failed to delete slot:", err);
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0A0B] text-white p-8 font-sans">
      {/* Header */}
      <header className="flex items-center justify-between mb-12">
        <div>
          <div className="flex items-center gap-2 text-maroon-500 mb-2">
            <Zap className="w-4 h-4 fill-current" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em]">Sigma Engine</span>
          </div>
          <h1 className="text-4xl font-black italic uppercase tracking-tighter">Slot <span className="text-white/40 not-italic">Scheduler</span></h1>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl flex items-center gap-3">
             <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
             <span className="text-xs font-bold uppercase tracking-widest text-white/60">Live Sync Active</span>
          </div>
          <Link href="/dashboard/owner" className="p-3 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-colors">
            <ChevronLeft className="w-5 h-5" />
          </Link>
        </div>
      </header>

      <div className="grid lg:grid-cols-3 gap-12">
        {/* Release Panel */}
        <section className="space-y-8">
          {/* AI Smart Command */}
          <div className="bg-gradient-to-br from-maroon-900/40 to-[#111112] border border-maroon-500/30 rounded-[2rem] p-8 space-y-4">
             <div className="flex items-center gap-2">
                <Bot className="w-5 h-5 text-maroon-500" />
                <h2 className="text-sm font-black uppercase tracking-widest italic">AI Smart Release</h2>
             </div>
             <textarea 
               value={aiCommand}
               onChange={(e) => setAiCommand(e.target.value)}
               placeholder="e.g. Release 10 slots of 20 mins each starting from 8 AM tomorrow"
               className="w-full bg-black/40 border border-white/5 rounded-2xl p-4 text-xs font-medium placeholder:text-white/10 outline-none focus:border-maroon-500/50 min-h-[100px] resize-none"
             />
             <button 
               onClick={handleAiRelease}
               disabled={isAiProcessing}
               className="w-full py-3 bg-white/5 border border-white/10 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-white/10 transition-all flex items-center justify-center gap-2"
             >
               {isAiProcessing ? "Thinking..." : "AI Sync Engine"}
             </button>
          </div>

          <div className="bg-[#111112] border border-white/10 rounded-[2rem] p-8 space-y-6">
            <h2 className="text-xl font-bold uppercase tracking-tight flex items-center gap-2">
              <Plus className="w-5 h-5 text-maroon-500" /> Release Configuration
            </h2>
            
            <div className="space-y-4">
              <div>
                <label className="text-[10px] font-black uppercase tracking-widest text-white/40 block mb-2">Target Date</label>
                <input 
                  type="date" 
                  value={bulkDate}
                  onChange={(e) => setBulkDate(e.target.value)}
                  className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-maroon-500 outline-none transition-colors"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] font-black uppercase tracking-widest text-white/40 block mb-2">Start Time</label>
                  <input 
                    type="time" 
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                    className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-maroon-500 outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-black uppercase tracking-widest text-white/40 block mb-2">End Time</label>
                  <input 
                    type="time" 
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                    className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-maroon-500 outline-none transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] font-black uppercase tracking-widest text-white/40 block mb-2">Slot Duration</label>
                  <select 
                    value={duration}
                    onChange={(e) => setDuration(parseInt(e.target.value))}
                    className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-maroon-500 outline-none transition-colors appearance-none"
                  >
                    <option value={15}>15 Mins</option>
                    <option value={20}>20 Mins</option>
                    <option value={30}>30 Mins</option>
                    <option value={45}>45 Mins</option>
                    <option value={60}>60 Mins</option>
                  </select>
                </div>
                <div>
                  <label className="text-[10px] font-black uppercase tracking-widest text-white/40 block mb-2">Slot Count (Optional)</label>
                  <input 
                    type="number" 
                    placeholder="Auto"
                    value={slotCount}
                    onChange={(e) => setSlotCount(e.target.value ? parseInt(e.target.value) : "")}
                    className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-maroon-500 outline-none transition-colors"
                  />
                </div>
              </div>

              <button 
                onClick={handleBulkRelease}
                disabled={isReleasing}
                className="w-full py-4 bg-maroon-600 hover:bg-maroon-500 text-white rounded-2xl font-black uppercase tracking-[0.2em] text-xs shadow-[0_0_30px_-5px_rgba(128,0,0,0.5)] transition-all active:scale-95 flex items-center justify-center gap-3"
              >
                {isReleasing ? "Engine Processing..." : "Execute Release"}
              </button>
            </div>
          </div>


          <div className="bg-maroon-900/10 border border-maroon-500/20 rounded-2xl p-6 flex gap-4">
             <AlertCircle className="w-5 h-5 text-maroon-500 shrink-0" />
             <p className="text-xs text-maroon-200/60 leading-relaxed font-medium">
               Slots are released instantly to the Patient Portal. Ensure your staff availability matches the selected range.
             </p>
          </div>
        </section>

        {/* Slots List / Calendar View */}
        <section className="lg:col-span-2">
          <div className="bg-[#111112] border border-white/10 rounded-[2rem] p-8 min-h-[600px]">
             <div className="flex items-center justify-between mb-8">
                <h2 className="text-xl font-bold uppercase tracking-tight flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-white/40" /> Active Inventory
                </h2>
                <div className="flex gap-2">
                   <button className="p-2 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition-colors">
                      <Filter className="w-4 h-4 text-white/40" />
                   </button>
                   <button className="p-2 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition-colors">
                      <Settings className="w-4 h-4 text-white/40" />
                   </button>
                </div>
             </div>

             {loading ? (
               <div className="flex items-center justify-center h-64 text-white/20 uppercase font-black tracking-widest text-xs animate-pulse">
                 Synchronizing Registry...
               </div>
             ) : slots.length === 0 ? (
               <div className="flex flex-col items-center justify-center h-64 text-center">
                 <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-4">
                    <Clock className="w-8 h-8 text-white/10" />
                 </div>
                 <p className="text-white/40 font-bold uppercase tracking-widest text-[10px]">No slots released yet</p>
               </div>
             ) : (
               <div className="grid md:grid-cols-2 gap-4">
                 <AnimatePresence>
                   {slots.map((slot) => (
                     <motion.div
                       key={slot.id}
                       initial={{ opacity: 0, scale: 0.95 }}
                       animate={{ opacity: 1, scale: 1 }}
                       exit={{ opacity: 0, scale: 0.9 }}
                       className={`p-6 rounded-[1.5rem] border transition-all ${
                         slot.status === 'booked' 
                           ? 'bg-white/5 border-white/10 opacity-50' 
                           : slot.status === 'blocked'
                           ? 'bg-zinc-900 border-white/5'
                           : 'bg-black border-white/10 hover:border-maroon-500/50'
                       }`}
                     >
                       <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-3">
                             <div className={`w-2 h-2 rounded-full ${
                               slot.status === 'available' ? 'bg-maroon-500' : 'bg-white/20'
                             }`} />
                             <span className="text-[10px] font-black uppercase tracking-widest text-white/40">
                               {new Date(slot.start_time).toLocaleDateString()}
                             </span>
                          </div>
                          <div className="flex items-center gap-2">
                             <button 
                               onClick={() => toggleSlotStatus(slot.id, slot.status)}
                               className="p-1.5 hover:bg-white/10 rounded-lg transition-colors text-white/40 hover:text-white"
                             >
                               <Check className="w-3.5 h-3.5" />
                             </button>
                             <button 
                               onClick={() => deleteSlot(slot.id)}
                               className="p-1.5 hover:bg-white/10 rounded-lg transition-colors text-white/40 hover:text-red-500"
                             >
                               <Trash2 className="w-3.5 h-3.5" />
                             </button>
                          </div>
                       </div>
                       
                       <div className="text-2xl font-black italic tracking-tighter uppercase">
                         {new Date(slot.start_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                         <span className="text-white/20 not-italic font-medium mx-2">—</span>
                         {new Date(slot.end_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                       </div>
                     </motion.div>
                   ))}
                 </AnimatePresence>
               </div>
             )}
          </div>
        </section>
      </div>

      <style jsx global>{`
        ::-webkit-calendar-picker-indicator {
          filter: invert(1);
        }
      `}</style>
    </div>
  );
}
