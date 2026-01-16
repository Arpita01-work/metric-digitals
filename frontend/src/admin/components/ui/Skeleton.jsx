import styles from "../../styles/skeleton.module.css";

export function Skeleton({ className = "" }) {
  return (
    <div
      className={`${styles.skeleton} ${className}`}
    />
  );
}
