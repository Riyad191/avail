import React from "react";
import { BoxInfo, BoxPercentage, BoxInfoSection, DataBars, Uptime} from "./styles";
import { Typography, Box, Stack, styled, Modal } from "@mui/material";

function Availablitiy_Info({ data, show, index, openModal, setOpenModal }) {

  
  const SytledModal = styled(Modal)({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  });

  return (

       <BoxInfo>
        <BoxInfoSection>
          {data.details.map((x, i) => <DataBars key={i} sx={{ background: +x !== 1 ? "#D12E3D" : "#187F0C"}}></DataBars>)}
        </BoxInfoSection>
        <Uptime>{`${data.day}% uptime in last 24 hours`}</Uptime>
        <BoxPercentage>
        {info(data).map((x,i) => {
          return(
            <Box key={i} >
              <Typography fontSize="12px" color="#000" >{Object.keys(x)}</Typography>
              <Stack direction="row" sx={{justifyContent:"center", alignItems: "center"}}>
              <Box className="span"/>{`${Object.values(x)}%`}</Stack>
            </Box>)}
          ) 
        } 
        </BoxPercentage>
      </BoxInfo>
    
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
 