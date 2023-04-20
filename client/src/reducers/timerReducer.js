import ACTION from "../actions/actionTypes";

const initialState = {
  timers: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case ACTION.COUNTER_TIME_IS_OVER: {
      return {
        ...state,
        timers: action.payload,
      };
    }
    default:
      return state;
  }
}
