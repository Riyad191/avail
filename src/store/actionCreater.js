import * as actionTypes from "./actions";

export function setPillarName(changePillarName) {
    return {
      type: actionTypes.PILLAR_BUTTON,
      payload: changePillarName,
    };
  }
export function setAppsQuantity(appsQuantity) {
    return {
      type: actionTypes.APPS_QUANTITY,
      payload: appsQuantity,
    };
  }
export function setTodaysAvailability(todaysAvailability) {
    return {
      type: actionTypes.AVAILABILITY_OF_TODAY,
      payload: todaysAvailability,
    };
  }
export function setCardTitleData(cardTitleData) {
    return {
      type: actionTypes.CARD_TITLE,
      payload: cardTitleData,
    };
  }
export function setAppNameData(appNameData) {
    return {
      type: actionTypes.APP_NAME,
      payload: appNameData
    };
  }
export function setFlowNameData(flowNameData) {
    return {
      type: actionTypes.FLOW_NAME,
      payload: flowNameData
    };
  }
export function setMainData(mainData) {
    return {
      type: actionTypes.MAIN_DATA,
      payload: mainData
    };
  }
export function setBarsData(barsData) {
    return {
      type: actionTypes.BARS_DATA,
      payload: barsData
    };
  }
export function seAvailabilityDate(availabilityData) {
    return {
      type: actionTypes.AVAILABILITY_DATE,
      payload: availabilityData
    };
  }