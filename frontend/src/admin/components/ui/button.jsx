import * as React from "react";
import styles from "../../styles/Button.module.css";

const Button = React.forwardRef(
  (
    {
      children,
      variant = "default",
      size = "md",
      className = "",
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        className={`${styles.button} ${styles[variant]} ${styles[size]} ${className}`}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export { Button };
