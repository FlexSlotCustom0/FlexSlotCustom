"use client";

import { motion } from "framer-motion";
import {
  MapPin, Clock, Phone, Star, Calendar, ChevronRight,
  Share2, Heart, PawPrint, Shield, HelpCircle,
} from "lucide-react";
import Link from "next/link";

import { useTemplateContext } from "@/components/TemplateContext";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.06, duration: 0.5, ease: [0.22, 1, 0.36, 1] as any },
  }),
};

export default function VetWarmTemplate() {
  const { 
    shopData: shop, 
    staff: vets, 
    offerings: services,
    tips,
    reviews
  } = useTemplateContext();

  return (
    <div className="min-h-screen bg-[#fffbf5] text-black font-sans selection:bg-orange-100">
      {/* ── Sticky Nav ── */}
      <nav className="sticky top-0 w-full z-50 bg-[#fffbf5]/90 backdrop-blur-md border-b border-orange-100/50">
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
            <button className="p-2 rounded-xl hover:bg-orange-50 transition-colors">
              <Phone className="w-4 h-4 text-gray-400" />
            </button>
            <button
              className="text-white text-sm font-bold px-4 py-2 rounded-xl transition-all hover:scale-[1.03] shadow-lg"
              style={{ backgroundColor: shop.primaryColor }}
            >
              Book Visit
            </button>
          </div>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section className="max-w-5xl mx-auto px-6 py-16 md:py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-2 mb-4">
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-orange-50 border border-orange-100">
                <PawPrint className="w-3.5 h-3.5" style={{ color: shop.primaryColor }} />
                <span className="text-xs font-bold" style={{ color: shop.primaryColor }}>
                  Caring for pets since 2010
                </span>
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-serif tracking-tight mb-4 leading-[1.1]">
              Your pet deserves the best care.
            </h1>
            <p className="text-gray-500 font-medium text-base md:text-lg mb-8 leading-relaxed">
              {shop.tagline}. From routine checkups to emergency surgery, our veterinarians treat every pet like their own.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <button
                className="text-white font-bold px-6 py-3 rounded-xl flex items-center gap-2 shadow-lg hover:scale-[1.02] transition-all"
                style={{ backgroundColor: shop.primaryColor }}
              >
                <Calendar className="w-4 h-4" /> Book a Visit
              </button>
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span className="font-bold text-sm">{shop.rating}</span>
                <span className="text-gray-400 text-sm">({shop.reviewCount} reviews)</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="rounded-[2.5rem] overflow-hidden aspect-square flex items-center justify-center relative shadow-2xl shadow-orange-500/10 border border-orange-100"
            style={{ 
              background: shop.bannerUrl 
                ? `url(${shop.bannerUrl}) center/cover no-repeat` 
                : "linear-gradient(135deg, #ffedd5 0%, #fff7ed 50%, #fef3c7 100%)" 
            }}
          >
            {!shop.bannerUrl && <div className="text-[120px]">🐕</div>}
            <div className="absolute bottom-4 right-4 bg-white/80 backdrop-blur-md rounded-2xl p-3 shadow-lg border border-orange-100">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                  <Shield className="w-4 h-4 text-green-600" />
                </div>
                <div>
                  <p className="text-xs font-bold">Certified Clinic</p>
                  <p className="text-[10px] text-gray-400">SLVMA Registered</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-6">
        {/* ── Quick Info ── */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex flex-wrap gap-6 py-6 border-y border-orange-100/50 text-sm text-gray-500 font-medium"
        >
          <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4" /> {shop.address}</span>
          <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" /> {shop.hours}</span>
          <span className="flex items-center gap-1.5"><Phone className="w-4 h-4" /> {shop.phone}</span>
        </motion.div>

        {/* ── Our Team ── */}
        <section className="py-14">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <motion.h2 custom={0} variants={fadeUp} className="text-xs font-black tracking-widest uppercase text-gray-400 mb-2">
              Our Veterinary Team
            </motion.h2>
            <motion.h3 custom={0} variants={fadeUp} className="text-2xl font-serif tracking-tight mb-8">
              Passionate animal lovers
            </motion.h3>
            <div className="grid md:grid-cols-3 gap-6">
              {vets.map((v, i) => (
                <motion.div
                  key={v.name}
                  custom={i + 1}
                  variants={fadeUp}
                  className="p-6 rounded-[2rem] border border-orange-100/30 bg-white hover:bg-orange-50/30 hover:shadow-xl transition-all cursor-pointer text-center group"
                >
                  <div className="w-24 h-24 mx-auto mb-4 rounded-[2rem] overflow-hidden shadow-sm border-2 border-orange-50 group-hover:scale-105 transition-transform">
                    {v.imageUrl ? (
                      <img src={v.imageUrl} alt={v.name} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full bg-orange-50 flex items-center justify-center text-4xl">{v.avatar}</div>
                    )}
                  </div>
                  <h4 className="font-bold text-sm tracking-tight">{v.name}</h4>
                  <p className="text-xs text-gray-500 font-medium mb-1">{v.role}</p>
                  <p className="text-[10px] font-black tracking-[0.2em] uppercase" style={{ color: shop.primaryColor }}>
                    {v.specialty || v.credentials}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* ── Services ── */}
        <section className="py-14 border-t border-orange-100/50">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <motion.h2 custom={0} variants={fadeUp} className="text-xs font-black tracking-widest uppercase text-gray-400 mb-2">
              Our Services
            </motion.h2>
            <motion.h3 custom={0} variants={fadeUp} className="text-2xl font-serif tracking-tight mb-8">
              Comprehensive pet healthcare
            </motion.h3>
            <div className="grid md:grid-cols-2 gap-4">
              {services.map((svc: any, i: number) => (
                <motion.div
                  key={svc.name}
                  custom={i + 1}
                  variants={fadeUp}
                  className="flex items-center justify-between p-5 rounded-[2rem] border border-orange-50 bg-white hover:border-orange-200 hover:shadow-sm transition-all group cursor-pointer"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-orange-50/50 flex items-center justify-center text-xl transition-transform group-hover:scale-110">
                      {svc.icon || "🐾"}
                    </div>
                    <div>
                      <h4 className="font-bold text-sm tracking-tight">{svc.name}</h4>
                      <p className="text-xs text-gray-400 font-medium">{svc.desc || "Professional pet care service"}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    <div className="text-right">
                      <span className="font-black text-sm block tracking-tight">{svc.price}</span>
                      <span className="text-[10px] text-gray-300 font-bold uppercase tracking-widest">{svc.duration}</span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-gray-200 group-hover:text-black group-hover:translate-x-0.5 transition-all" />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* ── Pet Care Tips ── */}
        <section className="py-14 border-t border-orange-100/50">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <motion.h2 custom={0} variants={fadeUp} className="text-xs font-black tracking-widest uppercase text-gray-400 mb-2">
              Pet Care Tips
            </motion.h2>
            <motion.h3 custom={0} variants={fadeUp} className="text-2xl font-serif tracking-tight mb-8">
              Helpful info for pet parents
            </motion.h3>
            <div className="space-y-4">
              {tips.map((tip, i) => (
                <motion.div
                  key={i}
                  custom={i + 1}
                  variants={fadeUp}
                  className="p-6 rounded-[2.5rem] bg-orange-50/40 border border-orange-100/30 hover:bg-white hover:border-orange-200 transition-all"
                >
                  <div className="flex items-start gap-4">
                    <PawPrint className="w-5 h-5 mt-0.5 shrink-0" style={{ color: shop.primaryColor }} />
                    <div>
                      <h4 className="font-serif font-bold text-base mb-1 italic">{tip.title}</h4>
                      <p className="text-sm text-gray-500 font-medium leading-relaxed italic opacity-80">{tip.tip}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* ── Reviews ── */}
        <section className="py-14 border-t border-orange-100/50">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <motion.h2 custom={0} variants={fadeUp} className="text-xs font-black tracking-widest uppercase text-gray-400 mb-8">
              Happy Pet Parents
            </motion.h2>
            <div className="grid md:grid-cols-2 gap-6">
              {reviews.map((r, i) => (
                <motion.div
                  key={i}
                  custom={i + 1}
                  variants={fadeUp}
                  className="p-8 rounded-[2.5rem] bg-white border border-orange-100/50 shadow-sm hover:shadow-md transition-all"
                >
                  <div className="flex items-center gap-1 mb-4">
                    {Array.from({ length: r.rating }).map((_, j) => (
                      <Star key={j} className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-sm text-gray-600 font-medium mb-4 italic leading-relaxed">"{r.text}"</p>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-orange-50 flex items-center justify-center font-bold text-[10px] text-orange-400">{r.name.charAt(0)}</div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">{r.name}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>
      </div>

      {/* ── Sticky Mobile CTA ── */}
      <div className="fixed bottom-0 left-0 right-0 md:hidden z-[90] p-4 bg-[#fffbf5]/80 backdrop-blur-md border-t border-orange-100/50">
        <button
          className="w-full text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-2 shadow-2xl transition-transform active:scale-95"
          style={{ backgroundColor: shop.primaryColor }}
        >
          <Calendar className="w-4 h-4" /> Book Visit
        </button>
      </div>

      {/* ── Footer ── */}
      <footer className="mt-12 bg-white border-t border-orange-100/50 py-16 px-6">
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
                Managed via <span className="font-bold text-black">FlexSlot Clinic</span>
             </p>
          </div>
        </div>
      </footer>
      <div className="h-24 md:hidden" />
    </div>
  );
}
