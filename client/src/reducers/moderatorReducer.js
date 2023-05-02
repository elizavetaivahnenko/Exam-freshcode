import ACTION from "../actions/actionTypes";

const initialState = {
  isFetching: true,
  offers: [],
  error: null,
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
    default:
      return state;
  }
}
