"use client";

import { Bell } from "lucide-react";
import { PreferenceToggle } from "./PreferenceToggle";

export function NotificationsSection({ role }: any) {
  return (
    <div className="space-y-12 text-black">
      <div className="pb-4 border-b border-gray-50">
        <h3 className="text-sm font-black uppercase tracking-widest flex items-center gap-2">
          <Bell className="w-4 h-4" /> Subscription Channels
        </h3>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <PreferenceToggle label="Electronic Alerts" desc="Receive booking confirmations in real-time." active={true} />
        <PreferenceToggle label="Clinical Insights" desc="Weekly summary of patient load and trends." active={role === "owner"} />
        <PreferenceToggle label="Smart Triage" desc="Allow AI to pre-screen booking requests." active={true} />
        <PreferenceToggle label="Market Visibility" desc="Feature your profile in the global explorer." active={role === "owner"} />
      </div>
    </div>
  );
}
