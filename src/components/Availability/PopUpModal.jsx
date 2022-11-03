import React from "react";
import { Box, Modal, styled, Tooltip } from "@mui/material";
import { GreenBars } from "./styles";

const SytledModal = styled(Modal)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

const PopUpModel = ({data, matchIndex, index, openModal, setOpenModal, modalDates}) => {

  let arr = []
  for (let i = 0; i < 288; i++) {
     arr.push(i)
  }


  


  return (
    <>
      {matchIndex == index &&  <SytledModal
        open={openModal}
        onClose={(e) => setOpenModal(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{ cursor: "pointer" }}
        >
        <Box sx={{ 
            width: "98%",
            height: "60%",
            background: "#fff",
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
            flexWrap: "wrap",
            padding: "0 20px",
            borderRadius: "5px" }} >
            {modalDates.map((x,i) => {
                    const a = x.map(a => a.create_date)
                    console.log("kkkk obj",a)
                    console.log("modal dates",modalDates)
            return <Box key={i} >
                     <Tooltip title={`${a.slice(0,10)}(${a.slice(11,19)})`} arrow>
                     <GreenBars></GreenBars> 
                   </Tooltip>
            </Box>
            })}
        </Box>
      </SytledModal>}
    </>
  );
};


export default PopUpModel;
