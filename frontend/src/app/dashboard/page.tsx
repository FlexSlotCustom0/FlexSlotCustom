"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function DashboardRedirect() {
  const router = useRouter();

  useEffect(() => {
    const role = localStorage.getItem("flexslot_role");
    
    if (role === "owner") {
      router.push("/dashboard/owner");
    } else if (role === "customer") {
      router.push("/dashboard/customer");
    } else {
      router.push("/login?step=role");
    }
  }, [router]);

  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="w-8 h-8 border-4 border-gray-100 border-t-black rounded-full animate-spin" />
    </div>
  );
}
