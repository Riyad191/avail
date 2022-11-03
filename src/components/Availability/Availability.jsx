import React, { useEffect, useState } from "react";
import "./styles.css";
import { Typography, Box, Tooltip, Modal, styled } from "@mui/material";
import { formatAvailabilityData, dataArrowsAndColors } from "./Data_Processor";
import {
  ArrowBox,
  MainBox,
  DataCard,
  BoxFn,
  GreenBars,
  GrayBars
} from "./styles";
import Card_Info from "./Card_Info";
import Cards_Title from "./Card_Title";
import Loading_Error from "./Loading_Error";
import axios from "axios";
import { BiDownArrowAlt, BiUpArrowAlt } from "react-icons/bi";
import { CgArrowsExchangeV } from "react-icons/cg";
import { IoIosRemove } from "react-icons/io";
// import { IoIosRemove } from "react-icons/vs";
import PopUpModal from "./PopUpModal"

const lastTwoHours = "last 2 hours of today - PST "

function Availability({ apps }) {
 
  const [matchIndex, setMatchIndex] = React.useState(-1);
 
  const showDetails = (x) =>
    matchIndex == x ? setMatchIndex(-1) : setMatchIndex(x);
  const [fiveMinsData, setFiveMinsData] = React.useState([]);
  const [fiveMinsDataWithDates, setFiveMinsDataWithDates] = React.useState([])
  const [loading, setLoading] = React.useState(true)
  const [lastFiveDays, setLastFiveDays] = useState([])
   

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
    setLastFiveDays(recentFiveDays)
    // console.log("lastFiveDays",lastFiveDays)
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
          // console.log("newFiveMinsData[index]",newFiveMinsData[index].app_name)
          newFiveMinsData[index].dates = item.map((innerItem) => {
            const arr = new Array(24).fill("No data")
            const innerDate = innerItem.data.length == 0 ? arr.map((a,i) => { return {"create_date": innerItem.data[i] ?? a}} ) : innerItem.data.slice(-24).map(({ create_date }) => ({ create_date }));
            // console.log("innerItem.data",innerDate)
            return innerDate
          })
           
          const modalAppName = newFiveMinsData[index].app_name
          const modalDatesArr = new Array(288).fill("No data")
           const modalDates = item.map((innerItem) => innerItem.data.length == 0 ? modalDatesArr.map((a,i) => { return  innerItem.data[i] ?? a } ) : innerItem.data.map((a) => a.create_date))
          //  const modalDates = item.map((innerItem) => innerItem.data.map((a) => a.create_date))
          //  console.log("modalDates",modalDates)
          newFiveMinsData[index].total_and_average = item.map((innerItem,idx) => {
            const total = innerItem.data.reduce((acc,curr) => acc + curr.avail_percent,0)
            const average = total > 0 ? total / innerItem.data.length : 0;
             return {"total": total, "average": average , "modalDates": modalDates[idx], "app_name": modalAppName}});
        });
        console.log("newFiveMinsData",newFiveMinsData)
        setFiveMinsDataWithDates(newFiveMinsData)
      });
    }, [fiveMinsData]);

  const dataArrowsAndColors = v => +v > 99.95 ? obj.success : +v < 99 && +v >= 1 ? obj.denger : +v < 1 ? obj.secondary : obj.warning;

    const obj = {
      success: { color: "#367600", icon: <BiUpArrowAlt /> },
      denger: { color: "#DC0909", icon: <BiDownArrowAlt /> },
      warning: { color: "#EDDE27", icon: <CgArrowsExchangeV /> },
      secondary: { color: "#787878", icon: <IoIosRemove /> }
  }


const SytledModal = styled(Modal)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

  const [newAveraveData, setNewAverageData] = useState([])
  const [show, setShow] = useState(false)
  const [openModal, setOpenModal] = React.useState();
  const [modalAppNameVar, setModalAppNameVar] = React.useState("");
  // useEffect(()=>{
   
  //   setNewAverageData(fiveMinsDataWithDates.map(item => item.total_and_average))
    
    
  // },[])
  // console.log("newAveraveData:",newAveraveData)

  const foo = (i,x) => {
    setNewAverageData(i)
    setModalAppNameVar(x)
    setShow(true)
  }

  // console.log("setOpenModal",newAveraveData)
 
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
              {item.total_and_average.reverse().map((innerItem,idx) => {
              // {item.total_and_average.filter(innerItem => innerItem.average.toString() != "NaN").map((innerItem,idx) => {
                
              //  console.log("item.total_and_average",item.total_and_average)
               
                return(
                  <div onClick={() =>  setOpenModal(true)} key={idx} >
                    <Typography variant="subtotal-1" sx={{ color: dataArrowsAndColors(innerItem.average).color, textAlign: "center"}} >{innerItem.average}%</Typography>
                    <BoxFn onClick={()=> { console.log("BoxFn:",innerItem); return foo(innerItem.modalDates, innerItem.app_name) } } >
                      <ArrowBox bgcolor={dataArrowsAndColors(innerItem.average).color} sx={{ textAlign: "center"}}>{dataArrowsAndColors(innerItem.average).icon}</ArrowBox>
                      <Typography sx={{ color: dataArrowsAndColors(innerItem.average).color, textAlign: "center"}}></Typography>
                    </BoxFn>
                  </div>
                ) 
              })}
            </div>
            <div style={{display: "flex", width: "100%", justifyContent: "space-around", alignItems: "center"}} >
               {lastFiveDays.map((item,idx) => <p key={idx} >{item.slice(-5)}</p> ).reverse()} 
               {/* {unqiue.reverse().map(item => item.map((item,idx) => <p key={idx} >{item}</p> ))}  */}
            </div>
            </Box>
            <div style={{display: "flex", width: "100%", justifyContent: "space-around", alignItems: "center"}} >
            <div style={{ textAlign: "left", width:"100%", fontSize:"12px"}} >
              <p style={{marginLeft: "5px"  }} >{lastTwoHours.toLowerCase()}</p>
              <div style={{display:"flex", justifyContent: "space-around", width:"100%"}} >
               {toolTipData.map((item,idx) => {
               return <div key={idx} >
                  <Tooltip title={`${item.create_date.slice(0,19)}`} arrow>
                  {/* <Tooltip title={`${item.create_date.slice(0,10)}(${item.create_date.slice(11,19)})`} arrow> */}
                 {item.create_date == "No data" ? <GrayBars/> : <GreenBars/>}  
                  </Tooltip>
               </div>
               })} 
              </div>
            </div>
            </div> 
            <>
    </>
            <PopUpModal modalDates={modalDates} data={item} matchIndex={matchIndex} index={index} openModal={openModal} setOpenModal={setOpenModal} />
          </DataCard>
        );
      })}
        {show &&  <SytledModal
          open={openModal}
          onClose={(e) => setOpenModal(false)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          sx={{ cursor: "pointer" }}
          > 

            {/* <Typography variant="h6" >last 5 hours availability</Typography> */}
          <Box sx={{ 
              width: "98%",
              height: "20%",
              background: "#fff",
              display: "flex",
              justifyContent: "space-around",
              alignItems: "center",
              flexWrap: "wrap",
              padding: "0 20px",
              borderRadius: "5px" }} >
              {/* <h1>App Name: {modalAppNameVar}</h1> */}
              {newAveraveData.slice(-160).map((item,i) => {        
              return <Box key={i} >
                <Tooltip title={`${item.slice(0,19)}`} arrow>
                  {item == "No data" ? <GrayBars/> : <GreenBars/>} 
                </Tooltip>
              </Box>
              })}
          </Box>
 
        </SytledModal>}
    </MainBox>
  );
}

export default Availability;
