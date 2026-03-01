function SummaryCard({ title, value, color = "blue" }) {
  const colorStyles = {
    blue: "bg-blue-100 text-blue-600",
    green: "bg-green-100 text-green-600",
    yellow: "bg-yellow-100 text-yellow-600",
    red: "bg-red-100 text-red-600",
  }

return (
  <div className="bg-white rounded-xl shadow-lg p-5 hover:shadow-xl transition-shadow duration-200">
    
    {/* Top Right Icon */}
    <div className="flex justify-between items-start">
      <div
        className={`w-10 h-10 flex items-center justify-center rounded-lg ${colorStyles[color]}`}
      >
        ●
      </div>
      <div className= {`text-xs px-3 py-1 rounded-full font-medium ${colorStyles[color]}`}>
        info
      </div>
    </div> 

    {/* Text Content */}
    <div className="mt-4">
        <h2 className="text-2xl font-semibold mt-2 mb-5">{value}</h2>
        <p className="text-gray-500 text-sm">{title}</p>
    </div>

  </div>
)
}

export default SummaryCard