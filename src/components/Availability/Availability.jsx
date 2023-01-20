import React, { useEffect, useState } from "react";
import { Box, CircularProgress } from "@mui/material";
import { MainBox, DataCard } from "./styles";
import { setAppsQuantity, setTodaysAvailability, setCardTitleData, setMainData, setBarsData, setRecentFiveDays, setFlowNameData, setAppNameData } from "../../store/actionCreater";
import Cards_Title from "./Card_Title";
import Kafka from "./Kafka";
import Kafka_Dates_Data from "./Kafka_Dates_Data";
import PopUp_Modal from "./PopUp_Modal";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import "./styles.css";
import Dates_Buttons from "./Dates_Buttons";
import Dates_Data from "./Dates_Data";
import { dataArrowsAndColors, getStateData } from "./Services"
import dayjs from "dayjs";
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import moment from 'moment'


function Availability() {
  const dispatch = useDispatch();
  const [fiveMinsData, setFiveMinsData] = React.useState([]);
  const [newAveraveData, setNewAverageData] = useState([]);
  const [modalDate, setModalDate] = useState("")
  const [show, setShow] = useState(false);
  const [openModal, setOpenModal] = React.useState();
  const [modalAppNameVar, setModalAppNameVar] = React.useState("");
  const [modalFlowNameVar, setModalFlowNameVar] = React.useState("");
  const [modalBoxPercentage, setModalBoxPercentage] = React.useState("");
  const [fiveMinsDataWithDates, setFiveMinsDataWithDates] = React.useState([]);
  // const [datesRange, setDatesRange] = React.useState(recentFiveDays);
  const [noDataFound, setNoDataFound] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState("")
  const [lastFiveDays, setLastFiveDays] = useState([]);
  // const [datesRange, setDatesRange] = useState([])
  const pillarName = useSelector((state) => state.pillarNameReducer.pillarName);
  const searchAppName = useSelector((state) => state.pillarNameReducer.filterAppName);
  const searchFlowName = useSelector((state) => state.pillarNameReducer.filterFlowName);
  const availabilityDateFrom = useSelector((state) => state.pillarNameReducer.availabilityDateFrom);
  const availabilityDateTo = useSelector((state) => state.pillarNameReducer.availabilityDateTo);
  const pillarNameParam = !pillarName ? "TRANSPORTATION" : pillarName.toUpperCase();
 



  const noDataAvailableMessage = "No data found";
  const source = axios.CancelToken.source();
  useEffect(() => {
    const datesRangeArr = [{"from": availabilityDateFrom},{"to": availabilityDateTo}]
    function getDates(startDate, stopDate) {
      var dateArray = [];
      var currentDate = moment(startDate);
      var stopDate = moment(stopDate);
      while (currentDate <= stopDate) {
          dateArray.push( moment(currentDate).format('YYYY-MM-DD') )
          currentDate = moment(currentDate).add(1, 'days');
      }
      return dateArray;
  }
    const momentsDates = getDates(availabilityDateFrom,availabilityDateTo);
    console.log("dateRange(availabilityDateFrom,availabilityDateTo)",momentsDates);
    console.log('datesRangeArr: ',datesRangeArr)

    
    // setDatesRange()
    getStateData()
    setError("")
    setLastFiveDays([]);
    setNoDataFound([]);
    setFiveMinsDataWithDates([]);
    dispatch(setFlowNameData(""));
    dispatch(setAppNameData(""));
    let recentFiveDays;
    if(availabilityDateFrom && availabilityDateTo){
      recentFiveDays = momentsDates;
    } else {
      const today = new Date()
      recentFiveDays = new Array(5).fill().map((_, index) => {
      const nextDate = new Date()
      nextDate.setDate(today.getDate() - index);
      return nextDate.toISOString().slice(0, 10);
     });
    }
    console.log("recentFiveDays",recentFiveDays)
    dispatch(availabilityDateFrom && availabilityDateTo ? setRecentFiveDays(momentsDates.reverse()) : setRecentFiveDays(recentFiveDays))
        Promise.all(
            recentFiveDays.map((date) => {
            return axios(
              `https://oscs-sre-api.dev.walmart.com/availability/app_info/date?pillar=${pillarNameParam}&&create_date=${date}`, {
                cancelToken: source.token
              }
            ).then((res) => {
              setFiveMinsData(res.data) 
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
              // appData.date_and_percentage = finalArr;
              appData.date_and_percentage = appMap[appData.index]
            });
          });
          res.map(a => {
            if(a.length > 0){
              return setFiveMinsDataWithDates(a);
            }
          });
          res.filter(x => x.length > 0).length === 0 && setNoDataFound(null);
        }).catch(err => {console.warn(err)})
    setLoading(true);
    return () => {
      if (source) {
        source.cancel();
      }
    }
  
  }, [pillarNameParam, availabilityDateTo]);
  
  useEffect(() => {
    if(fiveMinsDataWithDates.length != 0){
      setLoading(false)
    };
    let totalArr = []
    let barsData;
    fiveMinsDataWithDates.map(a => {
      const tot = a.date_and_percentage[0].map(a => a.avail_percent).filter(b => b !== undefined);
     let total = tot.length > 0 ? tot.reduce((acc,cur)=> acc + cur,0) / tot.length : tot.reduce((acc,cur)=> acc + cur,0) 
      totalArr.push(total)
      barsData = a.date_and_percentage[0].slice(0,24).map(a => a.create_date)
    })
    const todaysAvailibilty = totalArr.reduce((acc,cur)=>acc+cur,0)/fiveMinsDataWithDates.length
    dispatch(setTodaysAvailability(todaysAvailibilty));
    dispatch(setAppsQuantity(fiveMinsDataWithDates.length))
    dispatch(setCardTitleData(searchFn(fiveMinsDataWithDates))) 
    dispatch(setMainData(fiveMinsDataWithDates))
    dispatch(setBarsData(barsData))
  }, [fiveMinsDataWithDates]);
  
  const modalStates = (i, j, x, y, z) => {
    setNewAverageData(i);
    setModalDate(j);
    setModalAppNameVar(x);
    setModalFlowNameVar(y);
    setModalBoxPercentage(z);
    setShow(true);
  };
  
  const [openDataCard, setOpenDataCard] = useState(-1);

  const openDataCardHandelClick = (i) => {
    if(openDataCard === i) setOpenDataCard(-1);
    else setOpenDataCard(i) 
  }

  const searchFn = (rows) => rows.filter((row) => row.app_name.indexOf(searchAppName) > -1).filter((row) => row.service_name.indexOf(searchFlowName) > -1);
 
  if(noDataFound == null){
    return <MainBox><h1 style={{color: "grey", marginTop:260 }} >{noDataAvailableMessage}</h1></MainBox> 
  }
  return (
    <MainBox>
      {loading ? <Box sx={{ fontSize: 40, marginTop: 35, color: "blue" }}><CircularProgress /></Box>  :
       searchFn(fiveMinsDataWithDates)?.map((item, index) => {
          const toolTipData = item.date_and_percentage[0].slice(0,24)
          return (
            <DataCard key={index}>
              <Cards_Title data={item} index={index} setOpenDataCard={setOpenDataCard} openDataCard={openDataCard} openDataCardHandelClick={openDataCardHandelClick} />
              {openDataCard === index ? 
               <Box sx={{width: "100%"}} >
               <Kafka
                item={item}
                modalStates={modalStates}
                lastFiveDays={lastFiveDays} 
                setOpenModal={setOpenModal}
                dataArrowsAndColors={dataArrowsAndColors}
                /> 
               <Kafka_Dates_Data toolTipData={toolTipData} />
             </Box> :
              <Box sx={{width: "100%"}} >
                <Dates_Buttons
                 item={item}
                 modalStates={modalStates}
                 lastFiveDays={lastFiveDays} 
                 setOpenModal={setOpenModal}
                 dataArrowsAndColors={dataArrowsAndColors}
                 /> 
                <Dates_Data toolTipData={toolTipData} />
              </Box>
              }
            </DataCard>  
          );
        })
       }
       <PopUp_Modal
        show={show}
        modalAppNameVar={modalAppNameVar} 
        modalFlowNameVar={modalFlowNameVar}
        modalDate={modalDate}
        openModal={openModal}
        setOpenModal={setOpenModal} 
        newAveraveData={newAveraveData}
        modalBoxPercentage={modalBoxPercentage} 
        dataArrowsAndColors={dataArrowsAndColors} />
    </MainBox>
  );
}

export default Availability;

