import axios from "axios";

export const BlogAPI = {
  list: () => axios.get("/api/blogs").then(res => res.data),

  create: (formData) =>
    axios.post("/api/blogs", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }).then(res => res.data),

  getById: (id) => axios.get(`/api/blogs/${id}`).then(res => res.data),

  update: (id, data) =>
    axios.put(`/api/blogs/${id}`, data).then(res => res.data),
};
