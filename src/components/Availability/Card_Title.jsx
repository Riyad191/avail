import React from "react";
import { CardTitle, Element, Title, Info } from "./styles";
import { cardTitle } from "./Data_Processor";
import { Tooltip } from "@mui/material";
import "./styles.css";
function Card_Title({ data }) {

  // console.log("data",data)

  const charactersLimit = x => x.toString().length > 12 ? `${x.slice(0, 12)}...` : x;
  
  return (
    <CardTitle direction="row">
      <Element><Title>{cardTitle.appName}</Title><Tooltip title={`${data.app_name}`} placement="top" followCursor><Info>{charactersLimit(data.app_name)}</Info></Tooltip></Element>
      <Element><Title>{cardTitle.flowName}</Title><Tooltip title={`${data.flow_name}`} placement="top" followCursor><Info>{charactersLimit(data.flow_name)}</Info></Tooltip></Element>
      <Element><Title>{cardTitle.serviceName}</Title><Tooltip title={`${data.service_name}`} placement="top" followCursor><Info>{charactersLimit(data.service_name)}</Info></Tooltip></Element>
    </CardTitle>
  );
}



export default Card_Title;
