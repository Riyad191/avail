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
  todaysAvailability: 0,
  cardTitleData: [],
  filterAppName: "",
  filterFlowName: "",
  availabilityDateFrom: "",
  availabilityDateTo: "",
  mainData: [],
  barsData: null,
  recentFiveDays: [],
};
const pillarNameReducer = (state = pillarsInitialState, action) => {
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
      return { ...state, filterAppName: action.payload };
    case actionTypes.FLOW_NAME:
      return { ...state, filterFlowName: action.payload };
    case actionTypes.MAIN_DATA:
      return { ...state, mainData: action.payload };
    case actionTypes.BARS_DATA:
      return { ...state, barsData: action.payload };
    case actionTypes.AVAILABILITY_DATE_FROM:
      return { ...state, availabilityDateFrom: action.payload };
    case actionTypes.AVAILABILITY_DATE_TO:
      return { ...state, availabilityDateTo: action.payload };
    case actionTypes.RECENT_FIVE_DAYS:
      return { ...state, recentFiveDays: action.payload };
    default:
      return state;
  }
};

export default combineReducers({
  rootReducer: reducer,
  pillarNameReducer,
});
