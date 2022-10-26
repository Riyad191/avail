import * as React from "react";
import { TextField, Box, Typography } from "@mui/material";

const FormComponent = () => {
  return (
    <>
      <Box component="form" noValidate autoComplete="off" sx={{ width: "100%", display: "flex", alignItems: "center", padding: "9px 0", justifyContent: "space-between", borderRadius: 2 }}>
        <Box>
          <TextField sx={{ width: 260, mr: 3, bgcolor: "#FFF" }} id="outlined-basic" label="Search" placeholder="Search" variant="outlined" size="small"/>
          <TextField sx={{ width: 260, mr: 3, bgcolor: "#FFF" }} id="outlined-basic" label="Search" placeholder="Search" variant="outlined" size="small"/>
          <TextField sx={{ width: 260, mr: 3, bgcolor: "#FFF" }} id="outlined-basic" label="Search" placeholder="Search" variant="outlined" size="small"/>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Typography style={{ border: "solid 1px grey", padding: 10 }}><h3>FULFILLMENT</h3></Typography>
        </Box>
      </Box>
    </>
  );
};

export default FormComponent;
