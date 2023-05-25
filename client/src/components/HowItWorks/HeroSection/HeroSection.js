import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import CONSTANTS from "../../../constants";
import "./HeroSectionStyle.scss";

export default function HeroSection() {
  return (
    <section className="heroSection">
      <div className="heroSection-body">
        <span className="pill">World's #1 Naming Platform</span>
        <div className="content">
          <h1 className="title">How Does Squadhelp Work? </h1>
          <p className="text">
            Squadhelp helps you come up with a great name for your business by
            combining the power of crowdsourcing with sophisticated technology
            and Agency-level validation services.
          </p>
        </div>
        <button className="mainButton  content-btn">
          <span>
            <FontAwesomeIcon
              icon={faPlay}
              className="button__icon"
              color="#FFFFFF"
            />
          </span>
          <a href="#">Play Video</a>
        </button>
      </div>
      <div className="heroSection-img">
        <img
          src={`${CONSTANTS.STATIC_IMAGES_PATH_SERVICES}mobile.svg`}
          alt="mobile"
        />
      </div>
    </section>
  );
}
