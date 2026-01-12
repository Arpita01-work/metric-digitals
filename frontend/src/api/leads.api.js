import axiosClient from "./axiosClient";

export const LeadsAPI = {
  list: async () => {
    const res = await axiosClient.get("/leads");
    return res.data;
  },

  getById: async (id) => {
    const res = await axiosClient.get(`/leads/${id}`);
    return res.data;
  },

  create: async (data) => {
    const res = await axiosClient.post("/leads", data);
    return res.data;
  },

  update: async (id, data) => {
    const res = await axiosClient.put(`/leads/${id}`, data);
    return res.data;
  },

  delete: async (id) => {
    await axiosClient.delete(`/leads/${id}`);
  },
};
