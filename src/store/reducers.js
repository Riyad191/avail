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
const pillarsInitialState = {
  pillarName: "",
  appsNum: null,
  todaysAvailability: null,
  cardTitleData: [],
  filterAppName: "",
  filterFlowName: ""
}
const pillarNameReducer = (state = pillarsInitialState , action) => {
  switch (action.type) {
    case actionTypes.PILLAR_BUTTON:
      return { ...state, pillarName: action.payload };
    case actionTypes.APPS_QUANTITY:
      return { ...state, appsNum: action.payload };
    case actionTypes.AVAILABILITY_OF_TODAY:
      return { ...state, todaysAvailability: action.payload };
    case actionTypes.CARD_TITLE:
      return { ...state, cardTitleData: action.payload };
    case actionTypes.APP_NAME:
      return { ...state, filterAppName:  action.payload};
    case actionTypes.FLOW_NAME:
      return { ...state, filterFlowName: action.payload };
    default:
      return state;
  }
};

export default combineReducers({
  rootReducer: reducer,
  pillarNameReducer,
});
