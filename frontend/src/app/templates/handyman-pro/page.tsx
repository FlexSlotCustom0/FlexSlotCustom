"use client";

import { motion } from "framer-motion";
import {
  MapPin, Clock, Phone, Star, Calendar, ChevronRight,
  Share2, Check, Wrench, Shield, Hammer, Zap,
  Droplets, ThermometerSun, PaintBucket, Gauge,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

/* ── Editable shop data ── */
const shop = {
  name: "FixIt Masters",
  tagline: "Professional repairs & maintenance — done right, every time",
  logo: "🔧",
  primaryColor: "#2563eb",
  secondaryColor: "#f59e0b",
  address: "Serving all of Colombo District",
  phone: "+94 76 888 9999",
  hours: "Mon–Sat · 7 AM – 7 PM | Emergency 24/7",
  rating: 4.7,
  reviewCount: 412,
  yearsInBusiness: 12,
  jobsCompleted: "5,000+",
};

const serviceCategories = [
  {
    icon: <Droplets className="w-5 h-5" />,
    label: "Plumbing",
    color: "#2563eb",
    services: [
      { name: "Leak Repair", price: "From $50", duration: "1-2 hrs" },
      { name: "Pipe Installation", price: "From $120", duration: "2-4 hrs" },
      { name: "Drain Unclogging", price: "$45", duration: "1 hr" },
    ],
  },
  {
    icon: <Zap className="w-5 h-5" />,
    label: "Electrical",
    color: "#f59e0b",
    services: [
      { name: "Wiring & Rewiring", price: "From $80", duration: "2-3 hrs" },
      { name: "Switch/Outlet Install", price: "$35", duration: "30 min" },
      { name: "Ceiling Fan Install", price: "$60", duration: "1 hr" },
    ],
  },
  {
    icon: <PaintBucket className="w-5 h-5" />,
    label: "Painting",
    color: "#8b5cf6",
    services: [
      { name: "Room Painting", price: "From $150", duration: "4-6 hrs" },
      { name: "Exterior Touch-up", price: "From $200", duration: "1 day" },
      { name: "Fence/Deck Staining", price: "From $100", duration: "3-4 hrs" },
    ],
  },
  {
    icon: <Hammer className="w-5 h-5" />,
    label: "General Repairs",
    color: "#ef4444",
    services: [
      { name: "Furniture Assembly", price: "$40", duration: "1-2 hrs" },
      { name: "Door/Window Repair", price: "From $55", duration: "1-2 hrs" },
      { name: "Drywall Patching", price: "$45", duration: "1 hr" },
    ],
  },
];

const trustBadges = [
  { icon: <Shield className="w-5 h-5" />, label: "Fully Insured", desc: "Licensed and insured professionals" },
  { icon: <Gauge className="w-5 h-5" />, label: "Same Day Service", desc: "Fast response for urgent repairs" },
  { icon: <ThermometerSun className="w-5 h-5" />, label: "Satisfaction Guarantee", desc: "Not happy? We'll fix it free" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.06, duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function HandymanProTemplate() {
  const [activeCategory, setActiveCategory] = useState(0);

  return (
    <div className="min-h-screen bg-[#fafafa] text-black font-sans selection:bg-blue-100">
      {/* ── Top Bar ── */}
      <div className="bg-[#0f172a] text-white text-center py-2 text-xs font-bold tracking-wide relative z-[60]">
        <Phone className="w-3 h-3 inline mr-1.5 mb-0.5" />
        Call now for free estimates: <span className="underline">{shop.phone}</span>
      </div>

      {/* ── Sticky Nav ── */}
      <nav className="sticky top-0 w-full z-50 bg-white/90 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xl">{shop.logo}</span>
            <span className="font-bold text-base">{shop.name}</span>
          </div>
          <div className="flex items-center gap-3">
            <button
              className="text-white text-sm font-bold px-5 py-2 rounded-xl transition-all hover:scale-[1.03] shadow-lg"
              style={{ backgroundColor: shop.primaryColor }}
            >
              Request a Quote
            </button>
          </div>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section className="relative overflow-hidden">
        <div className="bg-[#0f172a] py-20 md:py-28 px-6 relative">
          {/* Grid Pattern */}
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTAgMEg0MFY0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMDQpIiBzdHJva2Utd2lkdGg9IjEiLz48L3N2Zz4=')] opacity-100" />
          <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px]" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-[120px]" />

          <div className="max-w-5xl mx-auto relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-2xl"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-sm font-bold text-white/70">
                  <Wrench className="w-3.5 h-3.5" />
                  {shop.yearsInBusiness} Years Experience
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-sm font-bold text-white/70">
                  <Check className="w-3.5 h-3.5" />
                  {shop.jobsCompleted} Jobs Done
                </div>
              </div>

              <h1 className="text-5xl md:text-6xl font-serif text-white tracking-tight mb-5 leading-[1.1]">
                Reliable repairs<br />you can count on.
              </h1>
              <p className="text-gray-400 font-medium text-base md:text-lg mb-8 leading-relaxed max-w-lg">
                {shop.tagline}. Plumbing, electrical, painting, and general handyman services.
              </p>
              <div className="flex flex-wrap items-center gap-4">
                <button
                  className="text-white font-bold px-7 py-3.5 rounded-xl flex items-center gap-2 shadow-xl hover:scale-[1.02] transition-all text-base"
                  style={{ backgroundColor: shop.primaryColor }}
                >
                  <Calendar className="w-5 h-5" /> Book a Handyman
                </button>
                <button className="text-white/70 font-bold px-7 py-3.5 rounded-xl border border-white/10 hover:bg-white/5 flex items-center gap-2 transition-all">
                  <Phone className="w-4 h-4" /> Call Us
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-6">
        {/* ── Trust Badges ── */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="py-10 border-b border-gray-100"
        >
          <div className="grid md:grid-cols-3 gap-4">
            {trustBadges.map((badge, i) => (
              <motion.div
                key={badge.label}
                custom={i}
                variants={fadeUp}
                className="flex items-center gap-4 p-4 rounded-2xl bg-white border border-gray-100"
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                  style={{ backgroundColor: shop.primaryColor + "10", color: shop.primaryColor }}
                >
                  {badge.icon}
                </div>
                <div>
                  <h4 className="font-bold text-sm">{badge.label}</h4>
                  <p className="text-xs text-gray-400 font-medium">{badge.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* ── Quick Info ── */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex flex-wrap gap-6 py-6 border-b border-gray-100 text-sm text-gray-500 font-medium"
        >
          <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4" /> {shop.address}</span>
          <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" /> {shop.hours}</span>
          <span className="flex items-center gap-1.5"><Phone className="w-4 h-4" /> {shop.phone}</span>
          <span className="flex items-center gap-1">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="font-bold text-black">{shop.rating}</span>
            <span>({shop.reviewCount} reviews)</span>
          </span>
        </motion.div>

        {/* ── Services (Category Tabs) ── */}
        <section className="py-14">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <motion.h2 custom={0} variants={fadeUp} className="text-xs font-black tracking-widest uppercase text-gray-400 mb-2">
              Our Services
            </motion.h2>
            <motion.h3 custom={0} variants={fadeUp} className="text-2xl font-serif tracking-tight mb-8">
              What we can fix for you
            </motion.h3>

            {/* Category Tabs */}
            <motion.div custom={1} variants={fadeUp} className="flex gap-2 mb-8 overflow-x-auto pb-2">
              {serviceCategories.map((cat, i) => (
                <button
                  key={cat.label}
                  onClick={() => setActiveCategory(i)}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all whitespace-nowrap ${
                    activeCategory === i
                      ? "text-white shadow-lg"
                      : "bg-white border border-gray-100 text-gray-500 hover:bg-gray-50"
                  }`}
                  style={activeCategory === i ? { backgroundColor: cat.color } : {}}
                >
                  {cat.icon}
                  {cat.label}
                </button>
              ))}
            </motion.div>

            {/* Service List */}
            <div className="space-y-2">
              {serviceCategories[activeCategory].services.map((svc, i) => (
                <motion.div
                  key={svc.name}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="flex items-center justify-between p-4 rounded-2xl bg-white border border-gray-100 hover:border-gray-200 hover:shadow-sm transition-all group cursor-pointer"
                >
                  <div className="flex items-center gap-4">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center"
                      style={{
                        backgroundColor: serviceCategories[activeCategory].color + "10",
                        color: serviceCategories[activeCategory].color,
                      }}
                    >
                      <Wrench className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm">{svc.name}</h4>
                      <p className="text-xs text-gray-400 font-medium">{svc.duration}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-bold text-sm">{svc.price}</span>
                    <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-black group-hover:translate-x-0.5 transition-all" />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* ── How It Works ── */}
        <section className="py-14 border-t border-gray-100">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <motion.h2 custom={0} variants={fadeUp} className="text-xs font-black tracking-widest uppercase text-gray-400 mb-2">
              How It Works
            </motion.h2>
            <motion.h3 custom={0} variants={fadeUp} className="text-2xl font-serif tracking-tight mb-8">
              Simple as 1-2-3
            </motion.h3>
            <div className="grid md:grid-cols-3 gap-4">
              {[
                { step: "1", title: "Request a Quote", desc: "Tell us what needs fixing. Upload photos if you can.", color: shop.primaryColor },
                { step: "2", title: "Get Scheduled", desc: "We'll match you with an available pro and confirm a time.", color: shop.secondaryColor },
                { step: "3", title: "Job Done", desc: "Our expert completes the work. Pay only when satisfied.", color: "#10b981" },
              ].map((s, i) => (
                <motion.div
                  key={s.step}
                  custom={i + 1}
                  variants={fadeUp}
                  className="p-6 rounded-2xl bg-white border border-gray-100 text-center"
                >
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center text-white font-black text-sm mx-auto mb-4"
                    style={{ backgroundColor: s.color }}
                  >
                    {s.step}
                  </div>
                  <h4 className="font-bold text-sm mb-2">{s.title}</h4>
                  <p className="text-xs text-gray-400 font-medium leading-relaxed">{s.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* ── Gallery ── */}
        <section className="py-14 border-t border-gray-100">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <motion.h2 custom={0} variants={fadeUp} className="text-xs font-black tracking-widest uppercase text-gray-400 mb-2">
              Recent Projects
            </motion.h2>
            <motion.h3 custom={0} variants={fadeUp} className="text-2xl font-serif tracking-tight mb-8">
              Quality craftsmanship
            </motion.h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                "linear-gradient(135deg, #1e40af 0%, #3b82f6 100%)",
                "linear-gradient(135deg, #92400e 0%, #f59e0b 100%)",
                "linear-gradient(135deg, #065f46 0%, #10b981 100%)",
                "linear-gradient(135deg, #7c2d12 0%, #ef4444 100%)",
              ].map((bg, i) => (
                <motion.div
                  key={i}
                  custom={i + 1}
                  variants={fadeUp}
                  className="aspect-square rounded-2xl overflow-hidden hover:scale-[1.02] transition-transform cursor-pointer"
                  style={{ background: bg }}
                />
              ))}
            </div>
          </motion.div>
        </section>

        {/* ── Reviews ── */}
        <section className="py-14 border-t border-gray-100">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <motion.h2 custom={0} variants={fadeUp} className="text-xs font-black tracking-widest uppercase text-gray-400 mb-6">
              Customer Reviews
            </motion.h2>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                { name: "Nimal J.", text: "Fixed a major plumbing leak in under an hour. Very professional, cleaned up after themselves. Will call again for sure.", rating: 5 },
                { name: "Samanthi L.", text: "Had them repaint our living room. The finish is flawless. The team was punctual, polite, and reasonably priced.", rating: 5 },
              ].map((r, i) => (
                <motion.div
                  key={r.name}
                  custom={i + 1}
                  variants={fadeUp}
                  className="p-6 rounded-2xl bg-white border border-gray-100"
                >
                  <div className="flex items-center gap-1 mb-3">
                    {Array.from({ length: r.rating }).map((_, j) => (
                      <Star key={j} className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-sm text-gray-600 font-medium mb-3 leading-relaxed">"{r.text}"</p>
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
          <Calendar className="w-4 h-4" /> Request a Quote
        </button>
      </div>

      {/* ── Footer ── */}
      <footer className="mt-12 bg-[#0f172a] text-white py-12 px-6">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <span className="text-xl">{shop.logo}</span>
            <span className="font-bold">{shop.name}</span>
          </div>
          <p className="text-xs text-gray-500">
            Powered by <span className="font-bold text-white">FlexSlotCustom</span>
          </p>
        </div>
      </footer>
      <div className="h-20 md:hidden" />
    </div>
  );
}
