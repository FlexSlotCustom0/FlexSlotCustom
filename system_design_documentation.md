# FlexSlot SaaS System Design Documentation

It is completely understandable to feel overwhelmed. When a project grows, the codebase can become very complex. Taking a step back to understand the **"Big Picture"** through diagrams is exactly what professional software architects do. 

Below is the complete design documentation for your FlexSlot platform. These diagrams explain how the data flows, how the database is structured, and how the different pieces communicate.

---

## 1. High-Level System Architecture

This diagram shows the main "building blocks" of your project. Think of it as a map of the city.

- **Next.js (Frontend)**: The visual part the user sees (the Dashboard and the Clinic landing pages).
- **Supabase (Backend)**: Where your data and user accounts are securely stored.
- **Groq (AI)**: The "brain" that understands what the patient types in the chat.

```mermaid
graph TD
    User((User: Owner / Patient))
    
    subgraph Frontend ["Next.js Web Application (Your Code)"]
        UI["Clinic Landing Pages (/clinic/[slug])"]
        Dash["Owner Dashboard (/dashboard)"]
        AILogic["AI Booking System Component"]
    end
    
    subgraph Backend ["Supabase (Database & Security)"]
        Auth["Supabase Auth (Logins)"]
        DB[("PostgreSQL Database")]
        RLS["Row Level Security (Privacy)"]
    end
    
    subgraph External ["External Intelligence"]
        LLM["Groq API (Llama 3 Model)"]
    end
    
    User -->|Visits / Interacts| Frontend
    Frontend <-->|Logs in / Registers| Auth
    Frontend <-->|Saves & Reads Data| DB
    DB -.->|"Protects Data"| RLS
    AILogic -->|"Sends user message"| LLM
    LLM -->|"Returns booking details"| AILogic
```

---

## 2. Entity-Relationship Diagram (ERD)

The ERD is the blueprint of your database. It shows all the "Tables" (Entities) and how they connect to each other. 
- The lines connecting the boxes show relationships. For example, one `TENANT` (Clinic) can have many `SERVICES`.
- `PK` means Primary Key (the unique ID).
- `FK` means Foreign Key (a link to another table's ID).

```mermaid
erDiagram
    PROFILES ||--o{ TENANTS : "owns"
    PROFILES ||--o{ BOOKINGS : "makes (as patient)"
    TENANTS ||--o{ SERVICES : "offers"
    TENANTS ||--o{ STAFF : "employs"
    TENANTS ||--o{ BOOKINGS : "receives"
    TENANTS ||--o{ FAQS : "has"
    SERVICES ||--o{ BOOKINGS : "is booked in"

    PROFILES {
        uuid id PK "Matches Auth User ID"
        string full_name "User's Name"
        string role "PROVIDER or PATIENT"
    }
    
    TENANTS {
        uuid id PK "Clinic ID"
        uuid owner_id FK "Links to Profiles"
        string name "Clinic Name"
        string slug "Unique URL (e.g., /clinic/my-vet)"
        string template_id "Which design theme to use"
    }
    
    SERVICES {
        uuid id PK "Service ID"
        uuid tenant_id FK "Links to Clinic"
        string name "e.g., X-Ray, Checkup"
        string price "e.g., $150"
        string duration "e.g., 30 mins"
    }
    
    STAFF {
        uuid id PK "Doctor ID"
        uuid tenant_id FK "Links to Clinic"
        string name "Dr. Smith"
        string role "Cardiologist"
    }
    
    BOOKINGS {
        uuid id PK "Appointment ID"
        uuid tenant_id FK "Which clinic?"
        uuid customer_id FK "Which patient?"
        uuid service_id FK "Which service?"
        date booking_date "2026-05-10"
        string booking_time "10:00 AM"
        string status "PENDING or CONFIRMED"
    }
```

---

## 3. The AI Booking Flow (Sequence Diagram)

This is a step-by-step flowchart of what exactly happens when a patient visits a clinic's URL and tries to book an appointment using the AI chat.

```mermaid
sequenceDiagram
    actor Patient
    participant Web as Clinic Webpage
    participant API as AI Server (/api/ai)
    participant Groq as Groq LLM (AI)
    participant DB as Supabase DB

    Patient->>Web: Types: "Book a dental cleaning for tomorrow at 2 PM"
    
    Note over Web,DB: 1. Gather Context
    Web->>DB: Fetch clinic's services & already booked times
    DB-->>Web: Returns data (e.g., Dental Cleaning = ID 123)
    
    Note over Web,Groq: 2. Ask the Brain
    Web->>API: Sends message + Services + Booked Times
    API->>Groq: Analyzes natural language
    Groq-->>API: Returns formatted JSON { service_id: 123, time: "14:00" }
    API-->>Web: Sends JSON back to webpage
    
    Note over Web,Patient: 3. Confirm with Patient
    Web->>Patient: AI says: "I found a slot at 2 PM. Confirm?"
    Patient->>Web: Clicks "Confirm & Book"
    
    Note over Web,DB: 4. Save to Database
    Web->>DB: INSERT into 'bookings' table
    DB-->>Web: Success!
    Web->>Patient: "Booking Confirmed!"
```

---

## 4. Owner Onboarding Flowchart

This shows the journey of a new Doctor/Clinic Owner signing up for your platform for the first time.

```mermaid
flowchart TD
    Start([Owner Visits /login]) --> Sign[Enters Email & Password]
    Sign --> Auth{Supabase Auth}
    Auth -- Success --> Role[Select Role: PROVIDER]
    Role --> ClinicName[Enter Clinic Name & URL Slug]
    ClinicName --> Template[Choose a Visual Template]
    Template --> SaveDB[System creates 'profiles' and 'tenants' row]
    SaveDB --> Dash([Owner Dashboard Redirect])
    
    Dash --> DashA[Manage Services]
    Dash --> DashB[Manage Staff]
    Dash --> DashC[View Live Clinic]
```

---

## What documents should a project like this have?

To keep your project organized and understandable, a professional software project usually maintains the following core documents (which you can create as markdown files in a `docs/` folder):

1. **`README.md`**: The front page. Explains what the project is, how to install it (`npm install`), and how to run it (`npm run dev`).
2. **`ARCHITECTURE.md`**: Contains the diagrams I generated above so any new developer can understand the big picture instantly.
3. **`DATABASE_SCHEMA.md`**: The exact SQL commands used to create the database (like the ones I provided you earlier).
4. **`API_ROUTES.md`**: A list of backend endpoints (like your `/api/ai` route), what data they expect, and what they return.
5. **`USER_MANUAL.md`**: A simple guide for your end-users (the clinic owners) on how to use their dashboard.

Keeping these documents updated ensures that you never feel lost, even if you take a month off from coding!
