"use client";

import { motion } from "framer-motion";

export function SideNavItem({ icon, label, active, onClick }: { icon: any, label: string, active?: boolean, onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] transition-all relative group ${active
        ? 'bg-black text-white shadow-2xl shadow-black/10 scale-[1.02]'
        : 'text-black/30 hover:bg-black/5 hover:text-black'
        }`}
    >
      <div className={`transition-colors ${active ? 'text-white' : 'text-black/20 group-hover:text-black'}`}>
        {icon}
      </div>
      {label}
      
      {active && (
        <motion.div 
          layoutId="nav-dot"
          className="absolute right-4 w-1 h-1 bg-white rounded-full shadow-[0_0_8px_rgba(255,255,255,0.8)]"
        />
      )}
    </button>
  );
}
