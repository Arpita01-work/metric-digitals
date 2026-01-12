// src/components/ui/textarea.jsx
import React from "react";
import "./textarea.css";

export const Textarea = React.forwardRef(
  ({ className = "", ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        className={`ui-textarea ${className}`}
        {...props}
      />
    );
  }
);

Textarea.displayName = "Textarea";
