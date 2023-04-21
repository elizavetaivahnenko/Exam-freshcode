import React from "react";
import { useLocalStorage } from "../../hook/useLocalStorage";
import styles from "./NotificationTime.module.scss";

export default function NotificationTime() {
  const [, , notificationCount] = useLocalStorage("myData", null);
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
