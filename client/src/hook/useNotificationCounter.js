import { useState, useEffect } from "react";

export const useNotificationCounter = (key, initialValue) => {
  const [notificationCount, setNotificationCount] = useState(initialValue);
  useEffect(() => {
    const interval = setInterval(() => {
      const storedData = JSON.parse(localStorage.getItem(key));
      if (storedData) {
        const count = storedData.filter(
          (notification) => new Date(notification.date) <= new Date()
        ).length;
        setNotificationCount(count);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [key]);
  return [notificationCount];
};
