import React from "react";
import { TrendingUp, TrendingDown } from "lucide-react";
import styles from "../../styles/statcard.module.css";
import { cn } from "../../lib/utils";

export default function StatCard({
  title,
  value,
  change,
  changeType = "positive",
  icon: Icon,
  iconColor = "indigo",
  className,
}) {
  return (
    <div className={cn(styles.card, className)}>
      <div className={styles.header}>
        <div className={styles.content}>
          <p className={styles.title}>{title}</p>
          <p className={styles.value}>{value}</p>

          {change && (
            <div className={styles.changeRow}>
              {changeType === "positive" ? (
                <TrendingUp className={styles.positiveIcon} />
              ) : (
                <TrendingDown className={styles.negativeIcon} />
              )}

              <span
                className={cn(
                  styles.changeText,
                  changeType === "positive"
                    ? styles.positiveText
                    : styles.negativeText
                )}
              >
                {change}
              </span>

              <span className={styles.subText}>vs last month</span>
            </div>
          )}
        </div>

        {Icon && (
          <div className={cn(styles.iconBox, styles[iconColor])}>
            <Icon className={styles.icon} />
          </div>
        )}
      </div>
    </div>
  );
}
