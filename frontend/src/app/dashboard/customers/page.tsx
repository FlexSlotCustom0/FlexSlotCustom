"use client";

import { motion } from "framer-motion";
import { 
  Users, Search, Filter, MoreVertical, Calendar, Mail, 
  Phone, MessageSquare, ShieldCheck, CheckCircle2, Send, 
  FileText, ChevronLeft, UserPlus, Globe, Star
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const CUSTOMERS = [
  { id: "C-101", name: "Alexander Wright", email: "alex.w@example.com", bookings: 12, status: "Active", lastBooking: "2 days ago", tag: "VIP" },
  { id: "C-102", name: "Sarah Chen", email: "sarahc@tech.io", bookings: 5, status: "New", lastBooking: "Just now", tag: "NEW" },
  { id: "C-103", name: "Marcus Johnson", email: "mj@consulting.biz", bookings: 24, status: "Active", lastBooking: "1 week ago", tag: "ELITE" },
  { id: "C-104", name: "Elena Rodriguez", email: "elena@artstudio.com", bookings: 2, status: "Active", lastBooking: "3 days ago", tag: "STUDENT" },
];

export default function CustomersPage() {
  const [role, setRole] = useState<"owner" | "customer">("owner");

  return (
    <div className="min-h-screen bg-[#FDFDFD] text-black font-sans flex">
      {/* Navigation Rail */}
      <aside className="w-20 border-r border-gray-100 flex flex-col h-screen sticky top-0 bg-white items-center py-8 gap-8">
        <Link href="/dashboard" className="w-10 h-10 rounded-xl bg-black flex items-center justify-center text-white shadow-lg">
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
              <h1 className="text-2xl font-serif">Relation Archive</h1>
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-[0.2em] font-mono">Unified CRM & Directory</p>
            </div>
            
            <div className="flex bg-gray-50 p-1 rounded-xl border border-gray-100">
              <button 
                onClick={() => setRole("owner")}
                className={`px-4 py-1.5 rounded-lg text-xs font-bold uppercase tracking-widest transition-all ${role === "owner" ? "bg-white text-black shadow-sm" : "text-gray-400"}`}
              >
                Clients
              </button>
              <button 
                onClick={() => setRole("customer")}
                className={`px-4 py-1.5 rounded-lg text-xs font-bold uppercase tracking-widest transition-all ${role === "customer" ? "bg-white text-black shadow-sm" : "text-gray-400"}`}
              >
                Providers
              </button>
            </div>
          </div>

          <div className="flex items-center gap-4">
             <button className="flex items-center gap-2 px-5 py-2.5 bg-black text-white rounded-xl text-xs font-bold hover:bg-gray-800 transition-all shadow-md">
                <UserPlus className="w-4 h-4" /> {role === 'owner' ? 'Add Client' : 'Find Providers'}
             </button>
          </div>
        </header>

        <div className="p-10 max-w-7xl mx-auto w-full">
          <div className="mb-12 flex justify-between items-end">
            <div>
                <h2 className="text-5xl font-serif tracking-tight mb-2 italic">{role === 'owner' ? 'Client Insights' : 'Trusted Services'}</h2>
                <p className="text-gray-400 font-medium italic">High-density overview of your interaction network.</p>
            </div>
            <div className="flex gap-4">
                <div className="px-6 py-4 rounded-[2.5rem] bg-white border border-gray-100 shadow-sm flex flex-col items-center justify-center min-w-[140px] group hover:bg-black transition-colors duration-500">
                    <span className="text-[9px] font-black uppercase mb-1 tracking-widest text-gray-300 group-hover:text-white/40">Network Health</span>
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
                    <th className="px-10 py-5">{role === 'owner' ? 'CLIENT' : 'SERVICE PROVIDER'}</th>
                    <th className="px-10 py-5">INTERACTIONS</th>
                    <th className="px-10 py-5">STATUS</th>
                    <th className="px-10 py-5">LAST ACTIVE</th>
                    <th className="px-10 py-5">ACTION</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {CUSTOMERS.map((item, idx) => (
                    <motion.tr 
                      key={item.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      className="hover:bg-gray-50/50 transition-all group"
                    >
                      <td className="px-10 py-6">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-gray-50 border border-gray-100 flex items-center justify-center font-bold text-gray-400 group-hover:bg-black group-hover:text-white transition-all">
                                {item.name.charAt(0)}
                            </div>
                            <div>
                                <div className="font-bold text-black">{item.name}</div>
                                <div className="text-[10px] text-gray-400 font-medium font-mono">{item.email}</div>
                            </div>
                        </div>
                      </td>
                      <td className="px-10 py-6">
                        <div className="text-sm font-bold font-mono italic">{item.bookings} Sessions</div>
                      </td>
                      <td className="px-10 py-6">
                        <span className={`text-[9px] font-black uppercase tracking-widest px-3 py-1.5 rounded-lg shadow-sm border ${
                            item.tag === 'VIP' || item.tag === 'ELITE' ? 'bg-black text-white border-black' : 'bg-white text-gray-400 border-gray-100'
                        }`}>
                            {item.tag}
                        </span>
                      </td>
                      <td className="px-10 py-6">
                        <div className="text-xs font-medium text-gray-500 italic">{item.lastBooking}</div>
                      </td>
                      <td className="px-10 py-6">
                        <button className="p-3 rounded-xl hover:bg-gray-100 text-gray-300 hover:text-black transition-all">
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
            <ActionCard icon={<Mail />} title="Blast Broadcast" desc="Notify all contacts about schedule updates." btn="Draft" />
            <ActionCard icon={<Globe />} title="Export Registry" desc="Download your verified client network logs." btn="Download" outline />
          </div>
        </div>
      </main>
    </div>
  );
}

function ActionCard({ icon, title, desc, btn, outline }: { icon: any, title: string, desc: string, btn: string, outline?: boolean }) {
  return (
    <div className="bg-white p-8 rounded-[2.5rem] border border-gray-50 shadow-sm flex items-center gap-6 group hover:shadow-lg transition-all">
       <div className="w-16 h-16 rounded-2xl bg-gray-50 flex items-center justify-center text-gray-300 group-hover:bg-black group-hover:text-white transition-colors duration-500">
         {icon}
       </div>
       <div className="flex-1">
         <h4 className="text-lg font-bold mb-1 tracking-tight">{title}</h4>
         <p className="text-xs text-gray-400 font-medium italic">{desc}</p>
       </div>
       <button className={`px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
           outline ? 'border border-gray-100 hover:bg-black hover:text-white' : 'bg-black text-white hover:bg-gray-800'
       }`}>
         {btn}
       </button>
    </div>
  );
}
