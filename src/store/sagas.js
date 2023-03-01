import { put, call } from "redux-saga/effects";
import * as actionTypes from "./actions";

export const handleGetUsers = function* () {
  try {
    const response = yield call();
    yield put({ type: actionTypes.GET_USERS_SUCCESS, payload: response.data });
  } catch (err) {
    yield put({ type: actionTypes.GET_USERS_FAILED, message: err.message });
  }
};
