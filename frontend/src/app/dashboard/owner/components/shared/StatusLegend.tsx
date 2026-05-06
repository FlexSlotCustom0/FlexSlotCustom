"use client";

export function StatusLegend({ label, color, value }: { label: string, color: string, value: string }) {
  return (
    <div className="flex items-center justify-between text-[9px] font-black uppercase tracking-widest group cursor-default">
      <div className="flex items-center gap-3">
        <div className={`w-2.5 h-2.5 rounded-full ${color} group-hover:scale-125 transition-transform`} />
        <span className="text-black/40 group-hover:text-black transition-colors">{label}</span>
      </div>
      <span className="text-black/20 group-hover:text-black transition-colors italic">{value}</span>
    </div>
  );
}
