"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useTemplateContext } from "@/components/TemplateContext";

// Import your template components
// Note: These should be updated to accept slots and clinic data
import ClinicClean from "../templates/clinic-clean/page";
import VetWarm from "../templates/vet-warm/page";
import DentalBright from "../templates/dental-bright/page";

const templateMap: Record<string, any> = {
  "clinic-clean": ClinicClean,
  "vet-warm": VetWarm,
  "dental-bright": DentalBright,
  "dental-sigma": DentalBright,
  "vet-sigma": VetWarm,
  "family-sigma": ClinicClean,
};

export default function PatientPortal() {
  const { clinic_slug } = useParams();
  const [clinicData, setClinicData] = useState<any>(null);
  const [slots, setSlots] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { setShopData } = useTemplateContext();

  useEffect(() => {
    async function fetchClinicAndSlots() {
      try {
        // 1. Fetch Clinic Data
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/clinics/by-slug/${clinic_slug}`);
        if (!res.ok) throw new Error("Clinic not found");
        const data = await res.json();
        
        setClinicData(data);
        setShopData(data.ui_config);

        // 2. Fetch Available Slots for this Clinic
        const slotsRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/scheduler/?x_clinic_id=${data.id}`, {
            headers: { "X-Clinic-ID": data.id }
        });
        if (slotsRes.ok) {
            const slotsData = await slotsRes.json();
            // Filter only available slots for patients
            setSlots(slotsData.filter((s: any) => s.status === 'available'));
        }

        // Inject CSS Variables for Sigma Branding
        const root = document.documentElement;
        const config = data.ui_config;
        if (config.primaryColor) root.style.setProperty("--primary", config.primaryColor);
        if (config.secondaryColor) root.style.setProperty("--secondary", config.secondaryColor);
        if (config.fontFamily) root.style.setProperty("--font-sans", config.fontFamily);
        
        if (config.theme === "dark") {
          root.classList.add("dark");
        } else {
          root.classList.remove("dark");
        }

      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    if (clinic_slug) fetchClinicAndSlots();
  }, [clinic_slug, setShopData]);

  if (loading) return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center text-white font-sans">
      <div className="w-12 h-12 border-4 border-maroon-600 border-t-transparent rounded-full animate-spin mb-4" />
      <span className="text-[10px] font-black uppercase tracking-[0.3em] opacity-40">Synchronizing Registry...</span>
    </div>
  );

  if (!clinicData) return <div className="min-h-screen bg-black flex items-center justify-center text-white">404 | Clinic Not Found</div>;

  const TemplateComponent = templateMap[clinicData.template_id] || ClinicClean;

  return (
    <main className="sigma-portal">
      {/* Pass slots and clinic data to the template */}
      <TemplateComponent slots={slots} clinic={clinicData} isPortal={true} />
      
      {/* Global Style Injector for Dynamic Colors */}
      <style jsx global>{`
        :root {
          --primary: ${clinicData.ui_config.primaryColor || '#800000'};
          --secondary: ${clinicData.ui_config.secondaryColor || '#000000'};
        }
        .bg-primary { background-color: var(--primary); }
        .text-primary { color: var(--primary); }
        .border-primary { border-color: var(--primary); }
      `}</style>
    </main>
  );
}
