import React from "react";
import AddIcon from "@mui/icons-material/Add";
import {
  Fab,
  Modal,
  Tooltip,
  Box,
  Typography,
  Avatar,
  TextField,
  Stack,
  Button,
  ButtonGroup,
} from "@mui/material";
import styled from "@emotion/styled";
import {
  EmojiEmotions,
  PersonAdd,
  Image,
  VideoCameraBack,
  DateRange,
} from "@mui/icons-material";

const StyledModal = styled(Modal)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

const UserBox = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: "10px",
  marginBottom: "20px",
});

const Add = () => {
  const [open, setOpen] = React.useState(false);
  return (
    <>
      <Tooltip
        onClick={(e) => setOpen(true)}
        title="Delete"
        sx={{
          position: "fixed",
          bottom: 20,
          left: { xs: "calc(50% - 25px)", md: 30 },
        }}
      >
        <Fab color="primary" aria-label="add">
          <AddIcon />
        </Fab>
      </Tooltip>
      <StyledModal
        open={open}
        onClose={(e) => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          width={400}
          height={280}
          p={3}
          borderRadius={5}
          bgcolor={"background.default"}
          color={"text.primary"}
        >
          <Typography variant="h6" color="gray" textAlign="center">
            Create Post
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

export default Add;
