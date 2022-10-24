import React, { useEffect } from "react";
import "./styles.css";
import { Typography } from "@mui/material";
import { ress, arrowColor } from "./Availability_Data_Processor";
import { ArrowBox, MainBox, DataCard, SectionBox, BoxFn, BoxKey, StackData} from "./styles";
import Availablitiy_Info from "./Availablitiy_Info";
import Availability_Cards_Title from "./Availability_Cards_Title";
import Loading_Error from "./Loading_Error";

const showItem = localStorage.getItem("showData");
const getLocalStoreage = () => showItem ? showItem : -1;

function Avail({ apps }) {
  const [show, setShow] = React.useState(getLocalStoreage());
  const showDetails = x => show == x ? setShow(-1) : setShow(x);

  useEffect(()=> localStorage.setItem("showData", show), [show])

  return (
    <MainBox className="fonts">
      <Loading_Error />
      {apps.map((a, i) => {
        return (
          <DataCard className="card" key={i} onClick={() => showDetails(i)}>
            <Availability_Cards_Title a={a} />
            <SectionBox>
              <StackData direction="row">
                {ress(a).map((a, i) => {
                  const xxx = arrowColor(a.value);
                  return (
                    <BoxFn key={i}>
                      <Typography sx={{ color: xxx.color, textAlign: "center"}}>{a.value}</Typography>
                      <ArrowBox bgcolor={xxx.color} sx={{ textAlign: "center"}}>{xxx.icon}</ArrowBox>
                    </BoxFn>
                  );
                })}
              </StackData>
              <BoxKey>{ress(a).map((a, i) => <h4 key={i}>{a.key}</h4>)}</BoxKey>
            </SectionBox>
            <Availablitiy_Info a={a} show={show} i={i} />
          </DataCard>
        );
      })}
    </MainBox>
  );
}

export default Avail;
