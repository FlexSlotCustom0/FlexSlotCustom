from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlmodel import Session, select
from typing import List
from .database import create_db_and_tables, get_session
from .models import Tenant, Service, Slot, Booking
from datetime import datetime

app = FastAPI(title="FlexSlot Custom API")

# CORS Configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, specify the frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
def on_startup():
    create_db_and_tables()

@app.get("/")
def read_root():
    return {"message": "FlexSlot Custom API is operational"}

# --- Tenant Endpoints ---
@app.get("/tenants", response_model=List[Tenant])
def get_tenants(session: Session = Depends(get_session)):
    return session.exec(select(Tenant)).all()

@app.post("/tenants", response_model=Tenant)
def create_tenant(tenant: Tenant, session: Session = Depends(get_session)):
    session.add(tenant)
    session.commit()
    session.refresh(tenant)
    return tenant

# --- Service Endpoints ---
@app.get("/tenants/{slug}/services", response_model=List[Service])
def get_tenant_services(slug: str, session: Session = Depends(get_session)):
    tenant = session.exec(select(Tenant).where(Tenant.slug == slug)).first()
    if not tenant:
        raise HTTPException(status_code=404, detail="Tenant not found")
    return session.exec(select(Service).where(Service.tenant_id == tenant.id)).all()

# --- Slot Endpoints ---
@app.get("/tenants/{slug}/slots", response_model=List[Slot])
def get_tenant_slots(slug: str, session: Session = Depends(get_session)):
    tenant = session.exec(select(Tenant).where(Tenant.slug == slug)).first()
    if not tenant:
        raise HTTPException(status_code=404, detail="Tenant not found")
    return session.exec(select(Slot).where(Slot.tenant_id == tenant.id)).all()

@app.post("/slots", response_model=Slot)
def create_slot(slot: Slot, session: Session = Depends(get_session)):
    session.add(slot)
    session.commit()
    session.refresh(slot)
    return slot

# --- Booking Endpoints ---
@app.get("/bookings", response_model=List[Booking])
def get_bookings(session: Session = Depends(get_session)):
    return session.exec(select(Booking)).all()

@app.post("/bookings", response_model=Booking)
def create_booking(booking: Booking, session: Session = Depends(get_session)):
    session.add(booking)
    session.commit()
    session.refresh(booking)
    return booking

@app.delete("/bookings/{booking_id}")
def delete_booking(booking_id: int, session: Session = Depends(get_session)):
    booking = session.get(Booking, booking_id)
    if not booking:
        raise HTTPException(status_code=404, detail="Booking not found")
    session.delete(booking)
    session.commit()
    return {"message": "Booking deleted"}
