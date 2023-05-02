import ACTION from "../actions/actionTypes";
import { put } from "redux-saga/effects";
import * as restController from "../api/rest/restController";

export function* getModeratorOffers(action) {
  yield put({ type: ACTION.GET_MODERATOR_OFFERS_REQUEST });
  try {
    const { data } = yield restController.getModeratorOffers(action.data);
    yield put({ type: ACTION.GET_MODERATOR_OFFERS_SUCCESS, data });
  } catch (e) {
    yield put({ type: ACTION.GET_MODERATOR_OFFERS_ERROR, error: e.response });
  }
}

export function* changeOfferStatusSaga(action) {
  try {
    yield restController.newModerationStatusOffer(action.data);
  } catch (e) {
    yield put({ type: ACTION.NEW_MODERATION_STATUS_ERROR, error: e.response });
  }
}
