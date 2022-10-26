import React from "react";
import { Box, Modal, styled } from "@mui/material";
import { DataBars } from "./styles";

const SytledModal = styled(Modal)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

const Add = ({data, show, index, openModal, setOpenModal}) => {

  let arr = []
  for (let i = 0; i < 288; i++) {
     arr.push(i)
  }


  return (
    <>
      {show == index &&  <SytledModal
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
            {data.details.map((x,i) => {
            return <DataBars key={i} sx={{ background: +x !== 1 ? "#D12E3D" : "#187F0C"}}></DataBars>
            })}
            {/* {arr.map((_,i) => {
            return <Box key={i} bgcolor="green" m={.5} sx={{ height: "100px", borderRadius: "40px", width: '7px' }} ></Box>
            })} */}
        </Box>
      </SytledModal>}
    </>
  );
};

export default Add;
