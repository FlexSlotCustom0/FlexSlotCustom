from fastapi import APIRouter, HTTPException
from backend.database import supabase

router = APIRouter()

@router.get("/")
async def get_templates():
    response = supabase.table("templates").select("*").execute()
    if hasattr(response, 'error') and response.error:
        raise HTTPException(status_code=400, detail=str(response.error))
    return response.data
