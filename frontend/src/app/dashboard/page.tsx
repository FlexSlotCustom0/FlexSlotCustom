"use client";

import { motion, AnimatePresence } from "framer-motion";
import { 
  BarChart3, Users, Calendar, Settings, Bot, Search, Bell, 
  TrendingUp, Layers, ShieldCheck, CheckCircle2, FileText, 
  Send, Layout, Store, User, BookOpen, Clock, ChevronRight, 
  Plus, ExternalLink, Stethoscope, Briefcase, Activity, Heart, ShieldPlus, ShoppingBag,
  Zap, Sparkles, PawPrint, Star
} from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function Dashboard() {
  const [role, setRole] = useState<"owner" | "customer">(() => {
    if (typeof window !== "undefined") {
      const savedRole = localStorage.getItem("flexslot_role");
      if (savedRole === "owner" || savedRole === "customer") return savedRole;
    }
    return "owner";
  });
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="min-h-screen bg-white text-black flex font-sans selection:bg-blue-600 selection:text-white">
      {/* Sidebar */}
      <aside className="w-72 border-r border-gray-100 flex flex-col h-screen sticky top-0 bg-white z-20">
        <div className="h-20 flex items-center px-8 border-b border-gray-50">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center">
              <Stethoscope className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold tracking-tight text-lg">Kindred Calendar</span>
          </Link>
        </div>

        {/* Role Selector */}
        <div className="p-6">
          <div className="p-1.5 bg-gray-50 rounded-2xl flex relative overflow-hidden">
            <motion.div 
              className="absolute h-[calc(100%-12px)] top-1.5 bottom-1.5 bg-white rounded-xl shadow-sm border border-gray-100 z-0"
              initial={false}
              animate={{ 
                x: role === "owner" ? 0 : "100%",
                width: "50%"
              }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            />
            <button 
              onClick={() => { setRole("owner"); localStorage.setItem("flexslot_role", "owner"); }}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-xs font-bold uppercase tracking-widest relative z-10 transition-colors ${role === "owner" ? "text-blue-600" : "text-gray-400"}`}
            >
              <ShieldPlus className="w-3.5 h-3.5" /> Provider
            </button>
            <button 
              onClick={() => { setRole("customer"); localStorage.setItem("flexslot_role", "customer"); }}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-xs font-bold uppercase tracking-widest relative z-10 transition-colors ${role === "customer" ? "text-blue-600" : "text-gray-400"}`}
            >
              <User className="w-3.5 h-3.5" /> Patient
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-4 space-y-1">
          <div className="px-4 py-2 text-[10px] font-black uppercase tracking-[0.2em] text-gray-300">Management</div>
          {role === "owner" ? (
            <>
              <SideNavItem icon={<BarChart3 />} label="Clinic Analytics" active={activeTab === "overview"} onClick={() => setActiveTab("overview")} />
              <SideNavItem icon={<Layout />} label="My Templates" active={activeTab === "templates"} onClick={() => setActiveTab("templates")} />
              <SideNavItem icon={<Activity />} label="Treatments" active={activeTab === "services"} onClick={() => setActiveTab("services")} />
              <SideNavItem icon={<Calendar />} label="Appointments" active={activeTab === "bookings"} onClick={() => setActiveTab("bookings")} />
              <SideNavItem icon={<Heart />} label="Patient Records" active={activeTab === "customers"} onClick={() => setActiveTab("customers")} />
            </>
          ) : (
            <>
              <SideNavItem icon={<Search />} label="Find Clinics" active={activeTab === "overview"} onClick={() => setActiveTab("overview")} />
              <SideNavItem icon={<Calendar />} label="My Visits" active={activeTab === "bookings"} onClick={() => setActiveTab("bookings")} />
              <SideNavItem icon={<Heart />} label="Medical History" active={activeTab === "history"} onClick={() => setActiveTab("history")} />
            </>
          )}

          <div className="px-4 py-4 text-[10px] font-black uppercase tracking-[0.2em] text-gray-300">System</div>
          <SideNavItem icon={<Bot />} label="Medical AI" active={activeTab === "ai"} onClick={() => setActiveTab("ai")} />
          <SideNavItem icon={<Settings />} label="Pharmacy & Inv" active={activeTab === "settings"} onClick={() => setActiveTab("settings")} />
        </div>

        <div className="p-6 border-t border-gray-50">
          <div className="p-4 rounded-2xl bg-gray-50 border border-gray-100 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-sm">
              {role === "owner" ? "EP" : "AM"}
            </div>
            <div className="flex-1 overflow-hidden">
              <div className="text-sm font-bold truncate">{role === "owner" ? "Elite Pediatrics" : "Alex Miller"}</div>
              <div className="text-[10px] text-gray-400 truncate uppercase tracking-widest font-bold font-mono">
                {role === "owner" ? "HOSPITAL ACCOUNT" : "PATIENT ID: 882"}
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col bg-[#FDFDFD]">
        {/* Header */}
        <header className="h-20 bg-white/80 backdrop-blur-md border-b border-gray-100 flex items-center justify-between px-10 sticky top-0 z-10">
          <div className="flex items-center gap-4">
            <h2 className="text-xl font-serif text-black">{role === "owner" ? "Medical Control Center" : "Healthcare Discovery"}</h2>
            <div className="h-4 w-[1px] bg-gray-200" />
            <div className="text-xs font-medium text-gray-400 uppercase tracking-widest flex items-center gap-2">
              Status: <span className="flex items-center gap-1.5 text-black"><span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" /> Dedicated System</span>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="hidden md:flex items-center gap-2 bg-gray-50 border border-gray-100 rounded-full px-4 py-2">
              <Search className="w-4 h-4 text-gray-400" />
              <input type="text" placeholder="Search patients..." className="bg-transparent border-none text-xs outline-none w-40 font-medium" />
            </div>
            <button className="relative p-2 rounded-xl hover:bg-gray-50 transition-colors">
              <Bell className="w-5 h-5 text-gray-400" />
              <span className="absolute top-2 right-2.5 w-2 h-2 bg-blue-600 rounded-full ring-2 ring-white" />
            </button>
            <button className="bg-blue-600 text-white px-5 py-2 rounded-xl text-xs font-bold hover:bg-blue-700 transition-all shadow-md">
              {role === "owner" ? "Add Patient" : "Book Visit"}
            </button>
          </div>
        </header>

        {/* Dashboard Dynamic View */}
        <AnimatePresence mode="wait">
          <motion.div 
            key={role + activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="p-10 flex-1"
          >
            {role === "owner" ? (
              <OwnerDashboardView tab={activeTab} />
            ) : (
              <CustomerDashboardView tab={activeTab} />
            )}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}

function SideNavItem({ icon, label, active, onClick }: { icon: React.ReactNode, label: string, active?: boolean, onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl text-sm font-bold tracking-tight transition-all relative group ${active
          ? 'bg-black text-white shadow-lg shadow-black/10 scale-[1.02]'
          : 'text-gray-400 hover:bg-gray-50 hover:text-black'
        }`}
    >
      <span className={`${active ? 'text-white' : 'text-gray-400 group-hover:text-black'}`}>
        {icon}
      </span>
      {label}
      {active && <motion.div layoutId="nav-pill" className="absolute right-3 w-1.5 h-1.5 bg-white rounded-full" />}
    </button>
  );
}

// --- OWNER VIEWS ---

function OwnerDashboardView({ tab }: { tab: string }) {
  if (tab === "templates") return <TemplateSelectionView />;
  if (tab === "services") return <TreatmentsView />;
  if (tab === "bookings") return <AppointmentsView role="owner" />;
  if (tab === "customers") return <PatientRecordsView />;
  if (tab === "ai") return <MedicalAIView />;
  if (tab === "settings") return <PharmacyInventoryView />;
  
  return (
    <div className="space-y-10">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-serif mb-2 tracking-tight">Clinic Overview</h1>
          <p className="text-gray-400 font-medium italic">Welcome back, your clinic is performing <span className="text-blue-600 font-bold">+14% better</span> this week.</p>
        </div>
        <div className="flex gap-2">
          <button className="p-3 rounded-2xl bg-white border border-gray-100 shadow-sm hover:bg-gray-50 transition-colors">
            <Calendar className="w-5 h-5" />
          </button>
          <button className="p-3 rounded-2xl bg-white border border-gray-100 shadow-sm hover:bg-gray-50 transition-colors">
            <Plus className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Grid Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <MetricCard label="Monthly Revenue" value="$12,840" trend="+22%" icon={<TrendingUp />} />
        <MetricCard label="Active Consultations" value="48" trend="+5" icon={<Calendar />} />
        <MetricCard label="New Patients" value="12" trend="+14%" icon={<Users />} />
        <MetricCard label="Patient Rating" value="4.9" trend="High" icon={<ShieldCheck />} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-6 gap-8">
        {/* Performance Chart Placeholder */}
        <div className="lg:col-span-4 bg-white rounded-[2.5rem] p-10 border border-gray-50 shadow-sm overflow-hidden relative group">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h3 className="text-xl font-bold mb-1">Clinic Performance</h3>
              <p className="text-xs text-gray-400 font-bold uppercase tracking-widest font-mono">METRIC: APPOINTMENTS/DAY</p>
            </div>
            <div className="flex gap-2">
              {['W', 'M', 'Y'].map(t => (
                <button key={t} className={`w-8 h-8 rounded-lg flex items-center justify-center text-[10px] font-bold border transition-all ${t === 'M' ? 'bg-blue-600 text-white border-blue-600' : 'bg-transparent text-gray-400 border-gray-100 font-medium'}`}>{t}</button>
              ))}
            </div>
          </div>
          <div className="h-64 flex items-end gap-3 px-2">
            {[40, 65, 30, 85, 50, 75, 95, 60, 45, 90, 80, 55].map((h, i) => (
              <div key={i} className="flex-1 bg-gray-50 rounded-full relative group/bar overflow-hidden">
                <motion.div
                  className="absolute bottom-0 w-full bg-blue-600 rounded-full"
                  initial={{ height: 0 }}
                  animate={{ height: `${h}%` }}
                  transition={{ duration: 1.5, delay: i * 0.05, ease: "circOut" }}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Active Services */}
        <div className="lg:col-span-2 space-y-4">
          <h3 className="text-lg font-bold px-2">Top Treatments</h3>
          <ServiceCompactItem icon={<ShieldPlus />} name="General Checkup" bookings={142} color="bg-blue-50 text-blue-600" />
          <ServiceCompactItem icon={<Activity />} name="Diagnostic Scan" bookings={98} color="bg-cyan-50 text-cyan-600" />
          <ServiceCompactItem icon={<Stethoscope />} name="Specialist Consult" bookings={65} color="bg-indigo-50 text-indigo-600" />
          <button className="w-full py-4 rounded-3xl border border-dashed border-gray-200 text-gray-400 text-sm font-bold hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
            <Plus className="w-4 h-4" /> Add Treatment
          </button>
        </div>
      </div>
    </div>
  );
}

function TemplateSelectionView() {
  const [niche, setNiche] = useState<string | null>(() => {
    if (typeof window !== "undefined") return localStorage.getItem("flexslot_clinic_niche");
    return null;
  });

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-serif mb-2">Clinic Templates</h1>
        <p className="text-gray-400 font-medium italic">Select your professional medical or veterinary digital presence.</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {(!niche || niche === 'medical') && (
          <>
            <TemplateCard icon={<Stethoscope />} title="Clinic Clean" category="Modern Medical" id="clinic-clean" manage={true} />
            <TemplateCard icon={<Zap className="text-indigo-600" />} title="Pulse Modern" category="Imaging & Diagnostics" id="pulse-modern" manage={true} />
            <TemplateCard icon={<Sparkles className="text-teal-600" />} title="Dental Bright" category="Cosmetic Dental" id="dental-bright" manage={true} />
          </>
        )}
        {(!niche || niche === 'veterinary') && (
          <>
            <TemplateCard icon={<Heart />} title="Vet Warm" category="Neighborhood Vet" id="vet-warm" manage={true} />
            <TemplateCard icon={<Star className="text-amber-500" />} title="Paw Luxe" category="Luxury Pet Care" id="paws-premium" manage={true} />
            <TemplateCard icon={<PawPrint className="text-emerald-600" />} title="Wild Frontier" category="Wildlife & Exotics" id="wild-med" manage={true} />
          </>
        )}
      </div>
    </div>
  );
}
// --- CUSTOMER VIEWS ---

function CustomerDashboardView({ tab }: { tab: string }) {
  const [publishedClinics, setPublishedClinics] = useState<Record<string, unknown>[]>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("flexslot_public_clinics");
      if (saved) return JSON.parse(saved);
    }
    return [];
  });

  if (tab === "bookings") return <AppointmentsView role="customer" />;
  if (tab === "history") return <PatientRecordsView isPatient />;
  if (tab === "ai") return <MedicalAIView />;
  if (tab === "settings") return <PharmacyInventoryView />;

  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-4xl font-serif mb-2 tracking-tight">Explore Services</h1>
        <p className="text-gray-400 font-medium italic">Top-rated professionals available for booking today.</p>
      </div>

      {/* Discovery Marketplace */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {publishedClinics.length > 0 && publishedClinics.map((clinic, i) => (
          <ServiceCard 
            key={`published-${i}`}
            image={clinic.id === 'clinic-clean' ? 'bg-blue-100' : 'bg-orange-100'} 
            title={clinic.name} 
            category={clinic.category} 
            rating={clinic.rating} 
            price="$60+" 
            tag="VIEW" 
            active
            id={clinic.id}
          />
        ))}

        {publishedClinics.length === 0 && (
          <ServiceCard 
            image="bg-blue-100" 
            title="Dr. Emily's Clinic" 
            category="Healthcare" 
            rating={5.0} 
            price="$120+" 
            tag="VIEW" 
            active
            id="clinic-clean"
          />
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pt-10 border-t border-gray-100">
        <div className="lg:col-span-2 space-y-6">
          <h3 className="text-xl font-bold">Upcoming Appointments</h3>
          <AppointmentRow service="Dr. Emily's Clinic" date="Oct 24, 2026" time="10:00 AM" status="Confirmed" />
        </div>
        
        <div className="bg-black text-white rounded-[2.5rem] p-8 flex flex-col justify-between shadow-xl">
          <div>
            <Bot className="w-10 h-10 mb-6 text-indigo-400" />
            <h3 className="text-2xl font-serif mb-4">Need Help Booking?</h3>
              &quot;Hi Alex! You have a Dentist appointment coming up. Should I find a parking spot nearby for you?&quot;
          </div>
          <button className="w-full py-4 rounded-3xl bg-white text-black font-bold text-sm tracking-tight hover:bg-gray-100 transition-colors">
            Ask AI Assistant
          </button>
        </div>
      </div>
    </div>
  );
}

// --- COMPONENTS ---

function MetricCard({ label, value, trend, icon }: { label: string, value: string, trend: string, icon: React.ReactNode }) {
  return (
    <div className="bg-white p-8 rounded-[2.5rem] border border-gray-50 shadow-sm group hover:scale-[1.02] transition-transform duration-300">
      <div className="flex justify-between items-start mb-6">
        <div className="p-3 bg-gray-50 rounded-2xl group-hover:bg-black group-hover:text-white transition-colors duration-300">
          {icon}
        </div>
        <span className="text-[10px] font-black font-mono px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-600">{trend}</span>
      </div>
      <div className="text-3xl font-black mb-1 font-mono tracking-tighter">{value}</div>
      <div className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">{label}</div>
    </div>
  );
}

function ServiceCompactItem({ icon, name, bookings, color }: { icon: React.ReactNode, name: string, bookings: number, color: string }) {
  return (
    <div className="flex items-center gap-4 p-4 bg-white rounded-3xl border border-gray-50 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${color}`}>
        {icon}
      </div>
      <div className="flex-1">
        <div className="text-sm font-bold">{name}</div>
        <div className="text-[10px] text-gray-400 font-bold font-mono">{bookings} BOOKINGS</div>
      </div>
      <ChevronRight className="w-4 h-4 text-gray-200" />
    </div>
  );
}

function TemplateCard({ icon, title, category, id, manage }: { icon: React.ReactNode, title: string, category: string, id: string, manage?: boolean }) {
  const href = `/templates/${id}${manage ? "?manage=true" : ""}`;

  return (
    <Link 
      href={href}
      className="group bg-white rounded-[2.5rem] p-8 border border-gray-50 shadow-sm hover:shadow-xl hover:border-blue-100 transition-all duration-500 cursor-pointer overflow-hidden relative block"
    >
      <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-blue-600 group-hover:text-white transition-colors">
        {icon}
      </div>
      <h3 className="text-lg font-bold mb-1 leading-tight">{title}</h3>
      <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">{category}</p>
      
      <div className="mt-8 pt-6 border-t border-gray-50 flex items-center justify-between">
        <span className="text-[10px] font-black uppercase tracking-widest text-black">
          {manage ? "Manage Template" : "Preview Site"}
        </span>
        <ExternalLink className="w-4 h-4 text-gray-300 group-hover:text-blue-600 transition-colors" />
      </div>

      <div className="absolute top-0 right-0 w-24 h-24 bg-gray-50 rounded-full translate-x-12 -translate-y-12 group-hover:bg-blue-600/5 transition-colors" />
    </Link>
  );
}

function ServiceCard({ image, title, category, rating, price, tag, active, id }: { image: string, title: string, category: string, rating: number, price: string, tag: string, active?: boolean, id?: string }) {
  const cardContent = (
    <>
      <div className={`w-full aspect-video ${image} rounded-3xl mb-6 relative overflow-hidden`}>
        {active && (
          <div className="absolute top-4 left-4 bg-black text-white text-[8px] font-black uppercase tracking-widest px-2 py-1 rounded">ACTIVE NOW</div>
        )}
      </div>
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-bold leading-tight mb-1">{title}</h3>
          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">{category}</p>
        </div>
        <div className="flex items-center gap-1">
          <CheckCircle2 className="w-3.5 h-3.5 text-black" />
          <span className="text-xs font-bold">{rating}</span>
        </div>
      </div>
      <div className="flex items-center justify-between pt-6 border-t border-gray-50">
        <span className="text-sm font-black font-mono italic">{price}</span>
        <div className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-[0.1em] transition-all ${active ? 'bg-black text-white' : 'bg-gray-100 text-gray-400 hover:bg-black hover:text-white'}`}>
          {tag}
        </div>
      </div>
    </>
  );

  if (id) {
    return (
      <Link href={`/templates/${id}`} className="bg-white rounded-[2.5rem] p-6 border border-gray-50 shadow-sm hover:shadow-xl transition-all duration-300 group overflow-hidden block">
        {cardContent}
      </Link>
    );
  }

  return (
    <div className="bg-white rounded-[2.5rem] p-6 border border-gray-50 shadow-sm hover:shadow-xl transition-all duration-300 group overflow-hidden">
      {cardContent}
    </div>
  );
}

function AppointmentRow({ service, date, time, status }: { service: string, date: string, time: string, status: string }) {
  return (
    <div className="flex items-center gap-4 p-5 bg-white rounded-3xl border border-gray-50 shadow-sm hover:shadow-md transition-shadow">
      <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center">
        <Clock className="w-5 h-5 text-gray-400" />
      </div>
      <div className="flex-1">
        <div className="text-sm font-bold">{service}</div>
        <div className="text-xs text-gray-400 font-medium">{date} · {time}</div>
      </div>
      <div className="flex items-center gap-2">
        <span className={`text-[9px] font-black uppercase tracking-widest px-3 py-1.5 rounded-lg ${status === 'Confirmed' ? 'bg-emerald-50 text-emerald-600' : 'bg-orange-50 text-orange-600'}`}>
          {status}
        </span>
        <button className="p-2.5 rounded-xl hover:bg-gray-50 transition-colors">
          <FileText className="w-4 h-4 text-gray-400" />
        </button>
      </div>
    </div>
  );
}
// --- CLINICAL MODULE COMPONENTS ---

function TreatmentsView() {
  const categories = [
    { name: "General Checkups", count: 24, status: "Active" },
    { name: "Specialist Consultation", count: 18, status: "Active" },
    { name: "Laboratory Tests", count: 32, status: "Maintenance" },
    { name: "Vaccination", count: 12, status: "Active" },
  ];

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-serif tracking-tight">Treatments & Services</h2>
          <p className="text-gray-400 text-sm font-medium italic">Manage your clinic&apos;s offerings and pricing.</p>
        </div>
        <button className="bg-black text-white px-6 py-3 rounded-2xl text-xs font-bold flex items-center gap-2 shadow-xl hover:bg-gray-800 transition-all">
          <Plus className="w-4 h-4" /> Add Treatment
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {categories.map((cat, i) => (
          <div key={i} className="bg-white p-6 rounded-3xl border border-gray-50 shadow-sm relative overflow-hidden group">
            <div className={`absolute top-0 right-0 w-1 p-8 h-full ${cat.status === 'Active' ? 'bg-emerald-500' : 'bg-orange-400'}`} />
            <h3 className="font-bold mb-1">{cat.name}</h3>
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">{cat.count} ACTIVE SERVICES</p>
            <div className="mt-4 flex items-center justify-between text-[10px] font-black uppercase tracking-widest">
              <span className={cat.status === 'Active' ? 'text-emerald-600' : 'text-orange-500'}>{cat.status}</span>
              <button className="text-gray-300 hover:text-black transition-colors"><Settings className="w-3.5 h-3.5" /></button>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-[2.5rem] border border-gray-50 shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50/50 border-b border-gray-50">
            <tr>
              <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-gray-400">Treatment Name</th>
              <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-gray-400">Category</th>
              <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-gray-400">Base Price</th>
              <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-gray-400">Status</th>
              <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-gray-400 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {[
              { name: "Comprehensive Physical", cat: "General", price: "$85.00", status: "Active" },
              { name: "Cardiac ECG Screening", cat: "Specialist", price: "$120.00", status: "Active" },
              { name: "Dermatology Consultation", cat: "Specialist", price: "$95.00", status: "Inactive" },
              { name: "Paediatric Wellness", cat: "General", price: "$65.00", status: "Active" },
            ].map((row, i) => (
              <tr key={i} className="hover:bg-gray-50/30 transition-colors">
                <td className="px-8 py-6 font-bold text-sm">{row.name}</td>
                <td className="px-8 py-6 text-xs text-gray-400 font-bold uppercase tracking-widest">{row.cat}</td>
                <td className="px-8 py-6 font-mono text-sm font-bold">{row.price}</td>
                <td className="px-8 py-6">
                  <span className={`text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded-lg ${row.status === 'Active' ? 'bg-emerald-50 text-emerald-600' : 'bg-gray-100 text-gray-400'}`}>
                    {row.status}
                  </span>
                </td>
                <td className="px-8 py-6 text-right">
                  <button className="p-2 hover:bg-white rounded-lg transition-all shadow-sm"><ChevronRight className="w-4 h-4 text-gray-400" /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function AppointmentsView({ role }: { role: "owner" | "customer" }) {
  const appointments = [
    { patient: "Alex Miller", treatment: "General Checkup", time: "10:00 AM", date: "Today", status: "Confirmed", type: "In-Person" },
    { patient: "Sarah Jennings", treatment: "Blood Panel", time: "11:30 AM", date: "Today", status: "Pending", type: "Home Visit" },
    { patient: "Michael Chen", treatment: "Vaccination", time: "02:15 PM", date: "Tomorrow", status: "Confirmed", type: "In-Person" },
    { patient: "Jessica Bloom", treatment: "Specialist Consult", time: "09:00 AM", date: "Oct 24", status: "Cancelled", type: "Telehealth" },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-serif tracking-tight">{role === 'owner' ? 'Clinical Appointments' : 'My Medical Visits'}</h2>
        <p className="text-gray-400 text-sm font-medium italic">Track and manage upcoming clinical consultations.</p>
      </div>

      <div className="flex gap-4">
        {['Upcoming', 'Completed', 'Requests', 'Cancelled'].map((f, i) => (
          <button key={i} className={`px-6 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest border transition-all ${i === 0 ? 'bg-black text-white border-black' : 'bg-white text-gray-400 border-gray-100 hover:border-gray-300'}`}>
            {f}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {appointments.map((app, i) => (
          <div key={i} className="bg-white p-6 rounded-[2rem] border border-gray-50 shadow-sm flex items-center gap-6 group hover:translate-x-1 transition-all">
            <div className="w-16 h-16 bg-gray-50 rounded-2xl flex flex-col items-center justify-center font-mono">
              <span className="text-[10px] text-gray-400 font-bold uppercase">Oct</span>
              <span className="text-xl font-black">24</span>
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-sm font-bold">{role === 'owner' ? app.patient : app.treatment}</span>
                <span className="h-1 w-1 bg-gray-300 rounded-full" />
                <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">{app.type}</span>
              </div>
              <div className="text-[10px] text-gray-400 font-bold uppercase tracking-widest italic">{role === 'owner' ? app.treatment : 'Kindred Medical Centre'} · {app.time}</div>
            </div>
            <div className="flex items-center gap-4">
              <span className={`text-[9px] font-black uppercase tracking-widest px-4 py-2 rounded-xl ${
                app.status === 'Confirmed' ? 'bg-emerald-50 text-emerald-600' : 
                app.status === 'Pending' ? 'bg-orange-50 text-orange-600' : 'bg-gray-50 text-gray-400'
              }`}>
                {app.status}
              </span>
              <button className="p-3 bg-gray-50 rounded-xl hover:bg-black hover:text-white transition-all">
                <ExternalLink className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function PatientRecordsView({ isPatient }: { isPatient?: boolean }) {
  const records = [
    { name: "Alex Miller", id: "P-4421", blood: "A+", age: 34, lastVisit: "Oct 12, 2026", condition: "Healthy" },
    { name: "Sarah Jennings", id: "P-4425", blood: "O-", age: 29, lastVisit: "Oct 15, 2026", condition: "Thyroid" },
    { name: "Michael Chen", id: "P-4430", blood: "B+", age: 41, lastVisit: "Oct 10, 2026", condition: "Hypertension" },
  ];

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-serif tracking-tight">{isPatient ? 'My Medical History' : 'Electronic Patient Records'}</h2>
          <p className="text-gray-400 text-sm font-medium italic">Secure EMR system for clinical history tracking.</p>
        </div>
        {!isPatient && (
          <button className="bg-blue-600 text-white px-6 py-3 rounded-2xl text-xs font-bold flex items-center gap-2 shadow-xl hover:bg-blue-700 transition-all">
            <Plus className="w-4 h-4" /> New Record
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {records.map((rec, i) => (
          <div key={i} className="bg-white rounded-[2.5rem] p-8 border border-gray-50 shadow-sm relative overflow-hidden group hover:shadow-xl transition-all duration-500">
            <div className="flex justify-between items-start mb-6">
              <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center font-bold text-gray-400">
                {rec.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div className="text-right">
                <div className="text-[10px] font-black uppercase tracking-widest text-gray-300 mb-1">Blood Group</div>
                <div className="text-lg font-black text-blue-600 font-mono">{rec.blood}</div>
              </div>
            </div>
            
            <h3 className="text-xl font-bold mb-1 tracking-tight">{isPatient ? 'Comprehensive History' : rec.name}</h3>
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-6 italic">{isPatient ? 'Kindred Ecosystem ID' : 'ID: ' + rec.id} · {rec.age} Years</p>

            <div className="space-y-3 pt-6 border-t border-gray-50">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-black uppercase tracking-widest text-gray-300">Last Visit</span>
                <span className="text-xs font-bold">{rec.lastVisit}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-black uppercase tracking-widest text-gray-300">Primary Diagnosis</span>
                <span className="text-xs font-bold text-emerald-600">{rec.condition}</span>
              </div>
            </div>

            <button className="w-full mt-8 py-4 rounded-3xl bg-gray-50 text-gray-400 text-[10px] font-black uppercase tracking-widest hover:bg-black hover:text-white transition-all">
              Open Full Record
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

function MedicalAIView() {
  return (
    <div className="h-full flex flex-col space-y-8">
      <div className="flex items-center gap-6">
        <div className="w-16 h-16 rounded-[2rem] bg-indigo-600 flex items-center justify-center shadow-xl shadow-indigo-100">
          <Bot className="w-8 h-8 text-white" />
        </div>
        <div>
          <h2 className="text-3xl font-serif tracking-tight">Kindred Intelligence</h2>
          <p className="text-gray-400 text-sm font-medium italic">AI clinical assistant powered by secure medical LLMs.</p>
        </div>
      </div>

      <div className="flex-1 bg-white rounded-[3rem] border border-gray-50 shadow-sm p-10 flex flex-col relative overflow-hidden">
        {/* Background Gradient */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" />
        
        <div className="flex-1 space-y-8 overflow-y-auto pr-4 no-scrollbar">
          <div className="flex gap-4">
            <div className="w-8 h-8 rounded-xl bg-gray-50 flex items-center justify-center flex-none mt-1">
              <Bot className="w-4 h-4 text-indigo-400" />
            </div>
            <div className="p-6 bg-gray-50 rounded-2xl rounded-tl-none max-w-[80%]">
              <p className="text-sm leading-relaxed text-gray-600 font-medium">
                Good afternoon, Dr. Elite. I&apos;ve analyzed today&apos;s appointments. 
                <span className="font-bold text-black px-1 underline cursor-pointer">Sarah Jennings</span>&apos; current medication for Thyroid may interact with the upcoming treatment. 
                Would you like me to flag this for your review?
              </p>
            </div>
          </div>

          <div className="flex gap-4 flex-row-reverse">
            <div className="w-8 h-8 rounded-xl bg-blue-600 flex items-center justify-center flex-none mt-1 text-white">
              <User className="w-4 h-4" />
            </div>
            <div className="p-6 bg-blue-600 text-white rounded-2xl rounded-tr-none max-w-[80%] shadow-lg shadow-blue-100">
              <p className="text-sm leading-relaxed font-bold italic">
                Yes, please flag it and suggest an alternative dosage plan based on her last blood work.
              </p>
            </div>
          </div>
        </div>

        <div className="pt-8 flex gap-3">
          <div className="flex-1 relative">
            <input type="text" placeholder="Type clinical query or instruction here..." className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500/10 transition-all pr-12" />
            <button className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-indigo-600 text-white rounded-xl shadow-lg">
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {['Summarize Today', 'Check Drug Interaction', 'Analyze Vitals'].map((s, i) => (
          <button key={i} className="p-6 bg-white rounded-3xl border border-gray-50 shadow-sm text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-indigo-600 hover:border-indigo-100 transition-all text-center">
            {s}
          </button>
        ))}
      </div>
    </div>
  );
}

function PharmacyInventoryView() {
  const stock = [
    { name: "Amoxicillin 500mg", batch: "AX-221", qty: 450, status: "Healthy", expiry: "2027-04" },
    { name: "Paracetamol Syrup", batch: "PA-098", qty: 12, status: "Low Stock", expiry: "2026-11" },
    { name: "Lipitor 20mg", batch: "LP-111", qty: 89, status: "Critical", expiry: "2026-08" },
    { name: "Surgical Gloves", batch: "SG-552", qty: 1200, status: "Healthy", expiry: "2029-12" },
  ];

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-serif tracking-tight">Pharmacy & Inventory</h2>
          <p className="text-gray-400 text-sm font-medium italic">Real-time tracking of medications and clinical gear.</p>
        </div>
        <div className="flex gap-2">
          <button className="bg-white border border-gray-100 px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest">Generate Report</button>
          <button className="bg-black text-white px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl">Reorder All Low</button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <MetricCard label="Total Stock Value" value="$42,800" trend="+4%" icon={<ShoppingBag />} />
        <MetricCard label="Pending Orders" value="14" trend="-2" icon={<Clock />} />
        <MetricCard label="Expiring Soon" value="08" trend="Urgent" icon={<Bell />} />
      </div>

      <div className="bg-white rounded-[2.5rem] border border-gray-50 shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50/50 border-b border-gray-50">
            <tr>
              <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-gray-400">Inventory Item</th>
              <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-gray-400">Batch ID</th>
              <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-gray-400">In-Stock</th>
              <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-gray-400">Condition</th>
              <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-gray-400">Expiry</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {stock.map((row, i) => (
              <tr key={i} className="hover:bg-gray-50/30 transition-colors">
                <td className="px-8 py-6">
                  <div className="text-sm font-bold">{row.name}</div>
                  <div className="text-[10px] text-gray-300 font-bold uppercase">Generic Bio-Care</div>
                </td>
                <td className="px-8 py-6 font-mono text-xs font-bold text-gray-400">{row.batch}</td>
                <td className="px-8 py-6 font-bold text-sm tracking-tight">{row.qty} Units</td>
                <td className="px-8 py-6">
                  <span className={`text-[9px] font-black uppercase tracking-widest px-3 py-1.5 rounded-lg ${
                    row.status === 'Healthy' ? 'bg-emerald-50 text-emerald-600' : 
                    row.status === 'Low Stock' ? 'bg-orange-50 text-orange-600' : 'bg-rose-50 text-rose-600'
                  }`}>
                    {row.status}
                  </span>
                </td>
                <td className="px-8 py-6 font-mono text-xs text-gray-400">{row.expiry}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
