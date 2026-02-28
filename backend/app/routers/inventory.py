from fastapi import APIRouter, HTTPException
from app.schemas import MedicineCreate, MedicineUpdate
from datetime import datetime

router = APIRouter()

fake_medicines = []
medicine_id = 1


fake_transactions = []
transaction_id = 1

def calculate_status(quantity, expiry_date):
    if expiry_date < datetime.utcnow():
        return "Expired"
    elif quantity == 0:
        return "Out of Stock"
    elif quantity < 10:
        return "Low Stock"
    else:
        return "Active"


@router.get("/sales_summary")
def today_sales_summary():
    today = datetime.utcnow().date()
    total_sales = sum(
        transaction["total_price"] for transaction in fake_transactions
        if transaction["timestamp"].date() == today
    )

    return {
        "success": True,
        "total_sales": total_sales,
        "date": today
    }

@router.get("/items-sold")
def items_sold_summary():
    today = datetime.utcnow().date()
    items_sold = sum(
        transaction["quantity"] for transaction in fake_transactions
        if transaction["timestamp"].date() == today
    )

    return {
        "success" : True,
        "items_sold": items_sold,
        "date": today
    }

@router.get("/low-stock")
def low_stock_medicines():
    low_stock_items= [
        medicine for medicine in fake_medicines
        if medicine["quantity"] < 10 and medicine["status"] != "Expired"
    ]

    return {
        success: True,
        "data" : low_stock_items
    }

@router.get("/purchase-summary")
def purchase_summary():
    total_purchases = sum(
        medicine["cost_price"] * medicine["quantity"] for medicine in fake_medicines
    )

    return {
        "success": True,
        "total_purchases": total_purchases
    }


@router.post("/medicines")
def create_medicine(medicine: MedicineCreate):
    global medicine_id

    status = calculate_status(medicine.quantity, medicine.expiry_date)

    new_medicine = {
        "id": medicine_id,
        "name": medicine.name,
        "generic_name": medicine.generic_name,
        "category": medicine.category,
        "batch_no": medicine.batch_no,
        "expiry_date": medicine.expiry_date,
        "quantity": medicine.quantity,
        "cost_price": medicine.cost_price,
        "mrp": medicine.mrp,
        "supplier": medicine.supplier,
        "status": status,
        "created_at": datetime.utcnow()
    }

    fake_medicines.append(new_medicine)
    medicine_id += 1

    return {
        "success": True,
        "data": new_medicine
    }

@router.get("/medicines")
def get_medicines():
    return {
        "success" : True,
        "data" : fake_medicines
    }


@router.put("/medicines/{medicine_id}")
def update_medicine(medicine_id: int, medicine: MedicineUpdate):
    for medicine_item in fake_medicines:
        if medicine_item["id"] == medicine_id:
            update_data = medicine.dict(exclude_unset=True)
            for key, value in update_data.items():
                medicine_item[key] = value
            status = calculate_status(medicine_item["quantity"], medicine_item["expiry_date"])
            medicine_item["status"] = status
            return {
                "success": True,
                "data": medicine_item
            }
    raise HTTPException(status_code=404, detail="Medicine not found")

@router.get("/medicines")
def list_medicines(search: str = None, category: str = None):
    filtered_medicines = fake_medicines

    if search: 
        filtered_medicines = [
            medicine for medicine in filtered_medicines
            if search.lower() in medicine["name"].lower() or search.lower() in medicine["generic_name"].lower()
        ]

    if category:
        filtered_medicines = [
            medicine for medicine in filtered_medicines
            if medicine["category"].lower() == category.lower()
        ]

    return {
        "success": True,
        "data": filtered_medicines
    }

@router.post("/sell")
def sell_medicine(medicine_id: int, quantity: int):
    global transaction_id

    for medicine_item in fake_medicines:
        if medicine_item["id"] == medicine_id:
            if medicine_item["quantity"] < quantity:
                raise HTTPException(status_code=400, detail="Insufficient stock")

            medicine_item["quantity"] -= quantity
            status = calculate_status(medicine_item["quantity"], medicine_item["expiry_date"])
            medicine_item["status"] = status

            transaction = {
                "id": transaction_id,
                "medicine_id": medicine_id,
                "quantity": quantity,
                "total_price": quantity * medicine_item["mrp"],
                "timestamp": datetime.utcnow()
            }

            fake_transactions.append(transaction)
            transaction_id += 1
            return {
                "success": True,
                "data": transaction
            }

    raise HTTPException(status_code=404, detail="Medicine not found")

