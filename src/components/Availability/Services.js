import { useSelector, useDispatch } from "react-redux";
import { BiDownArrowAlt, BiUpArrowAlt } from "react-icons/bi";
import { CgArrowsExchangeV } from "react-icons/cg";
import { IoIosRemove } from "react-icons/io";
import { Success, Denger, Secondary, Warning } from "./styles";
import axios from "axios";
import store from "../../store"

export const getStateData = () => {
  const state = store.getState();
  // console.log("state pillarNameReducer pillarName",state)
}

export const formatAvailabilityData = (f) => {
    // console.log("fff",Object.keys(f).map(a => +a).filter(a => typeof a == "number"))
  return Object.keys(f).slice(0,5).map((m) => {
      let k = `${m.slice(4, 6)}/${m.slice(6, 8)}/${m.slice(0, 4)}`;
      return { key: k.substring(0, 5), value: f[m]};
    }).filter((ele) => ele !== undefined)
};


//  -------------
const pillarNameParam = "TRANSPORTATION"
// const pillarNameParam = !pillarName ? "TRANSPORTATION" : pillarName.toUpperCase();
const  source = axios.CancelToken.source();

 export const fetchAvailabilityApi = () => {
  const today = new Date();
  const recentFiveDays = new Array(5).fill().map((_, index) => {
    const nextDate = new Date();
    nextDate.setDate(today.getDate() - index);
    return nextDate.toISOString().slice(0, 10);
  });
  Promise.all(
    recentFiveDays.map((date) => {
      return axios(
        `https://oscs-sre-api.dev.walmart.com/availability/app_info/date?pillar=${pillarNameParam}&&create_date=${date}`, {
          cancelToken: source.token
        }
      ).then((res) => {
        return res.data
      });
    })
    ).then((res) => {
      const appMap = {};
    res.forEach((dateData) => {
      dateData.forEach((appData) => {
        if (!(appData.index in appMap)) {
          appMap[appData.index] = [];
        }
        appMap[appData.index] = [
          ...appMap[appData.index],
          appData.date_and_percentage.length > 288
            ? appData.date_and_percentage.slice(0, 288)
            : appData.date_and_percentage.concat(
                new Array(288 - appData.date_and_percentage.length).fill(
                  {create_date: "no data available"}
              )
            ),
        ];
      });
    });
    res.forEach((dateData) => {
      dateData.forEach((appData) => {
        const newArr = new Array(288).fill({create_date: "no data available"})
        const orgArr = appMap[appData.index];
        const dataArr = new Array(5).fill(newArr)
        const finalArr = dataArr.map((n,i) => orgArr[i] ?? n)
        appData.date_and_percentage = finalArr.reverse();
     
      });
    });
  }).catch(err => console.log(err))
 
  return () => {
    if (source) {
      source.cancel();
    }
  }
} 
//  -------------

export const dataArrowsAndColors = (v) => +v > 99.95 ? iconsAndColors.success : +v < 99 && +v >= 1 ? iconsAndColors.denger : +v === 0 ? iconsAndColors.secondary : iconsAndColors.warning;

export const iconsAndColors = {
  success: { color: "#367600", icon: <BiUpArrowAlt /> },
  denger: { color: "#DC0909", icon: <BiDownArrowAlt /> },
  warning: { color: "#dfaf2d", icon: <CgArrowsExchangeV /> },
  secondary: { color: "#787878", icon: <IoIosRemove /> },
};

export const AvailabilityTypes = (date, percent) => {
  if(date !== "no data available"){
   return percent > 99.95 ? <Success /> : percent < 97 && percent >= 1 || percent === null ? <Denger /> : percent < 1 ? <Secondary /> : <Warning />;
  }
 return <Secondary />
}

export const cardTitle = {
    appName: "App Name",
    serviceName: "Service Name",
    flowName: "Flow"
  }


 