import React from "react";
import { BoxInfo, BoxPercentage, BoxInfoSection} from "./styles";



function Availablitiy_Info({ data, show, index }) {
  return (
    // show == index && (
      <BoxInfo>
        <BoxInfoSection>
          {data.details.map((a, i) => <p key={i} className="bars" style={{ background: a == 2 ? "red" : "green"}}></p>)}
        </BoxInfoSection>
        <div className="day">{data.day}% uptime in last 24 hours</div>
        <BoxPercentage>
          <div className="info"><p>Available CPU</p><div className="info_percentage"><div className="span"></div> {data.availableCPU}%</div></div>
          <div className="line"></div>
          <div className="info"><p>Available Memory</p><div className="info_percentage"><div className="span"></div> {data.availableMemory}%</div></div>
          <div className="line"></div>
          <div className="info"><p>System Load</p><div className="info_percentage"><div className="span"></div> {data.systemLoad}%</div></div>
          <div className="line"></div>
          <div className="info"><p>Respone Time</p><div className="info_percentage"><div className="span"></div>{data.responeTime}%</div></div>
        </BoxPercentage>
      </BoxInfo>
    // )
  );
}

export default Availablitiy_Info;
