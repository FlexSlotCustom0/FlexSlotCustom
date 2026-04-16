"use client";

import { motion } from "framer-motion";
import {
  MapPin, Clock, Phone, Star, Calendar, ChevronRight,
  Shield, Check, Sparkles, Heart, HelpCircle, Stethoscope,
} from "lucide-react";
import Link from "next/link";
import { useTemplateContext } from "@/components/TemplateContext";
import { IconRenderer } from "@/components/IconRenderer";
import { LayoutDashboard } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.05, duration: 0.5, ease: "easeOut" },
  }),
};

export default function DentalBrightTemplate() {
  const {
    shopData: shop,
    staff: doctors,
    offerings: serviceCategories,
    faqs,
    reviews
  } = useTemplateContext();

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-teal-100">
      {/* ── Top Bar ── */}
      <div className="bg-slate-900 text-white py-2 px-6 text-[10px] font-black uppercase tracking-[0.3em] flex justify-between items-center">
        <span>Trusted Oral Care</span>
        <div className="flex gap-4">
          <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {shop.address}</span>
          <span className="flex items-center gap-1"><Phone className="w-3 h-3" /> {shop.phone}</span>
        </div>
      </div>

      {/* ── Sticky Nav ── */}
      <nav className="sticky top-0 w-full z-50 bg-white/80 backdrop-blur-xl border-b border-teal-50">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <IconRenderer name={shop.logo} className="w-6 h-6 text-teal-600" />
            <span className="font-black text-lg tracking-tight italic text-teal-900">{shop.name}</span>
          </div>
          <button
            className="text-white text-[10px] font-black uppercase tracking-widest px-6 py-3 rounded-full transition-all hover:scale-[1.03] shadow-lg shadow-teal-100"
            style={{ backgroundColor: shop.primaryColor }}
          >
            Book Free Consult
          </button>
        </div>
      </nav>

      <main className="max-w-5xl mx-auto px-6">
        {/* ── Hero ── */}
        <section className="py-24 text-center">
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal-50 text-teal-600 text-[10px] font-black uppercase tracking-widest mb-8">
              <Sparkles className="w-3.5 h-3.5" /> Engineering Perfect Smiles
            </div>
            <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-8 leading-[0.9] text-slate-900">
              Confidence Starts Here.
            </h1>
            <p className="text-slate-500 font-medium text-xl mb-12 max-w-2xl mx-auto leading-relaxed">
              {shop.tagline}. Discover a dental experience that prioritizes your comfort and delivers exceptional results.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <button
                className="w-full sm:w-64 text-white font-black text-xs uppercase tracking-widest px-10 py-5 rounded-full shadow-2xl hover:translate-y-[-2px] transition-all"
                style={{ backgroundColor: shop.primaryColor }}
              >
                Reserve Your Spot
              </button>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-0.5 text-yellow-400">
                  {[1, 2, 3, 4, 5].map(i => <Star key={i} className="w-4 h-4 fill-current" />)}
                </div>
                <span className="text-xs font-bold text-slate-400">Rated {shop.rating}/5 by patients</span>
              </div>
            </div>
          </motion.div>
        </section>

        {/* ── Image Feature ── */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="w-full aspect-[21/9] rounded-[4rem] overflow-hidden relative shadow-2xl border-4 border-white mb-24"
          style={{ background: shop.bannerGradient }}
        >
          {!shop.bannerUrl && (
            <div className="w-full h-full flex items-center justify-center text-[180px] grayscale opacity-10">
              <IconRenderer name={shop.logo} />
            </div>
          )}
          <div className="absolute inset-x-0 bottom-0 p-12 bg-black/5" />
        </motion.div>

        {/* ── Benefits ── */}
        <section className="py-20 bg-teal-50/-10 grid md:grid-cols-3 gap-12 mb-24">
          {[
            { t: 'Modern Tech', d: 'Intraoral scanners and 3D digital impressions.' },
            { t: 'Painless Care', d: 'Advanced sedation options for a stress-free visit.' },
            { t: 'Family First', d: 'Complete care for toddlers to seniors.' },
          ].map((b, i) => (
            <div key={i} className="text-center">
              <div className="w-12 h-12 rounded-2xl bg-teal-50 flex items-center justify-center mx-auto mb-6">
                <Check className="w-6 h-6 text-teal-600" />
              </div>
              <h4 className="font-black text-lg mb-2 tracking-tight">{b.t}</h4>
              <p className="text-slate-500 text-sm font-medium leading-relaxed">{b.d}</p>
            </div>
          ))}
        </section>

        {/* ── Specialists ── */}
        <section className="mb-24">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-[10px] font-black uppercase tracking-widest text-teal-600 mb-2">The Studio Team</h2>
              <h3 className="text-4xl font-black tracking-tight text-slate-900">Expert Clinicians.</h3>
            </div>
            <button className="hidden md:flex items-center gap-2 text-xs font-black uppercase tracking-widest text-slate-400 hover:text-teal-600 transition-colors">
              Meet Everyone <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {doctors.map((d, i) => (
              <div key={i} className="flex gap-8 p-8 rounded-[3rem] bg-slate-50 border border-slate-100 hover:bg-white hover:shadow-xl transition-all group">
                <div className="w-32 h-32 rounded-[2.5rem] bg-teal-100 overflow-hidden shrink-0 group-hover:scale-105 transition-transform flex items-center justify-center">
                  {d.imageUrl ? <img src={d.imageUrl} className="w-full h-full object-cover" /> : <IconRenderer name={d.avatar} className="w-12 h-12 text-teal-200" />}
                </div>
                <div className="flex flex-col justify-center">
                  <h4 className="font-black text-xl mb-1">{d.name}</h4>
                  <p className="text-sm text-slate-400 font-bold uppercase tracking-widest mb-3">{d.role}</p>
                  <p className="text-xs text-slate-500 line-clamp-2 italic">“Providing results that make my patients truly happy to smile.”</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Services (Table) ── */}
        <section className="mb-24">
          <div className="p-10 rounded-[3rem] bg-teal-900 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 p-10 opacity-10 text-[200px] leading-none">
              <IconRenderer name={shop.logo} />
            </div>
            <h3 className="text-4xl font-black mb-12 relative z-10">Signature Treatments</h3>
            <div className="space-y-6 relative z-10">
              {serviceCategories.map((cat, ci) => (
                <div key={ci} className="space-y-3">
                  {cat.services.map((svc: any, si: number) => (
                    <div key={si} className="flex items-center justify-between pb-4 border-b border-white/10 hover:border-white/40 transition-colors cursor-pointer group">
                      <div>
                        <h4 className="font-black text-lg group-hover:text-teal-400 transition-colors">{svc.name}</h4>
                        <p className="text-xs text-white/50 font-medium">{svc.desc}</p>
                      </div>
                      <div className="text-right">
                        <span className="font-black text-xl block">{svc.price}</span>
                        <span className="text-[10px] font-black uppercase opacity-40">{svc.duration}</span>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* ── Quick CTA ── */}
      <footer className="py-24 px-6 border-t border-slate-50">
        <div className="max-w-5xl mx-auto text-center">
          <h3 className="text-4xl font-black tracking-tighter mb-8 leading-none">Ready to transform your <span className="text-teal-600 italic">smile?</span></h3>
          <button className="px-12 py-5 bg-slate-900 text-white rounded-full font-black text-xs uppercase tracking-widest shadow-2xl hover:scale-105 transition-all">
            Start Your Journey
          </button>
          <div className="mt-20 pt-10 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate-300">
            <div className="flex items-center gap-2">
              <IconRenderer name={shop.logo} className="w-4 h-4 opacity-30" />
              <span>© 2026 {shop.name}</span>
            </div>
            <div className="flex gap-8">
              <span>HIPAA Compliant</span>
              <span>Board Certified</span>
              <span>Dental Ledger v4.0</span>
            </div>
          </div>
        </div>
      </footer>
      <AdminExit colorClass="bg-teal-600" />
    </div>
  );
}

function AdminExit({ colorClass = "bg-black" }: { colorClass?: string }) {
  return (
    <section className="bg-white py-20 px-6 border-t border-gray-100 flex flex-col items-center justify-center text-center">
      <h3 className="text-2xl font-serif mb-4">Ready to manage your clinic?</h3>
      <p className="text-gray-400 mb-8 max-w-sm">Return to your dashboard to configure services, staff, and appointments.</p>
      <Link
        href="/dashboard"
        className={`${colorClass} text-white px-10 py-4 rounded-2xl font-bold flex items-center gap-3 hover:scale-105 transition-all shadow-xl`}
      >
        <LayoutDashboard className="w-5 h-5" />
        Go to Dashboard
      </Link>
    </section>
  );
}
