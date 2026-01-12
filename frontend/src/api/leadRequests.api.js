import axiosClient from "./axiosClient";

export const LeadRequestsAPI = {
  listByLead: async (leadId) => {
    const res = await axiosClient.get(`/leads/${leadId}/requests`);
    return res.data;
  },
};
