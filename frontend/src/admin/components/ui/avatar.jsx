export function Avatar({ children, className = "" }) {
  return (
    <div className={`inline-flex h-9 w-9 items-center justify-center rounded-full bg-gray-300 ${className}`}>
      {children}
    </div>
  );
}

export function AvatarFallback({ children }) {
  return <span className="text-sm font-medium">{children}</span>;
}

export function AvatarImage({ src, alt = "", className = "" }) {
  return (
    <img
      src={src}
      alt={alt}
      className={`h-full w-full rounded-full object-cover ${className}`}
    />
  );
}