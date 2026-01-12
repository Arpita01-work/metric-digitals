export function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

export function createPageUrl(path) {
  if (!path) return "/";
  return path.startsWith("/") ? path : `/${path}`;
}
