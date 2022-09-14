import React from "react";
import { Box, createTheme, Paper } from "@mui/material";
import SidebarComponent from "./SidebarComponent";
import ButtonsComponent from "./ButtonsComponent";
import FormComponent from "./FormComponent";
import CardsComponent from "./CardsComponent";
import ModalComponent from "./ModalComponent";
import { styled } from "@mui/material/styles";
import { ThemeProvider } from "@emotion/react";

const StyledBox = styled(Box)(() => ({
  margin: 30,
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
        <Paper sx={{ height: "100vh" }} bgcolor={"backgroud.default"}>
          <SidebarComponent setMode={setMode} mode={mode} />
          <StyledBox>
            <ButtonsComponent />
            <FormComponent />
            <CardsComponent setShowModal={setShowModal} />
            <ModalComponent
              mode={mode}
              setShowModal={setShowModal}
              showModal={showModal}
            />
          </StyledBox>
        </Paper>
      </ThemeProvider>
    </>
  );
};

export default Tools;
