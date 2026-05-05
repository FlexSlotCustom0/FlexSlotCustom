from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from backend.routes import templates, clinics, scheduler

app = FastAPI(title="FlexSlot Template Engine")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(templates.router, prefix="/api/v1/templates", tags=["Templates"])
app.include_router(clinics.router, prefix="/api/v1/clinics", tags=["Clinics"])
app.include_router(scheduler.router, prefix="/api/v1/scheduler", tags=["Scheduler"])


@app.get("/")
async def root():
    return {"message": "FlexSlot API is running"}
