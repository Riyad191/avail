import * as React from "react";
import { TextField, Box, Typography, Autocomplete, styled } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setFlowNameData, setAppNameData } from "../../store/actionCreater"
import { Tooltip } from "@mui/material";
 

const FormComponent = ({showPillar, show}) => {
  const dispatch = useDispatch()
  const cardTitleData = useSelector(state => state.pillarNameReducer.cardTitleData)
  // console.log("cardTitleData",cardTitleData)
  const appsNum = useSelector(state => state.pillarNameReducer.appsNum)
  const todaysAvailability = useSelector(state => state.pillarNameReducer.todaysAvailability)

 const AvailbilityPercentageBox = styled(Box)(() => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border: "solid #cecece 1px",
    padding: "0 10px",
    background: "#fff",
    borderRadius: "5px",
    width: "20%"
  }));

  return (
    <>
      <Box component="form" noValidate autoComplete="off" sx={{ width: "100%", display: "flex", alignItems: "center", padding: "9px 0", justifyContent: "space-between", borderRadius: 1 }}>
        <Box sx={{ width: "50%", display: "flex", alignItems: "center", justifyContent: "flex-start" }} >
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={[...new Set(cardTitleData.map(a => a.app_name))]}
            sx={{ marginRight: 1 , width: 300 }}
            onChange={(e, newVal)=> dispatch(setAppNameData(newVal === null ? "" : newVal))}
            renderInput={(params) => <TextField {...params} label="App Name" size="small" />}
          />
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={[...new Set(cardTitleData.map(a => a.service_name))]}
            sx={{ width: 300 }}
            onChange={(e, newVal)=> dispatch(setFlowNameData(newVal === null ? "" : newVal))}
            renderInput={(params) => <TextField {...params} label="Service Name" size="small" />}
          />
        </Box>
        <AvailbilityPercentageBox>
          <Box sx={{   borderRadius: "3px", height: 40, display: "flex", alignItems: "center",justifyContent: "center", 
          // color: todaysAvailability < 90 ? "red" : "green"
          }} >
             <Typography>
                <Tooltip title="Today's Availability" placement="top" followCursor><span style={{color:"#4d4d4d"}} >Overall Availability:</span></Tooltip>
                {typeof(todaysAvailability) === "number" ? `${todaysAvailability.toPrecision(3)}%` : "0%"} <span style={{color:"#4d4d4d"}} > ({appsNum} apps)</span>
             </Typography>
          </Box>
        </AvailbilityPercentageBox>
        {/* <AvailbilityPercentageBox>
          <Box sx={{   borderRadius: "3px", height: 40, width: "200px",  display: "flex", alignItems: "center",justifyContent: "center", color: todaysAvailability < 90 ? "red" : "green" }} >
            <Typography> <span style={{color:"#4d4d4d"}} >Today's Availability:</span>  {todaysAvailability}% </Typography>
          </Box>
          &nbsp;&nbsp;&nbsp;&nbsp;
         <Typography variant="div" style={{ width: 160, height: 40, display: "flex", justifyContent: "center", alignItems: "center" }}> <span style={{color:"#4d4d4d"}}  >Applications:</span>&nbsp;{appsNum} </Typography>
         &nbsp;&nbsp;&nbsp;&nbsp;
         <Typography variant="div" style={{ height: 40, display: "flex", justifyContent: "center", alignItems: "center" }}> <span style={{color:"#4d4d4d"}}  >Pillar:</span> &nbsp;{show ? <h4>{showPillar}</h4> : <h4>FULFILLMENT</h4> } </Typography>
        </AvailbilityPercentageBox> */}
      </Box>
    </>
  );
};

export default FormComponent;
