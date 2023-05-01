import React from "react";
import styles from "./OffersModerator.module.scss";

export default function OffersModerator({ data }) {
  return (
    <div className={styles.offerContainer}>
      <div className={styles.mainOfferInfo}>
        <div className={styles.titleAndIdContainer}>
          <span className={styles.title}>{data.text}</span>
          <span className={styles.id}>{`(#${data.id})`}</span>
        </div>
      </div>
    </div>
  );
}
