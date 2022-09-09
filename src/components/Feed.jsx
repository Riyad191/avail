import React from "react";
import { Box } from "@mui/material";
import Post from "./Post";
const arr = [1, 2, 3, 4, 5];
const Feed = () => {
  return (
    <Box flex={4} p={2}>
      {arr.map((i) => (
        <Post key={i} />
      ))}
    </Box>
  );
};

export default Feed;
