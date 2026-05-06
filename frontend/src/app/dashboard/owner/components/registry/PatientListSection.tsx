"use client";

import { Search, Download, ArrowUpRight, ArrowDownRight, MoreHorizontal } from "lucide-react";

export function PatientListSection() {
  const patients = [
    { id: 'PAT-001', name: 'Alexander Wright', email: 'alex@example.com', status: 'Active', visits: 12, lastVisit: '2026-05-01' },
    { id: 'PAT-002', name: 'Sarah Jenkins', email: 'sarah.j@example.com', status: 'Follow-up', visits: 4, lastVisit: '2026-04-28' },
    { id: 'PAT-003', name: 'Michael Chen', email: 'm.chen@example.com', status: 'New', visits: 1, lastVisit: '2026-05-04' },
    { id: 'PAT-004', name: 'Emily Rodriguez', email: 'emily.r@example.com', status: 'Active', visits: 8, lastVisit: '2026-04-15' },
    { id: 'PAT-005', name: 'David Thompson', email: 'd.thompson@example.com', status: 'Inactive', visits: 15, lastVisit: '2026-03-20' },
  ];

  return (
    <div className="bg-white border border-black/5 rounded-[3rem] p-10 shadow-sm space-y-8">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-xl font-black uppercase tracking-tighter italic">Patient Registry</h2>
          <p className="text-[10px] font-bold text-black/20 uppercase tracking-widest">Total: 2,481 Signals Detected</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-black/20" size={14} />
            <input type="text" placeholder="Search registry..." className="pl-10 pr-4 py-3 bg-black/5 border-none rounded-xl text-[10px] font-black uppercase tracking-widest outline-none w-64 focus:ring-1 ring-black/10" />
          </div>
          <button className="p-3 bg-black/5 rounded-xl text-black/40 hover:text-black transition-colors"><Download size={16} /></button>
        </div>
      </div>

      <div className="overflow-hidden border border-black/5 rounded-[2rem]">
        <table className="w-full text-left">
          <thead className="bg-black/5">
            <tr>
              <th className="px-8 py-5 text-[9px] font-black uppercase tracking-widest text-black/40">Patient ID</th>
              <th className="px-8 py-5 text-[9px] font-black uppercase tracking-widest text-black/40">Identity</th>
              <th className="px-8 py-5 text-[9px] font-black uppercase tracking-widest text-black/40">Status</th>
              <th className="px-8 py-5 text-[9px] font-black uppercase tracking-widest text-black/40">Visits</th>
              <th className="px-8 py-5 text-[9px] font-black uppercase tracking-widest text-black/40">Last Signal</th>
              <th className="px-8 py-5 text-[9px] font-black uppercase tracking-widest text-black/40"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-black/5">
            {patients.map(p => (
              <tr key={p.id} className="hover:bg-black/[0.01] transition-colors group">
                <td className="px-8 py-6 text-[10px] font-black italic">{p.id}</td>
                <td className="px-8 py-6">
                  <div className="flex flex-col">
                    <span className="text-sm font-black uppercase tracking-tighter italic">{p.name}</span>
                    <span className="text-[9px] font-bold text-black/20 uppercase tracking-widest">{p.email}</span>
                  </div>
                </td>
                <td className="px-8 py-6">
                  <span className={`px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest ${
                    p.status === 'Active' ? 'bg-emerald-500/10 text-emerald-600' : 
                    p.status === 'Follow-up' ? 'bg-amber-500/10 text-amber-600' : 
                    p.status === 'New' ? 'bg-blue-500/10 text-blue-600' : 'bg-black/5 text-black/40'
                  }`}>{p.status}</span>
                </td>
                <td className="px-8 py-6">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-black italic">{p.visits}</span>
                    {p.visits > 10 ? <ArrowUpRight size={12} className="text-emerald-500" /> : <ArrowDownRight size={12} className="text-black/10" />}
                  </div>
                </td>
                <td className="px-8 py-6 text-[10px] font-bold text-black/30">{p.lastVisit}</td>
                <td className="px-8 py-6 text-right">
                  <button className="p-2 text-black/10 hover:text-black transition-colors"><MoreHorizontal size={16} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
