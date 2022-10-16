import { GET_USERS } from "./actions";
import { handleGetUsers } from "./sagas";
import { takeLatest } from "redux-saga/effects";

// handleGetUsers passes a data, success, reject values to action type
// next place is reducers
function* watcherUserSaga() {
  yield takeLatest(GET_USERS, handleGetUsers);
}

export default watcherUserSaga;
