import { createBrowserClient } from "@supabase/ssr";

const supabase = createBrowserClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

async function checkSync() {
  console.log("--- STARTING DATABASE SYNC VERIFICATION ---");

  // 1. Check Profiles
  const { data: profiles, error: pError } = await supabase
    .from("profiles")
    .select("*")
    .in("email", ["deeghayuarandara12@gmail.com", "deeghayuarandara1@gmail.com"]);

  if (pError) {
    console.error("Error fetching profiles:", pError);
    return;
  }

  console.log("\nProfiles Found:");
  profiles.forEach(p => {
    console.log(`- ${p.email}: Role=${p.role}, ID=${p.id}`);
  });

  const owner = profiles.find(p => p.email === "deeghayuarandara12@gmail.com");
  const patient = profiles.find(p => p.email === "deeghayuarandara1@gmail.com");

  if (owner) {
    // 2. Check Tenants for Owner
    const { data: tenants } = await supabase
      .from("tenants")
      .select("*")
      .eq("owner_id", owner.id);
    
    console.log("\nTenants (Clinics) for Owner:");
    tenants?.forEach(t => {
      console.log(`- ${t.name} (Slug: ${t.slug})`);
    });

    if (tenants && tenants.length > 0) {
      const tenantId = tenants[0].id;

      // 3. Check Services for Tenant
      const { data: services } = await supabase
        .from("services")
        .select("*")
        .eq("tenant_id", tenantId);
      
      console.log("\nServices for Clinic:");
      services?.forEach(s => {
        console.log(`- ${s.name}: ${s.price}`);
      });

      // 4. Check Bookings for Tenant
      const { data: bookings } = await supabase
        .from("bookings")
        .select(`
          *,
          profiles:customer_id (full_name, email),
          services:service_id (name)
        `)
        .eq("tenant_id", tenantId);
      
      console.log("\nBookings for Clinic:");
      bookings?.forEach(b => {
        console.log(`- [${b.status}] ${b.booking_date} at ${b.booking_time} | Patient: ${(b.profiles as any).email} | Service: ${(b.services as any).name}`);
      });
    }
  }

  console.log("\n--- VERIFICATION COMPLETE ---");
}

checkSync();
