import { createClient } from "@/utils/supabase/server";
import { notFound } from "next/navigation";
import ClinicClean from "@/components/templates/ClinicClean";

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

  // 5. Select Template Component
  let TemplateComponent = ClinicClean;
  
  // In the future, we will map other templates here
  // if (tenant.template_id === 'vet-warm') TemplateComponent = VetWarm;

  return (
    <TemplateComponent 
      tenant={tenant} 
      services={services || []} 
      staff={staff || []} 
      faqs={faqs || []} 
    />
  );
}
