import React from "react";
import { CardTitle, Element, Title, Info } from "./styles";
import { cardTitle } from "./Data_Processor";
import "./styles.css";
function Card_Title({ data }) {

  const charactersLimit = x => x.toString().length > 12 ? `${x.slice(0, 12)}...` : x;
  
  return (
    <CardTitle direction="row">
      <Element><Title>{cardTitle.appName}</Title><Info>{charactersLimit(data.appName)}</Info></Element>
      <Element><Title>{cardTitle.serviceName}</Title><Info>{data.Flow}</Info></Element>
      <Element><Title>{cardTitle.flow}</Title><Info>{charactersLimit(data.serviceName)}</Info></Element>
    </CardTitle>
  );
}



export default Card_Title;
