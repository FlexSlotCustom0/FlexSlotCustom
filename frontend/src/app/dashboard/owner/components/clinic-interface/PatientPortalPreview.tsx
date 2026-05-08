"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Phone, Clock, Mail, User, ChevronRight, Activity, Star } from "lucide-react";

interface PatientPortalPreviewProps {
  isPreviewOpen: boolean;
  setIsPreviewOpen: (open: boolean) => void;
  selectedTemplate: string;
  clinicName: string;
  clinicTagline: string;
  clinicBanner: string | null;
  clinicPhoto: string | null;
  contact: { phone: string; email: string };
  hours: { open: string; close: string };
  doctors: any[];
  services: any[];
  news: any[];
  reviews: any[];
  templates: any[];
  ct: any;
}

export function PatientPortalPreview({
  isPreviewOpen,
  setIsPreviewOpen,
  selectedTemplate,
  clinicName,
  clinicTagline,
  clinicBanner,
  clinicPhoto,
  contact,
  hours,
  doctors,
  services,
  news,
  reviews,
  templates,
  ct
}: PatientPortalPreviewProps) {
  return (
    <AnimatePresence>
      {isPreviewOpen && (
        <motion.div 
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          className="fixed inset-0 z-[1000] flex flex-col"
          style={{ background: ct.bodyBg }}
        >
          <div className="h-16 flex items-center justify-between px-10 bg-black text-white shrink-0">
            <div className="flex items-center gap-6">
               <div className="flex gap-2">
                 <div className="w-2.5 h-2.5 rounded-full bg-red-500/20" />
                 <div className="w-2.5 h-2.5 rounded-full bg-amber-500/20" />
                 <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/20" />
               </div>
               <div className="h-8 px-6 bg-white/5 rounded-full flex items-center gap-3 min-w-[400px]">
                  <Activity size={12} className="text-emerald-500 animate-pulse" />
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] opacity-40">portal.flexslot.custom/{clinicName.toLowerCase().replace(/\s+/g, '-')}</span>
               </div>
            </div>
            <button 
              onClick={() => setIsPreviewOpen(false)} 
              className="px-8 py-2 bg-white text-black rounded-full text-[10px] font-black uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-xl shadow-white/10"
            >
              Exit Preview
            </button>
          </div>

          <div className="flex-1 overflow-y-auto">
            {/* ─── NAV ─── */}
            <nav 
              style={{ background: ct.navBg, color: ct.navText }} 
              className={`px-16 py-8 flex items-center justify-between sticky top-0 z-50 ${
                ct.id === 'pristine' ? 'border-b border-black' : 
                ct.id === 'aura' ? 'backdrop-blur-xl border-b border-indigo-200/30' : 
                ct.id === 'luxe' ? 'border-b border-[#d4af37]/20' : ''
              }`}
            >
              <div className="flex items-center gap-6">
                {clinicPhoto && <img src={clinicPhoto} alt="" className={`w-12 h-12 object-cover ${ct.id === 'pristine' ? 'rounded-none' : ct.id === 'aura' ? 'rounded-2xl shadow-lg shadow-indigo-200' : 'rounded-xl shadow-lg'}`} />}
                <span className={`text-2xl font-black uppercase tracking-tighter italic ${ct.id === 'luxe' ? 'font-serif normal-case tracking-normal' : ''}`}>{clinicName}</span>
              </div>
              <div className="flex items-center gap-10 text-[10px] font-black uppercase tracking-widest">
                {["Home", "Services", "Staff", "Contact"].map(link => (
                  <span key={link} className="opacity-40 hover:opacity-100 cursor-pointer transition-all hover:scale-105">{link}</span>
                ))}
                <button 
                  style={{ background: ct.accent, color: ct.accentText, borderRadius: ct.radius }} 
                  className={`px-8 py-3 text-[10px] font-black uppercase tracking-[0.2em] shadow-2xl transition-all hover:scale-105 active:scale-95 ${
                    ct.id === 'luxe' ? 'shadow-[#d4af37]/20' : ct.id === 'aura' ? 'shadow-indigo-500/20' : ''
                  }`}
                >
                  Book Appointment
                </button>
              </div>
            </nav>

            {/* ─── HERO ─── */}
            <section 
              style={{ background: ct.heroBg, minHeight: ct.id === 'pristine' ? '600px' : '480px' }} 
              className={`relative flex items-center overflow-hidden ${ct.id === 'pristine' ? 'justify-center text-center' : ''}`}
            >
              {clinicBanner && <img src={clinicBanner} alt="" className={`absolute inset-0 w-full h-full object-cover ${ct.id === 'pristine' ? 'opacity-10 grayscale' : ct.id === 'luxe' ? 'opacity-30' : 'opacity-40'}`} />}
              <div className="absolute inset-0" style={{ 
                background: ct.id === 'luxe' 
                  ? `linear-gradient(135deg, ${ct.heroBg} 40%, transparent 100%)` 
                  : ct.id === 'aura' 
                    ? `linear-gradient(135deg, #eef2ffee 0%, #c7d2fe88 50%, #a5b4fc44 100%)` 
                    : `linear-gradient(135deg, ${ct.heroBg}ee 0%, ${ct.heroBg}88 50%, transparent 100%)` 
              }} />
              
              {/* Luxe: subtle gold shimmer overlay */}
              {ct.id === 'luxe' && (
                <div className="absolute inset-0 opacity-[0.03]" style={{ background: 'repeating-linear-gradient(45deg, #d4af37 0px, transparent 1px, transparent 40px, #d4af37 41px)' }} />
              )}

              {/* Aura: soft floating orbs */}
              {ct.id === 'aura' && (
                <>
                  <div className="absolute top-20 right-20 w-64 h-64 bg-indigo-300/20 rounded-full blur-3xl animate-pulse" />
                  <div className="absolute bottom-10 left-40 w-48 h-48 bg-violet-300/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
                </>
              )}
              
              <div className={`relative z-10 px-16 max-w-3xl space-y-8 ${ct.id === 'pristine' ? 'flex flex-col items-center' : ''}`}>
                {ct.id === 'luxe' && (
                  <div className="flex items-center gap-3 mb-2">
                    <div className="h-px w-10 bg-[#d4af37]/40" />
                    <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#d4af37]/60">Excellence in Healthcare</span>
                  </div>
                )}
                <h1 
                  style={{ color: ct.heroText }} 
                  className={`leading-none tracking-tight uppercase italic ${
                    ct.id === 'pristine' ? 'text-9xl font-black' : 
                    ct.id === 'luxe' ? 'text-7xl font-bold font-serif normal-case tracking-normal' : 
                    'text-7xl font-bold'
                  }`}
                >
                  {clinicName}
                </h1>
                <p style={{ color: ct.heroText }} className="text-lg opacity-60 leading-relaxed font-medium max-w-xl">
                  {clinicTagline}
                </p>
                <div className="flex gap-4">
                  <button 
                    style={{ background: ct.accent, color: ct.accentText, borderRadius: ct.radius }} 
                    className={`px-10 py-5 text-sm font-black uppercase tracking-[0.2em] hover:opacity-80 transition-opacity ${
                      ct.id === 'luxe' ? 'shadow-lg shadow-[#d4af37]/20' : ct.id === 'aura' ? 'shadow-lg shadow-indigo-500/20' : ''
                    }`}
                  >
                    Schedule Visit
                  </button>
                  {ct.id === 'pristine' && (
                    <button style={{ border: '2px solid black' }} className="px-10 py-5 text-sm font-black uppercase tracking-[0.2em]">Explore</button>
                  )}
                  {ct.id === 'luxe' && (
                    <button className="px-10 py-5 text-sm font-bold uppercase tracking-[0.2em] border border-[#d4af37]/30 text-[#f5f0e8] hover:border-[#d4af37]/60 transition-all" style={{ borderRadius: ct.radius }}>Our Specialists</button>
                  )}
                  {ct.id === 'aura' && (
                    <button className="px-10 py-5 text-sm font-bold uppercase tracking-[0.2em] bg-white/40 backdrop-blur-md text-indigo-700 border border-indigo-200 hover:bg-white/60 transition-all" style={{ borderRadius: ct.radius }}>Learn More</button>
                  )}
                </div>
              </div>
            </section>

            {/* ─── CONTACT STRIP ─── */}
            <div 
              style={{ background: ct.accent, color: ct.accentText }} 
              className={`grid grid-cols-3 divide-x ${
                ct.id === 'pristine' ? 'divide-white/10 border-y border-black' : 
                ct.id === 'luxe' ? 'divide-[#0a0a0a]/20' : 
                'divide-white/10'
              }`}
            >
              <div className="p-10 flex flex-col items-center gap-4 justify-center">
                <Phone size={24} className="opacity-40" />
                <div className="text-center">
                  <p className="text-[10px] font-black uppercase tracking-widest opacity-40">Phone</p>
                  <p className={`text-lg font-black italic ${ct.id === 'luxe' ? 'font-serif normal-case' : ''}`}>{contact.phone}</p>
                </div>
              </div>
              <div className="p-10 flex flex-col items-center gap-4 justify-center">
                <Clock size={24} className="opacity-40" />
                <div className="text-center">
                  <p className="text-[10px] font-black uppercase tracking-widest opacity-40">Hours</p>
                  <p className={`text-lg font-black italic ${ct.id === 'luxe' ? 'font-serif normal-case' : ''}`}>{hours.open} - {hours.close}</p>
                </div>
              </div>
              <div className="p-10 flex flex-col items-center gap-4 justify-center">
                <Mail size={24} className="opacity-40" />
                <div className="text-center">
                  <p className="text-[10px] font-black uppercase tracking-widest opacity-40">Email</p>
                  <p className={`text-lg font-black italic ${ct.id === 'luxe' ? 'font-serif normal-case' : ''}`}>{contact.email}</p>
                </div>
              </div>
            </div>

            {/* ─── MEDICAL STAFF ─── */}
            <section className="px-16 py-32" style={{ background: ct.sectionBg }}>
              <div className={`mb-20 ${ct.id === 'pristine' ? 'text-center' : ''}`}>
                <h2 style={{ color: ct.bodyText }} className={`${
                  ct.id === 'pristine' ? 'text-7xl font-black italic' : 
                  ct.id === 'luxe' ? 'text-5xl font-bold font-serif normal-case tracking-normal' :
                  'text-5xl font-bold'
                } tracking-tighter uppercase mb-4`}>
                  {ct.id === 'luxe' ? 'Our Specialists' : 'Medical Staff'}
                </h2>
                <div className={`h-1 w-40 ${
                  ct.id === 'pristine' ? 'bg-black/5 mx-auto' : 
                  ct.id === 'luxe' ? 'bg-[#d4af37]/30' : 
                  'bg-indigo-300/30'
                }`} />
              </div>
              <div className={`grid gap-12 ${ct.id === 'pristine' ? 'grid-cols-2' : 'grid-cols-3'}`}>
                {doctors.map(d => (
                  <div 
                    key={d.id} 
                    className={`group relative overflow-hidden transition-all ${
                      ct.id === 'aura' ? 'backdrop-blur-lg' : ''
                    }`} 
                    style={{ 
                      background: ct.cardBg, 
                      borderRadius: ct.radius, 
                      border: ct.id === 'pristine' ? '1px solid black' : 
                              ct.id === 'luxe' ? '1px solid #2a2a2a' :
                              `1px solid ${ct.cardBorder}`,
                      boxShadow: ct.id === 'aura' ? '0 8px 32px rgba(99,102,241,0.08)' : undefined
                    }}
                  >
                    <div className={`aspect-[4/5] relative overflow-hidden ${ct.id === 'pristine' ? 'grayscale group-hover:grayscale-0' : ''} transition-all duration-700`}>
                      {d.photo ? <img src={d.photo} alt="" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" /> : <div className="w-full h-full flex items-center justify-center" style={{ background: ct.sectionBg }}><User size={64} style={{ color: ct.muted }} className="opacity-20" /></div>}
                      {ct.id === 'luxe' && <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/60 to-transparent" />}
                      {ct.id === 'aura' && <div className="absolute inset-0 bg-gradient-to-t from-indigo-900/20 to-transparent" />}
                    </div>
                    <div className="p-10 space-y-4">
                      <div className="flex justify-between items-start">
                        <div className="space-y-1">
                          <p className="text-[10px] font-black uppercase tracking-widest" style={{ color: d.status === 'Late' ? '#ef4444' : ct.accent }}>{d.specialty || "Specialist"}</p>
                          <h4 className={`text-3xl font-black uppercase tracking-tighter italic ${ct.id === 'luxe' ? 'font-serif normal-case tracking-normal' : ''}`} style={{ color: ct.bodyText }}>{d.name}</h4>
                        </div>
                        <div className={`w-3 h-3 rounded-full ${d.status === 'Present' ? 'bg-emerald-500' : 'bg-amber-500'} shadow-lg`} />
                      </div>
                      <p className="text-xs leading-relaxed opacity-60 font-bold" style={{ color: ct.bodyText }}>"{d.quote || "Dedicated to excellence."}"</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* ─── SERVICES ─── */}
            <section className="px-16 py-32" style={{ background: ct.bodyBg }}>
              <div className="flex items-end justify-between mb-16">
                 <div className="space-y-2">
                    <h2 className={`text-5xl font-black uppercase tracking-tighter italic ${ct.id === 'luxe' ? 'font-serif normal-case tracking-normal' : ''}`} style={{ color: ct.bodyText }}>
                      {ct.id === 'luxe' ? 'Clinical Services' : 'Our Services'}
                    </h2>
                    <p className="text-sm opacity-40 font-bold uppercase tracking-widest" style={{ color: ct.bodyText }}>
                      {ct.id === 'luxe' ? 'Tailored care for discerning patients' : 'Solutions for your health'}
                    </p>
                 </div>
                 <div className={`h-px flex-1 mx-10 mb-4 ${ct.id === 'luxe' ? 'bg-[#d4af37]/10' : ct.id === 'aura' ? 'bg-indigo-200/30' : 'bg-black/5'}`} />
              </div>
              <div className="grid grid-cols-3 gap-8">
                {services.map(s => (
                  <div key={s.id} className="group relative">
                    <div className={`aspect-video overflow-hidden mb-6 ${ct.id === 'aura' ? 'shadow-lg shadow-indigo-200/20' : ''}`} style={{ borderRadius: ct.radius }}>
                      {s.photo ? <img src={s.photo} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-all duration-500" /> : <div className="w-full h-full flex items-center justify-center" style={{ background: ct.sectionBg }}><Activity size={32} style={{ color: ct.muted }} className="opacity-20" /></div>}
                    </div>
                    <div className="flex items-center justify-between">
                       <h4 className={`text-xl font-black uppercase tracking-tighter italic ${ct.id === 'luxe' ? 'font-serif normal-case tracking-normal' : ''}`} style={{ color: ct.bodyText }}>{s.name}</h4>
                       <ChevronRight size={20} className="opacity-20 group-hover:opacity-100 transition-all translate-x-[-10px] group-hover:translate-x-0" />
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* ─── REVIEWS (Aura & Luxe only) ─── */}
            {(ct.id === 'luxe' || ct.id === 'aura') && reviews.length > 0 && (
              <section className="px-16 py-24" style={{ background: ct.sectionBg }}>
                <h2 className={`text-4xl font-black uppercase tracking-tighter italic mb-16 ${ct.id === 'luxe' ? 'font-serif normal-case tracking-normal' : ''}`} style={{ color: ct.bodyText }}>
                  {ct.id === 'luxe' ? 'Patient Testimonials' : 'What Patients Say'}
                </h2>
                <div className="grid grid-cols-3 gap-8">
                  {reviews.map((r, i) => (
                    <div key={i} className="p-8 space-y-4" style={{ 
                      background: ct.cardBg, 
                      borderRadius: ct.radius, 
                      border: `1px solid ${ct.cardBorder}`,
                      backdropFilter: ct.id === 'aura' ? 'blur(16px)' : undefined,
                      boxShadow: ct.id === 'aura' ? '0 8px 32px rgba(99,102,241,0.06)' : undefined
                    }}>
                      <div className="flex gap-1">
                        {[...Array(r.rating)].map((_, j) => (
                          <Star key={j} size={14} className={ct.id === 'luxe' ? 'text-[#d4af37] fill-[#d4af37]' : 'text-indigo-400 fill-indigo-400'} />
                        ))}
                      </div>
                      <p className="text-sm leading-relaxed opacity-70" style={{ color: ct.bodyText }}>"{r.text}"</p>
                      <p className="text-[10px] font-black uppercase tracking-widest" style={{ color: ct.accent }}>{r.author}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* ─── FOOTER ─── */}
            <footer 
              style={{ background: ct.navBg, color: ct.navText }} 
              className={`px-16 py-20 ${
                ct.id === 'pristine' ? 'border-t border-black' : 
                ct.id === 'luxe' ? 'border-t border-[#d4af37]/10' : 
                'border-t border-indigo-200/20'
              }`}
            >
              <div className="flex justify-between items-end">
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                     <div className={`w-10 h-10 rounded-lg flex items-center justify-center p-2 ${ct.id === 'luxe' ? 'bg-[#d4af37]' : 'bg-black'}`}><img src="/flexslot_logo.png" className="brightness-0 invert object-contain" /></div>
                     <h3 className={`text-3xl font-black uppercase tracking-tighter italic ${ct.id === 'luxe' ? 'font-serif normal-case tracking-normal' : ''}`}>{clinicName}</h3>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs font-bold opacity-40 uppercase tracking-widest">{contact.email} · {contact.phone}</p>
                    <p className="text-xs font-bold opacity-40 uppercase tracking-widest">Open {hours.open} - {hours.close}</p>
                  </div>
                </div>
                <div className="text-right space-y-2">
                  <p className="text-[10px] font-black uppercase tracking-[0.5em] opacity-20">Infrastructure by</p>
                  <p className="text-2xl font-black italic tracking-tighter uppercase">FlexSlot</p>
                </div>
              </div>
            </footer>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
