import * as React from "react";
import { TextField, Box, Typography, Autocomplete, styled } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setFlowNameData, setAppNameData, seAvailabilityDate } from "../../store/actionCreater"
import { Tooltip } from "@mui/material";
 

const FormComponent = () => {
  const dispatch = useDispatch()
  const cardTitleData = useSelector(state => state.pillarNameReducer.cardTitleData)
  const mainData = useSelector(state => state.pillarNameReducer.mainData)
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
            options={mainData.length == 0 ? ["No Applications"].map(a => a) : [...new Set(cardTitleData.map(a => a.app_name))]}
            sx={{ marginRight: 1 , width: 300 }}
            onChange={(e, newVal)=> dispatch(setAppNameData(newVal === null ? "" : newVal))}
            renderInput={(params) => <TextField {...params} label="App Name" size="small" />}
          />
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={mainData.length == 0 ? ["No Services"].map(a => a) :  [...new Set(cardTitleData.map(a => a.service_name))]}
            sx={{ marginRight: 1 , width: 300 }}
            onChange={(e, newVal)=> dispatch(setFlowNameData(newVal === null ? "" : newVal))}
            renderInput={(params) => <TextField {...params} label="Service Name" size="small" />}
          />
          <TextField onChange={(e)=> dispatch(seAvailabilityDate(e.target.value))} id="outlined-basic"  variant="outlined" size="small" type="date"  sx={{ width: 300 }} />
        </Box>
        <AvailbilityPercentageBox>
          <Box sx={{ borderRadius: "3px", height: 40, display: "flex", alignItems: "center",justifyContent: "center"  }} >
             <Typography>
                <Tooltip title="Today's Availability" placement="top" followCursor><span style={{color:"#4d4d4d"}} >Overall Availability:</span></Tooltip>
                &nbsp; { todaysAvailability > 1 ? `${todaysAvailability.toPrecision(3)}` : "0.00"}% &nbsp;  <span style={{color:"#4d4d4d"}} > ({appsNum} apps)</span>
             </Typography>
          </Box>
        </AvailbilityPercentageBox>
      </Box>
    </>
  );
};

export default FormComponent;
