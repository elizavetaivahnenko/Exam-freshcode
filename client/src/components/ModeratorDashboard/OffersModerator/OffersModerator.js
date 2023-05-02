import React from "react";
import styles from "./OffersModerator.module.sass";
import CONSTANTS from "../../../constants";
import { changeOfferStatusByModerator } from "../../../actions/actionCreator";
import { connect } from "react-redux";

function OffersModerator({ data, key, changeOfferStatus }) {
  return (
    <div className={styles.offer}>
      <div className={styles.offer__main}>
        <div className={styles.offer__titleAndId}>
          <span className={styles.title}>{data.text}</span>
          <span className={styles.id}>{`(#${data.id})`}</span>
        </div>
        <div className={styles.offer__user}>
          <div>
            <span className={styles.userLabel}>User email:</span>
            <span className={styles.userValue}>{data.User.email}</span>
          </div>
          <div>
            <span className={styles.userLabel}>User name:</span>
            <span className={styles.userValue}>{data.User.displayName}</span>
          </div>
        </div>
      </div>
      {data.moderationStatus === "processing" ? (
        <div className={styles.offer__actions}>
          <div
            onClick={() =>
              changeOfferStatus({
                moderStatus: CONSTANTS.MODERATION_STATUS.CONFIRMED,
                offerId: data.id,
              })
            }
            className={styles.confirm}
          >
            Confirm
          </div>
          <div
            onClick={() =>
              changeOfferStatus({
                moderStatus: CONSTANTS.MODERATION_STATUS.CANCELLED,
                offerId: data.id,
              })
            }
            className={styles.reject}
          >
            Reject
          </div>
        </div>
      ) : (
        <div>{`Offer status: ${data.moderationStatus}`}</div>
      )}
    </div>
  );
}

// const mapStateToProps = (state) => {
//   return {
//     data: state.moderationStatus,
//   };
// };

const mapDispatchToProps = (dispatch) => ({
  changeOfferStatus: (offerData) =>
    dispatch(changeOfferStatusByModerator(offerData)),
});

export default connect(null, mapDispatchToProps)(OffersModerator);
