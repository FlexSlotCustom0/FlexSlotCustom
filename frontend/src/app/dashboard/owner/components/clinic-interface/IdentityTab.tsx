"use client";

import { motion } from "framer-motion";
import { Palette, Sparkles, User, AlertCircle, Phone, Mail as MailIcon, Clock } from "lucide-react";

interface IdentityTabProps {
  selectedTemplate: string;
  setSelectedTemplate: (id: string) => void;
  clinicName: string;
  setClinicName: (name: string) => void;
  clinicTagline: string;
  setClinicTagline: (tagline: string) => void;
  clinicBanner: string | null;
  setClinicBanner: (banner: string | null) => void;
  clinicPhoto: string | null;
  setClinicPhoto: (photo: string | null) => void;
  contact: { phone: string; email: string };
  setContact: (contact: { phone: string; email: string }) => void;
  hours: { open: string; close: string };
  setHours: (hours: { open: string; close: string }) => void;
  templates: any[];
  handleFileUpload: (callback: (url: string) => void) => void;
}

export function IdentityTab({
  selectedTemplate,
  setSelectedTemplate,
  clinicName,
  setClinicName,
  clinicTagline,
  setClinicTagline,
  clinicBanner,
  setClinicBanner,
  clinicPhoto,
  setClinicPhoto,
  contact,
  setContact,
  hours,
  setHours,
  templates,
  handleFileUpload
}: IdentityTabProps) {
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
      {/* Templates Section */}
      <section className="bg-white border border-black/5 rounded-[2.5rem] p-10 shadow-sm space-y-8">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-black uppercase tracking-widest flex items-center gap-2">
            <Palette size={16} /> Global Blueprint
          </h3>
          <span className="text-[10px] font-black uppercase tracking-widest text-black/20 italic">Select Interface DNA</span>
        </div>
        <div className="grid grid-cols-3 gap-6">
          {templates.map(t => (
            <div 
              key={t.id} 
              onClick={() => setSelectedTemplate(t.id)}
              className={`p-6 rounded-[2rem] border-2 cursor-pointer transition-all group relative overflow-hidden ${selectedTemplate === t.id ? 'border-black bg-black text-white shadow-2xl' : 'border-black/5 bg-black/[0.02] hover:border-black/20'}`}
            >
              <div className="relative z-10 space-y-4">
                <div className="flex justify-between items-start">
                   <div className="space-y-1">
                      <p className="text-[10px] font-black uppercase tracking-widest opacity-40">{t.theme}</p>
                      <h4 className="text-xl font-black uppercase tracking-tighter italic">{t.name}</h4>
                   </div>
                   {selectedTemplate === t.id && <Sparkles size={16} className="text-white animate-pulse" />}
                </div>
                <p className={`text-[10px] leading-relaxed font-bold ${selectedTemplate === t.id ? 'text-white/60' : 'text-black/40'}`}>{t.desc}</p>
                <div className="flex gap-1.5">
                   {t.colors.map((c: string, i: number) => (
                     <div key={i} className="w-4 h-4 rounded-full border border-white/10 shadow-sm" style={{ backgroundColor: c }} />
                   ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Identity Section */}
      <section className="bg-white border border-black/5 rounded-[2.5rem] p-10 shadow-sm space-y-8">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-black uppercase tracking-widest flex items-center gap-2">
            <User size={16} /> Clinic Media
          </h3>
        </div>
        <div className="grid grid-cols-2 gap-10">
          <div className="space-y-3">
            <label className="text-[9px] font-black uppercase tracking-widest text-black/30">Primary Hero Banner</label>
            <div 
              onClick={() => handleFileUpload((url) => setClinicBanner(url))}
              className="aspect-video rounded-[2rem] border-2 border-dashed border-black/10 flex items-center justify-center cursor-pointer hover:bg-black/5 transition-all group overflow-hidden relative"
            >
              {clinicBanner ? (
                <img src={clinicBanner} alt="" className="w-full h-full object-cover" />
              ) : (
                <div className="flex flex-col items-center gap-2 opacity-20 group-hover:opacity-40 transition-opacity">
                  <Palette size={24} />
                  <span className="text-[10px] font-black uppercase">Upload Landscape Media</span>
                </div>
              )}
            </div>
          </div>
          <div className="space-y-3">
             <div className="pt-4 border-t border-black/5 space-y-4">
                <div className="space-y-2">
                  <label className="text-[9px] font-black uppercase tracking-widest text-black/30">Clinic Label</label>
                  <input type="text" value={clinicName} onChange={(e) => setClinicName(e.target.value)} className="w-full bg-black/5 border-none rounded-xl px-4 py-3 text-xs font-bold focus:ring-1 ring-black/10 outline-none" />
                </div>
                <div className="space-y-2">
                  <label className="text-[9px] font-black uppercase tracking-widest text-black/30">Welcome Tagline</label>
                  <textarea value={clinicTagline} onChange={(e) => setClinicTagline(e.target.value)} className="w-full bg-black/5 border-none rounded-xl px-4 py-3 text-xs font-bold focus:ring-1 ring-black/10 outline-none resize-none h-16" />
                </div>
              </div>     <div 
                      onClick={() => handleFileUpload((url) => setClinicPhoto(url))}
                      className="w-32 h-32 rounded-full border-2 border-dashed border-black/10 flex items-center justify-center cursor-pointer hover:bg-black/5 transition-all group overflow-hidden relative"
                    >
                      {clinicPhoto ? (
                        <img src={clinicPhoto} alt="" className="w-full h-full object-cover" />
                      ) : (
                        <div className="flex flex-col items-center gap-1 opacity-20 group-hover:opacity-40 transition-opacity">
                          <User size={20} />
                          <span className="text-[8px] font-black uppercase text-center">Logo</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </section>

              {/* Contact Section */}
              <section className="bg-white border border-black/5 rounded-[2.5rem] p-10 shadow-sm space-y-8">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-black uppercase tracking-widest flex items-center gap-2">
                    <Phone size={16} /> Contact Terminals
                  </h3>
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[9px] font-black uppercase tracking-widest text-black/30">Phone Line</label>
                    <div className="flex items-center gap-3 bg-black/5 rounded-xl px-4 py-3">
                       <Phone size={14} className="text-black/20" />
                       <input type="text" value={contact.phone} onChange={(e) => setContact({...contact, phone: e.target.value})} className="bg-transparent border-none text-xs font-bold focus:ring-0 p-0 w-full outline-none" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[9px] font-black uppercase tracking-widest text-black/30">Email Terminal</label>
                    <div className="flex items-center gap-3 bg-black/5 rounded-xl px-4 py-3">
                       <MailIcon size={14} className="text-black/20" />
                       <input type="text" value={contact.email} onChange={(e) => setContact({...contact, email: e.target.value})} className="bg-transparent border-none text-xs font-bold focus:ring-0 p-0 w-full outline-none" />
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-6 pt-4 border-t border-black/5">
                  <div className="space-y-2">
                    <label className="text-[9px] font-black uppercase tracking-widest text-black/30">Opening Hour</label>
                    <div className="flex items-center gap-3 bg-black/5 rounded-xl px-4 py-3">
                       <Clock size={14} className="text-black/20" />
                       <input type="time" value={hours.open} onChange={(e) => setHours({...hours, open: e.target.value})} className="bg-transparent border-none text-xs font-bold focus:ring-0 p-0 w-full outline-none" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[9px] font-black uppercase tracking-widest text-black/30">Closing Hour</label>
                    <div className="flex items-center gap-3 bg-black/5 rounded-xl px-4 py-3">
                       <Clock size={14} className="text-black/20" />
                       <input type="time" value={hours.close} onChange={(e) => setHours({...hours, close: e.target.value})} className="bg-transparent border-none text-xs font-bold focus:ring-0 p-0 w-full outline-none" />
                    </div>
                  </div>
                </div>
              </section>
            </motion.div>
  );
}
