"use client";

export function SideNavItem({ icon, label, active = false, onClick }: { icon: any, label: string, active?: boolean, onClick: () => void }) {
  return (
    <div 
      onClick={onClick}
      className={`flex items-center gap-4 px-6 py-5 rounded-[1.8rem] text-[15px] font-bold tracking-tight transition-all relative group cursor-pointer ${active 
        ? 'bg-[#1e3a8a] text-white shadow-2xl shadow-blue-900/20 scale-[1.02]' 
        : 'text-[#AEB4C1] hover:text-[#1e3a8a] hover:bg-blue-50/50'
      }`}>
      <div className={`${active ? 'text-white' : 'text-[#AEB4C1]'} transition-colors`}>{icon}</div>
      <span className="flex-1">{label}</span>
      {active && <div className="w-1.5 h-1.5 bg-[#D1D5DB] rounded-full" />}
    </div>
  );
}
