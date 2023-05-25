import React, { useState } from "react";
import FaqAnswers from "./FaqAnswers";
import "./FaqStyles.scss";

export default function FaqQuestions({ question, index }) {
  const [isActive, setIsActive] = useState(0);

  return (
    <>
      <div className="accordion__block">
        <div className="accordion__block-title" key={index}>
          <h3 id={question.anchor}>{question.name}</h3>
        </div>
        <div className="accordion__block-body">
          {question.body &&
            question.body.map((card, index) => {
              return (
                <FaqAnswers
                  key={index}
                  card={card}
                  index={index}
                  isActive={isActive}
                  setIsActive={setIsActive}
                />
              );
            })}
        </div>
      </div>
    </>
  );
}
