import { combineReducers } from "redux";
import * as actionTypes from "./actions";

const initialState = {
  stateUsers: [],
  loading: false,
  error: "",
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_USERS_PENDING:
      return { stateUsers: [], loading: true, error: "" };
    // return { ...state, loading: true };
    case actionTypes.GET_USERS_SUCCESS:
      return { stateUsers: action.payload, loading: false, error: "" };
    // return { ...state, loading: false, users: action.users };
    case actionTypes.GET_USERS_FAILED:
      return { stateUsers: [], loading: false, error: action.message };
    // return { ...state, loading: false, error: action.message };
    default:
      return state;
  }
};

export default combineReducers({
  rootReducer: reducer,
});
