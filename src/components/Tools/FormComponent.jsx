import * as React from "react";
import { TextField, Box, Typography } from "@mui/material";
import { useSelector } from "react-redux";

const FormComponent = ({showPillar, show}) => {
  const appsNum = useSelector(state => state.pillarNameReducer.appsNum)
  console.log("apps number", appsNum)
  return (
    <>
      <Box component="form" noValidate autoComplete="off" sx={{ width: "100%", display: "flex", alignItems: "center", padding: "9px 0", justifyContent: "space-between", borderRadius: 2 }}>
        <Box>
          <TextField sx={{ width: 260, mr: 3, bgcolor: "#FFF" }} id="outlined-basic" label="Search" placeholder="Search" variant="outlined" size="small"/>
          <TextField sx={{ width: 260, mr: 3, bgcolor: "#FFF" }} id="outlined-basic" label="Search" placeholder="Search" variant="outlined" size="small"/>
          <TextField sx={{ width: 260, mr: 3, bgcolor: "#FFF" }} id="outlined-basic" label="Search" placeholder="Search" variant="outlined" size="small"/>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
         <Typography variant="div" style={{ border: "solid 1px grey",  width: 200, height: 50, display: "flex", justifyContent: "center", alignItems: "center" }}> {`Applications: ${appsNum}`} </Typography>
         &nbsp;&nbsp;&nbsp;&nbsp;
         <Typography variant="div" style={{ border: "solid 1px grey",  width: 200, height: 50, display: "flex", justifyContent: "center", alignItems: "center" }}>{show ? <h3>{showPillar}</h3> : <h3>Transportation</h3> } </Typography>
        </Box>
      </Box>
    </>
  );
};

export default FormComponent;
