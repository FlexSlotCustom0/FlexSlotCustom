"use client";

import { User, Camera, Mail } from "lucide-react";

export function ProfileSection({ username, setUsername, email, setEmail, role, profilePhoto, onPhotoUpload }: any) {
  const initials = username?.split(' ').map((n: string) => n[0]).join('').toUpperCase().substring(0, 2) || "U";
  return (
    <div className="space-y-16">
      <section className="flex flex-col md:flex-row items-center gap-10">
        <div className="relative group">
          <div className="w-32 h-32 rounded-full bg-black flex items-center justify-center text-4xl font-serif text-white shadow-2xl overflow-hidden">
            {profilePhoto ? (
              <img src={profilePhoto} alt="Profile" className="w-full h-full object-cover" />
            ) : (
              initials
            )}
          </div>
          <label className="absolute bottom-1 right-1 w-10 h-10 bg-white border border-gray-100 rounded-full shadow-lg flex items-center justify-center text-black cursor-pointer hover:scale-110 active:scale-95 transition-all">
            <Camera className="w-5 h-5" />
            <input type="file" accept="image/*" onChange={onPhotoUpload} className="hidden" />
          </label>
        </div>
        <div className="text-center md:text-left text-black">
          <div className="flex items-center gap-3 justify-center md:justify-start mb-2">
            <h1 className="text-4xl font-serif tracking-tight">{username}</h1>
            <div className="px-3 py-1 bg-gray-50 border border-gray-100 rounded-lg text-[9px] font-black uppercase tracking-widest">
              {role} Account
            </div>
          </div>
          <p className="text-gray-400 font-medium italic">Member since 2026.</p>
        </div>
      </section>

      <section className="space-y-8">
        <div className="pb-4 border-b border-gray-50">
          <h3 className="text-sm font-black uppercase tracking-widest text-black flex items-center gap-2">
            <User className="w-4 h-4" /> Identity Parameters
          </h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-gray-300 ml-1">Full Legal Name</label>
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} className="w-full p-4 bg-white border border-gray-100 rounded-2xl outline-none focus:border-black transition-all font-medium text-sm text-black" />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-gray-300 ml-1">Electronic Mail</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" />
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full pl-12 pr-4 py-4 bg-white border border-gray-100 rounded-2xl outline-none focus:border-black transition-all font-medium text-sm text-black" />
            </div>
          </div>
        </div>
      </section>
      
      <section className="pt-10">
        <div className="p-8 rounded-[2.5rem] bg-red-50/30 border border-red-100/50 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h4 className="text-red-600 font-bold mb-1">Decommission Account</h4>
            <p className="text-red-400 text-xs font-medium italic leading-relaxed">Instantly purge all patient data and clinical records.</p>
          </div>
          <button className="px-6 py-3 bg-white text-red-600 border border-red-100 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-red-600 hover:text-white transition-all shadow-sm">
            Purge Matrix
          </button>
        </div>
      </section>
    </div>
  );
}
