import React from "react";
import data from "./NameContest.json";
import CONSTANTS from "../../constants";
import styles from "../../pages/Home/Home.module.sass";

export default function NameContest() {
  const renderContainers = () => {
    return data.map((item) => {
      return (
        <div key={item.id} className={styles[item.styleContainer]}>
          <div className={styles[item.style]}>
            <div>
              <h3>{item.title}</h3>
              {item.tips.map((tips) => {
                return (
                  <p key={tips.id}>
                    <i className="fas fa-check" />
                    <span>{tips.text}</span>
                  </p>
                );
              })}
            </div>
            <img
              src={`${CONSTANTS.STATIC_IMAGES_PATH}${item.image}`}
              alt={item.alt}
            />
          </div>
        </div>
      );
    });
  };
  return <>{renderContainers()}</>;
}
