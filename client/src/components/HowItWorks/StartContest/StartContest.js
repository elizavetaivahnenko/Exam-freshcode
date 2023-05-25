import React from "react";
import "./StartContestStyle.scss";
import CONSTANTS from "../../../../src/constants";

export default function StartContest() {
  return (
    <section className="contestContainer">
      <div className="leftSticker">
        <img
          src={`${CONSTANTS.STATIC_IMAGES_PATH_SERVICES}background-left.svg`}
          alt="partOfBackgroundLeft"
        />
      </div>
      <div className="contestContainer__main">
        <h3>Ready to get started?</h3>
        <p>
          Fill out your contest brief and begin receiving custom name
          suggestions within minutes.
        </p>
        <button>
          <a href="#">Start A Contest</a>
        </button>
      </div>
      <div className="rightSticker">
        <img
          src={`${CONSTANTS.STATIC_IMAGES_PATH_SERVICES}background-right.svg`}
          alt="partOfBackgroundRight"
        />
      </div>
    </section>
  );
}
