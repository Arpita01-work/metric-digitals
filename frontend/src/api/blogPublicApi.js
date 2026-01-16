// blogPublicApi.js
import API_BASE_URL from "./config";

export const BlogPublicAPI = {
  async list() {
    const res = await fetch(`${API_BASE_URL}/api/blogs`);
    if (!res.ok) throw new Error("Failed to fetch blogs");
    return res.json();
  },
};
