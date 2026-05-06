"use client";

import { Shield, Zap, Globe } from "lucide-react";
import { PreferenceToggle } from "./PreferenceToggle";

export function SecuritySection() {
  return (
    <div className="space-y-12">
      <div className="p-10 bg-black rounded-[2.5rem] text-white flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden shadow-2xl">
         <div className="relative z-10">
            <h4 className="text-xl font-bold mb-1">Access Credentials</h4>
            <p className="text-white/40 text-xs italic font-medium">Reset your authentication token for advanced security.</p>
         </div>
         <button className="relative z-10 px-8 py-4 bg-white text-black rounded-2xl font-black text-[10px] uppercase tracking-widest hover:scale-105 transition-all">
            Update Password
         </button>
         <div className="absolute top-[-20%] right-[-10%] w-64 h-64 bg-white/5 rounded-full blur-[80px]" />
      </div>

      <section className="space-y-8 text-black">
        <div className="pb-4 border-b border-gray-50 flex justify-between items-center">
          <h3 className="text-sm font-black uppercase tracking-widest flex items-center gap-2">
            <Shield className="w-4 h-4" /> Multi-Factor Auth
          </h3>
          <span className="text-[9px] font-black px-3 py-1 bg-emerald-50 text-emerald-600 border border-emerald-100 rounded-lg tracking-widest">ENABLED</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
           <PreferenceToggle label="Trust Current Device" desc="Bypass prompt for 30 days." active={true} />
           <PreferenceToggle label="Biometric Unlock" desc="Use system fingerprint/FaceID." active={false} />
        </div>
      </section>

      <section className="space-y-8 text-black">
        <div className="pb-4 border-b border-gray-50">
          <h3 className="text-sm font-black uppercase tracking-widest flex items-center gap-2">
            <Zap className="w-4 h-4" /> Active Sessions
          </h3>
        </div>
        <div className="space-y-4">
           <div className="p-6 bg-white border border-gray-50 rounded-2xl flex items-center justify-between">
              <div className="flex items-center gap-4">
                 <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center"><Globe className="w-5 h-5 text-gray-400" /></div>
                 <div>
                    <div className="text-sm font-bold">Chrome on Windows</div>
                    <div className="text-[10px] text-gray-400 font-medium italic">Vientiane, Laos · Current Session</div>
                 </div>
              </div>
              <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-xl shadow-emerald-500/20" />
           </div>
        </div>
      </section>
    </div>
  );
}
