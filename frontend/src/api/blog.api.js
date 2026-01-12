import axiosClient from "./axiosClient";

export const BlogAPI = {
  /* ---------- Existing ---------- */
  getById: async (id) => {
    const res = await axiosClient.get(`/blogs/${id}`);
    return res.data;
  },

  create: async (data) => {
    const res = await axiosClient.post("/blogs", data);
    return res.data;
  },

  update: async (id, data) => {
    const res = await axiosClient.put(`/blogs/${id}`, data);
    return res.data;
  },

  /* ---------- ADD THESE ---------- */
  list: async () => {
    const res = await axiosClient.get("/blogs");
    return res.data;
  },

  delete: async (id) => {
    await axiosClient.delete(`/blogs/${id}`);
  },

  updateStatus: async (id, status) => {
    const res = await axiosClient.patch(`/blogs/${id}`, {
      status,
      published_date:
        status === "published" ? new Date().toISOString() : null,
    });
    return res.data;
  },
};
