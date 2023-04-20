import moment from "moment";
import React, { useEffect, useState } from "react";
import classnames from "classnames";
import styles from "./DisplayTimer.module.scss";

export default function Timer({ event }) {
  const [progress, setProgress] = useState(0);
  const [diff, setDiff] = useState(null);
  const [remainingTime, setRemainingTime] = useState();
  useEffect(() => {
    setRemainingTime(moment(event.date).diff(moment(), "seconds"));
  });

  useEffect(() => {
    let intervalId;
    if (remainingTime >= 0) {
      intervalId = setInterval(() => {
        setDiff(moment.duration(moment(event.date).diff(moment())));
      }, 1000);
      return () => clearInterval(intervalId);
    }
  }, [remainingTime]);

  useEffect(() => {
    if (remainingTime >= 0) {
      const diffFromNow = moment(event.date).diff(moment(), "seconds");
      const diffFromStartDate = moment(event.date).diff(
        event.firstDate,
        "seconds"
      );
      const progressPercentage = (100 / diffFromStartDate) * diffFromNow;
      return setProgress(progressPercentage);
    }
  }, [remainingTime]);

  const showTime = () => {
    return (
      <div className={styles.time}>
        <p>
          {diff._data.years !== 0 ? `${diff._data.years}years ` : null}
          {diff._data.months !== 0 ? `${diff._data.months}month ` : null}
          {diff._data.days !== 0 ? `${diff._data.days}days ` : null}
          {diff._data.hours !== 0 ? `${diff._data.hours}hours ` : null}
          {diff._data.minutes !== 0 ? `${diff._data.minutes}min` : null}
          {diff._data.seconds !== 0 ? `${diff._data.seconds}s ` : null}
        </p>
      </div>
    );
  };

  return (
    <li
      className={classnames(styles.progressbar, {
        [styles.finish]: remainingTime < 0,
      })}
    >
      <div
        className={classnames(styles.progressbar_complete, {
          [styles.timeOver]: diff < 0,
        })}
        style={{ width: `${progress}%` }}
      ></div>
      <div className={styles.progressbar__body}>
        <p className={styles.name}>{event.name}</p>
        {diff > 0 ? (
          showTime()
        ) : (
          <p className={styles.timeOver}>Time is over</p>
        )}
      </div>
    </li>
  );
}
