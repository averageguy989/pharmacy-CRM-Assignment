from fastapi import FastAPI
from app.routers import inventory



app = FastAPI()
app.include_router(inventory.router, prefix="/inventory", tags=["inventory"])

@app.get("/")
def root():
    return {"message": "Pharmacy API is running!"}


