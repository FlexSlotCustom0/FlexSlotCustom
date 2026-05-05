-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Master Blueprints: templates table
CREATE TABLE IF NOT EXISTS public.templates (
    id TEXT PRIMARY KEY, -- e.g., 'dental-sigma'
    name TEXT NOT NULL,
    description TEXT,
    default_ui_config JSONB NOT NULL DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tenant Storage: clinics table
CREATE TABLE IF NOT EXISTS public.clinics (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    owner_id UUID NOT NULL, -- Link to auth.users if needed
    template_id TEXT REFERENCES public.templates(id),
    ui_config JSONB NOT NULL DEFAULT '{}',
    trial_ends_at TIMESTAMP WITH TIME ZONE DEFAULT (NOW() + INTERVAL '7 days'),
    is_subscribed BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Initial Templates Seeding (Sigma Aesthetic)
INSERT INTO public.templates (id, name, description, default_ui_config)
VALUES 
(
    'dental-sigma', 
    'Dental Sigma', 
    'High-contrast professional layout for modern dental practices.', 
    '{
        "primaryColor": "#800000",
        "secondaryColor": "#000000",
        "fontFamily": "Inter, sans-serif",
        "theme": "dark",
        "logoUrl": "https://placeholder.com/logo-maroon.png",
        "borderRadius": "8px"
    }'
),
(
    'vet-sigma', 
    'Veterinary Sigma', 
    'Modern, sleek design for high-end veterinary clinics.', 
    '{
        "primaryColor": "#800000",
        "secondaryColor": "#1a1a1a",
        "fontFamily": "Inter, sans-serif",
        "theme": "dark",
        "logoUrl": "https://placeholder.com/logo-vet.png",
        "borderRadius": "12px"
    }'
),
(
    'family-sigma', 
    'Family Sigma', 
    'Clean and authoritative design for family medicine.', 
    '{
        "primaryColor": "#800000",
        "secondaryColor": "#ffffff",
        "fontFamily": "Inter, sans-serif",
        "theme": "light",
        "logoUrl": "https://placeholder.com/logo-family.png",
        "borderRadius": "4px"
    }'
)
ON CONFLICT (id) DO UPDATE 
SET name = EXCLUDED.name, 
    description = EXCLUDED.description, 
    default_ui_config = EXCLUDED.default_ui_config;

-- RPC for Template Selection with JSONB Merge
CREATE OR REPLACE FUNCTION public.select_clinic_template(
    p_clinic_id UUID,
    p_template_id TEXT,
    p_default_config JSONB
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    v_updated_config JSONB;
BEGIN
    UPDATE public.clinics
    SET 
        template_id = p_template_id,
        ui_config = p_default_config || ui_config
    WHERE id = p_clinic_id
    RETURNING ui_config INTO v_updated_config;
    
    RETURN v_updated_config;
END;
$$;

-- Scheduler: slots table
CREATE TABLE IF NOT EXISTS public.slots (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    clinic_id UUID NOT NULL REFERENCES public.clinics(id) ON DELETE CASCADE,
    start_time TIMESTAMP WITH TIME ZONE NOT NULL,
    end_time TIMESTAMP WITH TIME ZONE NOT NULL,
    status TEXT NOT NULL DEFAULT 'available', -- available, booked, blocked
    service_id TEXT,
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    -- Constraint to prevent start_time being after end_time
    CONSTRAINT start_before_end CHECK (start_time < end_time)
);

-- Index for faster range queries
CREATE INDEX IF NOT EXISTS idx_slots_clinic_time ON public.slots(clinic_id, start_time, end_time);

