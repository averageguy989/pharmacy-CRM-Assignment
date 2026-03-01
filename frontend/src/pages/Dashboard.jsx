import SummaryCard from "../components/SummaryCard"
import OverviewSection from "../components/OverviewSection"
import { useEffect, useState } from "react"
import { getDashboardSummary } from "../services/dashboardService"

function Dashboard() {
  const [summary, setSummary] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const data = await getDashboardSummary()
        setSummary(data)
      } catch (err) {
        setError("Failed to load dashboard summary")
      } finally {
        setLoading(false)
      }
    }

    fetchSummary()
  }, [])

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold">Pharmacy CRM</h1>
      <p className="text-gray-500 mt-1">
        Manage inventory, sales, and purchase orders
      </p>

      {/* ===== Summary Section ===== */}
      <div className="mt-6">
        {loading && (
          <div className="text-gray-500">Loading summary...</div>
        )}

        {error && (
          <div className="text-red-500">{error}</div>
        )}

        {!loading && !error && summary && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <SummaryCard
              title="Today's Sales"
              value={`₹${summary.total_sales.toLocaleString()}`}
              color="blue"
            />
            <SummaryCard
              title="Items Sold Today"
              value={summary.items_sold.toLocaleString()}

              color="green"
            />
            <SummaryCard
              title="Low Stock Items"
              value={summary.low_stock_count.toLocaleString()}
              color="yellow"
            />
            <SummaryCard
              title="Purchase Orders"
              value={`₹${summary.total_purchases.toLocaleString()}`}
              color="red"
            />
          </div>
        )}
      </div>

      {/* ===== Always Render Overview ===== */}
      <OverviewSection />
    </div>
  )
}

export default Dashboard