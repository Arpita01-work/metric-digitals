import * as React from "react";
import styles from "../../styles/badge.module.css";

const Badge = React.forwardRef(
  ({ className = "", variant = "default", ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={`${styles.badge} ${styles[variant]} ${className}`}
        {...props}
      />
    );
  }
);

Badge.displayName = "Badge";

export { Badge };
