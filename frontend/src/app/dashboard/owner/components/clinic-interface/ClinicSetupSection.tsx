"use client";

import { useState, useEffect } from "react";
import { IdentityTab } from "./IdentityTab";
import { StaffServicesTab } from "./StaffServicesTab";
import { EngagementTab } from "./EngagementTab";
import { ClinicSidebar } from "./ClinicSidebar";
import { PatientPortalPreview } from "./PatientPortalPreview";

const templates = [
  { id: 'clinic-pristine', name: 'Pristine', theme: 'Swiss Minimalism', desc: 'Monochromatic clinical precision with editorial typography and stark whitespace.', colors: ['#000000', '#ffffff', '#666666'] },
  { id: 'clinic-luxe', name: 'Luxe', theme: 'Private Practice Elite', desc: 'Dark luxury aesthetic with gold accents — built for premium private clinics.', colors: ['#0a0a0a', '#d4af37', '#1a1a1a'] },
  { id: 'clinic-aura', name: 'Aura', theme: 'Modern Wellness', desc: 'Soft lavender gradients and frosted glass — a calming, modern patient experience.', colors: ['#eef2ff', '#6366f1', '#818cf8'] }
];

const tpl: Record<string, any> = {
  'clinic-pristine': { 
    id: 'pristine', heroBg: '#fff', heroText: '#000', bodyBg: '#fff', bodyText: '#000', 
    accent: '#000', accentText: '#fff', navBg: '#fff', navText: '#000', 
    cardBg: '#fff', cardBorder: '#00000008', sectionBg: '#fcfcfc', muted: '#888',
    radius: '0px', font: 'sans'
  },
  'clinic-luxe': { 
    id: 'luxe', heroBg: '#0a0a0a', heroText: '#f5f0e8', bodyBg: '#0f0f0f', bodyText: '#f5f0e8', 
    accent: '#d4af37', accentText: '#0a0a0a', navBg: '#0a0a0a', navText: '#f5f0e8', 
    cardBg: '#1a1a1a', cardBorder: '#2a2a2a', sectionBg: '#111111', muted: '#777',
    radius: '1rem', font: 'serif'
  },
  'clinic-aura': { 
    id: 'aura', heroBg: '#eef2ff', heroText: '#1e1b4b', bodyBg: '#f5f3ff', bodyText: '#312e81', 
    accent: '#6366f1', accentText: '#fff', navBg: 'rgba(238,242,255,0.7)', navText: '#312e81', 
    cardBg: 'rgba(255,255,255,0.6)', cardBorder: '#c7d2fe', sectionBg: '#eef2ff', muted: '#818cf8',
    radius: '2.5rem', font: 'sans'
  }
};

export function ClinicSetupSection() {
  const [activeSubTab, setActiveSubTab] = useState("identity");
  const [selectedTemplate, setSelectedTemplate] = useState("clinic-pristine");
  const [clinicName, setClinicName] = useState("Kindred Wellness");
  const [clinicTagline, setClinicTagline] = useState("Empowering health through precision care and compassionate medical expertise.");
  const [clinicBanner, setClinicBanner] = useState<string | null>(null);
  const [clinicPhoto, setClinicPhoto] = useState<string | null>(null);
  const [contact, setContact] = useState({ phone: "+1 234 567 8900", email: "care@kindred.com" });
  const [hours, setHours] = useState({ open: "08:00", close: "20:00" });
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  const [doctors, setDoctors] = useState([
    { id: 1, name: "Dr. Sarah Anderson", room: "RM 204", specialty: "Senior Cardiologist", quote: "Heart health is the foundation of longevity.", status: "Present", delay: 0, photo: null },
    { id: 2, name: "Dr. James Jenkins", room: "RM 102", specialty: "Pediatric Specialist", quote: "Every child deserves a smiling doctor.", status: "Late", delay: 15, photo: null },
    { id: 3, name: "Dr. Emily Wright", room: "RM 301", specialty: "Dermatology", quote: "Your skin tells a story of your inner health.", status: "Present", delay: 0, photo: null }
  ]);

  const [services, setServices] = useState([
    { id: 1, name: "General Consultation", photo: null },
    { id: 2, name: "Diagnostic Screening", photo: null },
    { id: 3, name: "Laboratory Testing", photo: null }
  ]);

  const [news, setNews] = useState([
    { id: 1, title: "HOLIDAY SCHEDULE UPDATE", desc: "The clinic will be adjusting its hours for the upcoming holiday season...", date: "MAY 2026", photo: null },
    { id: 2, title: "NEW CARDIOLOGY WING OPEN", desc: "We are proud to announce the opening of our state-of-the-art heart center...", date: "APRIL 2026", photo: null }
  ]);

  const [reviews, setReviews] = useState([
    { id: 1, text: "Clean and prompt attention. Ambiance is great. Easy location.", author: "SARAH M.", rating: 5 },
    { id: 2, text: "I received outstanding service from the medical team. They were calm, caring, and professional.", author: "JAMES K.", rating: 5 },
    { id: 3, text: "Dr. Wright is the absolute best doctor I have ever had.", author: "EMILY R.", rating: 5 }
  ]);

  useEffect(() => {
    const saved = localStorage.getItem("flexslot_clinic_config");
    if (saved) {
      try {
        const config = JSON.parse(saved);
        if (config.template) setSelectedTemplate(config.template);
        if (config.name) setClinicName(config.name);
        if (config.tagline) setClinicTagline(config.tagline);
        if (config.banner) setClinicBanner(config.banner);
        if (config.photo) setClinicPhoto(config.photo);
        if (config.contact) setContact(config.contact);
        if (config.hours) setHours(config.hours);
        if (config.doctors) setDoctors(config.doctors);
        if (config.services) setServices(config.services);
        if (config.news) setNews(config.news);
        if (config.reviews) setReviews(config.reviews);
      } catch (e) { console.error(e); }
    }
  }, []);

  const handleSave = () => {
    const config = {
      template: selectedTemplate,
      name: clinicName,
      tagline: clinicTagline,
      banner: clinicBanner,
      photo: clinicPhoto,
      contact,
      hours,
      doctors,
      services,
      news,
      reviews
    };
    localStorage.setItem("flexslot_clinic_config", JSON.stringify(config));
    alert("Clinic Configuration Synchronized!");
  };

  const handleFileUpload = (callback: (url: string) => void) => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (e: any) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (re: any) => callback(re.target.result);
        reader.readAsDataURL(file);
      }
    };
    input.click();
  };

  const ct = tpl[selectedTemplate] || tpl['clinic-pristine'];

  return (
    <div className="grid grid-cols-12 gap-12">
      <div className="col-span-8 space-y-12">
        <header className="space-y-2">
           <h2 className="premium-header">Clinic Interface</h2>
           <p className="premium-sub">Architecting Patient Experience</p>
        </header>

        <nav className="flex gap-1.5 bg-black/5 p-1.5 rounded-2xl w-fit">
          {["identity", "staff", "engagement"].map(t => (
            <button 
              key={t}
              onClick={() => setActiveSubTab(t)}
              className={`px-8 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeSubTab === t ? 'bg-white text-black shadow-sm' : 'text-black/40 hover:text-black'}`}
            >
              {t}
            </button>
          ))}
        </nav>

        {activeSubTab === "identity" && (
          <IdentityTab 
            selectedTemplate={selectedTemplate}
            setSelectedTemplate={setSelectedTemplate}
            clinicName={clinicName}
            setClinicName={setClinicName}
            clinicTagline={clinicTagline}
            setClinicTagline={setClinicTagline}
            clinicBanner={clinicBanner}
            setClinicBanner={setClinicBanner}
            clinicPhoto={clinicPhoto}
            setClinicPhoto={setClinicPhoto}
            contact={contact}
            setContact={setContact}
            hours={hours}
            setHours={setHours}
            templates={templates}
            handleFileUpload={handleFileUpload}
          />
        )}

        {activeSubTab === "staff" && (
          <StaffServicesTab 
            doctors={doctors}
            setDoctors={setDoctors}
            services={services}
            setServices={setServices}
            handleFileUpload={handleFileUpload}
          />
        )}

        {activeSubTab === "engagement" && (
          <EngagementTab 
            news={news}
            setNews={setNews}
            reviews={reviews}
            setReviews={setReviews}
            handleFileUpload={handleFileUpload}
          />
        )}

        <div className="pt-10">
          <button 
            onClick={handleSave} 
            className="w-full py-8 bg-black text-white rounded-[2.5rem] font-black text-xs uppercase tracking-[0.4em] shadow-2xl hover:scale-[1.02] active:scale-95 transition-all"
          >
            Deploy Clinic Portal
          </button>
        </div>
      </div>

      <ClinicSidebar 
        clinicName={clinicName}
        setClinicName={setClinicName}
        setIsPreviewOpen={setIsPreviewOpen}
      />

      <PatientPortalPreview 
        isPreviewOpen={isPreviewOpen}
        setIsPreviewOpen={setIsPreviewOpen}
        selectedTemplate={selectedTemplate}
        clinicName={clinicName}
        clinicTagline={clinicTagline}
        clinicBanner={clinicBanner}
        clinicPhoto={clinicPhoto}
        contact={contact}
        hours={hours}
        doctors={doctors}
        services={services}
        news={news}
        reviews={reviews}
        templates={templates}
        ct={ct}
      />
    </div>
  );
}
