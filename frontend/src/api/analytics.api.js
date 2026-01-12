import axiosClient from "./axiosClient";

export const AnalyticsAPI = {
  getLeads: async () => {
    const res = await axiosClient.get("/leads");
    return res.data;
  },

  getRequests: async () => {
    const res = await axiosClient.get("/lead-requests");
    return res.data;
  },
};
