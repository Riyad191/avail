import React from "react";
import { Stack, Typography } from "@mui/material";
import { FooterBox, LogoBox } from "./styles";
import footerLogo from "../../images/walmart-logo.png";
 


const Footer = () => {
  return (
    <FooterBox>
      <Stack direction="row" sx={{ justifyContent: "center", alignItems: "center" }}></Stack>
      <LogoBox>
        <img src={footerLogo} height="34" />
        <Typography variant="subtitle2">2022 Built by Omni Supply Chain System</Typography>
      </LogoBox>
    </FooterBox>
  );
};

export default Footer;
