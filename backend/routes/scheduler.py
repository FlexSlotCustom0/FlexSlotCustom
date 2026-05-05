from fastapi import APIRouter, HTTPException, Header, Body
from backend.database import supabase
from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime, timedelta

router = APIRouter()

class SlotCreate(BaseModel):
    start_time: datetime
    end_time: datetime
    service_id: Optional[str] = None

class BulkCreateRequest(BaseModel):
    date: str # YYYY-MM-DD
    start_time: str # HH:MM
    end_time: str # HH:MM
    slot_duration: int # Minutes
    number_of_slots: Optional[int] = None # Optional limit


@router.get("/")
async def get_slots(x_clinic_id: str = Header(...)):
    # Simple bypass for dummy
    actual_clinic_id = "00000000-0000-0000-0000-000000000000" if x_clinic_id == "dummy-clinic-id" else x_clinic_id
    
    response = supabase.table("slots").select("*").eq("clinic_id", actual_clinic_id).order("start_time").execute()
    if hasattr(response, 'error') and response.error:
        raise HTTPException(status_code=400, detail=str(response.error))
    return response.data

@router.post("/bulk-create")
async def bulk_create_slots(req: BulkCreateRequest, x_clinic_id: str = Header(...)):
    actual_clinic_id = "00000000-0000-0000-0000-000000000000" if x_clinic_id == "dummy-clinic-id" else x_clinic_id
    
    slots = []
    try:
        # Parse start and end times
        start_dt = datetime.fromisoformat(f"{req.date}T{req.start_time}:00Z")
        end_dt_limit = datetime.fromisoformat(f"{req.date}T{req.end_time}:00Z")
    except ValueError:
        raise HTTPException(status_code=400, detail="Invalid date or time format. Use YYYY-MM-DD and HH:MM.")

    current_time = start_dt
    count = 0
    
    while current_time + timedelta(minutes=req.slot_duration) <= end_dt_limit:
        # Check if we reached the requested number of slots
        if req.number_of_slots and count >= req.number_of_slots:
            break
            
        next_time = current_time + timedelta(minutes=req.slot_duration)
        slots.append({
            "clinic_id": actual_clinic_id,
            "start_time": current_time.isoformat(),
            "end_time": next_time.isoformat(),
            "status": "available"
        })
        current_time = next_time
        count += 1
        
    if not slots:
        return {"message": "No slots to create in the specified range", "count": 0}
        
    response = supabase.table("slots").insert(slots).execute()
    if hasattr(response, 'error') and response.error:
        raise HTTPException(status_code=400, detail=str(response.error))
        
    return {"message": f"Successfully released {len(slots)} slots", "count": len(slots)}


@router.patch("/{slot_id}")
async def update_slot(slot_id: str, status: str = Body(..., embed=True), x_clinic_id: str = Header(...)):
    response = supabase.table("slots").update({"status": status}).eq("id", slot_id).execute()
    if hasattr(response, 'error') and response.error:
        raise HTTPException(status_code=400, detail=str(response.error))
    return response.data

@router.delete("/{slot_id}")
async def delete_slot(slot_id: str, x_clinic_id: str = Header(...)):
    response = supabase.table("slots").delete().eq("id", slot_id).execute()
    if hasattr(response, 'error') and response.error:
        raise HTTPException(status_code=400, detail=str(response.error))
    return {"message": "Slot deleted successfully"}
