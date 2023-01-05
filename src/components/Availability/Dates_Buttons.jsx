import React from "react"
import { Typography, Box, Tooltip } from "@mui/material";
import { ArrowBox, BoxFn } from "./styles";
import { useSelector } from "react-redux";


const ButtonsAndDates = ({item, dataArrowsAndColors, modalStates, lastFiveDays, setOpenModal}) => {
  const recentFiveDays = useSelector((state) => state.pillarNameReducer.recentFiveDays);
  const firstTitleDate = recentFiveDays[0];
  const lastTitleDate = recentFiveDays[recentFiveDays.length - 1];
    return (
        <Box bgcolor="#e2e2e2" sx={{ width: "100%", padding: "3px 0", borderRadius: "5px" }}>
          <Box sx={{textAlign: "center", padding: "0 0 6px 10px"}} >
            <Typography sx={{fontSize: "12px"}}>Available Data From <span style={{color: "blue", fontSize: "13px"}} >{lastTitleDate}UTC</span> through <span style={{color: "blue", fontSize: "13px"}}>{firstTitleDate}UTC</span>  </Typography>
          </Box>
          <Box sx={{ display: "flex", width: "100%", justifyContent: "space-around", alignItems: "center"}}>
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
                      <Box>
                        <Typography variant="subtotal-1" sx={{ color: dataArrowsAndColors(ave).color, textAlign: "center" }}> {ave}% </Typography>
                        <BoxFn onClick={() => {
                          return modalStates(innerItem.map(a => a), boxDate, item.app_name, item.flow_name, ave)
                        }}>
                          <ArrowBox bgcolor={ dataArrowsAndColors(ave).color } sx={{ textAlign: "center" }}> {dataArrowsAndColors(ave).icon} </ArrowBox>
                          <Typography sx={{ color: dataArrowsAndColors(ave).color, textAlign: "center" }}></Typography>
                        </BoxFn>
                        <div>{[...new Set(filterDate.map(a => a.slice(0,10)))].map(a => a.slice(5))}</div>
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