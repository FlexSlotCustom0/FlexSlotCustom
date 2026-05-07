"use client";

export function SideNavItem({ icon, label, active, onClick }: { icon: any, label: string, active?: boolean, onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-bold transition-all relative group ${active
        ? 'bg-[#1e3a8a] text-white shadow-2xl shadow-blue-900/20'
        : 'text-black/40 hover:bg-blue-50/50 hover:text-[#1e3a8a]'
        }`}
    >
      {icon}
      {label}
    </button>
  );
}
