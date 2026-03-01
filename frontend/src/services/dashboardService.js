const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000"

export const getDashboardSummary = async () => {
  const response = await fetch(`${API_BASE}/inventory/summary`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })

  if (!response.ok) {
    throw new Error("Failed to fetch dashboard summary")
  }

  const data = await response.json();
  return data;
}