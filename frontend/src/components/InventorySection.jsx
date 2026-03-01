import React from 'react'
import InventoryOverviewSection from './InventoryOverviewSection'
import CompleteInventorySection from './CompleteInventorySection'


function InventorySection() {
  return (
    <div className="mt-6 space-y-8">
      <InventoryOverviewSection />
      <CompleteInventorySection />
    </div>
  )
}

export default InventorySection
