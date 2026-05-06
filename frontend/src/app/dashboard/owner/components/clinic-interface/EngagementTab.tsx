"use client";

import { motion } from "framer-motion";
import { Sparkles, Plus, FileText, Trash2, TrendingUp, Star } from "lucide-react";

interface EngagementTabProps {
  news: any[];
  setNews: (news: any[]) => void;
  reviews: any[];
  setReviews: (reviews: any[]) => void;
  handleFileUpload: (callback: (url: string) => void) => void;
}

export function EngagementTab({
  news,
  setNews,
  reviews,
  setReviews,
  handleFileUpload
}: EngagementTabProps) {
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
      {/* News Section */}
      <section className="bg-white border border-black/5 rounded-[2.5rem] p-10 shadow-sm space-y-8">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-black uppercase tracking-widest flex items-center gap-2"><Sparkles size={16} /> News & Broadcasts</h3>
          <button onClick={() => setNews([...news, { id: Date.now(), title: "New Announcement", desc: "Enter a brief description...", date: new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" }), photo: null }])} className="p-2 bg-black text-white rounded-full"><Plus size={16} /></button>
        </div>
        <div className="space-y-4">
          {news.map(n => (
            <div key={n.id} className="flex gap-6 p-6 bg-black/[0.02] rounded-[2rem] border border-black/5 items-center group hover:bg-black/5 transition-all">
              <div 
                onClick={() => handleFileUpload((url) => setNews(news.map(x => x.id === n.id ? {...x, photo: url} : x)))}
                className="w-20 h-20 rounded-2xl bg-black/5 border border-black/10 flex items-center justify-center cursor-pointer hover:bg-black/10 transition-all shrink-0 overflow-hidden"
              >
                {n.photo ? <img src={n.photo} alt="" className="w-full h-full object-cover" /> : <FileText size={20} className="text-black/20" />}
              </div>
              <div className="flex-1 space-y-1">
                <input type="text" value={n.title} onChange={(e) => setNews(news.map(x => x.id === n.id ? {...x, title: e.target.value} : x))} className="bg-transparent border-none text-sm font-black uppercase italic tracking-tighter w-full outline-none" />
                <textarea value={n.desc || ""} onChange={(e) => setNews(news.map(x => x.id === n.id ? {...x, desc: e.target.value} : x))} className="bg-transparent border-none text-[9px] font-bold text-black/40 w-full outline-none resize-none h-8" placeholder="Description..." />
                <input type="text" value={n.date} onChange={(e) => setNews(news.map(x => x.id === n.id ? {...x, date: e.target.value} : x))} className="bg-transparent border-none text-[8px] font-bold text-black/20 uppercase tracking-widest w-full outline-none" />
              </div>
              <button onClick={() => setNews(news.filter(x => x.id !== n.id))} className="opacity-0 group-hover:opacity-100 text-black/10 hover:text-red-500"><Trash2 size={16} /></button>
            </div>
          ))}
        </div>
      </section>

      {/* Reviews Section */}
      <section className="bg-white border border-black/5 rounded-[2.5rem] p-10 shadow-sm space-y-8">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-black uppercase tracking-widest flex items-center gap-2"><TrendingUp size={16} /> Patient Reviews</h3>
          <button onClick={() => setReviews([...reviews, { id: Date.now(), text: "New review text here...", author: "Patient", rating: 5 }])} className="p-2 bg-black text-white rounded-full"><Plus size={16} /></button>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {reviews.map(r => (
            <div key={r.id} className="p-6 bg-black/[0.02] rounded-[2rem] border border-black/5 space-y-3 group hover:bg-black/5 transition-all">
              <div className="flex gap-0.5 mb-1">
                {[1,2,3,4,5].map(s => (
                  <button key={s} onClick={() => setReviews(reviews.map(x => x.id === r.id ? {...x, rating: s} : x))}>
                    <Star size={14} fill={s <= (r.rating || 5) ? '#facc15' : 'none'} className={s <= (r.rating || 5) ? 'text-yellow-400' : 'text-black/10'} />
                  </button>
                ))}
              </div>
              <textarea value={r.text} onChange={(e) => setReviews(reviews.map(x => x.id === r.id ? {...x, text: e.target.value} : x))} className="bg-transparent border-none text-[10px] font-bold italic text-black/60 w-full resize-none outline-none h-16" />
              <div className="flex justify-between items-center">
                <input type="text" value={r.author} onChange={(e) => setReviews(reviews.map(x => x.id === r.id ? {...x, author: e.target.value} : x))} className="bg-transparent border-none text-[8px] font-black uppercase tracking-widest text-black/30 outline-none" />
                <button onClick={() => setReviews(reviews.filter(x => x.id !== r.id))} className="opacity-0 group-hover:opacity-100 text-black/10 hover:text-red-500"><Trash2 size={14} /></button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </motion.div>
  );
}
