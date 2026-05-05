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

    # 2. Fetch Clinic Data for Security & Trial Logic
    clinic_res = supabase.table("clinics").select("*").eq("id", x_clinic_id).single().execute()
    if not clinic_res.data:
        raise HTTPException(status_code=404, detail="Clinic not found")
    
    clinic = clinic_res.data
    
    # 3. Security Check: Trial Logic
    trial_ends_at = datetime.fromisoformat(clinic["trial_ends_at"].replace('Z', '+00:00'))
    is_subscribed = clinic["is_subscribed"]
    
    if not is_subscribed and trial_ends_at < datetime.now(timezone.utc):
        raise HTTPException(status_code=403, detail="Trial period expired. Please subscribe to select templates.")

    # 4. Atomic Update with JSONB Merge
    # We use a RPC (Stored Procedure) to use the PostgreSQL || operator safely
    # The RPC name: select_clinic_template(clinic_id, template_id, new_config)
    
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
    response = supabase.table("clinics").select("*").eq("slug", slug).single().execute()
    if not response.data:
        raise HTTPException(status_code=404, detail="Clinic not found")
    return response.data

