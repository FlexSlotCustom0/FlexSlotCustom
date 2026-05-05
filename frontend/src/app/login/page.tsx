"use client";

import { useState, useEffect, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar, ArrowRight, User, Store, Scissors, Code,
  Stethoscope, Briefcase, Check, ChevronLeft, Layout,
  Sparkles, Lock, Mail, HeartPulse, PawPrint, Syringe, CalendarClock,
  ShieldCheck, Globe, Rocket, Plus, Trash2, Settings, Users, Activity
} from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

type Step = "choice" | "role" | "business" | "credentials" | "practitioner" | "services" | "build_home" | "login";

function AuthFlowContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [step, setStep] = useState<Step>("choice");
  const [role, setRole] = useState<"owner" | "customer" | null>(null);
  
  // State
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [niche, setNiche] = useState("General Practice");
  const [practitionerName, setPractitionerName] = useState("");
  const [services, setServices] = useState<string[]>(["Initial Consultation"]);
  const [selectedTemplate, setSelectedTemplate] = useState<string>("clinic-clean");
  
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const initialStep = searchParams.get("step") as Step;
    if (initialStep) setStep(initialStep);
  }, [searchParams]);

  const handleFinish = () => {
    setLoading(true);
    localStorage.setItem("flexslot_role", role || "owner");
    localStorage.setItem("flexslot_user_email", email || "admin@practice.com");
    localStorage.setItem("flexslot_active_clinic_name", businessName || "FlexSlotCoustom Wellness");
    localStorage.setItem("flexslot_active_template", selectedTemplate);
    
    setTimeout(() => {
      if (role === 'owner') {
        router.push("/dashboard/owner");
      } else {
        router.push("/dashboard/customer");
      }
      setLoading(false);
    }, 1500);
  };

  const stepsList = [
    { id: 'business', label: 'Business Info' },
    { id: 'credentials', label: 'Credentials' },
    { id: 'practitioner', label: 'Practitioner' },
    { id: 'services', label: 'Services' },
    { id: 'build_home', label: 'Home Page' }
  ];

  const currentStepIdx = stepsList.findIndex(s => s.id === step);

  return (
    <div className="min-h-screen bg-white text-black font-sans flex flex-col items-center justify-center p-4">
      {/* Background Subtle Gradient */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.02]">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,#000,transparent_50%)]" />
      </div>

      <div className="w-full max-w-5xl bg-white border border-black/10 rounded-[2.5rem] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] flex overflow-hidden min-h-[650px] relative z-10">
        
        {/* Sidebar Steps (Only for Owner Registration) */}
        {role === 'owner' && step !== 'choice' && step !== 'role' && step !== 'login' && (
          <div className="w-72 bg-black/[0.02] border-r border-black/5 p-12 flex flex-col">
            <div className="flex items-center gap-3 mb-16">
              <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center shadow-2xl">
                <CalendarClock className="w-5 h-5 text-white" />
              </div>
              <span className="font-black tracking-tighter uppercase text-sm">FlexSlotCoustom</span>
            </div>
            
            <div className="flex-1 space-y-10">
              {stepsList.map((s, idx) => {
                const isPassed = stepsList.findIndex(x => x.id === step) > idx;
                const isActive = step === s.id;
                return (
                  <div key={s.id} className="flex items-center gap-4 group">
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                      isPassed ? 'bg-black border-black' : isActive ? 'border-black' : 'border-black/10'
                    }`}>
                      {isPassed ? <Check size={12} className="text-white" /> : <div className={`w-1.5 h-1.5 rounded-full ${isActive ? 'bg-black' : 'transparent'}`} />}
                    </div>
                    <span className={`text-[10px] font-black uppercase tracking-widest ${isActive ? 'text-black' : 'text-black/20'}`}>
                      {s.label}
                    </span>
                  </div>
                );
              })}
            </div>
            
            <div className="mt-auto pt-10 border-t border-black/5">
               <div className="text-[10px] font-bold text-black/20 uppercase tracking-widest italic">Setup Progress</div>
               <div className="mt-2 h-1 bg-black/5 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${((currentStepIdx + 1) / stepsList.length) * 100}%` }}
                    className="h-full bg-black"
                  />
               </div>
            </div>
          </div>
        )}

        {/* Content Area */}
        <div className="flex-1 p-16 flex flex-col relative">
          <AnimatePresence mode="wait">
            {step === "choice" && (
              <motion.div key="choice" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="flex flex-col items-center justify-center h-full text-center space-y-12">
                <div className="space-y-4">
                  <h1 className="text-6xl font-black tracking-tighter uppercase italic">The New Standard.</h1>
                  <p className="text-black/30 font-bold uppercase tracking-widest text-xs">Choose your point of entry into the FlexSlotCoustom ecosystem</p>
                </div>
                <div className="grid grid-cols-2 gap-6 w-full max-w-lg">
                  <AuthOption 
                    icon={<Plus size={24} />} 
                    title="Create Account" 
                    desc="Initialize a new practice or patient profile" 
                    onClick={() => setStep("role")} 
                  />
                  <AuthOption 
                    icon={<User size={24} />} 
                    title="Sign In" 
                    desc="Access your existing administrative portal" 
                    onClick={() => setStep("login")} 
                  />
                </div>
              </motion.div>
            )}

            {step === "login" && (
              <motion.div key="login" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="flex flex-col justify-center h-full max-w-md mx-auto w-full space-y-10">
                <div className="space-y-2">
                  <button onClick={() => setStep("choice")} className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-black/30 hover:text-black mb-6">
                    <ChevronLeft size={14} /> Back
                  </button>
                  <h2 className="text-4xl font-black tracking-tighter uppercase italic">Secure Access</h2>
                  <p className="text-black/30 text-xs font-bold uppercase tracking-widest">Enter your credentials to proceed</p>
                </div>
                <div className="space-y-4">
                  <Input label="Email Address" type="email" placeholder="admin@practice.com" />
                  <Input label="Security Key" type="password" placeholder="••••••••" />
                </div>
                <button onClick={() => { setRole("owner"); handleFinish(); }} className="w-full py-6 bg-black text-white rounded-full font-black text-xs uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-2xl shadow-black/20">
                  Authenticate Instance
                </button>
              </motion.div>
            )}

            {step === "role" && (
              <motion.div key="role" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="flex flex-col justify-center h-full max-w-lg mx-auto w-full space-y-12">
                <div className="text-center space-y-2">
                  <h2 className="text-4xl font-black tracking-tighter uppercase italic">Select Role</h2>
                  <p className="text-black/30 text-xs font-bold uppercase tracking-widest">Define your identity within the network</p>
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <RoleCard 
                    icon={<Store size={24} />} 
                    title="Clinic Owner" 
                    desc="Build a practice and manage patients" 
                    onClick={() => { setRole("owner"); setStep("business"); }} 
                  />
                  <RoleCard 
                    icon={<User size={24} />} 
                    title="Patient" 
                    desc="Book sessions and manage health" 
                    onClick={() => { setRole("customer"); setStep("credentials"); }} 
                  />
                </div>
              </motion.div>
            )}

            {step === "business" && (
              <motion.div key="business" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-10">
                <div className="space-y-2">
                  <h2 className="text-4xl font-black tracking-tighter uppercase italic">Business Identity</h2>
                  <p className="text-black/30 text-xs font-bold uppercase tracking-widest">Define your clinical brand</p>
                </div>
                <div className="space-y-6">
                  <Input label="Clinic Name" value={businessName} onChange={(e) => setBusinessName(e.target.value)} placeholder="e.g. FlexSlotCoustom Wellness" />
                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-widest text-black/30">Practice Focus</label>
                    <div className="grid grid-cols-2 gap-3">
                      {["General Practice", "Veterinary", "Dental", "Mental Health"].map(n => (
                        <button key={n} onClick={() => setNiche(n)} className={`p-4 rounded-2xl border text-xs font-bold uppercase tracking-widest transition-all ${niche === n ? 'bg-black text-white border-black shadow-xl' : 'bg-white border-black/5 text-black/40 hover:border-black/20'}`}>
                          {n}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
                <button onClick={() => setStep("credentials")} className="w-full py-6 bg-black text-white rounded-full font-black text-xs uppercase tracking-widest flex items-center justify-center gap-3 shadow-xl">
                  Proceed <ArrowRight size={16} />
                </button>
              </motion.div>
            )}

            {step === "credentials" && (
              <motion.div key="credentials" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-10">
                <div className="space-y-2">
                  <h2 className="text-4xl font-black tracking-tighter uppercase italic">Access Keys</h2>
                  <p className="text-black/30 text-xs font-bold uppercase tracking-widest">Secure your administrative portal</p>
                </div>
                <div className="space-y-6">
                  <Input label="Primary Email" value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="admin@practice.com" />
                  <Input label="Master Password" value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="••••••••" />
                </div>
                <button onClick={() => role === 'owner' ? setStep("practitioner") : handleFinish()} className="w-full py-6 bg-black text-white rounded-full font-black text-xs uppercase tracking-widest flex items-center justify-center gap-3 shadow-xl">
                  Configure Practitioner <ArrowRight size={16} />
                </button>
              </motion.div>
            )}

            {step === "practitioner" && (
              <motion.div key="practitioner" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-10">
                <div className="space-y-2">
                  <h2 className="text-4xl font-black tracking-tighter uppercase italic">Lead Practitioner</h2>
                  <p className="text-black/30 text-xs font-bold uppercase tracking-widest">Identify the primary caregiver</p>
                </div>
                <div className="space-y-6">
                  <Input label="Full Legal Name" value={practitionerName} onChange={(e) => setPractitionerName(e.target.value)} placeholder="e.g. Dr. Sarah Anderson" />
                  <div className="p-8 bg-black/5 rounded-[2rem] border border-dashed border-black/10 flex items-center gap-6">
                     <div className="w-12 h-12 bg-black rounded-2xl flex items-center justify-center text-white">
                        <User size={20} />
                     </div>
                     <p className="text-[10px] font-bold text-black/40 uppercase tracking-widest leading-relaxed">This identity will be associated with all clinical records and session logs.</p>
                  </div>
                </div>
                <button onClick={() => setStep("services")} className="w-full py-6 bg-black text-white rounded-full font-black text-xs uppercase tracking-widest flex items-center justify-center gap-3 shadow-xl">
                  Define Services <ArrowRight size={16} />
                </button>
              </motion.div>
            )}

            {step === "services" && (
              <motion.div key="services" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-10">
                <div className="space-y-2">
                  <h2 className="text-4xl font-black tracking-tighter uppercase italic">Clinical Offerings</h2>
                  <p className="text-black/30 text-xs font-bold uppercase tracking-widest">Define your initial service catalog</p>
                </div>
                <div className="space-y-4">
                  {services.map((s, i) => (
                    <div key={i} className="flex items-center gap-4 bg-black/5 p-6 rounded-[2rem] border border-black/5">
                      <div className="flex-1 text-xs font-black uppercase tracking-widest">{s}</div>
                      <button onClick={() => setServices(services.filter((_, idx) => idx !== i))} className="p-2 hover:bg-black hover:text-white rounded-xl transition-all">
                        <Trash2 size={14} />
                      </button>
                    </div>
                  ))}
                  <button onClick={() => setServices([...services, "New Specialized Service"])} className="w-full py-5 border-2 border-dashed border-black/10 rounded-[2rem] text-[10px] font-black uppercase tracking-widest text-black/20 hover:text-black hover:border-black/40 transition-all flex items-center justify-center gap-2">
                    <Plus size={14} /> Append Service
                  </button>
                </div>
                <button onClick={() => setStep("build_home")} className="w-full py-6 bg-black text-white rounded-full font-black text-xs uppercase tracking-widest flex items-center justify-center gap-3 shadow-xl">
                  Build Home Page <ArrowRight size={16} />
                </button>
              </motion.div>
            )}

            {step === "build_home" && (
              <motion.div key="build_home" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-10">
                <div className="space-y-2">
                  <h2 className="text-4xl font-black tracking-tighter uppercase italic">Visual DNA</h2>
                  <p className="text-black/30 text-xs font-bold uppercase tracking-widest">Select your clinic's public identity</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <TemplateCard 
                    id="clinic-clean" 
                    name="Pristine" 
                    desc="Clinical Minimalism" 
                    active={selectedTemplate === 'clinic-clean'} 
                    onClick={() => setSelectedTemplate('clinic-clean')} 
                  />
                  <TemplateCard 
                    id="pulse-modern" 
                    name="Diagnostic" 
                    desc="High-Tech Diagnostic" 
                    active={selectedTemplate === 'pulse-modern'} 
                    onClick={() => setSelectedTemplate('pulse-modern')} 
                  />
                  <TemplateCard 
                    id="vet-warm" 
                    name="Kindred" 
                    desc="Warm Neighborhood" 
                    active={selectedTemplate === 'vet-warm'} 
                    onClick={() => setSelectedTemplate('vet-warm')} 
                  />
                  <TemplateCard 
                    id="wild-med" 
                    name="Raw" 
                    desc="Outdoor & Field Med" 
                    active={selectedTemplate === 'wild-med'} 
                    onClick={() => setSelectedTemplate('wild-med')} 
                  />
                </div>
                <button onClick={handleFinish} className="w-full py-6 bg-black text-white rounded-full font-black text-xs uppercase tracking-widest flex items-center justify-center gap-3 shadow-2xl shadow-black/40">
                  {loading ? "INITIALIZING INSTANCE..." : "DEPLOY CLINIC PORTAL"}
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

function AuthOption({ icon, title, desc, onClick }: any) {
  return (
    <button onClick={onClick} className="p-8 bg-white border border-black/5 rounded-[2.5rem] text-left hover:border-black/20 hover:shadow-2xl transition-all group relative overflow-hidden">
      <div className="w-12 h-12 bg-black/5 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-black group-hover:text-white transition-all">
        {icon}
      </div>
      <h4 className="text-xl font-black uppercase tracking-tighter italic mb-1">{title}</h4>
      <p className="text-[10px] font-bold text-black/30 uppercase tracking-widest leading-relaxed">{desc}</p>
    </button>
  );
}

function RoleCard({ icon, title, desc, onClick }: any) {
  return (
    <button onClick={onClick} className="p-10 bg-white border border-black/5 rounded-[3rem] text-center hover:border-black/20 hover:shadow-2xl transition-all group">
      <div className="w-16 h-16 bg-black/5 rounded-[1.5rem] flex items-center justify-center mx-auto mb-6 group-hover:bg-black group-hover:text-white transition-all">
        {icon}
      </div>
      <h4 className="text-xl font-black uppercase tracking-tighter italic mb-1">{title}</h4>
      <p className="text-[10px] font-bold text-black/30 uppercase tracking-widest leading-relaxed">{desc}</p>
    </button>
  );
}

function TemplateCard({ id, name, desc, active, onClick }: any) {
  return (
    <button onClick={onClick} className={`p-8 rounded-[2rem] border text-left transition-all relative group ${active ? 'bg-black text-white border-black shadow-2xl' : 'bg-white border-black/5 hover:border-black/20'}`}>
      <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 ${active ? 'bg-white/10' : 'bg-black/5'}`}>
        <Layout size={18} />
      </div>
      <h4 className="text-sm font-black uppercase tracking-widest mb-0.5">{name}</h4>
      <p className={`text-[9px] font-bold uppercase tracking-widest ${active ? 'text-white/40' : 'text-black/30'}`}>{desc}</p>
      {active && <div className="absolute top-4 right-4 w-2 h-2 bg-white rounded-full" />}
    </button>
  );
}

function Input({ label, ...props }: any) {
  return (
    <div className="space-y-3">
      <label className="text-[10px] font-black uppercase tracking-widest text-black/30">{label}</label>
      <input {...props} className="w-full px-8 py-5 bg-black/5 border-transparent rounded-[1.5rem] text-xs font-black uppercase tracking-widest focus:outline-none focus:bg-white focus:ring-2 focus:ring-black transition-all shadow-inner" />
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-white flex items-center justify-center font-black uppercase tracking-[1em] italic text-black/20 animate-pulse">Synchronizing...</div>}>
      <AuthFlowContent />
    </Suspense>
  );
}
