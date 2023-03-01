import { Button, Stack, styled, Typography } from "@mui/material";

export const StyledButton = styled(Button)({
  height: 50,
  width: "230px",
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

export const IconTyopgraphy = styled(Typography)({
  margin: "5px 10px 0 0",
});

export const StyledStack = styled(Stack)({
  justifyContent: "space-between",
  width: "100%",
});
