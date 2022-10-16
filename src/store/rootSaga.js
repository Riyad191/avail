import { GET_USERS } from "./actions";
import { handleGetUsers } from "./sagas";
import { takeLatest } from "redux-saga/effects";

function* watcherUserSaga() {
  yield takeLatest(GET_USERS, handleGetUsers);
}

export default watcherUserSaga;
