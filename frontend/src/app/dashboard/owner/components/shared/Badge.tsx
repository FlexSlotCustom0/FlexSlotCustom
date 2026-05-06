"use client";

export function Badge({ label, color = "bg-black/5" }: { label: string, color?: string }) {
  return (
    <span className={`text-[8px] font-black uppercase tracking-widest px-2 py-1 rounded-md border border-white/5 ${color}`}>
      {label}
    </span>
  );
}
