"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Settings, CreditCard, ShieldCheck, Globe, Building2, 
  Phone, Mail, Layout, Save, Check, ArrowRight, Wallet,
  Landmark, Receipt, Activity, Lock, MapPin
} from "lucide-react";

export function SystemRegistrySection() {
  const [activeSubTab, setActiveSubTab] = useState("general");
  const [isSaving, setIsSaving] = useState(false);
  const [showSaved, setShowSaved] = useState(false);

  // Clinic State
  const [clinicName, setClinicName] = useState("");
  const [tagline, setTagline] = useState("");
  const [phone, setPhone] = useState("");
  
  useEffect(() => {
    setClinicName(localStorage.getItem("flexslot_active_clinic_name") || "Pristine Swiss Dental");
    setTagline(localStorage.getItem("flexslot_active_tagline") || "Empowering health through precision care.");
    setPhone(localStorage.getItem("flexslot_active_phone") || "+1 234 567 8900");
  }, []);

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      localStorage.setItem("flexslot_active_clinic_name", clinicName);
      localStorage.setItem("flexslot_active_tagline", tagline);
      localStorage.setItem("flexslot_active_phone", phone);
      setIsSaving(false);
      setShowSaved(true);
      setTimeout(() => setShowSaved(false), 3000);
    }, 1000);
  };

  return (
    <div className="space-y-10">
      <header className="flex justify-between items-end">
        <div className="space-y-2">
          <h2 className="text-4xl font-black tracking-tighter uppercase italic">System Registry</h2>
          <p className="text-black/30 text-[10px] font-black uppercase tracking-[0.3em]">Governance & B2B Architecture</p>
        </div>
        
        <div className="flex bg-black/5 p-1 rounded-2xl">
          <button 
            onClick={() => setActiveSubTab("general")}
            className={`px-8 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
              activeSubTab === 'general' ? 'bg-white shadow-lg text-black' : 'text-black/30 hover:text-black'
            }`}
          >
            General Settings
          </button>
          <button 
            onClick={() => setActiveSubTab("billing")}
            className={`px-8 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
              activeSubTab === 'billing' ? 'bg-white shadow-lg text-black' : 'text-black/30 hover:text-black'
            }`}
          >
            B2B Subscription
          </button>
        </div>
      </header>

      <div className="bg-white border border-black/5 rounded-[3rem] p-12 shadow-sm">
        <AnimatePresence mode="wait">
          {activeSubTab === 'general' && (
            <motion.div 
              key="general"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              className="space-y-12"
            >
              <div className="grid grid-cols-2 gap-12">
                <div className="space-y-8">
                  <div className="space-y-4">
                    <h3 className="text-[10px] font-black uppercase tracking-widest text-black/20">Clinic Identity</h3>
                    <div className="space-y-6">
                       <Input label="Clinic Name" value={clinicName} onChange={(e: any) => setClinicName(e.target.value)} icon={<Building2 size={16} />} />
                       <Input label="Public Tagline" value={tagline} onChange={(e: any) => setTagline(e.target.value)} icon={<Layout size={16} />} />
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="text-[10px] font-black uppercase tracking-widest text-black/20">Communication Matrix</h3>
                    <div className="space-y-6">
                       <Input label="Official Contact" value={phone} onChange={(e: any) => setPhone(e.target.value)} icon={<Phone size={16} />} />
                       <Input label="Administrative Email" value="admin@clinic.com" readOnly icon={<Mail size={16} />} />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-[10px] font-black uppercase tracking-widest text-black/20">Spatial Registry</h3>
                    <div className="space-y-6">
                       <Input label="Physical Coordinates" value="123 Medical St, Health City, ZU 8001" icon={<MapPin size={16} />} />
                    </div>
                  </div>
                </div>

                <div className="space-y-8">
                  <div className="space-y-4">
                    <h3 className="text-[10px] font-black uppercase tracking-widest text-black/20">Working Matrix</h3>
                    <div className="bg-black/5 p-8 rounded-[2.5rem] space-y-4">
                       <div className="flex justify-between items-center text-[9px] font-black uppercase tracking-widest">
                          <span className="text-black/40">Mon - Fri</span>
                          <span>08:00 AM - 06:00 PM</span>
                       </div>
                       <div className="flex justify-between items-center text-[9px] font-black uppercase tracking-widest">
                          <span className="text-black/40">Saturday</span>
                          <span>09:00 AM - 02:00 PM</span>
                       </div>
                       <div className="flex justify-between items-center text-[9px] font-black uppercase tracking-widest">
                          <span className="text-black/40">Sunday</span>
                          <span className="text-red-500">Facility Sealed</span>
                       </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-[10px] font-black uppercase tracking-widest text-black/20">Visual Branding</h3>
                    <div className="p-10 border-2 border-dashed border-black/10 rounded-[2.5rem] flex flex-col items-center justify-center text-center group hover:border-black/30 transition-all cursor-pointer">
                       <div className="w-16 h-16 bg-black/5 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                          <Globe size={24} className="text-black/20" />
                       </div>
                       <p className="text-[10px] font-black uppercase tracking-widest">Update Corporate Logo</p>
                       <p className="text-[8px] font-bold text-black/20 mt-1 uppercase">PNG or SVG · Max 2MB</p>
                    </div>
                  </div>
                  
                  <div className="p-8 bg-black/5 rounded-[2.5rem] border border-black/5 space-y-4">
                    <div className="flex items-center gap-3">
                       <ShieldCheck className="text-emerald-500 w-5 h-5" />
                       <h4 className="text-[10px] font-black uppercase tracking-widest">Regulatory Status</h4>
                    </div>
                    <p className="text-[9px] font-bold text-black/40 uppercase tracking-widest leading-relaxed">
                       Your clinic is currently verified in the FlexSlot Network. All health data is isolated within your dedicated tenant partition.
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-8 border-t border-black/5 flex justify-end items-center gap-6">
                <AnimatePresence>
                  {showSaved && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-2 text-emerald-500 text-[10px] font-black uppercase tracking-widest">
                       <Check size={14} /> Registry Synced
                    </motion.div>
                  )}
                </AnimatePresence>
                <button 
                  onClick={handleSave}
                  className="px-10 py-5 bg-black text-white rounded-full text-[10px] font-black uppercase tracking-widest shadow-xl shadow-black/20 hover:scale-105 active:scale-95 transition-all flex items-center gap-3"
                >
                  {isSaving ? "SYNCING..." : <><Save size={14} /> Commit Changes</>}
                </button>
              </div>
            </motion.div>
          )}

          {activeSubTab === 'billing' && (
            <motion.div 
              key="billing"
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              className="grid grid-cols-12 gap-12"
            >
              {/* Left: Subscription Status */}
              <div className="col-span-5 space-y-10">
                <div className="space-y-6">
                  <h3 className="text-[10px] font-black uppercase tracking-widest text-black/20">Current SaaS Tier</h3>
                  <div className="bg-black text-white p-10 rounded-[2.5rem] relative overflow-hidden group shadow-2xl">
                     <div className="absolute top-0 right-0 p-6">
                        <Activity className="w-8 h-8 text-white/10" />
                     </div>
                     <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40 mb-2">Professional Plan</p>
                     <h4 className="text-5xl font-black tracking-tighter italic uppercase">$89<span className="text-lg opacity-40">/MO</span></h4>
                     <div className="mt-8 pt-8 border-t border-white/10 flex items-center justify-between">
                        <div className="space-y-1">
                           <p className="text-[8px] font-black uppercase tracking-widest text-white/30">Next Invoice</p>
                           <p className="text-xs font-black uppercase tracking-tight">June 15, 2026</p>
                        </div>
                        <button className="px-5 py-2.5 bg-white text-black rounded-xl text-[9px] font-black uppercase tracking-widest hover:bg-gray-200 transition-all">Manage Plan</button>
                     </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <h3 className="text-[10px] font-black uppercase tracking-widest text-black/20">Payment Authority</h3>
                  <div className="p-8 border border-black/10 rounded-[2.5rem] flex items-center justify-between group hover:border-black transition-all cursor-pointer">
                     <div className="flex items-center gap-5">
                        <div className="w-12 h-12 bg-black/5 rounded-2xl flex items-center justify-center text-black/20 group-hover:bg-black group-hover:text-white transition-all">
                           <CreditCard size={20} />
                        </div>
                        <div>
                           <p className="text-[10px] font-black uppercase tracking-widest leading-none">VISA •••• 4242</p>
                           <p className="text-[8px] font-bold text-black/20 mt-1 uppercase tracking-widest">Expires 08/2028</p>
                        </div>
                     </div>
                     <ArrowRight size={16} className="text-black/10 group-hover:text-black transition-all" />
                  </div>
                  <button className="w-full py-5 border-2 border-dashed border-black/10 rounded-[2rem] text-[9px] font-black uppercase tracking-widest text-black/20 hover:text-black hover:border-black/30 transition-all flex items-center justify-center gap-2">
                     Append New Instrument
                  </button>
                </div>
              </div>

              {/* Right: Payment Feed (B2B Billing to FlexSlot) */}
              <div className="col-span-7 space-y-8">
                 <div className="flex justify-between items-center">
                    <h3 className="text-[10px] font-black uppercase tracking-widest text-black/20">Financial Stream (to FlexSlot)</h3>
                    <button className="text-[10px] font-black uppercase tracking-widest text-blue-600 hover:underline">Download Registry</button>
                 </div>
                 
                 <div className="space-y-4">
                    <BillingRow date="May 15, 2026" amount="89.00" status="Authorized" id="TXN_7741" />
                    <BillingRow date="Apr 15, 2026" amount="89.00" status="Authorized" id="TXN_6210" />
                    <BillingRow date="Mar 15, 2026" amount="89.00" status="Authorized" id="TXN_4588" />
                    <BillingRow date="Feb 15, 2026" amount="29.00" status="Authorized" id="TXN_2104" />
                 </div>

                 <div className="p-8 bg-blue-50 border border-blue-100 rounded-[2.5rem] flex items-start gap-5">
                    <div className="w-12 h-12 bg-blue-500 text-white rounded-2xl flex items-center justify-center shrink-0 shadow-lg shadow-blue-500/20">
                       <Receipt size={24} />
                    </div>
                    <div>
                       <h4 className="text-xs font-black uppercase tracking-widest text-blue-900">Enterprise Consolidation</h4>
                       <p className="text-[9px] font-bold text-blue-700/60 uppercase tracking-widest leading-relaxed mt-2">
                          Need custom infrastructure or volume-based pricing? Contact your FlexSlot Account Strategist.
                       </p>
                    </div>
                 </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function Input({ label, value, onChange, icon, readOnly = false }: any) {
  return (
    <div className="space-y-3">
      <label className="text-[10px] font-black uppercase tracking-widest text-black/30 ml-2">{label}</label>
      <div className="relative group">
        <div className="absolute left-6 top-1/2 -translate-y-1/2 text-black/10 group-focus-within:text-black transition-all">
          {icon}
        </div>
        <input 
          value={value} 
          onChange={onChange} 
          readOnly={readOnly}
          className={`w-full pl-16 pr-8 py-5 rounded-[1.5rem] text-xs font-black uppercase tracking-widest focus:outline-none transition-all ${
            readOnly ? 'bg-black/[0.02] text-black/30' : 'bg-black/5 focus:bg-white focus:ring-2 focus:ring-black shadow-inner'
          }`} 
        />
      </div>
    </div>
  );
}

function BillingRow({ date, amount, status, id }: any) {
  return (
    <div className="flex items-center justify-between p-6 bg-black/5 rounded-2xl hover:bg-black/10 transition-all group">
       <div className="flex items-center gap-6">
          <div className="text-center min-w-[80px]">
             <p className="text-[8px] font-black uppercase tracking-widest text-black/30">Invoice Date</p>
             <p className="text-[10px] font-black uppercase mt-1">{date.split(',')[0]}</p>
          </div>
          <div className="h-8 w-px bg-black/5" />
          <div>
             <p className="text-[8px] font-black uppercase tracking-widest text-black/30 leading-none">Status</p>
             <div className="flex items-center gap-2 mt-1">
                <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
                <span className="text-[10px] font-black uppercase tracking-widest text-emerald-600">{status}</span>
             </div>
          </div>
       </div>
       <div className="flex items-center gap-8">
          <div className="text-right">
             <p className="text-[8px] font-black uppercase tracking-widest text-black/30 italic">{id}</p>
             <p className="text-xl font-black tracking-tighter mt-1">${amount}</p>
          </div>
          <button className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-black/20 hover:text-black shadow-none hover:shadow-lg transition-all group-hover:scale-105">
             <Receipt size={16} />
          </button>
       </div>
    </div>
  );
}
