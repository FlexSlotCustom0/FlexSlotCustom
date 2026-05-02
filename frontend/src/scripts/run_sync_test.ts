import { createBrowserClient } from "@supabase/ssr";

const supabase = createBrowserClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  {
    auth: {
      persistSession: false,
      storage: { getItem: () => null, setItem: () => {}, removeItem: () => {} }
    }
  }
);

const OWNER_EMAIL = "deeghayuarandara12@gmail.com";
const PATIENT_EMAIL = "deeghayuarandara1@gmail.com";
const PASS = "password123";

async function runFullTest() {
  console.log("=== STARTING FULL SYSTEM SYNC TEST ===");

  // 1. OWNER
  console.log(`\n[1/5] Checking Owner: ${OWNER_EMAIL}...`);
  const { data: oLogin, error: oErr } = await supabase.auth.signInWithPassword({ email: OWNER_EMAIL, password: PASS });
  
  let ownerId = oLogin.user?.id;
  if (oErr) {
    console.log(`Login failed (${oErr.message}). Attempting Registration...`);
    const { data: oReg, error: oRegErr } = await supabase.auth.signUp({
      email: OWNER_EMAIL, password: PASS, options: { data: { full_name: "Deegaya Owner", role: "PROVIDER" } }
    });
    if (oRegErr) {
      console.error("Owner Registration failed:", oRegErr.message);
      return;
    }
    ownerId = oReg.user?.id;
    console.log("Owner Registered.");
  } else {
    console.log("Owner Logged in.");
  }

  if (!ownerId) { console.error("Could not get Owner ID"); return; }

  // 2. TENANT
  console.log("\n[2/5] Verifying Tenant...");
  const { data: tenants } = await supabase.from("tenants").select("*").eq("owner_id", ownerId);
  let tenantId = tenants && tenants.length > 0 ? tenants[0].id : null;

  if (!tenantId) {
    console.log("No tenant found. Creating...");
    const { data: newT, error: newTErr } = await supabase.from("tenants").insert({
      owner_id: ownerId, name: "Deegaya Wellness", slug: "deegaya-wellness-" + Date.now(), type: "HUMAN", template_id: "clinic-clean"
    }).select().single();
    if (newTErr) { console.error("Tenant Creation failed:", newTErr.message); return; }
    tenantId = newT.id;
    console.log("Tenant Created.");
  } else {
    console.log("Tenant found:", tenants[0].slug);
  }

  // 3. SERVICE
  console.log("\n[3/5] Verifying Service...");
  const { data: services } = await supabase.from("services").select("*").eq("tenant_id", tenantId);
  let serviceId = services && services.length > 0 ? services[0].id : null;

  if (!serviceId) {
    console.log("No services found. Creating...");
    const { data: newS, error: newSErr } = await supabase.from("services").insert({
      tenant_id: tenantId, name: "Deep Sync Consultation", price: "$150", duration: "45 min"
    }).select().single();
    if (newSErr) { console.error("Service Creation failed:", newSErr.message); return; }
    serviceId = newS.id;
    console.log("Service Created.");
  } else {
    console.log("Service found:", services[0].name);
  }

  // 4. PATIENT
  console.log(`\n[4/5] Checking Patient: ${PATIENT_EMAIL}...`);
  const { data: pLogin, error: pErr } = await supabase.auth.signInWithPassword({ email: PATIENT_EMAIL, password: PASS });
  let patientId = pLogin.user?.id;

  if (pErr) {
    console.log(`Login failed (${pErr.message}). Attempting Registration...`);
    const { data: pReg, error: pRegErr } = await supabase.auth.signUp({
      email: PATIENT_EMAIL, password: PASS, options: { data: { full_name: "Deegaya Patient", role: "PATIENT" } }
    });
    if (pRegErr) { console.error("Patient Registration failed:", pRegErr.message); return; }
    patientId = pReg.user?.id;
    console.log("Patient Registered.");
  } else {
    console.log("Patient Logged in.");
  }

  if (!patientId) { console.error("Could not get Patient ID"); return; }

  // 5. BOOKING
  console.log("\n[5/5] Creating Test Booking...");
  const { data: booking, error: bErr } = await supabase.from("bookings").insert({
    tenant_id: tenantId, customer_id: patientId, service_id: serviceId,
    booking_date: "2026-05-15", booking_time: "11:30 AM", status: "PENDING"
  }).select().single();

  if (bErr) {
    console.error("Booking Creation failed:", bErr.message);
  } else {
    console.log("BOOKING SYNCED SUCCESSFULLY!");
    console.log("Booking ID:", booking.id);
  }

  console.log("\n=== FULL TEST COMPLETE ===");
}

runFullTest();
