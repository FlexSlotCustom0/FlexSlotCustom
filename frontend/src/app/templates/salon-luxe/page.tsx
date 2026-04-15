"use client";

import { motion } from "framer-motion";
import {
  MapPin, Clock, Phone, Star, Camera, ArrowRight, Calendar,
  ChevronRight, Heart, Share2, Scissors, Sparkles,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

/* ── Editable shop data (owner would customise these) ── */
const shop = {
  name: "Glow Studio",
  tagline: "Where beauty meets artistry",
  logo: "✨",
  bannerGradient: "from-pink-400 via-rose-500 to-fuchsia-600",
  primaryColor: "#e11d73",
  address: "42 Rose Avenue, Colombo 07",
  phone: "+94 77 123 4567",
  hours: "Mon–Sat · 9 AM – 7 PM",
  rating: 4.9,
  reviewCount: 234,
  instagram: "@glowstudio.lk",
  galleryImages: [
    "linear-gradient(135deg, #fbc2eb 0%, #a6c1ee 100%)",
    "linear-gradient(135deg, #fccb90 0%, #d57eeb 100%)",
    "linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)",
    "linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)",
    "linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)",
    "linear-gradient(135deg, #f6d365 0%, #fda085 100%)",
  ],
};

const staff = [
  { name: "Amaya", role: "Senior Stylist", avatar: "👩‍🦰", accent: "#e11d73" },
  { name: "Kavi", role: "Color Expert", avatar: "👨‍🦱", accent: "#9333ea" },
  { name: "Nima", role: "Nail Artist", avatar: "👩", accent: "#f59e0b" },
  { name: "Rosh", role: "Makeup", avatar: "💄", accent: "#06b6d4" },
];

const serviceCategories = [
  {
    label: "Hair",
    services: [
      { name: "Haircut & Style", price: "$35", duration: "45 min" },
      { name: "Balayage Color", price: "$120", duration: "2 hrs" },
      { name: "Keratin Treatment", price: "$180", duration: "2.5 hrs" },
      { name: "Blow Dry", price: "$25", duration: "30 min" },
    ],
  },
  {
    label: "Nails",
    services: [
      { name: "Gel Manicure", price: "$40", duration: "1 hr" },
      { name: "Pedicure Deluxe", price: "$55", duration: "1.5 hrs" },
      { name: "Nail Art Set", price: "$65", duration: "1.5 hrs" },
    ],
  },
  {
    label: "Face",
    services: [
      { name: "HydraFacial", price: "$90", duration: "1 hr" },
      { name: "Bridal Makeup", price: "$150", duration: "1.5 hrs" },
      { name: "Lash Extensions", price: "$75", duration: "1 hr" },
    ],
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.06, duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function SalonLuxeTemplate() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="min-h-screen bg-white text-black font-sans selection:bg-pink-100">
      {/* ── Sticky Nav ── */}
      <nav className="fixed w-full z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xl">{shop.logo}</span>
            <span className="font-bold text-base">{shop.name}</span>
          </div>
          <div className="flex items-center gap-3">
            <button className="p-2 rounded-xl hover:bg-gray-50 transition-colors">
              <Heart className="w-4 h-4 text-gray-400" />
            </button>
            <button className="p-2 rounded-xl hover:bg-gray-50 transition-colors">
              <Share2 className="w-4 h-4 text-gray-400" />
            </button>
            <button
              className="text-white text-sm font-bold px-4 py-2 rounded-xl transition-all hover:scale-[1.03] shadow-lg"
              style={{ backgroundColor: shop.primaryColor }}
            >
              Book Now
            </button>
          </div>
        </div>
      </nav>

      {/* ── Hero Banner ── */}
      <section className="pt-14">
        <div
          className={`relative h-72 md:h-96 bg-gradient-to-br ${shop.bannerGradient} overflow-hidden`}
        >
          <div className="absolute inset-0 bg-black/20" />
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMS41IiBmaWxsPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMDgpIi8+PC9zdmc+')] opacity-60" />

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/60 to-transparent"
          >
            <div className="max-w-5xl mx-auto">
              <div className="flex items-center gap-2 mb-2">
                <div className="flex items-center gap-1 bg-white/20 backdrop-blur-md px-2.5 py-1 rounded-full">
                  <Star className="w-3.5 h-3.5 text-yellow-300 fill-yellow-300" />
                  <span className="text-white text-xs font-bold">{shop.rating}</span>
                  <span className="text-white/60 text-xs">({shop.reviewCount})</span>
                </div>
              </div>
              <h1 className="text-4xl md:text-6xl font-serif text-white mb-1">
                {shop.name}
              </h1>
              <p className="text-white/70 font-medium text-base md:text-lg">
                {shop.tagline}
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-6">
        {/* ── Quick Info Bar ── */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap gap-6 py-6 border-b border-gray-100 text-sm text-gray-500 font-medium"
        >
          <span className="flex items-center gap-1.5">
            <MapPin className="w-4 h-4" /> {shop.address}
          </span>
          <span className="flex items-center gap-1.5">
            <Clock className="w-4 h-4" /> {shop.hours}
          </span>
          <span className="flex items-center gap-1.5">
            <Phone className="w-4 h-4" /> {shop.phone}
          </span>
          <span className="flex items-center gap-1.5">
            <Camera className="w-4 h-4" /> {shop.instagram}
          </span>
        </motion.div>

        {/* ── Staff Spotlight ── */}
        <section className="py-12">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <motion.h2
              custom={0}
              variants={fadeUp}
              className="text-xs font-black tracking-widest uppercase text-gray-400 mb-6"
            >
              Our Stylists
            </motion.h2>
            <div className="flex gap-4 overflow-x-auto pb-4 -mx-6 px-6 snap-x snap-mandatory">
              {staff.map((s, i) => (
                <motion.div
                  key={s.name}
                  custom={i + 1}
                  variants={fadeUp}
                  className="shrink-0 snap-start"
                >
                  <div className="w-36 group cursor-pointer">
                    <div
                      className="w-36 h-36 rounded-3xl flex items-center justify-center text-5xl mb-3 border-2 transition-all group-hover:scale-[1.03] group-hover:shadow-lg"
                      style={{
                        borderColor: s.accent + "40",
                        background: `linear-gradient(135deg, ${s.accent}10, ${s.accent}05)`,
                      }}
                    >
                      {s.avatar}
                    </div>
                    <h4 className="font-bold text-sm">{s.name}</h4>
                    <p className="text-xs text-gray-400 font-medium">{s.role}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* ── Service Menu (Tabbed) ── */}
        <section className="py-12 border-t border-gray-50">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <motion.h2
              custom={0}
              variants={fadeUp}
              className="text-xs font-black tracking-widest uppercase text-gray-400 mb-6"
            >
              Services
            </motion.h2>

            {/* Tabs */}
            <motion.div custom={1} variants={fadeUp} className="flex gap-2 mb-8">
              {serviceCategories.map((cat, i) => (
                <button
                  key={cat.label}
                  onClick={() => setActiveTab(i)}
                  className={`px-5 py-2 rounded-full text-sm font-bold transition-all ${
                    activeTab === i
                      ? "text-white shadow-lg"
                      : "bg-gray-50 text-gray-500 hover:bg-gray-100"
                  }`}
                  style={activeTab === i ? { backgroundColor: shop.primaryColor } : {}}
                >
                  {cat.label}
                </button>
              ))}
            </motion.div>

            {/* Service List */}
            <div className="space-y-3">
              {serviceCategories[activeTab].services.map((svc, i) => (
                <motion.div
                  key={svc.name}
                  custom={i + 2}
                  variants={fadeUp}
                  className="flex items-center justify-between p-4 rounded-2xl border border-gray-100 hover:border-gray-200 hover:shadow-sm transition-all group cursor-pointer"
                >
                  <div className="flex items-center gap-4">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center"
                      style={{ background: shop.primaryColor + "10" }}
                    >
                      <Scissors
                        className="w-4 h-4"
                        style={{ color: shop.primaryColor }}
                      />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm">{svc.name}</h4>
                      <p className="text-xs text-gray-400 font-medium">{svc.duration}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-bold text-base">{svc.price}</span>
                    <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-black group-hover:translate-x-0.5 transition-all" />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* ── Gallery ── */}
        <section className="py-12 border-t border-gray-50">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <motion.h2
              custom={0}
              variants={fadeUp}
              className="text-xs font-black tracking-widest uppercase text-gray-400 mb-6"
            >
              Our Work
            </motion.h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {shop.galleryImages.map((bg, i) => (
                <motion.div
                  key={i}
                  custom={i + 1}
                  variants={fadeUp}
                  className="aspect-square rounded-2xl overflow-hidden cursor-pointer hover:scale-[1.02] transition-transform"
                  style={{ background: bg }}
                />
              ))}
            </div>
          </motion.div>
        </section>

        {/* ── Reviews ── */}
        <section className="py-12 border-t border-gray-50">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <motion.h2
              custom={0}
              variants={fadeUp}
              className="text-xs font-black tracking-widest uppercase text-gray-400 mb-6"
            >
              What Clients Say
            </motion.h2>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                { name: "Sarah L.", text: "Absolutely love my balayage! Amaya is a true artist. The studio atmosphere is so relaxing.", rating: 5 },
                { name: "Mike R.", text: "Best barbershop experience. Clean, professional, and the attention to detail is outstanding.", rating: 5 },
              ].map((r, i) => (
                <motion.div
                  key={r.name}
                  custom={i + 1}
                  variants={fadeUp}
                  className="p-6 rounded-2xl bg-gray-50 border border-gray-100"
                >
                  <div className="flex items-center gap-1 mb-3">
                    {Array.from({ length: r.rating }).map((_, j) => (
                      <Star key={j} className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
                    ))}
                  </div>
                  <p className="text-sm text-gray-600 font-medium mb-3 leading-relaxed">
                    "{r.text}"
                  </p>
                  <span className="text-xs font-bold text-gray-400">{r.name}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>
      </div>

      {/* ── Sticky Mobile CTA ── */}
      <div className="fixed bottom-0 left-0 right-0 md:hidden z-50 p-4 bg-white/80 backdrop-blur-md border-t border-gray-100">
        <button
          className="w-full text-white font-bold py-3.5 rounded-2xl flex items-center justify-center gap-2 shadow-xl"
          style={{ backgroundColor: shop.primaryColor }}
        >
          <Calendar className="w-4 h-4" /> Book Appointment
        </button>
      </div>

      {/* ── Footer ── */}
      <footer className="mt-12 bg-gray-50 border-t border-gray-100 py-12 px-6">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <span className="text-xl">{shop.logo}</span>
            <span className="font-bold">{shop.name}</span>
          </div>
          <p className="text-xs text-gray-400">
            Powered by <span className="font-bold text-black">FlexSlotCustom</span>
          </p>
        </div>
      </footer>

      {/* Spacer for mobile sticky CTA */}
      <div className="h-20 md:hidden" />
    </div>
  );
}
