"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
  Settings, User, Lock, Bell, ChevronLeft, LogOut, 
  Camera, Check, Mail, Shield, Trash2, Sparkles,
  Store, UserCircle, Globe, Zap
} from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AccountSettingsPage() {
  const router = useRouter();
  const [role, setRole] = useState<string>("owner");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [showSaved, setShowSaved] = useState(false);

  useEffect(() => {
    const savedRole = localStorage.getItem("flexslot_role") || "owner";
    const savedUser = localStorage.getItem("flexslot_username") || (savedRole === "owner" ? "Clinic Admin" : "User Account");
    const savedEmail = localStorage.getItem("flexslot_user_email") || (savedRole === "owner" ? "owner@clinic.com" : "client@test.com");
    
    setRole(savedRole);
    setUsername(savedUser);
    setEmail(savedEmail);
  }, []);

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      localStorage.setItem("flexslot_username", username);
      localStorage.setItem("flexslot_user_email", email);
      setIsSaving(false);
      setShowSaved(true);
      setTimeout(() => setShowSaved(false), 3000);
    }, 1000);
  };

  const handleLogout = () => {
    localStorage.removeItem("flexslot_role");
    localStorage.removeItem("flexslot_username");
    localStorage.removeItem("flexslot_user_email");
    router.push("/login?step=role");
  };

  const initials = username?.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2) || "U";

  return (
    <div className="min-h-screen bg-white text-black font-sans flex flex-col md:flex-row">
      {/* Sidebar / Navigation Rail */}
      <aside className="w-full md:w-80 border-r border-gray-100 flex flex-col h-auto md:h-screen sticky top-0 bg-[#FDFDFD] z-20">
        <div className="p-8 border-b border-gray-50 flex items-center justify-between">
          <Link href={role === "owner" ? "/dashboard/owner" : "/dashboard/customer"} className="flex items-center gap-3 hover:opacity-70 transition-opacity">
            <div className="w-10 h-10 rounded-xl bg-black flex items-center justify-center text-white shadow-lg">
              <ChevronLeft className="w-6 h-6" />
            </div>
            <span className="font-bold text-sm tracking-tight">Dashboard</span>
          </Link>
        </div>

        <div className="flex-1 overflow-y-auto px-4 py-8 space-y-1">
          <SideNavItem icon={<UserCircle />} label="Personal Profile" active />
          <SideNavItem icon={<Shield />} label="Security & Access" />
          <SideNavItem icon={<Bell />} label="Notification Engine" />
          <SideNavItem icon={<Globe />} label="Interface Language" />
        </div>

        <div className="p-8 border-t border-gray-50">
           <button 
             onClick={handleLogout}
             className="w-full flex items-center justify-center gap-2 py-4 bg-black text-white rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-gray-800 transition-all shadow-xl active:scale-95"
           >
             <LogOut className="w-4 h-4" /> End Session
           </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto">
        <header className="h-20 bg-white/80 backdrop-blur-md border-b border-gray-100 flex items-center justify-between px-10 sticky top-0 z-10">
          <h2 className="text-xl font-serif text-black italic">Account Matrix</h2>
          <div className="flex items-center gap-6">
            <AnimatePresence>
              {showSaved && (
                <motion.div 
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center gap-2 text-emerald-500 font-bold text-[10px] uppercase tracking-widest px-4 py-2 bg-emerald-50 rounded-full border border-emerald-100"
                >
                  <Check className="w-3 h-3" /> Preferences Updated
                </motion.div>
              )}
            </AnimatePresence>
            <button 
              onClick={handleSave}
              disabled={isSaving}
              className="flex items-center gap-2 px-6 py-2.5 bg-black text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-gray-800 transition-all shadow-lg active:scale-95 disabled:opacity-50"
            >
              {isSaving ? "Syncing..." : "Apply Changes"}
            </button>
          </div>
        </header>

        <div className="p-8 md:p-12 max-w-4xl mx-auto space-y-16 pb-24">
          
          {/* Section: Profile Header */}
          <section className="flex flex-col md:flex-row items-center gap-10">
            <div className="relative group">
              <div className="w-32 h-32 rounded-full bg-black flex items-center justify-center text-4xl font-serif text-white shadow-2xl transition-transform group-hover:scale-[1.02]">
                {initials}
              </div>
              <button className="absolute bottom-1 right-1 w-10 h-10 bg-white border border-gray-100 rounded-full shadow-lg flex items-center justify-center text-black hover:bg-gray-50 transition-all active:scale-90">
                <Camera className="w-5 h-5" />
              </button>
            </div>
            <div className="text-center md:text-left">
              <div className="flex items-center gap-3 justify-center md:justify-start mb-2">
                <h1 className="text-4xl font-serif tracking-tight">{username}</h1>
                <div className="px-3 py-1 bg-gray-50 border border-gray-100 rounded-lg text-[9px] font-black text-black uppercase tracking-widest">
                  {role} Account
                </div>
              </div>
              <p className="text-gray-400 font-medium italic">Member of the FlexSlot ecosystem since 2026.</p>
            </div>
          </section>

          {/* Section: Base Information */}
          <section className="space-y-8">
            <div className="pb-4 border-b border-gray-50">
              <h3 className="text-sm font-black uppercase tracking-widest text-black flex items-center gap-2">
                <User className="w-4 h-4" /> Identity Parameters
              </h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-300 ml-1">Full Legal Name</label>
                <input 
                  type="text" 
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:bg-white focus:border-black transition-all font-medium text-sm"
                  placeholder="Enter your name"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-300 ml-1">Electronic Mail</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" />
                  <input 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:bg-white focus:border-black transition-all font-medium text-sm"
                    placeholder="email@example.com"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Section: Security */}
          <section className="space-y-8">
            <div className="pb-4 border-b border-gray-50">
              <h3 className="text-sm font-black uppercase tracking-widest text-black flex items-center gap-2">
                <Lock className="w-4 h-4" /> Security Protocol
              </h3>
            </div>
            <div className="p-10 bg-black rounded-[2.5rem] text-white flex flex-col md:flex-row items-center justify-between gap-8 group overflow-hidden relative shadow-2xl">
               <div className="relative z-10">
                  <h4 className="text-xl font-bold mb-1">Access Credentials</h4>
                  <p className="text-white/40 text-xs italic font-medium">Reset your authentication token for advanced security.</p>
               </div>
               <button className="relative z-10 px-8 py-4 bg-white text-black rounded-2xl font-black text-[10px] uppercase tracking-widest hover:scale-105 transition-all shadow-xl active:scale-95">
                  Update Password
               </button>
               <div className="absolute top-[-20%] right-[-10%] w-64 h-64 bg-white/5 rounded-full blur-[80px]" />
            </div>
          </section>

          {/* Section: Preferences */}
          <section className="space-y-8">
            <div className="pb-4 border-b border-gray-50">
              <h3 className="text-sm font-black uppercase tracking-widest text-black flex items-center gap-2">
                <Bell className="w-4 h-4" /> Subscriptions & Flags
              </h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <PreferenceToggle 
                label="Electronic Alerts" 
                desc="Receive booking confirmations in real-time." 
                active={true}
              />
              <PreferenceToggle 
                label="Clinical Insights" 
                desc="Weekly summary of patient load and trends." 
                active={role === "owner"}
              />
              <PreferenceToggle 
                label="Smart Triage" 
                desc="Allow AI to pre-screen booking requests." 
                active={true}
              />
              <PreferenceToggle 
                label="Market Visibility" 
                desc="Feature your profile in the global explorer." 
                active={role === "owner"}
              />
            </div>
          </section>

          {/* Dangerous Zone */}
          <section className="pt-10 space-y-6">
            <div className="p-8 rounded-[2.5rem] bg-red-50/30 border border-red-100/50 flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <h4 className="text-red-600 font-bold mb-1">Decommission Account</h4>
                <p className="text-red-400 text-xs font-medium italic leading-relaxed">Instantly purge all patient data and clinical records. <br className="hidden md:block"/>This action is irreversible.</p>
              </div>
              <button className="px-6 py-3 bg-white text-red-600 border border-red-100 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-red-600 hover:text-white transition-all shadow-sm flex items-center gap-2">
                <Trash2 className="w-4 h-4" /> Purge Matrix
              </button>
            </div>
          </section>

        </div>
      </main>
    </div>
  );
}

function SideNavItem({ icon, label, active = false }: { icon: any, label: string, active?: boolean }) {
  return (
    <div className={`flex items-center gap-3 px-6 py-4 rounded-2xl text-sm font-bold tracking-tight transition-all relative group cursor-pointer ${active ? 'bg-black text-white shadow-xl shadow-black/10' : 'text-gray-400 hover:bg-gray-50 hover:text-black'}`}>
      <div className="w-5 h-5">{icon}</div>
      {label}
      {active && <div className="absolute right-3 w-1.5 h-1.5 bg-white rounded-full animate-pulse" />}
    </div>
  );
}

function PreferenceToggle({ label, desc, active }: { label: string, desc: string, active: boolean }) {
  const [isOn, setIsOn] = useState(active);
  return (
    <div 
      onClick={() => setIsOn(!isOn)}
      className="p-6 rounded-2xl bg-white border border-gray-50 flex items-center justify-between group hover:border-black/5 hover:shadow-xl hover:shadow-black/[0.02] transition-all cursor-pointer"
    >
      <div className="flex-1">
        <h5 className="font-bold text-sm mb-1">{label}</h5>
        <p className="text-[10px] text-gray-400 font-medium italic">{desc}</p>
      </div>
      <div className={`w-12 h-6 rounded-full relative transition-all duration-300 ${isOn ? 'bg-emerald-500 shadow-inner' : 'bg-gray-100'}`}>
        <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all duration-300 shadow-md ${isOn ? 'left-7' : 'left-1'}`} />
      </div>
    </div>
  );
}
