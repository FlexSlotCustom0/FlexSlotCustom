from fastapi import APIRouter, HTTPException, Header
from backend.database import supabase
from datetime import datetime, timezone

router = APIRouter()

@router.post("/select-template/{template_id}")
async def select_template(template_id: str, x_clinic_id: str = Header(...)):
    # 1. Fetch Template Config
    template_res = supabase.table("templates").select("default_ui_config").eq("id", template_id).single().execute()
    if not template_res.data:
        raise HTTPException(status_code=404, detail="Template not found")
    
    default_config = template_res.data["default_ui_config"]

    # 2. Bypass logic for dummy ID
    if x_clinic_id == "dummy-clinic-id":
        # Create or update dummy clinic
        supabase.table("clinics").upsert({
            "id": "00000000-0000-0000-0000-000000000000",
            "name": "Dummy Sigma Clinic",
            "slug": "dummy-sigma",
            "owner_id": "00000000-0000-0000-0000-000000000000",
            "trial_ends_at": "2099-01-01T00:00:00Z",
            "is_subscribed": True
        }).execute()
        
        rpc_res = supabase.rpc("select_clinic_template", {
            "p_clinic_id": "00000000-0000-0000-0000-000000000000",
            "p_template_id": template_id,
            "p_default_config": default_config
        }).execute()
        return {"message": "Dummy template selected", "data": rpc_res.data}

    # 3. Fetch Clinic Data for Security & Trial Logic
    clinic_res = supabase.table("clinics").select("*").eq("id", x_clinic_id).single().execute()
    if not clinic_res.data:
        raise HTTPException(status_code=404, detail="Clinic not found")
    
    clinic = clinic_res.data
    
    # 4. Security Check: Trial Logic
    trial_ends_at = datetime.fromisoformat(clinic["trial_ends_at"].replace('Z', '+00:00'))
    is_subscribed = clinic["is_subscribed"]
    
    if not is_subscribed and trial_ends_at < datetime.now(timezone.utc):
        raise HTTPException(status_code=403, detail="Trial period expired. Please subscribe to select templates.")

    # 5. Atomic Update with JSONB Merge
    rpc_res = supabase.rpc("select_clinic_template", {
        "p_clinic_id": x_clinic_id,
        "p_template_id": template_id,
        "p_default_config": default_config
    }).execute()

    if hasattr(rpc_res, 'error') and rpc_res.error:
        raise HTTPException(status_code=400, detail=str(rpc_res.error))
    
    return {"message": "Template selected and merged successfully", "data": rpc_res.data}

@router.get("/by-slug/{slug}")
async def get_clinic_by_slug(slug: str):
    # Dummy bypass for portal
    if slug == "dummy-sigma":
         return {
            "id": "00000000-0000-0000-0000-000000000000",
            "name": "Dummy Sigma Clinic",
            "slug": "dummy-sigma",
            "template_id": "clinic-clean",
            "ui_config": {
                "primaryColor": "#800000",
                "secondaryColor": "#000000",
                "fontFamily": "Inter, sans-serif",
                "theme": "dark"
            }
         }

    response = supabase.table("clinics").select("*").eq("slug", slug).single().execute()
    if not response.data:
        raise HTTPException(status_code=404, detail="Clinic not found")
    return response.data
