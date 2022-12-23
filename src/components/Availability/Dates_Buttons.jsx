import React from "react"
import { Typography, Box } from "@mui/material";
import { ArrowBox, BoxFn } from "./styles";


const TopSec = ({item, dataArrowsAndColors, modalStates, lastFiveDays, setOpenModal}) => {
    return (
        <Box bgcolor="#e2e2e2" sx={{ width: "100%", padding: "3px 0", borderRadius: "5px" }}>
                <div style={{ display: "flex", width: "100%", justifyContent: "space-around", alignItems: "center"}}>
                  {
                  // item.date_and_percentage.map(innerItem => innerItem.filter(a => a.create_date !== "no data available")).filter(a => a.length !== 0) 
                  item.date_and_percentage.reverse().map((innerItem, idx) => {
                  //  console.log("lennnnn",item.date_and_percentage.map(innerItem => innerItem.filter(a => a.create_date !== "no data available")).filter(a => a.length !== 0))
                    const bottomDates = innerItem.filter(a => a.create_date !== "no data available").map(a => a.create_date.slice(0,10));
                    const uniqueBottomDate = [...new Set(bottomDates)];
                    const len = item.date_and_percentage.map(innerItem => innerItem.filter(a => a.create_date !== "no data available")).filter(a => a.length !== 0)
                    lastFiveDays.length < len.length && lastFiveDays.push(uniqueBottomDate);
                      const total = innerItem.map(a => a.avail_percent).filter(b => b !== undefined).reduce((acc,cur)=> acc + cur,0)
                      const average = total > 0 ? total / innerItem.filter(a => a.create_date != "no data available").length : 0;
                      const ave = average.toString().length > 4 ? +average.toPrecision(3) : average
                      return (
                        <div onClick={() => setOpenModal(true)} key={idx}>
                          <Typography variant="subtotal-1" sx={{ color: dataArrowsAndColors(ave).color, textAlign: "center" }}> {ave}% </Typography>
                          <BoxFn onClick={() => {
                            return modalStates(innerItem.map(a => a), item.app_name, item.flow_name, ave)
                          }}>
                            <ArrowBox bgcolor={ dataArrowsAndColors(ave).color } sx={{ textAlign: "center" }}> {dataArrowsAndColors(ave).icon} </ArrowBox>
                            <Typography sx={{ color: dataArrowsAndColors(ave).color, textAlign: "center" }}></Typography>
                          </BoxFn>
                        </div>
                      );
                    })}
                </div>
                <div style={{ display: "flex", width: "100%", justifyContent: "space-around", alignItems: "center" }}>
                  {/* {console.log("[...new Set(arr)]",[...new Set(lastFiveDays)])} */}
                  {lastFiveDays.map(a => a.map((item, idx) => <p key={idx}>{item.slice(5,10)}</p>))}
                </div>
              </Box>
    )
}

export default TopSec;