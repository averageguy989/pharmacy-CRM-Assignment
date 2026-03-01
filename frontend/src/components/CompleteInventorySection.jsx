function CompleteInventorySection() {

  const medicines = [
    {
      name: "Paracetamol 650mg",
      generic: "Acetaminophen",
      category: "Analgesic",
      batch: "PCM-2024-0892",
      expiry: "2026-08-20",
      quantity: 500,
      cost: 15,
      mrp: 25,
      supplier: "MedSupply Co.",
      status: "Active"
    }
  ]

  return (
    <div className="mt-8">
      
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-800">
          Complete Inventory
        </h2>

        <div className="flex gap-2">
          <button className="border border-gray-200 px-3 py-2 rounded-lg text-sm hover:bg-gray-100">
            Filter
          </button>
          <button className="border border-gray-200 px-3 py-2 rounded-lg text-sm hover:bg-gray-100">
            Export
          </button>
        </div>
      </div>

      {/* ========== DESKTOP TABLE ========== */}
      <div className="hidden md:block overflow-x-auto bg-white border border-gray-100 rounded-xl">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-gray-600">
                <tr>
                    <th className="p-3 text-left">Medicine</th>
                    <th className="p-3 text-left">Generic</th>
                    <th className="p-3 text-left">Category</th>
                    <th className="p-3 text-left">Batch</th>
                    <th className="p-3 text-left">Expiry</th>
                    <th className="p-3 text-left">Quantity</th>
                    <th className="p-3 text-left">Cost</th>
                    <th className="p-3 text-left">MRP</th>
                    <th className="p-3 text-left">Supplier</th>
                    <th className="p-3 text-left">Status</th>
                </tr>
            </thead>
            <tbody>
                {medicines.map((med, index) => (
                    <tr key={index} className="border-t hover:bg-gray-50">
                    <td className="p-3 font-medium text-gray-800">
                        {med.name}
                    </td>
                    <td className="p-3">{med.generic}</td>
                    <td className="p-3">{med.category}</td>
                    <td className="p-3">{med.batch}</td>
                    <td className="p-3">{med.expiry}</td>
                    <td className="p-3">{med.quantity}</td>
                    <td className="p-3">₹{med.cost}</td>
                    <td className="p-3">₹{med.mrp}</td>
                    <td className="p-3">{med.supplier}</td>
                    <td className="p-3">{med.status}</td>
                    </tr>
                ))}
            </tbody>
        </table>
      </div>

      {/* ========== MOBILE CARD VIEW ========== */}
      <div className="md:hidden space-y-4">
        {medicines.map((med, index) => (
          <div
            key={index}
            className="bg-white border border-gray-100 rounded-xl p-4 shadow-sm"
          >
            <div className="flex justify-between">
              <p className="font-medium text-gray-800">
                {med.name}
              </p>
              <p className="font-semibold">
                ₹{med.mrp}
              </p>
            </div>

            <div className="mt-2 text-sm text-gray-600 space-y-1">
              <p>Qty: {med.quantity}</p>
              <p>Expiry: {med.expiry}</p>
              <p>Status: {med.status}</p>
            </div>
          </div>
        ))}
      </div>

    </div>
  )
}

export default CompleteInventorySection