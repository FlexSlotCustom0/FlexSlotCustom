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
  const { shopData: shop, staff: doctors, offerings: serviceCategories } = useTemplateContext();
  const faqs = [
    { q: "What should I bring to my first appointment?", a: "Please bring your national ID, insurance card, and any previous medical records or prescriptions." },
    { q: "Do you accept insurance?", a: "Yes, we accept all major insurance providers. Please contact us for specific plan details." },
    { q: "How do I prepare for a blood test?", a: "Fasting for 8-12 hours before the test is required. Water is allowed." },
  ];
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
            <span className="text-xl">{shop.logo}</span>
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
            className="rounded-3xl overflow-hidden aspect-[4/3]"
            style={{ background: "linear-gradient(135deg, #dbeafe 0%, #bfdbfe 50%, #93c5fd 100%)" }}
          >
            <div className="w-full h-full flex items-center justify-center text-7xl">🏥</div>
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
            <div className="grid md:grid-cols-3 gap-4">
              {doctors.map((d, i) => (
                <motion.div
                  key={d.name}
                  custom={i + 1}
                  variants={fadeUp}
                  className="p-6 rounded-2xl border border-gray-100 bg-gray-50 hover:shadow-md transition-all group cursor-pointer text-center"
                >
                  <div className="text-4xl mb-3">{d.avatar}</div>
                  <h4 className="font-bold text-sm">{d.name}</h4>
                  <p className="text-xs text-gray-500 font-medium mb-1">{d.role}</p>
                  <p className="text-[10px] font-bold tracking-wider uppercase" style={{ color: shop.primaryColor }}>
                    {d.credentials}
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
              <div key={cat.label || cat.category} className={catIdx > 0 ? "mt-10" : ""}>
                <motion.h2 custom={catIdx} variants={fadeUp} className="text-xs font-black tracking-widest uppercase text-gray-400 mb-2">
                  {cat.label || cat.category}
                </motion.h2>
                <div className="space-y-2 mt-4">
                  {cat.services.map((svc, i) => (
                    <motion.div
                      key={svc.name}
                      custom={i + catIdx + 1}
                      variants={fadeUp}
                      className="flex items-center justify-between p-4 rounded-2xl border border-gray-100 hover:border-gray-200 hover:shadow-sm transition-all group cursor-pointer"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: shop.primaryColor + "10" }}>
                          <Stethoscope className="w-4 h-4" style={{ color: shop.primaryColor }} />
                        </div>
                        <div>
                          <h4 className="font-bold text-sm">{svc.name}</h4>
                          <p className="text-xs text-gray-400 font-medium">{svc.desc}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 shrink-0">
                        <div className="text-right hidden sm:block">
                          <span className="font-bold text-sm block">{svc.price}</span>
                          <span className="text-xs text-gray-400">{svc.duration}</span>
                        </div>
                        <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-black group-hover:translate-x-0.5 transition-all" />
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
              Frequently Asked Questions
            </motion.h2>
            <motion.h3 custom={0} variants={fadeUp} className="text-2xl font-serif tracking-tight mb-8">
              Preparing for your visit
            </motion.h3>
            <div className="space-y-3">
              {faqs.map((faq, i) => (
                <motion.div
                  key={i}
                  custom={i + 1}
                  variants={fadeUp}
                  className="p-5 rounded-2xl bg-blue-50/50 border border-blue-100/50"
                >
                  <div className="flex items-start gap-3">
                    <HelpCircle className="w-4 h-4 mt-0.5 shrink-0" style={{ color: shop.primaryColor }} />
                    <div>
                      <h4 className="font-bold text-sm mb-1">{faq.q}</h4>
                      <p className="text-sm text-gray-500 font-medium leading-relaxed">{faq.a}</p>
                    </div>
                  </div>
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
      <div className="h-20 md:hidden" />
    </div>
  );
}
