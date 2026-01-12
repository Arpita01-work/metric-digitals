// src/components/ui/card.jsx
import React from "react";
import "./card.css"; // optional, we can style later

export const Card = ({ children, className = "", ...props }) => (
  <div className={`dm-card ${className}`} {...props}>
    {children}
  </div>
);

export const CardHeader = ({ children, className = "", ...props }) => (
  <div className={`dm-card-header ${className}`} {...props}>
    {children}
  </div>
);

export const CardContent = ({ children, className = "", ...props }) => (
  <div className={`dm-card-content ${className}`} {...props}>
    {children}
  </div>
);
