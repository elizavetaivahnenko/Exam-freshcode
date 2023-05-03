import ACTION from "../actions/actionTypes";
import CONSTANTS from "../constants";

const initialState = {
  isFetching: true,
  offers: [],
  error: null,
  moderatorFilter: CONSTANTS.MODERATION_STATUS.PROCESSING,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case ACTION.GET_MODERATOR_OFFERS_REQUEST: {
      return {
        ...state,
        isFetching: true,
        error: null,
      };
    }
    case ACTION.GET_MODERATOR_OFFERS_SUCCESS: {
      return {
        ...state,
        isFetching: false,
        offers: [...action.data.offers],
        error: null,
      };
    }
    case ACTION.GET_MODERATOR_OFFERS_ERROR: {
      return {
        ...state,
        offers: [],
        isFetching: false,
        error: action.error,
      };
    }
    case ACTION.NEW_MODERATION_STATUS_ERROR: {
      return {
        ...state,
        isFetching: false,
        error: action.error,
      };
    }
    case ACTION.SET_NEW_MODERATOR_FILTER: {
      return {
        ...state,
        isFetching: false,
        moderatorFilter: action.filter,
      };
    }
    case ACTION.CLEAR_OFFERS_LIST: {
      return {
        ...state,
        error: null,
        offers: [],
      };
    }
    default:
      return state;
  }
}
