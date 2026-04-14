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
    <div className="min-h-screen bg-slate-950 text-slate-50 flex">
      <aside className="w-64 glass border-r border-white/5 flex flex-col h-screen sticky top-0 hidden lg:flex">
        <div className="h-16 flex items-center px-6 border-b border-white/5">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center">
              <ShieldCheck className="w-4 h-4 text-white" />
            </div>
            <span className="font-semibold tracking-tight">Audit Archive</span>
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
        <header className="h-16 glass border-b border-white/5 flex items-center justify-between px-8 sticky top-0 z-10">
          <div className="flex items-center gap-2">
             <h1 className="text-xl font-bold">Booking Audit Trail</h1>
             <span className="text-[10px] text-slate-500 bg-slate-900 px-2 py-0.5 rounded border border-white/5 font-mono uppercase tracking-tighter">IMMUTABLE_LOG</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 text-[10px] font-bold text-slate-500 uppercase">
               Background Tasks: <span className="text-emerald-500 flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> POLL_V3</span>
            </div>
          </div>
        </header>

        <div className="p-8">
          <div className="mb-8 flex justify-between items-start">
            <div>
              <h2 className="text-3xl font-bold mb-1">Finalized Transactions</h2>
              <p className="text-slate-400">Archived records with asynchronous synchronization status verified.</p>
            </div>
            <div className="flex gap-2">
               <div className="p-3 rounded-2xl bg-slate-900 border border-white/5 flex flex-col items-center justify-center min-w-[100px]">
                  <span className="text-[9px] text-slate-500 font-bold uppercase mb-1">Sync Health</span>
                  <span className="text-emerald-400 font-mono text-xs">99.8%</span>
               </div>
               <div className="p-3 rounded-2xl bg-slate-900 border border-white/5 flex flex-col items-center justify-center min-w-[100px]">
                  <span className="text-[9px] text-slate-500 font-bold uppercase mb-1">Async Queue</span>
                  <span className="text-blue-400 font-mono text-xs">0 items</span>
               </div>
            </div>
          </div>

          <div className="glass-card rounded-3xl border border-white/5 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-white/5 bg-white/5 text-[10px] font-bold uppercase tracking-widest text-slate-500">
                    <th className="px-6 py-4">Transaction ID</th>
                    <th className="px-6 py-4">Customer Relation</th>
                    <th className="px-6 py-4">Partition Status</th>
                    <th className="px-6 py-4">G-Cal Sync</th>
                    <th className="px-6 py-4">Email Ack</th>
                    <th className="px-6 py-4"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {CUSTOMERS.map((customer, idx) => (
                    <motion.tr 
                      key={customer.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      className="hover:bg-white/[0.02] transition-colors group text-sm"
                    >
                      <td className="px-6 py-5 font-mono text-xs text-blue-400">
                        TXN-{customer.id.split('-')[1]}
                      </td>
                      <td className="px-6 py-5">
                        <div>
                          <div className="font-semibold text-slate-100">{customer.name}</div>
                          <div className="text-xs text-slate-500">{customer.email}</div>
                        </div>
                      </td>
                      <td className="px-6 py-5">
                        <span className={`text-[9px] font-bold uppercase px-2 py-0.5 rounded ${
                          customer.status === 'VIP' ? 'bg-amber-500/10 text-amber-500' : 'bg-slate-800 text-slate-400'
                        }`}>
                          {customer.status}
                        </span>
                      </td>
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-1.5 text-[10px] font-bold text-emerald-500 bg-emerald-500/5 px-2 py-1 rounded-full border border-emerald-500/20 w-fit">
                           <CheckCircle2 className="w-3 h-3" /> SUCCESS
                        </div>
                      </td>
                      <td className="px-6 py-5">
                         <div className="flex items-center gap-1.5 text-[10px] font-bold text-blue-400 bg-blue-500/5 px-2 py-1 rounded-full border border-blue-500/20 w-fit">
                           <Send className="w-3 h-3" /> DISPATCHED
                        </div>
                      </td>
                      <td className="px-6 py-5 text-right flex justify-end">
                        <div className="p-2 rounded-lg bg-slate-900 border border-white/5 flex items-center gap-2 group-hover:border-blue-500/30 transition-all">
                           <FileText className="w-4 h-4 text-slate-500 group-hover:text-blue-400" />
                           <span className="text-[10px] font-bold text-slate-500 group-hover:text-slate-300">DETAILS</span>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="mt-6 flex flex-col md:flex-row gap-6">
            <div className="flex-1 glass-card p-6 rounded-3xl border border-white/5 flex items-center gap-4">
              <div className="p-4 rounded-2xl bg-slate-900 border border-white/10">
                <Mail className="w-6 h-6 text-blue-400" />
              </div>
              <div>
                <h4 className="font-bold">Mass Outreach</h4>
                <p className="text-sm text-slate-500">Send an update to all your {CUSTOMERS.length} active clients.</p>
              </div>
              <button className="ml-auto px-4 py-2 border border-white/10 rounded-xl text-sm hover:bg-white/5 transition-all">Draft</button>
            </div>
            <div className="flex-1 glass-card p-6 rounded-3xl border border-white/5 flex items-center gap-4">
              <div className="p-4 rounded-2xl bg-slate-900 border border-white/10">
                <Phone className="w-6 h-6 text-emerald-400" />
              </div>
              <div>
                <h4 className="font-bold">Sync Contacts</h4>
                <p className="text-sm text-slate-500">Import your external customer database entries.</p>
              </div>
              <button className="ml-auto px-4 py-2 border border-white/10 rounded-xl text-sm hover:bg-white/5 transition-all">Sync</button>
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
      className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
        active 
          ? 'bg-blue-600/10 text-blue-400 border border-blue-500/20 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1)]' 
          : 'text-slate-400 hover:bg-white/5 hover:text-slate-200'
      }`}
    >
      {label}
    </Link>
  );
}
