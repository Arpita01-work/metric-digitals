import axiosClient from "./axiosClient";

export const MediaAPI = {
  list: async () => {
    const res = await axiosClient.get("/media");
    return res.data;
  },

  upload: async (file) => {
    const formData = new FormData();
    formData.append("file", file);

    const res = await axiosClient.post("/media/upload", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    return res.data;
  },

  delete: async (id) => {
    await axiosClient.delete(`/media/${id}`);
  },
};
