import React from "react";
import "../../styles/styles.css";
import { Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { StyledToolbar, NavToolbar, NavAppbar, LogoStack } from "./styles";

const Navebar = () => {
  const pillarName = useSelector((state) => state.pillarNameReducer.pillarName);
  return (
    <NavAppbar position="sticky">
      <StyledToolbar>
        <NavToolbar>
          <LogoStack direction="row"></LogoStack>
          <Link to={`/availability/${pillarName}`}>
            <Typography variant="subtitle1">Availability</Typography>
          </Link>
          <Typography variant="subtitle1">Data</Typography>
          <Typography variant="subtitle1">Infomartion</Typography>
          <Typography variant="subtitle1">Projects</Typography>
        </NavToolbar>
      </StyledToolbar>
    </NavAppbar>
  );
};

export default Navebar;
