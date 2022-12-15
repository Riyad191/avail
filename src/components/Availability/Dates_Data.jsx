import React from "react"
import { Tooltip, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { AvailabilityTypes } from "./Services";

const lastTwoHours = "last 2 hours of today's availability";
const BottomSec = React.memo(({ toolTipData }) => {
    const barsData = useSelector((state) => state.pillarNameReducer.barsData);
    return (
        <div style={{ display: "flex", width: "100%", justifyContent: "space-around", alignItems: "center"}}>
        <div style={{ textAlign: "left", width: "100%", fontSize: "12px" }}>
          <p style={{ marginLeft: "5px" }}>{lastTwoHours.toLowerCase()}</p>
          <div style={{ display: "flex", justifyContent: "space-around", width: "100%" }}>
            {toolTipData.map((item, idx) => {
              return (
                <div key={idx}>
                  <Tooltip title={ item.create_date == "no data available" ? <Typography sx={{fontSize: "12px"}} >no data available</Typography> : <Typography sx={{fontSize: "12px"}} > Date: {`${item.create_date.slice(0, 10)}`}, Time: {`${item.create_date.slice(12, 19)}`}, Availability: {`${item.avail_percent}%`}</Typography> } arrow>
                    {/* {item.create_date !== "no data available" ? <Success /> : <Secondary />} */}
                    {AvailabilityTypes(item.create_date, item.avail_percent)}
                  </Tooltip>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    )
});

export default BottomSec;



 