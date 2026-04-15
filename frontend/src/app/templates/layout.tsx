"use client";

import { TemplateProvider } from "@/components/TemplateContext";
import { TemplateEditor } from "@/components/TemplateEditor";
import { Edit3 } from "lucide-react";
import { useState } from "react";
import { useTemplateContext } from "@/components/TemplateContext";

function EditButton() {
  const { setIsEditorOpen, isEditorOpen, shopData } = useTemplateContext();
  
  if (isEditorOpen) return null;
  
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

export default function TemplatesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <TemplateProvider>
      {children}
      <TemplateEditor />
      <EditButton />
    </TemplateProvider>
  );
}
