export const AnalyticsAPI = {
  getLeads: async () => {
    const res = await fetch("/api/admin/leads");
    if (!res.ok) throw new Error("Failed to fetch leads");
    return res.json();
  },

  getRequests: async () => {
    const res = await fetch("/api/admin/lead-requests");
    if (!res.ok) throw new Error("Failed to fetch requests");
    return res.json();
  },
};
