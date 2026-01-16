export const fetchLeads = async () => {
  const res = await fetch("/api/admin/leads");

  if (!res.ok) {
    throw new Error("Failed to fetch leads");
  }

  const data = await res.json();
  console.log("📦 fetchLeads data:", data);
  return data;
};

export const fetchLeadRequests = async () => {
  const res = await fetch("/api/admin/lead-requests");

  if (!res.ok) {
    throw new Error("Failed to fetch lead requests");
  }

  const data = await res.json();
  console.log("📦 fetchLeadRequests data:", data);
  return data;
};
