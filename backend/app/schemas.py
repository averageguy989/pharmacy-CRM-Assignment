from pydantic import BaseModel
from datetime import datetime
from typing import Optional

class MedicineCreate(BaseModel):
    name: str
    generic_name: str
    category: str
    batch_no: str
    expiry_date: datetime
    quantity: int
    cost_price: float
    mrp: float
    supplier: str

class MedicineUpdate(BaseModel):
    name : Optional[str] = None
    generic_name: Optional[str] = None
    category: Optional[str] = None
    batch_no: Optional[str] = None
    expiry_date: Optional[datetime] = None
    quantity: Optional[int] = None
    cost_price: Optional[float] = None
    mrp: Optional[float] = None
    supplier: Optional[str] = None

