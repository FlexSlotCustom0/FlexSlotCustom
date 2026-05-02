"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, Send, User, Calendar, Clock, CheckCircle2, Loader2, Sparkles, X } from "lucide-react";
import { createClient } from "@/utils/supabase/client";

interface Message {
  role: 'ai' | 'user';
  text: string;
  type?: 'booking_confirm' | 'text';
  data?: any;
}

export function AIBookingSystem({ tenantId, isOpen, onClose }: { tenantId: string, isOpen: boolean, onClose: () => void }) {
  const supabase = createClient();
  const [messages, setMessages] = useState<Message[]>([
    { role: 'ai', text: 'Hello! I am your AI clinical assistant. How can I help you today? You can say things like "Book a checkup for tomorrow morning".' }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [services, setServices] = useState<any[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (tenantId) fetchServices();
  }, [tenantId]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const fetchServices = async () => {
    const { data } = await supabase.from("services").select("*").eq("tenant_id", tenantId);
    if (data) setServices(data);
  };

  const fetchBookedTimes = async () => {
    const { data } = await supabase.from("bookings").select("booking_date, booking_time").eq("tenant_id", tenantId);
    return data || [];
  };

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isTyping) return;

    const userText = input;
    setInput("");
    setMessages(prev => [...prev, { role: 'user', text: userText }]);
    setIsTyping(true);

    try {
      const bookedTimes = await fetchBookedTimes();
      const response = await fetch("/api/ai", {
        method: "POST",
        body: JSON.stringify({ prompt: userText, services, bookedTimes })
      });
      const aiData = await response.json();

      if (aiData.intent === "BOOKING") {
        const service = services.find(s => s.id === aiData.service_id) || services[0];
        setMessages(prev => [...prev, { 
          role: 'ai', 
          text: `I found a slot for ${service.name} on ${aiData.date} at ${aiData.time}. Should I book this for you?`,
          type: 'booking_confirm',
          data: { ...aiData, service_name: service.name, service_id: service.id }
        }]);
      } else {
        setMessages(prev => [...prev, { role: 'ai', text: "I understand. Is there anything specific about the timing or service you'd like to book?" }]);
      }
    } catch (error) {
      setMessages(prev => [...prev, { role: 'ai', text: "Sorry, I'm having trouble processing that right now." }]);
    } finally {
      setIsTyping(false);
    }
  };

  const confirmBooking = async (data: any) => {
    setIsTyping(true);
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
       setMessages(prev => [...prev, { role: 'ai', text: "Please sign in to complete your booking." }]);
       setIsTyping(false);
       return;
    }

    // Check for conflicting bookings
    const { data: existingBookings, error: checkError } = await supabase
      .from("bookings")
      .select("id")
      .eq("tenant_id", tenantId)
      .eq("booking_date", data.date)
      .eq("booking_time", data.time);

    if (checkError) {
      setMessages(prev => [...prev, { role: 'ai', text: "Error verifying slot availability." }]);
      setIsTyping(false);
      return;
    }

    if (existingBookings && existingBookings.length > 0) {
      setMessages(prev => [...prev, { role: 'ai', text: `I apologize, but ${data.time} on ${data.date} is already booked. Please suggest an alternative time.` }]);
      setIsTyping(false);
      return;
    }

    const { error } = await supabase.from("bookings").insert({
      tenant_id: tenantId,
      customer_id: user.id,
      service_id: data.service_id,
      booking_date: data.date,
      booking_time: data.time,
      status: 'PENDING'
    });

    if (error) {
      setMessages(prev => [...prev, { role: 'ai', text: "Failed to book: " + error.message }]);
    } else {
      setMessages(prev => [...prev, { role: 'ai', text: "Success! Your appointment is confirmed. Check your dashboard for details." }]);
    }
    setIsTyping(false);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="absolute inset-0 bg-black/60 backdrop-blur-md" />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="bg-white w-full max-w-2xl rounded-[3rem] shadow-2xl overflow-hidden flex flex-col h-[700px] relative z-10 border border-white/20"
          >
            {/* Header */}
            <div className="p-8 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-black flex items-center justify-center text-white shadow-lg">
                  <Bot className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="font-bold text-xl tracking-tight">AI Health Assistant</h2>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                    <span className="text-[10px] uppercase font-black tracking-widest text-gray-400">Powered by Llama 3</span>
                  </div>
                </div>
              </div>
              <button onClick={onClose} className="p-3 hover:bg-gray-100 rounded-full transition-colors">
                <X className="w-6 h-6 text-gray-300" />
              </button>
            </div>

            {/* Chat Body */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-8 space-y-8 scrollbar-hide">
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
                >
                  <div className={`w-10 h-10 rounded-2xl flex-shrink-0 flex items-center justify-center ${msg.role === 'user' ? 'bg-gray-100' : 'bg-black text-white shadow-lg'}`}>
                    {msg.role === 'user' ? <User className="w-5 h-5 text-gray-400" /> : <Bot className="w-5 h-5" />}
                  </div>
                  <div className={`max-w-[80%] p-6 rounded-[2rem] text-sm leading-relaxed ${
                    msg.role === 'user' 
                      ? 'bg-black text-white font-medium rounded-tr-sm' 
                      : 'bg-gray-50 text-gray-700 rounded-tl-sm'
                  }`}>
                    {msg.text}
                    
                    {msg.type === 'booking_confirm' && (
                      <div className="mt-6 p-4 bg-white rounded-2xl border border-gray-100 shadow-sm space-y-4">
                        <div className="flex items-center gap-3 text-xs font-bold text-gray-500">
                          <Calendar className="w-4 h-4" /> {msg.data.date}
                          <Clock className="w-4 h-4 ml-2" /> {msg.data.time}
                        </div>
                        <button 
                          onClick={() => confirmBooking(msg.data)}
                          className="w-full py-3 bg-emerald-500 text-white rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-emerald-600 transition-all flex items-center justify-center gap-2"
                        >
                          <CheckCircle2 className="w-4 h-4" /> Confirm & Book
                        </button>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
              {isTyping && (
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-2xl bg-black flex items-center justify-center text-white"><Bot className="w-5 h-5" /></div>
                  <div className="bg-gray-50 p-6 rounded-[2rem] rounded-tl-sm flex items-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin text-gray-400" />
                    <span className="text-xs text-gray-400 italic">Analysing your clinical intent...</span>
                  </div>
                </div>
              )}
            </div>

            {/* Input Footer */}
            <div className="p-8 bg-white border-t border-gray-100">
              <form onSubmit={handleSend} className="relative flex items-center">
                <input
                  type="text"
                  placeholder="Ask me anything..."
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-100 rounded-full pl-8 pr-16 py-5 text-sm focus:outline-none focus:ring-2 focus:ring-black/5 transition-all"
                />
                <button 
                  type="submit" 
                  disabled={!input.trim() || isTyping}
                  className="absolute right-3 p-4 rounded-full bg-black text-white hover:scale-105 transition-all disabled:opacity-20"
                >
                  <Send className="w-5 h-5" />
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
