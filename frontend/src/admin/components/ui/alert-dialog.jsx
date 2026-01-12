import * as React from "react";
import { cn } from "../../lib/utils";

/* ---------------- Context ---------------- */

const AlertDialogContext = React.createContext();

/* ---------------- Root ---------------- */

function AlertDialog({ open, onOpenChange, children }) {
  return (
    <AlertDialogContext.Provider value={{ open, onOpenChange }}>
      {children}
    </AlertDialogContext.Provider>
  );
}

/* ---------------- Overlay ---------------- */

function AlertDialogOverlay() {
  return (
    <div className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm" />
  );
}

/* ---------------- Content ---------------- */

function AlertDialogContent({ className, children }) {
  const { open, onOpenChange } = React.useContext(AlertDialogContext);

  if (!open) return null;

  return (
    <>
      <AlertDialogOverlay />
      <div
        className={cn(
          "fixed left-1/2 top-1/2 z-50 w-full max-w-md -translate-x-1/2 -translate-y-1/2 rounded-xl bg-white p-6 shadow-lg",
          className
        )}
      >
        {children}
      </div>
    </>
  );
}

/* ---------------- Header ---------------- */

function AlertDialogHeader({ className, ...props }) {
  return (
    <div
      className={cn("mb-4 space-y-2 text-center sm:text-left", className)}
      {...props}
    />
  );
}

/* ---------------- Title ---------------- */

function AlertDialogTitle({ className, ...props }) {
  return (
    <h2
      className={cn("text-lg font-semibold text-slate-900", className)}
      {...props}
    />
  );
}

/* ---------------- Description ---------------- */

function AlertDialogDescription({ className, ...props }) {
  return (
    <p
      className={cn("text-sm text-slate-500", className)}
      {...props}
    />
  );
}

/* ---------------- Footer ---------------- */

function AlertDialogFooter({ className, ...props }) {
  return (
    <div
      className={cn(
        "mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end",
        className
      )}
      {...props}
    />
  );
}

/* ---------------- Actions ---------------- */

function AlertDialogAction({ className, ...props }) {
  const { onOpenChange } = React.useContext(AlertDialogContext);

  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 transition",
        className
      )}
      onClick={() => onOpenChange(false)}
      {...props}
    />
  );
}

function AlertDialogCancel({ className, ...props }) {
  const { onOpenChange } = React.useContext(AlertDialogContext);

  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-md border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 transition",
        className
      )}
      onClick={() => onOpenChange(false)}
      {...props}
    />
  );
}

/* ---------------- Exports ---------------- */

export {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogAction,
  AlertDialogCancel,
};
