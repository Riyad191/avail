import React from "react";
import { BoxInfo, BoxPercentage, BoxInfoSection} from "./styles";



function Availablitiy_Info({ a, show, i }) {
  return (
    show == i && (
      <BoxInfo>
        <BoxInfoSection>
          {a.details.map((a, i) => <p key={i} className="bars" style={{ background: a == 2 ? "red" : "green"}}></p>)}
        </BoxInfoSection>
        <div className="day">{a.day}% uptime in last 24 hours</div>
        <BoxPercentage>
          <div className="info"><p>Available CPU</p><div className="info_percentage"><div className="span"></div> {a.availableCPU}%</div></div>
          <div className="line"></div>
          <div className="info"><p>Available Memory</p><div className="info_percentage"><div className="span"></div> {a.availableMemory}%</div></div>
          <div className="line"></div>
          <div className="info"><p>System Load</p><div className="info_percentage"><div className="span"></div> {a.systemLoad}%</div></div>
          <div className="line"></div>
          <div className="info"><p>Respone Time</p><div className="info_percentage"><div className="span"></div>{a.responeTime}%</div></div>
        </BoxPercentage>
      </BoxInfo>
    )
  );
}

export default Availablitiy_Info;
