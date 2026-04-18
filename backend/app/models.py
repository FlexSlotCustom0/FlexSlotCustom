from typing import List, Optional
from sqlmodel import Field, SQLModel, Relationship
from datetime import datetime

class Tenant(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    name: str
    slug: str = Field(index=True, unique=True)
    config: str = Field(default="{}")  # JSON string for theme/settings

    services: List["Service"] = Relationship(back_populates="tenant")
    slots: List["Slot"] = Relationship(back_populates="tenant")

class Service(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    tenant_id: int = Field(foreign_key="tenant.id")
    name: str
    price: str
    duration: str
    description: Optional[str] = None
    icon: str = Field(default="Calendar")

    tenant: Tenant = Relationship(back_populates="services")

class Slot(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    tenant_id: int = Field(foreign_key="tenant.id")
    start_time: datetime
    is_locked: bool = Field(default=False)

    tenant: Tenant = Relationship(back_populates="slots")
    bookings: List["Booking"] = Relationship(back_populates="slot")

class Booking(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    slot_id: int = Field(foreign_key="slot.id")
    customer_name: str
    customer_email: str
    service_name: str
    status: str = Field(default="VERIFIED")
    created_at: datetime = Field(default_factory=datetime.utcnow)

    slot: Slot = Relationship(back_populates="bookings")
