import * as React from "react";
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";

// Root wrapper
export const DropdownMenu = DropdownMenuPrimitive.Root;

// Trigger button wrapper
export const DropdownMenuTrigger = React.forwardRef(
  ({ className, children, ...props }, ref) => (
    <DropdownMenuPrimitive.Trigger
      ref={ref}
      className={className}
      {...props}
    >
      {children}
    </DropdownMenuPrimitive.Trigger>
  )
);

// Content wrapper
export const DropdownMenuContent = React.forwardRef(
  ({ className, sideOffset = 8, children, ...props }, ref) => (
    <DropdownMenuPrimitive.Portal>
      <DropdownMenuPrimitive.Content
        ref={ref}
        sideOffset={sideOffset}
        className={`dropdown-menu-content ${className}`}
        {...props}
      >
        {children}
      </DropdownMenuPrimitive.Content>
    </DropdownMenuPrimitive.Portal>
  )
);

// Individual menu item
export const DropdownMenuItem = React.forwardRef(
  ({ className, children, ...props }, ref) => (
    <DropdownMenuPrimitive.Item
      ref={ref}
      className={`dropdown-menu-item ${className}`}
      {...props}
    >
      {children}
    </DropdownMenuPrimitive.Item>
  )
);

DropdownMenuTrigger.displayName = "DropdownMenuTrigger";
DropdownMenuContent.displayName = "DropdownMenuContent";
DropdownMenuItem.displayName = "DropdownMenuItem";
