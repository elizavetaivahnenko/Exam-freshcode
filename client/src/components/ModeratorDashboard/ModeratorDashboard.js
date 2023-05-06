import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  getModeratorOffers,
  setModeratorFilter,
  clearOffersList,
} from "../../actions/actionCreator";
import styles from "./ModeratorDashboard.module.sass";
import TryAgain from "../TryAgain/TryAgain";
import ContestsContainer from "../ContestsContainer/ContestsContainer";
import OffersModerator from "./OffersModerator/OffersModerator";
import CONSTANTS from "../../constants";
import classNames from "classnames";

function ModeratorDashboard({
  moderatorFilter,
  offers,
  isFetching,
  error,
  getModeratorOffers,
  setModeratorFilter,
  totalOffers,
}) {
  const [offerState, setOfferState] = useState(false);
  const [pageNumber, setPageNumber] = useState(0);

  const handlerUpdateOffersState = () => {
    setOfferState(!offerState);
  };
  const loadMore = (prevOffset) => {
    getModeratorOffers({
      limit: 2,
      offset: prevOffset,
      moderStatus: moderatorFilter,
    });
  };
  const loadMorePage = (action) => {
    let nextPage = pageNumber;
    if (action === "next") {
      nextPage += 2;
      if (nextPage >= totalOffers) {
        nextPage = 0;
      }
    } else if (action === "prev") {
      nextPage -= 2;
      if (nextPage < 0) {
        nextPage = totalOffers;
      }
    }
    setPageNumber(nextPage);
    getModeratorOffers({
      limit: 2,
      offset: nextPage,
      moderStatus: moderatorFilter,
    });
  };
  const allOffers = () => {
    getModeratorOffers({
      limit: 2,
      offset: 0,
      moderStatus: moderatorFilter,
    });
  };

  useEffect(() => {
    allOffers();
  }, [moderatorFilter, offerState]);

  const tryToGetContest = () => {
    clearOffersList();
    allOffers();
  };
  return (
    <div className={styles.mainContainer}>
      <div className={styles.filterContainer}>
        <div
          onClick={() =>
            setModeratorFilter(CONSTANTS.MODERATION_STATUS.PROCESSING)
          }
          className={classNames({
            [styles.activeFilter]:
              CONSTANTS.MODERATION_STATUS.PROCESSING === moderatorFilter,
            [styles.filter]:
              CONSTANTS.MODERATION_STATUS.PROCESSING !== moderatorFilter,
          })}
        >
          Active offers
        </div>
        <div
          onClick={() =>
            setModeratorFilter(CONSTANTS.MODERATION_STATUS.CONFIRMED)
          }
          className={classNames({
            [styles.activeFilter]:
              CONSTANTS.MODERATION_STATUS.CONFIRMED === moderatorFilter,
            [styles.filter]:
              CONSTANTS.MODERATION_STATUS.CONFIRMED !== moderatorFilter,
          })}
        >
          Confirmed
        </div>
        <div
          onClick={() =>
            setModeratorFilter(CONSTANTS.MODERATION_STATUS.CANCELLED)
          }
          className={classNames({
            [styles.activeFilter]:
              CONSTANTS.MODERATION_STATUS.CANCELLED === moderatorFilter,
            [styles.filter]:
              CONSTANTS.MODERATION_STATUS.CANCELLED !== moderatorFilter,
          })}
        >
          Rejected
        </div>
      </div>
      <div className={styles.contestsContainer}>
        {error ? (
          <TryAgain getData={tryToGetContest()} />
        ) : (
          <div className={styles.contentTable}>
            <div className={styles.head}>
              <h3>ID</h3>
              <h3>Offer name</h3>
              <h3>User email</h3>
              <h3>File name</h3>
              <h3>Status</h3>
            </div>
            <div className={styles.body}>
              <ContestsContainer isFetching={isFetching} loadMore={loadMore}>
                {offers.map((item) => (
                  <OffersModerator
                    data={item}
                    key={item.id}
                    handlerUpdateOffersState={handlerUpdateOffersState}
                  />
                ))}
              </ContestsContainer>
            </div>
            <div className={styles.turningButtons}>
              <div
                className={styles.turningPage}
                onClick={() => loadMorePage("next")}
              >
                NEXT
              </div>
              <div
                className={styles.turningPage}
                onClick={() => loadMorePage("prev")}
              >
                PREV
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

const mapStateToProps = (state) => state.moderatorStore;

const mapDispatchToProps = (dispatch) => {
  return {
    getModeratorOffers: (data) => dispatch(getModeratorOffers(data)),
    setModeratorFilter: (filter) => dispatch(setModeratorFilter(filter)),
    clearOffersList: () => dispatch(clearOffersList()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModeratorDashboard);
