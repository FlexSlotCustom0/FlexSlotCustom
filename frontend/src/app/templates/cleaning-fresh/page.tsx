"use client";

import { motion } from "framer-motion";
import {
  MapPin, Clock, Phone, Star, Calendar, ChevronRight,
  Share2, Check, SprayCan, Sparkles, Plus, ShieldCheck,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

/* ── Editable shop data ── */
const shop = {
  name: "SparkleClean Co.",
  tagline: "Professional cleaning you can trust",
  logo: "✨",
  primaryColor: "#059669",
  address: "Serving Greater Colombo Area",
  phone: "+94 77 555 1234",
  hours: "Mon–Sat · 7 AM – 6 PM",
  rating: 4.8,
  reviewCount: 589,
  coverageAreas: ["Colombo 01-15", "Dehiwala", "Mount Lavinia", "Nugegoda", "Maharagama", "Kottawa"],
};

const packages = [
  {
    name: "Standard Clean",
    price: "$80",
    duration: "2-3 hrs",
    desc: "Perfect for regular maintenance cleaning",
    features: ["Vacuuming & mopping", "Bathroom sanitization", "Kitchen wipe down", "Dusting"],
    popular: false,
  },
  {
    name: "Deep Clean",
    price: "$150",
    duration: "4-5 hrs",
    desc: "Thorough top-to-bottom cleaning for a fresh start",
    features: ["Everything in Standard", "Inside cabinets & drawers", "Appliance deep clean", "Window cleaning", "Behind furniture"],
    popular: true,
  },
  {
    name: "Move In/Out",
    price: "$200",
    duration: "5-6 hrs",
    desc: "Leave your old place spotless or start fresh",
    features: ["Everything in Deep Clean", "Wall spot cleaning", "Light fixture cleaning", "Garage sweep", "Final walk-through"],
    popular: false,
  },
];

const addons = [
  { name: "Inside Fridge", price: "+$25" },
  { name: "Inside Oven", price: "+$20" },
  { name: "Laundry & Fold", price: "+$30" },
  { name: "Balcony/Patio", price: "+$15" },
  { name: "Pet Hair Removal", price: "+$20" },
  { name: "Organize Closets", price: "+$35" },
];

const beforeAfter = [
  { label: "Kitchen", before: "linear-gradient(135deg, #9ca3af 0%, #6b7280 100%)", after: "linear-gradient(135deg, #6ee7b7 0%, #34d399 100%)" },
  { label: "Bathroom", before: "linear-gradient(135deg, #a8a29e 0%, #78716c 100%)", after: "linear-gradient(135deg, #5eead4 0%, #2dd4bf 100%)" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.06, duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function CleaningFreshTemplate() {
  const [selectedAddons, setSelectedAddons] = useState<Set<string>>(new Set());

  const toggleAddon = (name: string) => {
    setSelectedAddons((prev) => {
      const next = new Set(prev);
      if (next.has(name)) next.delete(name);
      else next.add(name);
      return next;
    });
  };

  return (
    <div className="min-h-screen bg-white text-black font-sans selection:bg-emerald-100">
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
              Get a Quote
            </button>
          </div>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section className="relative overflow-hidden">
        <div
          className="py-20 md:py-28 px-6"
          style={{ background: `linear-gradient(135deg, ${shop.primaryColor}08 0%, ${shop.primaryColor}15 100%)` }}
        >
          <div className="max-w-5xl mx-auto text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex justify-center mb-6">
                <div
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-bold"
                  style={{ borderColor: shop.primaryColor + "30", color: shop.primaryColor, backgroundColor: shop.primaryColor + "10" }}
                >
                  <ShieldCheck className="w-4 h-4" /> Trusted by 500+ homes
                </div>
              </div>
              <h1 className="text-5xl md:text-7xl font-serif tracking-tight mb-4 leading-[1.05]">
                Sparkling clean<br />homes, guaranteed.
              </h1>
              <p className="text-gray-500 font-medium text-base md:text-lg mb-8 max-w-xl mx-auto leading-relaxed">
                {shop.tagline}. Professional, insured, and eco-friendly cleaning services for residential and commercial spaces.
              </p>
              <div className="flex flex-wrap justify-center items-center gap-4">
                <button
                  className="text-white font-bold px-8 py-3.5 rounded-xl flex items-center gap-2 shadow-xl hover:scale-[1.02] transition-all text-lg"
                  style={{ backgroundColor: shop.primaryColor }}
                >
                  <Calendar className="w-5 h-5" /> Book a Cleaning
                </button>
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-bold text-sm">{shop.rating}</span>
                  <span className="text-gray-400 text-sm">({shop.reviewCount} reviews)</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-6">
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
        </motion.div>

        {/* ── Service Packages ── */}
        <section className="py-14">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <motion.h2 custom={0} variants={fadeUp} className="text-xs font-black tracking-widest uppercase text-gray-400 mb-2">
              Cleaning Packages
            </motion.h2>
            <motion.h3 custom={0} variants={fadeUp} className="text-2xl font-serif tracking-tight mb-8">
              Choose what fits your home
            </motion.h3>
            <div className="grid md:grid-cols-3 gap-4">
              {packages.map((pkg, i) => (
                <motion.div
                  key={pkg.name}
                  custom={i + 1}
                  variants={fadeUp}
                  className={`relative p-6 rounded-3xl border flex flex-col transition-all hover:-translate-y-1 hover:shadow-lg cursor-pointer ${
                    pkg.popular ? "border-2 shadow-md" : "border-gray-100"
                  }`}
                  style={pkg.popular ? { borderColor: shop.primaryColor } : {}}
                >
                  {pkg.popular && (
                    <span
                      className="absolute -top-3 left-6 text-white text-[10px] font-black tracking-widest uppercase px-3 py-1 rounded-full"
                      style={{ backgroundColor: shop.primaryColor }}
                    >
                      Most Popular
                    </span>
                  )}
                  <h4 className="font-bold text-lg mb-1">{pkg.name}</h4>
                  <div className="text-3xl font-serif mb-1">{pkg.price}</div>
                  <p className="text-xs text-gray-400 font-medium mb-1">{pkg.duration}</p>
                  <p className="text-sm text-gray-500 font-medium mb-4">{pkg.desc}</p>
                  <ul className="space-y-2 flex-1 mb-6">
                    {pkg.features.map((f) => (
                      <li key={f} className="flex items-center gap-2 text-sm text-gray-600 font-medium">
                        <Check className="w-4 h-4 shrink-0" style={{ color: shop.primaryColor }} />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <button
                    className={`w-full py-2.5 rounded-xl font-bold text-sm transition-all ${
                      pkg.popular ? "text-white shadow-lg" : "border-2 border-gray-200 hover:bg-gray-50"
                    }`}
                    style={pkg.popular ? { backgroundColor: shop.primaryColor } : {}}
                  >
                    Select Package
                  </button>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* ── Add-ons ── */}
        <section className="py-14 border-t border-gray-100">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <motion.h2 custom={0} variants={fadeUp} className="text-xs font-black tracking-widest uppercase text-gray-400 mb-2">
              Add-ons
            </motion.h2>
            <motion.h3 custom={0} variants={fadeUp} className="text-2xl font-serif tracking-tight mb-8">
              Customize your cleaning
            </motion.h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {addons.map((addon, i) => (
                <motion.button
                  key={addon.name}
                  custom={i + 1}
                  variants={fadeUp}
                  onClick={() => toggleAddon(addon.name)}
                  className={`p-4 rounded-2xl border-2 text-left transition-all ${
                    selectedAddons.has(addon.name)
                      ? "shadow-md"
                      : "border-gray-100 hover:border-gray-200"
                  }`}
                  style={selectedAddons.has(addon.name) ? { borderColor: shop.primaryColor, backgroundColor: shop.primaryColor + "08" } : {}}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-sm">{addon.name}</span>
                    <div
                      className={`w-5 h-5 rounded-full flex items-center justify-center border-2 transition-all ${
                        selectedAddons.has(addon.name) ? "text-white" : "border-gray-200"
                      }`}
                      style={selectedAddons.has(addon.name) ? { backgroundColor: shop.primaryColor, borderColor: shop.primaryColor } : {}}
                    >
                      {selectedAddons.has(addon.name) && <Check className="w-3 h-3" />}
                    </div>
                  </div>
                  <span className="text-xs font-bold" style={{ color: shop.primaryColor }}>
                    {addon.price}
                  </span>
                </motion.button>
              ))}
            </div>
          </motion.div>
        </section>

        {/* ── Before / After ── */}
        <section className="py-14 border-t border-gray-100">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <motion.h2 custom={0} variants={fadeUp} className="text-xs font-black tracking-widest uppercase text-gray-400 mb-2">
              Our Results
            </motion.h2>
            <motion.h3 custom={0} variants={fadeUp} className="text-2xl font-serif tracking-tight mb-8">
              See the transformation
            </motion.h3>
            <div className="grid md:grid-cols-2 gap-6">
              {beforeAfter.map((ba, i) => (
                <motion.div key={ba.label} custom={i + 1} variants={fadeUp}>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">
                    {ba.label}
                  </p>
                  <div className="flex gap-2">
                    <div className="flex-1 aspect-[4/3] rounded-2xl overflow-hidden relative" style={{ background: ba.before }}>
                      <span className="absolute top-3 left-3 bg-black/30 backdrop-blur-md text-white text-[10px] font-bold px-2 py-1 rounded-full">
                        Before
                      </span>
                    </div>
                    <div className="flex-1 aspect-[4/3] rounded-2xl overflow-hidden relative" style={{ background: ba.after }}>
                      <span className="absolute top-3 left-3 bg-white/30 backdrop-blur-md text-white text-[10px] font-bold px-2 py-1 rounded-full">
                        After ✨
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* ── Coverage Areas ── */}
        <section className="py-14 border-t border-gray-100">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <motion.h2 custom={0} variants={fadeUp} className="text-xs font-black tracking-widest uppercase text-gray-400 mb-2">
              Service Areas
            </motion.h2>
            <motion.h3 custom={0} variants={fadeUp} className="text-2xl font-serif tracking-tight mb-8">
              Where we operate
            </motion.h3>
            <div className="flex flex-wrap gap-2">
              {shop.coverageAreas.map((area, i) => (
                <motion.span
                  key={area}
                  custom={i + 1}
                  variants={fadeUp}
                  className="px-4 py-2 rounded-full bg-gray-50 border border-gray-100 text-sm font-medium text-gray-600"
                >
                  <MapPin className="w-3 h-3 inline mr-1 mb-0.5" /> {area}
                </motion.span>
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
                { name: "Rachel T.", text: "They deep cleaned our 3-bedroom apartment and it's never looked this good. The add-on for inside the fridge was a game changer!", rating: 5 },
                { name: "Kumar S.", text: "Used the move-out cleaning service. Got our full deposit back. Professional, on-time, and thorough.", rating: 5 },
              ].map((r, i) => (
                <motion.div
                  key={r.name}
                  custom={i + 1}
                  variants={fadeUp}
                  className="p-6 rounded-2xl bg-gray-50 border border-gray-100"
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
          <Calendar className="w-4 h-4" /> Get a Quote
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
      <div className="h-20 md:hidden" />
    </div>
  );
}
