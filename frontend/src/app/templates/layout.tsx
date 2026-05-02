"use client";

import { useState, Suspense } from "react";
import { TemplateProvider } from "@/components/TemplateContext";
import { TemplateEditor } from "@/components/TemplateEditor";
import { useTemplateContext } from "@/components/TemplateContext";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Edit3, Rocket, ArrowLeft, CalendarClock, Layout } from "lucide-react";

function EditButton() {
  const { setIsEditorOpen, isEditorOpen, shopData } = useTemplateContext();
  const searchParams = useSearchParams();
  const isManageMode = searchParams.get("manage") === "true";
  
  if (!isManageMode || isEditorOpen) return null;
  
  return (
    <button
      onClick={() => setIsEditorOpen(true)}
      className="fixed bottom-8 right-8 z-[90] bg-black text-white p-4 rounded-2xl shadow-2xl hover:scale-110 transition-all flex items-center gap-3 group"
    >
      <Edit3 className="w-5 h-5" />
      <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-500 font-bold text-sm whitespace-nowrap">
        Customize Template
      </span>
    </button>
  );
}

function BuilderToolbar() {
  const { isEditorOpen, setIsEditorOpen, publishClinic, shopData } = useTemplateContext();
  const searchParams = useSearchParams();
  const isManageMode = searchParams.get("manage") === "true";
  const [isPublishing, setIsPublishing] = useState(false);
  const [lastPublished, setLastPublished] = useState<string | null>(null);

  if (!isManageMode) return null;

  const handlePublish = () => {
    setIsPublishing(true);
    setTimeout(() => {
      publishClinic();
      setIsPublishing(false);
      setLastPublished(new Date().toLocaleTimeString());
      // Redirect to dashboard after publishing
      window.location.href = "/dashboard/owner";
    }, 1000);
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-[100] bg-black text-white px-8 py-3 flex items-center justify-between shadow-2xl backdrop-blur-md bg-black/90">
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center">
            <CalendarClock className="w-4 h-4 text-white" />
          </div>
          <span className="font-bold text-sm tracking-tight text-white">Project: <span className="text-emerald-400">{shopData.name}</span></span>
        </div>
        <div className="h-4 w-px bg-white/10 hidden md:block" />
        <div className="hidden md:flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-white/40">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          Editing Live Draft
        </div>
      </div>

      <div className="flex items-center gap-4">
        {lastPublished && (
          <span className="text-[10px] font-medium text-white/40 italic hidden sm:block">
            Last saved at {lastPublished}
          </span>
        )}
        <button 
          onClick={() => setIsEditorOpen(!isEditorOpen)}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border ${isEditorOpen ? 'bg-white text-black border-white' : 'bg-transparent text-white border-white/20 hover:bg-white/10'}`}
        >
          {isEditorOpen ? 'Close Builder' : 'Open Sidebar'}
        </button>
        <button 
          onClick={handlePublish}
          disabled={isPublishing}
          className="bg-emerald-500 hover:bg-emerald-400 text-white px-6 py-2 rounded-xl text-xs font-black uppercase tracking-widest shadow-lg shadow-emerald-500/20 active:scale-95 transition-all flex items-center gap-2"
        >
          {isPublishing ? 'Syncing...' : 'Go Live'} <Rocket className="w-3.5 h-3.5" />
        </button>
        <div className="h-4 w-px bg-white/10 mx-2" />
        <Link href="/dashboard/owner" className="p-2 hover:bg-white/10 rounded-xl transition-colors text-white/60 hover:text-white">
          <ArrowLeft className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}

function TemplateContent({ children }: { children: React.ReactNode }) {
  const searchParams = useSearchParams();
  const isManageMode = searchParams.get("manage") === "true";
  const { isEditorOpen } = useTemplateContext();

  return (
    <div className={`transition-all duration-500 ease-in-out ${isEditorOpen ? "md:pr-[450px]" : ""} ${isManageMode ? "pt-14" : ""}`}>
      <BuilderToolbar />
      {children}
      {isManageMode && <TemplateEditor />}
      <EditButton />
    </div>
  );
}

export default function TemplatesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <TemplateProvider>
      <Suspense fallback={<div className="min-h-screen bg-white" />}>
        <TemplateContent>
          {children}
        </TemplateContent>
      </Suspense>
    </TemplateProvider>
  );
}
