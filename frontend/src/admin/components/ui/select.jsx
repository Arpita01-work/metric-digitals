export function Select({ children }) {
  return <div>{children}</div>;
}

export function SelectTrigger({ children }) {
  return <button className="border px-2 py-1 rounded">{children}</button>;
}

export function SelectContent({ children }) {
  return <div className="border mt-1 rounded">{children}</div>;
}

export function SelectItem({ children }) {
  return <div className="px-2 py-1 hover:bg-gray-100">{children}</div>;
}

export function SelectValue({ placeholder }) {
  return <span>{placeholder}</span>;
}
