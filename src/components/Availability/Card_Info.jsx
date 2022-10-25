import React from "react";
import { BoxInfo, BoxPercentage, BoxInfoSection, DataBars} from "./styles";
import { Typography, Box, Stack } from "@mui/material";

function Availablitiy_Info({ data, show, index }) {

  return (
    // show == index && (
      <BoxInfo>
        <BoxInfoSection>
          {data.details.map((x, i) => <DataBars key={i} sx={{ background: +x !== 1 ? "#D12E3D" : "#187F0C"}}></DataBars>)}
        </BoxInfoSection>
        <Box className="day">{data.day}% uptime in last 24 hours</Box>
        <BoxPercentage>
        {info(data).map(x => {
          return(
            <Box>
              <Typography variant="body2" color="#000" >{Object.keys(x)}</Typography>
              <Stack direction="row" sx={{justifyContent:"center", alignItems: "center"}}>
              <Box className="span"></Box>{Object.values(x)}%</Stack>
            </Box>)}
          ) 
        } 
        </BoxPercentage>
      </BoxInfo>
    // )
  );
}

const info = (data) => {
 return [
   { "Available CPU": data.availableCPU },
   { "Available Memory": data.availableMemory },
   { "System Load": data.systemLoad },
   { "Respone Time": data.responeTime }
 ]
}


export default Availablitiy_Info;
 