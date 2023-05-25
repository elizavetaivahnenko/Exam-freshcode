import React from "react";
import "./OurServiceStyle.scss";
import content from "./OurServiceContent.json";

export default function OurService() {
  const elementCards = content.map((item) => {
    return (
      <div key={item.id} className="card">
        <div className="card__content">
          <div className="card__content-icon">
            <img src={item.logo} alt={item.alt} />
          </div>
          <h3 className="card__content-title">{item.title}</h3>
          <p className="card__content-text">{item.body}</p>
        </div>
        <button className="mainButton card-btn">{item.buttonText}</button>
      </div>
    );
  });
  return (
    <section className="services">
      <div className="services__header ">
        <span className="pill">Our Services</span>
        <h2>3 Ways To Use Squadhelp</h2>
        <p>
          Squadhelp offers 3 ways to get you a perfect name for your business.
        </p>
      </div>
      <div className="services__body">
        <div className="services__body-container">{elementCards}</div>
      </div>
    </section>
  );
}
