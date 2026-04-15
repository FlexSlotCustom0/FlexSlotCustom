"use client";

import { motion } from "framer-motion";
import {
  MapPin, Clock, Phone, Star, Calendar, ChevronRight,
  Shield, PawPrint, Heart, Zap, Award, FileText, Activity
} from "lucide-react";
import Link from "next/link";
import { useTemplateContext } from "@/components/TemplateContext";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: "easeOut" },
  }),
};

export default function WildMedTemplate() {
  const { 
    shopData: shop, 
    staff: vets, 
    offerings: services,
    tips,
    reviews
  } = useTemplateContext();

  return (
    <div className="min-h-screen bg-[#022c22] text-[#ecfdf5] font-sans selection:bg-[#10b981] selection:text-white">
      {/* ── Adventure Nav ── */}
      <nav className="fixed top-0 w-full z-50 bg-[#022c22]/90 backdrop-blur-md border-b border-[#064e3b]">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
             <div className="w-8 h-8 rounded-lg bg-[#10b981] flex items-center justify-center text-white shadow-[0_0_20px_rgba(16,185,129,0.3)]">
                <PawPrint className="w-5 h-5 fill-white" />
             </div>
             <div className="flex flex-col">
                <span className="font-black text-sm tracking-widest leading-none mb-0.5 uppercase italic">{shop.name}</span>
                <span className="text-[8px] font-black tracking-[0.4em] text-[#10b981] uppercase">Exotic & Wildlife</span>
             </div>
          </div>
          <button
            className="bg-[#10b981] text-white text-[10px] font-black uppercase tracking-[0.3em] px-8 py-3 rounded-none hover:bg-white hover:text-black transition-all"
          >
            Emergency 24/7
          </button>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section className="relative pt-48 pb-32 px-6">
         <div className="max-w-6xl mx-auto relative z-10">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl">
               <div className="inline-flex items-center gap-3 text-[#10b981] mb-8">
                  <span className="w-12 h-px bg-[#10b981]" />
                  <span className="text-[10px] font-black uppercase tracking-[0.3em]">Specialized Field Medicine</span>
               </div>
               <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.9] mb-12 uppercase italic">
                  Care for the <br/> <span className="text-[#10b981]">Exordinary.</span>
               </h1>
               <p className="text-xl text-[#6ee7b7] font-medium leading-relaxed mb-12 max-w-xl opacity-80">
                  {shop.tagline}. Beyond the domestic, we provide elite health services for exotic species and field-based veterinary support.
               </p>
               <div className="flex flex-wrap gap-6">
                  <button className="bg-white text-black px-10 py-5 font-black text-[10px] uppercase tracking-[0.4em] hover:bg-[#10b981] hover:text-white transition-all">Book Consultation</button>
                  <div className="flex items-center gap-4">
                     <div className="flex items-center gap-1 text-[#f59e0b]">
                        <Star className="w-4 h-4 fill-current" />
                        <span className="text-lg font-black">{shop.rating}</span>
                     </div>
                     <span className="text-[10px] font-black uppercase tracking-[0.2em] opacity-40">Global Reputation</span>
                  </div>
               </div>
            </motion.div>
         </div>

         {/* Background Texture/Overlay */}
         <div className="absolute inset-x-0 top-0 h-full opacity-10 pointer-events-none overflow-hidden">
            <div className="w-[150%] h-full bg-[radial-gradient(circle_at_50%_50%,_#065f46_0%,_transparent_50%)] absolute -top-1/2 -left-1/4 blur-3xl" />
         </div>
      </section>

      {/* ── Visual Grid ── */}
      <section className="px-6 mb-32 max-w-6xl mx-auto">
         <div className="grid md:grid-cols-2 gap-6 h-[600px]">
            <motion.div 
               initial={{ opacity: 0, x: -50 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: true }}
               className="rounded-3xl border border-[#064e3b] overflow-hidden relative group"
               style={{ background: shop.bannerGradient }}
            >
               {!shop.bannerUrl && (
                  <div className="w-full h-full flex items-center justify-center text-[200px] opacity-10 grayscale mix-blend-overlay">🦅</div>
               )}
               <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors" />
               <div className="absolute bottom-10 left-10">
                  <h4 className="text-3xl font-black italic uppercase leading-none mb-2">Field Response</h4>
                  <p className="text-[10px] font-black uppercase tracking-widest text-[#10b981]">Mobile Diagnostic Units</p>
               </div>
            </motion.div>
            <div className="grid grid-rows-2 gap-6 h-full">
               <motion.div 
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="rounded-3xl bg-[#064e3b] border border-[#065f46] p-12 flex flex-col justify-end relative overflow-hidden group"
               >
                  <Activity className="absolute top-12 right-12 w-12 h-12 text-[#10b981] opacity-20" />
                  <h4 className="text-2xl font-black italic uppercase mb-2">Trauma Care</h4>
                  <p className="text-sm text-emerald-100/60 leading-relaxed font-medium">Equipped for critical rescue and surgical intervention in non-domestic species.</p>
               </motion.div>
               <motion.div 
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                  className="rounded-3xl border border-[#064e3b] p-12 flex items-center justify-between"
                  style={{ background: 'linear-gradient(135deg, #064e3b 0%, #022c22 100%)' }}
               >
                  <div className="grid grid-cols-2 gap-10">
                     {[
                        { l: 'Successful Cases', v: '2.5k+' },
                        { l: 'Species Treated', v: '80+' },
                     ].map((s, i) => (
                        <div key={i}>
                           <div className="text-3xl font-black italic mb-1 leading-none">{s.v}</div>
                           <div className="text-[8px] font-black uppercase tracking-widest text-[#10b981]">{s.l}</div>
                        </div>
                     ))}
                  </div>
               </motion.div>
            </div>
         </div>
      </section>

      {/* ── Services (Rugged List) ── */}
      <section className="py-32 bg-[#001c15] px-6">
         <div className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-10">
               <div className="max-w-md">
                  <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-[#10b981] mb-6">Expertise Registry</h2>
                  <h3 className="text-5xl font-black italic uppercase leading-[0.85] text-white">Advanced <br/> Medical Protocol.</h3>
               </div>
               <p className="text-emerald-100/40 text-sm font-medium leading-relaxed max-w-sm">
                  Our clinicians are Board-Certified in exotic animal medicine and ecosystem health, managing some of the most complex cases globally.
               </p>
            </div>

            <div className="space-y-4">
               {services.map((svc: any, i: number) => (
                 <motion.div
                   key={i}
                   whileHover={{ x: 10, borderColor: '#10b981' }}
                   className="p-10 border border-[#064e3b] flex flex-col md:flex-row justify-between items-center transition-all bg-[#022c22] cursor-pointer group"
                 >
                    <div className="flex items-center gap-10 w-full">
                       <span className="text-xs font-black text-[#10b981] opacity-40">0{i+1}</span>
                       <div className="text-4xl group-hover:drop-shadow-[0_0_15px_rgba(16,185,129,0.5)] transition-all">{svc.icon || "🐾"}</div>
                       <div>
                          <h4 className="text-2xl font-black italic uppercase group-hover:text-[#10b981] transition-colors">{svc.name}</h4>
                          <p className="text-[10px] font-black uppercase tracking-[0.2em] opacity-40 mt-1">{svc.desc}</p>
                       </div>
                    </div>
                    <div className="flex gap-16 items-center shrink-0 mt-8 md:mt-0">
                       <div className="text-right">
                          <span className="text-2xl font-black italic block leading-none">{svc.price}</span>
                          <span className="text-[8px] font-black uppercase tracking-widest text-[#10b981]">{svc.duration}</span>
                       </div>
                       <ChevronRight className="w-6 h-6 text-[#064e3b] group-hover:text-white transition-colors" />
                    </div>
                 </motion.div>
               ))}
            </div>
         </div>
      </section>

      {/* ── Footer ── */}
      <footer className="py-32 px-6">
         <div className="max-w-6xl mx-auto flex flex-col items-center text-center">
            <PawPrint className="w-12 h-12 text-[#10b981] mb-10 opacity-30" />
            <h3 className="text-4xl md:text-6xl font-black uppercase italic tracking-tighter mb-12">No species is <br/> <span className="text-[#10b981]">too exordinary.</span></h3>
            
            <div className="grid md:grid-cols-3 gap-16 w-full pt-20 border-t border-[#064e3b]">
               <div className="text-left">
                  <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-emerald-100/20 mb-6">HQ Address</h4>
                  <p className="text-sm font-medium leading-relaxed opacity-60 italic">{shop.address}</p>
               </div>
               <div className="text-left">
                  <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-emerald-100/20 mb-6">Contact Line</h4>
                  <p className="text-sm font-medium leading-relaxed opacity-60 italic">{shop.phone}</p>
               </div>
               <div className="text-left">
                  <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-emerald-100/20 mb-6">Compliance</h4>
                  <div className="flex gap-4 opacity-10 grayscale hover:opacity-100 hover:grayscale-0 transition-all">
                     <Shield className="w-8 h-8" />
                     <Award className="w-8 h-8" />
                  </div>
               </div>
            </div>
            
            <div className="mt-32 flex justify-between w-full text-[8px] font-black uppercase tracking-[0.5em] text-[#064e3b]">
               <span>© 2026 {shop.name}</span>
               <span>Built and Protected by FlexSlot Custom</span>
            </div>
         </div>
      </footer>
    </div>
  );
}
