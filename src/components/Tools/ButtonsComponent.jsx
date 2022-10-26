import * as React from "react";
import { Box, Button, Stack, styled, Typography } from "@mui/material";
import { Store, LocalShipping, Support, Storefront, Inventory, EmojiTransportation } from "@mui/icons-material";
import { StyledStack, StyledButton, IconTyopgraphy } from "./styles"

const ButtonsComponent = () => {
  return (
    <Box sx={{ color: "#142A7C", width: "100%", margin: 0 }}>
      <StyledStack direction="row" spacing={2}>
        {pillars.map((pillar, idx) => {
          return (
            <StyledButton key={idx} variant="outlined">
              <IconTyopgraphy>{pillar.icon}</IconTyopgraphy>
              <Typography fontSize={14}> {pillar.name}</Typography>
              <Typography sx={{ width: 25 }}></Typography>
            </StyledButton>
          );
        })}
      </StyledStack>
    </Box>
  );
};

const pillars = [
  { name: "Fulfillment", icon: <LocalShipping /> },
  { name: "Support", icon: <Support /> },
  { name: "Markectplace", icon: <Storefront /> },
  { name: "Item & Inventory", icon: <Inventory /> },
  { name: "Transportation", icon: <EmojiTransportation /> },
  { name: "Stores & Associates", icon: <Store /> },
  ,
];
export default ButtonsComponent;
