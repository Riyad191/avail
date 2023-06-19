import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Paper, styled } from "@mui/material";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import { Availability } from "./components";
import "./styles/styles.css";
 

const App = () => {
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
      <AppPaper>
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={<Navigate to={`/availability/Transportation`} />}
          />
          <Route
            exact
            path="/availability/:pillar"
            element={<Availability />}
          />
        </Routes>
        <Footer />
      </AppPaper>
    </BrowserRouter>
  );
};

export default App;
