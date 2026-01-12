const API_BASE_URL = "http://localhost:5000/api";

export async function fetchLeads() {
  const res = await fetch(`${API_BASE_URL}/admin/leads`);
  if (!res.ok) throw new Error("Failed to fetch leads");
  return res.json();
}

export async function fetchLeadRequests() {
  const res = await fetch(`${API_BASE_URL}/admin/lead-requests`);
  if (!res.ok) throw new Error("Failed to fetch requests");
  return res.json();
}
