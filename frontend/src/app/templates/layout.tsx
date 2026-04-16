"use client";

import { TemplateProvider } from "@/components/TemplateContext";
import { TemplateEditor } from "@/components/TemplateEditor";
import { Edit3 } from "lucide-react";
import { useTemplateContext } from "@/components/TemplateContext";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function EditButton() {
  const { setIsEditorOpen, isEditorOpen, shopData } = useTemplateContext();
  const searchParams = useSearchParams();
  const isManageMode = searchParams.get("manage") === "true";
  
  if (!isManageMode || isEditorOpen) return null;
  
  return (
    <button
      onClick={() => setIsEditorOpen(true)}
      className="fixed bottom-8 right-8 z-[90] bg-black text-white p-4 rounded-2xl shadow-2xl hover:scale-110 transition-all flex items-center gap-3 group"
      style={{ backgroundColor: shopData.primaryColor }}
    >
      <Edit3 className="w-5 h-5" />
      <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-500 font-bold text-sm whitespace-nowrap">
        Customize Template
      </span>
    </button>
  );
}

function TemplateContent({ children }: { children: React.ReactNode }) {
  const searchParams = useSearchParams();
  const isManageMode = searchParams.get("manage") === "true";
  const { isEditorOpen } = useTemplateContext();

  return (
    <div className={`transition-all duration-500 ease-in-out ${isEditorOpen ? "md:pr-[450px]" : ""}`}>
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
