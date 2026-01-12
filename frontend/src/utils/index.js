// src/utils/index.js

// Simple helper – you can customize later
export const createPageUrl = (path = "") => {
  if (!path) return "/";
  if (!path.startsWith("/")) return "/" + path;
  return path;
};
