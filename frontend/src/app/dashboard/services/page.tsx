"use client";

import { motion } from "framer-motion";
import { 
  Plus, Search, Edit2, Trash2, Clock, DollarSign, LayoutGrid, List, Bot, Sparkles, ChevronRight,
  ShieldPlus, Activity, Stethoscope, Heart, Thermometer, Microscope, X
} from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";

export default function TreatmentsPage() {
  const supabase = createClient();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [services, setServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [tenant, setTenant] = useState<any>(null);
  
  // Modal states
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newService, setNewService] = useState({
    name: "",
    duration: "30 min",
    price: "$",
    description: "",
    category: "General Practice"
  });

  useEffect(() => {
    fetchInitialData();
  }, []);

  const fetchInitialData = async () => {
    setLoading(true);
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    // 1. Fetch Tenant
    const { data: tenantData } = await supabase
      .from("tenants")
      .select("*")
      .eq("owner_id", user.id)
      .single();
    
    if (tenantData) {
      setTenant(tenantData);
      // 2. Fetch Services
      const { data: servicesData } = await supabase
        .from("services")
        .select("*")
        .eq("tenant_id", tenantData.id)
        .order("created_at", { ascending: false });
      
      setServices(servicesData || []);
    }
    setLoading(false);
  };

  const handleAddService = async () => {
    if (!tenant) return;
    setLoading(true);
    
    const { data, error } = await supabase
      .from("services")
      .insert({
        tenant_id: tenant.id,
        name: newService.name,
        duration: newService.duration,
        price: newService.price,
        description: newService.description,
      })
      .select()
      .single();

    if (error) {
      alert(error.message);
    } else {
      setServices([data, ...services]);
      setIsAddModalOpen(false);
      setNewService({ name: "", duration: "30 min", price: "$", description: "", category: "General Practice" });
    }
    setLoading(false);
  };

  const handleDeleteService = async (id: string) => {
    if (!confirm("Are you sure you want to delete this treatment?")) return;
    
    const { error } = await supabase
      .from("services")
      .delete()
      .eq("id", id);
    
    if (error) alert(error.message);
    else setServices(services.filter(s => s.id !== id));
  };

  return (
    <div className="min-h-screen bg-[#FDFDFD] text-black font-sans flex">
      {/* Mini Sidebar back to Dashboard */}
      <aside className="w-20 border-r border-gray-100 flex flex-col h-screen sticky top-0 bg-white items-center py-8 gap-8">
        <Link href="/dashboard/owner" className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-lg shadow-blue-600/20">
          <ChevronRight className="w-6 h-6 rotate-180" />
        </Link>
        <div className="flex-1" />
        <div className="w-10 h-10 rounded-full bg-gray-50 border border-gray-100" />
      </aside>

      <main className="flex-1 flex flex-col">
        <header className="h-20 bg-white border-b border-gray-50 flex items-center justify-between px-10 sticky top-0 z-10">
          <div>
            <h1 className="text-2xl font-serif text-blue-600">Treatment Registry</h1>
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-[0.2em] font-mono">Clinical Procedure Inventory</p>
          </div>
          <div className="flex items-center gap-4">
            <button className="flex items-center gap-2 px-5 py-2.5 border border-gray-100 rounded-xl text-xs font-bold hover:bg-gray-50 transition-all">
              <Sparkles className="w-4 h-4 text-blue-600" /> AI Optimizer
            </button>
            <button 
              onClick={() => setIsAddModalOpen(true)}
              className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-xl text-xs font-bold hover:bg-blue-700 transition-all shadow-md"
            >
              <Plus className="w-4 h-4" /> Define Treatment
            </button>
          </div>
        </header>

        <div className="p-10">
          {/* AI Banner */}
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12 p-10 rounded-[2.5rem] border border-gray-50 flex items-center gap-8 bg-white shadow-sm"
          >
            <div className="w-16 h-16 rounded-2xl bg-blue-600 flex items-center justify-center text-white shadow-lg">
              <Bot className="w-8 h-8" />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-xl flex items-center gap-4">
                Clinic Intel Assistant
                <span className="text-[10px] px-3 py-1 bg-blue-50 text-blue-600 rounded-full border border-blue-100 font-black tracking-widest uppercase">Validated</span>
              </h3>
              <p className="text-sm text-gray-400 mt-2 font-medium max-w-xl italic leading-relaxed">
                "Hi Dr. Peterson, I've analyzed your patient load. Adding a 'Fast-Track Diagnostic' 15min slot could reduce wait times by 18% during peak hours."
              </p>
            </div>
          </motion.div>

          <div className="flex items-center justify-between mb-12">
            <div className="space-y-1">
              <h2 className="text-3xl font-serif">Active Procedures</h2>
              <p className="text-gray-400 text-sm font-medium italic">Configure medical and veterinary treatments for your practitioners.</p>
            </div>
            <div className="flex border border-gray-100 rounded-2xl p-1 bg-white shadow-sm font-mono">
              <button 
                onClick={() => setViewMode('grid')}
                className={`p-2.5 rounded-xl transition-all ${viewMode === 'grid' ? 'bg-blue-600 text-white shadow-md' : 'text-gray-300 hover:text-black'}`}
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button 
                onClick={() => setViewMode('list')}
                className={`p-2.5 rounded-xl transition-all ${viewMode === 'list' ? 'bg-blue-600 text-white shadow-md' : 'text-gray-300 hover:text-black'}`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>

          {loading && services.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 opacity-20">
              <div className="w-10 h-10 border-4 border-black border-t-transparent rounded-full animate-spin mb-4" />
              <p className="text-xs font-black uppercase tracking-widest">Loading Clinical Data...</p>
            </div>
          ) : (
            <div className={viewMode === 'grid' ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-8" : "space-y-4"}>
              {services.map((treatment, idx) => (
                <motion.div
                  key={treatment.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: idx * 0.05 }}
                  className="bg-white rounded-[2.5rem] border border-gray-50 hover:border-blue-600/10 hover:shadow-xl transition-all p-8 group flex flex-col h-full relative overflow-hidden"
                >
                  <div className="flex items-start justify-between mb-8 relative z-10">
                    <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors"><Clock className="w-5 h-5" /></div>
                    <div className="flex gap-1">
                      <button className="p-2.5 rounded-xl hover:bg-gray-50 text-gray-300 hover:text-blue-600 transition-all"><Edit2 className="w-4 h-4" /></button>
                      <button 
                        onClick={() => handleDeleteService(treatment.id)}
                        className="p-2.5 rounded-xl hover:bg-gray-50 text-gray-300 hover:text-red-500 transition-all"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  <div className="mb-8 flex-1 relative z-10">
                    <span className="text-[9px] font-black uppercase tracking-[0.2em] text-gray-300 mb-3 block">{treatment.category || "General Practice"}</span>
                    <h3 className="text-xl font-bold text-black mb-3">{treatment.name}</h3>
                    <p className="text-sm text-gray-400 font-medium italic leading-relaxed">{treatment.description}</p>
                  </div>
                  <div className="flex items-center justify-between pt-8 border-t border-gray-50 relative z-10">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-black uppercase tracking-widest text-gray-300">{treatment.duration}</span>
                      <div className="w-1 h-1 rounded-full bg-gray-100" />
                      <span className="text-[10px] font-black uppercase tracking-widest text-blue-500">Clinical Only</span>
                    </div>
                    <span className="text-2xl font-serif font-black">{treatment.price}</span>
                  </div>
                  <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-blue-50 rounded-full opacity-50 group-hover:scale-110 transition-transform" />
                </motion.div>
              ))}
            </div>
          )}

          {services.length === 0 && !loading && (
            <div className="py-20 text-center bg-gray-50/50 rounded-[3rem] border border-dashed border-gray-100">
               <p className="text-gray-400 font-medium italic">No treatments defined yet. Click "Define Treatment" to start.</p>
            </div>
          )}
        </div>
      </main>

      {/* Add Service Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/40 backdrop-blur-sm">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white w-full max-w-xl rounded-[3rem] p-10 shadow-2xl relative"
          >
            <button 
              onClick={() => setIsAddModalOpen(false)}
              className="absolute top-8 right-8 p-2 hover:bg-gray-50 rounded-full transition-all"
            >
              <X className="w-5 h-5" />
            </button>
            
            <h2 className="text-3xl font-serif mb-8">New Clinical Procedure</h2>
            
            <div className="space-y-6">
              <div>
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 block mb-2">Procedure Name</label>
                <input 
                  type="text" 
                  value={newService.name}
                  onChange={(e) => setNewService({...newService, name: e.target.value})}
                  className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-600/5"
                  placeholder="e.g. Cardiological Screening"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 block mb-2">Duration</label>
                  <input 
                    type="text" 
                    value={newService.duration}
                    onChange={(e) => setNewService({...newService, duration: e.target.value})}
                    className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl text-sm"
                    placeholder="30 min"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 block mb-2">Price</label>
                  <input 
                    type="text" 
                    value={newService.price}
                    onChange={(e) => setNewService({...newService, price: e.target.value})}
                    className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl text-sm"
                    placeholder="$100"
                  />
                </div>
              </div>
              
              <div>
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 block mb-2">Description</label>
                <textarea 
                  value={newService.description}
                  onChange={(e) => setNewService({...newService, description: e.target.value})}
                  className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl text-sm min-h-[100px]"
                  placeholder="Detailed explanation of the procedure..."
                />
              </div>
              
              <button 
                onClick={handleAddService}
                disabled={!newService.name || loading}
                className="w-full py-5 bg-blue-600 text-white rounded-3xl font-bold mt-4 shadow-xl hover:bg-blue-700 transition-all disabled:opacity-50"
              >
                {loading ? "Registering..." : "Register Procedure"}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
