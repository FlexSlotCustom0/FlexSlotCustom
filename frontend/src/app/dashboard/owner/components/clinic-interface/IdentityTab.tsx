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
      {/* Blueprint Section (Visual DNA) */}
      <section className="space-y-10">
        <header className="space-y-2">
          <h3 className="text-4xl font-black uppercase tracking-tighter italic">Visual DNA</h3>
          <p className="text-[10px] font-black uppercase tracking-[0.4em] text-black/20 italic">Select your clinic's public identity</p>
        </header>

        <div className="grid grid-cols-3 gap-6">
          {templates.map(t => {
            const isActive = selectedTemplate === t.id;
            const isLuxe = t.id === 'clinic-luxe';
            const isAura = t.id === 'clinic-aura';

            const bgStyle = isActive
              ? isLuxe
                ? 'border-[#d4af37] bg-[#0a0a0a] text-[#f5f0e8] shadow-[0_20px_60px_-10px_rgba(212,175,55,0.25)]'
                : isAura
                  ? 'border-indigo-400 bg-gradient-to-br from-indigo-100 via-violet-50 to-purple-100 text-indigo-900 shadow-[0_20px_60px_-10px_rgba(99,102,241,0.25)]'
                  : 'border-black bg-black text-white shadow-[0_40px_80px_-20px_rgba(0,0,0,0.3)]'
              : 'border-black/5 bg-white hover:border-black/10 shadow-sm';

            const iconBg = isActive
              ? isLuxe ? 'bg-[#d4af37]/20' : isAura ? 'bg-indigo-500/10' : 'bg-white/10'
              : 'bg-black/5';

            const iconColor = isActive
              ? isLuxe ? 'text-[#d4af37]' : isAura ? 'text-indigo-500' : 'text-white'
              : 'text-black/20';

            const subColor = isActive
              ? isLuxe ? 'text-[#d4af37]/50' : isAura ? 'text-indigo-400' : 'text-white/40'
              : 'text-black/20';

            return (
              <div 
                key={t.id} 
                onClick={() => setSelectedTemplate(t.id)}
                className={`p-8 rounded-[2.5rem] border-2 cursor-pointer transition-all group relative overflow-hidden h-[240px] flex flex-col justify-between ${bgStyle}`}
              >
                {/* Dot Indicator */}
                {isActive && (
                  <div className={`absolute top-6 right-6 w-2 h-2 rounded-full shadow-[0_0_10px_currentColor] ${
                    isLuxe ? 'bg-[#d4af37]' : isAura ? 'bg-indigo-400' : 'bg-white'
                  }`} />
                )}

                {/* Icon Container */}
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${iconBg}`}>
                  <Palette size={20} className={iconColor} />
                </div>

                <div className="space-y-1">
                  <h4 className={`text-xl font-black uppercase tracking-tighter italic ${isLuxe && isActive ? 'font-serif' : ''}`}>{t.name}</h4>
                  <p className={`text-[10px] font-black uppercase tracking-widest ${subColor}`}>{t.theme}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Identity Section */}
      <section className="premium-card space-y-10">
        <header className="space-y-1">
          <h3 className="text-xs font-black uppercase tracking-widest flex items-center gap-2">
            <User size={16} /> Clinic Identity
          </h3>
          <div className="h-px bg-black/5 w-full" />
        </header>
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
      <section className="premium-card space-y-10">
        <header className="space-y-1">
          <h3 className="text-xs font-black uppercase tracking-widest flex items-center gap-2">
            <Phone size={16} /> Contact Terminals
          </h3>
          <div className="h-px bg-black/5 w-full" />
        </header>
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
