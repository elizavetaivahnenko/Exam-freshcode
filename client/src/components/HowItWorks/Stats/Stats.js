import React from "react";
import CONSTANTS from "../../../../src/constants";
import "./StatsStyle.scss";

export default function Stats() {
  return (
    <section className="statsContainer">
      <div className="card">
        <div className="card__container">
          <div className="emblems">
            <img
              src={`${CONSTANTS.STATIC_IMAGES_PATH_SERVICES}star.svg`}
              alt="star"
            />
          </div>
          <p className="mb">
            <span>4.9 out of stars</span> from 25,000+ customers.
          </p>
        </div>
      </div>
      <div className="card">
        <div className="card__container">
          <div className="emblems">
            <img
              src={`${CONSTANTS.STATIC_IMAGES_PATH}customers.png`}
              alt="customers"
            />
          </div>
          <p className="mb">
            Our branding community stands
            <span> 200,000+</span> strong.
          </p>
        </div>
      </div>
      <div className="card">
        <div className="card__container">
          <div className="emblems">
            <img
              src={`${CONSTANTS.STATIC_IMAGES_PATH_SERVICES}document.svg`}
              alt="document"
            />
          </div>
          <p>
            <span>140+Industries</span> supported across more than
            <span> 85 countries</span> <br />
            -and counting.
          </p>
        </div>
      </div>
    </section>
  );
}
