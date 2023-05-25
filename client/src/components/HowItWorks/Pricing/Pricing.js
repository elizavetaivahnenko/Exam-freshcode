import React from "react";
import "./PricingStyle.scss";
import { faAngleRight, faPhone } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import text from "./PricingText.json";
import CONSTANTS from "../../../constants";

export default function Pricing() {
  const infoList = text.map((item) => {
    return (
      <li key={item.id}>
        <span className="icons">
          <span>
            <FontAwesomeIcon icon={faAngleRight} />
          </span>
        </span>
        <div>
          <h4>{item.title}</h4>
          <p>
            {item.text}
            {item.extraElements && <a href="#"> Learn more</a>}
          </p>
        </div>
      </li>
    );
  });

  return (
    <section className="pricing">
      <div className="container__info">
        <div className="info__list">
          <ul>{infoList}</ul>
        </div>
      </div>
      <div className="pricing__bord">
        <div className="pricing__bord-container">
          <ul>
            <li>
              <div className="bord">
                <h4>Questions</h4>
                <p>
                  Speak with a Squadhelp platform expert to learn more and get
                  your questions answered.
                </p>
                <button className="mainButton ">Shedule Consultation</button>
                <div className="bord__phone">
                  <FontAwesomeIcon
                    className="bord__phone-icon"
                    color="#fff"
                    icon={faPhone}
                  />
                  <a href={`tel:${CONSTANTS.PHONE}`}>{`${CONSTANTS.PHONE}`}</a>
                </div>
                <p>Call us for assistance</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
