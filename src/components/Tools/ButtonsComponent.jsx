import * as React from "react";
import { Box, Button, Stack, styled, Typography } from "@mui/material";
import { Store, LocalShipping, Support, Storefront, Inventory, EmojiTransportation } from "@mui/icons-material";
import { StyledStack, StyledButton, IconTyopgraphy } from "./styles"
import FormComponent from "./FormComponent";
import { setPillarName } from "../../store/actionCreater";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch  } from "react-redux";

const ButtonsComponent = () => {
  const navigate = useNavigate()
  const disptach = useDispatch()
  const pillarName = useSelector(state => state.pillarNameReducer.pillarName)
  const [showPillar, setShowPillar] = React.useState("Transportation")
  const [show, setShow] = React.useState(false)
  const foo = (i) => {
    setShowPillar(i)
    setShow(true)
  }
  const showDetails = (y) => {
    foo(y)
  }

  React.useEffect(()=>{ navigate('/availability/Transportation') },[])
 
  React.useEffect(()=>{
    disptach(setPillarName(showPillar))
  },[showPillar])
  return (
    <Box sx={{ color: "#142A7C", width: "100%", padding: "0 10px" }}>
      <StyledStack direction="row" spacing={2}>
        {pillars.map((pillar, idx) => {
          return (
            <Link key={idx} to={`/availability/${pillar.name}`} >
             <StyledButton onClick={()=> showDetails(pillar.name,idx)} style={{ background: pillar.name == pillarName && "#fff", color: pillar.name == pillarName && "#001051" }} key={idx} variant="outlined"> 
              <IconTyopgraphy>{pillar.icon}</IconTyopgraphy>
              <Typography fontSize={14}> {pillar.name}</Typography>
              <Typography sx={{ width: 25 }}></Typography>
            </StyledButton>
            </Link>
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
