"use client";

import { motion } from "framer-motion";
import { Users, Search, Filter, MoreVertical, Calendar, Mail, Phone, MessageSquare, ShieldCheck, CheckCircle2, Send, FileText } from "lucide-react";
import Link from "next/link";

const CUSTOMERS = [
  { id: "C-101", name: "Alexander Wright", email: "alex.w@example.com", bookings: 12, status: "Active", lastBooking: "2 days ago", aiNote: "Frequent strategic consultant. Prefers morning slots." },
  { id: "C-102", name: "Sarah Chen", email: "sarahc@tech.io", bookings: 5, status: "New", lastBooking: "Just now", aiNote: "First time user. Inquired about SEO and Tax planning." },
  { id: "C-103", name: "Marcus Johnson", email: "mj@consulting.biz", bookings: 24, status: "VIP", lastBooking: "1 week ago", aiNote: "High-value client. Never misses an appointment." },
  { id: "C-104", name: "Elena Rodriguez", email: "elena@artstudio.com", bookings: 2, status: "Active", lastBooking: "3 days ago", aiNote: "Interested in recurring monthly tax consultations." },
];

export default function CustomersPage() {
  return (
    <div className="min-h-screen bg-background text-foreground flex">
      <aside className="w-64 glass border-r border-border/10 flex flex-col h-screen sticky top-0 hidden lg:flex">
        <div className="h-16 flex items-center px-6 border-b border-border/10">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center">
              <ShieldCheck className="w-4 h-4 text-black" />
            </div>
            <span className="font-bold tracking-tight">Audit Archive</span>
          </div>
        </div>
        <div className="flex-1 py-6 px-3 space-y-1">
          <NavItem href="/dashboard" label="Overview" />
          <NavItem href="/dashboard/services" label="Services" />
          <NavItem href="/dashboard/bookings" label="Booking & Slots" />
          <NavItem href="/dashboard/customers" label="Customers" active />
          <NavItem href="/dashboard/ai" label="AI Insights" />
          <NavItem href="/dashboard/settings" label="Settings" />
        </div>
      </aside>

      <main className="flex-1 flex flex-col">
        <header className="h-16 glass border-b border-border/10 flex items-center justify-between px-8 sticky top-0 z-10">
          <div className="flex items-center gap-3">
             <h1 className="text-xl font-black">Audit Trail</h1>
             <span className="text-[10px] text-white/40 bg-white/5 px-2 py-0.5 rounded border border-white/5 font-mono uppercase tracking-widest font-black">Immutable</span>
          </div>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 text-[10px] font-black text-white/30 uppercase tracking-[0.2em]">
               Async Engine: <span className="text-white flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" /> POLL_V3</span>
            </div>
          </div>
        </header>

        <div className="p-10">
          <div className="mb-12 flex justify-between items-start">
            <div>
              <h2 className="text-4xl font-black mb-2 tracking-tighter">Finalized Transactions</h2>
              <p className="text-foreground/30 font-light">Archived records with asynchronous synchronization status verified.</p>
            </div>
            <div className="flex gap-4">
               <div className="p-5 rounded-[1.5rem] bg-white text-black border border-white flex flex-col items-center justify-center min-w-[120px]">
                  <span className="text-[9px] font-black uppercase mb-1 opacity-50">Sync Health</span>
                  <span className="font-mono text-xs font-black tracking-widest">99.8%</span>
               </div>
               <div className="p-5 rounded-[1.5rem] bg-white/5 border border-white/10 flex flex-col items-center justify-center min-w-[120px]">
                  <span className="text-[9px] text-white/20 font-black uppercase mb-1 tracking-widest">Async Queue</span>
                  <span className="font-mono text-xs text-white font-black tracking-widest">0 items</span>
               </div>
            </div>
          </div>

          <div className="glass-card rounded-[2.5rem] border border-white/5 overflow-hidden shadow-2xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-white/5 bg-white/5 text-[9px] font-black uppercase tracking-[0.4em] text-white/20 font-mono">
                    <th className="px-8 py-5">Transaction ID</th>
                    <th className="px-8 py-5">Relation</th>
                    <th className="px-8 py-5">Status</th>
                    <th className="px-8 py-5">G-Cal Sync</th>
                    <th className="px-8 py-5">Email Ack</th>
                    <th className="px-8 py-5"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 font-mono text-white/50">
                  {CUSTOMERS.map((customer, idx) => (
                    <motion.tr 
                      key={customer.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      className="hover:bg-white/[0.02] transition-all group text-xs"
                    >
                      <td className="px-8 py-6 text-white font-black italic">
                        TXN-{customer.id.split('-')[1]}
                      </td>
                      <td className="px-8 py-6">
                        <div>
                          <div className="font-bold text-white mb-0.5">{customer.name}</div>
                          <div className="text-[10px] text-white/20">{customer.email}</div>
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <span className={`text-[9px] font-black uppercase px-2 py-1 rounded-lg ${
                          customer.status === 'VIP' ? 'bg-white text-black' : 'bg-white/5 text-white/30'
                        }`}>
                          {customer.status}
                        </span>
                      </td>
                      <td className="px-8 py-6">
                        <div className="flex items-center gap-1.5 text-[10px] font-black text-white bg-white/5 px-2.5 py-1.5 rounded-full border border-white/10 w-fit">
                           <CheckCircle2 className="w-3 h-3" /> SUCCESS
                        </div>
                      </td>
                      <td className="px-8 py-6">
                         <div className="flex items-center gap-1.5 text-[10px] font-black text-white/30 bg-white/5 px-2.5 py-1.5 rounded-full border border-white/5 w-fit">
                           <Send className="w-3 h-3" /> DISPATCHED
                        </div>
                      </td>
                      <td className="px-8 py-6 text-right flex justify-end">
                        <div className="px-4 py-2 rounded-xl bg-white/[0.02] border border-white/5 flex items-center gap-3 group-hover:bg-white group-hover:text-black transition-all cursor-pointer">
                           <FileText className="w-4 h-4 opacity-50" />
                           <span className="text-[9px] font-black uppercase tracking-widest">Audit_Log</span>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="mt-10 flex flex-col md:flex-row gap-8">
            <div className="flex-1 glass-card p-8 rounded-[2rem] border border-white/5 flex items-center gap-6">
              <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
                <Mail className="w-6 h-6 text-white/20" />
              </div>
              <div>
                <h4 className="font-black text-lg">Mass Dispatch</h4>
                <p className="text-sm text-foreground/30 font-light">Send updates to your {CUSTOMERS.length} active clients.</p>
              </div>
              <button className="ml-auto px-6 py-2.5 bg-white text-black rounded-full text-[10px] font-black uppercase tracking-widest hover:opacity-90 transition-all">Draft</button>
            </div>
            <div className="flex-1 glass-card p-8 rounded-[2rem] border border-white/5 flex items-center gap-6">
               <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
                <Phone className="w-6 h-6 text-white/20" />
              </div>
              <div>
                <h4 className="font-black text-lg">Sync Archive</h4>
                <p className="text-sm text-foreground/30 font-light">Import external customer database entries.</p>
              </div>
              <button className="ml-auto px-6 py-2.5 border border-white/10 rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-white/5 transition-all">Import</button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

function NavItem({ href, label, active }: { href: string, label: string, active?: boolean }) {
  return (
    <Link 
      href={href}
      className={`flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-bold tracking-tight transition-all ${
        active 
          ? 'bg-white text-black shadow-lg' 
          : 'text-white/20 hover:bg-white/5 hover:text-white'
      }`}
    >
      {label}
    </Link>
  );
}
