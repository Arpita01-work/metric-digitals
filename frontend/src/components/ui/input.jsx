// src/components/ui/input.jsx
import React from "react";

export const Input = React.forwardRef(
  ({ className = "", ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={`ui-input ${className}`}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";
