from sqlmodel import Session, select
from .database import engine, create_db_and_tables
from .models import Tenant, Service, Slot
from datetime import datetime, timedelta

def seed_data():
    create_db_and_tables()
    with Session(engine) as session:
        # Check if already seeded
        if session.exec(select(Tenant)).first():
            print("Database already seeded.")
            return

        # Create Tenants
        city_med = Tenant(name="City Medical Group", slug="clinic-clean", config='{"primaryColor": "#2563eb"}')
        paw_tail = Tenant(name="Paw & Tail Veterinary", slug="vet-warm", config='{"primaryColor": "#ea580c"}')
        dental = Tenant(name="Dental Associates", slug="dental-associates", config='{"primaryColor": "#059669"}')

        session.add(city_med)
        session.add(paw_tail)
        session.add(dental)
        session.commit()

        # Create Services for City Med
        session.add(Service(tenant_id=city_med.id, name="General Consultation", price="$120", duration="30 min", icon="Stethoscope"))
        session.add(Service(tenant_id=city_med.id, name="Blood Work", price="$85", duration="15 min", icon="Activity"))
        
        # Create Services for Paw Tail
        session.add(Service(tenant_id=paw_tail.id, name="Pet Vaccination", price="$45", duration="20 min", icon="PawPrint"))
        session.add(Service(tenant_id=paw_tail.id, name="Dental Cleaning", price="$150", duration="45 min", icon="Scissors"))

        session.commit()
        print("Database seeded successfully.")

if __name__ == "__main__":
    seed_data()
