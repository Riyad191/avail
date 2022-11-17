import React, { useCallback, useEffect, useState } from "react";
import { Typography, Box, Tooltip, Modal, Stack, styled } from "@mui/material";
import { ArrowBox, MainBox, DataCard, BoxFn, GreenBars, GrayBars } from "./styles";
import { BiDownArrowAlt, BiUpArrowAlt } from "react-icons/bi";
import { CgArrowsExchangeV } from "react-icons/cg";
import { IoIosRemove } from "react-icons/io";
import { setAppsQuantity, setTodaysAvailability, setCardTitleData } from "../../store/actionCreater";
import Cards_Title from "./Card_Title";
import Loading_Error from "./Loading_Error";
import PopUpModal from "./PopUpModal";
import Card_Info from "./Card_Info";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import "./styles.css";


{/**
  CODE WILL BE SPLITED INTO MULTIPLE COMPONENTS ONCE NEW API IS PROVIDED 
  
  STORE FOLDER
  POP UP COMPONENT
  DATA PROCESSOR FILE
*/}

const lastTwoHours = "last 2 hours of today's availability";

function Availability() {
  const dispatch = useDispatch();
  const [fiveMinsData, setFiveMinsData] = React.useState([]);
  const [newAveraveData, setNewAverageData] = useState([]);
  const [show, setShow] = useState(false);
  const [openModal, setOpenModal] = React.useState();
  const [modalAppNameVar, setModalAppNameVar] = React.useState("");
  const [modalFlowNameVar, setModalFlowNameVar] = React.useState("");
  const [modalBoxPercentage, setModalBoxPercentage] = React.useState("");
  const [fiveMinsDataWithDates, setFiveMinsDataWithDates] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [lastFiveDays, setLastFiveDays] = useState([]);
  const pillarName = useSelector((state) => state.pillarNameReducer.pillarName);
  const appsNum = useSelector((state) => state.pillarNameReducer.appsNum);
  const searchAppName = useSelector((state) => state.pillarNameReducer.filterAppName);
  const searchFlowName = useSelector((state) => state.pillarNameReducer.filterFlowName);
  const pillarNameParam = !pillarName ? "FULFILLMENT" : pillarName.toUpperCase();

  const mainURl = `https://oscs-sre-api.dev.walmart.com/availability/get/app-list?tier=1&&platfom=WCNP&pillar=${pillarNameParam}`;

  const fetchApi = async () => {
    try {
      setLoading(true);
      setFiveMinsData([]);
      const res = await axios(mainURl);
      const data = await res.data;
      setFiveMinsData(data);
      setLoading(false);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => { fetchApi() }, [pillarName]);

  useEffect(() => {
    const today = new Date();
    const recentFiveDays = new Array(5).fill().map((_, index) => {
      const nextDate = new Date();
      nextDate.setDate(today.getDate() - index);
      return nextDate.toISOString().slice(0, 10);
    });
    setLastFiveDays(recentFiveDays);
    const array = fiveMinsData.map((item) => item.glb_url);
    const result = Promise.allSettled(
      //will be fulfilled or rejected only when all of the inner promise is fulfilled or rejected
      array.map((param) => {
        return Promise.allSettled(
          recentFiveDays.map((date) => {
            return axios
              .get(
                `https://oscs-sre-api.dev.walmart.com/availability/detailed_avail_percent?glb_url=${param}&&date_frequency=5mins&&create_date=${date}`
              )
              .then((res) => {
                return res;
              });
          })
        );
      })
    );

    result
      .then((res) =>
        res.map((item) =>
          item.status === "fulfilled"
            ? item.value.map((innerItem) =>
                innerItem.status === "fulfilled" ? innerItem.value : undefined
              )
            : undefined
        )
      )
      .then((res) => {
        const newFiveMinsData = [...fiveMinsData];
        res.forEach((item, index) => {
          newFiveMinsData[index] = { ...newFiveMinsData[index] };
          newFiveMinsData[index].dates = item.map((innerItem) => {
            const arr = new Array(24).fill("No data available");
            const innerDate = innerItem.data.length == 0 ? arr.map((a, i) => { return { create_date: innerItem.data[i] ?? a }}) : innerItem.data.slice(-24)
            .map(({ create_date }) => ({ create_date }));
            return innerDate;
          });
          const modalAppName = newFiveMinsData[index].app_name;
          const modalFlowName = newFiveMinsData[index].flow_name;
          const modalDatesArr = new Array(288).fill("No data available");
          const modalDates = item.map((innerItem) => innerItem.data.length == 0 ? modalDatesArr.map((a, i) => { return innerItem.data[i] ?? a }) : innerItem.data.map((a) => a.create_date));
          let avail_of_today = [];
          newFiveMinsData[index].total_and_average = item.map((innerItem, idx) => {
              const total = innerItem.data.reduce((acc, curr) => acc + curr.avail_percent,0);
              const average = total > 0 ? total / innerItem.data.length : 0;
              avail_of_today.push(average);
              const filledArr = modalDates[idx].length < modalDatesArr.length ? modalDatesArr.map((item, i) => modalDates[idx][i] ?? item) : modalDates[idx];
              return { total: total, average: average.toString().length > 4 ? +average.toPrecision(3) : average, modalDates: filledArr, app_name: modalAppName, flow_name: modalFlowName };
            }
          );
          newFiveMinsData[index].availability_of_today = avail_of_today[0];
          setFiveMinsDataWithDates(newFiveMinsData);
        });
      });
    // console.log("newFiveMinsData", fiveMinsDataWithDates);
    dispatch(setAppsQuantity(fiveMinsData.length == 0 ? "loading..." : fiveMinsData.length));
  }, [fiveMinsData]);

  useEffect(() => {
    const countAvailabilityOfToday = fiveMinsDataWithDates.map((a) => a.availability_of_today);
    const availabilityOfTodayPercentage = countAvailabilityOfToday.reduce((acc, curr) => acc + curr, 0) / fiveMinsDataWithDates.length;
    dispatch(setTodaysAvailability(availabilityOfTodayPercentage));
  }, [fiveMinsDataWithDates]);

  const dataArrowsAndColors = (v) => +v > 99.95 ? obj.success : +v < 99 && +v >= 1 ? obj.denger : +v < 1 ? obj.secondary : obj.warning;

  const obj = {
    success: { color: "#367600", icon: <BiUpArrowAlt /> },
    denger: { color: "#DC0909", icon: <BiDownArrowAlt /> },
    warning: { color: "#dfaf2d", icon: <CgArrowsExchangeV /> },
    secondary: { color: "#787878", icon: <IoIosRemove /> },
  };

  const SytledModal = styled(Modal)({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  });

  const foo = (i, x, y, z) => {
    setNewAverageData(i);
    setModalAppNameVar(x);
    setModalFlowNameVar(y);
    setModalBoxPercentage(z);
    setShow(true);
  };

   const searchFn = (rows) => rows.filter((row) => row.app_name.indexOf(searchAppName) > -1).filter((row) => row.service_name.indexOf(searchFlowName) > -1);

  useEffect(()=>{dispatch(setCardTitleData(searchFn(fiveMinsDataWithDates)))})

  // console.log("searchFn",searchFn(fiveMinsDataWithDates));
  console.log("fiveMinsDataWithDates", fiveMinsDataWithDates);
  return (
    <MainBox>
      {/* <Loading_Error /> */}
      {loading ? <h1>loading...</h1>  : 
        searchFn(fiveMinsDataWithDates)?.map((item, index) => {
          // const toolTipData = item.dates[0]
          const toolTipData = item.total_and_average[0].modalDates.slice(0, 24);
          const modalDates = item.modalDates;
          const unqiueData = item.dates.map((x) => x.map((y) => y.create_date.slice(5, 10)));
          const unqiue = unqiueData.map((data) => [...new Set(data)]);
          return (
            <DataCard key={index}>
              <Cards_Title data={item} />
              <Box bgcolor="#e2e2e2" sx={{ width: "100%", padding: "3px 0", borderRadius: "5px" }}>
                <div style={{ display: "flex", width: "100%", justifyContent: "space-around", alignItems: "center"}}>
                  {item.total_and_average.map((innerItem, idx) => {
                      return (
                        <div onClick={() => setOpenModal(true)} key={idx}>
                          <Typography variant="subtotal-1" sx={{ color: dataArrowsAndColors(innerItem.average).color, textAlign: "center" }}> {innerItem.average}% </Typography>
                          <BoxFn onClick={() => foo(innerItem.modalDates, innerItem.app_name, innerItem.flow_name, innerItem.average)}>
                            <ArrowBox bgcolor={ dataArrowsAndColors(innerItem.average).color } sx={{ textAlign: "center" }}> {dataArrowsAndColors(innerItem.average).icon} </ArrowBox>
                            <Typography sx={{ color: dataArrowsAndColors(innerItem.average).color, textAlign: "center" }}></Typography>
                          </BoxFn>
                        </div>
                      );
                    }).reverse()}
                </div>
                <div style={{ display: "flex", width: "100%", justifyContent: "space-around", alignItems: "center" }}>
                  {lastFiveDays.map((item, idx) => <p key={idx}>{item.slice(-5)}</p>).reverse()}
                  {/* {unqiue.reverse().map(item => item.map((item,idx) => <p key={idx} >{item}</p> ))}  */}
                </div>
              </Box>
              <div style={{ display: "flex", width: "100%", justifyContent: "space-around", alignItems: "center"}}>
                <div style={{ textAlign: "left", width: "100%", fontSize: "12px" }}>
                  <p style={{ marginLeft: "5px" }}>{lastTwoHours.toLowerCase()}</p>
                  <div style={{ display: "flex", justifyContent: "space-around", width: "100%" }}>
                    {toolTipData.map((item, idx) => {
                      return (
                        <div key={idx}>
                          <Tooltip title={`${item.slice(0, 19)}`} arrow>
                            {/* <Tooltip title={`${item.create_date.slice(0,10)}(${item.create_date.slice(11,19)})`} arrow> */}
                            {item == "No data available" ? <GrayBars /> : <GreenBars />}
                          </Tooltip>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
              <></>
            </DataCard>
          );
        })
       }

      {/* pop up component  */}
       {show && (
              <SytledModal open={openModal} onClose={(e) => setOpenModal(false)} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description" sx={{ cursor: "pointer" }}>
                <Box sx={{ width: "98%", height: "20%", background: "#fff", padding: "0 20px", borderRadius: "5px", display: "flex",justifyContent: "center", alignItems: "center", flexDirection: "column" }} >
                  <Stack direction="row" sx={{justifyContent: "space-between", alignItems: "center", width:"100%"}} >
                  <h3>{`${modalAppNameVar} | ${modalFlowNameVar}`}</h3>
                  <Typography variant="p" sx={{background: "grey", color: "white", padding: "10px", borderRadius: "5px"}} >Last 12 hours availability</Typography>
                  <h3 style={{ display: "flex", justifyContent: "center", alignItems: "center", background: "#eeeeee", padding: "5px 10px 5px 5px", borderRadius: "3px", border: `solid 1px ${dataArrowsAndColors(modalBoxPercentage).color}`, color: dataArrowsAndColors(modalBoxPercentage).color }}> <span style={{ fontSize: "25px", display: "flex", justifyContent: "center", alignItems: "center", }} >{dataArrowsAndColors(modalBoxPercentage).icon}</span>  {modalBoxPercentage}%</h3> 
                  </Stack>
                  <Box/>
                  <br/>
                  <Box sx={{ width: "100%",   display: "flex",justifyContent: "space-around", alignItems: "center", flexWrap: "wrap" }}>
                       {newAveraveData.slice(0, 140).map((item, i) => {
                        //  console.log("newAveraveData",newAveraveData)
                          return (
                            <Box key={i}>
                              <Tooltip title={`${item.slice(0, 19)}`} arrow>
                                {item == "No data available" ? <GrayBars /> : <GreenBars />}
                              </Tooltip>
                            </Box>
                          );
                       })}
                  </Box>
                 </Box>
               </SytledModal>
               )} 
    </MainBox>
  );
}

export default Availability;

