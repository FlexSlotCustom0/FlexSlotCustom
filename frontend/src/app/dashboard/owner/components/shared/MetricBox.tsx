"use client";

export function MetricBox({ label, value }: { label: string, value: string }) {
  return (
    <div className="bg-black/5 rounded-[1.25rem] p-4 flex flex-col items-center justify-center text-center space-y-1 shadow-inner group hover:bg-black hover:text-white transition-all cursor-default min-h-[100px]">
      <h4 className="text-[8px] font-black uppercase tracking-widest text-black/30 group-hover:text-white/30">{label}</h4>
      <div className="text-3xl font-black italic">{value}</div>
    </div>
  );
}
