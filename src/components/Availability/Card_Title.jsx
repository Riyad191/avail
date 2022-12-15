import React from "react";
import { CardTitle, Element, Title, Info } from "./styles";
import { cardTitle } from "./Services";
import { Tooltip } from "@mui/material";
import "./styles.css";
function Card_Title({ data }) {

  const charactersLimit = x => x.toString().length > 12 ? `${x.slice(0, 12)}...` : x;
  
  return (
    <CardTitle direction="column">
      <Element> 
        <Tooltip title={`${data.app_name}`} placement="top" followCursor><Title>{charactersLimit(data.app_name)}</Title></Tooltip>
        <Tooltip title={`${data.flow_name}`} placement="top" followCursor><Title>{charactersLimit(data.flow_name)}</Title></Tooltip>
      </Element>
      <Element> 
        <Tooltip title={`${data.service_name}`} placement="top" followCursor><Title>{charactersLimit(data.service_name)}</Title></Tooltip>
      </Element>
    </CardTitle>
  );
}



export default Card_Title;
