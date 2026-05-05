"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Clock, User, Phone, Mail, CheckCircle2, ChevronRight, X, Loader2 } from "lucide-react";

interface Slot {
  id: string;
  start_time: string;
  end_time: string;
  status: string;
}

interface BookingSystemProps {
  clinicId: string;
  primaryColor?: string;
  isOpen: boolean;
  onClose: () => void;
  serviceName?: string;
  initialSlots?: Slot[];
}

export function BookingSystem({ clinicId, primaryColor = "#000", isOpen, onClose, serviceName, initialSlots }: BookingSystemProps) {
  const [step, setStep] = useState<"slots" | "form" | "confirm">("slots");
  const [slots, setSlots] = useState<Slot[]>([]);
  const [selectedSlot, setSelectedSlot] = useState<Slot | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    reason: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isOpen) {
      if (initialSlots && initialSlots.length > 0) {
        setSlots(initialSlots);
      } else {
        // Fallback to dummy if none provided
        setSlots([]);
      }
      setStep("slots");
      setSelectedSlot(null);
    }
  }, [isOpen, initialSlots]);

  const handleBooking = async () => {
    if (!selectedSlot) return;
    setIsSubmitting(true);

    try {
      // 1. Mark slot as booked in Backend
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/scheduler/${selectedSlot.id}`, {
        method: "PATCH",
        headers: { 
            "Content-Type": "application/json",
            "X-Clinic-ID": clinicId
        },
        body: JSON.stringify({ status: "booked" })
      });

      if (!res.ok) throw new Error("Failed to book slot");

      // 2. Local storage sync (optional for dashboard immediate feedback)
      const bookings = JSON.parse(localStorage.getItem("flexslot_bookings") || "[]");
      const newBooking = {
        id: `B-${Date.now()}`,
        clinicId,
        clientName: formData.name,
        clientEmail: formData.email,
        clientPhone: formData.phone,
        serviceName: serviceName || "General Visit",
        slotId: selectedSlot.id,
        slotTime: new Date(selectedSlot.start_time).toLocaleTimeString(),
        slotDate: new Date(selectedSlot.start_time).toLocaleDateString(),
        createdAt: new Date().toISOString()
      };
      bookings.push(newBooking);
      localStorage.setItem("flexslot_bookings", JSON.stringify(bookings));
      window.dispatchEvent(new Event('storage'));

      setStep("confirm");
    } catch (err) {
      console.error(err);
      alert("Booking failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="bg-white w-full max-w-lg rounded-[2.5rem] shadow-2xl overflow-hidden relative z-10"
          >
            {/* Header */}
            <div className="p-8 border-b border-gray-50 flex justify-between items-center bg-gray-50/50">
              <div>
                <h3 className="text-xl font-bold tracking-tight">
                  {step === "slots" && "Choose a Time"}
                  {step === "form" && "Your Details"}
                  {step === "confirm" && "Booking Confirmed"}
                </h3>
                <p className="text-xs text-gray-400 font-medium uppercase tracking-widest mt-1">
                  {serviceName || "Clinical Consultation"}
                </p>
              </div>
              <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>

            <div className="p-8">
              {step === "slots" && (
                <div className="space-y-6">
                  {slots.length > 0 ? (
                    <div className="grid grid-cols-2 gap-3">
                      {slots.map((slot) => (
                        <button
                          key={slot.id}
                          onClick={() => { setSelectedSlot(slot); setStep("form"); }}
                          className="p-5 rounded-2xl border border-gray-100 bg-white hover:border-black hover:shadow-xl transition-all text-left group"
                        >
                          <div className="text-[10px] font-black text-gray-300 uppercase mb-2 tracking-widest">
                            {new Date(slot.start_time).toLocaleDateString()}
                          </div>
                          <div className="text-lg font-bold group-hover:text-black transition-colors">
                            {new Date(slot.start_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </div>
                        </button>
                      ))}
                    </div>

                  ) : (
                    <div className="py-12 text-center">
                      <Calendar className="w-12 h-12 text-gray-100 mx-auto mb-4" />
                      <p className="text-gray-400 italic">No available slots at the moment.</p>
                    </div>
                  )}
                </div>
              )}

              {step === "form" && selectedSlot && (
                <div className="space-y-6">
                  <div className="p-4 rounded-2xl bg-gray-50 flex items-center gap-4 mb-4">
                    <Clock className="w-5 h-5 text-gray-400" />
                    <div>
                      <div className="text-xs font-black uppercase tracking-widest text-gray-400">Selected Appointment</div>
                      <div className="text-sm font-bold">
                        {new Date(selectedSlot.start_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} on {new Date(selectedSlot.start_time).toLocaleDateString()}
                      </div>
                    </div>

                  </div>

                  <div className="space-y-4">
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input 
                        type="text" 
                        placeholder="Full Name" 
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        className="w-full pl-12 pr-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-black/5"
                      />
                    </div>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input 
                        type="email" 
                        placeholder="Email Address" 
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        className="w-full pl-12 pr-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-black/5"
                      />
                    </div>
                    <div className="relative">
                      <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input 
                        type="tel" 
                        placeholder="Phone Number" 
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        className="w-full pl-12 pr-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-black/5"
                      />
                    </div>
                  </div>

                  <button
                    onClick={handleBooking}
                    disabled={!formData.name || !formData.email || isSubmitting}
                    className="w-full py-5 rounded-2xl font-black text-xs uppercase tracking-widest text-white shadow-xl flex items-center justify-center gap-3 transition-all hover:scale-[1.02] disabled:opacity-50 disabled:grayscale disabled:scale-100"
                    style={{ backgroundColor: primaryColor }}
                  >
                    {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : "Confirm Appointment"}
                  </button>
                  
                  <button onClick={() => setStep("slots")} className="w-full text-center text-[10px] font-black uppercase tracking-widest text-gray-300 hover:text-black transition-colors">
                    Back to slots
                  </button>
                </div>
              )}

              {step === "confirm" && (
                <div className="py-12 text-center">
                  <motion.div
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="w-24 h-24 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-8"
                  >
                    <CheckCircle2 className="w-12 h-12 text-emerald-500" />
                  </motion.div>
                  <h4 className="text-2xl font-bold mb-3 tracking-tight">Request Sent!</h4>
                  <p className="text-gray-400 font-medium italic leading-relaxed max-w-xs mx-auto mb-10">
                    We&apos;ve sent your request to the clinic. You&apos;ll receive a confirmation email shortly.
                  </p>
                  <button
                    onClick={onClose}
                    className="px-12 py-4 rounded-xl font-black text-[10px] uppercase tracking-[0.2em] border border-gray-100 hover:bg-gray-50 transition-all text-gray-500"
                  >
                    Close Portal
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
