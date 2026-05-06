"use client";

import { useState, useEffect } from "react";
import { IdentityTab } from "./IdentityTab";
import { StaffServicesTab } from "./StaffServicesTab";
import { EngagementTab } from "./EngagementTab";
import { ClinicSidebar } from "./ClinicSidebar";
import { PatientPortalPreview } from "./PatientPortalPreview";

const templates = [
  { id: 'clinic-sigma', name: 'Sigma Engine', theme: 'Monochrome High-Contrast', desc: 'Strict clinical excellence. Perfect for high-volume diagnostic centers.', colors: ['#000000', '#ffffff', '#10b981'] },
  { id: 'clinic-clean', name: 'Pure Minimal', theme: 'Warm Scandi-Clinical', desc: 'Soft tones and high whitespace. Ideal for wellness and therapy clinics.', colors: ['#f5f5f4', '#1c1917', '#78716c'] },
  { id: 'clinic-medical', name: 'Classic Health', theme: 'Professional Medical', desc: 'Trusted navy and slate palette. Best for established general practices.', colors: ['#1e293b', '#f8fafc', '#2563eb'] }
];

const tpl: Record<string, any> = {
  'clinic-sigma': { heroBg: '#000', heroText: '#fff', bodyBg: '#f9f9f9', bodyText: '#000', accent: '#000', accentText: '#fff', navBg: '#000', navText: '#fff', cardBg: '#fff', cardBorder: '#00000008', sectionBg: '#f2f2f2', muted: '#666' },
  'clinic-clean': { heroBg: '#f5f5f4', heroText: '#1c1917', bodyBg: '#fff', bodyText: '#1c1917', accent: '#78716c', accentText: '#fff', navBg: '#f5f5f4', navText: '#1c1917', cardBg: '#fff', cardBorder: '#e7e5e4', sectionBg: '#fafaf9', muted: '#a8a29e' },
  'clinic-medical': { heroBg: '#1e293b', heroText: '#fff', bodyBg: '#fff', bodyText: '#1e293b', accent: '#2563eb', accentText: '#fff', navBg: '#1e293b', navText: '#fff', cardBg: '#fff', cardBorder: '#e2e8f0', sectionBg: '#f8fafc', muted: '#64748b' }
};

export function ClinicSetupSection() {
  const [activeSubTab, setActiveSubTab] = useState("identity");
  const [selectedTemplate, setSelectedTemplate] = useState("clinic-sigma");
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

  const ct = tpl[selectedTemplate] || tpl['clinic-sigma'];

  return (
    <div className="grid grid-cols-12 gap-12">
      <div className="col-span-8 space-y-10">
        <header className="flex items-center justify-between">
          <div className="space-y-1">
             <h2 className="text-4xl font-black uppercase tracking-tighter italic">Clinic Interface Builder</h2>
             <p className="text-[10px] font-black uppercase tracking-[0.2em] text-black/20 italic">Architecting Patient Experience</p>
          </div>
          <button onClick={handleSave} className="px-10 py-4 bg-emerald-500 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-2xl shadow-emerald-500/20 hover:scale-105 active:scale-95 transition-all">Deploy Interface</button>
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
