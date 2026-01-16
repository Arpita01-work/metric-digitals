import styles from "../../styles/Avatar.module.css";
import avatar from "../../assets/avatar.jpeg"

export function Avatar({ children, className = "" }) {
  return (
    <div className={`${styles.avatar} ${className}`}>
      {children}
    </div>
  );
}

export function AvatarFallback({ children }) {
  return <span className={styles.fallback}>{children}</span>;
}

export function AvatarImage({ src, alt = "" }) {
  return <img src={src} alt={alt} className={styles.image} />;
}
