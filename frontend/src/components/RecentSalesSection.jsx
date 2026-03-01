import { useState, useEffect } from "react"
import { getRecentSales } from "../services/salesService"

function RecentSalesSection() {
  const [expandedId, setExpandedId] = useState(null)
  const [sales, setSales] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchSales = async () => {
      try {
        const data = await getRecentSales()
        setSales(data)
      } catch (err) {
        setError("Failed to load recent sales")
      } finally {
        setLoading(false)
      }
    }

    fetchSales()
  }, [])

  console.log("Recent Sales:", sales) // Debugging log
  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id)
  }

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-gray-800">
        Recent Sales
      </h2>

      {loading && <p className="text-gray-500">Loading sales...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {!loading && !error && (
        <div className="space-y-3">
          {sales.map((sale) => {
            const isExpanded = expandedId === sale.id

            return (
              <div
                key={sale.id}
                className="bg-white border border-gray-100 rounded-xl p-4 hover:shadow-md transition"
              >
                {/* ===== Desktop View ===== */}
                <div className="hidden md:flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-800">{sale.id}</p>
                    <p className="text-sm text-gray-500">
                      {sale.customer} • {sale.items} items • {sale.payment}
                    </p>
                  </div>

                  <div className="flex items-center justify-end gap-6">
                    <div className="text-right">
                      <p className="font-semibold text-gray-800">
                        ₹{sale.amount}
                      </p>
                      {/* <p className="text-sm text-gray-500">
                        {sale.date.toLocaleDateString()}
                      </p> */}
                    </div>

                    <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                      {sale.status}
                    </span>
                  </div>
                </div>

                {/* ===== Mobile View ===== */}
                <div
                  onClick={() => toggleExpand(sale.id)}
                  className="md:hidden cursor-pointer"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-800">
                        {sale.id}
                      </p>
                      <p className="text-sm text-gray-500">
                        {sale.customer}
                      </p>
                    </div>

                    <div className="text-right">
                      <p className="font-semibold text-gray-800">
                        ₹{sale.amount}
                      </p>
                      <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                        {sale.status}
                      </span>
                    </div>
                  </div>

                  <div
                    className={`overflow-hidden transition-all duration-300 ${
                      isExpanded ? "max-h-40 mt-3" : "max-h-0"
                    }`}
                  >
                    <div className="text-sm text-gray-600 space-y-1">
                      <p>Date: {sale.date}</p>
                      <p>Items: {sale.items}</p>
                      <p>Payment: {sale.payment}</p>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default RecentSalesSection