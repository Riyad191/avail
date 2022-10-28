import React, { useEffect } from "react";
import "./styles.css";
import { Typography } from "@mui/material";
import { formatAvailabilityData, dataArrowsAndColors } from "./Data_Processor";
import { ArrowBox, MainBox, DataCard, SectionBox, BoxFn, BoxKey, StackData} from "./styles";
import Card_Info from "./Card_Info";
import Cards_Title from "./Card_Title";
import Loading_Error from "./Loading_Error";
import  Add from "./AvailabilityModal"
import axios from "axios"


function Availability({ apps }) {
 
  const [matchIndex, setMatchIndex] = React.useState(-1);
  const [openModal, setOpenModal] = React.useState(false)
  const showDetails = x => matchIndex == x ? setMatchIndex(-1) : setMatchIndex(x);
  const [fiveMinsData, setFiveMinsData] = React.useState([])
  const [loading, setLoading] = React.useState(true)
  const [userss, setUserss] = React.useState([])

 

   
 
 const mainURl = "https://oscs-sre-api.dev.walmart.com/availability/get/app-list?tier=0&&platfom=WCNP";
 
 const click = async () => {
   try{
     const res = await axios(mainURl);
     const data = res.data;
     console.log("app_name",data);
     setFiveMinsData(data)
     setLoading(false)
    } catch(err) {
      console.error(err.message)
    }
  }

 useEffect(()=> {
    click()
 },[])



 const d = new Date()
 const date = d.toISOString().slice(0,10)
 

const array = fiveMinsData.map(a => a.glb_url)
let users = [];
let promises = [];
for (let i = 0; i < array.length; i++) {
  promises.push(
    axios.get(`https://oscs-sre-api.dev.walmart.com/availability/detailed_avail_percent?glb_url=${array[i]}&&date_frequency=5mins&&create_date=${date}`).then(response => {
          users.push(response.data.flat(1));
        })
      )
    }
Promise.all(promises).then(() => console.log( "glb_url", users ));
  

  
  
  
//  useEffect(()=>{
//   console.log(
//     "tttttttt",
//         userss 
//       )
//  },[userss])
 

  const foo = (i) => {
    showDetails(i)
    setOpenModal(true)
    // click()
  }
   
  return (
    <MainBox>
      <Loading_Error />
      {fiveMinsData.map((item, index) => {
        return (
          <DataCard className="card" key={index} onClick={() => foo(index)}>

            <Cards_Title data={item} />
            {item.map(a => a.date)}
            {/* <SectionBox>
              <StackData direction="row">
                {formatAvailabilityData(item).map((a, i) => {
                  const xxx = dataArrowsAndColors(a.value);
                  return (
                    <BoxFn key={i}>
                      <Typography sx={{ color: xxx.color, textAlign: "center"}}>{a.value}</Typography>
                      <ArrowBox bgcolor={xxx.color} sx={{ textAlign: "center"}}>{xxx.icon}</ArrowBox>
                    </BoxFn>
                  );
                })}
              </StackData>
              <BoxKey>{formatAvailabilityData(item).map((a, i) => <h4 key={i}>{a.key}</h4>)}</BoxKey>
            </SectionBox> */}
            {/* <Card_Info data={item} /> */}
            {/* <Add data={item} matchIndex={matchIndex} index={index} openModal={openModal} setOpenModal={setOpenModal} fiveMinsData={fiveMinsData} loading={loading} /> */}
          </DataCard>
        );
      })}
      {/* {users.map(a => a.map(a => <h1>{create_date && a.create_date}</h1>))} */}
    </MainBox>
  );
}

export default Availability;