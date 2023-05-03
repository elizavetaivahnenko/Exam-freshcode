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
}) {
  const [offerState, setOfferState] = useState(false);

  const handlerUpdateOffersState = () => {
    setOfferState(!offerState);
  };
  const loadMore = (startFrom) => {
    allOffers({
      limit: 8,
      offset: startFrom,
      contestStatus: moderatorFilter,
    });
  };
  const allOffers = () => {
    getModeratorOffers({
      limit: 8,
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
          <ContestsContainer isFetching={isFetching} loadMore={loadMore}>
            {offers.map((item) => (
              <OffersModerator
                data={item}
                key={item.id}
                handlerUpdateOffersState={handlerUpdateOffersState}
              />
            ))}
          </ContestsContainer>
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
