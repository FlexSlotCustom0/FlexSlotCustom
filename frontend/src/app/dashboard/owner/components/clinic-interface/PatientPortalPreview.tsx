"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Phone, Clock, Mail, AlertCircle, User, ChevronRight, Activity, Star, FileText } from "lucide-react";

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
          {/* Top Admin Bar */}
          <div className="h-12 flex items-center justify-between px-8 bg-black/90 text-white shrink-0">
            <div className="flex items-center gap-3">
               <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
               <span className="text-[9px] font-bold uppercase tracking-[0.3em] opacity-60">Preview Mode — {templates.find(t => t.id === selectedTemplate)?.name} Template</span>
            </div>
            <button onClick={() => setIsPreviewOpen(false)} className="px-4 py-1.5 bg-white/10 hover:bg-white/20 rounded-lg text-[9px] font-bold uppercase tracking-widest transition-all">Close Preview</button>
          </div>

          <div className="flex-1 overflow-y-auto">
            {/* ─── NAVIGATION BAR ─── */}
            <nav style={{ background: ct.navBg, color: ct.navText }} className="px-12 py-4 flex items-center justify-between sticky top-0 z-50">
              <div className="flex items-center gap-4">
                {clinicPhoto && <img src={clinicPhoto} alt="" className="w-10 h-10 rounded-full object-cover border-2 border-white/20" />}
                <span className="text-lg font-bold tracking-tight">{clinicName}</span>
              </div>
              <div className="flex items-center gap-8 text-[11px] font-medium tracking-wide">
                {[
                  { label: "Home", target: "portal-hero" },
                  { label: "About", target: "portal-hero" },
                  { label: "Services", target: "portal-services" },
                  { label: "Doctors", target: "portal-doctors" },
                  { label: "Contact", target: "portal-contact" },
                ].map(link => (
                  <span key={link.label} onClick={() => document.getElementById(link.target)?.scrollIntoView({ behavior: "smooth", block: "start" })} className="opacity-60 hover:opacity-100 cursor-pointer transition-opacity">{link.label}</span>
                ))}
                <button onClick={() => document.getElementById("portal-booking")?.scrollIntoView({ behavior: "smooth", block: "start" })} style={{ background: ct.accent, color: ct.accentText }} className="px-5 py-2 rounded-lg text-[10px] font-bold uppercase tracking-wider">Book Now</button>
              </div>
            </nav>

            {/* HERO SECTION */}
            <section id="portal-hero" style={{ background: ct.heroBg }} className="relative min-h-[480px] flex items-center overflow-hidden">
              {clinicBanner && <img src={clinicBanner} alt="" className="absolute inset-0 w-full h-full object-cover" />}
              <div className="absolute inset-0" style={{ background: `linear-gradient(135deg, ${ct.heroBg}ee 0%, ${ct.heroBg}88 50%, transparent 100%)` }} />
              <div className="relative z-10 px-16 max-w-2xl space-y-6">
                <h1 style={{ color: ct.heroText }} className="text-5xl font-bold leading-tight tracking-tight">
                  Welcome to {clinicName}
                </h1>
                <p style={{ color: ct.heroText }} className="text-base opacity-60 leading-relaxed">
                  {clinicTagline}
                </p>
                <button style={{ border: `2px solid ${ct.heroText}`, color: ct.heroText }} className="px-8 py-3 rounded-lg text-sm font-semibold uppercase tracking-wider hover:opacity-80 transition-opacity bg-transparent">
                  Read More
                </button>
              </div>
            </section>

            {/* ─── QUICK INFO BAR ─── */}
            <div id="portal-contact" style={{ background: ct.accent, color: ct.accentText }} className="grid grid-cols-3 divide-x divide-white/10">
              <div className="p-6 flex items-center gap-4 justify-center">
                <Phone size={18} className="opacity-60" />
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wider opacity-60">Phone</p>
                  <p className="text-sm font-semibold">{contact.phone}</p>
                </div>
              </div>
              <div className="p-6 flex items-center gap-4 justify-center">
                <Clock size={18} className="opacity-60" />
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wider opacity-60">Hours</p>
                  <p className="text-sm font-semibold">{hours.open} — {hours.close}</p>
                </div>
              </div>
              <div className="p-6 flex items-center gap-4 justify-center">
                <Mail size={18} className="opacity-60" />
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wider opacity-60">Email</p>
                  <p className="text-sm font-semibold">{contact.email}</p>
                </div>
              </div>
            </div>

            {/* ─── DELAY WARNING ─── */}
            {doctors.some(d => d.status === 'Late') && (
              <div className="mx-16 mt-8 bg-amber-50 border border-amber-200 p-5 rounded-xl flex items-center gap-4">
                 <AlertCircle className="text-amber-600 shrink-0" size={18} />
                 <p className="text-sm text-amber-800">Schedule notice: Current average delay is <strong>+{doctors.reduce((a: any,c: any)=>a+c.delay,0)} minutes</strong>. Appointment times may shift slightly.</p>
              </div>
            )}

            {/* ─── DOCTORS SECTION (VIDA STYLE) ─── */}
            <section id="portal-doctors" className="px-16 py-16" style={{ background: ct.sectionBg }}>
              <div className="mb-10">
                <h2 className="text-3xl font-bold tracking-tight" style={{ color: ct.bodyText }}>Our Doctors and Medical Professionals</h2>
                <p className="text-sm mt-1" style={{ color: ct.muted }}>Our Specialists</p>
              </div>
              <div className="grid grid-cols-4 gap-6">
                {doctors.map(d => (
                  <div key={d.id} className="rounded-2xl overflow-hidden shadow-lg transition-all hover:shadow-xl hover:-translate-y-1" style={{ background: ct.cardBg, borderColor: ct.cardBorder, borderWidth: 1 }}>
                    <div className="aspect-[3/4] relative overflow-hidden" style={{ background: ct.sectionBg }}>
                      {d.photo ? (
                        <img src={d.photo} alt="" className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <User size={48} style={{ color: ct.muted }} className="opacity-30" />
                        </div>
                      )}
                    </div>
                    <div className="p-5 space-y-2">
                      <p className="text-[11px] font-semibold uppercase tracking-wider" style={{ color: d.status === 'Late' ? '#d97706' : ct.accent }}>{d.specialty || "General"}</p>
                      <div className="flex items-center justify-between">
                        <h4 className="text-base font-bold" style={{ color: ct.bodyText }}>{d.name}</h4>
                        <ChevronRight size={16} style={{ color: ct.accent }} />
                      </div>
                      <p className="text-xs italic leading-relaxed" style={{ color: ct.muted }}>"{d.quote || "Dedicated to patient care."}"</p>
                      {d.status === 'Late' && d.delay > 0 && (
                        <p className="text-[10px] font-bold text-amber-600 mt-1">⏱ Running {d.delay} min late</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* ─── SERVICES SECTION ─── */}
            <section id="portal-services" className="px-16 py-16" style={{ background: ct.bodyBg }}>
              <h2 className="text-3xl font-bold tracking-tight mb-2" style={{ color: ct.bodyText }}>Our Services</h2>
              <p className="text-sm mb-10" style={{ color: ct.muted }}>Comprehensive healthcare solutions for you and your family</p>
              <div className="grid grid-cols-3 gap-6">
                {services.map(s => (
                  <div key={s.id} className="rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-all hover:-translate-y-0.5 cursor-pointer" style={{ background: ct.cardBg, border: `1px solid ${ct.cardBorder}` }}>
                    <div className="h-40 overflow-hidden" style={{ background: ct.sectionBg }}>
                      {s.photo ? <img src={s.photo} alt="" className="w-full h-full object-cover" /> : (
                        <div className="w-full h-full flex items-center justify-center"><Activity size={32} style={{ color: ct.muted }} className="opacity-20" /></div>
                      )}
                    </div>
                    <div className="p-5 flex items-center justify-between">
                      <span className="text-sm font-semibold" style={{ color: ct.bodyText }}>{s.name}</span>
                      <ChevronRight size={16} style={{ color: ct.accent }} />
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* ─── REVIEWS (GOOGLE STYLE) ─── */}
            {reviews.length > 0 && (
              <section className="px-16 py-16" style={{ background: ct.sectionBg }}>
                <h2 className="text-3xl font-bold tracking-tight mb-10" style={{ color: ct.bodyText }}>Patient Reviews</h2>
                <div className="grid grid-cols-3 gap-6">
                  {reviews.map(r => (
                    <div key={r.id} className="rounded-2xl p-6 space-y-4 shadow-sm hover:shadow-md transition-shadow" style={{ background: ct.cardBg, border: `1px solid ${ct.cardBorder}` }}>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm" style={{ background: ct.accent }}>
                          {r.author[0]}
                        </div>
                        <div>
                          <p className="text-sm font-bold" style={{ color: ct.bodyText }}>{r.author}</p>
                          <p className="text-[10px]" style={{ color: ct.muted }}>Verified Patient</p>
                        </div>
                      </div>
                      <div className="flex gap-0.5">
                        {Array.from({ length: r.rating || 5 }).map((_, i) => (
                          <Star key={i} size={14} fill="#facc15" className="text-yellow-400" />
                        ))}
                      </div>
                      <p className="text-sm leading-relaxed" style={{ color: ct.bodyText }}>{r.text}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* ─── NEWS & UPDATES (VIDA STYLE) ─── */}
            {news.length > 0 && (
              <section className="px-16 py-16" style={{ background: ct.bodyBg }}>
                <h2 className="text-3xl font-bold tracking-tight mb-2" style={{ color: ct.bodyText }}>News & Updates</h2>
                <p className="text-sm mb-10" style={{ color: ct.muted }}>List of our featured resources</p>
                <div className="grid grid-cols-4 gap-6">
                  {news.map(n => (
                    <div key={n.id} className="group cursor-pointer">
                      <div className="aspect-video rounded-xl overflow-hidden mb-4 shadow-sm" style={{ background: ct.sectionBg }}>
                        {n.photo ? <img src={n.photo} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" /> : (
                          <div className="w-full h-full flex items-center justify-center"><FileText size={24} style={{ color: ct.muted }} className="opacity-20" /></div>
                        )}
                      </div>
                      <h4 className="text-sm font-bold leading-snug mb-2 group-hover:underline" style={{ color: ct.accent }}>{n.title}</h4>
                      <p className="text-xs leading-relaxed mb-2" style={{ color: ct.muted }}>{n.desc || ""}</p>
                      <span className="text-[11px] font-semibold flex items-center gap-1" style={{ color: ct.bodyText }}>read more <ChevronRight size={12} /></span>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* ─── CTA / BOOKING ─── */}
            <section id="portal-booking" className="px-16 py-20 text-center" style={{ background: ct.heroBg }}>
              <h2 className="text-4xl font-bold mb-4" style={{ color: ct.heroText }}>Book Your Appointment</h2>
              <p className="text-base mb-8 opacity-60" style={{ color: ct.heroText }}>Schedule your visit online in seconds. We're ready to care for you.</p>
              <button className="px-10 py-4 rounded-xl text-sm font-bold uppercase tracking-wider shadow-2xl hover:scale-105 active:scale-95 transition-all" style={{ background: ct.accentText === '#fff' ? '#fff' : ct.accent, color: ct.accentText === '#fff' ? ct.accent : ct.accentText }}>
                Request Instant Slot
              </button>
            </section>

            {/* ─── FOOTER ─── */}
            <footer style={{ background: ct.navBg, color: ct.navText }} className="px-16 py-10">
              <div className="flex justify-between items-start">
                <div className="space-y-2">
                  <h3 className="text-lg font-bold">{clinicName}</h3>
                  <p className="text-xs opacity-40">{contact.email} · {contact.phone}</p>
                  <p className="text-xs opacity-40">Open {hours.open} — {hours.close}</p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] uppercase tracking-widest opacity-30">Powered by</p>
                  <p className="text-sm font-bold mt-1">FlexSlot</p>
                </div>
              </div>
            </footer>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
