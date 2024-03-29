import React from "react";
import { AvailabilityTypes } from "./Services";
import { Typography, Box, Modal, Stack, Tooltip, styled } from "@mui/material";
import { useState } from "react";
import { PopUpButton } from "./styles";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

const SytledModal = styled(Modal)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

const PopUpModel = ({
  show,
  modalAppNameVar,
  modalFlowNameVar,
  openModal,
  setOpenModal,
  newAveraveData,
  modalBoxPercentage,
  dataArrowsAndColors,
  modalDate,
}) => {
  const [firstTwelveHoursAvailability, setFirstTwelveHoursAvailability] =
    useState(0);
  const [lastTwelveHoursAvailability, setLastTwelveHoursAvailability] =
    useState(144);
  const [time, setTime] = useState(false);
  const twelveHoursAvailability = (x, y) => {
    setFirstTwelveHoursAvailability(x);
    setLastTwelveHoursAvailability(y);
  };

  return (
    <>
      {show && (
        <SytledModal
          open={openModal}
          onClose={(e) => setOpenModal(false)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          sx={{ cursor: "pointer" }}
        >
          <Box
            sx={{
              width: "98%",
              height: "40%",
              background: "#fff",
              padding: "0 20px",
              borderRadius: "5px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <Stack
              direction="row"
              sx={{
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
              }}
            >
              <h3>{`${modalAppNameVar.toUpperCase()} | ${modalFlowNameVar.toUpperCase()}`}</h3>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginRight: "80px",
                }}
              >
                <h2 style={{ fontSize: 20 }}>Availability on </h2>
                &nbsp;&nbsp;&nbsp;
                <h2 style={{ color: "blue" }}>{modalDate} (UTC)</h2>
              </div>
              <h3
                title="hiiii"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  background: "#eeeeee",
                  padding: "5px 10px 5px 5px",
                  borderRadius: "3px",
                  border: `solid 1px ${
                    dataArrowsAndColors(modalBoxPercentage).color
                  }`,
                  color: dataArrowsAndColors(modalBoxPercentage).color,
                }}
              >
                {" "}
                <span
                  style={{
                    fontSize: "25px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  {dataArrowsAndColors(modalBoxPercentage).icon}
                </span>{" "}
                {modalBoxPercentage}%
              </h3>
            </Stack>
            <br />
            <br />
            <Box />

            <Box
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "space-around",
                alignItems: "center",
              }}
            >
              {newAveraveData.slice(0, 144).map((item, i) => {
                return (
                  <Box key={i}>
                    <Tooltip
                      title={
                        item.create_date == "no data available" ? (
                          <Typography sx={{ fontSize: "12px" }}>
                            no data available
                          </Typography>
                        ) : (
                          <Typography sx={{ fontSize: "12px" }}>
                            {" "}
                            Date: {`${item.create_date.slice(0, 10)}`}, Time:{" "}
                            {`${item.create_date.slice(12, 19)}`}, Availability:{" "}
                            {`${
                              item.avail_percent === null
                                ? 0
                                : item.avail_percent.toPrecision(3)
                            }%`}
                          </Typography>
                        )
                      }
                      arrow
                    >
                      {AvailabilityTypes(item.create_date, item.avail_percent)}
                    </Tooltip>
                  </Box>
                );
              })}
            </Box>
            <br />
            <br />
            <br />
            <Box
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "space-around",
                alignItems: "center",
              }}
            >
              <br />
              {newAveraveData.slice(144).map((item, i) => {
                return (
                  <Box key={i}>
                    <Tooltip
                      title={
                        item.create_date == "no data available" ? (
                          <Typography sx={{ fontSize: "12px" }}>
                            no data available
                          </Typography>
                        ) : (
                          <Typography sx={{ fontSize: "12px" }}>
                            {" "}
                            Date: {`${item.create_date.slice(0, 10)}`}, Time:{" "}
                            {`${item.create_date.slice(12, 19)}`}, Availability:{" "}
                            {`${item.avail_percent.toPrecision(3)}%`}{" "}
                          </Typography>
                        )
                      }
                      arrow
                    >
                      {AvailabilityTypes(item.create_date, item.avail_percent)}
                    </Tooltip>
                  </Box>
                );
              })}
            </Box>
          </Box>
        </SytledModal>
      )}
    </>
  );
};

export default PopUpModel;
