import React from "react";
import { Box, Paper, styled } from "@mui/material";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Availability } from "./components";
import ButtonsComponent from "./components/Tools/ButtonsComponent";
import FormComponent from "./components/Tools/FormComponent";
import "./styles/styles.css";
import { useSelector, useDispatch  } from "react-redux";


const App = () => {
  // const pillarName = useSelector(state => state.pillarNameReducer.pillarName)
 const AppPaper = styled(Paper)(() => ({
    height: "100vh",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "column",
    background: "#F1F1F1",
    width: "100%",
  }));
  
  return (
    <BrowserRouter>
      <AppPaper bgcolor={"backgroud.default"}>
        <Navbar />
        <Box sx={{ width: "100%", padding: "10px 10px 0"}}>
          {/* <ButtonsComponent /> */}
          {/* <FormComponent /> */}
        </Box>
        <Routes>
         <Route path="/" element={<Navigate to={`/availability/Transportation`} />} />
         {/* <Route path="/" element={<Navigate to={`/availability/${pillarName}`} />} /> */}
          <Route exact path="/availability/:pillar" element={<Availability />} />
        </Routes>
        <Footer />
      </AppPaper>
    </BrowserRouter>
  );
};

export default App;
