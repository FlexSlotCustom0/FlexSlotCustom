import { createClient } from "@/utils/supabase/server";
import { notFound } from "next/navigation";
import { TemplateProvider } from "@/components/TemplateContext";

// Import your template layouts (Assuming we refactor them to be reusable)
// For now, we will create a switcher here.

export default async function ClinicPage({ params }: { params: { slug: string } }) {
  const { slug } = await params;
  const supabase = await createClient();

  // 1. Fetch Tenant
  const { data: tenant, error } = await supabase
    .from("tenants")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error || !tenant) {
    return notFound();
  }

  // 2. Fetch Services
  const { data: services } = await supabase
    .from("services")
    .select("*")
    .eq("tenant_id", tenant.id);

  // 3. Fetch Staff
  const { data: staff } = await supabase
    .from("staff")
    .select("*")
    .eq("tenant_id", tenant.id);

  // 4. Fetch FAQs
  const { data: faqs } = await supabase
    .from("faqs")
    .select("*")
    .eq("tenant_id", tenant.id);

  return (
    <div className="min-h-screen">
      {/* We will render the template based on tenant.template_id */}
      {/* In a real implementation, we'd pass this data into a Provider */}
      <div className="p-20 text-center">
        <h1 className="text-4xl font-serif">{tenant.name}</h1>
        <p className="text-gray-500 mt-4">Welcome to our clinic. This page is dynamically loaded from Supabase.</p>
        
        <div className="mt-10 grid gap-4 max-w-xl mx-auto">
          <h2 className="text-xl font-bold">Our Services</h2>
          {services?.map(s => (
            <div key={s.id} className="p-4 border rounded-xl">
              {s.name} - {s.price}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
