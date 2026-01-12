// src/components/ui/button.jsx
import React from "react";
import "./button.css"; // optional

export const Button = ({
  children,
  variant = "primary",
  className = "",
  ...props
}) => {
  const variantClass =
    variant === "outline" ? "dm-btn-outline" : "dm-btn-primary";

  return (
    <button className={`dm-btn ${variantClass} ${className}`} {...props}>
      {children}
    </button>
  );
};
