import axiosClient from "./axiosClient";

export const RequestsAPI = {
  getAll: async () => {
    const res = await axiosClient.get("/requests");
    return res.data;
  },
};
