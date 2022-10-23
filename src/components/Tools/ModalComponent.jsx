import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import {
  Typography,
  Button,
  Stack,
  TextField,
  Modal,
  ButtonGroup,
  Avatar,
} from "@mui/material";
import {
  EmojiEmotions,
  PersonAdd,
  Image,
  VideoCameraBack,
  DateRange,
} from "@mui/icons-material";

const StyledModal = styled(Modal)(() => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
}));

const UserBox = styled(Box)(() => ({
  display: "flex",
  alignItems: "center",
  gap: "10px",
  height: 400,
  marginBottom: "20px",
}));

const ModalComponent = ({ setShowModal, showModal, mode }) => {
  console.log("card", mode);
  return (
    <>
      <StyledModal
        bgcolor={"background.default"}
        open={showModal}
        onClose={() => setShowModal(false)}
      >
        <Box
          width={1200}
          height={700}
          p={3}
          borderRadius={5}
          sx={{ background: mode ? "#252525" : "white" }}
        >
          <Typography variant="h1" color="gray" textAlign="center">
            Tool Information
          </Typography>
          <UserBox>
            <Avatar />
            <Typography>Name</Typography>
          </UserBox>
          <TextField
            sx={{
              width: "100%",
            }}
            id="standard-multiline-static"
            multiline
            rows={2}
            placeholder="What is in your mind ?"
            variant="standard"
          />
          <Stack direction="row" gap={1} mt={1} mb={2}>
            <EmojiEmotions color="success" />
            <VideoCameraBack color="secondary" />
            <PersonAdd color="error" />
            <Image color="primary" />
          </Stack>
          <ButtonGroup
            variant="contained"
            aria-label="outlined primary button group"
            fullWidth
          >
            <Button>Post</Button>
            <Button sx={{ width: "100px" }}>
              <DateRange />
            </Button>
          </ButtonGroup>
        </Box>
      </StyledModal>
    </>
  );
};

export default ModalComponent;
