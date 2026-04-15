"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar as CalendarIcon, Clock, Send, Bot, CheckCircle2, User } from "lucide-react";
import Link from "next/link";

export default function BookingDemo() {
  const [messages, setMessages] = useState<{role: 'ai' | 'user', text: string}[]>([
    { role: 'ai', text: 'Hello! I am your AI assistant for Sigma Consulting. What kind of appointment would you like to schedule?' }
  ]);
  const [input, setInput] = useState("");
  const [slotConfirmed, setSlotConfirmed] = useState(false);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg = input;
    setInput("");
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);

    setTimeout(() => {
      setMessages(prev => [...prev, { role: 'ai', text: `I understand you want to schedule based on: "${userMsg}". Checking available partitions...` }]);
      
      setTimeout(() => {
        setMessages(prev => [...prev, { role: 'ai', text: `Optimal slot detected: Next Tuesday at 10 AM. Should I lock this in for your business slug?` }]);
      }, 1500);
    }, 1000);
  };

  const confirmBooking = () => {
    setMessages(prev => [...prev, { role: 'user', text: "Yes, book it." }]);
    setTimeout(() => {
      setSlotConfirmed(true);
      setMessages(prev => [...prev, { role: 'ai', text: "Booking confirmed! Monday at 10 AM is archived. Async acknowledgement dispatched." }]);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-6 lg:p-12">
      <div className="max-w-7xl w-full grid lg:grid-cols-5 gap-16 items-start">
        
        {/* Left column: Branding & Context */}
        <div className="lg:col-span-2 flex flex-col justify-center space-y-12">
          <div>
            <Link href="/" className="inline-block px-6 py-2 bg-white/5 border border-white/10 text-white/40 rounded-full text-[10px] font-black uppercase tracking-widest mb-10 hover:text-white transition-colors">
              &larr; PLATFORM_RETURN
            </Link>
            <h1 className="text-5xl lg:text-7xl font-black tracking-tighter mb-6 leading-tight">Sigma <br/><span className="text-white/30">Consulting</span></h1>
            <p className="text-white/20 leading-relaxed text-lg font-light max-w-sm mb-10">
              High-density tenant portal. Local AI inference for discrete business logic.
            </p>
          </div>
          
          <div className="p-10 rounded-[3rem] border border-white/10 bg-white/[0.01] space-y-8">
            <h3 className="text-[10px] font-black uppercase tracking-[0.5em] text-white/30 flex items-center gap-3">
              <CalendarIcon className="w-4 h-4 text-white" />
              Availability_Grid
            </h3>
            <div className="space-y-4">
              {[
                { time: "10:00 AM", status: slotConfirmed ? "Locked" : "Available", date: "Next Tuesday" },
                { time: "01:30 PM", status: "Available", date: "Next Tuesday" },
                { time: "09:00 AM", status: "Booked", date: "Next Wednesday" },
              ].map((slot, i) => (
                <div key={i} className={`flex items-center justify-between p-6 rounded-[1.5rem] border transition-all ${
                  slot.status === 'Locked' ? 'bg-white border-white' : 'bg-white/[0.02] border-white/5'
                }`}>
                  <div className="flex items-center gap-4">
                    <Clock className={`w-5 h-5 ${slot.status === 'Locked' ? 'text-black' : 'text-white/20'}`} />
                    <div>
                      <p className={`font-black text-sm uppercase tracking-tight ${slot.status === 'Locked' ? 'text-black' : 'text-white'}`}>{slot.time}</p>
                      <p className={`text-[10px] font-black uppercase tracking-widest ${slot.status === 'Locked' ? 'text-black/30' : 'text-white/20'}`}>{slot.date}</p>
                    </div>
                  </div>
                  <span className={`text-[9px] font-black px-3 py-1.5 rounded-lg border uppercase tracking-widest ${
                    slot.status === 'Available' ? 'bg-white/5 border-white/10 text-white' :
                    slot.status === 'Locked' ? 'bg-black border-black text-white' :
                    'bg-white/5 border-transparent text-white/20'
                  }`}>
                    {slot.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right column: Chatbot Interface */}
        <div className="lg:col-span-3 flex flex-col bg-white/[0.01] border border-white/10 rounded-[4rem] h-[750px] shadow-[0_0_100px_rgba(255,255,255,0.02)] relative overflow-hidden">
          <div className="p-8 border-b border-white/10 flex items-center justify-between bg-black">
            <div className="flex items-center gap-5">
              <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center">
                <Bot className="w-6 h-6 text-black" />
              </div>
              <div>
                <h2 className="font-black text-lg tracking-tight">AI Scheduling</h2>
                <p className="text-[10px] uppercase font-black tracking-widest text-white/20">TinyLlama_Engine_v1.1</p>
              </div>
            </div>
            <div className="px-4 py-1 rounded-full border border-white/10 text-[9px] font-bold text-white/30 uppercase tracking-[0.2em]">
               SECURE_PARTITION
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-10 space-y-10 scrollbar-hide">
            <AnimatePresence>
              {messages.map((msg, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex gap-5 max-w-[85%] ${msg.role === 'user' ? 'ml-auto flex-row-reverse' : ''}`}
                >
                  <div className={`w-10 h-10 rounded-2xl flex-shrink-0 flex items-center justify-center ${msg.role === 'user' ? 'bg-white/10 border border-white/10' : 'bg-white'}`}>
                    {msg.role === 'user' ? <User className="w-5 h-5 text-white/40" /> : <Bot className="w-5 h-5 text-black" />}
                  </div>
                  <div className={`p-6 rounded-[2rem] text-sm leading-relaxed font-light ${
                    msg.role === 'user' 
                      ? 'bg-white text-black font-bold rounded-tr-sm shadow-xl' 
                      : 'bg-white/[0.03] border border-white/5 text-white/70 rounded-tl-sm'
                  }`}>
                    {msg.text}
                    {msg.role === 'ai' && idx === messages.length - 1 && msg.text.includes("Optimal slot") && !slotConfirmed && (
                      <button 
                        onClick={confirmBooking}
                        className="mt-6 w-full py-4 bg-white text-black rounded-2xl font-black text-xs uppercase tracking-[0.2em] transition-all hover:opacity-90 flex items-center justify-center gap-3"
                      >
                        <CheckCircle2 className="w-4 h-4" /> LOCK_IN_SLOT
                      </button>
                    )}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          <div className="p-8 bg-black border-t border-white/10">
            <form onSubmit={handleSend} className="relative flex items-center">
              <input
                type="text"
                disabled={slotConfirmed}
                placeholder="INPUT_NATURAL_LANGUAGE_REQUEST..."
                value={input}
                onChange={e => setInput(e.target.value)}
                className="w-full bg-white/[0.03] border border-white/10 text-xs font-mono rounded-full pl-8 pr-16 py-5 focus:outline-none focus:border-white/30 transition-all disabled:opacity-20 uppercase tracking-widest"
              />
              <button 
                type="submit" 
                disabled={slotConfirmed || !input.trim()}
                className="absolute right-3 p-3 rounded-full bg-white text-black transition-all disabled:opacity-50"
              >
                <Send className="w-5 h-5" />
              </button>
            </form>
          </div>
        </div>

      </div>
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
