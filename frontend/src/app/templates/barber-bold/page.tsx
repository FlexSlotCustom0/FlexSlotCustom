"use client";

import { motion } from "framer-motion";
import {
  MapPin, Clock, Phone, Star, ArrowRight, Calendar,
  ChevronRight, Share2, Scissors, Crown, Camera,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

/* ── Editable shop data ── */
const shop = {
  name: "The King's Cut",
  tagline: "Precision grooming for the modern gentleman",
  logo: "👑",
  primaryColor: "#d4a017",
  address: "18 High Street, Kandy",
  phone: "+94 76 987 6543",
  hours: "Tue–Sun · 10 AM – 8 PM",
  rating: 4.8,
  reviewCount: 189,
  instagram: "@thekingscut",
};

const staff = [
  { name: "Dilan", role: "Master Barber", avatar: "💈", specialty: "Fades & Lineups" },
  { name: "Ashan", role: "Senior Barber", avatar: "✂️", specialty: "Beard Sculpting" },
  { name: "Tharindu", role: "Stylist", avatar: "🪮", specialty: "Modern Cuts" },
];

const services = [
  { name: "Classic Haircut", price: "$25", duration: "30 min", popular: false },
  { name: "Skin Fade", price: "$30", duration: "45 min", popular: true },
  { name: "Hot Towel Shave", price: "$20", duration: "30 min", popular: false },
  { name: "Beard Trim & Shape", price: "$15", duration: "20 min", popular: false },
  { name: "The King's Package", price: "$55", duration: "1.5 hrs", popular: true },
  { name: "Hair Color", price: "$45", duration: "1 hr", popular: false },
];

const galleryGradients = [
  "linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)",
  "linear-gradient(135deg, #0f3460 0%, #533483 100%)",
  "linear-gradient(135deg, #2c3333 0%, #395B64 100%)",
  "linear-gradient(135deg, #1B1A17 0%, #3D3C3A 100%)",
];

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.06, duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function BarberBoldTemplate() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white font-sans selection:bg-yellow-900/40">
      {/* ── Sticky Nav ── */}
      <nav className="fixed w-full z-50 bg-[#0a0a0a]/80 backdrop-blur-md border-b border-white/5">
        <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xl">{shop.logo}</span>
            <span className="font-bold text-base">{shop.name}</span>
          </div>
          <div className="flex items-center gap-3">
            <button className="p-2 rounded-xl hover:bg-white/5 transition-colors">
              <Share2 className="w-4 h-4 text-gray-500" />
            </button>
            <button
              className="text-black text-sm font-bold px-4 py-2 rounded-xl transition-all hover:scale-[1.03] shadow-lg"
              style={{ backgroundColor: shop.primaryColor }}
            >
              Book Now
            </button>
          </div>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section className="pt-14">
        <div className="relative h-80 md:h-[28rem] bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f3460] overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(212,160,23,0.15),transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_60%,rgba(212,160,23,0.08),transparent_50%)]" />

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/80 to-transparent"
          >
            <div className="max-w-5xl mx-auto">
              <div className="flex items-center gap-2 mb-3">
                <div className="flex items-center gap-1 px-2.5 py-1 rounded-full border border-white/10 bg-white/5 backdrop-blur-md">
                  <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm font-bold" style={{ color: shop.primaryColor }}>
                    {shop.rating}
                  </span>
                  <span className="text-gray-500 text-xs">({shop.reviewCount})</span>
                </div>
              </div>
              <h1 className="text-5xl md:text-7xl font-serif text-white mb-2 tracking-tight">
                {shop.name}
              </h1>
              <p className="text-gray-400 font-medium text-base md:text-lg">
                {shop.tagline}
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-6">
        {/* ── Info Bar ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="flex flex-wrap gap-6 py-6 border-b border-white/5 text-sm text-gray-500 font-medium"
        >
          <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4" /> {shop.address}</span>
          <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" /> {shop.hours}</span>
          <span className="flex items-center gap-1.5"><Phone className="w-4 h-4" /> {shop.phone}</span>
          <span className="flex items-center gap-1.5"><Camera className="w-4 h-4" /> {shop.instagram}</span>
        </motion.div>

        {/* ── The Crew ── */}
        <section className="py-12">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <motion.h2
              custom={0}
              variants={fadeUp}
              className="text-xs font-black tracking-widest uppercase mb-6"
              style={{ color: shop.primaryColor }}
            >
              The Crew
            </motion.h2>
            <div className="grid grid-cols-3 gap-4">
              {staff.map((s, i) => (
                <motion.div
                  key={s.name}
                  custom={i + 1}
                  variants={fadeUp}
                  className="text-center p-6 rounded-3xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] transition-all cursor-pointer group"
                >
                  <div className="text-4xl mb-3">{s.avatar}</div>
                  <h4 className="font-bold text-sm">{s.name}</h4>
                  <p className="text-xs text-gray-500 font-medium">{s.role}</p>
                  <p className="text-[10px] mt-2 font-bold uppercase tracking-wider" style={{ color: shop.primaryColor }}>
                    {s.specialty}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* ── Services ── */}
        <section className="py-12 border-t border-white/5">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <motion.h2
              custom={0}
              variants={fadeUp}
              className="text-xs font-black tracking-widest uppercase mb-6"
              style={{ color: shop.primaryColor }}
            >
              Services & Pricing
            </motion.h2>
            <div className="space-y-2">
              {services.map((svc, i) => (
                <motion.div
                  key={svc.name}
                  custom={i + 1}
                  variants={fadeUp}
                  className="flex items-center justify-between p-4 rounded-2xl border border-white/5 hover:border-white/10 hover:bg-white/[0.02] transition-all group cursor-pointer"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center">
                      <Scissors className="w-4 h-4 text-gray-400" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-bold text-sm">{svc.name}</h4>
                        {svc.popular && (
                          <span
                            className="text-[9px] font-black tracking-widest uppercase px-2 py-0.5 rounded-full"
                            style={{
                              backgroundColor: shop.primaryColor + "20",
                              color: shop.primaryColor,
                            }}
                          >
                            Popular
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-gray-500 font-medium">{svc.duration}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-bold text-base">{svc.price}</span>
                    <ChevronRight className="w-4 h-4 text-gray-600 group-hover:text-white group-hover:translate-x-0.5 transition-all" />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* ── Gallery ── */}
        <section className="py-12 border-t border-white/5">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <motion.h2
              custom={0}
              variants={fadeUp}
              className="text-xs font-black tracking-widest uppercase mb-6"
              style={{ color: shop.primaryColor }}
            >
              The Shop
            </motion.h2>
            <div className="grid grid-cols-2 gap-3">
              {galleryGradients.map((bg, i) => (
                <motion.div
                  key={i}
                  custom={i + 1}
                  variants={fadeUp}
                  className="aspect-[4/3] rounded-2xl overflow-hidden hover:scale-[1.02] transition-transform cursor-pointer"
                  style={{ background: bg }}
                />
              ))}
            </div>
          </motion.div>
        </section>

        {/* ── Reviews ── */}
        <section className="py-12 border-t border-white/5">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <motion.h2
              custom={0}
              variants={fadeUp}
              className="text-xs font-black tracking-widest uppercase mb-6"
              style={{ color: shop.primaryColor }}
            >
              Reviews
            </motion.h2>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                { name: "Jason P.", text: "Cleanest fade I've ever had. This place is different. The vibe, the music, the cut — everything's on point.", rating: 5 },
                { name: "Chris M.", text: "The King's Package is worth every penny. Hot towel shave was unreal. Already booked my next one.", rating: 5 },
              ].map((r, i) => (
                <motion.div
                  key={r.name}
                  custom={i + 1}
                  variants={fadeUp}
                  className="p-6 rounded-2xl border border-white/5 bg-white/[0.02]"
                >
                  <div className="flex items-center gap-1 mb-3">
                    {Array.from({ length: r.rating }).map((_, j) => (
                      <Star key={j} className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-sm text-gray-400 font-medium mb-3 leading-relaxed">
                    "{r.text}"
                  </p>
                  <span className="text-xs font-bold text-gray-600">{r.name}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>
      </div>

      {/* ── Sticky Mobile CTA ── */}
      <div className="fixed bottom-0 left-0 right-0 md:hidden z-50 p-4 bg-[#0a0a0a]/80 backdrop-blur-md border-t border-white/5">
        <button
          className="w-full text-black font-bold py-3.5 rounded-2xl flex items-center justify-center gap-2 shadow-xl"
          style={{ backgroundColor: shop.primaryColor }}
        >
          <Calendar className="w-4 h-4" /> Book Appointment
        </button>
      </div>

      {/* ── Footer ── */}
      <footer className="mt-12 border-t border-white/5 py-12 px-6">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <span className="text-xl">{shop.logo}</span>
            <span className="font-bold">{shop.name}</span>
          </div>
          <p className="text-xs text-gray-600">
            Powered by <span className="font-bold text-white">FlexSlotCustom</span>
          </p>
        </div>
      </footer>
      <div className="h-20 md:hidden" />
    </div>
  );
}
