import React, { useEffect, useState } from "react";
import { Collapse } from "react-collapse";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

export default function FaqAnswers({ card, index, isActive, setIsActive }) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isActive === index) {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  }, [isActive]);

  const handlerAccordion = (index) => {
    isActive === index ? setIsActive(-1) : setIsActive(index);
  };

  return (
    <div className="cardContainer">
      <div
        className="cardContainer__title"
        onClick={() => handlerAccordion(index)}
        key={index}
      >
        <h5>
          <button className="none">
            {card.question}
            <span className={isOpen ? "rotateArrow" : "none"}>
              <FontAwesomeIcon icon={faArrowRight} />
            </span>
          </button>
        </h5>
      </div>
      <Collapse isOpened={isOpen}>
        <div className="cardContainer__body">
          <div className="answer" key={card.id}>
            <div dangerouslySetInnerHTML={{ __html: card.answer }}></div>
            <ul>
              {card.list &&
                card.list.map((item) => {
                  return (
                    <li
                      key={item.id}
                      dangerouslySetInnerHTML={{ __html: item.answerList }}
                    ></li>
                  );
                })}
            </ul>
          </div>
        </div>
      </Collapse>
    </div>
  );
}
