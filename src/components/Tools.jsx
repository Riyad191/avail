import React from "react";
import { Box, createTheme, Paper } from "@mui/material";
import SidebarComponent from "./SidebarComponent";
import ButtonsComponent from "./ButtonsComponent";
import FormComponent from "./FormComponent";
import CardsComponent from "./CardsComponent";
import ModalComponent from "./ModalComponent";
import { styled } from "@mui/material/styles";
import { ThemeProvider } from "@emotion/react";
import FooterComponent from "./FooterComponent";
import { grey } from "@mui/material/colors";

const StyledBox = styled(Box)(() => ({
  margin: "0 20px",
}));

const Tools = () => {
  const [showModal, setShowModal] = React.useState(false);
  const [mode, setMode] = React.useState(false);

  const darkTheme = createTheme({
    palette: {
      mode: mode ? "dark" : "light",
    },
  });
  return (
    <>
      <ThemeProvider theme={darkTheme}>
        <Paper
          sx={{
            height: "100vh",
            // border: "solid red 4px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexDirection: "column",
            background: "#F1F1F1",
          }}
          bgcolor={"backgroud.default"}
        >
          <SidebarComponent setMode={setMode} mode={mode} />
          <StyledBox>
            <ButtonsComponent />
            <FormComponent />
            <CardsComponent setShowModal={setShowModal} showModal={showModal} />
            {/* <ModalComponent
              mode={mode}
              setShowModal={setShowModal}
              showModal={showModal}
            /> */}
          </StyledBox>
          <FooterComponent />
        </Paper>
      </ThemeProvider>
    </>
  );
};

export default Tools;
