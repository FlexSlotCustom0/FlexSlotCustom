"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar, Settings, RefreshCw, LayoutDashboard, Layout, CalendarDays, Users, CalendarClock
} from "lucide-react";
import Link from "next/link";

// Import Modular Components
import { SideNavItem } from "./components/shared/SideNavItem";
import { FilterDropdown } from "./components/shared/FilterDropdown";
import { DashboardCommandCenter } from "./components/dashboard/DashboardCommandCenter";
import { ClinicSetupSection } from "./components/clinic-interface/ClinicSetupSection";
import { CalendarPage } from "./components/calendar/CalendarPage";
import { PatientListSection } from "./components/registry/PatientListSection";

export default function OwnerDashboard() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [dateRange, setDateRange] = useState("May 1 - May 31, 2026");
  const [isApplying, setIsApplying] = useState(false);

  const [bookings, setBookings] = useState<any[]>([]);
  const [doneCount, setDoneCount] = useState(0);
  const [notesCount, setNotesCount] = useState(0);

  useEffect(() => {
    const savedBookings = localStorage.getItem("flexslot_bookings");
    const savedDone = localStorage.getItem("flexslot_done_count");
    const savedNotes = localStorage.getItem("flexslot_notes");

    if (savedDone) setDoneCount(parseInt(savedDone));
    if (savedNotes) setNotesCount(parseInt(savedNotes));

    const dummy = [
      { id: '1', clientName: 'Alexander Wright', serviceName: 'General Consultation', slotTime: '10:30 AM', practitioner: 'Dr. Anderson' },
      { id: '2', clientName: 'Sarah Jenkins', serviceName: 'Diagnostic Scan', slotTime: '11:15 AM', practitioner: 'Dr. Jenkins' },
      { id: '3', clientName: 'Michael Chen', serviceName: 'Orthopedic Follow-up', slotTime: '12:00 PM', practitioner: 'Dr. Wright' },
      { id: '4', clientName: 'Emily Rodriguez', serviceName: 'Pediatric Checkup', slotTime: '01:30 PM', practitioner: 'Dr. Anderson' },
      { id: '5', clientName: 'David Thompson', serviceName: 'Cardiology Screening', slotTime: '02:45 PM', practitioner: 'Dr. Jenkins' },
      { id: '6', clientName: 'Jessica Lee', serviceName: 'Physical Therapy', slotTime: '03:30 PM', practitioner: 'Dr. Anderson' },
      { id: '7', clientName: 'Robert Garcia', serviceName: 'Dental Cleaning', slotTime: '04:15 PM', practitioner: 'Dr. Wright' },
      { id: '8', clientName: 'Sophie Bennett', serviceName: 'Dermatology Review', slotTime: '05:00 PM', practitioner: 'Dr. Jenkins' }
    ];

    let loadedBookings = null;
    try {
      loadedBookings = savedBookings ? JSON.parse(savedBookings) : null;
    } catch (e) { }

    if (loadedBookings && loadedBookings.length > 0 && loadedBookings[0].practitioner) {
      setBookings(loadedBookings.reverse());
    } else {
      setBookings(dummy);
      localStorage.setItem("flexslot_bookings", JSON.stringify(dummy));
    }
  }, []);

  const handleComplete = () => {
    if (bookings.length === 0) return;
    const next = [...bookings];
    next.shift();
    setBookings(next);

    const nextDone = doneCount + 1;
    const nextNotes = notesCount + 1;

    setDoneCount(nextDone);
    setNotesCount(nextNotes);

    localStorage.setItem("flexslot_bookings", JSON.stringify([...next].reverse()));
    localStorage.setItem("flexslot_done_count", nextDone.toString());
    localStorage.setItem("flexslot_notes", nextNotes.toString());
  };

  const handleApplyFilters = () => {
    setIsApplying(true);
    setTimeout(() => setIsApplying(false), 800);
  };

  return (
    <div className="min-h-screen bg-white text-black font-sans flex overflow-hidden">
      <AnimatePresence>
        {isApplying && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-white/60 backdrop-blur-sm flex items-center justify-center"
          >
            <div className="flex flex-col items-center gap-4">
              <RefreshCw className="w-8 h-8 text-black animate-spin" />
              <span className="text-[10px] font-black uppercase tracking-[0.3em]">Syncing Neural Feed...</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <aside className="w-72 bg-white border-r border-black/5 flex flex-col h-screen sticky top-0 z-20">
        <div className="h-24 flex items-center px-8 border-b border-black/5">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-11 h-11 bg-white border border-gray-100 rounded-xl flex items-center justify-center group-hover:scale-105 transition-all shadow-sm overflow-hidden">
              <img src="/flexslot_logo.png" alt="FlexSlotCustom Logo" className="w-full h-full object-contain p-1" />
            </div>
            <div className="flex flex-col">
              <span className="font-bold tracking-tight text-base text-[#1e3a8a]">FlexSlotCustom</span>
              <span className="text-[8px] font-black uppercase tracking-[0.2em] text-gray-300">Provider Hub</span>
            </div>
          </Link>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-3">
          <SideNavItem icon={<LayoutDashboard size={18} />} label="Dashboard" active={activeTab === "dashboard"} onClick={() => setActiveTab("dashboard")} />
          <SideNavItem icon={<Layout size={18} />} label="Clinic Setup" active={activeTab === "ui"} onClick={() => setActiveTab("ui")} />
          <SideNavItem icon={<CalendarDays size={18} />} label="Calendar" active={activeTab === "calendar"} onClick={() => setActiveTab("calendar")} />
          <SideNavItem icon={<Users size={18} />} label="Patient List" active={activeTab === "audit"} onClick={() => setActiveTab("audit")} />
        </nav>

        <div className="p-6 border-t border-black/5">
          <button className="flex items-center gap-3 px-3 py-2 text-black/40 hover:text-black transition-colors font-bold text-xs uppercase tracking-widest w-full">
            <Settings size={14} /> System Registry
          </button>
        </div>
      </aside>

      <main className="flex-1 flex flex-col overflow-y-auto relative">
        {activeTab === "dashboard" && (
          <header className="h-20 bg-white border-b border-black/5 px-8 flex items-center justify-between sticky top-0 z-[100] backdrop-blur-md">
            <div className="flex items-center gap-6 flex-1">
              <h1 className="text-xl font-black uppercase tracking-tighter italic">Dashboard</h1>
              <div className="flex items-center gap-2 bg-black/5 p-1 rounded-xl ml-4">
                <button
                  onClick={() => {
                    const months = [
                      { label: "This Month", range: "May 1 - May 31, 2026" },
                      { label: "Last Month", range: "Apr 1 - Apr 30, 2026" },
                      { label: "2 Months Ago", range: "Mar 1 - Mar 31, 2026" }
                    ];
                    const currentIndex = months.findIndex(m => m.range === dateRange);
                    const nextIndex = (currentIndex + 1) % months.length;
                    setDateRange(months[nextIndex].range);
                  }}
                  className="px-4 py-2 bg-white text-[10px] font-black uppercase tracking-widest rounded-lg shadow-sm hover:bg-black hover:text-white transition-all min-w-[100px]"
                >
                  {dateRange.includes("May") ? "This Month" : dateRange.includes("Apr") ? "Last Month" : "2 Months Ago"}
                </button>
                <div className="flex items-center gap-2 px-4 py-2 text-[10px] font-black uppercase tracking-widest text-black/40 cursor-default">
                  <Calendar size={14} />
                  {dateRange}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <FilterDropdown label="All Practitioners" options={["Dr. Anderson", "Dr. Jenkins", "Dr. Wright"]} />
              <FilterDropdown label="All Locations" options={["Main Clinic", "West Wing", "Remote"]} />
              <button
                onClick={handleApplyFilters}
                className="px-8 py-3 bg-black text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-xl shadow-black/20 hover:scale-105 active:scale-95 transition-all"
              >
                Apply Filters
              </button>
            </div>
          </header>
        )}


        <div className="p-8 space-y-8">
          {activeTab === "dashboard" && (
            <DashboardCommandCenter
              bookings={bookings}
              doneCount={doneCount}
              notesCount={notesCount}
              onComplete={handleComplete}
            />
          )}
          {activeTab === "ui" && <ClinicSetupSection />}
          {activeTab === "calendar" && <CalendarPage />}
          {activeTab === "audit" && <PatientListSection />}
        </div>
      </main>
    </div>
  );
}
