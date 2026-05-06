"use client";

import { useState } from "react";
import { Search, Download, ArrowUpRight, ArrowDownRight, MoreHorizontal, X, Plus, User, Mail, Calendar, Hash, Activity, Shield, Phone, MapPin, Clock, FileText, ChevronRight, Heart, AlertCircle, CalendarDays } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function PatientListSection() {
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const [patients, setPatients] = useState([
    { id: 'PAT-001', name: 'Alexander Wright', email: 'alex@example.com', status: 'Active', visits: 12, lastVisit: '2026-05-01', phone: '+1 234 567 890', location: 'San Francisco, CA', dob: '1992-04-15', bloodType: 'O+', allergies: 'Penicillin, Peanuts' },
    { id: 'PAT-002', name: 'Sarah Jenkins', email: 'sarah.j@example.com', status: 'Follow-up', visits: 4, lastVisit: '2026-04-28', phone: '+1 234 567 891', location: 'Los Angeles, CA', dob: '1988-11-22', bloodType: 'A-', allergies: 'None' },
    { id: 'PAT-003', name: 'Michael Chen', email: 'm.chen@example.com', status: 'New', visits: 1, lastVisit: '2026-05-04', phone: '+1 234 567 892', location: 'New York, NY', dob: '1995-07-30', bloodType: 'B+', allergies: 'Latex' },
    { id: 'PAT-004', name: 'Emily Rodriguez', email: 'emily.r@example.com', status: 'Active', visits: 8, lastVisit: '2026-04-15', phone: '+1 234 567 893', location: 'Miami, FL', dob: '1990-12-05', bloodType: 'AB+', allergies: 'Dust Mites' },
    { id: 'PAT-005', name: 'David Thompson', email: 'd.thompson@example.com', status: 'Inactive', visits: 15, lastVisit: '2026-03-20', phone: '+1 234 567 894', location: 'Chicago, IL', dob: '1982-02-18', bloodType: 'O-', allergies: 'Shellfish' },
  ]);

  const [newPatient, setNewPatient] = useState({
    name: "",
    email: "",
    status: "New"
  });

  const handleAddPatient = () => {
    if (!newPatient.name || !newPatient.email) return;
    const id = `PAT-${Math.floor(100 + Math.random() * 900)}`;
    const freshPatient = { 
      ...newPatient, 
      id, 
      visits: 0, 
      lastVisit: new Date().toISOString().split('T')[0], 
      phone: 'N/A', 
      location: 'N/A',
      dob: 'N/A',
      bloodType: 'N/A',
      allergies: 'N/A'
    };
    setPatients([freshPatient, ...patients]);
    setNewPatient({ name: "", email: "", status: "New" });
    setIsAddModalOpen(false);
  };

  const filteredPatients = patients.filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    p.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="relative">
      <div className="bg-white border border-black/5 rounded-[3rem] p-10 shadow-sm space-y-8">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h2 className="text-xl font-black uppercase tracking-tighter italic">Patient Registry</h2>
            <p className="text-[10px] font-bold text-black/20 uppercase tracking-widest">Digital Signal Network</p>
          </div>
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setIsSearchModalOpen(true)}
              className="flex items-center gap-3 px-6 py-3 bg-black/5 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-black/10 transition-all active:scale-95"
            >
              <Search size={14} className="text-black/40" />
              <span>Search Signals...</span>
            </button>
            <button 
              onClick={() => setIsAddModalOpen(true)}
              className="px-6 py-3 bg-black text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-xl shadow-black/20 hover:scale-105 active:scale-95 transition-all"
            >
              + Add Profile
            </button>
          </div>
        </div>

        <div className="overflow-hidden border border-black/5 rounded-[2rem]">
          <table className="w-full text-left">
            <thead className="bg-black/5">
              <tr>
                <th className="px-8 py-5 text-[9px] font-black uppercase tracking-widest text-black/40">Patient ID</th>
                <th className="px-8 py-5 text-[9px] font-black uppercase tracking-widest text-black/40">Identity</th>
                <th className="px-8 py-5 text-[9px] font-black uppercase tracking-widest text-black/40">Status</th>
                <th className="px-8 py-5 text-[9px] font-black uppercase tracking-widest text-black/40">Visits</th>
                <th className="px-8 py-5 text-[9px] font-black uppercase tracking-widest text-black/40">Last Signal</th>
                <th className="px-8 py-5 text-[9px] font-black uppercase tracking-widest text-black/40"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/5">
              {filteredPatients.map(p => (
                <tr 
                  key={p.id} 
                  onClick={() => setSelectedPatient(p)}
                  className="hover:bg-black/[0.01] transition-colors group cursor-pointer"
                >
                  <td className="px-8 py-6 text-[10px] font-black italic">{p.id}</td>
                  <td className="px-8 py-6">
                    <div className="flex flex-col">
                      <span className="text-sm font-black uppercase tracking-tighter italic">{p.name}</span>
                      <span className="text-[9px] font-bold text-black/20 uppercase tracking-widest">{p.email}</span>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <span className={`px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest ${
                      p.status === 'Active' ? 'bg-emerald-500/10 text-emerald-600' : 
                      p.status === 'Follow-up' ? 'bg-amber-500/10 text-amber-600' : 
                      p.status === 'New' ? 'bg-blue-500/10 text-blue-600' : 'bg-black/5 text-black/40'
                    }`}>{p.status}</span>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-black italic">{p.visits}</span>
                      {p.visits > 10 ? <ArrowUpRight size={12} className="text-emerald-500" /> : <ArrowDownRight size={12} className="text-black/10" />}
                    </div>
                  </td>
                  <td className="px-8 py-6 text-[10px] font-bold text-black/30">{p.lastVisit}</td>
                  <td className="px-8 py-6 text-right">
                    <button className="p-2 text-black/10 hover:text-black transition-colors"><MoreHorizontal size={16} /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Full-Page Patient Detail Overlay */}
      <AnimatePresence>
        {selectedPatient && (
          <motion.div 
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed inset-0 bg-[#e9e7e2] z-[500] flex flex-col pt-6 px-12 pb-12 overflow-y-auto custom-scrollbar"
          >
            <button 
              onClick={() => setSelectedPatient(null)}
              className="fixed top-8 right-8 w-12 h-12 rounded-full bg-white border border-black/5 flex items-center justify-center hover:bg-black hover:text-white transition-all shadow-xl active:scale-90 z-[600]"
            >
              <X size={20} />
            </button>

            <div className="max-w-6xl mx-auto w-full grid grid-cols-12 gap-12 mt-12">
              {/* Left Column: Core Identity */}
              <div className="col-span-4 space-y-8">
                <div className="bg-white rounded-[3.5rem] p-12 border border-black/5 shadow-sm flex flex-col items-center gap-8">
                  <div className="w-40 h-40 rounded-full bg-black flex items-center justify-center shadow-2xl relative">
                    <span className="text-6xl font-black text-white italic">{selectedPatient.name.charAt(0)}</span>
                  </div>
                  <div className="text-center space-y-2">
                    <h2 className="text-4xl font-black uppercase tracking-tighter italic leading-none">{selectedPatient.name}</h2>
                  </div>
                </div>

                <div className="bg-white rounded-[2.5rem] p-8 border border-black/5 shadow-sm space-y-4">
                  <h4 className="text-[10px] font-black uppercase tracking-widest text-black/30 border-b border-black/5 pb-2 ml-2">Contact</h4>
                  <div className="space-y-3">
                    <div className="flex flex-col gap-1 p-4 hover:bg-black/[0.02] rounded-2xl transition-colors">
                      <span className="text-[8px] font-black uppercase tracking-widest text-black/20">Email</span>
                      <span className="text-xs font-black uppercase tracking-tight">{selectedPatient.email}</span>
                    </div>
                    <div className="flex flex-col gap-1 p-4 hover:bg-black/[0.02] rounded-2xl transition-colors">
                      <span className="text-[8px] font-black uppercase tracking-widest text-black/20">Phone</span>
                      <span className="text-xs font-black uppercase tracking-tight">{selectedPatient.phone}</span>
                    </div>
                    <div className="flex flex-col gap-1 p-4 hover:bg-black/[0.02] rounded-2xl transition-colors">
                      <span className="text-[8px] font-black uppercase tracking-widest text-black/20">Location</span>
                      <span className="text-xs font-black uppercase tracking-tight">{selectedPatient.location}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Performance & History */}
              <div className="col-span-8 space-y-8">
                
                {/* General Information Section */}
                <div className="bg-white rounded-[3rem] p-10 border border-black/5 shadow-sm space-y-8">
                  <div className="flex items-center justify-between border-b border-black/5 pb-6">
                    <h3 className="text-xl font-black uppercase italic tracking-tighter">General Information</h3>
                  </div>
                  <div className="grid grid-cols-3 gap-8">
                    <div className="space-y-3">
                      <span className="text-[10px] font-black uppercase tracking-widest text-black/20">Date of Birth</span>
                      <p className="text-lg font-black italic">{selectedPatient.dob || 'N/A'}</p>
                    </div>
                    <div className="space-y-3">
                      <span className="text-[10px] font-black uppercase tracking-widest text-black/20">Blood Type</span>
                      <p className="text-lg font-black italic text-rose-500">{selectedPatient.bloodType || 'N/A'}</p>
                    </div>
                    <div className="space-y-3 col-span-1">
                      <span className="text-[10px] font-black uppercase tracking-widest text-black/20">Allergies</span>
                      <p className="text-sm font-black uppercase tracking-tight leading-tight text-black/60">{selectedPatient.allergies || 'NONE DETECTED'}</p>
                    </div>
                  </div>
                </div>

                {/* Future Visits Section */}
                <div className="bg-white rounded-[3rem] p-10 border border-black/5 shadow-sm space-y-10 flex-1">
                  {/* Future Visits Header */}
                  <div className="flex items-center justify-between border-b border-black/5 pb-6">
                    <h3 className="text-xl font-black uppercase italic tracking-tighter">Future Visits (2)</h3>
                  </div>

                  {/* Visit Cards */}
                  <div className="space-y-4">
                    <div className="bg-black/[0.02] border border-black/[0.03] rounded-[2rem] overflow-hidden flex items-center group hover:bg-white hover:shadow-xl hover:shadow-black/5 transition-all">
                      <div className="grid grid-cols-4 w-full p-8 items-center gap-8">
                        <div className="space-y-2">
                          <span className="text-[10px] font-black uppercase tracking-widest text-black/20">11.00-12.30</span>
                          <p className="text-lg font-black italic">26 JUN 2026</p>
                        </div>
                        <div className="space-y-2">
                          <span className="text-[10px] font-black uppercase tracking-widest text-black/20">Service:</span>
                          <p className="text-sm font-black uppercase tracking-tight italic">Root Canal Protocol</p>
                        </div>
                        <div className="space-y-2">
                          <span className="text-[10px] font-black uppercase tracking-widest text-black/20">Specialist:</span>
                          <p className="text-sm font-black text-emerald-600">Dr. Sarah Jenkins</p>
                        </div>
                        <div className="flex justify-between items-center">
                          <div className="space-y-2">
                            <span className="text-[10px] font-black uppercase tracking-widest text-black/20">Status:</span>
                            <div className="px-4 py-1.5 bg-emerald-500/10 text-emerald-600 rounded-full text-[9px] font-black uppercase tracking-widest">Scheduled</div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-black/[0.02] border border-black/[0.03] rounded-[2rem] overflow-hidden flex items-center group hover:bg-white hover:shadow-xl hover:shadow-black/5 transition-all">
                      <div className="grid grid-cols-4 w-full p-8 items-center gap-8">
                        <div className="space-y-2">
                          <span className="text-[10px] font-black uppercase tracking-widest text-black/20">14.30-15.30</span>
                          <p className="text-lg font-black italic">02 JUL 2026</p>
                        </div>
                        <div className="space-y-2">
                          <span className="text-[10px] font-black uppercase tracking-widest text-black/20">Service:</span>
                          <p className="text-sm font-black uppercase tracking-tight italic">Thermal Whitening</p>
                        </div>
                        <div className="space-y-2">
                          <span className="text-[10px] font-black uppercase tracking-widest text-black/20">Specialist:</span>
                          <p className="text-sm font-black text-blue-600">Dr. Max Oched</p>
                        </div>
                        <div className="flex justify-between items-center">
                          <div className="space-y-2">
                            <span className="text-[10px] font-black uppercase tracking-widest text-black/20">Status:</span>
                            <div className="px-4 py-1.5 bg-blue-500/10 text-blue-600 rounded-full text-[9px] font-black uppercase tracking-widest">Scheduled</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Search Modal */}
      <AnimatePresence>
        {isSearchModalOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsSearchModalOpen(false)} className="fixed inset-0 bg-black/60 backdrop-blur-md z-[300]" />
            <motion.div initial={{ scale: 0.9, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.9, opacity: 0, y: 20 }} className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] bg-white rounded-[3rem] shadow-2xl z-[301] p-12 flex flex-col gap-8">
              <div className="flex justify-between items-center"><h3 className="text-2xl font-black uppercase italic tracking-tighter">Signal Decoder</h3><button onClick={() => setIsSearchModalOpen(false)} className="p-3 hover:bg-black/5 rounded-2xl transition-colors active:scale-90"><X size={24} /></button></div>
              <div className="relative group"><Search size={24} className="absolute left-8 top-1/2 -translate-y-1/2 text-black/20 group-focus-within:text-black transition-colors" /><input autoFocus type="text" placeholder="DECODE IDENTITY OR EMAIL..." className="w-full bg-black/5 border-2 border-transparent rounded-3xl pl-20 pr-8 py-6 text-lg font-black uppercase tracking-widest focus:bg-white focus:border-black/10 focus:ring-0 transition-all outline-none" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} /></div>
              <div className="max-h-[400px] overflow-y-auto custom-scrollbar space-y-3 pr-2">
                {filteredPatients.map(p => (
                  <button key={p.id} onClick={() => { setSelectedPatient(p); setIsSearchModalOpen(false); }} className="w-full p-8 text-left hover:bg-black/5 rounded-[2.5rem] flex items-center justify-between border border-black/[0.03] transition-all hover:scale-[1.02] active:scale-95 group">
                    <div className="flex flex-col gap-1"><span className="text-lg font-black uppercase tracking-tighter italic group-hover:text-emerald-600 transition-colors">{p.name}</span><span className="text-xs font-bold text-black/20 uppercase tracking-widest">{p.email}</span></div>
                  </button>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Add Profile Modal */}
      <AnimatePresence>
        {isAddModalOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsAddModalOpen(false)} className="fixed inset-0 bg-black/60 backdrop-blur-md z-[300]" />
            <motion.div initial={{ scale: 0.9, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.9, opacity: 0, y: 20 }} className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] bg-white rounded-[3rem] shadow-2xl z-[301] p-12 flex flex-col gap-8">
              <div className="flex justify-between items-center"><h3 className="text-2xl font-black uppercase italic tracking-tighter">Initialize Profile</h3><button onClick={() => setIsAddModalOpen(false)} className="p-3 hover:bg-black/5 rounded-2xl transition-colors active:scale-90"><X size={24} /></button></div>
              <div className="space-y-6">
                <div className="space-y-2"><label className="text-[10px] font-black uppercase tracking-widest text-black/40 ml-4">Full Identity Name</label><input autoFocus type="text" placeholder="ENTER FULL NAME..." className="w-full bg-black/5 border-2 border-transparent rounded-2xl px-6 py-5 text-sm font-black uppercase tracking-widest focus:bg-white focus:border-black/10 focus:ring-0 transition-all outline-none" value={newPatient.name} onChange={(e) => setNewPatient({ ...newPatient, name: e.target.value })} /></div>
                <div className="space-y-2"><label className="text-[10px] font-black uppercase tracking-widest text-black/40 ml-4">Neural Signal Address (Email)</label><input type="email" placeholder="ENTER EMAIL ADDRESS..." className="w-full bg-black/5 border-2 border-transparent rounded-2xl px-6 py-5 text-sm font-black uppercase tracking-widest focus:bg-white focus:border-black/10 focus:ring-0 transition-all outline-none" value={newPatient.email} onChange={(e) => setNewPatient({ ...newPatient, email: e.target.value })} /></div>
              </div>
              <button onClick={handleAddPatient} className="w-full bg-black text-white py-5 rounded-2xl text-xs font-black uppercase tracking-[0.3em] shadow-[0_20px_40px_rgba(0,0,0,0.2)] hover:scale-[1.02] active:scale-[0.98] transition-all mt-4">COMMIT PROFILE</button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
