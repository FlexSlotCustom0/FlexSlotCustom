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
import { supabase } from "@/utils/supabase";

type Step = "choice" | "role" | "service" | "template" | "finalize" | "login";

function AuthFlowContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
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
        // Handle Login
        const { data, error: signInError } = await supabase.auth.signInWithPassword({
          email,
          password
        });
        
        if (signInError) throw signInError;
        
        // Fetch profile to determine role
        const { data: profile } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', data.user.id)
          .single();
          
        const userRole = profile?.role || 'customer';
        localStorage.setItem("flexslot_role", userRole);
        localStorage.setItem("flexslot_user_email", email);
        
        router.push(userRole === 'owner' ? "/dashboard/owner" : "/dashboard/customer");
      } else {
        // Registration - Minimal sign up to avoid trigger conflicts
        console.log("Attempting sign-up...");
        const { data, error: signUpError } = await supabase.auth.signUp({
          email,
          password
        });
        
        if (signUpError) {
          if (signUpError.message.includes("Database error")) {
            throw new Error("Supabase Database Error: Please ensure you have run the SQL script in 'supabase_setup.md'.");
          }
          throw signUpError;
        }
        
        if (data.user) {
          console.log("User created, syncing profile...");
          
          // 1. Create Profile
          const { error: profileError } = await supabase
            .from('profiles')
            .upsert({
              id: data.user.id,
              username: username || email.split('@')[0],
              role: role || 'customer',
              email: email
            });
            
          if (profileError) console.error("Profile sync error:", profileError);
          
          // 2. Create Tenant (Owner only)
          if (role === 'owner' && finalTemplate) {
            console.log("Syncing tenant...");
            let { error: tenantError } = await supabase
              .from('tenants')
              .upsert({
                owner_id: data.user.id,
                name: `${username || email.split('@')[0]}'s Clinic`,
                niche: service === 'vet' ? 'veterinary' : 'medical',
                template_id: finalTemplate
              });
              
            // If niche column doesn't exist, retry without it
            if (tenantError && (tenantError.message?.includes("niche") || tenantError.code === 'PGRST204')) {
               console.warn("Retrying tenant creation without niche column...");
               const { error: retryError } = await supabase
                 .from('tenants')
                 .upsert({
                   owner_id: data.user.id,
                   name: `${username || email.split('@')[0]}'s Clinic`,
                   template_id: finalTemplate
                 });
               tenantError = retryError;
            }

            if (tenantError) console.error("Tenant sync error:", tenantError);
          }
        }
        
        if (!data.session) {
          setError("Check your email to verify your account, then log in.");
          setLoading(false);
          return;
        }
        
        localStorage.setItem("flexslot_role", role || 'customer');
        localStorage.setItem("flexslot_user_email", email);
        if (username) localStorage.setItem("flexslot_username", username);
        
        if (role === 'owner' && finalTemplate) {
          localStorage.setItem("flexslot_active_template", finalTemplate);
          router.push(`/templates/${finalTemplate}?manage=true`);
        } else {
          router.push(role === 'owner' ? "/dashboard/owner" : "/dashboard/customer");
        }
      }
    } catch (err: any) {
      console.error("Auth process error:", err);
      setError(err.message || "Authentication failed. Check your setup.");
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
        <div className="flex flex-col items-center mb-12">
          <Link href="/" className="flex items-center gap-2 mb-4">
            <div className="w-10 h-10 bg-black rounded-xl flex items-center justify-center shadow-xl">
              <CalendarClock className="w-6 h-6 text-white" />
            </div>
            <span className="font-bold text-2xl tracking-tighter text-black">Kindred <span className="text-gray-400 font-serif italic">Calendar</span></span>
          </Link>
          <div className="h-1 w-12 bg-gray-100 rounded-full" />
        </div>

        <div className="bg-white border border-gray-100 rounded-[3rem] p-12 shadow-2xl relative overflow-hidden group">
          <AnimatePresence mode="wait">

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
                <h1 className="text-4xl font-serif mb-8 leading-tight">How will you use <br />Kindred Calendar?</h1>
                <div className="grid grid-cols-2 gap-6">
                  <RoleCard
                    icon={<Store className="w-8 h-8" />}
                    title="I'm an Owner"
                    desc="I want to list services and manage slots."
                    onClick={() => { setRole("owner"); nextStep("service"); }}
                  />
                  <RoleCard
                    icon={<User className="w-8 h-8" />}
                    title="I'm a Customer"
                    desc="I want to book services and meet experts."
                    onClick={() => { setRole("customer"); nextStep("finalize"); }}
                  />
                </div>
              </motion.div>
            )}

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

            {step === "finalize" && (
              <motion.div
                key="finalize"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="space-y-8"
              >
                <div className="flex items-center gap-4 mb-4">
                  <button onClick={prevStep} className="p-2 hover:bg-gray-50 rounded-lg transition-colors"><ChevronLeft className="w-5 h-5" /></button>
                  <span className="text-[10px] font-black uppercase tracking-widest text-gray-300">Credentials</span>
                </div>
                <h1 className="text-4xl font-serif mb-2">Almost there.</h1>
                <div className="space-y-4">
                  <input 
                    type="text" 
                    placeholder="Username" 
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl text-sm focus:outline-none" 
                  />
                  <input 
                    type="email" 
                    placeholder="Email address" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl text-sm focus:outline-none" 
                  />
                  <input 
                    type="password" 
                    placeholder="Password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl text-sm focus:outline-none" 
                  />
                  {error && <p className="text-red-500 text-[10px] font-bold italic text-center">{error}</p>}
                  <button
                    onClick={() => role === 'owner' ? nextStep('template') : handleFinish()}
                    disabled={!email || !password || loading}
                    className="w-full py-5 bg-black text-white rounded-3xl font-bold mt-4 shadow-xl flex items-center justify-center gap-2"
                  >
                    {loading ? "Processing..." : (role === 'owner' ? 'Continue to Templates' : 'Complete Registration')}
                  </button>
                </div>
              </motion.div>
            )}

            {step === "login" && (
              <motion.div
                key="login"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="space-y-8"
              >
                <div className="flex items-center gap-4 mb-4">
                  <button onClick={prevStep} className="p-2 hover:bg-gray-50 rounded-lg transition-colors"><ChevronLeft className="w-5 h-5" /></button>
                  <span className="text-[10px] font-black uppercase tracking-widest text-gray-300">Login</span>
                </div>
                <h1 className="text-4xl font-serif mb-2">Welcome back.</h1>
                <div className="space-y-4">
                  <input 
                    type="email" 
                    placeholder="Email address" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl text-sm focus:outline-none" 
                  />
                  <input 
                    type="password" 
                    placeholder="Password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl text-sm focus:outline-none" 
                  />
                  {error && <p className="text-red-500 text-[10px] font-bold italic text-center">{error}</p>}
                  <button
                    onClick={() => handleFinish()}
                    disabled={!email || !password || loading}
                    className="w-full py-5 bg-black text-white rounded-3xl font-bold mt-4 shadow-xl flex items-center justify-center gap-2"
                  >
                    {loading ? "Authenticating..." : "Log In"}
                  </button>
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}

export default function AuthFlow() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AuthFlowContent />
    </Suspense>
  );
}

function RoleCard({ icon, title, desc, onClick }: { icon: any, title: string, desc: string, onClick: () => void }) {
  return (
    <button onClick={onClick} className="bg-white border border-gray-100 rounded-[2rem] p-8 text-left hover:border-black/10 transition-all group relative overflow-hidden h-full">
      <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center mb-6 text-black group-hover:bg-black group-hover:text-white transition-colors">{icon}</div>
      <h3 className="text-xl font-bold mb-2 tracking-tight leading-tight">{title}</h3>
      <p className="text-xs text-gray-400 leading-relaxed font-medium italic">{desc}</p>
    </button>
  );
}

function ServiceTypeBtn({ icon, label, onClick, selected }: { icon: any, label: string, value: string, selected: boolean, onClick: () => void }) {
  return (
    <button onClick={onClick} className={`flex items-center gap-4 p-5 rounded-2xl border transition-all text-left ${selected ? 'border-black bg-black text-white' : 'border-gray-50 bg-gray-50/30 hover:bg-gray-50'}`}>
      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${selected ? 'bg-white/10 text-white' : 'bg-white text-gray-300 shadow-sm'}`}>{icon}</div>
      <span className="text-sm font-bold tracking-tight">{label}</span>
    </button>
  );
}

function TemplatePreview({ name, type, onClick }: { name: string, type: string, onClick: () => void }) {
  return (
    <button onClick={onClick} className="bg-white border border-gray-100 rounded-[2rem] p-6 text-left hover:border-black/20 hover:shadow-xl transition-all group overflow-hidden relative">
      <div className="w-full aspect-[4/3] bg-gray-50 rounded-2xl mb-4 p-4 overflow-hidden" />
      <h4 className="font-bold text-sm mb-0.5">{name}</h4>
      <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">{type}</p>
    </button>
  );
}
