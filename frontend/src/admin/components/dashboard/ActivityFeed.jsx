import React from "react";
import { formatDistanceToNow } from "date-fns";
import { User, FileText, Mail, CheckCircle } from "lucide-react";
import styles from "../../styles/ActivityFeed.module.css";
import { cn } from "../../lib/utils";

const activityIcons = {
  lead: User,
  request: FileText,
  email: Mail,
  converted: CheckCircle,
};

const activityColorMap = {
  lead: "lead",
  request: "request",
  email: "email",
  converted: "converted",
};

export default function ActivityFeed({ activities = [] }) {
  if (activities.length === 0) {
    return (
      <div className={styles.card}>
        <h3 className={styles.heading}>Recent Activity</h3>
        <div className={styles.emptyState}>No recent activity</div>
      </div>
    );
  }

  return (
    <div className={styles.card}>
      <h3 className={styles.heading}>Recent Activity</h3>

      <div className={styles.list}>
        {activities.map((activity, index) => {
          const Icon = activityIcons[activity.type] || User;
          const colorClass =
            styles[activityColorMap[activity.type]] || styles.lead;

          return (
            <div key={index} className={styles.item}>
              <div className={cn(styles.iconBox, colorClass)}>
                <Icon className={styles.icon} />
              </div>

              <div className={styles.content}>
                <p className={styles.text}>
                  <span className={styles.title}>{activity.title}</span>
                  {activity.subtitle && (
                    <span className={styles.subtitle}>
                      {" "}
                      {activity.subtitle}
                    </span>
                  )}
                </p>

                <p className={styles.time}>
                  {formatDistanceToNow(new Date(activity.date), {
                    addSuffix: true,
                  })}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
