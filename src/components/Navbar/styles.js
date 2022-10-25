import { AppBar, styled, Toolbar, Box, Stack } from "@mui/material";

export const StyledToolbar = styled(Toolbar)({
  display: "flex",
  justifyContent: "space-between",
  width: "100%",
});

export const Icons = styled(Box)(() => ({
  alignItems: "center",
  gap: 20,
}));

export const NavToolbar = styled(Toolbar)(() => ({
  width: "45%",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  margin: "0 0 5px -40px",
}));

export const NavAppbar = styled(AppBar)(() => ({
  background: "rgb(23, 27, 72)",
  display: "flex",
  alignItems: "center",
  width: "100%",
  height: "7%",
  margin: 0,
}));

export const LogoStack = styled(Stack)(() => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
}));
