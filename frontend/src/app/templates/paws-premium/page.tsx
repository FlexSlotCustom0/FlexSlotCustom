"use client";

import { motion } from "framer-motion";
import {
   MapPin, Clock, Phone, Star, Calendar, ChevronRight,
   Shield, PawPrint, Heart, Sparkles, Award, FileText
} from "lucide-react";
import Link from "next/link";
import { useTemplateContext } from "@/components/TemplateContext";
import { IconRenderer } from "@/components/IconRenderer";

const fadeUp = {
   hidden: { opacity: 0, y: 30 },
   visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] as any },
   }),
};

export default function PawsPremiumTemplate() {
   const {
      shopData: shop,
      staff: vets,
      offerings: services,
      tips,
      reviews
   } = useTemplateContext();

   return (
      <div className="min-h-screen bg-[#fafaf9] text-[#1c1917] font-sans selection:bg-[#fde68a]">
         {/* ── Editorial Nav ── */}
         <nav className="fixed top-0 w-full z-50 bg-[#fafaf9]/80 backdrop-blur-xl border-b border-black/5">
            <div className="max-w-6xl mx-auto px-8 h-20 flex items-center justify-between">
               <div className="flex items-center gap-4">
                  <div className="text-3xl filter hover:drop-shadow-lg transition-all">
                     <IconRenderer name={shop.logo} />
                  </div>
                  <div className="flex flex-col">
                     <span className="font-serif text-xl tracking-tight leading-none mb-1 uppercase font-bold text-[#1c1917]">{shop.name}</span>
                     <span className="text-[10px] font-black tracking-[0.4em] text-amber-600 uppercase">Premium Wellness</span>
                  </div>
               </div>
               <div className="flex items-center gap-10">
                  <div className="hidden lg:flex gap-8 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">
                     <a href="#" className="hover:text-black transition-colors">Specialists</a>
                     <a href="#" className="hover:text-black transition-colors">Luxury Spa</a>
                     <a href="#" className="hover:text-black transition-colors">Pricing</a>
                  </div>
                  <button
                     className="bg-black text-white text-[10px] font-black uppercase tracking-[0.3em] px-8 py-4 rounded-none hover:bg-amber-600 transition-colors shadow-2xl"
                  >
                     Book VIP Visit
                  </button>
               </div>
            </div>
         </nav>

         {/* ── Hero ── */}
         <section className="pt-40 pb-24 px-8 max-w-6xl mx-auto overflow-hidden">
            <div className="grid lg:grid-cols-12 gap-16 items-center">
               <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1 }} className="lg:col-span-12 text-center mb-10">
                  <h1 className="text-7xl md:text-9xl font-serif tracking-tighter leading-[0.85] mb-12">
                     Uncompromising <br /> <span className="italic">Excellence.</span>
                  </h1>
               </motion.div>

               <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} className="lg:col-span-5">
                  <p className="text-xl text-gray-400 font-medium leading-relaxed mb-10">
                     {shop.tagline}. We’ve redefined the veterinary experience, blending gold-standard medicine with five-star boutique service.
                  </p>
                  <div className="flex flex-col gap-6">
                     <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.2em]">
                        <span className="w-12 h-px bg-amber-600" />
                        Approved by the Global Pet Wellness Board
                     </div>
                     <div className="flex gap-4">
                        <button className="bg-amber-600 text-white px-10 py-5 font-black text-[10px] uppercase tracking-[0.3em] hover:bg-black transition-all">Start Your Membership</button>
                     </div>
                  </div>
               </motion.div>

               <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} className="lg:col-span-7">
                  <div
                     className="aspect-[16/10] bg-black rounded-none shadow-[40px_40px_0px_0px_#fef3c7] overflow-hidden relative"
                     style={{ background: shop.bannerGradient }}
                  >
                     {!shop.bannerUrl && (
                        <div className="w-full h-full flex items-center justify-center text-[200px] mix-blend-overlay opacity-30 grayscale leading-none">
                           <IconRenderer name={shop.logo} />
                        </div>
                     )}
                  </div>
               </motion.div>
            </div>
         </section>

         {/* ── Signature Services ── */}
         <section className="bg-white py-32 px-8">
            <div className="max-w-6xl mx-auto">
               <div className="flex justify-between items-end mb-20">
                  <div>
                     <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-amber-600 mb-6">Concierge Care</h2>
                     <h3 className="text-5xl font-serif italic text-[#1c1917]">Signature Experiences.</h3>
                  </div>
                  <div className="text-right hidden md:block">
                     <Star className="w-10 h-10 text-amber-600 fill-amber-600 opacity-20 mx-auto mb-4" />
                     <p className="text-[10px] font-black uppercase tracking-widest text-gray-300">Member Exclusive since 2012</p>
                  </div>
               </div>

               <div className="grid md:grid-cols-2 gap-px bg-black/5 p-px">
                  {services.map((svc: any, i: number) => (
                     <motion.div
                        key={i}
                        whileHover={{ backgroundColor: '#fafaf9' }}
                        className="bg-white p-12 flex flex-col justify-between group h-[400px] transition-colors cursor-pointer"
                     >
                        <div className="text-4xl mb-10 group-hover:scale-110 transition-transform origin-left">
                           <IconRenderer name={svc.icon} />
                        </div>
                        <div>
                           <h4 className="font-serif text-3xl mb-4 italic group-hover:text-amber-600 transition-colors">{svc.name}</h4>
                           <p className="text-gray-400 font-medium text-sm leading-relaxed mb-10 max-w-sm">{svc.desc}</p>
                        </div>
                        <div className="flex items-center justify-between pt-8 border-t border-black/5">
                           <span className="text-[10px] font-black uppercase tracking-[0.3em] text-amber-600">From {svc.price}</span>
                           <span className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-300">{svc.duration}</span>
                        </div>
                     </motion.div>
                  ))}
               </div>
            </div>
         </section>

         {/* ── Testimonials ── */}
         <section className="py-32 px-8 max-w-5xl mx-auto">
            <div className="text-center mb-24">
               <h3 className="text-6xl font-serif italic mb-6">The Society’s Words.</h3>
               <span className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-300">Verified Member Reviews</span>
            </div>
            <div className="space-y-24">
               {reviews.map((r, i) => (
                  <motion.div key={i} className="flex flex-col md:flex-row gap-16 items-center">
                     <div className="text-9xl font-serif text-amber-100 leading-none shrink-0">“</div>
                     <div className="max-w-xl text-center md:text-left">
                        <p className="text-2xl font-medium text-gray-500 italic mb-8 leading-relaxed">“{r.text}”</p>
                        <div className="flex items-center justify-center md:justify-start gap-4">
                           <div className="w-8 h-px bg-black" />
                           <span className="text-[10px] font-black uppercase tracking-[0.3em]">{r.name}</span>
                        </div>
                     </div>
                  </motion.div>
               ))}
            </div>
         </section>

         {/* ── Footer ── */}
         <footer className="bg-black text-white pt-32 pb-16 px-8">
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-start gap-20">
               <div className="max-w-sm">
                  <div className="flex items-center gap-4 mb-8">
                     <IconRenderer name={shop.logo} className="w-8 h-8 text-white" />
                     <span className="font-serif text-2xl uppercase font-bold tracking-tight">{shop.name}</span>
                  </div>
                  <p className="text-gray-500 text-sm leading-relaxed mb-8">
                     Exclusive membership club providing the highest standard of health and lifestyle services for your esteemed companions.
                  </p>
                  <div className="text-[10px] font-black uppercase tracking-[0.3em] text-amber-600">Established MMXXIV</div>
               </div>

               <div className="grid grid-cols-2 gap-20">
                  <div className="space-y-6">
                     <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-500">Contact</h4>
                     <div className="space-y-2 text-sm text-gray-400">
                        <p>{shop.address}</p>
                        <p>{shop.phone}</p>
                        <p>{shop.hours}</p>
                     </div>
                  </div>
                  <div className="space-y-6 text-right">
                     <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-500">Legal</h4>
                     <div className="space-y-2 text-[10px] font-black uppercase tracking-[0.3em] text-gray-600">
                        <a href="#" className="block hover:text-white">Privacy Policy</a>
                        <a href="#" className="block hover:text-white">Terms of Registry</a>
                        <a href="#" className="block hover:text-white">Cookie Preferences</a>
                     </div>
                  </div>
               </div>
            </div>
            <div className="max-w-6xl mx-auto mt-32 pt-8 border-t border-white/5 flex justify-between items-center opacity-30">
               <span className="text-[10px] font-black uppercase tracking-widest text-gray-500">© 2026 {shop.name}</span>
               <span className="text-[10px] font-black uppercase tracking-widest text-gray-500 italic">Curated by FlexSlot Clinic</span>
            </div>
         </footer>
      </div>
   );
}
