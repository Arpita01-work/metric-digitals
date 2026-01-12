import * as React from "react";
import { cn } from "../../lib/utils";

/**
 * Badge component
 * Usage:
 * <Badge>Default</Badge>
 * <Badge variant="outline">Outline</Badge>
 */
const Badge = React.forwardRef(
  ({ className, variant = "default", ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={cn(
          "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
          variant === "default" &&
            "bg-slate-900 text-white",
          variant === "outline" &&
            "border border-slate-300 text-slate-700 bg-transparent",
          className
        )}
        {...props}
      />
    );
  }
);

Badge.displayName = "Badge";

export { Badge };
