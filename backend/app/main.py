from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import inventory
from app.config import settings

print(f"Database URL: {settings.database_url}")

origins = settings.allowed_origins.split(",")

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

app.include_router(inventory.router, prefix="/inventory", tags=["inventory"])

@app.get("/")
def root():
    return {"message": "Pharmacy API is running!"}
