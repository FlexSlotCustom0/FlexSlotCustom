"use client";

import React, { useState, useEffect, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar, ArrowRight, User, Store, Scissors, Code,
  Stethoscope, Briefcase, Check, ChevronLeft, Layout,
  Sparkles, Lock, Mail, HeartPulse, PawPrint, Syringe, CalendarClock,
  ShieldCheck, Globe, Rocket, Plus, Trash2, Settings, Users, Activity
} from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

type Step = "choice" | "role" | "business" | "credentials" | "personal_detail" | "practitioner" | "services" | "build_home" | "login";

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
  const [selectedTemplate, setSelectedTemplate] = useState<string>("clinic-pristine");
  const [clinicTagline, setClinicTagline] = useState("Empowering health through precision care.");
  const [publicPhone, setPublicPhone] = useState("+1 234 567 8900");
  
  // Patient specific state
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [location, setLocation] = useState("");
  const [dob, setDob] = useState("");
  const [bloodType, setBloodType] = useState("");
  const [allergies, setAllergies] = useState("");
  
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const initialStep = searchParams.get("step") as Step;
    if (initialStep) setStep(initialStep);
  }, [searchParams]);

  const handleFinish = () => {
    setLoading(true);
    localStorage.setItem("flexslot_role", role || "owner");
    localStorage.setItem("flexslot_user_email", email || "admin@practice.com");
    
    if (role === 'owner') {
      localStorage.setItem("flexslot_active_clinic_name", businessName || "FlexSlotCoustom Wellness");
      localStorage.setItem("flexslot_active_template", selectedTemplate);
      localStorage.setItem("flexslot_active_tagline", clinicTagline);
      localStorage.setItem("flexslot_active_phone", publicPhone);
    } else {
      const newPatient = {
        id: `PAT-${Math.floor(1000 + Math.random() * 9000)}`,
        name: fullName,
        email: email,
        phone: phoneNumber,
        location: location,
        dob: dob,
        bloodType: bloodType,
        allergies: allergies,
        status: 'New',
        visits: 0,
        lastVisit: new Date().toISOString().split('T')[0]
      };

      // Get existing patients or initialize empty array
      const existingPatientsJson = localStorage.getItem("flexslot_registered_patients");
      const existingPatients = existingPatientsJson ? JSON.parse(existingPatientsJson) : [];
      
      // Add new patient and save back to localStorage
      localStorage.setItem("flexslot_registered_patients", JSON.stringify([...existingPatients, newPatient]));
      
      // Also save current user info for dashboard
      localStorage.setItem("flexslot_patient_name", fullName);
      localStorage.setItem("flexslot_patient_phone", phoneNumber);
      localStorage.setItem("flexslot_patient_location", location);
      localStorage.setItem("flexslot_patient_dob", dob);
      localStorage.setItem("flexslot_patient_blood_type", bloodType);
      localStorage.setItem("flexslot_patient_allergies", allergies);
    }
    
    setTimeout(() => {
      if (role === 'owner') {
        router.push("/dashboard/owner");
      } else {
        router.push("/dashboard/customer");
      }
      setLoading(false);
    }, 1500);
  };

  const stepsList = role === 'owner' 
    ? [
        { id: 'business', label: 'Business Info' },
        { id: 'credentials', label: 'Credentials' },
        { id: 'practitioner', label: 'Practitioner' },
        { id: 'services', label: 'Services' },
        { id: 'build_home', label: 'Home Page' }
      ]
    : [
        { id: 'credentials', label: 'Credentials' },
        { id: 'personal_detail', label: 'Personal Detail' }
      ];

  const currentStepIdx = stepsList.findIndex(s => s.id === step);

  return (
    <div className="min-h-screen bg-white text-black font-sans flex flex-col items-center justify-center p-4">
      {/* Background Subtle Gradient */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.02]">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,#000,transparent_50%)]" />
      </div>

      <div className="w-full max-w-5xl bg-white border border-black/10 rounded-[2.5rem] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] flex overflow-hidden min-h-[650px] relative z-10">
        
        {/* Sidebar Steps */}
        {(role === 'owner' || role === 'customer') && step !== 'choice' && step !== 'role' && step !== 'login' && (
          <div className="w-80 bg-black/[0.02] border-r border-black/5 p-12 flex flex-col">
            <div className="flex items-center gap-4 mb-20">
              <div className="w-12 h-12 bg-black rounded-xl flex items-center justify-center shadow-2xl p-2">
                <img src="/flexslot_logo.png" alt="" className="w-full h-full object-contain brightness-0 invert" />
              </div>
              <div className="flex flex-col">
                <span className="font-black tracking-tighter uppercase text-sm italic">FlexSlot</span>
                <span className="text-[8px] font-black uppercase tracking-[0.2em] text-black/20">Core Interface</span>
              </div>
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
                  <Input label="Clinic Name" value={businessName} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setBusinessName(e.target.value)} placeholder="e.g. FlexSlotCoustom Wellness" />
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
                  <h2 className="text-4xl font-black tracking-tighter uppercase italic">{role === 'owner' ? "Access Keys" : "Identity Data"}</h2>
                  <p className="text-black/30 text-xs font-bold uppercase tracking-widest">{role === 'owner' ? "Secure your administrative portal" : "Initialize your patient profile"}</p>
                </div>
                <div className="space-y-6">
                  {role === 'owner' ? (
                    <>
                      <Input label="Primary Email" value={email} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)} type="email" placeholder="admin@practice.com" />
                      <Input label="Master Password" value={password} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)} type="password" placeholder="••••••••" />
                    </>
                  ) : (
                    <>
                      <Input label="Full Name" value={fullName} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFullName(e.target.value)} placeholder="e.g. Alexander Wright" />
                      <Input label="Email Address" value={email} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)} type="email" placeholder="alex@example.com" />
                      <div className="grid grid-cols-2 gap-4">
                        <Input label="Phone Number" value={phoneNumber} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPhoneNumber(e.target.value)} placeholder="+1 234 567 890" />
                        <Input label="Location" value={location} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setLocation(e.target.value)} placeholder="San Francisco, CA" />
                      </div>
                    </>
                  )}
                </div>
                <button 
                  onClick={() => role === 'owner' ? setStep("practitioner") : setStep("personal_detail")} 
                  className="w-full py-6 bg-black text-white rounded-full font-black text-xs uppercase tracking-widest flex items-center justify-center gap-3 shadow-xl"
                >
                  {role === 'owner' ? "Configure Practitioner" : "Next: Personal Details"} <ArrowRight size={16} />
                </button>
              </motion.div>
            )}

            {step === "personal_detail" && (
              <motion.div key="personal_detail" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-10">
                <div className="space-y-2">
                  <h2 className="text-4xl font-black tracking-tighter uppercase italic">Personal Detail</h2>
                  <p className="text-black/30 text-xs font-bold uppercase tracking-widest">Complete your clinical background</p>
                </div>
                <div className="space-y-6">
                  <Input label="Date of Birth" value={dob} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDob(e.target.value)} type="date" />
                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-widest text-black/30">Blood Type</label>
                    <div className="grid grid-cols-4 gap-2">
                      {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map(type => (
                        <button 
                          key={type} 
                          onClick={() => setBloodType(type)} 
                          className={`py-3 rounded-xl border text-[10px] font-black transition-all ${bloodType === type ? 'bg-black text-white border-black' : 'bg-white border-black/5 text-black/40 hover:border-black/20'}`}
                        >
                          {type}
                        </button>
                      ))}
                    </div>
                  </div>
                  <Input label="Allergics (Allergies)" value={allergies} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAllergies(e.target.value)} placeholder="e.g. Penicillin, Peanuts (or 'None')" />
                </div>
                <button onClick={handleFinish} className="w-full py-6 bg-black text-white rounded-full font-black text-xs uppercase tracking-widest flex items-center justify-center gap-3 shadow-xl">
                  {loading ? "INITIALIZING..." : "FINISH REGISTRATION"} <Check size={16} />
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
                  <Input label="Full Legal Name" value={practitionerName} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPractitionerName(e.target.value)} placeholder="e.g. Dr. Sarah Anderson" />
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
              <motion.div key="build_home" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-12">
                <header className="space-y-2">
                  <h2 className="premium-header !text-6xl">Visual DNA</h2>
                  <p className="premium-sub">Select your clinic's public identity</p>
                </header>

                <div className="grid grid-cols-3 gap-6">
                  <TemplateCard 
                    id="clinic-pristine" 
                    name="Pristine" 
                    desc="Swiss Minimalism" 
                    active={selectedTemplate === 'clinic-pristine'} 
                    onClick={() => setSelectedTemplate('clinic-pristine')} 
                  />
                  <TemplateCard 
                    id="clinic-luxe" 
                    name="Luxe" 
                    desc="Private Practice Elite" 
                    active={selectedTemplate === 'clinic-luxe'} 
                    onClick={() => setSelectedTemplate('clinic-luxe')} 
                  />
                  <TemplateCard 
                    id="clinic-aura" 
                    name="Aura" 
                    desc="Modern Wellness" 
                    active={selectedTemplate === 'clinic-aura'} 
                    onClick={() => setSelectedTemplate('clinic-aura')} 
                  />
                </div>

                <div className="premium-card !p-8 space-y-6">
                  <header className="space-y-1">
                    <h3 className="text-[10px] font-black uppercase tracking-widest text-black/30">Brief Identity & Contact</h3>
                    <div className="h-px bg-black/5 w-full" />
                  </header>
                  <div className="grid grid-cols-2 gap-4">
                    <Input label="Public Tagline" value={clinicTagline} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setClinicTagline(e.target.value)} placeholder="e.g. Health in Harmony" />
                    <Input label="Public Phone" value={publicPhone} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPublicPhone(e.target.value)} placeholder="+1 234 567 8900" />
                  </div>
                </div>

                <button onClick={handleFinish} className="w-full py-8 bg-black text-white rounded-[2.5rem] font-black text-xs uppercase tracking-[0.4em] shadow-2xl hover:scale-[1.02] active:scale-95 transition-all">
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
    <button onClick={onClick} className="p-10 bg-white border border-black/5 rounded-[3rem] text-left hover:border-black/10 hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.1)] transition-all group relative overflow-hidden">
      <div className="w-14 h-14 bg-black/5 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-black group-hover:text-white transition-all">
        {icon}
      </div>
      <h4 className="text-2xl font-black uppercase tracking-tighter italic mb-1">{title}</h4>
      <p className="premium-sub !tracking-widest !normal-case !text-black/40">{desc}</p>
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
  const isLuxe = id === 'clinic-luxe';
  const isAura = id === 'clinic-aura';

  const bgStyle = active
    ? isLuxe
      ? 'bg-[#0a0a0a] text-[#f5f0e8] border-[#d4af37] shadow-[0_20px_60px_-10px_rgba(212,175,55,0.25)]'
      : isAura
        ? 'bg-gradient-to-br from-indigo-100 via-violet-50 to-purple-100 text-indigo-900 border-indigo-400 shadow-[0_20px_60px_-10px_rgba(99,102,241,0.25)]'
        : 'bg-black text-white border-black shadow-2xl'
    : 'bg-white border-black/5 hover:border-black/10 shadow-sm';

  const iconBg = active
    ? isLuxe ? 'bg-[#d4af37]/20' : isAura ? 'bg-indigo-500/10' : 'bg-white/10'
    : 'bg-black/5';

  const iconColor = active
    ? isLuxe ? 'text-[#d4af37]' : isAura ? 'text-indigo-500' : 'text-white'
    : 'text-black/20';

  const subColor = active
    ? isLuxe ? 'text-[#d4af37]/50' : isAura ? 'text-indigo-400' : 'text-white/40'
    : 'text-black/20';

  const dotColor = isLuxe ? 'bg-[#d4af37]' : isAura ? 'bg-indigo-400' : 'bg-white';

  return (
    <button onClick={onClick} className={`p-8 rounded-[2rem] border-2 text-left transition-all relative group flex flex-col justify-between h-[200px] ${bgStyle}`}>
      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${iconBg}`}>
        <Layout size={18} className={iconColor} />
      </div>
      <div className="space-y-1">
        <h4 className={`text-lg font-black uppercase tracking-tighter italic ${isLuxe && active ? 'font-serif' : ''}`}>{name}</h4>
        <p className={`text-[9px] font-black uppercase tracking-widest ${subColor}`}>{desc}</p>
      </div>
      {active && <div className={`absolute top-6 right-6 w-1.5 h-1.5 ${dotColor} rounded-full shadow-[0_0_8px_currentColor]`} />}
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
