import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { getModeratorOffers } from "../../actions/actionCreator";
import styles from "./ModeratorDashboard.module.sass";
import TryAgain from "../TryAgain/TryAgain";
import ContestsContainer from "../ContestsContainer/ContestsContainer";
import OffersModerator from "./OffersModerator/OffersModerator";

function ModeratorDashboard({
  data,
  getModeratorOffers,
  clearContestsList,
  isFetching,
  history,
  error,
}) {
  const loadMore = (startFrom) => {
    getModeratorOffers({
      limit: 8,
      moderStatus: "processing",
    });
  };

  useEffect(() => {
    if (data.offers.length === 0) {
      getModeratorOffers({ limit: 100, offset: 0 });
    }
    console.log(data);
  }, [data.offers]);
  const goToExtended = (contest_id) => {
    this.props.history.push(`/contest/${contest_id}`);
  };

  const tryToGetContest = () => {
    clearContestsList();
    this.getContests();
  };
  console.log(data.offers);
  return (
    <div className={styles.moderatorContainer}>
      {data.offers.map((item) => (
        <OffersModerator
          data={item}
          key={item.id}
          goToExtended={goToExtended}
        />
      ))}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    data: state.moderatorStore,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getModeratorOffers: (filter) => dispatch(getModeratorOffers(filter)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModeratorDashboard);

// import React, { useCallback, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { setNewCustomerFilter } from "../../actions/actionCreator";
// import styles from "./ModeratorDashboard.module.sass";
// import ContestBox from "../ContestBox/ContestBox";
// import ContestsContainer from "../ContestsContainer/ContestsContainer";
// import TryAgain from "../TryAgain/TryAgain";
// import { getContestsForModerator } from "../../actions/actionCreator";
// import { clearContestList } from "../../actions/actionCreator";

// export default function ModeratorDashboard({ history, match }) {
//   const contests = useSelector((state) => getContestsForModerator(state));

//   const setContestList = () => {
//     const array = [];
//     for (let i = 0; i < contests.length; i++) {
//       array.push(<ContestBox data={contests[i]} key={contests[i].id} />);
//     }
//     return array;
//   };

//   return <div className="mainContainer">{setContestList()}</div>;
// }

// import React, { useCallback, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { setNewCustomerFilter } from "../../actions/actionCreator";
// import styles from "./ModeratorDashboard.module.sass";
// import ContestBox from "../ContestBox/ContestBox";
// import ContestsContainer from "../ContestsContainer/ContestsContainer";
// import TryAgain from "../TryAgain/TryAgain";
// import { getContestsForCustomer } from "../../actions/actionCreator";
// import { clearContestList } from "../../actions/actionCreator";

// export default function ModeratorDashboard({ history, match }) {
//   const dispatch = useDispatch();
//   const { error, haveMore } = match;
//   const { isFetching, contests } = useSelector((state) => state.contestsList);
//   const { customerFilter } = useDispatch((filter) =>
//     setNewCustomerFilter(filter)
//   );
//   const handleClearContestList = () => dispatch(clearContestList());
//   const getContests = (data) => dispatch(getContestsForCustomer(data));

//   useEffect(() => {
//     getContests({
//       limit: 8,
//       contestStatus: customerFilter,
//     });
//     return () => {
//       handleClearContestList();
//     };
//   }, [getContests, handleClearContestList, customerFilter]);

//   const loadMore = useCallback(
//     (startFrom) => {
//       getContests({
//         limit: 8,
//         offset: startFrom,
//         contestStatus: customerFilter,
//       });
//     },
//     [getContests, customerFilter]
//   );
//   const goToExtended = (contest_id) => {
//     history.push(`/contest/${contest_id}`);
//   };

//   const setContestList = () => {
//     const array = [];
//     for (let i = 0; i < contests.length; i++) {
//       array.push(
//         <ContestBox
//           data={contests[i]}
//           key={contests[i].id}
//           goToExtended={goToExtended}
//         />
//       );
//     }
//     return array;
//   };

//   const tryToGetContest = () => {
//     handleClearContestList();
//     getContests();
//   };
//   return (
//     <div className="mainContainer">
//       {error ? (
//         <div className={styles.messageContainer}>
//           <TryAgain getData={tryToGetContest()} />
//         </div>
//       ) : (
//         <ContestsContainer
//           isFetching={isFetching}
//           loadMore={loadMore}
//           history={history}
//           haveMore={haveMore}
//         >
//           {setContestList()}
//         </ContestsContainer>
//       )}
//       hello moderator
//     </div>
//   );
// }
