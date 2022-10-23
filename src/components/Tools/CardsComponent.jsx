import * as React from "react";
import { styled } from "@mui/material/styles";
import { Typography, Card, Box, Avatar, Stack, Modal } from "@mui/material";

const CardsComponent = ({ setShowModal }) => {
  let cards = [];
  for (let i = 0; i < 20; i++) {
    cards.push(i);
  }
  const CardsBox = styled(Box)(() => ({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap",
    // height: "40%",
    height: "600px",
    overflow: "auto",
    width: "100%",
    background: "#FFF",
    marginBottom: "10px",
    // border: "solid grey 2px",
    // boxShadow: "1px 1px 4px 3px #DADADA",
    borderRadius: "4px",
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
    width: "24%",
    height: 260,
    margin: 5,
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
    <CardsBox className="cardScrollbar">
      {cards.map((_, idx) => {
        return (
          <StyeldCard key={idx}>
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
  );
};

export default CardsComponent;
