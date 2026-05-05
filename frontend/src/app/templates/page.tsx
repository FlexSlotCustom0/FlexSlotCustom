"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Stethoscope, ArrowRight, Sparkles, Activity, ShieldCheck, Zap } from "lucide-react";
import { useState, useEffect } from "react";
import { useTemplateContext } from "@/components/TemplateContext";
import { useRouter } from "next/navigation";

interface Template {
  id: string;
  name: string;
  description: string;
  default_ui_config: any;
}

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] as any },
  }),
};

export default function TemplatesPage() {
  const [apiTemplates, setApiTemplates] = useState<Template[]>([]);
  const [loading, setLoading] = useState(true);
  const { selectTemplate } = useTemplateContext();
  const router = useRouter();

  useEffect(() => {
    async function fetchTemplates() {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/templates`);
        if (!res.ok) throw new Error("Failed to fetch templates");
        const data = await res.json();
        setApiTemplates(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchTemplates();
  }, []);

  const handleSelect = async (templateId: string) => {
    await selectTemplate(templateId);
    // Usually redirect to dashboard or customize mode
    router.push(`/templates/${templateId}?manage=true`);
  };

  return (
    <div className="min-h-screen bg-[#0A0A0B] text-white font-sans selection:bg-maroon-500/30">
      {/* Header */}
      <nav className="fixed w-full z-50 bg-black/60 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-white text-black rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
              <Zap className="w-5 h-5 fill-current" />
            </div>
            <span className="font-black text-lg tracking-tighter uppercase italic">FlexSlot <span className="text-white/40 not-italic font-medium">Sigma</span></span>
          </Link>
          <div className="flex items-center gap-6">
             <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40">Enterprise Grade</span>
             <div className="h-4 w-px bg-white/10" />
             <Link href="/" className="text-xs font-bold hover:text-white transition-colors text-white/60">Dashboard</Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-40 pb-20 text-center relative overflow-hidden">
        {/* Sigma Background Elements */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-maroon-900/20 blur-[120px] -z-10 rounded-full" />
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative z-10"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-6">
            <ShieldCheck className="w-3.5 h-3.5 text-maroon-500" />
            <span className="text-[10px] font-black uppercase tracking-widest text-white/60">Multi-Tenant Engine v2.0</span>
          </div>
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-8 uppercase italic leading-[0.9]">
            The Sigma <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-maroon-600 to-white">Standard.</span>
          </h1>
          <p className="text-lg md:text-xl text-white/50 font-medium max-w-2xl mx-auto leading-relaxed mb-10">
            Select a high-performance template for your clinic. Engineered for high-concurrency 
            and maximum tenant flexibility.
          </p>
        </motion.div>
      </section>

      {/* Grid */}
      <section className="pb-32 max-w-7xl mx-auto px-6">
        {loading ? (
          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-[400px] rounded-3xl bg-white/5 animate-pulse border border-white/10" />
            ))}
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-8">
            {apiTemplates.map((tmpl, i) => (
              <motion.div 
                key={tmpl.id} 
                custom={i} 
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                className="group cursor-pointer"
                onClick={() => handleSelect(tmpl.id)}
              >
                <div className="relative h-full rounded-[2rem] bg-[#111112] border border-white/10 overflow-hidden hover:border-maroon-500/50 transition-all duration-500 hover:shadow-[0_0_40px_-10px_rgba(128,0,0,0.3)]">
                  {/* Visual Preview */}
                  <div className="h-48 relative overflow-hidden">
                    <div className={`absolute inset-0 bg-gradient-to-br ${i === 0 ? 'from-maroon-900 to-black' : i === 1 ? 'from-zinc-900 to-black' : 'from-stone-900 to-black'}`} />
                    <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
                    <div className="absolute top-6 left-6 p-3 rounded-2xl bg-black/40 backdrop-blur-md border border-white/10">
                      {i === 0 ? <Activity className="w-6 h-6 text-maroon-500" /> : i === 1 ? <Stethoscope className="w-6 h-6 text-maroon-500" /> : <Sparkles className="w-6 h-6 text-maroon-500" />}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-8">
                    <div className="flex items-center justify-between mb-4">
                       <h3 className="text-2xl font-black italic uppercase tracking-tight">{tmpl.name}</h3>
                       <div className="w-2 h-2 rounded-full bg-maroon-500 shadow-[0_0_10px_rgba(128,0,0,0.8)]" />
                    </div>
                    <p className="text-white/40 text-sm font-medium leading-relaxed mb-8">
                      {tmpl.description}
                    </p>
                    
                    <div className="flex items-center justify-between">
                       <div className="flex -space-x-2">
                          {[1, 2, 3].map(j => (
                            <div key={j} className="w-6 h-6 rounded-full border-2 border-[#111112] bg-white/10" />
                          ))}
                          <div className="w-6 h-6 rounded-full border-2 border-[#111112] bg-maroon-900 flex items-center justify-center text-[8px] font-bold">+24</div>
                       </div>
                       <button className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-maroon-500 group-hover:gap-4 transition-all">
                          Select Engine <ArrowRight className="w-4 h-4" />
                       </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </section>

      <style jsx global>{`
        .selection\:bg-maroon-500\/30 ::selection {
          background-color: rgba(128, 0, 0, 0.3);
        }
      `}</style>
    </div>
  );
}

}
