"use client";

import { useRef } from "react";

export function CalendarInput({ 
  label, 
  value, 
  icon, 
  type = "text",
  options = [],
  onChange 
}: { 
  label: string, 
  value: string, 
  icon: any,
  type?: "text" | "date" | "time" | "select",
  options?: string[],
  onChange?: (val: string) => void
}) {
  const inputRef = useRef<HTMLInputElement | HTMLSelectElement>(null);

  const handleClick = () => {
    if (type === "date" || type === "time") {
      (inputRef.current as any)?.showPicker?.();
    }
    inputRef.current?.focus();
  };

  return (
    <div 
      onClick={handleClick}
      className="flex items-center justify-between px-3 py-2.5 bg-black/5 rounded-lg border border-transparent hover:border-black/10 hover:bg-black/[0.07] transition-all cursor-pointer group active:scale-[0.98]"
    >
      <div className="flex flex-col flex-1">
        <span className="text-[7px] font-black text-black/20 uppercase tracking-widest group-hover:text-black/40 transition-colors">{label}</span>
        
        {type === "select" ? (
          <select
            ref={inputRef as any}
            value={value}
            onChange={(e) => onChange?.(e.target.value)}
            className="bg-transparent border-none p-0 text-[10px] font-black uppercase tracking-widest focus:ring-0 outline-none w-full appearance-none cursor-pointer"
          >
            {options.map(opt => (
              <option key={opt} value={opt} className="bg-white text-black">{opt}</option>
            ))}
          </select>
        ) : (
          <input 
            ref={inputRef as any}
            type={type}
            value={value}
            onChange={(e) => onChange?.(e.target.value)}
            className="bg-transparent border-none p-0 text-[10px] font-black uppercase tracking-widest focus:ring-0 outline-none w-full [color-scheme:light]"
          />
        )}
      </div>
      <div className="text-black/40 group-hover:text-black transition-colors shrink-0 ml-2">
        {icon}
      </div>
    </div>
  );
}


