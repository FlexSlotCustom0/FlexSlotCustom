"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

export function FilterDropdown({ label, options }: { label: string, options: string[] }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(label);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`px-6 py-3 bg-white border rounded-xl flex items-center gap-3 text-[10px] font-black uppercase tracking-widest transition-all ${isOpen ? 'border-black text-black' : 'border-black/5 text-black/40 hover:border-black/20'}`}
      >
        {selected}
        <ChevronDown size={14} className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute top-full right-0 mt-2 w-48 bg-white border border-black/5 rounded-2xl shadow-2xl z-[50] overflow-hidden p-2"
          >
            {options.map(o => (
              <button
                key={o}
                onClick={() => { setSelected(o); setIsOpen(false); }}
                className="w-full text-left px-4 py-3 text-[10px] font-black uppercase tracking-widest hover:bg-black/5 rounded-xl transition-colors"
              >
                {o}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
