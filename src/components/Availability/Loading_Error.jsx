import React from "react";
import { Typography, Box } from "@mui/material";
import { useSelector } from "react-redux";

function Loading() {
  const loading = useSelector((state) => state.rootReducer.loading);
  const error = useSelector((state) => state.rootReducer.error);
  return (
    <Box>
      {loading && <Typography variant="h2" sx={{ color: "#730C00" }}>loading...</Typography>}
      {error && !loading && <Typography variant="h5" sx={{ color: "#730C00" }}>{error}</Typography>}
    </Box>
  );
}

export default Loading;
