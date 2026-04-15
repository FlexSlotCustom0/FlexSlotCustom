"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export interface Service {
  name: string;
  price: string;
  duration: string;
  desc?: string;
  icon?: string;
}

export interface ServiceCategory {
  label: string; // or category
  services: Service[];
}

export interface Package {
  name: string;
  price: string;
  duration: string;
  desc: string;
  features: string[];
  popular?: boolean;
}

export interface Staff {
  name: string;
  role: string;
  avatar: string;
  accent?: string;
  specialty?: string;
  credentials?: string;
}

export interface ShopData {
  name: string;
  tagline: string;
  logo: string;
  bannerGradient: string;
  primaryColor: string;
  address: string;
  phone: string;
  hours: string;
  rating: number;
  reviewCount: number;
  instagram: string;
  announcement?: string;
  coverageAreas?: string[];
  galleryImages?: string[];
}

interface TemplateContextType {
  shopData: ShopData;
  setShopData: (data: Partial<ShopData>) => void;
  staff: Staff[];
  setStaff: (data: Staff[]) => void;
  offerings: any[]; // Can be ServiceCategory[] or Package[]
  setOfferings: (data: any[]) => void;
  isEditorOpen: boolean;
  setIsEditorOpen: (open: boolean) => void;
  resetToDefault: (templateId: string) => void;
}

const TemplateContext = createContext<TemplateContextType | undefined>(undefined);

export const useTemplateContext = () => {
  const context = useContext(TemplateContext);
  if (!context) {
    throw new Error("useTemplateContext must be used within a TemplateProvider");
  }
  return context;
};

// Default data maps for each template to allow resetting / initial load
export const defaultTemplatesData: Record<string, { shop: ShopData, staff: Staff[], offerings: any[] }> = {
  "clinic-clean": {
    shop: {
      name: "Evergreen Medical Centre",
      tagline: "Your health, our priority",
      logo: "🏥",
      bannerGradient: "linear-gradient(135deg, #dbeafe 0%, #bfdbfe 50%, #93c5fd 100%)",
      primaryColor: "#2563eb",
      address: "155 Hospital Road, Colombo 03",
      phone: "+94 11 234 5678",
      hours: "Mon–Fri · 8 AM – 6 PM | Sat · 9 AM – 1 PM",
      rating: 4.9,
      reviewCount: 412,
      instagram: "@evergreen.med",
      announcement: "Now accepting online consultations. Book a virtual appointment today.",
    },
    staff: [
      { name: "Dr. Sarah Perera", role: "General Practitioner", credentials: "MBBS, MD", avatar: "👩‍⚕️" },
      { name: "Dr. Kamal Silva", role: "Cardiologist", credentials: "MBBS, MRCP (UK)", avatar: "👨‍⚕️" },
      { name: "Dr. Nisha Fernando", role: "Dermatologist", credentials: "MBBS, DDV", avatar: "👩‍⚕️" },
    ],
    offerings: [
      {
        label: "Primary Care",
        services: [
          { name: "General Consultation", price: "$60", duration: "30 min", desc: "Comprehensive health assessment and diagnosis" },
          { name: "Annual Health Checkup", price: "$150", duration: "1 hr", desc: "Full body examination, blood work, and report" },
          { name: "Vaccination", price: "$40", duration: "15 min", desc: "All standard and travel vaccinations available" },
        ],
      },
      {
        label: "Specialist Care",
        services: [
          { name: "Cardiology Consult", price: "$120", duration: "45 min", desc: "Heart health assessment and ECG screening" },
          { name: "Dermatology Visit", price: "$90", duration: "30 min", desc: "Skin conditions, cosmetic concerns, and treatments" },
          { name: "Lab Work Panel", price: "$80", duration: "20 min", desc: "Comprehensive blood panels and diagnostic tests" },
        ],
      },
    ],
  },
  "vet-warm": {
    shop: {
      name: "Happy Paws Clinic",
      tagline: "Compassionate care for your furry family",
      logo: "🐾",
      bannerGradient: "linear-gradient(135deg, #orange-100 0%, #amber-50 50%, #yellow-100 100%)",
      primaryColor: "#ea580c",
      address: "28 Pet Lane, Nugegoda",
      phone: "+94 11 567 8901",
      hours: "Mon–Sat · 8 AM – 7 PM | Sun · Emergency Only",
      rating: 4.9,
      reviewCount: 327,
      instagram: "@happypaws.vet",
    },
    staff: [
      { name: "Dr. Anjali", role: "Lead Veterinarian", specialty: "Surgery & Internal Medicine", avatar: "👩‍⚕️" },
      { name: "Dr. Ruwan", role: "Veterinarian", specialty: "Dermatology & Allergies", avatar: "👨‍⚕️" },
      { name: "Priya", role: "Vet Nurse", specialty: "Post-Op Care & Therapy", avatar: "🧑‍⚕️" },
    ],
    offerings: [
      { name: "Wellness Checkup", price: "$45", duration: "30 min", icon: "🩺", desc: "Nose-to-tail examination for your pet" },
      { name: "Vaccination", price: "$35", duration: "15 min", icon: "💉", desc: "Core and non-core vaccines available" },
      { name: "Dental Cleaning", price: "$120", duration: "1 hr", icon: "🦷", desc: "Professional scaling and polishing" },
      { name: "Surgery Consultation", price: "$80", duration: "45 min", icon: "🔬", desc: "Pre-surgical assessment and planning" },
      { name: "Grooming & Bath", price: "$50", duration: "1 hr", icon: "🛁", desc: "Full bath, nail trim, and ear cleaning" },
      { name: "Emergency Visit", price: "$100+", duration: "Varies", icon: "🚨", desc: "24/7 emergency care available" },
    ],
  },
};

export const TemplateProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [shopData, setShopDataState] = useState<ShopData>(defaultTemplatesData["clinic-clean"].shop);
  const [staff, setStaff] = useState<Staff[]>(defaultTemplatesData["clinic-clean"].staff);
  const [offerings, setOfferings] = useState<any[]>(defaultTemplatesData["clinic-clean"].offerings);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [activeTemplate, setActiveTemplate] = useState<string | null>(null);

  // Parse template ID from URL on client side
  useEffect(() => {
    const path = window.location.pathname;
    const parts = path.split("/");
    const templateId = parts[parts.length - 1];
    
    if (defaultTemplatesData[templateId]) {
      setActiveTemplate(templateId);
      
      // Load from local storage or defaults
      const saved = localStorage.getItem(`flexslot_template_${templateId}`);
      if (saved) {
        const parsed = JSON.parse(saved);
        setShopDataState(parsed.shop);
        setStaff(parsed.staff);
        setOfferings(parsed.offerings);
      } else {
        setShopDataState(defaultTemplatesData[templateId].shop);
        setStaff(defaultTemplatesData[templateId].staff);
        setOfferings(defaultTemplatesData[templateId].offerings);
      }
    }
  }, []);

  const setShopData = (data: Partial<ShopData>) => {
    setShopDataState((prev) => {
      const next = { ...prev, ...data };
      if (activeTemplate) {
        localStorage.setItem(`flexslot_template_${activeTemplate}`, JSON.stringify({
          shop: next,
          staff,
          offerings
        }));
      }
      return next;
    });
  };

  const updateStaff = (newStaff: Staff[]) => {
    setStaff(newStaff);
    if (activeTemplate) {
      localStorage.setItem(`flexslot_template_${activeTemplate}`, JSON.stringify({
        shop: shopData,
        staff: newStaff,
        offerings
      }));
    }
  };

  const updateOfferings = (newOfferings: any[]) => {
    setOfferings(newOfferings);
    if (activeTemplate) {
      localStorage.setItem(`flexslot_template_${activeTemplate}`, JSON.stringify({
        shop: shopData,
        staff,
        offerings: newOfferings
      }));
    }
  };

  const resetToDefault = (templateId: string) => {
    if (defaultTemplatesData[templateId]) {
      const data = defaultTemplatesData[templateId];
      setShopDataState(data.shop);
      setStaff(data.staff);
      setOfferings(data.offerings);
      localStorage.removeItem(`flexslot_template_${templateId}`);
    }
  };

  return (
    <TemplateContext.Provider
      value={{
        shopData,
        setShopData,
        staff,
        setStaff: updateStaff,
        offerings,
        setOfferings: updateOfferings,
        isEditorOpen,
        setIsEditorOpen,
        resetToDefault,
      }}
    >
      {children}
    </TemplateContext.Provider>
  );
};
