import React from "react";
import styles from "./OffersModerator.module.sass";

export default function OffersModerator({ data }) {
  return (
    <div className={styles.offer}>
      <div className={styles.offer__main}>
        <div className={styles.offer__titleAndId}>
          <span className={styles.title}>{data.text}</span>
          <span className={styles.id}>{`(#${data.id})`}</span>
        </div>
        <div className={styles.offer__user}>
          <div>
            <span className={styles.userLabel}>User email:</span>
            <span className={styles.userValue}>{data.User.email}</span>
          </div>
          <div>
            <span className={styles.userLabel}>User name:</span>
            <span className={styles.userValue}>{data.User.displayName}</span>
          </div>
        </div>
      </div>
      <div className={styles.offer__actions}>
        <div className={styles.confirm}>Confirm</div>
        <div className={styles.reject}>Reject</div>
      </div>
    </div>
  );
}
