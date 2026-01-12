import * as React from "react";
import { cn } from "../../lib/utils";

/* ---------------- Table ---------------- */

const Table = React.forwardRef(({ className, ...props }, ref) => (
  <div className="relative w-full overflow-auto">
    <table
      ref={ref}
      className={cn("w-full caption-bottom text-sm", className)}
      {...props}
    />
  </div>
));
Table.displayName = "Table";

/* ---------------- Header ---------------- */

const TableHeader = React.forwardRef(({ className, ...props }, ref) => (
  <thead
    ref={ref}
    className={cn("border-b border-slate-200", className)}
    {...props}
  />
));
TableHeader.displayName = "TableHeader";

/* ---------------- Body ---------------- */

const TableBody = React.forwardRef(({ className, ...props }, ref) => (
  <tbody
    ref={ref}
    className={cn("[&_tr:last-child]:border-0", className)}
    {...props}
  />
));
TableBody.displayName = "TableBody";

/* ---------------- Row ---------------- */

const TableRow = React.forwardRef(({ className, ...props }, ref) => (
  <tr
    ref={ref}
    className={cn(
      "border-b border-slate-100 transition-colors hover:bg-slate-50",
      className
    )}
    {...props}
  />
));
TableRow.displayName = "TableRow";

/* ---------------- Head Cell ---------------- */

const TableHead = React.forwardRef(({ className, ...props }, ref) => (
  <th
    ref={ref}
    className={cn(
      "h-12 px-4 text-left align-middle font-medium text-slate-600",
      className
    )}
    {...props}
  />
));
TableHead.displayName = "TableHead";

/* ---------------- Data Cell ---------------- */

const TableCell = React.forwardRef(({ className, ...props }, ref) => (
  <td
    ref={ref}
    className={cn("p-4 align-middle text-slate-700", className)}
    {...props}
  />
));
TableCell.displayName = "TableCell";

/* ---------------- Exports ---------------- */

export {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
};
