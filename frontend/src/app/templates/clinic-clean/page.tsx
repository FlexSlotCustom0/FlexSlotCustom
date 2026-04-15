"use client";

import { motion } from "framer-motion";
import {
  MapPin, Clock, Phone, Star, Calendar, ChevronRight,
  Share2, Heart, Shield, Award, FileText, HelpCircle, Stethoscope,
} from "lucide-react";
import Link from "next/link";

import { useTemplateContext } from "@/components/TemplateContext";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.06, duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function ClinicCleanTemplate() {
  const { 
    shopData: shop, 
    staff: doctors, 
    offerings: serviceCategories,
    faqs,
    reviews
  } = useTemplateContext();

  return (
    <div className="min-h-screen bg-white text-black font-sans selection:bg-blue-100">
      {/* ── Announcement Bar ── */}
      <div style={{ backgroundColor: shop.primaryColor }} className="text-white text-center py-2.5 text-xs font-bold tracking-wide relative z-[60]">
        <Shield className="w-3.5 h-3.5 inline mr-1.5 mb-0.5" />
        {shop.announcement}
      </div>

      {/* ── Sticky Nav ── */}
      <nav className="sticky top-0 w-full z-50 bg-white/90 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2">
            {shop.logoUrl ? (
              <img src={shop.logoUrl} alt="Logo" className="h-8 w-auto object-contain" />
            ) : (
              <span className="text-xl">{shop.logo}</span>
            )}
            <span className="font-bold text-base">{shop.name}</span>
          </div>
          <div className="flex items-center gap-3">
            <button className="hidden md:flex items-center gap-1.5 text-sm font-medium text-gray-500 hover:text-black transition-colors">
              <Phone className="w-3.5 h-3.5" /> {shop.phone}
            </button>
            <button
              className="text-white text-sm font-bold px-5 py-2 rounded-xl transition-all hover:scale-[1.03] shadow-lg"
              style={{ backgroundColor: shop.primaryColor }}
            >
              Book Appointment
            </button>
          </div>
        </div>
      </nav>

      {/* ── Hero (Split Layout) ── */}
      <section className="max-w-5xl mx-auto px-6 py-16 md:py-24">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-2 mb-4">
              <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-green-50 border border-green-100">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span className="text-xs font-bold text-green-700">Accepting Patients</span>
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-serif tracking-tight mb-4 leading-[1.1]">
              Trusted healthcare for your whole family.
            </h1>
            <p className="text-gray-500 font-medium text-base md:text-lg mb-8 leading-relaxed">
              {shop.tagline}. Our experienced team of doctors provides comprehensive care in a modern, comfortable environment.
            </p>
            <div className="flex items-center gap-4">
              <button
                className="text-white font-bold px-6 py-3 rounded-xl flex items-center gap-2 shadow-lg hover:scale-[1.02] transition-all"
                style={{ backgroundColor: shop.primaryColor }}
              >
                <Calendar className="w-4 h-4" /> Schedule a Visit
              </button>
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span className="font-bold text-sm">{shop.rating}</span>
                <span className="text-gray-400 text-sm">({shop.reviewCount} reviews)</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="rounded-3xl overflow-hidden aspect-[4/3] relative shadow-2xl shadow-blue-500/10 border border-gray-100"
            style={{ 
              background: shop.bannerUrl 
                ? `url(${shop.bannerUrl}) center/cover no-repeat` 
                : shop.bannerGradient 
            }}
          >
            {!shop.bannerUrl && (
              <div className="w-full h-full flex items-center justify-center text-8xl grayscale opacity-50">🏥</div>
            )}
          </motion.div>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-6">
        {/* ── Quick Info ── */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex flex-wrap gap-6 py-6 border-y border-gray-100 text-sm text-gray-500 font-medium"
        >
          <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4" /> {shop.address}</span>
          <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" /> {shop.hours}</span>
          <span className="flex items-center gap-1.5"><Phone className="w-4 h-4" /> {shop.phone}</span>
        </motion.div>

        {/* ── Our Doctors ── */}
        <section className="py-14">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <motion.h2 custom={0} variants={fadeUp} className="text-xs font-black tracking-widest uppercase text-gray-400 mb-2">
              Our Specialists
            </motion.h2>
            <motion.h3 custom={0} variants={fadeUp} className="text-2xl font-serif tracking-tight mb-8">
              Experienced, certified professionals
            </motion.h3>
            <div className="grid md:grid-cols-3 gap-6">
              {doctors.map((d, i) => (
                <motion.div
                  key={d.name}
                  custom={i + 1}
                  variants={fadeUp}
                  className="p-6 rounded-[2.5rem] border border-gray-100 bg-gray-50/50 hover:bg-white hover:shadow-xl transition-all group cursor-pointer text-center"
                >
                  <div className="w-20 h-20 mx-auto mb-4 rounded-3xl overflow-hidden shadow-md group-hover:scale-105 transition-transform">
                    {d.imageUrl ? (
                      <img src={d.imageUrl} alt={d.name} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full bg-white flex items-center justify-center text-4xl">{d.avatar}</div>
                    )}
                  </div>
                  <h4 className="font-bold text-sm">{d.name}</h4>
                  <p className="text-xs text-gray-500 font-medium mb-1">{d.role}</p>
                  <p className="text-[10px] font-black tracking-widest uppercase" style={{ color: shop.primaryColor }}>
                    {d.credentials || d.specialty}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* ── Services ── */}
        <section className="py-14 border-t border-gray-100">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }}>
            {serviceCategories.map((cat, catIdx) => (
              <div key={cat.label || cat.name} className={catIdx > 0 ? "mt-10" : ""}>
                <motion.h2 custom={catIdx} variants={fadeUp} className="text-xs font-black tracking-widest uppercase text-gray-400 mb-2">
                  {cat.label || cat.name}
                </motion.h2>
                <div className="space-y-2 mt-4">
                  {cat.services.map((svc: any, i: number) => (
                    <motion.div
                      key={svc.name}
                      custom={i + catIdx + 1}
                      variants={fadeUp}
                      className="flex items-center justify-between p-5 rounded-3xl border border-gray-50 hover:border-gray-200 hover:shadow-sm transition-all group cursor-pointer bg-white"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110" style={{ background: shop.primaryColor + "08" }}>
                          <Stethoscope className="w-5 h-5 transition-transform" style={{ color: shop.primaryColor }} />
                        </div>
                        <div>
                          <h4 className="font-bold text-sm tracking-tight">{svc.name}</h4>
                          <p className="text-[10px] text-gray-400 font-medium tracking-wide">{svc.desc || "Professional clinical procedure"}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 shrink-0">
                        <div className="text-right hidden sm:block">
                          <span className="font-black text-sm block tracking-tight">{svc.price}</span>
                          <span className="text-[10px] text-gray-300 font-bold uppercase tracking-widest">{svc.duration}</span>
                        </div>
                        <ChevronRight className="w-4 h-4 text-gray-200 group-hover:text-black group-hover:translate-x-0.5 transition-all" />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            ))}
          </motion.div>
        </section>

        {/* ── FAQ ── */}
        <section className="py-14 border-t border-gray-100">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <motion.h2 custom={0} variants={fadeUp} className="text-xs font-black tracking-widest uppercase text-gray-400 mb-2">
              Preparing for your visit
            </motion.h2>
            <motion.h3 custom={0} variants={fadeUp} className="text-2xl font-serif tracking-tight mb-8">
              Frequently Asked Questions
            </motion.h3>
            <div className="grid md:grid-cols-2 gap-4">
              {faqs.map((faq, i) => (
                <motion.div
                  key={i}
                  custom={i + 1}
                  variants={fadeUp}
                  className="p-6 rounded-3xl bg-blue-50/30 border border-blue-100/30 hover:bg-white hover:border-blue-200 transition-all"
                >
                  <div className="flex items-start gap-4">
                    <HelpCircle className="w-5 h-5 mt-0.5 shrink-0" style={{ color: shop.primaryColor }} />
                    <div>
                      <h4 className="font-bold text-sm mb-2 leading-tight">{faq.q}</h4>
                      <p className="text-xs text-gray-500 font-medium leading-relaxed italic opacity-80">{faq.a}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* ── Reviews ── */}
        <section className="py-14 border-t border-gray-100">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <motion.h2 custom={0} variants={fadeUp} className="text-xs font-black tracking-widest uppercase text-gray-400 mb-8">
              Patient Testimonials
            </motion.h2>
            <div className="grid md:grid-cols-2 gap-6">
              {reviews.map((r, i) => (
                <motion.div
                  key={i}
                  custom={i + 1}
                  variants={fadeUp}
                  className="p-8 rounded-[2.5rem] border border-gray-100 bg-white shadow-sm hover:shadow-md transition-all"
                >
                  <div className="flex items-center gap-1 mb-4">
                    {Array.from({ length: r.rating }).map((_, j) => (
                      <Star key={j} className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-sm text-gray-600 font-medium mb-4 italic leading-relaxed">"{r.text}"</p>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center font-bold text-[10px] text-gray-400">{r.name.charAt(0)}</div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">{r.name}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>
      </div>

      {/* ── Sticky Mobile CTA ── */}
      <div className="fixed bottom-0 left-0 right-0 md:hidden z-[90] p-4 bg-white/80 backdrop-blur-md border-t border-gray-100">
        <button
          className="w-full text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-2 shadow-2xl transition-transform active:scale-95"
          style={{ backgroundColor: shop.primaryColor }}
        >
          <Calendar className="w-4 h-4" /> Book Appointment
        </button>
      </div>

      {/* ── Footer ── */}
      <footer className="mt-12 bg-gray-50 border-t border-gray-100 py-16 px-6">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-3">
            {shop.logoUrl ? (
              <img src={shop.logoUrl} className="h-6 w-auto" />
            ) : (
              <span className="text-2xl">{shop.logo}</span>
            )}
            <span className="font-bold tracking-tight text-lg">{shop.name}</span>
          </div>
          <div className="flex items-center gap-6">
             <span className="text-[10px] font-black uppercase tracking-widest text-gray-300">© 2026 {shop.name}</span>
             <p className="text-[10px] text-gray-400">
                Crafted with <span className="font-bold text-black">FlexSlotCustom</span>
             </p>
          </div>
        </div>
      </footer>
      <div className="h-24 md:hidden" />
    </div>
  );
}
