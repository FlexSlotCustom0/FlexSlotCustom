"use client";

import { motion } from "framer-motion";
import { Stethoscope, Plus, User, Trash2, Activity, X } from "lucide-react";

interface StaffServicesTabProps {
  doctors: any[];
  setDoctors: (doctors: any[]) => void;
  services: any[];
  setServices: (services: any[]) => void;
  handleFileUpload: (callback: (url: string) => void) => void;
}

export function StaffServicesTab({
  doctors,
  setDoctors,
  services,
  setServices,
  handleFileUpload
}: StaffServicesTabProps) {
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
      {/* Staff Section */}
      <section className="bg-white border border-black/5 rounded-[2.5rem] p-10 shadow-sm space-y-8">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-black uppercase tracking-widest flex items-center gap-2">
            <Stethoscope size={16} /> Practitioner Flow
          </h3>
          <button onClick={() => setDoctors([...doctors, { id: Date.now(), name: "New Doctor", room: "TBD", specialty: "General Physician", quote: "Dedicated to patient care.", status: "Present", delay: 0, photo: null }])} className="p-2 bg-black text-white rounded-full"><Plus size={16} /></button>
        </div>
        <div className="space-y-4">
          {doctors.map(doc => (
            <div key={doc.id} className="flex gap-6 p-6 bg-black/[0.02] rounded-[2rem] items-start border border-black/5 hover:bg-black/5 transition-all">
              <div 
                onClick={() => handleFileUpload((url) => setDoctors(doctors.map(d => d.id === doc.id ? {...d, photo: url} : d)))}
                className="w-20 h-20 rounded-2xl bg-black/5 border border-black/10 flex items-center justify-center cursor-pointer hover:bg-black/10 transition-all shrink-0 overflow-hidden"
              >
                {doc.photo ? <img src={doc.photo} alt="" className="w-full h-full object-cover" /> : <User size={24} className="text-black/20" />}
              </div>
              <div className="flex-1 space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[7px] font-black uppercase tracking-widest text-black/20 block">Name</label>
                    <input type="text" value={doc.name} onChange={(e) => setDoctors(doctors.map(d => d.id === doc.id ? {...d, name: e.target.value} : d))} className="bg-transparent border-none text-sm font-black uppercase italic tracking-tighter w-full outline-none" />
                  </div>
                  <div>
                    <label className="text-[7px] font-black uppercase tracking-widest text-black/20 block">Specialty</label>
                    <input type="text" value={doc.specialty || ""} onChange={(e) => setDoctors(doctors.map(d => d.id === doc.id ? {...d, specialty: e.target.value} : d))} className="bg-transparent border-none text-[10px] font-bold uppercase tracking-widest w-full outline-none text-black/50" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[7px] font-black uppercase tracking-widest text-black/20 block">Room</label>
                    <input type="text" value={doc.room} onChange={(e) => setDoctors(doctors.map(d => d.id === doc.id ? {...d, room: e.target.value} : d))} className="bg-transparent border-none text-[9px] font-bold text-black/30 uppercase tracking-widest w-full outline-none" />
                  </div>
                  <div>
                    <label className="text-[7px] font-black uppercase tracking-widest text-black/20 block">Quote</label>
                    <input type="text" value={doc.quote || ""} onChange={(e) => setDoctors(doctors.map(d => d.id === doc.id ? {...d, quote: e.target.value} : d))} className="bg-transparent border-none text-[9px] font-bold italic text-black/30 w-full outline-none" />
                  </div>
                </div>
                <div className="flex items-center gap-4 pt-1">
                  <div className="flex gap-1.5">
                    {["Present", "Late", "Away"].map(s => (
                      <button 
                        key={s} 
                        onClick={() => setDoctors(doctors.map(d => d.id === doc.id ? {...d, status: s} : d))}
                        className={`px-2.5 py-1 text-[7px] font-black uppercase tracking-widest rounded-md transition-all ${doc.status === s ? (s === 'Present' ? 'bg-emerald-600 text-white' : s === 'Late' ? 'bg-amber-500 text-white' : 'bg-gray-400 text-white') : 'text-black/20 hover:text-black bg-black/5'}`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                  <div className="flex items-center gap-2 ml-auto">
                    <span className="text-[7px] font-black uppercase text-black/20">Delay:</span>
                    <input type="number" value={doc.delay} onChange={(e) => setDoctors(doctors.map(d => d.id === doc.id ? {...d, delay: parseInt(e.target.value) || 0} : d))} className="w-12 bg-white border border-black/10 rounded px-1.5 py-0.5 text-[9px] font-black outline-none text-center" />
                    <span className="text-[7px] font-black uppercase text-black/20">min</span>
                    <button onClick={() => setDoctors(doctors.filter(d => d.id !== doc.id))} className="text-black/10 hover:text-red-500 transition-colors ml-2"><Trash2 size={14} /></button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Services Section */}
      <section className="bg-white border border-black/5 rounded-[2.5rem] p-10 shadow-sm space-y-8">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-black uppercase tracking-widest flex items-center gap-2">
            <Activity size={16} /> Service Protocol
          </h3>
          <button onClick={() => setServices([...services, { id: Date.now(), name: "New Service", photo: null }])} className="p-2 bg-black text-white rounded-full"><Plus size={16} /></button>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {services.map(s => (
            <div key={s.id} className="p-5 bg-black/[0.02] rounded-[2rem] border border-black/5 flex items-center gap-4 group hover:bg-black/5 transition-all">
              <div 
                onClick={() => handleFileUpload((url) => setServices(services.map(x => x.id === s.id ? {...x, photo: url} : x)))}
                className="w-12 h-12 rounded-xl bg-black/5 border border-black/10 flex items-center justify-center cursor-pointer shrink-0 overflow-hidden"
              >
                {s.photo ? <img src={s.photo} alt="" className="w-full h-full object-cover" /> : <Activity size={16} className="text-black/20" />}
              </div>
              <input type="text" value={s.name} onChange={(e) => setServices(services.map(x => x.id === s.id ? {...x, name: e.target.value} : x))} className="bg-transparent border-none text-xs font-black uppercase tracking-widest flex-1 outline-none" />
              <button onClick={() => setServices(services.filter(x => x.id !== s.id))} className="opacity-0 group-hover:opacity-100 text-black/10 hover:text-red-500"><X size={14} /></button>
            </div>
          ))}
        </div>
      </section>
    </motion.div>
  );
}
