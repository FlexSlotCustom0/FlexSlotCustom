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
  imageUrl?: string;
  accent?: string;
  specialty?: string;
  credentials?: string;
}

export interface Faq {
  q: string;
  a: string;
}

export interface Tip {
  title: string;
  tip: string;
}

export interface Review {
  name: string;
  text: string;
  rating: number;
}

export interface ShopData {
  name: string;
  tagline: string;
  logo: string;
  logoUrl?: string;
  bannerGradient: string;
  bannerUrl?: string;
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
  faqs: Faq[];
  setFaqs: (data: Faq[]) => void;
  tips: Tip[];
  setTips: (data: Tip[]) => void;
  reviews: Review[];
  setReviews: (data: Review[]) => void;
  isEditorOpen: boolean;
  setIsEditorOpen: (open: boolean) => void;
  resetToDefault: (templateId: string) => void;
  publishClinic: () => void;
  selectTemplate: (templateId: string) => Promise<void>;
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
export const defaultTemplatesData: Record<string, { 
  shop: ShopData, 
  staff: Staff[], 
  offerings: any[],
  faqs?: Faq[],
  tips?: Tip[],
  reviews?: Review[]
}> = {
  "clinic-clean": {
    shop: {
      name: "Evergreen Medical Centre",
      tagline: "Your health, our priority",
      logo: "Stethoscope",
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
      { name: "Dr. Sarah Perera", role: "General Practitioner", credentials: "MBBS, MD", avatar: "UserRound" },
      { name: "Dr. Kamal Silva", role: "Cardiologist", credentials: "MBBS, MRCP (UK)", avatar: "UserRound" },
      { name: "Dr. Nisha Fernando", role: "Dermatologist", credentials: "MBBS, DDV", avatar: "UserRound" },
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
    faqs: [
      { q: "What should I bring to my first appointment?", a: "Please bring your national ID, insurance card, and any previous medical records or prescriptions." },
      { q: "Do you accept insurance?", a: "Yes, we accept all major insurance providers. Please contact us for specific plan details." },
      { q: "How do I prepare for a blood test?", a: "Fasting for 8-12 hours before the test is required. Water is allowed." },
    ],
    reviews: [
      { name: "Alex G.", text: "The staff here is exceptional. Dr. Sarah was very thorough and patient with my questions.", rating: 5 },
      { name: "Maria S.", text: "Modern facility and very short wait times. Highly recommend Evergreen.", rating: 5 },
    ]
  },
  "vet-warm": {
    shop: {
      name: "Happy Paws Clinic",
      tagline: "Compassionate care for your furry family",
      logo: "PawPrint",
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
      { name: "Dr. Anjali", role: "Lead Veterinarian", specialty: "Surgery & Internal Medicine", avatar: "UserRound" },
      { name: "Dr. Ruwan", role: "Veterinarian", specialty: "Dermatology & Allergies", avatar: "UserRound" },
      { name: "Priya", role: "Vet Nurse", specialty: "Post-Op Care & Therapy", avatar: "UserRound" },
    ],
    offerings: [
      { name: "Wellness Checkup", price: "$45", duration: "30 min", icon: "Stethoscope", desc: "Nose-to-tail examination for your pet" },
      { name: "Vaccination", price: "$35", duration: "15 min", icon: "Syringe", desc: "Core and non-core vaccines available" },
      { name: "Dental Cleaning", price: "$120", duration: "1 hr", icon: "Sparkles", desc: "Professional scaling and polishing" },
      { name: "Surgery Consultation", price: "$80", duration: "45 min", icon: "Microscope", desc: "Pre-surgical assessment and planning" },
      { name: "Grooming & Bath", price: "$50", duration: "1 hr", icon: "ShowerHead", desc: "Full bath, nail trim, and ear cleaning" },
      { name: "Emergency Visit", price: "$100+", duration: "Varies", icon: "AlertCircle", desc: "24/7 emergency care available" },
    ],
    tips: [
      { title: "Before Your Visit", tip: "Bring your pet's medical records, vaccination history, and a favourite toy to keep them calm." },
      { title: "Vaccination Schedule", tip: "Puppies should start vaccinations at 6-8 weeks. Adult pets need annual boosters." },
      { title: "Emergency Signs", tip: "Difficulty breathing, sudden collapse, or seizures require immediate emergency attention." },
    ],
    reviews: [
      { name: "Amanda K.", text: "Dr. Anjali saved my cat's life. The entire team was so caring and kept us informed every step of the way.", rating: 5 },
      { name: "Dinesh P.", text: "Best vet clinic around. They treat our dog like family. The grooming service is amazing too!", rating: 5 },
    ]
  },
  "pulse-modern": {
    shop: {
      name: "Pulse Diagnostic Hub",
      tagline: "Precision imaging and advanced diagnostics",
      logo: "Activity",
      bannerGradient: "linear-gradient(135deg, #1e1b4b 0%, #312e81 50%, #4338ca 100%)",
      primaryColor: "#4f46e5",
      address: "42 Tech Plaza, Colombo 07",
      phone: "+94 11 999 0000",
      hours: "24/7 Diagnostic Services Available",
      rating: 5.0,
      reviewCount: 184,
      instagram: "@pulse.dx",
      announcement: "New MRI scanner installed. Zero wait time this week.",
    },
    staff: [
      { name: "Dr. Victor", role: "Radiologist", credentials: "MD, FRCR", avatar: "UserRound" },
      { name: "Elena", role: "Lab Lead", specialty: "Biometric Screening", avatar: "UserRound" },
    ],
    offerings: [
      {
        label: "Imaging",
        services: [
          { name: "Full Body MRI", price: "$450", duration: "2 hr", desc: "Advanced 3T imaging session" },
          { name: "CT Scan", price: "$200", duration: "45 min", desc: "High-resolution cross-sectional imaging" },
        ],
      },
    ],
  },
  "dental-bright": {
    shop: {
      name: "Bright Dental Studio",
      tagline: "Your smile, engineered to perfection",
      logo: "Sparkles",
      bannerGradient: "linear-gradient(135deg, #f0fdfa 0%, #ccfbf1 50%, #99f6e4 100%)",
      primaryColor: "#0d9488",
      address: "12 Marine Drive, Colombo 03",
      phone: "+94 11 888 7777",
      hours: "Mon–Sat · 9 AM – 8 PM",
      rating: 4.8,
      reviewCount: 256,
      instagram: "@bright.smile",
    },
    staff: [
      { name: "Dr. Aruni", role: "Orthodontist", credentials: "BDS, MS", avatar: "UserRound" },
      { name: "Dr. Sameer", role: "Dental Surgeon", credentials: "BDS", avatar: "UserRound" },
    ],
    offerings: [
      {
        label: "Cosmetic",
        services: [
          { name: "Teeth Whitening", price: "$150", duration: "1 hr", desc: "Professional laser-assisted whitening" },
          { name: "Invisalign Consult", price: "$50", duration: "30 min", desc: "Digital scan and treatment planning" },
        ],
      },
    ],
  },
  "paws-premium": {
    shop: {
      name: "Paw Luxe Wellness",
      tagline: "The gold standard in boutique pet care",
      logo: "Diamond",
      bannerGradient: "linear-gradient(135deg, #18181b 0%, #27272a 50%, #3f3f46 100%)",
      primaryColor: "#f59e0b",
      address: "07 Cinnamon Gardens, Colombo 07",
      phone: "+94 11 777 5555",
      hours: "By Appointment Only · 10 AM – 9 PM",
      rating: 5.0,
      reviewCount: 92,
      instagram: "@pawluxe.premium",
      announcement: "Now offering Hydrotherapy and Zen Pet Massages.",
    },
    staff: [
      { name: "Dr. Julian", role: "Executive Veterinarian", avatar: "UserRound" },
      { name: "Sophie", role: "Wellness Dir.", avatar: "UserRound" },
    ],
    offerings: [
      { name: "VIP Wellness Check", price: "$120", duration: "1 hr", icon: "Star", desc: "Comprehensive luxury health audit" },
      { name: "Hydrotherapy", price: "$85", duration: "45 min", icon: "Waves", desc: "Low-impact therapeutic water exercise" },
    ],
  },
  "wild-med": {
    shop: {
      name: "Wild Frontier Med",
      tagline: "Expert care for the extraordinary",
      logo: "Bird",
      bannerGradient: "linear-gradient(135deg, #064e3b 0%, #065f46 50%, #047857 100%)",
      primaryColor: "#10b981",
      address: "99 Green Belt Road, Ethul Kotte",
      phone: "+94 11 333 4444",
      hours: "Emergency Response 24/7",
      rating: 4.9,
      reviewCount: 145,
      instagram: "@wildmed.sl",
    },
    staff: [
      { name: "Dr. Ravi", role: "Exotics Specialist", avatar: "UserRound" },
      { name: "Mara", role: "Wildlife Nurse", avatar: "UserRound" },
    ],
    offerings: [
      { name: "Exotic Pet Consult", price: "$110", duration: "1 hr", icon: "Bird", desc: "Specialized care for birds, reptiles and mammals" },
      { name: "Field Emergency", price: "$250", duration: "Varies", icon: "Truck", desc: "On-site emergency response for large animals" },
    ],
  },
};

export const TemplateProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [shopData, setShopDataState] = useState<ShopData>(defaultTemplatesData["clinic-clean"].shop);
  const [staff, setStaff] = useState<Staff[]>(defaultTemplatesData["clinic-clean"].staff);
  const [offerings, setOfferings] = useState<any[]>(defaultTemplatesData["clinic-clean"].offerings);
  const [faqs, setFaqs] = useState<Faq[]>(defaultTemplatesData["clinic-clean"].faqs || []);
  const [tips, setTips] = useState<Tip[]>(defaultTemplatesData["clinic-clean"].tips || []);
  const [reviews, setReviews] = useState<Review[]>(defaultTemplatesData["clinic-clean"].reviews || []);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [activeTemplate, setActiveTemplate] = useState<string | null>(null);

  // Parse template ID from URL on client side
  useEffect(() => {
    const path = window.location.pathname;
    const parts = path.split("/");
    const templateId = parts[parts.length - 1];
    
    if (defaultTemplatesData[templateId]) {
      setActiveTemplate(templateId);
      
      if (window.location.search.includes("manage=true")) {
        setIsEditorOpen(true);
      }
      
      // Load from local storage or defaults
      const saved = localStorage.getItem(`flexslot_template_${templateId}`);
      if (saved) {
        const parsed = JSON.parse(saved);
        setShopDataState(parsed.shop);
        setStaff(parsed.staff);
        setOfferings(parsed.offerings);
        setFaqs(parsed.faqs || []);
        setTips(parsed.tips || []);
        setReviews(parsed.reviews || []);
      } else {
        const defaults = defaultTemplatesData[templateId];
        setShopDataState(defaults.shop);
        setStaff(defaults.staff);
        setOfferings(defaults.offerings);
        setFaqs(defaults.faqs || []);
        setTips(defaults.tips || []);
        setReviews(defaults.reviews || []);
      }
    }
  }, []);

  // Persistence Effect: Saves only on the client when any data changes
  useEffect(() => {
    if (activeTemplate) {
      const data = { shop: shopData, staff, offerings, faqs, tips, reviews };
      localStorage.setItem(`flexslot_template_${activeTemplate}`, JSON.stringify(data));
    }
  }, [activeTemplate, shopData, staff, offerings, faqs, tips, reviews]);

  const setShopData = (data: Partial<ShopData>) => {
    setShopDataState((prev) => ({ ...prev, ...data }));
  };

  const resetToDefault = (templateId: string) => {
    if (defaultTemplatesData[templateId]) {
      localStorage.removeItem(`flexslot_template_${templateId}`);
      const data = defaultTemplatesData[templateId];
      setShopDataState(data.shop);
      setStaff(data.staff);
      setOfferings(data.offerings);
      setFaqs(data.faqs || []);
      setTips(data.tips || []);
      setReviews(data.reviews || []);
    }
  };

  const selectTemplate = async (templateId: string) => {
    try {
      const clinicId = localStorage.getItem("flexslot_clinic_id") || "mock-clinic-id";
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/clinics/select-template/${templateId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Clinic-ID": clinicId
        }
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.detail || "Failed to select template");
      }

      const result = await response.json();
      const newConfig = result.data;
      
      // Update local state with merged config
      setShopDataState(newConfig);
      setActiveTemplate(templateId);
      
      // Save to local storage for offline fallback
      localStorage.setItem(`flexslot_template_${templateId}`, JSON.stringify({ shop: newConfig }));
      
    } catch (err) {
      console.error("Error selecting template:", err);
      alert(err instanceof Error ? err.message : "Error selecting template");
    }
  };

  const publishClinic = () => {
    if (!activeTemplate) return;

    const publicClinicsJson = localStorage.getItem("flexslot_public_clinics");
    const publicClinics = publicClinicsJson ? JSON.parse(publicClinicsJson) : [];

    const newClinic = {
      id: activeTemplate,
      name: shopData.name,
      tagline: shopData.tagline,
      logo: shopData.logo,
      logoUrl: shopData.logoUrl,
      primaryColor: shopData.primaryColor,
      category: activeTemplate === 'clinic-clean' ? 'Healthcare' : 'Veterinary',
      rating: shopData.rating || 5.0,
      publishedAt: new Date().toISOString()
    };

    // Update existing or add new
    const index = publicClinics.findIndex((c: any) => c.name === newClinic.name);
    if (index > -1) {
      publicClinics[index] = newClinic;
    } else {
      publicClinics.push(newClinic);
    }

    localStorage.setItem("flexslot_public_clinics", JSON.stringify(publicClinics));
  };

  return (
    <TemplateContext.Provider
      value={{
        shopData,
        setShopData,
        staff,
        setStaff,
        offerings,
        setOfferings,
        faqs,
        setFaqs,
        tips,
        setTips,
        reviews,
        setReviews,
        isEditorOpen,
        setIsEditorOpen,
        resetToDefault,
        publishClinic,
        selectTemplate,
      }}
    >
      {children}
    </TemplateContext.Provider>
  );
};
