import { useState, useEffect } from "react";

export const useLocalStorage = (key, initialValue) => {
  const [notificationCount, setNotificationCount] = useState(initialValue);
  const [value, setValue] = useState(() => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

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

  useEffect(() => {
    try {
      if (value) localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(error);
    }
  }, [key, value]);

  return [value, setValue, notificationCount];
};
