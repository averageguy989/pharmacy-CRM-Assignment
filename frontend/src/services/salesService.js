const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000"

export const getRecentSales = async () => {
  const res = await fetch(`${API_BASE}/inventory/recent-sales`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  })

  if (!res.ok) {
    throw new Error("Failed to fetch recent sales")
  }

  const data = await res.json();
  console.log("API Response for Recent Sales:", data); // Debugging log
  return data.data;
}