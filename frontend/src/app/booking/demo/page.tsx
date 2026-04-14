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
      setMessages(prev => [...prev, { role: 'ai', text: `I understand you want to schedule based on: "${userMsg}". Let me check available slots...` }]);
      
      setTimeout(() => {
        setMessages(prev => [...prev, { role: 'ai', text: `Great! I've found an optimal slot next Tuesday at 10 AM. Should I lock this in using our concurrent booking system?` }]);
      }, 1500);
    }, 1000);
  };

  const confirmBooking = () => {
    setMessages(prev => [...prev, { role: 'user', text: "Yes, book it." }]);
    setTimeout(() => {
      setSlotConfirmed(true);
      setMessages(prev => [...prev, { role: 'ai', text: "Booking confirmed! You are all set for Tuesday at 10 AM. A calendar invite has been sent asynchronously." }]);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-[#09090b] text-zinc-50 flex items-center justify-center p-6 selection:bg-indigo-500/30">
      <div className="max-w-5xl w-full grid md:grid-cols-2 gap-8">
        
        {/* Left column: Branding & Context */}
        <div className="flex flex-col justify-center space-y-8">
          <div>
            <Link href="/" className="inline-block px-3 py-1 bg-zinc-900 border border-zinc-800 text-zinc-400 rounded-full text-sm mb-6 hover:text-white transition-colors">
              &larr; Back to Platform
            </Link>
            <h1 className="text-4xl font-bold tracking-tight mb-4">Sigma Consulting</h1>
            <p className="text-zinc-400 leading-relaxed text-lg mb-6">
              Welcome to our dynamic tenant portal. Experience natural language scheduling powered by our Server-Side AI.
            </p>
          </div>
          
          <div className="p-6 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-4">
            <h3 className="font-medium text-zinc-200 flex items-center gap-2">
              <CalendarIcon className="w-5 h-5 text-indigo-400" />
              Live Availability
            </h3>
            <div className="space-y-3">
              {[
                { time: "10:00 AM", status: slotConfirmed ? "Locked" : "Available", date: "Next Tuesday" },
                { time: "01:30 PM", status: "Available", date: "Next Tuesday" },
                { time: "09:00 AM", status: "Booked", date: "Next Wednesday" },
              ].map((slot, i) => (
                <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-zinc-950 border border-zinc-800/50">
                  <div className="flex items-center gap-3">
                    <Clock className="w-4 h-4 text-zinc-500" />
                    <div>
                      <p className="font-medium text-sm text-zinc-200">{slot.time}</p>
                      <p className="text-xs text-zinc-500">{slot.date}</p>
                    </div>
                  </div>
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-md ${
                    slot.status === 'Available' ? 'bg-indigo-500/10 text-indigo-400' :
                    slot.status === 'Locked' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                    'bg-zinc-800 text-zinc-500'
                  }`}>
                    {slot.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right column: Chatbot Interface */}
        <div className="flex flex-col bg-zinc-900 border border-zinc-800 rounded-3xl h-[600px] shadow-2xl relative overflow-hidden">
          <div className="p-4 border-b border-zinc-800 flex items-center gap-3 bg-zinc-950/50">
            <div className="w-10 h-10 rounded-full bg-indigo-500/20 flex items-center justify-center border border-indigo-500/30">
              <Bot className="w-5 h-5 text-indigo-400" />
            </div>
            <div>
              <h2 className="font-semibold text-zinc-100">AI Scheduling Assistant</h2>
              <p className="text-xs text-indigo-400">Powered by TinyLlama (1.1B)</p>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            <AnimatePresence>
              {messages.map((msg, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex gap-3 max-w-[85%] ${msg.role === 'user' ? 'ml-auto flex-row-reverse' : ''}`}
                >
                  <div className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center ${msg.role === 'user' ? 'bg-zinc-800' : 'bg-indigo-600'}`}>
                    {msg.role === 'user' ? <User className="w-4 h-4 text-zinc-400" /> : <Bot className="w-4 h-4 text-white" />}
                  </div>
                  <div className={`p-4 rounded-2xl text-sm leading-relaxed ${
                    msg.role === 'user' 
                      ? 'bg-zinc-800 text-zinc-200 rounded-tr-sm' 
                      : 'bg-zinc-950 border border-zinc-800 text-zinc-300 rounded-tl-sm'
                  }`}>
                    {msg.text}
                    {msg.role === 'ai' && idx === messages.length - 1 && msg.text.includes("optimal slot") && !slotConfirmed && (
                      <button 
                        onClick={confirmBooking}
                        className="mt-3 w-full py-2 bg-indigo-500 hover:bg-indigo-400 text-white rounded-lg font-medium transition-colors border border-indigo-400/50 shadow-lg shadow-indigo-500/20 flex items-center justify-center gap-2"
                      >
                        <CheckCircle2 className="w-4 h-4" /> Confirm Booking
                      </button>
                    )}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          <div className="p-4 bg-zinc-950/50 border-t border-zinc-800">
            <form onSubmit={handleSend} className="relative flex items-center">
              <input
                type="text"
                disabled={slotConfirmed}
                placeholder="E.g., 'I need a consult next Tuesday...'"
                value={input}
                onChange={e => setInput(e.target.value)}
                className="w-full bg-zinc-900 border border-zinc-800 text-sm rounded-full pl-5 pr-12 py-3 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 transition-all disabled:opacity-50"
              />
              <button 
                type="submit" 
                disabled={slotConfirmed || !input.trim()}
                className="absolute right-2 p-2 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white transition-colors disabled:opacity-50"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>

      </div>
    </div>
  );
}
