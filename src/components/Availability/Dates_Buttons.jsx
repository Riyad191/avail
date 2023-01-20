import React from "react"
import { Typography, Box, Tooltip } from "@mui/material";
import { ArrowBox, BoxFn } from "./styles";
import { useSelector } from "react-redux";
import { FcCalendar } from "react-icons/fc"


const ButtonsAndDates = ({item, dataArrowsAndColors, modalStates, lastFiveDays, setOpenModal}) => {
  const recentFiveDays = useSelector((state) => state.pillarNameReducer.recentFiveDays);
  const firstTitleDate = recentFiveDays[0];
  const lastTitleDate = recentFiveDays[recentFiveDays.length - 1];
  // console.log("recentFiveDays.length",item)
    return (
        <Box bgcolor="#e2e2e2" sx={{width: "100%", padding: "3px 0", borderRadius: "5px"}}>
          <Box sx={{display: "flex", justifyContent: "space-between", alignItems: "center", height: "30%", padding: "0 20px", width: "100%"}} >
            <Typography sx={{fontSize: "12px"}}>Available Data</Typography>
            <Typography sx={{fontSize: "12px", display: "flex",  justifyContent: "space-between", alignItems: "center",}}><span style={{ fontSize: "17px", margin: "6px 4px 0 0"}}><FcCalendar/></span><span style={{color: "rgb(7, 18, 138)", fontSize: "13px"}} >{`${lastTitleDate.slice(5)}-${lastTitleDate.slice(0,4)}`}</span> / <span style={{color: "rgb(7, 18, 138)", fontSize: "13px"}}>{`${firstTitleDate.slice(5)}-${firstTitleDate.slice(0,4)}`} (UTC)</span> </Typography>
          </Box>
          <Box sx={{ 
            overflow: "auto",
             display: "flex", justifyContent: item.date_and_percentage.length < 6 ? "space-around" : "flex-start", alignItems: "center"}}>
              {item.date_and_percentage.map((innerItem, idx) => {
              const bottomDates = innerItem.filter(a => a.create_date !== "no data available").map(a => a.create_date.slice(0,10));
              const uniqueBottomDate = [...new Set(bottomDates)];
              const len = item.date_and_percentage.map(innerItem => innerItem.filter(a => a.create_date !== "no data available")).filter(a => a.length !== 0)
              lastFiveDays.length < len.length && lastFiveDays.push(uniqueBottomDate);
                const total = innerItem.map(a => a.avail_percent).filter(b => b !== undefined).reduce((acc,cur)=> acc + cur,0)
                const average = total > 0 ? total / innerItem.filter(a => a.create_date != "no data available").length : 0;
                const ave = average.toString().length > 4 ? +average.toPrecision(3) : average
                const filterDate = innerItem.map(a => a.create_date).filter(a => a != "no data available")
                const boxDate = [...new Set(filterDate.map(a => a.slice(0,10)))];
                return (
                  <Box onClick={() => {
                    setOpenModal(true);
                  }} key={idx}>
                    <Tooltip title={`click`} placement="top" followCursor>
                      <Box sx={{margin: "0 20px"}} >
                        <Typography variant="subtotal-1" sx={{ color: dataArrowsAndColors(ave).color, textAlign: "center" }}> {ave}% </Typography>
                        <BoxFn onClick={() => {
                          return modalStates(innerItem.map(a => a), boxDate, item.app_name, item.flow_name, ave)
                        }}>
                          <ArrowBox bgcolor={ dataArrowsAndColors(ave).color } sx={{ textAlign: "center" }}> {dataArrowsAndColors(ave).icon} </ArrowBox>
                          <Typography sx={{ color: dataArrowsAndColors(ave).color, textAlign: "center" }}></Typography>
                        </BoxFn>
                        <Box sx={{width: "50px"}} >{[...new Set(filterDate.map(a => a.slice(0,10)))].map(a => a.slice(5))}</Box>
                      </Box>
                    </Tooltip>
                  </Box>
                );
              }).reverse()}
          </Box>
        </Box>
    )
}

export default ButtonsAndDates;