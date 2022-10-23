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
  height: 50,
  width: "16%",
  color: "#FFF",
  border: "solid 1px rgb(23, 27, 72)",
  background: "rgb(23, 27, 72)",
  display: "flex",
  justifyContent: "space-between",
  paddingRight: 3,

  alignItems: "center",
  "&:hover": {
    color: "rgb(23, 27, 72)",
  },
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
    <Box
      sx={{
        color: "#142A7C",
        width: "100%",
        margin: 0,
      }}
    >
      <StyledStack
        direction="row"
        spacing={2}
        sx={
          {
            // width: "100%",
          }
        }
      >
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
