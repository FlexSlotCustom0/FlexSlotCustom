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
    <div className="min-h-screen bg-background text-foreground selection:bg-gold-deep/30">
      {/* Navigation */}
      <nav className="fixed w-full z-50 glass border-b border-border/10">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-foreground flex items-center justify-center">
              <Calendar className="w-5 h-5 text-background" />
            </div>
            <span className="font-semibold text-lg tracking-tight text-foreground">FlexSlot</span>
          </div>
          <div className="flex items-center gap-6 text-sm font-medium">
            <Link href="#features" className="hover:text-gold-deep transition-colors text-foreground/50">Features</Link>
            <Link href="#architecture" className="hover:text-gold-deep transition-colors text-foreground/50">Architecture</Link>
            <Link href="/dashboard" className="px-5 py-2 rounded-full bg-foreground text-background font-bold transition-all border border-foreground/10 hover:opacity-90">
              Dashboard
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-gold-deep/5 via-background to-background -z-10" />
        
        <div className="max-w-7xl mx-auto px-6">
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="text-center max-w-3xl mx-auto"
          >
            <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-deep/5 border border-gold-deep/10 text-gold-deep text-[10px] font-bold uppercase tracking-widest mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-gold-deep animate-pulse" />
              Obsidian Core Engine
            </motion.div>
            
            <motion.h1 variants={itemVariants} className="text-6xl lg:text-8xl font-bold tracking-tighter mb-8 leading-[0.9]">
              The Power of <br/><span className="text-gold-gradient">Silent Execution.</span>
            </motion.h1>
            
            <motion.p variants={itemVariants} className="text-lg lg:text-xl text-foreground/40 mb-12 leading-relaxed font-light max-w-2xl mx-auto">
              A high-density multi-tenant platform architected for extreme concurrency. Minimalist interface, maximum data integrity.
            </motion.p>
            
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center justify-center gap-5">
              <Link href="/dashboard" className="w-full sm:w-auto px-10 py-5 rounded-full bg-foreground text-background font-black transition-all flex items-center justify-center gap-3 group">
                Enter Command Center
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link href="/booking/demo" className="w-full sm:w-auto px-10 py-5 rounded-full border border-foreground/10 hover:bg-foreground/5 text-foreground font-semibold transition-all flex items-center justify-center gap-2">
                Tenant Portal
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-24 border-t border-border/10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-20 text-center">
            <h2 className="text-4xl font-bold mb-4">Precision Engineering</h2>
            <p className="text-foreground/30 max-w-xl mx-auto font-light">Zero compromise on concurrency and isolation, wrapped in a distilled aesthetic.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            <FeatureCard 
              icon={<ShieldCheck />}
              title="Pessimistic Locking"
              description="FOR UPDATE query patterns ensure exclusive row-level access during reservations."
            />
            <FeatureCard 
              icon={<Bot />}
              title="Predictive AI"
              description="Embedded TinyLlama model scales to handle natural language tenant onboarding."
            />
            <FeatureCard 
              icon={<Layers />}
              title="Logical Isolation"
              description="Rigid PostgreSQL RLS boundaries prevent cross-tenant data leakage."
            />
          </div>
        </div>
      </section>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <div className="glass-card p-10 rounded-[2rem] border border-border/5 bg-gradient-to-br from-foreground/[0.02] to-transparent hover:border-gold-deep/20 transition-all duration-500 group">
      <div className="w-14 h-14 rounded-2xl bg-foreground/5 border border-foreground/10 flex items-center justify-center text-foreground mb-8 group-hover:bg-foreground group-hover:text-background transition-all duration-500">
        {icon}
      </div>
      <h3 className="text-2xl font-bold text-foreground mb-4">{title}</h3>
      <p className="text-foreground/40 leading-relaxed font-light">{description}</p>
    </div>
  );
}
