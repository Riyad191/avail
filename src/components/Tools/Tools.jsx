import React from "react";
import { Box, createTheme } from "@mui/material";

import CardsComponent from "./CardsComponent";

import { styled } from "@mui/material/styles";

const StyledBox = styled(Box)(() => ({
  margin: "0 20px",
}));

const Tools = () => {
  const [showModal, setShowModal] = React.useState(false);

  return (
    <StyledBox>
      <CardsComponent setShowModal={setShowModal} showModal={showModal} />
      {/* <ModalComponent
              mode={mode}
              setShowModal={setShowModal}
              showModal={showModal}
            /> */}
    </StyledBox>
  );
};

export default Tools;
