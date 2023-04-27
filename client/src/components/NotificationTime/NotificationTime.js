import React from "react";
import styles from "./NotificationTime.module.scss";
import { useNotificationCounter } from "../../hook/useNotificationCounter";

export default function NotificationTime() {
  const [notificationCount] = useNotificationCounter("myData", null);
  return (
    <div
      className={
        typeof notificationCount === "number" && notificationCount > 0
          ? styles.badge
          : styles.hideBadge
      }
    >
      {notificationCount}
    </div>
  );
}
