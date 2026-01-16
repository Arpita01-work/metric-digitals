// src/api/requests.api.js
import API_BASE_URL from "./config";

export const RequestsAPI = {
  getAll: async () => {
    const res = await fetch(`${API_BASE_URL}/api/requests`);
    if (!res.ok) {
      throw new Error("Failed to fetch requests");
    }
    return res.json();
  },
};
