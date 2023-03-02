import React from "react";
import { Stack, Typography } from "@mui/material";
import { FooterBox, LogoBox } from "./styles";

const Footer = () => {
  return (
    <FooterBox>
      <Stack
        direction="row"
        sx={{ justifyContent: "center", alignItems: "center" }}
      ></Stack>
      <LogoBox>
        <Typography variant="subtitle2">Availability Dashboard</Typography>
      </LogoBox>
    </FooterBox>
  );
};

export default Footer;
