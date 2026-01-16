import * as React from "react";
import styles from "../../styles/Switch.module.css";

const Switch = React.forwardRef(
  ({ checked, onCheckedChange, className = "" }, ref) => {
    return (
      <button
        ref={ref}
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onCheckedChange?.(!checked)}
        className={`${styles.switch} ${
          checked ? styles.checked : styles.unchecked
        } ${className}`}
      >
        <span
          className={`${styles.thumb} ${
            checked ? styles.thumbChecked : styles.thumbUnchecked
          }`}
        />
      </button>
    );
  }
);

Switch.displayName = "Switch";

export { Switch };
