import { combineReducers } from "redux";
import * as actionTypes from "./actions";

const initialState = {
  data: [],
  loading: false,
  error: "",
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_USERS:
      return { data: [], loading: true, error: "" };
    case actionTypes.GET_USERS_SUCCESS:
      return { data: action.payload, loading: false, error: "" };
    case actionTypes.GET_USERS_FAILED:
      return { data: [], loading: false, error: action.message };
    default:
      return state;
  }
};

export default combineReducers({
  rootReducer: reducer,
});
