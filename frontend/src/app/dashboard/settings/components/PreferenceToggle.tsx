"use client";

import { useState } from "react";

export function PreferenceToggle({ label, desc, active }: { label: string, desc: string, active: boolean }) {
  const [isOn, setIsOn] = useState(active);
  return (
    <div 
      onClick={() => setIsOn(!isOn)}
      className="p-6 rounded-2xl bg-white border border-gray-100 flex items-center justify-between group hover:border-black/5 hover:shadow-xl hover:shadow-black/[0.02] transition-all cursor-pointer"
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
