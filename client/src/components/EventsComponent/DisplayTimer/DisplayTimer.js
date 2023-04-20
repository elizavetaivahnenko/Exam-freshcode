import React, { useEffect, useState } from "react";
import Timer from "./Timer";
import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-solid-svg-icons";
import styles from "./DisplayTimer.module.scss";

export default function DisplayTimer({ events }) {
  const test = (a, b) => moment(a.date) - moment(b.date);

  return (
    <section className={styles.timer}>
      <div className={styles.timer__header}>
        <h3>Live upcomming checks</h3>
        <div className={styles.timer__header_block}>
          <p className={styles.title}>Remaining time</p>
          <div className={styles.icon}>
            <FontAwesomeIcon className={styles.i} icon={faClock} />
          </div>
        </div>
      </div>
      <article className={styles.timer__body}>
        <ul>
          {events &&
            events
              .sort(test)
              .map((event) => <Timer event={event} key={event.date} />)}
        </ul>
      </article>
    </section>
  );
}
