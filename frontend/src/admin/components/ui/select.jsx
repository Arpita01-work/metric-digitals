import styles from "../../styles/Select.module.css";

export function Select({ children }) {
  return <div className={styles.select}>{children}</div>;
}

export function SelectTrigger({ children }) {
  return (
    <button className={styles.trigger} type="button">
      {children}
    </button>
  );
}

export function SelectContent({ children }) {
  return <div className={styles.content}>{children}</div>;
}

export function SelectItem({ children }) {
  return <div className={styles.item}>{children}</div>;
}

export function SelectValue({ placeholder }) {
  return <span className={styles.value}>{placeholder}</span>;
}
