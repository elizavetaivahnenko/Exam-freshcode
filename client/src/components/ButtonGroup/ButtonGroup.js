import React, { useState } from "react";
import "./ButtonGroup.sass";
import classnames from "classnames";
import data from "./ButtonBody.json";

export default function ButtonGroup() {
  const [selectedValue, setSelectedValue] = useState("yes");

  const handlerClick = (e) => {
    if (e.target.className !== "card") {
      const value = e.target.parentNode.closest(".card");
      if (value) {
        setSelectedValue(value.getAttribute("data-choose"));
      }
    } else {
      setSelectedValue(e.target.dataset.choose);
    }
  };

  return (
    <section className="buttonGroupe">
      <div className="buttonGroupe__container">
        <input
          type="hidden"
          name="company_url_needed"
          value={selectedValue}
          aria-hidden="true"
          data-acsb-hidden="true"
          tabIndex="-1"
          data-acsb-now-navigable="false"
        />
        <div className="buttonGroupe__container-cards">
          {data.map((item) => {
            return (
              <div
                key={item.id}
                data-choose={item.value}
                className={classnames("card", {
                  active: item.value === selectedValue,
                })}
                onClick={handlerClick}
              >
                <div className="body">
                  <span
                    className={classnames("body-btn", {
                      activePill: item.value === selectedValue,
                    })}
                  >
                    {item.badget}
                  </span>
                  <h5>{item.title}</h5>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
