# FlexSlot Custom: Project Architecture & Feature Map

This document provides a comprehensive breakdown of the **FlexSlot Custom** platform, detailing every feature, button action, and architectural component from the Landing Page to the Dashboard.

---

## 1. Core Technology Stack
- **Frontend**: Next.js 15+ (App Router), React 19.
- **Styling**: Tailwind CSS (Modern, premium aesthetic).
- **Animations**: Framer Motion (Smooth transitions and micro-interactions).
- **Icons**: Lucide React.
- **Backend/Auth**: Supabase (PostgreSQL, Auth, RLS).
- **Resilience**: **Demo Mode Fallback** (Automatically switches to LocalStorage if Supabase connection fails).

---

## 2. User Journey & Flow

### A. Landing Page (`/`)
The entry point for all users.
- **"Get Started" Button**: Redirects to the Registration Flow (`/login?step=role`).
- **"Sign In" Button**: Redirects to the Login Flow (`/login?step=login`).
- **Feature Cards**: Interactive hover effects showcasing Smart Triage and Pro Themes.

### B. Registration & Onboarding (`/login`)
A multi-step, dynamic flow that tailors the experience based on user type.

1. **Step: Role Selection**
   - **"I'm an Owner"**: Sets user role to `PROVIDER`. Redirects to Niche Selection.
   - **"I'm a Customer"**: Sets user role to `PATIENT`. Redirects to Finalize.
2. **Step: Niche Selection** (Owners Only)
   - Options: General Practice, Specialist, Vet, Dental.
   - **Action**: Sets the `service` type, which filters available templates later.
3. **Step: Finalize Credentials**
   - Fields: Username, Email, Password, Clinic Name (Owner only).
   - **"Build Home" Button**: 
     - **Owner**: Moves to Template Selection.
     - **Customer**: Triggers `handleFinish` (Registration).
4. **Step: Template Selection** (Owners Only)
   - Displays curated UI themes (e.g., *Clinic Clean*, *Vet Warm*).
   - **Action**: Clicking a template triggers `handleFinish` and saves the selection.

### C. Authentication Logic (`handleFinish`)
- **Primary Action**: Attempts `supabase.auth.signUp` or `signIn`.
- **Secondary Action**: Inserts profile and tenant (clinic) data into Supabase.
- **Fallback**: If "Failed to Fetch" occurs, it logs a warning and enters **Demo Mode**, saving state to `localStorage` and redirecting to the dashboard to ensure a zero-friction experience.

---

## 3. Owner Dashboard (`/dashboard/owner`)
The central command center for business owners.

### Sidebar Navigation
- **Analytics**: Displays "Clinical Command" metrics (Visits, Revenue, AI Load).
- **Clinic Themes**: 
  - Allows switching between templates in real-time.
  - **"Use Theme" Button**: Updates the active template ID.
  - **"Finalize Global Styles"**: Opens the Visual Builder.
- **Treatments**: 
  - **"Register New Protocol"**: Opens a slide-over form to add medical services.
  - **"Commit Protocol"**: Saves the service to the registry.
- **Clinic Schedule**: 
  - **"Push to Live"**: Adds a new time slot to the availability list.
  - **"Trash Icon"**: Removes a slot from the live pipeline.
- **Upcoming Feed**: Real-time view of patient bookings.
- **Patient Registry**: Manage the clinical database of customers.

### Central Actions
- **"Visual Builder" Button**: Redirects to `/templates/[id]?manage=true`.
- **"Live Preview" Button**: Opens the public-facing clinic page.
- **"System Governance"**: Access to administrative settings.

---

## 4. Visual Builder & Templates (`/templates/[id]`)
- **Management Mode (`manage=true`)**: Enables the **Builder Toolbar**.
- **"Go Live" Button**:
  1. Synchronizes all local modifications.
  2. Displays a "Syncing..." state.
  3. **Redirects back to the Owner Dashboard** upon completion.
- **Back Arrow**: Returns to the Dashboard without publishing.

---

## 5. Customer Dashboard (`/dashboard/customer`)
- **Search Engine**: Find clinics by name or service.
- **Booking Interface**: View available slots and book appointments.
- **Appointment Manager**: View and cancel upcoming visits.

---

## 6. Database Schema (Supabase)
- **`profiles`**: Links Auth users to roles (PROVIDER/PATIENT).
- **`tenants`**: Maps Owners to their clinics, slugs, and themes.
- **`services`**: Stores the treatment protocols for each clinic.
- **`slots`**: Stores time slot availability and booking status.
