import * as React from "react";
import { cn } from "../../lib/utils";

/* ---------------- Context ---------------- */

const DropdownContext = React.createContext();

/* ---------------- Root ---------------- */

function DropdownMenu({ children }) {
  const [open, setOpen] = React.useState(false);

  return (
    <DropdownContext.Provider value={{ open, setOpen }}>
      <div className="relative inline-block">{children}</div>
    </DropdownContext.Provider>
  );
}

/* ---------------- Trigger ---------------- */

function DropdownMenuTrigger({ asChild, children }) {
  const { open, setOpen } = React.useContext(DropdownContext);

  const triggerProps = {
    onClick: () => setOpen(!open),
  };

  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children, triggerProps);
  }

  return (
    <button {...triggerProps}>
      {children}
    </button>
  );
}

/* ---------------- Content ---------------- */

function DropdownMenuContent({ className, align = "end", children }) {
  const { open } = React.useContext(DropdownContext);

  if (!open) return null;

  return (
    <div
      className={cn(
        "absolute z-50 mt-2 min-w-[180px] rounded-md border border-slate-200 bg-white p-1 shadow-md",
        align === "end" ? "right-0" : "left-0",
        className
      )}
    >
      {children}
    </div>
  );
}

/* ---------------- Item ---------------- */

function DropdownMenuItem({ className, children, onClick }) {
  const { setOpen } = React.useContext(DropdownContext);

  return (
    <button
      onClick={(e) => {
        onClick?.(e);
        setOpen(false);
      }}
      className={cn(
        "flex w-full items-center gap-2 rounded-sm px-3 py-2 text-sm text-slate-700 hover:bg-slate-100 transition",
        className
      )}
    >
      {children}
    </button>
  );
}

/* ---------------- Separator ---------------- */

function DropdownMenuSeparator() {
  return <div className="my-1 h-px bg-slate-200" />;
}

/* ---------------- Exports ---------------- */

export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
};
