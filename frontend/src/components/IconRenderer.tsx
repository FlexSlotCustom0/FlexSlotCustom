"use client";

import React from "react";
import * as Icons from "lucide-react";

interface IconRendererProps {
  name: string;
  className?: string;
  fallback?: React.ReactNode;
}

export const IconRenderer: React.FC<IconRendererProps> = ({ name, className, fallback }) => {
  // Try to find the icon in Lucide
  const IconComponent = (Icons as any)[name];

  if (IconComponent) {
    return <IconComponent className={className} />;
  }

  // If not found, return the fallback (which could be the original emoji or text)
  return <>{fallback || name}</>;
};
