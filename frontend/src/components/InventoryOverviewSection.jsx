function InventoryOverviewSection() {
  const stats = [
    { title: "Total Items", value: 10 },
    { title: "Active Stock", value: 5 },
    { title: "Low Stock", value: 3 },
    { title: "Total Value", value: "₹153034" }
  ]

  return (
    <div className="bg-teal-50 border border-teal-100 rounded-2xl p-4 sm:p-6">
      
      <h2 className="text-lg font-semibold text-gray-800 mb-4">
        Inventory Overview
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((item) => (
          <div
            key={item.title}
            className="bg-white rounded-xl p-4 shadow-sm border border-gray-100"
          >
            <p className="text-sm text-gray-500">{item.title}</p>
            <p className="text-2xl font-semibold text-gray-800 mt-2">
              {item.value}
            </p>
          </div>
        ))}
      </div>

    </div>
  )
}

export default InventoryOverviewSection