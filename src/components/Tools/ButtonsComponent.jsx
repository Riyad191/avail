import * as React from "react";
import { Box, Button, Stack, styled, Typography } from "@mui/material";
import { Store, LocalShipping, Support, Storefront, Inventory, EmojiTransportation } from "@mui/icons-material";
import { StyledStack, StyledButton, IconTyopgraphy } from "./styles"
import FormComponent from "./FormComponent";
import { setPillarName } from "../../store/actionCreater";
import { useSelector, useDispatch  } from "react-redux";

const ButtonsComponent = () => {
  const disptach = useDispatch()
  const pillarName = useSelector(state => state.pillarNameReducer.pillarName)
  const [matchIndex, setMatchIndex] = React.useState(-1)
  const [showPillar, setShowPillar] = React.useState("Transportation")
  const [show, setShow] = React.useState(false)
  const foo = (i) => {
    setShowPillar(i)
    setShow(true)
  }
  const showDetails = (y,x) => {
    // matchIndex == x ? setMatchIndex(-1) : setMatchIndex(x);
    foo(y)
  }
  React.useEffect(()=>{
    // console.log("showPillar",showPillar)
    disptach(setPillarName(showPillar))
  },[showPillar])
  console.log("pillarName",pillarName)
  return (
    <Box sx={{ color: "#142A7C", width: "100%", margin: 0 }}>
      <StyledStack direction="row" spacing={2}>
        {pillars.map((pillar, idx) => {
          //  console.log("pillar---Name",pillar.name)
          return (
             <StyledButton onClick={()=> showDetails(pillar.name,idx)} style={{ background: pillar.name == pillarName && "#fff", color: pillar.name == pillarName && "#001051" }} key={idx} variant="outlined"> 
             {/* <StyledButton onClick={()=> showDetails(pillar.name,idx)} style={{ background:  matchIndex == idx && "white", color:  matchIndex == idx && "#001051"  }} key={idx} variant="outlined">  */}
              <IconTyopgraphy>{pillar.icon}</IconTyopgraphy>
              <Typography fontSize={14}> {pillar.name}</Typography>
              <Typography sx={{ width: 25 }}></Typography>
            </StyledButton>
          );
        })}
      </StyledStack>
      <FormComponent showPillar={showPillar} show={show} /> 
    </Box>
  );
};

const pillars = [
  { name: "Transportation", icon: <EmojiTransportation /> },
  { name: "Fulfillment", icon: <LocalShipping /> },
  { name: "Support", icon: <Support /> },
  { name: "Markectplace", icon: <Storefront /> },
  { name: "Item & Inventory", icon: <Inventory /> },
  { name: "Stores & Associates", icon: <Store /> },
  ,
];
export default ButtonsComponent;
