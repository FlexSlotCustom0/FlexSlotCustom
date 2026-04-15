"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  X, Save, RotateCcw, Layout, Users, ShoppingBag, 
  Settings, Phone, MapPin, Clock, Type, Palette, 
  Plus, Trash2, ChevronRight, Check, Image as ImageIcon,
  MessageSquare, HelpCircle, Sparkles, Rocket, CheckCircle2
} from "lucide-react";
import { useTemplateContext, Staff, Faq, Tip, Review } from "./TemplateContext";
import { HexColorPicker } from "react-colorful";

export const TemplateEditor: React.FC = () => {
  const { 
    shopData, setShopData, 
    staff, setStaff, 
    offerings, setOfferings,
    faqs, setFaqs,
    tips, setTips,
    reviews, setReviews,
    isEditorOpen, setIsEditorOpen,
    resetToDefault,
    publishClinic
  } = useTemplateContext();

  const [activeTab, setActiveTab] = useState<"branding" | "visuals" | "team" | "offerings" | "content">("branding");
  const [isPublishing, setIsPublishing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  if (!isEditorOpen) return null;

  const handlePublish = () => {
    setIsPublishing(true);
    setTimeout(() => {
      publishClinic();
      setIsPublishing(false);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    }, 1500);
  };

  const currentTemplateId = window.location.pathname.split("/").pop() || "";

  return (
    <AnimatePresence>
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
        className="fixed top-0 right-0 h-full w-full md:w-[450px] bg-white shadow-2xl z-[100] border-l border-gray-100 flex flex-col"
      >
        {/* Header */}
        <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-white sticky top-0 z-10">
          <div>
            <h2 className="text-xl font-bold flex items-center gap-2">
              <Settings className="w-5 h-5 text-gray-400" />
              Clinic Builder
            </h2>
            <p className="text-xs text-gray-400 font-medium">Customize your specialty clinic in real-time</p>
          </div>
          <button 
            onClick={() => setIsEditorOpen(false)}
            className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-50 px-2 bg-gray-50/50 overflow-x-auto no-scrollbar">
          <TabButton 
            active={activeTab === "branding"} 
            onClick={() => setActiveTab("branding")}
            icon={<Palette className="w-4 h-4" />}
            label="Style"
          />
          <TabButton 
            active={activeTab === "visuals"} 
            onClick={() => setActiveTab("visuals")}
            icon={<ImageIcon className="w-4 h-4" />}
            label="Visuals"
          />
          <TabButton 
            active={activeTab === "team"} 
            onClick={() => setActiveTab("team")}
            icon={<Users className="w-4 h-4" />}
            label="Doctors"
          />
          <TabButton 
            active={activeTab === "offerings"} 
            onClick={() => setActiveTab("offerings")}
            icon={<ShoppingBag className="w-4 h-4" />}
            label="Treatments"
          />
          <TabButton 
            active={activeTab === "content"} 
            onClick={() => setActiveTab("content")}
            icon={<MessageSquare className="w-4 h-4" />}
            label="Content"
          />
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-8 pb-32">
          {activeTab === "branding" && (
            <div className="space-y-6">
              <InputGroup label="Clinic Name">
                <input 
                  type="text" 
                  value={shopData.name} 
                  onChange={(e) => setShopData({ name: e.target.value })}
                  className="w-full p-3 rounded-xl border border-gray-100 focus:border-blue-600 outline-none transition-all font-medium text-sm shadow-sm"
                />
              </InputGroup>
              
              <InputGroup label="Tagline">
                <textarea 
                  value={shopData.tagline} 
                  onChange={(e) => setShopData({ tagline: e.target.value })}
                  className="w-full p-3 rounded-xl border border-gray-100 focus:border-blue-600 outline-none transition-all font-medium text-sm h-20 resize-none shadow-sm"
                />
              </InputGroup>

              <InputGroup label="Brand Primary Color">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-10 h-10 rounded-xl border border-gray-100 shadow-sm transition-transform hover:scale-110" 
                      style={{ backgroundColor: shopData.primaryColor }}
                    />
                    <code className="text-xs font-bold text-gray-400 uppercase tracking-widest">{shopData.primaryColor}</code>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-[2rem] flex justify-center border border-gray-100 shadow-inner">
                    <HexColorPicker color={shopData.primaryColor} onChange={(c) => setShopData({ primaryColor: c })} />
                  </div>
                </div>
              </InputGroup>
            </div>
          )}

          {activeTab === "visuals" && (
            <div className="space-y-6">
              <InputGroup label="Banner Image URL">
                <div className="space-y-3">
                   <input 
                    type="text" 
                    placeholder="https://images.unsplash.com/..."
                    value={shopData.bannerUrl || ""} 
                    onChange={(e) => setShopData({ bannerUrl: e.target.value })}
                    className="w-full p-3 rounded-xl border border-gray-100 focus:border-blue-600 outline-none transition-all font-medium text-xs shadow-sm"
                  />
                  <p className="text-[10px] text-gray-400 italic px-1">Tip: Use high-quality landscape photos for the clinic background.</p>
                  {shopData.bannerUrl && (
                    <div className="aspect-video w-full rounded-xl overflow-hidden border border-gray-100 shadow-sm relative group">
                      <img src={shopData.bannerUrl} alt="Banner Preview" className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                         <span className="text-white text-[10px] font-bold uppercase tracking-widest">Active Preview</span>
                      </div>
                    </div>
                  )}
                </div>
              </InputGroup>

              <InputGroup label="Clinic Logo">
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-2">
                    <span className="text-[10px] text-gray-400 font-bold uppercase px-1">Emoji Icon</span>
                    <input 
                      type="text" 
                      value={shopData.logo} 
                      onChange={(e) => setShopData({ logo: e.target.value })}
                      className="w-full p-3 rounded-xl border border-gray-100 focus:border-blue-600 outline-none transition-all font-medium text-2xl text-center shadow-sm"
                    />
                  </div>
                  <div className="space-y-2">
                    <span className="text-[10px] text-gray-400 font-bold uppercase px-1">Logo URL</span>
                     <input 
                      type="text" 
                      placeholder="PNG URL"
                      value={shopData.logoUrl || ""} 
                      onChange={(e) => setShopData({ logoUrl: e.target.value })}
                      className="w-full p-3 rounded-xl border border-gray-100 focus:border-blue-600 outline-none transition-all font-medium text-xs h-[54px] shadow-sm"
                    />
                  </div>
                </div>
              </InputGroup>
            </div>
          )}

          {activeTab === "team" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-black tracking-widest uppercase text-gray-400">Practitioners</h3>
                <button 
                  onClick={() => setStaff([...staff, { name: "Dr. New", role: "Specialist", avatar: "👨‍⚕️" }])}
                  className="p-2 bg-blue-600 text-white rounded-xl hover:scale-105 transition-all shadow-lg"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
              
              <div className="space-y-4">
                {staff.map((s, i) => (
                  <div key={i} className="p-4 bg-gray-50 border border-gray-100 rounded-[2rem] space-y-4 shadow-sm hover:border-blue-200 transition-colors">
                    <div className="flex items-center gap-3">
                       <div className="relative group">
                        {s.imageUrl ? (
                          <img src={s.imageUrl} className="w-12 h-12 rounded-2xl object-cover border border-gray-200 shadow-sm" />
                        ) : (
                          <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-xl border border-gray-200 shadow-sm">{s.avatar}</div>
                        )}
                        <input 
                          className="absolute inset-0 opacity-0 cursor-pointer"
                          title="Change Emoji"
                          value={s.avatar}
                          onChange={(e) => {
                            const next = [...staff];
                            next[i].avatar = e.target.value;
                            setStaff(next);
                          }}
                        />
                      </div>
                      <div className="flex-1">
                        <input 
                          className="w-full bg-transparent font-bold text-sm outline-none border-b border-transparent focus:border-blue-200"
                          value={s.name}
                          onChange={(e) => {
                            const next = [...staff];
                            next[i].name = e.target.value;
                            setStaff(next);
                          }}
                        />
                        <input 
                          className="w-full bg-transparent text-xs text-blue-600/60 font-medium outline-none border-b border-transparent focus:border-blue-200"
                          value={s.role}
                          onChange={(e) => {
                            const next = [...staff];
                            next[i].role = e.target.value;
                            setStaff(next);
                          }}
                        />
                      </div>
                      <button 
                        onClick={() => setStaff(staff.filter((_, idx) => idx !== i))}
                        className="p-2 text-gray-300 hover:text-red-500 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="space-y-2">
                       <label className="text-[9px] font-black uppercase tracking-widest text-gray-400 px-1">Professional Photo URL</label>
                       <input 
                        className="w-full p-2 bg-white border border-gray-100 rounded-xl text-[10px] font-medium focus:border-blue-600 outline-none"
                        placeholder="https://..."
                        value={s.imageUrl || ""}
                        onChange={(e) => {
                          const next = [...staff];
                          next[i].imageUrl = e.target.value;
                          setStaff(next);
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "offerings" && (
            <div className="space-y-6">
               <div className="flex items-center justify-between">
                <h3 className="text-sm font-black tracking-widest uppercase text-gray-400">Treatment Registry</h3>
                <button 
                  onClick={() => setOfferings([...offerings, { label: "New Specialty", services: [] }])}
                  className="p-2 bg-blue-600 text-white rounded-xl hover:scale-105 transition-all shadow-lg"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              {offerings.map((cat, catIdx) => (
                <div key={catIdx} className="space-y-3 p-5 bg-gray-50 border border-gray-100 rounded-[2.5rem] shadow-sm">
                  <div className="flex items-center justify-between mb-2">
                    <input 
                      className="font-bold text-base bg-transparent border-b border-transparent focus:border-blue-200 outline-none"
                      value={cat.label || cat.name || "Category"}
                      onChange={(e) => {
                        const next = [...offerings];
                        if (next[catIdx].label) next[catIdx].label = e.target.value;
                        else next[catIdx].name = e.target.value;
                        setOfferings(next);
                      }}
                    />
                    <button 
                      onClick={() => setOfferings(offerings.filter((_, i) => i !== catIdx))}
                      className="p-2 text-gray-300 hover:text-red-500 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  {cat.services && cat.services.map((svc: any, svcIdx: number) => (
                    <div key={svcIdx} className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm space-y-2 group">
                      <div className="flex items-center gap-2">
                         <input 
                          className="flex-1 font-bold text-xs outline-none"
                          value={svc.name}
                          onChange={(e) => {
                            const next = [...offerings];
                            next[catIdx].services[svcIdx].name = e.target.value;
                            setOfferings(next);
                          }}
                        />
                        <input 
                          className="w-16 text-right font-black text-xs text-blue-600"
                          style={{ color: shopData.primaryColor }}
                          value={svc.price}
                          onChange={(e) => {
                            const next = [...offerings];
                            next[catIdx].services[svcIdx].price = e.target.value;
                            setOfferings(next);
                          }}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <input 
                          className="text-[10px] text-gray-400 font-medium w-full bg-transparent border-b border-transparent focus:border-gray-100"
                          value={svc.duration}
                          onChange={(e) => {
                            const next = [...offerings];
                            next[catIdx].services[svcIdx].duration = e.target.value;
                            setOfferings(next);
                          }}
                        />
                        <button 
                          onClick={() => {
                            const next = [...offerings];
                            next[catIdx].services = next[catIdx].services.filter((_: any, i: number) => i !== svcIdx);
                            setOfferings(next);
                          }}
                          className="text-gray-200 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  ))}

                  <button 
                    onClick={() => {
                      const next = [...offerings];
                      if (!next[catIdx].services) next[catIdx].services = [];
                      next[catIdx].services.push({ name: "New Procedure", price: "$0", duration: "30 min" });
                      setOfferings(next);
                    }}
                    className="w-full py-3 border-2 border-dashed border-gray-200 rounded-2xl text-[10px] font-black uppercase tracking-widest text-gray-300 hover:border-blue-200 hover:text-blue-400 transition-all flex items-center justify-center gap-2"
                  >
                    <Plus className="w-3 h-3" /> Add Procedure
                  </button>
                </div>
              ))}
            </div>
          )}

          {activeTab === "content" && (
            <div className="space-y-10">
               {/* FAQs or Tips based on template */}
               <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-black tracking-widest uppercase text-gray-400">
                      {currentTemplateId === 'vet-warm' ? 'Pet Care Tips' : 'Clinical FAQs'}
                    </h3>
                    <button 
                      onClick={() => {
                        if (currentTemplateId === 'vet-warm') {
                           setTips([...tips, { title: "New Tip", tip: "Tip content" }]);
                        } else {
                           setFaqs([...faqs, { q: "New Question", a: "New Answer" }]);
                        }
                      }}
                      className="p-2 bg-blue-600 text-white rounded-xl hover:scale-105 transition-all shadow-lg"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="space-y-3">
                    {currentTemplateId === 'vet-warm' ? tips.map((t, i) => (
                      <div key={i} className="p-4 bg-gray-50 border border-gray-100 rounded-2xl space-y-2">
                        <div className="flex items-center justify-between">
                          <input 
                            className="font-bold text-xs bg-transparent border-b border-transparent focus:border-blue-200 outline-none w-full"
                            value={t.title}
                            onChange={(e) => {
                              const next = [...tips];
                              next[i].title = e.target.value;
                              setTips(next);
                            }}
                          />
                          <button onClick={() => setTips(tips.filter((_, idx) => idx !== i))} className="text-gray-300 hover:text-red-500 transition-colors">
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                        <textarea 
                          className="w-full bg-transparent text-[10px] text-gray-500 font-medium outline-none h-12 resize-none"
                          value={t.tip}
                          onChange={(e) => {
                            const next = [...tips];
                            next[i].tip = e.target.value;
                            setTips(next);
                          }}
                        />
                      </div>
                    )) : faqs.map((f, i) => (
                      <div key={i} className="p-4 bg-gray-50 border border-gray-100 rounded-2xl space-y-2">
                        <div className="flex items-center justify-between">
                          <input 
                            className="font-bold text-xs bg-transparent border-b border-transparent focus:border-blue-200 outline-none w-full"
                            value={f.q}
                            onChange={(e) => {
                              const next = [...faqs];
                              next[i].q = e.target.value;
                              setFaqs(next);
                            }}
                          />
                          <button onClick={() => setFaqs(faqs.filter((_, idx) => idx !== i))} className="text-gray-300 hover:text-red-500 transition-colors">
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                        <textarea 
                          className="w-full bg-transparent text-[10px] text-gray-500 font-medium outline-none h-12 resize-none"
                          value={f.a}
                          onChange={(e) => {
                            const next = [...faqs];
                            next[i].a = e.target.value;
                            setFaqs(next);
                          }}
                        />
                      </div>
                    ))}
                  </div>
               </div>

               {/* Reviews */}
               <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-black tracking-widest uppercase text-gray-400">Patient Reviews</h3>
                    <button 
                      onClick={() => setReviews([...reviews, { name: "Client Name", text: "Great experience!", rating: 5 }])}
                      className="p-2 bg-blue-600 text-white rounded-xl hover:scale-105 transition-all shadow-lg"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="space-y-3">
                    {reviews.map((r, i) => (
                      <div key={i} className="p-4 bg-gray-50/50 border border-gray-100 rounded-2xl space-y-2">
                         <div className="flex items-center justify-between">
                            <input 
                              className="font-bold text-xs bg-transparent outline-none"
                              value={r.name}
                              onChange={(e) => {
                                const next = [...reviews];
                                next[i].name = e.target.value;
                                setReviews(next);
                              }}
                            />
                            <div className="flex items-center gap-1">
                               <Sparkles className="w-3 h-3 text-yellow-400" />
                               <span className="text-[10px] font-bold">{r.rating}</span>
                            </div>
                         </div>
                         <textarea 
                            className="w-full bg-transparent text-[10px] text-gray-400 font-medium outline-none italic h-12"
                            value={r.text}
                             onChange={(e) => {
                              const next = [...reviews];
                              next[i].text = e.target.value;
                              setReviews(next);
                            }}
                         />
                         <button onClick={() => setReviews(reviews.filter((_, idx) => idx !== i))} className="w-full text-[9px] font-bold text-red-300 hover:text-red-500 transition-colors uppercase tracking-[0.2em] mt-1 text-right">Delete Review</button>
                      </div>
                    ))}
                  </div>
               </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-100 bg-white grid gap-3">
          <button 
            onClick={handlePublish}
            disabled={isPublishing || showSuccess}
            className={`w-full py-4 rounded-2xl font-black text-xs uppercase tracking-widest shadow-2xl transition-all duration-500 overflow-hidden relative flex items-center justify-center gap-2 ${
              showSuccess ? 'bg-emerald-500 text-white' : 'bg-black text-white hover:bg-gray-800'
            }`}
          >
            {isPublishing ? (
              <div className="flex gap-1">
                <div className="w-1.5 h-1.5 bg-white rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <div className="w-1.5 h-1.5 bg-white rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <div className="w-1.5 h-1.5 bg-white rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            ) : showSuccess ? (
              <>
                <CheckCircle2 className="w-4 h-4" /> Clinic Published
              </>
            ) : (
              <>
                <Rocket className="w-4 h-4" /> Go Live & Publish
              </>
            )}
          </button>
          
          <div className="flex items-center gap-3">
            <button 
              onClick={() => {
                if (confirm("Reset all customizations? This will restore global clinical defaults.")) {
                  resetToDefault(currentTemplateId);
                }
              }}
              className="flex-1 py-3 px-4 rounded-xl border border-gray-100 font-bold text-xs text-gray-400 hover:bg-gray-50 transition-all flex items-center justify-center gap-2"
            >
              <RotateCcw className="w-3 h-3" /> Reset
            </button>
            <button 
              onClick={() => setIsEditorOpen(false)}
              className="flex-1 py-3 px-4 rounded-xl text-white font-bold text-xs shadow-xl hover:scale-[1.02] transition-all flex items-center justify-center gap-2"
              style={{ backgroundColor: shopData.primaryColor }}
            >
              <Check className="w-3 h-3" /> Apply Styles
            </button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

const TabButton: React.FC<{ active: boolean; onClick: () => void; icon: React.ReactNode; label: string }> = ({ active, onClick, icon, label }) => (
  <button 
    onClick={onClick}
    className={`flex-none px-6 py-4 flex flex-col items-center gap-1 transition-all relative ${active ? "text-blue-600" : "text-gray-400 hover:text-gray-600"}`}
  >
    {icon}
    <span className="text-[9px] font-black uppercase tracking-widest">{label}</span>
    {active && (
      <motion.div 
        layoutId="activeTab"
        className="absolute bottom-0 left-4 right-4 h-1 bg-blue-600 rounded-t-full"
      />
    )}
  </button>
);

const InputGroup: React.FC<{ label: string; children: React.ReactNode }> = ({ label, children }) => (
  <div className="space-y-2">
    <label className="text-[10px] font-black uppercase tracking-widest text-gray-300 px-1">{label}</label>
    {children}
  </div>
);
