"use client";

import { motion } from "framer-motion";
import { ArrowRight, Bot, Calendar, Layers, ShieldCheck, Zap } from "lucide-react";
import Link from "next/link";

export default function LandingPage() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } },
  };

  return (
    <div className="min-h-screen bg-black text-slate-50 selection:bg-gold-deep/30">
      {/* Navigation */}
      <nav className="fixed w-full z-50 glass border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-gold-light to-gold-deep flex items-center justify-center">
              <Calendar className="w-5 h-5 text-black" />
            </div>
            <span className="font-semibold text-lg tracking-tight text-gold-light">FlexSlot</span>
          </div>
          <div className="flex items-center gap-6 text-sm font-medium">
            <Link href="#features" className="hover:text-gold-light transition-colors text-white/70">Features</Link>
            <Link href="#architecture" className="hover:text-gold-light transition-colors text-white/70">Architecture</Link>
            <Link href="/dashboard" className="px-4 py-2 rounded-full bg-gold-deep/10 hover:bg-gold-deep/20 text-gold-light transition-all border border-gold-deep/20 font-bold">
              Dashboard
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-accent-purple/20 via-black to-black -z-10" />
        
        <div className="max-w-7xl mx-auto px-6">
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="text-center max-w-3xl mx-auto"
          >
            <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-deep/10 border border-gold-deep/20 text-gold-light text-sm font-medium mb-8">
              <span className="w-2 h-2 rounded-full bg-gold-deep animate-pulse" />
              Next-Gen Appointment Engine
            </motion.div>
            
            <motion.h1 variants={itemVariants} className="text-5xl lg:text-7xl font-bold tracking-tight mb-6">
              Bookings, Powered by <span className="text-gold-gradient">Intelligent AI</span>
            </motion.h1>
            
            <motion.p variants={itemVariants} className="text-lg lg:text-xl text-white/60 mb-10 leading-relaxed font-light">
              A high-density Multi-Tenant SaaS platform designed for extreme concurrency and seamless natural-language scheduling via an embedded <span className="text-accent-purple font-medium italic">TinyLlama Engine</span>.
            </motion.p>
            
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/dashboard" className="w-full sm:w-auto px-8 py-4 rounded-full bg-gold-deep hover:bg-gold-light text-black font-bold transition-all flex items-center justify-center gap-2 group shadow-[0_0_30px_rgba(245,158,81,0.2)]">
                Enter Dashboard
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link href="/booking/demo" className="w-full sm:w-auto px-8 py-4 rounded-full glass hover:bg-white/10 text-white font-semibold transition-all flex items-center justify-center gap-2 border border-white/5">
                View Tenant Demo
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-24 bg-black/40">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-16 text-center">
            <h2 className="text-3xl font-bold mb-4 text-gold-light">Enterprise-Grade Infrastructure</h2>
            <p className="text-white/40 max-w-2xl mx-auto">Built for absolute data integrity during peak loads with high-end aesthetic precision.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<ShieldCheck />}
              title="Pessimistic Locking"
              description="Eliminates race conditions. Simultaneous appointments trigger PostgreSQL Row Level Security."
            />
            <FeatureCard 
              icon={<Bot />}
              title="Server-Side AI"
              description="Self-Hosted TinyLlama (1.1B) parses natural language requests into structured booking data."
            />
            <FeatureCard 
              icon={<Layers />}
              title="Multi-Tenant Isolation"
              description="Dynamically themed environments with strict logical data boundaries and Gold-standard auditing."
            />
          </div>
        </div>
      </section>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <div className="glass-card hover:bg-slate-800/50 p-8 rounded-3xl transition-all duration-300">
      <div className="w-12 h-12 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 mb-6">
        {icon}
      </div>
      <h3 className="text-xl font-semibold text-slate-100 mb-3">{title}</h3>
      <p className="text-slate-400 leading-relaxed">{description}</p>
    </div>
  );
}
