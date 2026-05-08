"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  CreditCard, ShieldCheck, Lock, ChevronLeft, Check, 
  Wallet, Landmark, Receipt, Info, Activity
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function PaymentPage() {
  const router = useRouter();
  const [method, setMethod] = useState("card");
  const [loading, setLoading] = useState(false);

  const handlePay = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      alert("Payment Successful! Your session is confirmed.");
      router.push("/dashboard/customer");
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-white text-black font-sans flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-[0.03]">
        <div className="absolute -top-1/4 -right-1/4 w-1/2 h-1/2 bg-blue-500 rounded-full blur-[200px]" />
        <div className="absolute -bottom-1/4 -left-1/4 w-1/2 h-1/2 bg-purple-500 rounded-full blur-[200px]" />
      </div>

      <div className="w-full max-w-4xl grid md:grid-cols-5 gap-8 relative z-10">
        
        {/* Left: Summary */}
        <div className="md:col-span-2 space-y-8">
          <button onClick={() => router.back()} className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-black/30 hover:text-black mb-8">
            <ChevronLeft size={14} /> Revert Session
          </button>

          <div className="space-y-2">
            <h1 className="text-4xl font-black tracking-tighter uppercase italic">Secure Checkout</h1>
            <p className="text-black/30 text-[10px] font-black uppercase tracking-[0.2em]">Finalizing your clinical session</p>
          </div>

          <div className="bg-black/5 rounded-[2.5rem] p-10 border border-black/5 space-y-8">
             <div className="space-y-4">
                <div className="flex justify-between items-start">
                   <div className="space-y-1">
                      <p className="text-[8px] font-black uppercase tracking-widest text-black/30">Service Entity</p>
                      <h3 className="text-xl font-black uppercase tracking-tighter italic">General Consultation</h3>
                   </div>
                   <div className="text-xl font-black tracking-tighter">$85.00</div>
                </div>
                <div className="flex justify-between items-start">
                   <div className="space-y-1">
                      <p className="text-[8px] font-black uppercase tracking-widest text-black/30">Service Facility</p>
                      <h3 className="text-sm font-black uppercase tracking-tight">Pristine Swiss Dental</h3>
                   </div>
                </div>
             </div>

             <div className="h-px bg-black/10 w-full" />

             <div className="space-y-4">
                <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest text-black/30">
                   <span>Subtotal Matrix</span>
                   <span>$85.00</span>
                </div>
                <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest text-black/30">
                   <span>Neural Processing Tax</span>
                   <span>$4.25</span>
                </div>
                <div className="flex justify-between items-center pt-4">
                   <span className="text-xs font-black uppercase tracking-widest">Total Liability</span>
                   <span className="text-3xl font-black tracking-tighter">$89.25</span>
                </div>
             </div>
          </div>

          <div className="flex items-center gap-4 p-6 border border-black/5 rounded-3xl bg-white/50 backdrop-blur-sm">
             <ShieldCheck size={24} className="text-emerald-500" />
             <p className="text-[9px] font-bold text-black/40 uppercase tracking-widest leading-relaxed">
                Protected by 256-bit clinical-grade encryption. No health data is stored during this transaction.
             </p>
          </div>
        </div>

        {/* Right: Payment Input */}
        <div className="md:col-span-3 bg-white border border-black/10 rounded-[3rem] p-12 shadow-[0_48px_96px_-24px_rgba(0,0,0,0.12)] space-y-10 flex flex-col">
           <div className="grid grid-cols-3 gap-4">
              <PaymentMethod 
                icon={<CreditCard size={18} />} 
                label="Card" 
                active={method === 'card'} 
                onClick={() => setMethod('card')} 
              />
              <PaymentMethod 
                icon={<Wallet size={18} />} 
                label="Wallet" 
                active={method === 'wallet'} 
                onClick={() => setMethod('wallet')} 
              />
              <PaymentMethod 
                icon={<Landmark size={18} />} 
                label="Bank" 
                active={method === 'bank'} 
                onClick={() => setMethod('bank')} 
              />
           </div>

           <div className="space-y-6 flex-1">
              {method === 'card' && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                   <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-black/20 ml-2">Cardholder Identity</label>
                      <input type="text" placeholder="FULL LEGAL NAME" className="payment-input" />
                   </div>
                   <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-black/20 ml-2">Card Number Matrix</label>
                      <div className="relative">
                         <input type="text" placeholder="•••• •••• •••• ••••" className="payment-input pr-16" />
                         <CreditCard className="absolute right-6 top-1/2 -translate-y-1/2 text-black/10 w-6 h-6" />
                      </div>
                   </div>
                   <div className="grid grid-cols-2 gap-6">
                      <div className="space-y-2">
                         <label className="text-[10px] font-black uppercase tracking-widest text-black/20 ml-2">Expiry Chrono</label>
                         <input type="text" placeholder="MM/YY" className="payment-input" />
                      </div>
                      <div className="space-y-2">
                         <label className="text-[10px] font-black uppercase tracking-widest text-black/20 ml-2">Security Key (CVV)</label>
                         <input type="password" placeholder="•••" className="payment-input" />
                      </div>
                   </div>
                </motion.div>
              )}
              {method !== 'card' && (
                <div className="flex flex-col items-center justify-center py-20 text-center space-y-4">
                   <div className="w-16 h-16 bg-black/5 rounded-full flex items-center justify-center animate-pulse">
                      <Activity className="text-black/20" />
                   </div>
                   <p className="text-[10px] font-black uppercase tracking-widest text-black/30">Redirecting to Secure Gateway...</p>
                </div>
              )}
           </div>

           <button 
             onClick={handlePay}
             disabled={loading}
             className="w-full py-8 bg-black text-white rounded-[2rem] font-black text-xs uppercase tracking-[0.4em] shadow-2xl hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-4"
           >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                  PROCESSING TRANSACTION...
                </>
              ) : (
                <>
                  <Lock size={14} /> AUTHORIZE PAYMENT
                </>
              )}
           </button>
           
           <div className="flex items-center justify-center gap-4 opacity-20 grayscale">
              <img src="https://upload.wikimedia.org/wikipedia/commons/d/d6/Visa_2021.svg" className="h-4" />
              <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" className="h-6" />
              <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" className="h-4" />
           </div>
        </div>
      </div>
      
      <style jsx global>{`
        .payment-input {
          width: 100%;
          padding: 1.25rem 1.5rem;
          background: rgba(0,0,0,0.03);
          border: 1px solid transparent;
          border-radius: 1.25rem;
          font-size: 0.75rem;
          font-weight: 900;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          transition: all 0.3s;
        }
        .payment-input:focus {
          outline: none;
          background: white;
          border-color: black;
          box-shadow: 0 10px 20px -5px rgba(0,0,0,0.1);
        }
      `}</style>
    </div>
  );
}

function PaymentMethod({ icon, label, active, onClick }: any) {
  return (
    <button 
      onClick={onClick}
      className={`p-6 rounded-3xl border-2 flex flex-col items-center gap-3 transition-all ${
        active 
          ? 'border-black bg-black text-white shadow-xl scale-105' 
          : 'border-black/5 bg-white text-black/30 hover:border-black/10'
      }`}
    >
      {icon}
      <span className="text-[10px] font-black uppercase tracking-widest">{label}</span>
      {active && <Check size={12} className="mt-1" />}
    </button>
  );
}
