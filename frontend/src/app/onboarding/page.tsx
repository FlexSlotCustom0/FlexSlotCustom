"use client";

import { motion } from "framer-motion";
import {
  Stethoscope, Heart, ChevronRight, Check,
  ArrowRight, ShieldPlus, Sparkles
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const specialties = [
  {
    id: "clinic-clean",
    title: "Private Medical Clinic",
    desc: "Clean, professional layout for GPs, specialists, and dental practices.",
    icon: <Stethoscope className="w-8 h-8" />,
    color: "bg-blue-600",
    lightColor: "bg-blue-50",
    border: "border-blue-100",
    preview: null,
    bgImage: "/medical_clinic_background.jpg"
  },
  {
    id: "vet-warm",
    title: "Veterinary Practice",
    desc: "Warm and inviting theme designed specifically for pet care professionals.",
    icon: <Heart className="w-8 h-8" />,
    color: "bg-orange-500",
    lightColor: "bg-orange-50",
    border: "border-orange-100",
    preview: null,
    bgImage: "/vet_pet_clinic.jpg"
  }
];

export default function OnboardingPage() {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-[#FDFDFD] text-black font-sans selection:bg-blue-600 selection:text-white flex flex-col">
      {/* Header */}
      <nav className="h-20 flex items-center justify-between px-10 border-b border-gray-100 bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
            <ShieldPlus className="w-5 h-5 text-white" />
          </div>
          <span className="font-bold tracking-tight text-lg">FlexSlot Clinic</span>
        </div>
        <div className="text-xs font-bold text-gray-400 uppercase tracking-[0.2em]">Step 1 of 2: Specialty</div>
      </nav>

      <main className="flex-1 max-w-5xl mx-auto w-full px-6 py-20 flex flex-col items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-[10px] font-black uppercase tracking-widest mb-6">
            <Sparkles className="w-3 h-3" />
            New Account Setup
          </div>
          <h1 className="text-5xl md:text-6xl font-serif tracking-tight mb-6">What is your niche?</h1>
          <p className="text-xl text-gray-500 font-medium max-w-xl mx-auto">
            Choose your specialty to start with a tailored clinical template. You can fully customize everything later.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 w-full max-w-4xl">
          {specialties.map((spec) => (
            <motion.button
              key={spec.id}
              onClick={() => setSelected(spec.id)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`p-10 rounded-[2.5rem] border-2 text-left transition-all relative overflow-hidden group ${selected === spec.id
                  ? `${spec.border} ${spec.lightColor} ring-4 ring-black/5`
                  : "bg-white border-gray-100 hover:border-gray-300"
                }`}
            >
              {spec.bgImage && (
                <div 
                  className={`absolute inset-0 z-0 bg-cover bg-center transition-all duration-500 ease-out ${selected === spec.id ? 'opacity-20 scale-105' : 'opacity-[0.03] group-hover:opacity-30 group-hover:scale-105'}`} 
                  style={{ backgroundImage: `url(${spec.bgImage})` }} 
                />
              )}
              
              <div className="relative z-10">
                <div className={`w-20 h-20 rounded-3xl flex items-center justify-center mb-8 transition-colors ${selected === spec.id ? spec.color : "bg-gray-50 text-gray-400 group-hover:bg-black group-hover:text-white"
                  } ${spec.bgImage ? 'bg-white shadow-xl' : ''}`}>
                  {spec.icon}
                </div>

                <h3 className={`text-2xl font-bold mb-3 tracking-tight ${selected === spec.id || !spec.bgImage ? '' : 'group-hover:text-black'}`}>{spec.title}</h3>
                <p className={`font-medium leading-relaxed mb-8 ${selected === spec.id || !spec.bgImage ? 'text-gray-500' : 'text-gray-500 group-hover:text-gray-800'}`}>{spec.desc}</p>

                <div className="flex items-center gap-2">
                  <span className={`text-[10px] font-black uppercase tracking-widest ${selected === spec.id ? spec.accent : spec.bgImage ? "text-gray-600 group-hover:text-black" : "text-gray-300 group-hover:text-black"
                    }`}>
                    Select Template
                  </span>
                  <ChevronRight className={`w-4 h-4 transition-transform ${selected === spec.id ? `${spec.accent} translate-x-1` : spec.bgImage ? "text-gray-800 group-hover:text-black" : "text-gray-200 group-hover:text-black"
                    }`} />
                </div>
              </div>

              {/* Preview Bubble */}
              {spec.preview && (
                <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-gray-50 rounded-full flex items-center justify-center text-5xl grayscale opacity-30 group-hover:opacity-100 transition-all z-0">
                  {spec.preview}
                </div>
              )}

              {selected === spec.id && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute top-6 right-6 w-8 h-8 bg-black rounded-full flex items-center justify-center shadow-lg"
                >
                  <Check className="w-4 h-4 text-white" strokeWidth={4} />
                </motion.div>
              )}
            </motion.button>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: selected ? 1 : 0.5 }}
          className="mt-20 w-full max-w-4xl"
        >
          {selected ? (
            <button
              onClick={() => {
                const niche = selected === 'clinic-clean' ? 'medical' : 'veterinary';
                localStorage.setItem('flexslot_clinic_niche', niche);
                window.location.href = `/templates/${selected}?manage=true`;
              }}
              className="w-full bg-black text-white py-6 rounded-3xl font-bold text-xl flex items-center justify-center gap-3 shadow-2xl hover:bg-gray-800 transition-all hover:scale-[1.01]"
            >
              Start Personalizing <ArrowRight className="w-5 h-5" />
            </button>
          ) : (
            <button
              disabled
              className="w-full bg-gray-100 text-gray-400 py-6 rounded-3xl font-bold text-xl flex items-center justify-center gap-3 cursor-not-allowed"
            >
              Select your specialty to continue
            </button>
          )}

          <p className="text-center mt-6 text-xs text-gray-400 font-bold uppercase tracking-widest">
            You will be redirected to the clinical editor instantly.
          </p>
        </motion.div>
      </main>

      {/* Footer Branding */}
      <footer className="py-12 px-10 border-t border-gray-100 text-center">
        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-300 items-center justify-center flex gap-2">
          Securely managed by <span className="text-black">FlexSlotCustom Engine</span>
        </p>
      </footer>
    </div>
  );
}
