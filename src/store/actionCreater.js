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