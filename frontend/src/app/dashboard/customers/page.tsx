"use client";

import { motion } from "framer-motion";
import { 
  Users, Search, Filter, MoreVertical, Calendar, Mail, 
  Phone, MessageSquare, ShieldCheck, CheckCircle2, Send, 
  FileText, ChevronLeft, UserPlus, Globe, Star, Stethoscope, Heart, Activity
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const PATIENTS = [
  { id: "P-101", name: "David Miller", email: "d.miller@gmail.com", visits: 12, status: "Active", lastVisit: "2 days ago", tag: "CHRONIC" },
  { id: "P-102", name: "Sarah Chen", email: "sarahc@tech.io", visits: 5, status: "Under Review", lastVisit: "Just now", tag: "NEW" },
  { id: "P-103", name: "Samantha Reed", email: "s.reed@provider.net", visits: 24, status: "Active", lastVisit: "1 week ago", tag: "SURGERY" },
  { id: "P-104", name: "Elena Rodriguez", email: "elena@artstudio.com", visits: 2, status: "Follow-up", lastVisit: "3 days ago", tag: "POST-OP" },
];

export default function PatientsPage() {
  const [role, setRole] = useState<"provider" | "patient">("provider");

  return (
    <div className="min-h-screen bg-[#FDFDFD] text-black font-sans flex">
      {/* Navigation Rail */}
      <aside className="w-20 border-r border-gray-100 flex flex-col h-screen sticky top-0 bg-white items-center py-8 gap-8">
        <Link href="/dashboard" className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-lg">
          <ChevronLeft className="w-6 h-6" />
        </Link>
        <div className="flex-1" />
        <div className="w-10 h-10 rounded-full bg-gray-50 border border-gray-100" />
      </aside>

      <main className="flex-1 flex flex-col">
        {/* Header */}
        <header className="h-20 bg-white border-b border-gray-50 flex items-center justify-between px-10 sticky top-0 z-10">
          <div className="flex items-center gap-6">
            <div>
              <h1 className="text-2xl font-serif">Patient Vault</h1>
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-[0.2em] font-mono">Secure Health Nexus</p>
            </div>
            
            <div className="flex bg-gray-50 p-1 rounded-xl border border-gray-100">
              <button 
                onClick={() => setRole("provider")}
                className={`px-4 py-1.5 rounded-lg text-xs font-bold uppercase tracking-widest transition-all ${role === "provider" ? "bg-white text-blue-600 shadow-sm" : "text-gray-400"}`}
              >
                Patients
              </button>
              <button 
                onClick={() => setRole("patient")}
                className={`px-4 py-1.5 rounded-lg text-xs font-bold uppercase tracking-widest transition-all ${role === "patient" ? "bg-white text-blue-600 shadow-sm" : "text-gray-400"}`}
              >
                Specialists
              </button>
            </div>
          </div>

          <div className="flex items-center gap-4">
             <button className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-xl text-xs font-bold hover:bg-blue-700 transition-all shadow-md">
                <UserPlus className="w-4 h-4" /> {role === 'provider' ? 'Register Patient' : 'Find Specialists'}
             </button>
          </div>
        </header>

        <div className="p-10 max-w-7xl mx-auto w-full">
          <div className="mb-12 flex justify-between items-end">
            <div>
                <h2 className="text-5xl font-serif tracking-tight mb-2 italic">{role === 'provider' ? 'Clinical Insights' : 'Trusted Doctors'}</h2>
                <p className="text-gray-400 font-medium italic">High-fidelity medical registry and visit history.</p>
            </div>
            <div className="flex gap-4">
                <div className="px-6 py-4 rounded-[2.5rem] bg-white border border-gray-100 shadow-sm flex flex-col items-center justify-center min-w-[140px] group hover:bg-blue-600 transition-colors duration-500">
                    <span className="text-[9px] font-black uppercase mb-1 tracking-widest text-gray-300 group-hover:text-white/40">Nexus Sync</span>
                    <span className="text-xl font-bold font-mono group-hover:text-white">99.2%</span>
                </div>
            </div>
          </div>

          {/* Table / List View */}
          <div className="bg-white rounded-[2.5rem] border border-gray-50 shadow-sm overflow-hidden mb-12">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-gray-50 bg-gray-50/50 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">
                    <th className="px-10 py-5">{role === 'provider' ? 'PATIENT' : 'MEDICAL PROVIDER'}</th>
                    <th className="px-10 py-5">MEDICAL HISTORY</th>
                    <th className="px-10 py-5">CLASSIFICATION</th>
                    <th className="px-10 py-5">LAST VISIT</th>
                    <th className="px-10 py-5">ACTION</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {PATIENTS.map((item, idx) => (
                    <motion.tr 
                      key={item.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      className="hover:bg-blue-50/50 transition-all group"
                    >
                      <td className="px-10 py-6">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-gray-50 border border-gray-100 flex items-center justify-center font-bold text-gray-400 group-hover:bg-blue-600 group-hover:text-white transition-all">
                                {item.name.charAt(0)}
                            </div>
                            <div>
                                <div className="font-bold text-black">{item.name}</div>
                                <div className="text-[10px] text-gray-400 font-medium font-mono">{item.email}</div>
                            </div>
                        </div>
                      </td>
                      <td className="px-10 py-6">
                        <div className="text-sm font-bold font-mono italic">{item.visits} Consultations</div>
                      </td>
                      <td className="px-10 py-6">
                        <span className={`text-[9px] font-black uppercase tracking-widest px-3 py-1.5 rounded-lg shadow-sm border ${
                            item.tag === 'VIP' || item.tag === 'SURGERY' ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-400 border-gray-100'
                        }`}>
                            {item.tag}
                        </span>
                      </td>
                      <td className="px-10 py-6">
                        <div className="text-xs font-medium text-gray-500 italic">{item.lastVisit}</div>
                      </td>
                      <td className="px-10 py-6">
                        <button className="p-3 rounded-xl hover:bg-blue-100 text-gray-300 hover:text-blue-600 transition-all">
                            <MoreVertical className="w-4 h-4" />
                        </button>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <ActionCard icon={<Mail />} title="Secure Messaging" desc="Notify specific patient groups about results." btn="Draft" />
            <ActionCard icon={<Globe />} title="Export Medical Logs" desc="Download encrypted patient interaction history." btn="Export" outline />
          </div>
        </div>
      </main>
    </div>
  );
}

function ActionCard({ icon, title, desc, btn, outline }: { icon: any, title: string, desc: string, btn: string, outline?: boolean }) {
  return (
    <div className="bg-white p-8 rounded-[2.5rem] border border-gray-50 shadow-sm flex items-center gap-6 group hover:shadow-lg transition-all">
       <div className="w-16 h-16 rounded-2xl bg-gray-50 flex items-center justify-center text-gray-300 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-500">
         {icon}
       </div>
       <div className="flex-1">
         <h4 className="text-lg font-bold mb-1 tracking-tight">{title}</h4>
         <p className="text-xs text-gray-400 font-medium italic">{desc}</p>
       </div>
       <button className={`px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
           outline ? 'border border-gray-100 hover:bg-blue-600 hover:text-white' : 'bg-blue-600 text-white hover:bg-blue-700'
       }`}>
         {btn}
       </button>
    </div>
  );
}
