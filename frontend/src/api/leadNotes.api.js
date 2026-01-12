import axiosClient from "./axiosClient";

export const LeadNotesAPI = {
  listByLead: async (leadId) => {
    const res = await axiosClient.get(`/leads/${leadId}/notes`);
    return res.data;
  },

  create: async (leadId, content) => {
    const res = await axiosClient.post(`/leads/${leadId}/notes`, {
      content,
    });
    return res.data;
  },

  delete: async (noteId) => {
    await axiosClient.delete(`/lead-notes/${noteId}`);
  },
};
