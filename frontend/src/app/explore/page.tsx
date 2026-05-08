"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Search, MapPin, Star, Filter, HeartPulse, Stethoscope, 
  Syringe, PawPrint, Calendar, ChevronRight, Activity, Clock
} from "lucide-react";
import Link from "next/link";

const CLINIC_DATA = [
  {
    id: "1",
    name: "Pristine Swiss Dental",
    doctor: "Dr. Adrian Steiner",
    type: "Dental",
    tags: ["Dental", "Orthodontics", "Swiss Minimalism"],
    rating: 4.9,
    reviews: 128,
    image: "https://images.unsplash.com/photo-1629909605125-58ec369bb9af?q=80&w=800&auto=format&fit=crop",
    location: "Zurich District",
    template: "clinic-pristine"
  },
  {
    id: "2",
    name: "Luxe Private Heart Center",
    doctor: "Dr. Julian Gold",
    type: "Cardiology",
    tags: ["Cardiology", "Private Elite", "Luxury"],
    rating: 5.0,
    reviews: 84,
    image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=800&auto=format&fit=crop",
    location: "Mayfair London",
    template: "clinic-luxe"
  },
  {
    id: "3",
    name: "Aura Wellness & Spa",
    doctor: "Dr. Elena Rivers",
    type: "Wellness",
    tags: ["Wellness", "Mental Health", "Aesthetic"],
    rating: 4.8,
    reviews: 215,
    image: "https://images.unsplash.com/photo-1519494080410-f9af76cb428b?q=80&w=800&auto=format&fit=crop",
    location: "Bali Retreat",
    template: "clinic-aura"
  },
  {
    id: "4",
    name: "Paws Premium Vet",
    doctor: "Dr. Bark Lee",
    type: "Veterinary",
    tags: ["Veterinary", "Surgery", "Pet Care"],
    rating: 4.7,
    reviews: 312,
    image: "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?q=80&w=800&auto=format&fit=crop",
    location: "San Francisco",
    template: "clinic-luxe"
  },
  {
    id: "5",
    name: "City General Practice",
    doctor: "Dr. Sarah Anderson",
    type: "General",
    tags: ["General", "Family", "Pharmacy"],
    rating: 4.6,
    reviews: 540,
    image: "https://images.unsplash.com/photo-1538108197003-8ad766453601?q=80&w=800&auto=format&fit=crop",
    location: "New York",
    template: "clinic-pristine"
  }
];

const TAGS = ["All", "Dental", "Cardiology", "Wellness", "Veterinary", "General", "Surgery", "Aesthetic"];

export default function ExplorePage() {
  const [search, setSearch] = useState("");
  const [activeTag, setActiveTag] = useState("All");

  const filteredClinics = CLINIC_DATA.filter(clinic => {
    const matchesSearch = clinic.name.toLowerCase().includes(search.toLowerCase()) || 
                          clinic.doctor.toLowerCase().includes(search.toLowerCase());
    const matchesTag = activeTag === "All" || clinic.tags.includes(activeTag) || clinic.type === activeTag;
    return matchesSearch && matchesTag;
  });

  return (
    <div className="min-h-screen bg-[#fafafa] text-black font-sans">
      {/* Search Header */}
      <header className="bg-white border-b border-black/5 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between gap-8">
          <Link href="/" className="flex items-center gap-3 shrink-0">
            <div className="w-10 h-10 bg-black rounded-xl flex items-center justify-center p-2 shadow-xl shadow-black/20">
              <img src="/flexslot_logo.png" alt="" className="w-full h-full object-contain brightness-0 invert" />
            </div>
            <span className="font-black uppercase tracking-tighter italic text-sm">FlexSlot Explore</span>
          </Link>

          <div className="flex-1 max-w-2xl relative">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-black/20 w-5 h-5" />
            <input 
              type="text" 
              placeholder="Search by clinic name or doctor name..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-16 pr-8 py-4 bg-black/5 rounded-full text-sm font-bold uppercase tracking-widest focus:outline-none focus:bg-white focus:ring-2 focus:ring-black transition-all"
            />
          </div>

          <div className="flex items-center gap-4">
            <Link href="/login" className="text-[10px] font-black uppercase tracking-widest hover:text-black/50">My Appointments</Link>
            <div className="w-10 h-10 rounded-full bg-black/5 border border-black/10 flex items-center justify-center">
              <Activity size={18} className="text-black/20" />
            </div>
          </div>
        </div>

        {/* Tag Filters */}
        <div className="max-w-7xl mx-auto px-6 h-14 flex items-center gap-3 overflow-x-auto no-scrollbar border-t border-black/5">
          {TAGS.map(tag => (
            <button 
              key={tag}
              onClick={() => setActiveTag(tag)}
              className={`px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest whitespace-nowrap transition-all ${
                activeTag === tag ? 'bg-black text-white shadow-lg' : 'bg-black/5 text-black/40 hover:bg-black/10'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h1 className="text-4xl font-black uppercase tracking-tighter italic leading-none">Find Your Care</h1>
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-black/20 mt-2 italic">Showing {filteredClinics.length} clinical instances found in registry</p>
          </div>
          <button className="flex items-center gap-3 px-6 py-3 bg-white border border-black/5 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-sm hover:shadow-md transition-all">
            <Filter size={14} /> Refine Matrix
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredClinics.map(clinic => (
              <motion.div 
                key={clinic.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="group bg-white border border-black/5 rounded-[2.5rem] overflow-hidden hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.1)] transition-all flex flex-col"
              >
                {/* Clinic Image */}
                <div className="aspect-[16/10] relative overflow-hidden">
                  <img src={clinic.image} alt={clinic.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute top-6 left-6 flex gap-2">
                    {clinic.tags.slice(0, 2).map(tag => (
                      <span key={tag} className="px-3 py-1.5 bg-white/90 backdrop-blur-md rounded-lg text-[8px] font-black uppercase tracking-widest shadow-lg">{tag}</span>
                    ))}
                  </div>
                  <div className="absolute top-6 right-6 w-10 h-10 bg-white/90 backdrop-blur-md rounded-xl flex items-center justify-center shadow-lg">
                    <HeartPulse size={18} className="text-black" />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>

                {/* Clinic Content */}
                <div className="p-8 space-y-6 flex-1 flex flex-col">
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-black uppercase tracking-widest text-black/30">{clinic.type}</span>
                      <div className="flex items-center gap-1">
                        <Star size={10} className="fill-black" />
                        <span className="text-[10px] font-black">{clinic.rating}</span>
                      </div>
                    </div>
                    <h3 className="text-2xl font-black uppercase tracking-tighter italic leading-tight group-hover:text-blue-600 transition-colors">{clinic.name}</h3>
                  </div>

                  <div className="flex items-center gap-4 p-4 bg-black/5 rounded-2xl">
                    <div className="w-10 h-10 rounded-full overflow-hidden bg-black/10">
                       <div className="w-full h-full flex items-center justify-center">
                          <Stethoscope size={20} className="text-black/20" />
                       </div>
                    </div>
                    <div>
                      <p className="text-[8px] font-black uppercase tracking-widest text-black/30 leading-none">Primary Physician</p>
                      <p className="text-xs font-black uppercase tracking-tight mt-1">{clinic.doctor}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-[10px] font-bold text-black/40 uppercase tracking-widest">
                    <MapPin size={12} />
                    {clinic.location}
                  </div>

                  <div className="mt-auto pt-6 flex items-center justify-between gap-4">
                    <div className="flex flex-col">
                       <span className="text-[8px] font-black uppercase tracking-widest text-black/20">Next Slot</span>
                       <span className="text-[10px] font-black uppercase text-emerald-500">Today, 4:30 PM</span>
                    </div>
                    <Link href={`/templates/${clinic.template}`} className="px-6 py-3 bg-black text-white rounded-xl text-[10px] font-black uppercase tracking-[0.2em] shadow-xl shadow-black/20 hover:scale-105 active:scale-95 transition-all flex items-center gap-2">
                      Initialize Booking <ChevronRight size={14} />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
