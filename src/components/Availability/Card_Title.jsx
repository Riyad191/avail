import React from "react";
import { CardTitle, Element, Title, Info } from "./styles";
import { cardTitle } from "./Data_Processor";
import "./styles.css";
function Card_Title({ data }) {

  const charactersLimit = x => x.toString().length > 12 ? `${x.slice(0, 12)}...` : x;
  
  return (
    <CardTitle direction="row">
      <Element><Title>{cardTitle.appName}</Title><Info>{charactersLimit(data.app_name)}</Info></Element>
      <Element><Title>{cardTitle.flow}</Title><Info>{data.flow_name}</Info></Element>
      <Element><Title>{cardTitle.serviceName}</Title><Info>{charactersLimit(data.service_name)}</Info></Element>
    </CardTitle>
  );
}



export default Card_Title;
