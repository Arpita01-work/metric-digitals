export const BlogPublicAPI = {
  async list() {
    const res = await fetch("http://localhost:5000/api/blogs");
    if (!res.ok) throw new Error("Failed to fetch blogs");
    return res.json();
  },
};
