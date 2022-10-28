import React from "react";
import { CardTitle, Element, Title, Title_1  } from "./styles";
import { cardTitle } from "./Data_Processor";
import "./styles.css";
function Card_Title({ data }) {

  const charactersLimit = x => x.toString().length > 12 ? `${x.slice(0, 16)}...` : x;
  
  return (
    <CardTitle direction="row">
      <Element> <Title>{charactersLimit(data.app_name)}</Title></Element>
      <Element> <Title>{charactersLimit(data.service_name)}</Title></Element>
      <Element> <Title_1>{data.flow_name}</Title_1></Element>
    </CardTitle>
  );
}



export default Card_Title;
