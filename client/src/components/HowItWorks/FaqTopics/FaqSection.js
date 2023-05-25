import React from "react";
import data from "./faqData.json";
import startPointData from "./sartPointData.json";
import FaqQuestions from "./FaqQuestions";

export default function FaqSection() {
  return (
    <section className="faqSection">
      <div className="faqSection__container">
        <article className="faqSection__container-startBlock">
          <nav>
            <ul>
              {startPointData.map((item) => {
                return (
                  <li key={item.id}>
                    <a href={`#${item.anchor}`}>{item.title}</a>
                  </li>
                );
              })}
            </ul>
          </nav>
        </article>
        <article className="faqSection__container-accordion">
          {data &&
            data.map((question, index) => {
              return (
                <FaqQuestions key={index} index={index} question={question} />
              );
            })}
        </article>
      </div>
    </section>
  );
}
