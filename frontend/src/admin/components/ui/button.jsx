import * as React from "react";
import { cn } from "../../lib/utils";

const buttonVariants = {
  default:
    "bg-indigo-600 text-white hover:bg-indigo-700",
  outline:
    "border border-slate-200 bg-white hover:bg-slate-100 text-slate-900",
  ghost:
    "hover:bg-slate-100 text-slate-900",
  secondary:
    "bg-slate-100 text-slate-900 hover:bg-slate-200",
  destructive:
    "bg-red-600 text-white hover:bg-red-700",
};

const Button = React.forwardRef(
  (
    {
      className,
      variant = "default",
      size = "md",
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:pointer-events-none disabled:opacity-50",
          size === "sm" && "h-8 px-3",
          size === "md" && "h-10 px-4",
          size === "lg" && "h-11 px-6",
          buttonVariants[variant],
          className
        )}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";

export { Button };
