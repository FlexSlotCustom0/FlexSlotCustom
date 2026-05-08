"use client";

import { motion } from "framer-motion";
import {
  BarChart3, Users, Calendar, Settings, Bot, Search, Bell,
  TrendingUp, Layers, ShieldCheck, CheckCircle2, FileText,
  Plus, ExternalLink, Scissors, Code, Stethoscope, Briefcase, Check, ArrowRight,
  Layout, Database, Zap, Cpu, Lock, Globe, Mail, Clock, ChevronDown, Share2, MessageSquare,
  HeartPulse, Syringe, Cross, PawPrint, Bone, Laptop, Music, Bike, Coffee, User, MapPin, Terminal, CalendarClock, Activity
} from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";


export default function NotionCalendarClone() {

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    const offset = 72; // height of fixed navbar
    const top = el.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-white text-black font-sans selection:bg-blue-100">
      {/* Navigation */}
      <nav className="fixed w-full z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-10">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-9 h-9 bg-white border border-gray-100 rounded-lg flex items-center justify-center group-hover:scale-105 transition-all shadow-sm overflow-hidden">
                <img src="/flexslot_logo.png" alt="FlexSlotCustom Logo" className="w-full h-full object-contain p-1" />
              </div>
              <span className="font-black tracking-tighter text-lg text-[#1e3a8a] uppercase">FlexSlotCustom</span>
            </Link>

            <div className="hidden lg:flex items-center gap-6 text-[14px] font-medium text-gray-600">
              <button onClick={() => scrollToSection('services')} className="hover:text-black transition-colors">Services</button>
              <button onClick={() => scrollToSection('product')} className="hover:text-black transition-colors">Features</button>
              <button onClick={() => scrollToSection('workflow')} className="hover:text-black transition-colors">Workflow</button>
              <button onClick={() => scrollToSection('pricing')} className="hover:text-black transition-colors">Pricing</button>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Link href="/login?step=login" className="text-[14px] font-medium hover:bg-gray-50 px-3 py-1.5 rounded-md transition-colors">Log in</Link>
            <Link href="/login?step=role" className="bg-[#1e3a8a] text-white text-[14px] font-bold px-4 py-1.5 rounded-md hover:bg-[#1a367c] transition-colors">
              Get FlexSlotCustom free
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        {/* Floating Icons Style */}
        <div className="absolute inset-0 pointer-events-none">
          <FloatingIcon icon={<Stethoscope />} color="#E3F2FD" accent="#2196F3" top="15%" left="15%" />
          <FloatingIcon icon={<HeartPulse />} color="#F3E5F5" accent="#9C27B0" top="25%" right="10%" delay={0.5} />
          <FloatingIcon icon={<Activity />} color="#FCE4EC" accent="#E91E63" top="45%" right="5%" delay={1} />
          <FloatingIcon icon={<Syringe />} color="#E8F5E9" accent="#4CAF50" top="45%" left="5%" delay={1.5} />
          <FloatingIcon icon={<Cross />} color="#FFF3E0" accent="#FF9800" bottom="20%" right="15%" delay={2} />
          <FloatingIcon icon={<PawPrint />} color="#FFEBEE" accent="#F44336" top="35%" right="25%" delay={0.8} />
          <FloatingIcon icon={<Bone />} color="#E0F2F1" accent="#009688" bottom="15%" left="20%" delay={1.2} />
        </div>

        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex justify-center mb-6"
          >
            <div className="w-24 h-24 bg-white border border-gray-100 rounded-[2rem] flex items-center justify-center shadow-2xl relative overflow-hidden group">
              <img src="/flexslot_logo.png" alt="FlexSlotCustom" className="w-full h-full object-contain p-2 group-hover:scale-110 transition-transform" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <h4 className="text-[#1e3a8a] font-black text-sm tracking-[0.2em] mb-2 uppercase">FlexSlotCustom</h4>
            <h1 className="text-7xl md:text-8xl font-serif leading-[1.1] mb-8 tracking-tight text-blue-950">
              FlexSlotCustom
            </h1>
            <p className="text-xl md:text-2xl text-gray-500 font-medium mb-10 max-w-2xl mx-auto leading-relaxed">
              The premier slot booking platform for Doctor Clinics and Veterinary Practices. Beautifully designed for providers and patients alike.
            </p>

          </motion.div>
        </div>

      </section>

      {/* Transitional Brand Bar */}
      <div className="bg-black py-14 overflow-hidden border-y border-white/10">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-10 transition-all">
          <h2 className="text-white text-4xl md:text-5xl font-serif tracking-tight text-center md:text-left leading-tight max-w-xl">
            Ready to make time for what matters?
          </h2>
          <div className="flex flex-col items-center md:items-end gap-6">
            <Link href="/login?step=role" className="bg-white text-black px-10 py-4 rounded-xl font-bold text-lg hover:bg-gray-200 transition-all shadow-2xl hover:scale-[1.05] whitespace-nowrap">
              Get Started
            </Link>
          </div>
        </div>
      </div>

      {/* 2. Our Services Section - Symmetrical Discovery */}
      <section id="services" className="py-24 bg-white border-y border-gray-50 flex items-center justify-center overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 w-full">
          <div className="text-center mb-16">
            <h3 className="text-4xl md:text-5xl font-serif tracking-tight text-black">Dual-Care Excellence.</h3>
            <p className="text-gray-400 font-medium italic mt-4">Four specialized channels, one unified booking experience.</p>
          </div>

            {/* Services Content Container */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-24 gap-y-20 relative">

            {/* Category 01: Medical Channeling */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6 text-center md:text-right group"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-black text-white rounded-3xl mb-4 group-hover:scale-110 transition-transform shadow-xl shadow-black/10">
                <Stethoscope className="w-7 h-7" />
              </div>
              <div className="text-[10px] font-black tracking-widest text-gray-400 uppercase">Category 01: Medical Channeling</div>
              <h4 className="text-3xl md:text-4xl font-serif">Expert Medical Care</h4>
              <p className="text-gray-500 font-medium leading-relaxed max-w-sm md:ml-auto">
                Professional channeling for specialized doctor clinics and private medical practices.
              </p>
              <button className="inline-flex items-center gap-2 text-black font-bold text-sm tracking-tight border-b-2 border-black pb-1 hover:gap-4 transition-all">
                Find a Specialist <ArrowRight className="w-4 h-4" />
              </button>
            </motion.div>

            {/* Category 02: Veterinary Care */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6 text-center md:text-left group"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-black text-white rounded-3xl mb-4 group-hover:scale-110 transition-transform shadow-xl shadow-black/10">
                <PawPrint className="w-7 h-7" />
              </div>
              <div className="text-[10px] font-black tracking-widest text-gray-400 uppercase">Category 02: Veterinary Care</div>
              <h4 className="text-3xl md:text-4xl font-serif">Compassionate Pet Care</h4>
              <p className="text-gray-500 font-medium leading-relaxed max-w-sm md:mr-auto">
                Trusted clinic scheduling for veterinary specialists and animal wellness centers.
              </p>
              <button className="inline-flex items-center gap-2 text-black font-bold text-sm tracking-tight border-b-2 border-black pb-1 hover:gap-4 transition-all">
                Book a Vet Visit <ArrowRight className="w-4 h-4" />
              </button>
            </motion.div>

            {/* Category 03: Dental Precision */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6 text-center md:text-right group"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-black text-white rounded-3xl mb-4 group-hover:scale-110 transition-transform shadow-xl shadow-black/10">
                <Syringe className="w-7 h-7" />
              </div>
              <div className="text-[10px] font-black tracking-widest text-gray-400 uppercase">Category 03: Dental Precision</div>
              <h4 className="text-3xl md:text-4xl font-serif">Professional Dental Care</h4>
              <p className="text-gray-500 font-medium leading-relaxed max-w-sm md:ml-auto">
                Streamlined appointments for orthodontic, cosmetic, and general dental hygiene.
              </p>
              <button className="inline-flex items-center gap-2 text-black font-bold text-sm tracking-tight border-b-2 border-black pb-1 hover:gap-4 transition-all">
                Schedule Cleaning <ArrowRight className="w-4 h-4" />
              </button>
            </motion.div>

            {/* Category 04: Mental Health */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6 text-center md:text-left group"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-black text-white rounded-3xl mb-4 group-hover:scale-110 transition-transform shadow-xl shadow-black/10">
                <Activity className="w-7 h-7" />
              </div>
              <div className="text-[10px] font-black tracking-widest text-gray-400 uppercase">Category 04: Mental Health</div>
              <h4 className="text-3xl md:text-4xl font-serif">Psychological Wellness</h4>
              <p className="text-gray-500 font-medium leading-relaxed max-w-sm md:mr-auto">
                Secure and private scheduling for counseling, therapy, and cognitive sessions.
              </p>
              <button className="inline-flex items-center gap-2 text-black font-bold text-sm tracking-tight border-b-2 border-black pb-1 hover:gap-4 transition-all">
                Speak with a Counselor <ArrowRight className="w-4 h-4" />
              </button>
            </motion.div>

          </div>
        </div>
      </section>

      {/* 3. The Feature Grid (Technical Bento Box) */}
      <section id="product" className="py-24 bg-gray-50 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h3 className="text-4xl md:text-5xl font-serif tracking-tight">Software Engineering Priority</h3>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-3xl p-10 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-6">
                <Layers className="w-6 h-6" />
              </div>
              <h4 className="text-xl font-bold mb-4">Multi-Tenancy</h4>
              <p className="text-gray-500 font-medium leading-relaxed text-[15px]">
                Ensures strict data isolation for multiple businesses under a single unified architecture.
              </p>
            </div>
            <div className="bg-white rounded-3xl p-10 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mb-6">
                <Zap className="w-6 h-6" />
              </div>
              <h4 className="text-xl font-bold mb-4">High-Concurrency Engine</h4>
              <p className="text-gray-500 font-medium leading-relaxed text-[15px]">
                Mitigates race conditions during peak periods utilizing strictly enforced pessimistic and optimistic locking.
              </p>
            </div>
            <div className="bg-white rounded-3xl p-10 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-2xl flex items-center justify-center mb-6">
                <Bot className="w-6 h-6" />
              </div>
              <h4 className="text-xl font-bold mb-4">AI Business Assistant</h4>
              <p className="text-gray-500 font-medium leading-relaxed text-[15px]">
                Seamless integration of sophisticated LLMs to automate engagement workflows and generate deep analytics.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. The AI "Playground" Section */}
      <section id="workflow" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-[44px] leading-[1.1] font-serif mb-6 tracking-tight">How it Works.</h2>
            <div className="space-y-8">
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center shrink-0 border border-gray-100">
                  <Search className="w-6 h-6 text-black" />
                </div>
                <div>
                  <h4 className="font-bold text-xl">Search</h4>
                  <p className="text-gray-500 font-medium text-[15px] mt-2 leading-relaxed">
                    This highlights the platform's versatility. It shows that both medical doctors and veterinarians are available in one unified marketplace.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center shrink-0 border border-gray-100">
                  <CalendarClock className="w-6 h-6 text-black" />
                </div>
                <div>
                  <h4 className="font-bold text-xl">Select Slot</h4>
                  <p className="text-gray-500 font-medium text-[15px] mt-2 leading-relaxed">
                    This builds trust. It proves the system is live and accurate, reassuring the user that the time they pick is reserved specifically for them.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center shrink-0 border border-gray-100">
                  <CheckCircle2 className="w-6 h-6 text-black" />
                </div>
                <div>
                  <h4 className="font-bold text-xl">Confirm</h4>
                  <p className="text-gray-500 font-medium text-[15px] mt-2 leading-relaxed">
                    This provides closure. It emphasizes the speed of your FastAPI backend and the automation of your background workers (email/calendar sync).
                  </p>
                </div>
              </div>
            </div>
          </div>

          <BookingDemo />
        </div>
      </section>


      {/* 5. Pricing Plans */}
      <section id="pricing" className="py-24 bg-gray-50 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-[44px] leading-[1.1] font-serif tracking-tight mb-4">SaaS Tier Structure</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-[32px] p-10 border border-gray-100 flex flex-col hover:-translate-y-1 transition-transform duration-300 shadow-sm">
              <h3 className="font-bold text-xl mb-2">Starter</h3>
              <div className="text-4xl font-serif mb-6">$29<span className="text-lg text-gray-400 font-sans">/mo</span></div>
              <ul className="space-y-4 mb-8 flex-1">
                <FeaturePoint text="Basic slot booking orchestration" />
                <FeaturePoint text="Isolated tenant identification" />
                <FeaturePoint text="Standard email templates" />
              </ul>
              <button className="w-full py-3 rounded-xl border-2 border-black font-bold hover:bg-gray-100 transition-colors">Start Trial</button>
            </div>

            <div className="bg-black text-white rounded-[32px] p-10 border border-gray-800 flex flex-col shadow-2xl hover:-translate-y-1 transition-transform duration-300 relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-blue-500 text-white text-[10px] tracking-widest font-bold px-4 py-1 rounded-bl-xl">POPULAR</div>
              <h3 className="font-bold text-xl mb-2">Professional</h3>
              <div className="text-4xl font-serif mb-6">$89<span className="text-lg text-gray-400 font-sans">/mo</span></div>
              <ul className="space-y-4 mb-8 flex-1">
                <li className="flex items-center gap-3 text-gray-300 font-medium"><div className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center shrink-0"><Check className="w-3 h-3 text-white" strokeWidth={4} /></div> Automated background tasks</li>
                <li className="flex items-center gap-3 text-gray-300 font-medium"><div className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center shrink-0"><Check className="w-3 h-3 text-white" strokeWidth={4} /></div> Google Calendar sync</li>
                <li className="flex items-center gap-3 text-gray-300 font-medium"><div className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center shrink-0"><Check className="w-3 h-3 text-white" strokeWidth={4} /></div> Smart email dispatch queues</li>
              </ul>
              <button className="w-full py-3 rounded-xl bg-white text-black font-bold hover:bg-gray-200 transition-colors">Upgrade to Pro</button>
            </div>

            <div className="bg-white rounded-[32px] p-10 border border-gray-100 flex flex-col hover:-translate-y-1 transition-transform duration-300 shadow-sm">
              <h3 className="font-bold text-xl mb-2">Enterprise</h3>
              <div className="text-4xl font-serif mb-6">$299<span className="text-lg text-gray-400 font-sans">/mo</span></div>
              <ul className="space-y-4 mb-8 flex-1">
                <FeaturePoint text="Full AI predictive analytics" />
                <FeaturePoint text="SEO-optimized content generation" />
                <FeaturePoint text="Dedicated inference nodes" />
              </ul>
              <button className="w-full py-3 rounded-xl border-2 border-black font-bold hover:bg-gray-100 transition-colors">Contact Sales</button>
            </div>
          </div>
        </div>
      </section>


      {/* 6. Technical Stack Footer */}
      <section className="py-16 bg-[#0B0B0F] text-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8 text-center md:text-left">
            <div>
              <h2 className="text-2xl font-serif font-bold mb-2">Technical Foundation</h2>
              <p className="text-gray-400 font-medium max-w-sm">Engineered with a carefully selected stack for reliability and scale.</p>
            </div>
            <div className="flex flex-wrap justify-center md:justify-end gap-x-12 gap-y-6">
              <div className="flex flex-col items-center md:items-start">
                <span className="text-[10px] font-black tracking-widest text-blue-400 uppercase mb-2">Frontend</span>
                <span className="font-bold text-gray-200">Next.js & Tailwind CSS</span>
              </div>
              <div className="flex flex-col items-center md:items-start">
                <span className="text-[10px] font-black tracking-widest text-green-400 uppercase mb-2">Backend</span>
                <span className="font-bold text-gray-200">FastAPI (Python) & PostgreSQL</span>
              </div>
              <div className="flex flex-col items-center md:items-start">
                <span className="text-[10px] font-black tracking-widest text-purple-400 uppercase mb-2">Infrastructure</span>
                <span className="font-bold text-gray-200">Redis & Ollama (Self-Hosted Model)</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Real Footer */}
      <footer className="bg-gray-50 border-t border-gray-100 py-20 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-4 lg:grid-cols-6 gap-12">
          <div className="col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-6 h-6 bg-black rounded flex items-center justify-center"><Calendar className="w-4 h-4 text-white" /></div>
              <span className="font-bold text-[#1e3a8a] uppercase tracking-tighter">FlexSlotCustom</span>
            </div>
            <div className="flex gap-4 mb-8">
              <Link href="#" className="p-2 bg-white rounded-lg border border-gray-200 text-gray-400 hover:text-black transition-colors"><Globe className="w-4 h-4" /></Link>
              <Link href="#" className="p-2 bg-white rounded-lg border border-gray-200 text-gray-400 hover:text-black transition-colors"><Share2 className="w-4 h-4" /></Link>
              <Link href="#" className="p-2 bg-white rounded-lg border border-gray-200 text-gray-400 hover:text-black transition-colors"><MessageSquare className="w-4 h-4" /></Link>
            </div>
            <p className="text-sm text-gray-400">© 2026 FlexSlotCustom Labs, Inc.</p>
          </div>
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

function BookingDemo() {
  const [step, setStep] = useState(0);
  const [typed, setTyped] = useState("");
  const [selectedSlot, setSelectedSlot] = useState<number | null>(null);

  const fullText = "Vet checkup for Max next Tuesday";
  const slots = ["9:00 AM", "11:30 AM", "2:00 PM", "4:30 PM"];

  // Typewriter effect
  useEffect(() => {
    if (step !== 0) return;
    setTyped("");
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setTyped(fullText.slice(0, i));
      if (i === fullText.length) {
        clearInterval(interval);
        setTimeout(() => setStep(1), 600);
      }
    }, 60);
    return () => clearInterval(interval);
  }, [step]);

  // AI processing → show slots
  useEffect(() => {
    if (step !== 1) return;
    const t = setTimeout(() => setStep(2), 1800);
    return () => clearTimeout(t);
  }, [step]);

  // Auto-select a slot
  useEffect(() => {
    if (step !== 2) return;
    const t = setTimeout(() => { setSelectedSlot(1); setStep(3); }, 1400);
    return () => clearTimeout(t);
  }, [step]);

  // Show confirmation then loop
  useEffect(() => {
    if (step !== 3) return;
    const t = setTimeout(() => { setStep(0); setSelectedSlot(null); }, 2800);
    return () => clearTimeout(t);
  }, [step]);

  return (
    <div className="relative">
      <div className="space-y-4 min-h-[340px]">

        {/* Step indicator */}
        <div className="flex items-center justify-center gap-4 mb-10">
          {["Type", "AI", "Slots", "Done"].map((label, i) => (
            <div key={i} className="flex items-center gap-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-[12px] font-black transition-all duration-500 ${step >= i ? "bg-black text-white" : "bg-gray-100 text-gray-400"}`}>
                {step > i ? <Check className="w-4 h-4" /> : i + 1}
              </div>
              <span className={`text-[12px] font-bold font-serif italic tracking-tight transition-colors duration-300 ${step >= i ? "text-black" : "text-gray-300"}`}>{label}</span>
              {i < 3 && <div className={`w-8 h-[1px] bg-gray-200 ml-2 transition-all duration-1000 ${step > i ? "bg-black h-[2px]" : ""}`} />}
            </div>
          ))}
        </div>

        {/* AI prompt input */}
        <div className="bg-gray-50 rounded-2xl p-4 border border-gray-100">
          <div className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">AI Booking Prompt</div>
          <div className="flex items-center gap-3">
            <Bot className="w-5 h-5 text-gray-400 shrink-0" />
            <span className="font-medium text-gray-800">
              {typed}
              {step === 0 && <span className="inline-block w-0.5 h-4 bg-black ml-0.5 animate-pulse align-middle" />}
            </span>
          </div>
        </div>

        {/* AI Processing */}
        {step === 1 && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-blue-50 rounded-2xl p-4 border border-blue-100 flex items-center gap-3"
          >
            <div className="flex gap-1">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
            </div>
            <span className="text-sm font-medium text-blue-700">AI system parsing intent & temporal entity...</span>
          </motion.div>
        )}

        {/* Slot selection */}
        {(step === 2 || step === 3) && (
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
            <div className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-3">Available Tuesday Slots</div>
            <div className="grid grid-cols-2 gap-2">
              {slots.map((slot, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.08 }}
                  className={`p-3 rounded-xl border-2 text-center text-sm font-bold cursor-pointer transition-all duration-300 ${selectedSlot === i
                    ? "border-black bg-black text-white shadow-lg scale-105"
                    : "border-gray-100 bg-white text-gray-700 hover:border-gray-300"
                    }`}
                >
                  <Clock className="w-3.5 h-3.5 inline mr-1 mb-0.5" />
                  {slot}
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Confirmation */}
        {step === 3 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-emerald-50 rounded-2xl p-4 border border-emerald-200 flex items-center gap-3"
          >
            <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center shrink-0">
              <Check className="w-4 h-4 text-white" strokeWidth={3} />
            </div>
            <div>
              <div className="font-bold text-emerald-800 text-sm">Booking Confirmed!</div>
              <div className="text-emerald-600 text-xs mt-0.5">Tuesday, 11:30 AM · Business Consult · Calendar invite sent</div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
