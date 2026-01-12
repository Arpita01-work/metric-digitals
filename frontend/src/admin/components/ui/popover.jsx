import * as React from "react";
import { cn } from "../../lib/utils";

/* ---------------- Context ---------------- */

const PopoverContext = React.createContext(null);

/* ---------------- Root ---------------- */

function Popover({ children }) {
  const [open, setOpen] = React.useState(false);

  return (
    <PopoverContext.Provider value={{ open, setOpen }}>
      <div className="relative inline-block">{children}</div>
    </PopoverContext.Provider>
  );
}

/* ---------------- Trigger ---------------- */

function PopoverTrigger({ asChild, children }) {
  const { open, setOpen } = React.useContext(PopoverContext);

  const triggerProps = {
    onClick: () => setOpen(!open),
  };

  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children, triggerProps);
  }

  return (
    <button type="button" {...triggerProps}>
      {children}
    </button>
  );
}

/* ---------------- Content ---------------- */

function PopoverContent({
  className,
  align = "center",
  sideOffset = 8,
  children,
}) {
  const { open, setOpen } = React.useContext(PopoverContext);

  if (!open) return null;

  return (
    <div
      className={cn(
        "absolute z-50 mt-2 rounded-md border border-slate-200 bg-white p-4 shadow-md",
        align === "start" && "left-0",
        align === "end" && "right-0",
        align === "center" && "left-1/2 -translate-x-1/2",
        className
      )}
      style={{ marginTop: sideOffset }}
    >
      {children}

      {/* click outside handler */}
      <div
        className="fixed inset-0 z-[-1]"
        onClick={() => setOpen(false)}
      />
    </div>
  );
}

/* ---------------- Exports ---------------- */

export {
  Popover,
  PopoverTrigger,
  PopoverContent,
};
