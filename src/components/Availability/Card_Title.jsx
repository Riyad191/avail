import React from "react";
import { CardTitle, Element, Title, Info } from "./styles";
import { useSelector } from "react-redux";
import { Tooltip } from "@mui/material";
import "./styles.css";
function Card_Title({ data }) {
  const recentFiveDays = useSelector((state) => state.pillarNameReducer.recentFiveDays);
  const charactersLimit = x => x.toString().length > 12 ? `${x.slice(0, 12)}...` : x;
  const firstTitleDate = recentFiveDays[0].slice(5)
  const lastTitleDate = recentFiveDays[recentFiveDays.length - 1].slice(5)
  return (
    <CardTitle direction="column">
      <Element> 
        <Tooltip title={`app name`} placement="top" followCursor><Title>{ data.app_name}</Title></Tooltip>
        <Tooltip title={`flow name`} placement="top" followCursor><Title>{ data.flow_name}</Title></Tooltip>
      </Element>
      <Element> 
        <Tooltip title={`service name`} placement="top" followCursor><Title>{data.service_name}</Title></Tooltip>
        {/* <Tooltip title={`last five days availability`} placement="top" followCursor><Title>last five days availability &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {lastTitleDate} - {firstTitleDate} </Title></Tooltip> */}
      </Element>
    </CardTitle>
  );
}



export default Card_Title;
