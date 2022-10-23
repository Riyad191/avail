import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { GET_USERS } from "./store/actions";
import { Box, Paper } from "@mui/material";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Tools, Availability } from "./components";
import "./styles/styles.css";
import ButtonsComponent from "./components/Tools/ButtonsComponent";
import FormComponent from "./components/Tools/FormComponent";
import AvailabilityDrawer from "./components/Availability/Availability_Main";

const App = () => {
  const dispatch = useDispatch();
  const availabilityRawData = useSelector(
    (state) => state.rootReducer.stateUsers
  );
  const loading = useSelector((state) => state.rootReducer.loading);
  const error = useSelector((state) => state.rootReducer.error);

  useEffect(() => {
    dispatch({ type: GET_USERS });
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Paper
        sx={{
          height: "100vh",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexDirection: "column",
          background: "#F1F1F1",
          width: "100%",
          // border: "solid 1px red",
        }}
        bgcolor={"backgroud.default"}
      >
        <Navbar />
        <Box
          sx={{
            width: "100%",
            padding: "10px 10px 0",
          }}
        >
          <ButtonsComponent />
          <FormComponent />
        </Box>

        <Routes>
          <Route exact path="/" element={<Tools />} />
          <Route path="/availability" element={<Availability />} />
        </Routes>

        <Footer />
      </Paper>
    </BrowserRouter>
  );
};

export default App;
