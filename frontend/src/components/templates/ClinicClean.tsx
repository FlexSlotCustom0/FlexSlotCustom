"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  MapPin, Clock, Phone, Star, Calendar, ChevronRight,
  Shield, HelpCircle, Stethoscope, Edit3, LayoutDashboard
} from "lucide-react";
import Link from "next/link";
import { IconRenderer } from "@/components/IconRenderer";
import { BookingSystem } from "@/components/BookingSystem";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.06, duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

interface ClinicCleanProps {
  tenant: any;
  services: any[];
  staff: any[];
  faqs: any[];
  reviews?: any[];
}

export default function ClinicClean({ tenant, services, staff, faqs, reviews = [] }: ClinicCleanProps) {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<string | undefined>();

  const primaryColor = tenant.theme_config?.primaryColor || "#2563eb";
  const announcement = tenant.theme_config?.announcement || "Accepting new patients. Book online today.";

  const handleBook = (svcName?: string) => {
    if (typeof svcName === 'string') setSelectedService(svcName);
    else setSelectedService(undefined);
    setIsBookingOpen(true);
  };

  return (
    <div className="min-h-screen bg-white text-black font-sans selection:bg-blue-100">
      {/* ── Announcement Bar ── */}
      <div style={{ backgroundColor: primaryColor }} className="text-white text-center py-2.5 text-xs font-bold tracking-wide relative z-[60]">
        <Shield className="w-3.5 h-3.5 inline mr-1.5 mb-0.5" />
        {announcement}
      </div>

      {/* ── Sticky Nav ── */}
      <nav className="sticky top-0 w-full z-50 bg-white/90 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <IconRenderer name={tenant.theme_config?.logo || "Stethoscope"} className="w-5 h-5" />
            <span className="font-bold text-base flex items-center gap-1.5">
              {tenant.name}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => handleBook()}
              className="text-white text-sm font-bold px-5 py-2 rounded-xl transition-all hover:scale-[1.03] shadow-lg active:scale-95"
              style={{ backgroundColor: primaryColor }}
            >
              Book Appointment
            </button>
          </div>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section className="max-w-5xl mx-auto px-6 py-16 md:py-24">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
            <h1 className="text-4xl md:text-5xl font-serif tracking-tight mb-4 leading-[1.1]">
              Trusted healthcare for your whole family.
            </h1>
            <p className="text-gray-500 font-medium text-base md:text-lg mb-8 leading-relaxed">
              Welcome to {tenant.name}. Our experienced team of professionals provides comprehensive care in a modern environment.
            </p>
            <div className="flex items-center gap-4">
              <button
                onClick={() => handleBook()}
                className="text-white font-bold px-6 py-3 rounded-xl flex items-center gap-2 shadow-lg hover:scale-[1.02] transition-all"
                style={{ backgroundColor: primaryColor }}
              >
                <Calendar className="w-4 h-4" /> Schedule a Visit
              </button>
            </div>
          </motion.div>

          <div className="rounded-3xl overflow-hidden aspect-[4/3] bg-gray-50 flex items-center justify-center text-8xl grayscale opacity-20">
            <IconRenderer name={tenant.theme_config?.logo || "Stethoscope"} />
          </div>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-6">
        {/* ── Services ── */}
        <section className="py-14 border-t border-gray-100">
          <h2 className="text-xs font-black tracking-widest uppercase text-gray-400 mb-8">Our Services</h2>
          <div className="space-y-2">
            {services.map((svc, i) => (
              <motion.div
                key={svc.id}
                custom={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                onClick={() => handleBook(svc.name)}
                className="flex items-center justify-between p-5 rounded-3xl border border-gray-50 hover:border-gray-200 hover:shadow-sm transition-all group cursor-pointer bg-white"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ background: primaryColor + "08" }}>
                    <Stethoscope className="w-5 h-5" style={{ color: primaryColor }} />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm tracking-tight">{svc.name}</h4>
                    <p className="text-[10px] text-gray-400 font-medium">{svc.description || "Professional clinical procedure"}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right hidden sm:block">
                    <span className="font-black text-sm block">{svc.price}</span>
                    <span className="text-[10px] text-gray-300 font-bold uppercase tracking-widest">{svc.duration}</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-200 group-hover:text-black group-hover:translate-x-0.5 transition-all" />
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ── Staff ── */}
        <section className="py-14 border-t border-gray-100">
          <h2 className="text-xs font-black tracking-widest uppercase text-gray-400 mb-8">Our Specialists</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {staff.map((d, i) => (
              <div key={d.id} className="p-6 rounded-[2.5rem] border border-gray-100 bg-gray-50/50 text-center">
                <div className="w-20 h-20 mx-auto mb-4 rounded-3xl bg-white flex items-center justify-center text-4xl">
                  <IconRenderer name="UserRound" className="w-10 h-10 text-gray-400" />
                </div>
                <h4 className="font-bold text-sm">{d.name}</h4>
                <p className="text-xs text-gray-500 font-medium mb-1">{d.specialty}</p>
                <p className="text-[10px] font-black tracking-widest uppercase" style={{ color: primaryColor }}>
                  {d.credentials}
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>

      <footer className="mt-12 bg-gray-50 border-t border-gray-100 py-16 px-6 text-center">
        <p className="text-[10px] text-gray-400">© 2026 {tenant.name}. Powered by FlexSlot Custom.</p>
      </footer>

      <BookingSystem 
        clinicId={tenant.id}
        primaryColor={primaryColor}
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        serviceName={selectedService}
      />
    </div>
  );
}
