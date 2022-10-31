import React, { useEffect } from "react";
import "./styles.css";
import { Typography, Box, Tooltip } from "@mui/material";
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
import Add from "./AvailabilityModal";
import axios from "axios";
import { BiDownArrowAlt, BiUpArrowAlt } from "react-icons/bi";
import { CgArrowsExchangeV } from "react-icons/cg";

function Availability({ apps }) {
  const [matchIndex, setMatchIndex] = React.useState(-1);
  const [openModal, setOpenModal] = React.useState(false);
  const showDetails = (x) =>
    matchIndex == x ? setMatchIndex(-1) : setMatchIndex(x);
  const [fiveMinsData, setFiveMinsData] = React.useState([]);
  const [fiveMinsDataWithDates, setFiveMinsDataWithDates] = React.useState([])
  const [loading, setLoading] = React.useState(true);
  const [userss, setUserss] = React.useState([]);

  const mainURl =
    "https://oscs-sre-api.dev.walmart.com/availability/get/app-list?tier=0&&platfom=WCNP";

  const click = async () => {
    //capital
    try {
      const res = await axios(mainURl);
      const data = res.data;
      // console.log("app_name", data);
      setFiveMinsData(data);
      setLoading(false);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    click();
  }, []);

  useEffect(() => {
    const today = new Date();
    const recentFiveDays = new Array(5).fill().map((_, index) => {
      const nextDate = new Date();
      nextDate.setDate(today.getDate() - index);
      return nextDate.toISOString().slice(0, 10);
    });
    const array = fiveMinsData.map((a) => a.glb_url);
    // console.log("arr", array);
 
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
                // console.log("res1", res.data);
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
        const newFiveMinsData = [...fiveMinsData]
        res.forEach((item, index) => {
          newFiveMinsData[index] = {...newFiveMinsData[index]}
          newFiveMinsData[index].dates = item.map((innerItem) =>
            innerItem.data.map(({ create_date }) => ({
              create_date,
            })).slice(-24)
          );
          newFiveMinsData[index].total_and_average = item.map((innerItem) => {
            const average = innerItem.data.reduce((acc,curr) => acc + curr.avail_percent,0) / innerItem.data.length
            const total = innerItem.data.reduce((acc,curr) => acc + curr.avail_percent,0)
             return {"total": total, "average": average}
          }
          );
        });
        console.log("newFiveMinsData",newFiveMinsData)
        setFiveMinsDataWithDates(newFiveMinsData)
      });
    }, [fiveMinsData]);
    
      //  const d = new Date()
      //  const date = d.toISOString().slice(0,10)
    
      // const array = fiveMinsData.map(a => a.glb_url)
      // let users = [];
      // let promises = [];
      // for (let i = 0; i < array.length; i++) {
      //   promises.push(
      //     axios.get(`https://oscs-sre-api.dev.walmart.com/availability/detailed_avail_percent?glb_url=${array[i]}&&date_frequency=5mins&&create_date=${date}`).then(response => {
      //           users.push(response.data.flat(1));
      //         })
      //       )
      //     }
      // Promise.all(promises).then(() => console.log( "glb_url", users ));
  

  const dataArrowsAndColors = v => +v >= 99 ? obj.success : obj.denger;
    const obj = {
      success: { color: "#367600", icon: <BiUpArrowAlt /> },
      denger: { color: "#DC0909", icon: <BiDownArrowAlt /> },
      warning: { color: "#FA9235", icon: <CgArrowsExchangeV /> }
  }
  const lastTwoHours = "last 2 hours availability"
  return (
    <MainBox>
      <Loading_Error />
      {loading && <h1>loading...</h1>}
      {fiveMinsDataWithDates && fiveMinsDataWithDates.map((item, index) => {
        const yy = item.dates[0]
        const unqiueData = item.dates.map(a=>a.map(a => a.create_date.slice(5,10)))
        const unqiue = unqiueData.map(a => [... new Set(a)] )
        return (
          <DataCard key={index} >
            <Cards_Title data={item} />
           <Box bgcolor="#e2e2e2" sx={{width:"100%", padding: "3px 0", borderRadius: "5px"}} >
            <div style={{display: "flex", width: "100%", justifyContent: "space-around", alignItems: "center"}} >
              {item.total_and_average.reverse().filter(a => a.average == 100).map((a,i) => {
                return(
                  <div key={i} >
                    <Typography variant="subtotal-1" sx={{ color: dataArrowsAndColors(a.average).color, textAlign: "center"}} >{a.average}%</Typography>
                    <BoxFn>
                      <ArrowBox bgcolor={dataArrowsAndColors(a.average).color} sx={{ textAlign: "center"}}>{dataArrowsAndColors(a.average).icon}</ArrowBox>
                      <Typography sx={{ color: dataArrowsAndColors(a.average).color, textAlign: "center"}}></Typography>
                    </BoxFn>
                  </div>
                ) 
              })}
            </div>
            <div style={{display: "flex", width: "100%", justifyContent: "space-around", alignItems: "center"}} >
               {unqiue.reverse().map(a=>a.map((a,i) => <p key={i} >{a}</p> ))} 
            </div>
            </Box>
            <div style={{display: "flex", width: "100%", justifyContent: "space-around", alignItems: "center"}} >
            <div style={{ textAlign: "left", width:"100%", fontSize:"12px"}} >
              <p style={{marginLeft: "5px" , color: "darkBlue"}} >{lastTwoHours.toLowerCase()}</p>
              <div style={{display:"flex", justifyContent: "space-around", width:"100%"}} >
               {yy.map((a,i) => {
                //  console.log("aaa",a)
               return <div key={i} >
                  <Tooltip title={a.create_date.slice(0,19)} arrow>
                  <DataBars/> 
                  </Tooltip>
               </div>
               })} 

              </div>

            </div>
            </div> 
          </DataCard>
        );
      })}
    </MainBox>
  );
}

export default Availability;
