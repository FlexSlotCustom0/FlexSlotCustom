"use client";

import { motion } from "framer-motion";
import {
  ArrowRight, Calendar, ChevronDown, Monitor, Clock,
  MapPin, User, Check, Plus, Search, HelpCircle,
  Laptop, Smartphone, Coffee, Music, Bike, Layout,
  Share2, Globe, MessageSquare
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function NotionCalendarClone() {
  return (
    <div className="min-h-screen bg-white text-black font-sans selection:bg-blue-100">
      {/* Navigation */}
      <nav className="fixed w-full z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-10">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-7 h-7 bg-black rounded-md flex items-center justify-center">
                <Calendar className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-lg">FlexSlot</span>
            </Link>

            <div className="hidden lg:flex items-center gap-6 text-[14px] font-medium text-gray-600">
              <button className="flex items-center gap-1 hover:text-black transition-colors">Product <ChevronDown className="w-3 h-3" /></button>
              <button className="flex items-center gap-1 hover:text-black transition-colors">Download <ChevronDown className="w-3 h-3" /></button>
              <Link href="#" className="hover:text-black transition-colors">Enterprise</Link>
              <Link href="#" className="hover:text-black transition-colors">Pricing</Link>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Link href="/dashboard" className="text-[14px] font-medium hover:bg-gray-50 px-3 py-1.5 rounded-md transition-colors">Log in</Link>
            <Link href="/dashboard" className="bg-black text-white text-[14px] font-bold px-4 py-1.5 rounded-md hover:bg-gray-800 transition-colors">
              Get FlexSlot free
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        {/* Floating Icons Style */}
        <div className="absolute inset-0 pointer-events-none">
          <FloatingIcon icon={<Laptop />} color="#E3F2FD" accent="#2196F3" top="15%" left="15%" />
          <FloatingIcon icon={<Music />} color="#F3E5F5" accent="#9C27B0" top="25%" right="10%" delay={0.5} />
          <FloatingIcon icon={<Bike />} color="#E8F5E9" accent="#4CAF50" top="45%" left="5%" delay={1} />
          <FloatingIcon icon={<Coffee />} color="#FFF3E0" accent="#FF9800" bottom="20%" right="15%" delay={1.5} />
          <FloatingIcon icon={<User />} color="#FFEBEE" accent="#F44336" top="35%" right="25%" delay={0.8} />
          <FloatingIcon icon={<MapPin />} color="#E0F2F1" accent="#009688" bottom="15%" left="20%" delay={1.2} />
        </div>

        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex justify-center mb-6"
          >
            <div className="w-16 h-16 bg-white border-2 border-black rounded-2xl flex items-center justify-center shadow-lg relative overflow-hidden">
              <span className="font-bold text-2xl">14</span>
              <div className="absolute top-0 left-0 w-full h-2 bg-black opacity-10" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <h4 className="text-gray-500 font-bold text-sm tracking-tight mb-2 uppercase">FlexSlot AI</h4>
            <h1 className="text-7xl md:text-8xl font-serif leading-[1.1] mb-8 tracking-tight">
              It’s time.
            </h1>
            <p className="text-xl md:text-2xl text-gray-500 font-medium mb-10 max-w-2xl mx-auto leading-relaxed">
              All of your commitments, now in one place. Meet the beautifully designed, fully integrated calendar for your work and life.
            </p>
            <div className="flex justify-center">
              <Link href="/dashboard" className="bg-black text-white px-8 py-3.5 rounded-lg font-bold text-lg hover:bg-gray-800 transition-all shadow-xl hover:scale-[1.02]">
                Get FlexSlot free
              </Link>
            </div>
          </motion.div>
        </div>

      </section>

      {/* Unified Section */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-20 items-center">
          <div>
            <h2 className="text-[44px] leading-[1.1] font-serif mb-6 tracking-tight">Time management, simplified.</h2>
            <p className="text-xl text-gray-500 mb-8 max-w-lg leading-relaxed font-medium">
              FlexSlot integrates your disparate bookings into a unified, high-performance interface. One place for your work, your life, and your AI assistant.
            </p>
            <ul className="space-y-4">
              <FeaturePoint text="Unified multi-tenant data engine" />
              <FeaturePoint text="Real-time occupancy visualization" />
              <FeaturePoint text="PostgreSQL Row Level Security" />
            </ul>
          </div>
          <div className="bg-gray-50 rounded-[48px] p-12 aspect-square flex items-center justify-center border border-gray-100 relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-tr from-gray-100 to-transparent group-hover:scale-110 transition-transform duration-1000" />
            <Layout className="w-40 h-40 text-black/10 relative z-10" />
          </div>
        </div>
      </section>

      {/* Scheduling Section */}
      <section className="py-32 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-20 items-center">
          <div className="order-2 md:order-1 bg-white rounded-[48px] p-12 aspect-square flex flex-col justify-center border border-gray-100 shadow-lg relative overflow-hidden">
            <div className="absolute top-10 left-10 p-4 bg-blue-500 rounded-2xl text-white font-bold text-xs uppercase tracking-widest shadow-lg shadow-blue-500/20">
              Pessimistic Lock
            </div>
            <div className="space-y-6">
              <div className="h-6 w-3/4 bg-gray-100 rounded-full" />
              <div className="h-6 w-1/2 bg-gray-50 rounded-full" />
              <div className="h-32 w-full border-2 border-dashed border-gray-100 rounded-3xl flex items-center justify-center text-gray-300 font-black italic">
                ASYNC_SYNC_ACTIVE
              </div>
            </div>
          </div>
          <div className="order-1 md:order-2">
            <h2 className="text-[44px] leading-[1.1] font-serif mb-6 tracking-tight">Built-in scheduling.</h2>
            <p className="text-xl text-gray-500 mb-8 max-w-lg leading-relaxed font-medium">
              No more jumping between apps. Send availability and book meetings directly from your command center with atomic precision.
            </p>
            <div className="flex gap-4">
              <div className="p-3 bg-white rounded-xl shadow-sm border border-gray-100">
                <Clock className="w-6 h-6" />
              </div>
              <div className="p-3 bg-white rounded-xl shadow-sm border border-gray-100">
                <Plus className="w-6 h-6" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-40 text-center bg-white border-t border-gray-100">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-6xl md:text-8xl font-serif mb-10 tracking-tight leading-[1.1]">Ready to <br />Master your time?</h2>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link href="/dashboard" className="w-full sm:w-auto bg-black text-white px-10 py-4 rounded-xl font-bold text-xl hover:bg-gray-800 transition-all flex items-center justify-center gap-3">
              Get FlexSlot free <ArrowRight className="w-5 h-5" />
            </Link>
            <Link href="/dashboard" className="w-full sm:w-auto text-gray-400 hover:text-black font-bold text-lg transition-colors underline underline-offset-8">
              Contact sales
            </Link>
          </div>
        </div>
      </section>

      {/* Real Footer */}
      <footer className="bg-gray-50 border-t border-gray-100 py-20 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-4 lg:grid-cols-6 gap-12">
          <div className="col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-6 h-6 bg-black rounded flex items-center justify-center"><Calendar className="w-4 h-4 text-white" /></div>
              <span className="font-bold">FlexSlot</span>
            </div>
            <div className="flex gap-4 mb-8">
              <Link href="#" className="p-2 bg-white rounded-lg border border-gray-200 text-gray-400 hover:text-black transition-colors"><Globe className="w-4 h-4" /></Link>
              <Link href="#" className="p-2 bg-white rounded-lg border border-gray-200 text-gray-400 hover:text-black transition-colors"><Share2 className="w-4 h-4" /></Link>
              <Link href="#" className="p-2 bg-white rounded-lg border border-gray-200 text-gray-400 hover:text-black transition-colors"><MessageSquare className="w-4 h-4" /></Link>
            </div>
            <p className="text-sm text-gray-400">© 2026 FlexSlot Labs, Inc.</p>
          </div>
          {["Product", "Download", "Resources", "Company"].map((col) => (
            <div key={col} className="space-y-4 text-[14px]">
              <h4 className="font-bold text-gray-900">{col}</h4>
              <ul className="space-y-2 text-gray-500 font-medium">
                <li><Link href="#" className="hover:text-black">Overview</Link></li>
                <li><Link href="#" className="hover:text-black">Features</Link></li>
                <li><Link href="#" className="hover:text-black">Integrations</Link></li>
                <li><Link href="#" className="hover:text-black">Mobile</Link></li>
              </ul>
            </div>
          ))}
        </div>
      </footer>
    </div>
  );
}

function FloatingIcon({ icon, color, accent, top, left, right, bottom, delay = 0 }: any) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1, y: [0, -10, 0] }}
      transition={{
        opacity: { duration: 0.5, delay },
        scale: { duration: 0.5, delay },
        y: { duration: 4, repeat: Infinity, ease: "easeInOut", delay }
      }}
      className="absolute border border-gray-100 rounded-3xl p-5 shadow-2xl backdrop-blur-sm"
      style={{ backgroundColor: color, top, left, right, bottom }}
    >
      <div className="w-10 h-10 flex items-center justify-center rounded-xl" style={{ border: `2px solid ${accent}`, color: accent }}>
        {icon}
      </div>
    </motion.div>
  );
}

function FeaturePoint({ text }: { text: string }) {
  return (
    <li className="flex items-center gap-3 text-gray-600 font-medium">
      <div className="w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center">
        <Check className="w-3 h-3 text-white" strokeWidth={4} />
      </div>
      {text}
    </li>
  );
}
