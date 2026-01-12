export function Dialog({ children }) {
  return <div className="fixed inset-0 flex items-center justify-center bg-black/40">{children}</div>;
}

export function DialogContent({ children }) {
  return <div className="bg-white rounded-lg p-6 w-full max-w-lg">{children}</div>;
}

export function DialogHeader({ children }) {
  return <div className="mb-4">{children}</div>;
}

export function DialogTitle({ children }) {
  return <h2 className="text-lg font-semibold">{children}</h2>;
}

export function DialogDescription({ children }) {
  return <p className="text-sm text-gray-500">{children}</p>;
}

export function DialogFooter({ children }) {
  return <div className="mt-4 flex justify-end gap-2">{children}</div>;
}
