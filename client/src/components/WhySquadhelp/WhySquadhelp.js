import React from "react";
import CONSTANTS from "../../constants";
import data from "./WhySquadhelp.json";
import styles from "./WhySquadhelp.module.sass";

function WhySquadhelp() {
  return (
    <div className={styles.cardContainer}>
      {data.map((item) => (
        <div key={item.id} className={styles.card}>
          <img
            src={`${CONSTANTS.STATIC_IMAGES_PATH}${item.image}`}
            alt={item.alt}
          />
          <h3>{item.title}</h3>
          <p>{item.body}</p>
        </div>
      ))}
    </div>
  );
}

export default WhySquadhelp;
