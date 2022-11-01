import React, { useEffect } from "react";
import "./styles.css";
import { Typography, Box, Tooltip, Modal, styled } from "@mui/material";
import { formatAvailabilityData, dataArrowsAndColors } from "./Data_Processor";
import {
  ArrowBox,
  MainBox,
  DataCard,
  BoxFn,
  DataBars
} from "./styles";
import Card_Info from "./Card_Info";
import Cards_Title from "./Card_Title";
import Loading_Error from "./Loading_Error";
import axios from "axios";
import { BiDownArrowAlt, BiUpArrowAlt } from "react-icons/bi";
import { CgArrowsExchangeV } from "react-icons/cg";
import PopUpModal from "./PopUpModal"

const lastTwoHours = "PST last 2 hours"

function Availability({ apps }) {
 
  const [matchIndex, setMatchIndex] = React.useState(-1);
  const [openModal, setOpenModal] = React.useState(false);
  const showDetails = (x) =>
    matchIndex == x ? setMatchIndex(-1) : setMatchIndex(x);
  const [fiveMinsData, setFiveMinsData] = React.useState([]);
  const [fiveMinsDataWithDates, setFiveMinsDataWithDates] = React.useState([])
  const [loading, setLoading] = React.useState(true);
   

  const mainURl =
    "https://oscs-sre-api.dev.walmart.com/availability/get/app-list?tier=1&&platfom=WCNP&pillar=TRANSPORTATION";

  const fetchApi = async () => {
  
    try {
      const res = await axios(mainURl);
      const data = res.data;
      setFiveMinsData(data);
      setLoading(false);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    fetchApi();
  }, []);
 
  useEffect(() => {
    const today = new Date();
    const recentFiveDays = new Array(5).fill().map((_, index) => {
      const nextDate = new Date();
      nextDate.setDate(today.getDate() - index);
      return nextDate.toISOString().slice(0, 10);
    });
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
      .then((res) => res.map((item) => item.status === "fulfilled" ? item.value.map((innerItem) =>
         innerItem.status === "fulfilled" ? innerItem.value : undefined) : undefined))
      .then((res) => {
        const newFiveMinsData = [...fiveMinsData]
        res.forEach((item, index) => {
          newFiveMinsData[index] = {...newFiveMinsData[index]}
          newFiveMinsData[index].dates = item.map((innerItem) =>
            innerItem.data.slice(-24).map(({ create_date }) => ({ create_date })));
           const modalDates = item.map((innerItem) => innerItem.data.map((a) => a.create_date));
          newFiveMinsData[index].total_and_average = item.map((innerItem,idx) => {
            const average = innerItem.data.reduce((acc,curr) => acc + curr.avail_percent,0) / innerItem.data.length
            const total = innerItem.data.reduce((acc,curr) => acc + curr.avail_percent,0)
             return {"total": total, "average": average, "modalDates": modalDates[idx]}});
        });
        console.log("newFiveMinsData",newFiveMinsData)
        setFiveMinsDataWithDates(newFiveMinsData)
      });
    }, [fiveMinsData]);

  const dataArrowsAndColors = v => +v >= 99 ? obj.success : obj.denger;

    const obj = {
      success: { color: "#367600", icon: <BiUpArrowAlt /> },
      denger: { color: "#DC0909", icon: <BiDownArrowAlt /> },
      warning: { color: "#FA9235", icon: <CgArrowsExchangeV /> }
  }
 
  return (
    <MainBox>
      {/* <Loading_Error /> */}
      {loading && <h1>loading...</h1>}
      {fiveMinsDataWithDates && fiveMinsDataWithDates.map((item, index) => {
        const toolTipData = item.dates[0]
        const modalDates = item.modalDates
        const unqiueData = item.dates.map(x => x.map(y => y.create_date.slice(5,10)))
        const unqiue = unqiueData.map(data => [... new Set(data)] )
        return (
          <DataCard key={index}  >
            <Cards_Title data={item} />
           <Box bgcolor="#e2e2e2" sx={{width:"100%", padding: "3px 0", borderRadius: "5px"}} >
            <div style={{display: "flex", width: "100%", justifyContent: "space-around", alignItems: "center"}} >
              {item.total_and_average.filter(item => item.average.toString() != "NaN").map((item,idx) => {
                return(
                  <div onClick={() =>  setOpenModal(true)} key={idx} >
                    <Typography variant="subtotal-1" sx={{ color: dataArrowsAndColors(item.average).color, textAlign: "center"}} >{item.average}%</Typography>
                    <BoxFn >
                      <ArrowBox bgcolor={dataArrowsAndColors(item.average).color} sx={{ textAlign: "center"}}>{dataArrowsAndColors(item.average).icon}</ArrowBox>
                      <Typography sx={{ color: dataArrowsAndColors(item.average).color, textAlign: "center"}}></Typography>
                    </BoxFn>
                  </div>
                ) 
              })}
            </div>
            <div style={{display: "flex", width: "100%", justifyContent: "space-around", alignItems: "center"}} >
               {unqiue.reverse().map(item => item.map((item,idx) => <p key={idx} >{item}</p> ))} 
            </div>
            </Box>
            <div style={{display: "flex", width: "100%", justifyContent: "space-around", alignItems: "center"}} >
            <div style={{ textAlign: "left", width:"100%", fontSize:"12px"}} >
              <p style={{marginLeft: "5px"  }} >{lastTwoHours.toLowerCase()}</p>
              <div style={{display:"flex", justifyContent: "space-around", width:"100%"}} >
               {toolTipData.map((item,idx) => {
               return <div key={idx} >
                  <Tooltip title={`${item.create_date.slice(0,10)}(${item.create_date.slice(11,19)})`} arrow>
                  <DataBars/> 
                  </Tooltip>
               </div>
               })} 
              </div>
            </div>
            </div> 
            <PopUpModal modalDates={modalDates} data={item} matchIndex={matchIndex} index={index} openModal={openModal} setOpenModal={setOpenModal} />
          </DataCard>
        );
      })}
    </MainBox>
  );
}

export default Availability;
