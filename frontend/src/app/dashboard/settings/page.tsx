"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
  Bell, ChevronLeft, LogOut, 
  Check, Shield, UserCircle, Globe
} from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

// Modular Components
import { ProfileSection } from "./components/ProfileSection";
import { SecuritySection } from "./components/SecuritySection";
import { NotificationsSection } from "./components/NotificationsSection";
import { LanguageSection } from "./components/LanguageSection";
import { SideNavItem } from "./components/SideNavItem";

export default function AccountSettingsPage() {
  const router = useRouter();
  const [role, setRole] = useState<string>("owner");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [activeTab, setActiveTab] = useState("profile");
  const [isSaving, setIsSaving] = useState(false);
  const [showSaved, setShowSaved] = useState(false);
  const [profilePhoto, setProfilePhoto] = useState<string | null>(null);

  useEffect(() => {
    const savedRole = localStorage.getItem("flexslot_role") || "owner";
    const savedUser = localStorage.getItem("flexslot_username") || (savedRole === "owner" ? "Clinic Admin" : "User Account");
    const savedEmail = localStorage.getItem("flexslot_user_email") || (savedRole === "owner" ? "owner@clinic.com" : "client@test.com");
    const savedPhoto = localStorage.getItem("flexslot_user_photo");
    
    setRole(savedRole);
    setUsername(savedUser);
    setEmail(savedEmail);
    if (savedPhoto) setProfilePhoto(savedPhoto);
  }, []);

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      localStorage.setItem("flexslot_username", username);
      localStorage.setItem("flexslot_user_email", email);
      if (profilePhoto) localStorage.setItem("flexslot_user_photo", profilePhoto);
      setIsSaving(false);
      setShowSaved(true);
      setTimeout(() => setShowSaved(false), 3000);
    }, 1000);
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (re: any) => setProfilePhoto(re.target.result);
      reader.readAsDataURL(file);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("flexslot_role");
    localStorage.removeItem("flexslot_username");
    localStorage.removeItem("flexslot_user_email");
    localStorage.removeItem("flexslot_user_photo");
    router.push("/login?step=role");
  };

  return (
    <div className="min-h-screen bg-white text-black font-sans flex flex-col md:flex-row overflow-hidden">
      {/* Sidebar / Navigation Rail */}
      <aside className="w-full md:w-[360px] border-r border-gray-100 flex flex-col h-auto md:h-screen sticky top-0 bg-white z-20">
        <div className="p-10 border-b border-gray-50">
          <Link href={role === "owner" ? "/dashboard/owner" : "/dashboard/customer"} className="flex items-center gap-4 group">
            <div className="w-12 h-12 bg-white border border-gray-100 rounded-xl flex items-center justify-center group-hover:scale-105 transition-all shadow-sm overflow-hidden">
              <img src="/flexslot_logo.png" alt="FlexSlotCustom Logo" className="w-full h-full object-cover p-1" />
            </div>
            <div className="flex flex-col">
              <span className="font-bold tracking-tight text-lg text-[#1e3a8a]">FlexSlotCustom</span>
              <span className="text-[9px] font-black uppercase tracking-[0.2em] text-gray-300">Account Matrix</span>
            </div>
          </Link>
        </div>

        <div className="flex-1 px-8 space-y-2 mt-10">
          <SideNavItem 
            icon={<UserCircle className="w-6 h-6" />} 
            label="Personal Profile" 
            active={activeTab === 'profile'} 
            onClick={() => setActiveTab('profile')} 
          />
          <SideNavItem 
            icon={<Shield className="w-6 h-6" />} 
            label="Security & Access" 
            active={activeTab === 'security'} 
            onClick={() => setActiveTab('security')} 
          />
          <SideNavItem 
            icon={<Bell className="w-6 h-6" />} 
            label="Notification Engine" 
            active={activeTab === 'notifications'} 
            onClick={() => setActiveTab('notifications')} 
          />
          <SideNavItem 
            icon={<Globe className="w-6 h-6" />} 
            label="Interface Language" 
            active={activeTab === 'language'} 
            onClick={() => setActiveTab('language')} 
          />
        </div>

        <div className="p-10">
           <button 
             onClick={handleLogout}
             className="w-full flex items-center justify-center gap-2 py-5 bg-gray-50 text-gray-400 rounded-3xl font-black text-[10px] uppercase tracking-[0.2em] hover:bg-black hover:text-white transition-all active:scale-95 border border-gray-100"
           >
             <LogOut className="w-4 h-4" /> End Session
           </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto bg-[#FDFDFD]">
        <header className="h-24 bg-white/80 backdrop-blur-md border-b border-gray-50 flex items-center justify-between px-12 sticky top-0 z-10">
          <h2 className="text-xl font-serif text-black italic">
            {activeTab === 'profile' && 'Account Matrix'}
            {activeTab === 'security' && 'Security Governance'}
            {activeTab === 'notifications' && 'Alert Configuration'}
            {activeTab === 'language' && 'Regional Parameters'}
          </h2>
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
          <AnimatePresence mode="wait">
            {activeTab === 'profile' && (
              <motion.div key="profile" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }}>
                <ProfileSection 
                  username={username} 
                  setUsername={setUsername} 
                  email={email} 
                  setEmail={setEmail} 
                  role={role} 
                  profilePhoto={profilePhoto}
                  onPhotoUpload={handlePhotoUpload}
                />
              </motion.div>
            )}
            {activeTab === 'security' && (
              <motion.div key="security" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }}>
                <SecuritySection />
              </motion.div>
            )}
            {activeTab === 'notifications' && (
              <motion.div key="notifications" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }}>
                <NotificationsSection role={role} />
              </motion.div>
            )}
            {activeTab === 'language' && (
              <motion.div key="language" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }}>
                <LanguageSection />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
