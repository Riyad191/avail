import React from "react";
import { DarkMode, LightMode } from "@mui/icons-material";
import darkModeLogo from "./Images/logo-dark-mode.png";
import lightModeLogo from "./Images/logo-light-mode.png";
import {
  AppBar,
  styled,
  Typography,
  Toolbar,
  Box,
  Badge,
  Avatar,
} from "@mui/material";
import { Mail, Notifications } from "@mui/icons-material";

const StyledToolbar = styled(Toolbar)({
  display: "flex",
  justifyContent: "space-between",
  width: "100%",
  // border: "solid white 2px",
});

const Icons = styled(Box)(({ theme }) => ({
  alignItems: "center",
  gap: 20,
}));

const Navebar = ({ mode, setMode }) => {
  return (
    <AppBar
      sx={{
        background: mode ? "black" : "rgb(23, 27, 72)",
        display: "flex",
        // justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        // border: "solid red 4px",
        height: "7%",
        // height: "70px",
        margin: 0,
      }}
      position="sticky"
    >
      <StyledToolbar>
        <Toolbar
          sx={{
            // border: "solid 1px white",
            width: "40%",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography
            sx={{
              marginBottom: "-5px",

              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            {mode ? (
              <img
                style={{
                  height: 36,
                  margin: 4,
                }}
                src={darkModeLogo}
                height="55"
              />
            ) : (
              <img
                src={lightModeLogo}
                style={{
                  height: 40,
                  margin: 4,
                }}
              />
            )}
            <Typography variant="h6">OSCS</Typography>
          </Typography>
          <Typography variant="subtitle1">Tools</Typography>
          <Typography variant="subtitle1">Data</Typography>
          <Typography variant="subtitle1">Infomartion</Typography>
          <Typography variant="subtitle1">Projects</Typography>
        </Toolbar>
        <Icons display="flex">
          <Badge>
            <Typography
              sx={{ cursor: "pointer" }}
              onClick={() => setMode(!mode)}
            >
              {mode ? <LightMode /> : <DarkMode />}
            </Typography>
          </Badge>
          <Badge badgeContent={4} color="error">
            <Mail />
          </Badge>
          <Badge badgeContent={4} color="error">
            <Notifications />
          </Badge>
          <Typography variant="span"> Hello Riyadh </Typography>
          <Avatar />
        </Icons>
      </StyledToolbar>
    </AppBar>
  );
};

export default Navebar;
