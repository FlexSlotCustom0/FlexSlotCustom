"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useTemplateContext } from "@/components/TemplateContext";

// Import your template components here
// For this demo, we assume they are modularized or we use the existing ones
import ClinicClean from "../templates/clinic-clean/page";
import VetWarm from "../templates/vet-warm/page";
import DentalBright from "../templates/dental-bright/page";

const templateMap: Record<string, any> = {
  "clinic-clean": ClinicClean,
  "vet-warm": VetWarm,
  "dental-bright": DentalBright,
  "dental-sigma": DentalBright, // Mapping sigma to bright for now as a base
  "vet-sigma": VetWarm,
  "family-sigma": ClinicClean,
};

export default function PatientPortal() {
  const { clinic_slug } = useParams();
  const [clinicData, setClinicData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const { setShopData } = useTemplateContext();

  useEffect(() => {
    async function fetchClinic() {
      try {
        // In a real app, this would be an API call to the backend
        // GET /api/v1/clinics/by-slug/{slug}
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/clinics/by-slug/${clinic_slug}`);
        if (!res.ok) throw new Error("Clinic not found");
        const data = await res.json();
        
        setClinicData(data);
        setShopData(data.ui_config);

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
    if (clinic_slug) fetchClinic();
  }, [clinic_slug, setShopData]);

  if (loading) return <div className="min-h-screen bg-black flex items-center justify-center text-white">Loading Sigma Engine...</div>;
  if (!clinicData) return <div className="min-h-screen bg-black flex items-center justify-center text-white">404 | Clinic Not Found</div>;

  const TemplateComponent = templateMap[clinicData.template_id] || ClinicClean;

  return (
    <main className="sigma-portal">
      <TemplateComponent />
      
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
