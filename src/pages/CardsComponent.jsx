import * as React from "react";
import { styled } from "@mui/material/styles";
import { Typography, Card, Box, Avatar, Stack } from "@mui/material";

import "../App.css";

const CardsComponent = ({ setShowModal }) => {
  let cards = [];
  for (let i = 0; i < 200; i++) {
    cards.push(i);
  }
  const CardsBox = styled(Box)(() => ({
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    height: "590px",
    overflow: "auto",
  }));

  const StyeldStack = styled(Stack)(() => ({
    display: "flex",
    justifyContent: "space-between",
    height: "90%",
    alignItems: "flex-start",
    flexDirection: "column",
    width: "95%",
    border: "solid 1px #FFF2E4",
    borderRadius: 5,
    cursor: "pointer",
    padding: 10,
  }));

  const StyeldCard = styled(Card)(() => ({
    display: "flex",
    justifyContent: "space-between",
    padding: "10px 10px 15px  10px",
    alignItems: "center",
    flexDirection: "column",
    width: "18%",
    height: 300,
    margin: 10,
  }));

  const StyledParentBox = styled(Box)(() => ({
    width: "100%",
    display: "flex",
    justifyContent: "space-around",
    height: "100%",
    flexDirection: "column",
    alignItems: "center",
  }));

  const UserInfo = styled(Box)(() => ({
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
    flexDirection: "column",
  }));

  const StyledAvatar = styled(Avatar)(() => ({
    marginBottom: 10,
    width: 60,
    height: 60,
  }));

  return (
    <>
      <CardsBox className="cardScrollbar">
        {cards.map(() => {
          return (
            <StyeldCard>
              <StyledParentBox>
                <Box sx={{ width: "100%", textDecoration: "left" }}>
                  <Typography variant="h5">Tool</Typography>
                </Box>
                <StyeldStack onClick={() => setShowModal(true)}>
                  <Stack
                    sx={{
                      justifyContent: "space-between",
                      width: "100%",
                    }}
                    direction="row"
                  >
                    <UserInfo>
                      <StyledAvatar src="" />
                      <Typography variant="6">Manager Name</Typography>
                    </UserInfo>
                    <Typography color="#0086AA">Fulfillment</Typography>
                  </Stack>
                  <Box>
                    <Typography variant="h6">Product</Typography>
                  </Box>
                </StyeldStack>
              </StyledParentBox>
            </StyeldCard>
          );
        })}
      </CardsBox>
    </>
  );
};

export default CardsComponent;
