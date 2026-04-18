"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Scissors, Stethoscope, SprayCan, ArrowRight } from "lucide-react";

const templates = [
  {
    category: "Medical & Healthcare",
    icon: <Stethoscope className="w-5 h-5" />,
    color: "from-blue-500 to-cyan-600",
    bg: "bg-blue-50",
    items: [
      {
        name: "Clinic Clean",
        slug: "clinic-clean",
        desc: "Minimal and trustworthy. For private practices, dentists, and specialists.",
      },
      {
        name: "Vet Warm",
        slug: "vet-warm",
        desc: "Friendly and approachable. Designed for veterinary clinics and pet care.",
      },
    ],
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] as any },
  }),
};

export default function TemplatesPage() {
  return (
    <div className="min-h-screen bg-white text-black font-sans">
      {/* Header */}
      <nav className="fixed w-full z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-7 h-7 bg-blue-600 rounded-md flex items-center justify-center">
              <Stethoscope className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-lg">FlexSlot Custom</span>
          </Link>
          <Link
            href="/"
            className="text-sm font-medium text-gray-500 hover:text-black transition-colors"
          >
            ← Back to Home
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-16 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h4 className="text-gray-400 font-bold text-xs tracking-widest uppercase mb-3">
            Clinic Template Gallery
          </h4>
          <h1 className="text-5xl md:text-7xl font-serif tracking-tight mb-6">
            Build your medical presence.
          </h1>
          <p className="text-lg md:text-xl text-gray-500 font-medium max-w-xl mx-auto leading-relaxed">
            Choose a professional template tailored for private practices and veterinary clinics.
            Customize everything in real-time.
          </p>
        </motion.div>
      </section>

      {/* Categories */}
      <section className="pb-32 max-w-6xl mx-auto px-6 space-y-20">
        {templates.map((cat, catIdx) => (
          <motion.div
            key={cat.category}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
          >
            {/* Category Header */}
            <motion.div
              custom={0}
              variants={fadeUp}
              className="flex items-center gap-3 mb-8"
            >
              <div
                className={`w-10 h-10 rounded-2xl ${cat.bg} flex items-center justify-center text-gray-700`}
              >
                {cat.icon}
              </div>
              <h2 className="text-2xl font-bold tracking-tight">
                {cat.category}
              </h2>
            </motion.div>

            {/* Template Cards */}
            <div className="grid md:grid-cols-2 gap-6">
              {cat.items.map((tmpl, i) => (
                <motion.div key={tmpl.slug} custom={i + 1} variants={fadeUp}>
                  <Link href={`/templates/${tmpl.slug}`}>
                    <div className="group relative rounded-3xl border border-gray-100 bg-gray-50 overflow-hidden hover:shadow-xl transition-all duration-500 hover:-translate-y-1">
                      {/* Preview Gradient Banner */}
                      <div
                        className={`h-44 bg-gradient-to-br ${cat.color} relative overflow-hidden`}
                      >
                        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMSIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjEpIi8+PC9zdmc+')] opacity-60" />
                        <div className="absolute bottom-4 left-6">
                          <span className="bg-white/20 backdrop-blur-md text-white text-xs font-bold px-3 py-1.5 rounded-full">
                            {tmpl.name}
                          </span>
                        </div>
                        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <div className="bg-white/20 backdrop-blur-md rounded-full p-2">
                            <ArrowRight className="w-4 h-4 text-white" />
                          </div>
                        </div>
                      </div>

                      {/* Info */}
                      <div className="p-6">
                        <h3 className="text-lg font-bold mb-1">{tmpl.name}</h3>
                        <p className="text-sm text-gray-500 font-medium leading-relaxed">
                          {tmpl.desc}
                        </p>
                        <div className="mt-4 flex items-center gap-2 text-xs font-bold text-gray-400 group-hover:text-black transition-colors">
                          <span>Preview template</span>
                          <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}
      </section>
    </div>
  );
}
