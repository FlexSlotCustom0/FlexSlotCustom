"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  X, Save, RotateCcw, Layout, Users, ShoppingBag, 
  Settings, Phone, MapPin, Clock, Type, Palette, 
  Plus, Trash2, ChevronRight, Check
} from "lucide-react";
import { useTemplateContext, Staff, Service } from "./TemplateContext";
import { HexColorPicker } from "react-colorful";
import { useForm } from "react-hook-form";

export const TemplateEditor: React.FC = () => {
  const { 
    shopData, setShopData, 
    staff, setStaff, 
    offerings, setOfferings,
    isEditorOpen, setIsEditorOpen,
    resetToDefault
  } = useTemplateContext();

  const [activeTab, setActiveTab] = useState<"branding" | "presence" | "team" | "offerings">("branding");

  if (!isEditorOpen) return null;

  const currentTemplateId = window.location.pathname.split("/").pop() || "";

  return (
    <AnimatePresence>
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
        className="fixed top-0 right-0 h-full w-full md:w-[400px] bg-white shadow-2xl z-[100] border-l border-gray-100 flex flex-col"
      >
        {/* Header */}
        <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-white sticky top-0 z-10">
          <div>
            <h2 className="text-xl font-bold flex items-center gap-2">
              <Settings className="w-5 h-5 text-gray-400" />
              Shop Builder
            </h2>
            <p className="text-xs text-gray-400 font-medium">Customize your storefront in real-time</p>
          </div>
          <button 
            onClick={() => setIsEditorOpen(false)}
            className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-50 px-2 bg-gray-50/50">
          <TabButton 
            active={activeTab === "branding"} 
            onClick={() => setActiveTab("branding")}
            icon={<Palette className="w-4 h-4" />}
            label="Style"
          />
          <TabButton 
            active={activeTab === "presence"} 
            onClick={() => setActiveTab("presence")}
            icon={<MapPin className="w-4 h-4" />}
            label="Info"
          />
          <TabButton 
            active={activeTab === "team"} 
            onClick={() => setActiveTab("team")}
            icon={<Users className="w-4 h-4" />}
            label="Team"
          />
          <TabButton 
            active={activeTab === "offerings"} 
            onClick={() => setActiveTab("offerings")}
            icon={<ShoppingBag className="w-4 h-4" />}
            label="Services"
          />
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-8 pb-32">
          {activeTab === "branding" && (
            <div className="space-y-6">
              <InputGroup label="Shop Name">
                <input 
                  type="text" 
                  value={shopData.name} 
                  onChange={(e) => setShopData({ name: e.target.value })}
                  className="w-full p-3 rounded-xl border border-gray-100 focus:border-black outline-none transition-all font-medium text-sm"
                />
              </InputGroup>
              
              <InputGroup label="Tagline">
                <textarea 
                  value={shopData.tagline} 
                  onChange={(e) => setShopData({ tagline: e.target.value })}
                  className="w-full p-3 rounded-xl border border-gray-100 focus:border-black outline-none transition-all font-medium text-sm h-20 resize-none"
                />
              </InputGroup>

              <InputGroup label="Primary Brand Color">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-10 h-10 rounded-xl border border-gray-100 shadow-sm" 
                      style={{ backgroundColor: shopData.primaryColor }}
                    />
                    <code className="text-xs font-bold text-gray-400 uppercase tracking-widest">{shopData.primaryColor}</code>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-[2rem] flex justify-center border border-gray-100">
                    <HexColorPicker color={shopData.primaryColor} onChange={(c) => setShopData({ primaryColor: c })} />
                  </div>
                </div>
              </InputGroup>

              <InputGroup label="Logo Emoji/Icon">
                <input 
                  type="text" 
                  value={shopData.logo} 
                  onChange={(e) => setShopData({ logo: e.target.value })}
                  className="w-full p-3 rounded-xl border border-gray-100 focus:border-black outline-none transition-all font-medium text-3xl text-center"
                />
              </InputGroup>
            </div>
          )}

          {activeTab === "presence" && (
            <div className="space-y-6">
              <InputGroup label="Address">
                <input 
                  type="text" 
                  value={shopData.address} 
                  onChange={(e) => setShopData({ address: e.target.value })}
                  className="w-full p-3 rounded-xl border border-gray-100 focus:border-black outline-none transition-all font-medium text-sm"
                />
              </InputGroup>
              <InputGroup label="Phone Number">
                <input 
                  type="text" 
                  value={shopData.phone} 
                  onChange={(e) => setShopData({ phone: e.target.value })}
                  className="w-full p-3 rounded-xl border border-gray-100 focus:border-black outline-none transition-all font-medium text-sm"
                />
              </InputGroup>
              <InputGroup label="Business Hours">
                <input 
                  type="text" 
                  value={shopData.hours} 
                  onChange={(e) => setShopData({ hours: e.target.value })}
                  className="w-full p-3 rounded-xl border border-gray-100 focus:border-black outline-none transition-all font-medium text-sm"
                />
              </InputGroup>
              <InputGroup label="Instagram @">
                <input 
                  type="text" 
                  value={shopData.instagram} 
                  onChange={(e) => setShopData({ instagram: e.target.value })}
                  className="w-full p-3 rounded-xl border border-gray-100 focus:border-black outline-none transition-all font-medium text-sm"
                />
              </InputGroup>
            </div>
          )}

          {activeTab === "team" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-black tracking-widest uppercase text-gray-400">Manage Staff</h3>
                <button 
                  onClick={() => setStaff([...staff, { name: "New Staff", role: "Role", avatar: "👤" }])}
                  className="p-2 bg-black text-white rounded-xl hover:scale-105 transition-all shadow-sm"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
              
              <div className="space-y-3">
                {staff.map((s, i) => (
                  <div key={i} className="p-4 bg-gray-50 border border-gray-100 rounded-2xl space-y-3">
                    <div className="flex items-center gap-3">
                      <input 
                        className="w-10 h-10 bg-white rounded-xl text-center text-xl border border-gray-100"
                        value={s.avatar}
                        onChange={(e) => {
                          const next = [...staff];
                          next[i].avatar = e.target.value;
                          setStaff(next);
                        }}
                      />
                      <div className="flex-1">
                        <input 
                          className="w-full bg-transparent font-bold text-sm outline-none border-b border-transparent focus:border-gray-200"
                          value={s.name}
                          onChange={(e) => {
                            const next = [...staff];
                            next[i].name = e.target.value;
                            setStaff(next);
                          }}
                        />
                        <input 
                          className="w-full bg-transparent text-xs text-gray-400 font-medium outline-none border-b border-transparent focus:border-gray-200"
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
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "offerings" && (
            <div className="space-y-6">
               <div className="flex items-center justify-between">
                <h3 className="text-sm font-black tracking-widest uppercase text-gray-400">Service Categories</h3>
                <button 
                  onClick={() => setOfferings([...offerings, { label: "New Category", services: [] }])}
                  className="p-2 bg-black text-white rounded-xl hover:scale-105 transition-all shadow-sm"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              {offerings.map((cat, catIdx) => (
                <div key={catIdx} className="space-y-3 p-4 bg-gray-50 border border-gray-100 rounded-3xl">
                  <div className="flex items-center justify-between mb-2">
                    <input 
                      className="font-bold text-base bg-transparent border-b border-transparent focus:border-gray-200 outline-none"
                      value={cat.label || cat.name || "Service Category"}
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
                    <div key={svcIdx} className="bg-white p-3 rounded-2xl border border-gray-100/50 space-y-2">
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
                          className="w-16 text-right font-bold text-xs text-shop-primary"
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
                          className="text-[10px] text-gray-400 font-medium w-full"
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
                          className="text-gray-300 hover:text-red-500"
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
                      next[catIdx].services.push({ name: "New Service", price: "$0", duration: "30 min" });
                      setOfferings(next);
                    }}
                    className="w-full py-2 border-2 border-dashed border-gray-200 rounded-xl text-xs font-bold text-gray-400 hover:border-gray-300 hover:text-gray-500 transition-all flex items-center justify-center gap-1"
                  >
                    <Plus className="w-3 h-3" /> Add Service
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-100 bg-white flex items-center gap-3">
          <button 
            onClick={() => {
              if (confirm("Reset all changes to defaults? This cannot be undone.")) {
                resetToDefault(currentTemplateId);
              }
            }}
            className="flex-1 py-3 px-4 rounded-xl border border-gray-100 font-bold text-xs text-gray-400 hover:bg-gray-50 transition-all flex items-center justify-center gap-2"
          >
            <RotateCcw className="w-3 h-3" /> Reset
          </button>
          <button 
            onClick={() => setIsEditorOpen(false)}
            className="flex-1 py-3 px-4 rounded-xl text-white font-bold text-xs shadow-lg hover:scale-[1.02] transition-all flex items-center justify-center gap-2"
            style={{ backgroundColor: shopData.primaryColor }}
          >
            <Check className="w-3 h-3" /> Finish Editing
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

const TabButton: React.FC<{ active: boolean; onClick: () => void; icon: React.ReactNode; label: string }> = ({ active, onClick, icon, label }) => (
  <button 
    onClick={onClick}
    className={`flex-1 py-4 flex flex-col items-center gap-1 transition-all relative ${active ? "text-black" : "text-gray-400 hover:text-gray-600"}`}
  >
    {icon}
    <span className="text-[10px] font-bold uppercase tracking-widest">{label}</span>
    {active && (
      <motion.div 
        layoutId="activeTab"
        className="absolute bottom-0 left-0 right-0 h-1 bg-black rounded-t-full"
      />
    )}
  </button>
);

const InputGroup: React.FC<{ label: string; children: React.ReactNode }> = ({ label, children }) => (
  <div className="space-y-2">
    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 px-1">{label}</label>
    {children}
  </div>
);
