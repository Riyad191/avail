import React from "react";
import { Stack, Typography } from "@mui/material";

import lightModeLogo from "./Images/logo-light-mode.png";
import { styled, Box } from "@mui/material";

export const FooterBox = styled(Box)(() => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  height: "6%",
  width: "100%",
  background: "rgb(23, 27, 72)",
  color: "white",
  padding: "0 6px",
}));

export const LogoBox = styled(Box)(() => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const Footer = () => {
  return (
    <FooterBox>
      <Stack
        direction="row"
        sx={{ justifyContent: "center", alignItems: "center" }}
      ></Stack>
      <LogoBox>
        <img src={lightModeLogo} height="34" />
        {/* &nbsp; */}
        <Typography variant="subtitle2">
          2022 Built by Omni Supply Chain System
        </Typography>
      </LogoBox>
    </FooterBox>
  );
};

export default Footer;
