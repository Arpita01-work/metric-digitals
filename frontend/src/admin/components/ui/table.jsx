import * as React from "react";
import styles from "../../styles/table.module.css";

/* ---------------- Table ---------------- */

const Table = React.forwardRef(({ className = "", ...props }, ref) => (
  <div className={styles.wrapper}>
    <table
      ref={ref}
      className={`${styles.table} ${className}`}
      {...props}
    />
  </div>
));
Table.displayName = "Table";

/* ---------------- Header ---------------- */

const TableHeader = React.forwardRef(({ className = "", ...props }, ref) => (
  <thead
    ref={ref}
    className={`${styles.header} ${className}`}
    {...props}
  />
));
TableHeader.displayName = "TableHeader";

/* ---------------- Body ---------------- */

const TableBody = React.forwardRef(({ className = "", ...props }, ref) => (
  <tbody
    ref={ref}
    className={`${styles.body} ${className}`}
    {...props}
  />
));
TableBody.displayName = "TableBody";

/* ---------------- Row ---------------- */

const TableRow = React.forwardRef(({ className = "", ...props }, ref) => (
  <tr
    ref={ref}
    className={`${styles.row} ${className}`}
    {...props}
  />
));
TableRow.displayName = "TableRow";

/* ---------------- Head Cell ---------------- */

const TableHead = React.forwardRef(({ className = "", ...props }, ref) => (
  <th
    ref={ref}
    className={`${styles.head} ${className}`}
    {...props}
  />
));
TableHead.displayName = "TableHead";

/* ---------------- Data Cell ---------------- */

const TableCell = React.forwardRef(({ className = "", ...props }, ref) => (
  <td
    ref={ref}
    className={`${styles.cell} ${className}`}
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
