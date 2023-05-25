import React from "react";
import CONSTANTS from "../../../constants";
import "./ClientSectionStyle.scss";

export default function ClientsSection() {
  return (
    <section className="clientSection">
      <div className="clientSection__container">
        <div className="clientSection__container-featured">
          <div className="title">
            <h6>Featured In</h6>
          </div>
        </div>
        <div className="clientSection__container-emblems">
          <div className="emblems__block">
            <div className="emblems__block-body">
              <div>
                <a href="https://www.forbes.com/sites/forbestreptalks/2016/07/11/not-sure-how-to-name-a-startup-squadhelp-will-crowdsource-it-for-199/">
                  <img
                    src={`${CONSTANTS.STATIC_IMAGES_PATH_SERVICES}forbes.svg`}
                    alt="Forbes"
                  />
                </a>
              </div>
            </div>
            <div className="emblems__block-body">
              <div>
                <a href="https://thenextweb.com/news/crowdsource-startup-name-with-squadhelp">
                  <img
                    src={`${CONSTANTS.STATIC_IMAGES_PATH_SERVICES}tnw.svg`}
                    alt="Tnw"
                  />
                </a>
              </div>
            </div>
            <div className="emblems__block-body">
              <div>
                <a href="https://www.chicagotribune.com/business/blue-sky/ct-squadhelp-startup-names-bsi-20170331-story.html">
                  <img
                    src={`${CONSTANTS.STATIC_IMAGES_PATH_SERVICES}chicago.svg`}
                    alt="Chicago"
                  />
                </a>
              </div>
            </div>
            <div className="emblems__block-body">
              <div>
                <a href="https://mashable.com/archive/make-money-crowdworking">
                  <img
                    src={`${CONSTANTS.STATIC_IMAGES_PATH_SERVICES}mashable.svg`}
                    alt="Mashable"
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
