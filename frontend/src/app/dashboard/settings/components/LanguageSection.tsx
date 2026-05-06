"use client";

import { Globe } from "lucide-react";

export function LanguageSection() {
  return (
    <div className="space-y-12 text-black">
      <div className="pb-4 border-b border-gray-50">
        <h3 className="text-sm font-black uppercase tracking-widest flex items-center gap-2">
          <Globe className="w-4 h-4" /> Regional Parameters
        </h3>
      </div>
      <div className="space-y-8">
        <div className="space-y-2">
          <label className="text-[10px] font-black uppercase tracking-widest text-gray-300 ml-1">Preferred Dialect</label>
          <select className="w-full p-5 bg-white border border-gray-100 rounded-3xl outline-none focus:border-black transition-all font-bold text-sm appearance-none cursor-pointer">
             <option>English (United States)</option>
             <option>Sinhala (Sri Lanka)</option>
             <option>Tamil (Sri Lanka)</option>
             <option>French (France)</option>
             <option>German (Germany)</option>
          </select>
        </div>
        <div className="space-y-2">
          <label className="text-[10px] font-black uppercase tracking-widest text-gray-300 ml-1">Timezone / Location</label>
          <select className="w-full p-5 bg-white border border-gray-100 rounded-3xl outline-none focus:border-black transition-all font-bold text-sm appearance-none cursor-pointer">
             <option>(UTC+05:30) Colombo, Sri Lanka</option>
             <option>(UTC+07:00) Vientiane, Bangkok</option>
             <option>(UTC+00:00) London, UTC</option>
             <option>(UTC-05:00) New York, EST</option>
          </select>
        </div>
      </div>
    </div>
  );
}
