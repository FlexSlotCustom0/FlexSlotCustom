"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Activity, Stethoscope, Phone, Mail as MailIcon } from "lucide-react";
import { MetricBox } from "../shared/MetricBox";
import { Badge } from "../shared/Badge";
import { StatusLegend } from "../shared/StatusLegend";

export function DashboardCommandCenter({ bookings, doneCount, notesCount, onComplete }: any) {
  const ongoing = bookings[0];
  const upcoming = bookings.slice(1, 5);

  return (
    <div className="grid grid-cols-12 gap-8">
      {/* Left Column - Clinical Overview & Stream */}
      <div className="col-span-8 space-y-8">
        <div className="bg-white border border-black/5 rounded-[1.5rem] p-4 shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-2">
              <h3 className="text-[10px] font-black uppercase tracking-widest">Appointments</h3>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <MetricBox label="Total Attended" value={doneCount.toString()} />
            <MetricBox label="Total Pending" value={bookings.length.toString()} />
            <div className="bg-black/5 rounded-[1.25rem] p-4 flex flex-col items-center justify-center text-center min-h-[100px]">
              <h4 className="text-[8px] font-black uppercase tracking-widest text-black/30 mb-2">Clinical Notes</h4>
              <div className="relative w-12 h-12 mb-2">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="40" fill="transparent" stroke="rgba(0,0,0,0.05)" strokeWidth="12" />
                  <motion.circle
                    cx="50" cy="50" r="40" fill="transparent" stroke="black" strokeWidth="12"
                    strokeDasharray="251.2"
                    initial={{ strokeDashoffset: 251.2 }}
                    animate={{ strokeDashoffset: 251.2 - (notesCount * 25.12) }}
                    transition={{ duration: 1 }}
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center font-black text-sm italic">{notesCount}</div>
              </div>
              <p className="text-[8px] font-bold text-black/30 uppercase tracking-widest">Notes: {notesCount}</p>
            </div>
          </div>
        </div>

        {/* Integrated Ongoing & Upcoming Feed */}
        <div className="space-y-6">
          <AnimatePresence mode="wait">
            {ongoing ? (
              <motion.div 
                key={ongoing.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="bg-emerald-50/80 backdrop-blur-3xl text-black rounded-[2rem] p-5 shadow-[0_24px_48px_rgba(16,185,129,0.08)] relative overflow-hidden group"
              >
                {/* Futuristic Background Accents */}
                <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-400/10 rounded-full blur-[80px] -mr-24 -mt-24" />
                
                <div className="relative z-10 flex flex-col gap-4">
                  {/* Top Row: Meta & Timer */}
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-white/50 rounded-xl flex items-center justify-center backdrop-blur-3xl">
                        <Activity className="w-4 h-4 text-emerald-500 animate-pulse" />
                      </div>
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-2">
                           <span className="text-[8px] font-black uppercase tracking-widest px-1.5 py-0.5 bg-emerald-500/20 text-emerald-600 rounded">ID: {ongoing.id.slice(0, 8)}</span>
                           <span className="text-[8px] font-black uppercase tracking-widest px-1.5 py-0.5 bg-black/5 text-black/60 rounded">Room_01</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex gap-1.5">
                       <Badge label="24 YRS" color="bg-black/5" />
                       <Badge label="MALE" color="bg-black/5" />
                       <Badge label="O+" color="bg-emerald-500/10 text-emerald-600" />
                    </div>
                  </div>

                  {/* Middle Row: Patient Name & Reason */}
                  <div className="flex items-end justify-between gap-4">
                    <div className="space-y-1">
                      <h2 className="text-4xl font-black tracking-tighter uppercase italic leading-none text-transparent bg-clip-text bg-gradient-to-br from-black to-black/40">{ongoing.clientName}</h2>
                      <div className="flex items-center gap-2 pt-1">
                        <span className="px-2 py-0.5 bg-emerald-500 text-white text-[8px] font-black uppercase tracking-widest rounded-full">Routine Checkup</span>
                        <p className="text-black/40 text-[8px] font-bold uppercase tracking-[0.2em] italic">Consultation In_Progress</p>
                      </div>
                    </div>
                    
                    <button 
                      onClick={onComplete}
                      className="px-5 py-2.5 bg-black text-white rounded-lg font-black text-[9px] uppercase tracking-widest hover:bg-emerald-600 transition-all shadow-[0_10px_20px_rgba(0,0,0,0.1)] active:scale-95 shrink-0"
                    >
                      Complete
                    </button>
                  </div>

                  {/* Footer Row: Doctor info */}
                  <div className="pt-3 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-black/5 flex items-center justify-center">
                         <Stethoscope size={10} className="text-emerald-500" />
                      </div>
                      <div>
                         <p className="text-[8px] font-black text-black/80 uppercase tracking-widest italic">{ongoing.practitioner}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ) : (
              <div className="p-20 border-2 border-dashed border-black/5 rounded-[3rem] text-center text-black/20 font-black uppercase tracking-widest italic">
                Shift Stream Terminated.
              </div>
            )}
          </AnimatePresence>

          {/* Upcoming Feed List */}
          <div className="bg-white border border-black/5 rounded-[3rem] p-10 shadow-sm space-y-8">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-black uppercase tracking-tighter italic">Upcoming Feed</h3>
              <span className="text-[10px] font-black uppercase tracking-widest text-black/20 italic">{upcoming.length} Signals_Queued</span>
            </div>

            <div className="space-y-2">
              <AnimatePresence mode="popLayout">
                {upcoming.map((u: any, i: number) => (
                  <motion.div
                    key={u.id}
                    layout
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-center justify-between p-6 rounded-[2rem] hover:bg-black/5 transition-all group"
                  >
                    <div className="flex items-center gap-6">
                      <div className="w-12 h-12 bg-black/5 rounded-2xl flex flex-col items-center justify-center group-hover:bg-black group-hover:text-white transition-all">
                        <span className="text-[10px] font-black leading-none">{u.slotTime.split(' ')[0]}</span>
                        <span className="text-[8px] font-black opacity-40 uppercase">{u.slotTime.split(' ')[1]}</span>
                      </div>
                      <div>
                        <h4 className="text-lg font-black uppercase tracking-tighter italic">{u.clientName}</h4>
                        <p className="text-[10px] font-bold text-black/30 uppercase tracking-widest italic">{u.serviceName} · {u.practitioner}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button className="p-4 text-black/20 hover:text-black hover:bg-white rounded-2xl transition-all shadow-none hover:shadow-sm"><Phone size={16} /></button>
                      <button className="p-4 text-black/20 hover:text-black hover:bg-white rounded-2xl transition-all shadow-none hover:shadow-sm"><MailIcon size={16} /></button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>

      {/* Right Column - Status Analytics & New Clients */}
      <div className="col-span-4 space-y-8">
        <div className="bg-white border border-black/5 rounded-[2.5rem] p-10 shadow-sm relative overflow-hidden">
          <div className="flex justify-between items-center mb-8 relative z-10">
            <div className="flex items-center gap-3">
              <h3 className="text-sm font-black uppercase tracking-widest">Status Feed</h3>
            </div>
            <div className="text-[10px] font-black uppercase tracking-widest text-black/20 italic">6/5/26</div>
          </div>

          <div className="flex items-end gap-6 h-48 border-b border-black/5 pb-6 mb-6 px-4 relative">
            <motion.div
              animate={{ height: `${Math.min(90, (doneCount * 10) + 10)}%` }}
              className="flex-1 bg-black rounded-t-xl shadow-2xl relative group"
            >
              <div className="absolute -top-8 left-1/2 -translate-x-1/2 text-[9px] font-black bg-black text-white px-2 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">Completed: {doneCount}</div>
            </motion.div>
            <motion.div
              animate={{ height: `${Math.min(90, (bookings.length * 5) + 20)}%` }}
              className="flex-1 bg-black/40 rounded-t-xl relative group"
            >
              <div className="absolute -top-8 left-1/2 -translate-x-1/2 text-[9px] font-black bg-black text-white px-2 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">Pending: {bookings.length}</div>
            </motion.div>
            <motion.div
              animate={{ height: "40%" }}
              className="flex-1 bg-black/10 rounded-t-xl relative group"
            >
              <div className="absolute -top-8 left-1/2 -translate-x-1/2 text-[9px] font-black bg-black text-white px-2 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">Confirmed Signal</div>
            </motion.div>
          </div>

          <div className="space-y-3">
            <StatusLegend label="Completed" color="bg-black" value={doneCount.toString()} />
            <StatusLegend label="Arrived" color="bg-black/60" value="0" />
            <StatusLegend label="Confirmed" color="bg-black/40" value="0" />
            <StatusLegend label="Pending" color="bg-black/20" value={bookings.length.toString()} />
            <StatusLegend label="Rescheduled" color="bg-black/10" value="0" />
          </div>
        </div>

      </div>
    </div>
  );
}
