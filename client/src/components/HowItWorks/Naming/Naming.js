import React from "react";
import CONSTANTS from "../../../constants";
import list from "./NamingContent.json";
import "./NamingStyle.scss";

export default function Naming() {
  const namingList = list.map((item, key) => {
    return (
      <li key={key} className="indicate">
        <div className="media">
          <div className="media__num">
            <span>{item.number}</span>
          </div>
          <div className="media__content">
            <p>{item.text}</p>
          </div>
        </div>
      </li>
    );
  });
  return (
    <section className="naming">
      <div className="naming__title">
        <img
          src={`${CONSTANTS.STATIC_IMAGES_PATH_SERVICES}prize.svg`}
          alt="prize"
        />
        <h2>How Do Naming Contests Work?</h2>
      </div>
      <div className="naming__body ">
        <div className="naming__body-text">
          <ul>{namingList}</ul>
        </div>
        <div className="naming__body-img">
          <div>
            <img
              src={`${CONSTANTS.STATIC_IMAGES_PATH_SERVICES}employee.svg`}
              alt="employee"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
