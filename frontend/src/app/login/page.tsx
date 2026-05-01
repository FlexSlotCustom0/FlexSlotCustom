"use client";

import { useState, useEffect, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar, ArrowRight, User, Store, Scissors, Code,
  Stethoscope, Briefcase, Check, ChevronLeft, Layout,
  Sparkles, Lock, Mail, HeartPulse, PawPrint, Syringe, CalendarClock
} from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

import { createClient } from "@/utils/supabase/client";

type Step = "choice" | "role" | "service" | "template" | "finalize" | "login";

function AuthFlowContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const supabase = createClient();
  
  const [step, setStep] = useState<Step>("choice");
  const [role, setRole] = useState<"owner" | "customer" | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [service, setService] = useState<string | null>(null);
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const initialStep = searchParams.get("step") as Step;
    if (initialStep && ["role", "service", "template", "finalize"].includes(initialStep)) {
      setStep(initialStep);
    }
  }, [searchParams]);

  const nextStep = (s: Step) => {
    setError(null);
    setStep(s);
  };
  
  const prevStep = () => {
    setError(null);
    if (step === "role") setStep("choice");
    if (step === "service") setStep("role");
    if (step === "finalize") setStep(role === 'owner' ? "service" : "role");
    if (step === "template") setStep("finalize");
    if (step === "login") setStep("choice");
  };

  const handleFinish = async (templateOverride?: string) => {
    if (!email || !password) return;
    setLoading(true);
    setError(null);

    const finalTemplate = templateOverride || selectedTemplate;

    try {
      if (step === "login") {
        // --- REAL LOGIN ---
        const { data, error: signInError } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (signInError) throw signInError;

        // Fetch profile to see if they are a PROVIDER or PATIENT
        const { data: profile } = await supabase
          .from("profiles")
          .select("role")
          .eq("id", data.user.id)
          .single();

        const userRole = profile?.role?.toLowerCase() || "patient";
        
        if (userRole === "provider") {
          router.push("/dashboard/owner");
        } else {
          router.push("/dashboard/customer");
        }
      } else {
        // --- REAL REGISTRATION ---
        const { data, error: signUpError } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              full_name: username,
              role: role === "owner" ? "PROVIDER" : "PATIENT",
            },
          },
        });

        if (signUpError) throw signUpError;

        if (data.user) {
          if (role === 'owner') {
            // If they are an owner, we might want to pre-save their template choice
            // For now, we'll redirect them to template setup
            if (finalTemplate) {
              localStorage.setItem("flexslot_active_template", finalTemplate);
              const niche = service === 'vet' ? 'veterinary' : 'medical';
              localStorage.setItem("flexslot_clinic_niche", niche);
              router.push(`/templates/${finalTemplate}?manage=true`);
            } else {
              router.push("/dashboard/owner");
            }
          } else {
            router.push("/dashboard/customer");
          }
        }
      }
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white text-black font-sans flex flex-col items-center justify-center p-6 selection:bg-black selection:text-white">
      {/* Background decoration */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden opacity-[0.03]">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-black rounded-full blur-[120px]" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-black rounded-full blur-[120px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-xl relative z-10"
      >
        {/* Logo */}
        <div className="flex flex-col items-center mb-12">
          <Link href="/" className="flex items-center gap-2 mb-4">
            <div className="w-10 h-10 bg-black rounded-xl flex items-center justify-center shadow-xl">
              <CalendarClock className="w-6 h-6 text-white" />
            </div>
            <span className="font-bold text-2xl tracking-tighter text-black">FlexSlot <span className="text-gray-400 font-serif italic">Custom</span></span>
          </Link>
          <div className="h-1 w-12 bg-gray-100 rounded-full" />
        </div>

        <div className="bg-white border border-gray-100 rounded-[3rem] p-12 shadow-2xl relative overflow-hidden group">
          <AnimatePresence mode="wait">

            {/* STEP: CHOICE */}
            {step === "choice" && (
              <motion.div
                key="choice"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                className="space-y-8"
              >
                <div className="text-center">
                  <h1 className="text-4xl font-serif mb-3">Welcome</h1>
                  <p className="text-gray-400 font-medium italic">Select your entry point to the ecosystem.</p>
                </div>
                <div className="grid gap-4">
                  <button
                    onClick={() => nextStep("role")}
                    className="w-full py-5 bg-black text-white rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-gray-800 transition-all shadow-lg"
                  >
                    Get Started <ArrowRight className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => nextStep("login")}
                    className="w-full py-5 border border-gray-100 rounded-2xl font-bold hover:bg-gray-50 transition-all"
                  >
                    Log in
                  </button>
                </div>
              </motion.div>
            )}

            {/* STEP: ROLE */}
            {step === "role" && (
              <motion.div
                key="role"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-8"
              >
                <div className="flex items-center gap-4 mb-4">
                  <button onClick={prevStep} className="p-2 hover:bg-gray-50 rounded-lg transition-colors"><ChevronLeft className="w-5 h-5" /></button>
                  <span className="text-[10px] font-black uppercase tracking-widest text-gray-300">Identity Selection</span>
                </div>
                <h1 className="text-4xl font-serif mb-8 leading-tight">How will you use <br />FlexSlot Custom?</h1>
                <div className="grid grid-cols-2 gap-6">
                  <RoleCard
                    icon={<Store className="w-8 h-8" />}
                    title="I&apos;m an Owner"
                    desc="I want to list services and manage slots."
                    onClick={() => { setRole("owner"); localStorage.setItem("flexslot_role", "owner"); nextStep("service"); }}
                  />
                  <RoleCard
                    icon={<User className="w-8 h-8" />}
                    title="I&apos;m a Customer"
                    desc="I want to book services and meet experts."
                    onClick={() => { setRole("customer"); localStorage.setItem("flexslot_role", "customer"); nextStep("finalize"); }}
                  />
                </div>
              </motion.div>
            )}

            {/* STEP: SERVICE CATEGORY (Owner Only) */}
            {step === "service" && (
              <motion.div
                key="service"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-8"
              >
                <div className="flex items-center gap-4 mb-4">
                  <button onClick={prevStep} className="p-2 hover:bg-gray-50 rounded-lg transition-colors"><ChevronLeft className="w-5 h-5" /></button>
                  <span className="text-[10px] font-black uppercase tracking-widest text-gray-300">Specialization</span>
                </div>
                <h1 className="text-4xl font-serif mb-8">What do you <br />offer?</h1>
                <div className="grid grid-cols-2 gap-4">
                  <ServiceTypeBtn icon={<Stethoscope />} label="General Practice" value="gp" selected={service === 'gp'} onClick={() => { setService('gp'); nextStep('finalize'); }} />
                  <ServiceTypeBtn icon={<HeartPulse />} label="Specialist Clinic" value="specialist" selected={service === 'specialist'} onClick={() => { setService('specialist'); nextStep('finalize'); }} />
                  <ServiceTypeBtn icon={<PawPrint />} label="Vet & Pet Care" value="vet" selected={service === 'vet'} onClick={() => { setService('vet'); nextStep('finalize'); }} />
                  <ServiceTypeBtn icon={<Syringe />} label="Dental & Lab" value="dental" selected={service === 'dental'} onClick={() => { setService('dental'); nextStep('finalize'); }} />
                </div>
              </motion.div>
            )}

            {/* STEP: TEMPLATE SELECTION (Owner Only) */}
            {step === "template" && (
              <motion.div
                key="template"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-8"
              >
                <div className="flex items-center gap-4 mb-4">
                  <button onClick={prevStep} className="p-2 hover:bg-gray-50 rounded-lg transition-colors"><ChevronLeft className="w-5 h-5" /></button>
                  <span className="text-[10px] font-black uppercase tracking-widest text-gray-300">Niche Interface</span>
                </div>
                <div>
                  <h1 className="text-4xl font-serif mb-2">Build your home.</h1>
                  <p className="text-gray-400 font-medium italic">Pick a template optimized for {service} businesses.</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {service === 'vet' ? (
                    <>
                      <TemplatePreview name="Vet Warm" type="Neighborhood Vet" onClick={() => handleFinish('vet-warm')} />
                      <TemplatePreview name="Paws Premium" type="Luxury Pet" onClick={() => handleFinish('paws-premium')} />
                    </>
                  ) : service === 'dental' ? (
                    <>
                      <TemplatePreview name="Dental Bright" type="Cosmetic" onClick={() => handleFinish('dental-bright')} />
                    </>
                  ) : (
                    <>
                      <TemplatePreview name="Clinic Clean" type="Modern Medical" onClick={() => handleFinish('clinic-clean')} />
                      <TemplatePreview name="Pulse Modern" type="Imaging" onClick={() => handleFinish('pulse-modern')} />
                    </>
                  )}
                </div>
              </motion.div>
            )}

            {/* STEP: FINALIZE */}
            {step === "finalize" && (
              <motion.div
                key="finalize"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="space-y-8"
              >
                <div className="flex items-center gap-4 mb-4">
                  <button onClick={prevStep} className="p-2 hover:bg-gray-50 rounded-lg transition-colors"><ChevronLeft className="w-5 h-5" /></button>
                  <span className="text-[10px] font-black uppercase tracking-widest text-gray-300">Finalizing Credentials</span>
                </div>
                <h1 className="text-4xl font-serif mb-2">Almost there.</h1>
                <div className="space-y-4">
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input 
                      type="text" 
                      placeholder="Username" 
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="w-full pl-12 pr-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-black/5" 
                    />
                  </div>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input 
                      type="email" 
                      placeholder="Email address" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-12 pr-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-black/5" 
                    />
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input 
                      type="password" 
                      placeholder="Password" 
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full pl-12 pr-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-black/5" 
                    />
                  </div>
                  <div className="p-4 bg-orange-50/50 rounded-2xl border border-orange-100/50">
                    <p className="text-[10px] text-orange-600 font-bold uppercase tracking-widest text-center">
                      Hint: Use <span className="text-black">owner@clinic.com</span> or <span className="text-black">client@test.com</span>
                    </p>
                  </div>
                  {error && (
                    <div className="p-4 bg-red-50 rounded-2xl border border-red-100">
                      <p className="text-[10px] text-red-600 font-bold uppercase tracking-widest text-center">
                        {error}
                      </p>
                    </div>
                  )}
                  <button
                    onClick={() => role === 'owner' ? nextStep('template') : handleFinish()}
                    disabled={!email || !username || !password || loading}
                    className="w-full py-5 bg-black text-white rounded-3xl font-bold mt-4 shadow-xl hover:bg-gray-800 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:hover:bg-black"
                  >
                    {loading ? (
                      <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                    ) : (
                      <>
                        {role === 'owner' ? 'Continue to Templates' : 'Complete Registration'} <Sparkles className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>
              </motion.div>
            )}

            {/* STEP: LOGIN */}
            {step === "login" && (
              <motion.div
                key="login"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="space-y-8"
              >
                <div className="flex items-center gap-4 mb-4">
                  <button onClick={prevStep} className="p-2 hover:bg-gray-50 rounded-lg transition-colors"><ChevronLeft className="w-5 h-5" /></button>
                  <span className="text-[10px] font-black uppercase tracking-widest text-gray-300">Returning User</span>
                </div>
                <h1 className="text-4xl font-serif mb-2">Welcome back.</h1>
                <p className="text-gray-500 text-sm font-medium italic mb-2">Enter the username and email you used to register.</p>
                <div className="space-y-4">
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input 
                      type="text" 
                      placeholder="Username" 
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="w-full pl-12 pr-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-black/5" 
                    />
                  </div>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input 
                      type="email" 
                      placeholder="Email address" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-12 pr-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-black/5" 
                    />
                  </div>
                  <div className="p-4 bg-emerald-50/50 rounded-2xl border border-emerald-100/50">
                    <p className="text-[10px] text-emerald-600 font-bold uppercase tracking-widest text-center">
                      Hint: Use <span className="text-black">owner@clinic.com</span> or <span className="text-black">client@test.com</span>
                    </p>
                  </div>
                  {error && (
                    <div className="p-4 bg-red-50 rounded-2xl border border-red-100">
                      <p className="text-[10px] text-red-600 font-bold uppercase tracking-widest text-center">
                        {error}
                      </p>
                    </div>
                  )}
                  <button
                    onClick={() => handleFinish()}
                    disabled={!email || !username || loading}
                    className="w-full py-5 bg-black text-white rounded-3xl font-bold mt-4 shadow-xl hover:bg-gray-800 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:hover:bg-black"
                  >
                    {loading ? (
                      <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                    ) : (
                      <>
                        Log In <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </div>

        {/* Info label */}
        <p className="mt-8 text-center text-gray-400 text-xs font-medium">
          © 2026 FlexSlot Custom Ecosystem. Secure & Private.
        </p>
      </motion.div>
    </div>
  );
}

export default function AuthFlow() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-gray-100 border-t-black rounded-full animate-spin" />
      </div>
    }>
      <AuthFlowContent />
    </Suspense>
  );
}

function RoleCard({ icon, title, desc, onClick }: { icon: any, title: string, desc: string, onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="bg-white border border-gray-100 rounded-[2rem] p-8 text-left hover:border-black/10 hover:shadow-xl hover:shadow-black/[0.02] transition-all group relative overflow-hidden h-full"
    >
      <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center mb-6 text-black group-hover:bg-black group-hover:text-white transition-colors">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-2 tracking-tight leading-tight">{title}</h3>
      <p className="text-xs text-gray-400 leading-relaxed font-medium italic">{desc}</p>
      <div className="absolute -bottom-10 -right-10 w-24 h-24 bg-gray-50 rounded-full opacity-50 group-hover:scale-110 transition-transform" />
    </button>
  );
}

function ServiceTypeBtn({ icon, label, onClick, selected }: { icon: any, label: string, value: string, selected: boolean, onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-4 p-5 rounded-2xl border transition-all text-left ${selected ? 'border-black bg-black text-white' : 'border-gray-50 bg-gray-50/30 hover:bg-gray-50'}`}
    >
      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${selected ? 'bg-white/10 text-white' : 'bg-white text-gray-300 shadow-sm'}`}>
        {icon}
      </div>
      <span className="text-sm font-bold tracking-tight">{label}</span>
    </button>
  );
}

function TemplatePreview({ name, type, onClick }: { name: string, type: string, onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="bg-white border border-gray-100 rounded-[2rem] p-6 text-left hover:border-black/20 hover:shadow-xl transition-all group overflow-hidden relative"
    >
      <div className="w-full aspect-[4/3] bg-gray-50 rounded-2xl mb-4 p-4 overflow-hidden">
        <div className="w-full h-full border border-gray-200 rounded-lg flex flex-col p-2 gap-2 bg-white">
          <div className="w-1/2 h-2 bg-gray-100 rounded-full" />
          <div className="w-full h-1 bg-gray-50 rounded-full" />
          <div className="w-full h-1 bg-gray-50 rounded-full" />
          <div className="mt-auto grid grid-cols-3 gap-2">
            <div className="h-6 bg-gray-50 rounded" />
            <div className="h-6 bg-gray-100 rounded" />
            <div className="h-6 bg-gray-50 rounded" />
          </div>
        </div>
      </div>
      <h4 className="font-bold text-sm mb-0.5">{name}</h4>
      <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">{type}</p>
      <div className="absolute top-4 right-4 bg-black text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
        <Check className="w-3 h-3" strokeWidth={4} />
      </div>
    </button>
  );
}
