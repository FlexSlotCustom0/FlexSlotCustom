import { createBrowserClient } from "@supabase/ssr";

const supabase = createBrowserClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

async function probe() {
  console.log("--- PROBING DATABASE ---");

  // 1. Tenants
  const { data: tenants, error: tErr } = await supabase.from("tenants").select("*").order("created_at", { ascending: false }).limit(5);
  if (tErr) console.error("Tenants Error:", tErr);
  console.log("\nLast 5 Tenants:");
  console.table(tenants?.map(t => ({ id: t.id, name: t.name, slug: t.slug, owner: t.owner_id })));

  // 2. Services
  const { data: services, error: sErr } = await supabase.from("services").select("*").order("created_at", { ascending: false }).limit(5);
  if (sErr) console.error("Services Error:", sErr);
  console.log("\nLast 5 Services:");
  console.table(services?.map(s => ({ id: s.id, name: s.name, price: s.price, tenant: s.tenant_id })));

  // 3. Bookings
  const { data: bookings, error: bErr } = await supabase.from("bookings").select("*").order("created_at", { ascending: false }).limit(5);
  if (bErr) console.error("Bookings Error:", bErr);
  console.log("\nLast 5 Bookings:");
  console.table(bookings?.map(b => ({ id: b.id, tenant: b.tenant_id, customer: b.customer_id, date: b.booking_date, status: b.status })));

  // 4. Profiles
  const { data: profiles, error: pErr } = await supabase.from("profiles").select("*").order("created_at", { ascending: false }).limit(5);
  if (pErr) console.error("Profiles Error:", pErr);
  console.log("\nLast 5 Profiles:");
  console.table(profiles?.map(p => ({ id: p.id, name: p.full_name, role: p.role })));

  console.log("\n--- PROBE COMPLETE ---");
}

probe();
