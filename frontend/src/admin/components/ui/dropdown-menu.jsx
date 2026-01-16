import * as React from "react";
import { createPortal } from "react-dom";
import styles from "../../styles/DropdownMenu.module.css";

const DropdownContext = React.createContext();

function DropdownMenu({ children }) {
  const [open, setOpen] = React.useState(false);
  const triggerRef = React.useRef(null);

  return (
    <DropdownContext.Provider value={{ open, setOpen, triggerRef }}>
      <div className={styles.root}>{children}</div>
    </DropdownContext.Provider>
  );
}

function DropdownMenuTrigger({ asChild, children }) {
  const { open, setOpen, triggerRef } = React.useContext(DropdownContext);

  const props = {
    ref: triggerRef,
    type: "button",
    onClick: () => setOpen(!open),
  };

  return asChild && React.isValidElement(children)
    ? React.cloneElement(children, props)
    : <button {...props}>{children}</button>;
}

function DropdownMenuContent({ align = "start", children }) {
  const { open, triggerRef, setOpen } =
    React.useContext(DropdownContext);

  if (!open || !triggerRef.current) return null;

  const rect = triggerRef.current.getBoundingClientRect();

  const style = {
    position: "fixed",
    top: rect.bottom + 6,
    left: align === "start" ? rect.left : undefined,
    right:
      align === "end"
        ? window.innerWidth - rect.right
        : undefined,
    zIndex: 99999,
  };

  return createPortal(
    <div
      className={styles.content}
      style={style}
      onClick={() => setOpen(false)}
    >
      {children}
    </div>,
    document.body
  );
}

function DropdownMenuItem({ children, onClick }) {
  return (
    <button
      type="button"
      className={styles.item}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

function DropdownMenuSeparator() {
  return <div className={styles.separator} />;
}

export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
};
