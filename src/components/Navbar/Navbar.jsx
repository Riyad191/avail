import React from "react";
import navbarLogo from "../../images/walmart-logo.png";
import "../../styles/styles.css";
import { Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { StyledToolbar, NavToolbar, NavAppbar, LogoStack } from "./styles";

const Navebar = () => {
  const pillarName = useSelector((state) => state.pillarNameReducer.pillarName);
  console.log("nav pillar",pillarName)
  return (
    <NavAppbar position="sticky">
      <StyledToolbar>
        <NavToolbar>
          <LogoStack direction="row">
            <img src={navbarLogo} style={{ height: 40, margin: 4 }}/><Typography variant="h6">OSCS</Typography>
          </LogoStack>
          <Link to={`/availability/${pillarName}`}><Typography variant="subtitle1">Availability</Typography></Link>
          <Typography variant="subtitle1">Data</Typography>
          <Typography variant="subtitle1">Infomartion</Typography>
          <Typography variant="subtitle1">Projects</Typography>
        </NavToolbar>
      </StyledToolbar>
    </NavAppbar>
  );
};

export default Navebar;
