"use client";

import { motion } from "framer-motion";
import {
  MapPin, Clock, Phone, Star, Calendar, ChevronRight,
  Activity, Shield, Zap, FileText, HelpCircle, Stethoscope,
} from "lucide-react";
import Link from "next/link";
import { useTemplateContext } from "@/components/TemplateContext";
import { IconRenderer } from "@/components/IconRenderer";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.06, duration: 0.5, ease: [0.22, 1, 0.36, 1] as any },
  }),
};

export default function PulseModernTemplate() {
  const {
    shopData: shop,
    staff: doctors,
    offerings: serviceCategories,
    faqs,
    reviews
  } = useTemplateContext();

  return (
    <div className="min-h-screen bg-white text-black font-sans selection:bg-indigo-100">
      {/* ── Sticky Nav ── */}
      <nav className="sticky top-0 w-full z-50 bg-white/90 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white shadow-lg" style={{ backgroundColor: shop.primaryColor }}>
              <IconRenderer name={shop.logo} className="w-5 h-5" />
            </div>
            <div className="flex flex-col">
              <span className="font-black text-sm tracking-tight leading-none mb-0.5">{shop.name}</span>
              <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Diagnostic Hub</span>
            </div>
          </div>
          <button
            className="text-white text-xs font-black uppercase tracking-widest px-6 py-3 rounded-xl transition-all hover:scale-[1.03] shadow-xl shadow-indigo-100"
            style={{ backgroundColor: shop.primaryColor }}
          >
            Digital Booking
          </button>
        </div>
      </nav>

      <main className="max-w-5xl mx-auto px-6">
        {/* ── Hero ── */}
        <section className="py-20">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-indigo-50 border border-indigo-100 text-indigo-600 text-[10px] font-black uppercase tracking-widest mb-6">
                <Activity className="w-3 h-3" /> Advanced Imaging System
              </div>
              <h1 className="text-5xl md:text-6xl font-black tracking-tighter mb-6 leading-none">
                Precision <span style={{ color: shop.primaryColor }}>Care</span> through technology.
              </h1>
              <p className="text-gray-500 font-medium text-lg mb-10 leading-relaxed max-w-md">
                {shop.tagline}. We combine world-class diagnostics with compassionate patient care.
              </p>
              <div className="flex items-center gap-6">
                <button
                  className="text-white font-black text-xs uppercase tracking-widest px-8 py-4 rounded-2xl shadow-2xl hover:translate-y-[-2px] transition-all"
                  style={{ backgroundColor: shop.primaryColor }}
                >
                  Schedule Scan
                </button>
                <div className="flex -space-x-3">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-gray-100" />
                  ))}
                  <div className="w-10 h-10 rounded-full border-2 border-white bg-indigo-600 flex items-center justify-center text-[10px] text-white font-bold">+1k</div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="relative"
            >
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-indigo-100 rounded-full blur-3xl opacity-50" />
              <div
                className="w-full aspect-square rounded-[3rem] overflow-hidden relative shadow-2xl border border-gray-100"
                style={{ background: shop.bannerGradient }}
              >
                {!shop.bannerUrl && (
                  <div className="w-full h-full flex items-center justify-center text-[120px] mix-blend-overlay opacity-20">
                    <IconRenderer name={shop.logo} />
                  </div>
                )}
                <div className="absolute inset-0 bg-black/5" />
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── Stats ── */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-12 border-y border-gray-50 mb-20">
          {[
            { l: 'Accuracy', v: '99.9%' },
            { l: 'Reports', v: '< 2hr' },
            { l: 'Specialists', v: '24/7' },
            { l: 'Success', v: '100%' },
          ].map((s, i) => (
            <div key={i} className="text-center">
              <div className="text-2xl font-black mb-1" style={{ color: shop.primaryColor }}>{s.v}</div>
              <div className="text-[10px] font-black uppercase tracking-widest text-gray-400">{s.l}</div>
            </div>
          ))}
        </div>

        {/* ── Services ── */}
        <section className="mb-24">
          <h2 className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">Our Diagnostic Capabilities</h2>
          <h3 className="text-4xl font-black tracking-tight mb-12 italic">Precision Results.</h3>

          <div className="grid md:grid-cols-1 gap-4">
            {serviceCategories.map((cat, catIdx) => (
              <div key={catIdx} className="space-y-4">
                {cat.services.map((svc: any, i: number) => (
                  <motion.div
                    key={i}
                    className="p-8 rounded-[2rem] bg-gray-50 hover:bg-white hover:shadow-2xl hover:scale-[1.01] transition-all border border-transparent hover:border-indigo-100 flex items-center justify-between group cursor-pointer"
                  >
                    <div className="flex items-center gap-6">
                      <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center shadow-sm group-hover:bg-indigo-600 transition-colors">
                        <Activity className="w-6 h-6 group-hover:text-white transition-colors" style={{ color: shop.primaryColor }} />
                      </div>
                      <div>
                        <h4 className="font-black text-lg tracking-tight mb-1">{svc.name}</h4>
                        <p className="text-sm text-gray-500 font-medium">{svc.desc}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xl font-black tracking-tight mb-1">{svc.price}</div>
                      <div className="text-[10px] font-black uppercase tracking-widest text-gray-400">{svc.duration}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* ── Footer ── */}
      <footer className="bg-black text-white py-20 px-6 mt-20">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-10 opacity-50">
            <div className="flex items-center gap-3">
              <IconRenderer name={shop.logo} className="w-6 h-6 text-white" />
              <span className="font-black text-lg tracking-tight">{shop.name}</span>
            </div>
            <div className="flex gap-8 text-[10px] font-black uppercase tracking-[0.2em]">
              <a href="#">Security</a>
              <a href="#">Privacy</a>
              <a href="#">EMR Login</a>
            </div>
          </div>
          <div className="mt-16 pt-10 border-t border-white/10 text-center">
            <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">
              System Status: <span className="text-green-500 animate-pulse">Operational</span> · Powered by FlexSlot Custom
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
