import axiosClient from "./axiosClient";

export const SettingsAPI = {
  get: async () => {
    const res = await axiosClient.get("/settings");
    // assuming backend returns array OR single object
    return Array.isArray(res.data) ? res.data[0] : res.data;
  },

  create: async (data) => {
    const res = await axiosClient.post("/settings", data);
    return res.data;
  },

  update: async (id, data) => {
    const res = await axiosClient.put(`/settings/${id}`, data);
    return res.data;
  },
};
