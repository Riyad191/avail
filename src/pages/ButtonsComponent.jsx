import * as React from "react";
import { Box, Button, Stack, styled, Typography } from "@mui/material";
import {
  Store,
  LocalShipping,
  Support,
  Storefront,
  Inventory,
  EmojiTransportation,
  Star,
} from "@mui/icons-material";

const StyledButton = styled(Button)({
  height: 60,
  width: "16%",
  color: "#0287AB",
  border: "solid 1px #0287AB",
  display: "flex",
  justifyContent: "center",
  paddingRight: 3,
  alignItems: "center",
});

const IconTyopgraphy = styled(Typography)({
  margin: "5px 10px 0 0",
});

const StyledStack = styled(Stack)({
  justifyContent: "space-between",
  width: "100%",
});

const ButtonsComponent = () => {
  return (
    <>
      <Box sx={{ color: "#142A7C" }}>
        <StyledStack direction="row" spacing={2}>
          {pillars.map((pillar) => {
            return (
              <StyledButton variant="outlined">
                <IconTyopgraphy>{pillar.icon}</IconTyopgraphy>
                <Typography fontSize={14}> {pillar.name}</Typography>
                <Typography></Typography>
              </StyledButton>
            );
          })}
        </StyledStack>
      </Box>
    </>
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
