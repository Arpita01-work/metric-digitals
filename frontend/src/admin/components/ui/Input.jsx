import * as React from "react";
import styles from "../../styles/Input.module.css";

const Input = React.forwardRef(
  ({ type = "text", className = "", ...props }, ref) => {
    return (
      <input
        ref={ref}
        type={type}
        className={`${styles.input} ${className}`}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";

export { Input };
