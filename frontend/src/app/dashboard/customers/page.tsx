"use client";

import { motion } from "framer-motion";
import { Users, Search, Filter, MoreVertical, Calendar, Mail, Phone, MessageSquare } from "lucide-react";
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
          <Link href="/dashboard" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center">
              <Users className="w-4 h-4 text-white" />
            </div>
            <span className="font-semibold tracking-tight">FlexSlot CRM</span>
          </Link>
        </div>
        <div className="flex-1 py-6 px-3 space-y-1">
          <NavItem href="/dashboard" label="Overview" />
          <NavItem href="/dashboard/services" label="Services" />
          <NavItem href="/dashboard/customers" label="Customers" active />
          <NavItem href="/dashboard/ai" label="AI Insights" />
          <NavItem href="/dashboard/settings" label="Settings" />
        </div>
      </aside>

      <main className="flex-1 flex flex-col">
        <header className="h-16 glass border-b border-white/5 flex items-center justify-between px-8 sticky top-0 z-10">
          <div className="relative w-80">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
            <input 
              type="text" 
              placeholder="Search by name, email or ID..." 
              className="w-full bg-slate-900 border border-white/10 rounded-full pl-10 pr-4 py-1.5 text-sm focus:outline-none focus:border-blue-500/50 transition-all"
            />
          </div>
          <div className="flex items-center gap-3">
            <button className="px-4 py-2 rounded-xl glass border border-white/10 text-sm font-medium hover:bg-white/5 transition-all flex items-center gap-2">
              <Filter className="w-4 h-4" /> Filter
            </button>
            <button className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-sm font-semibold transition-all shadow-lg shadow-blue-500/20">
              Export CSV
            </button>
          </div>
        </header>

        <div className="p-8">
          <div className="mb-8">
            <h2 className="text-3xl font-bold mb-1">Customer Relationships</h2>
            <p className="text-slate-400">Manage your growing client base and view AI-powered engagement metrics.</p>
          </div>

          <div className="glass-card rounded-3xl border border-white/5 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-white/5 bg-white/5">
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">Customer</th>
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">Bookings</th>
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">Status</th>
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">Last Active</th>
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">AI Insight</th>
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {CUSTOMERS.map((customer, idx) => (
                    <motion.tr 
                      key={customer.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      className="hover:bg-white/[0.02] transition-colors group"
                    >
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-slate-800 to-slate-900 border border-white/10 flex items-center justify-center font-bold text-slate-300">
                            {customer.name.charAt(0)}
                          </div>
                          <div>
                            <div className="font-semibold text-slate-100">{customer.name}</div>
                            <div className="text-xs text-slate-500">{customer.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-slate-500" />
                          <span className="font-medium">{customer.bookings}</span>
                        </div>
                      </td>
                      <td className="px-6 py-5">
                        <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-md ${
                          customer.status === 'VIP' ? 'bg-amber-500/10 text-amber-500 border border-amber-500/20' :
                          customer.status === 'New' ? 'bg-blue-500/10 text-blue-500 border border-blue-500/20' :
                          'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20'
                        }`}>
                          {customer.status}
                        </span>
                      </td>
                      <td className="px-6 py-5 text-sm text-slate-400">{customer.lastBooking}</td>
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-2 text-xs text-indigo-400 bg-indigo-500/5 p-2 rounded-lg border border-indigo-500/10 max-w-xs group-hover:bg-indigo-500/10 transition-all">
                          <MessageSquare className="w-3 h-3 flex-shrink-0" />
                          <span className="italic line-clamp-1">{customer.aiNote}</span>
                        </div>
                      </td>
                      <td className="px-6 py-5 text-right">
                        <button className="p-2 rounded-lg hover:bg-white/5 text-slate-500 hover:text-white transition-colors">
                          <MoreVertical className="w-5 h-5" />
                        </button>
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
