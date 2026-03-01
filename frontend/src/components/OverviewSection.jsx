import { useState } from "react"
import SalesSection from "./SalesSection"
import InventorySection from "./InventorySection"
import PurchaseSection from "./PurchaseSection"

function OverviewSection() {
  const [activeTab, setActiveTab] = useState("Sales")

  const tabs = ["Sales", "Purchase", "Inventory"]

  return (
    <div className="bg-white rounded-2xl shadow-sm p-4 sm:p-6 mt-6">
      
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

        {/* Tabs */}
        <div className="flex bg-gray-100 rounded-2xl p-1 w-full md:w-auto overflow-x-auto">
          {tabs.map((tab) => {
            const isActive = activeTab === tab
            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 md:flex-none px-4 py-2 text-sm font-medium rounded-2xl transition-all whitespace-nowrap
                  ${isActive
                    ? "bg-white text-gray-900 shadow-sm"
                    : "text-gray-600 hover:text-gray-800"
                  }`}
              >
                {tab}
              </button>
            )
          })}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
          <button className="w-full sm:w-auto border border-gray-200 hover:bg-gray-100 rounded-lg px-4 py-2 text-sm font-medium text-gray-800 transition">
            New Sale
          </button>
          <button className="w-full sm:w-auto border border-gray-200 hover:bg-gray-100 rounded-lg px-4 py-2 text-sm font-medium text-gray-800 transition">
            New Purchase
          </button>
        </div>

      </div>

      {/* Content Area */}
      <div className="mt-6">
        {activeTab === "Inventory" && (
          <InventorySection />
        )}

        {activeTab === "Sales" && (
          <SalesSection />
        )}

        {activeTab === "Purchase" && (
          <PurchaseSection />
        )}
      </div>

    </div>
  )
}

export default OverviewSection