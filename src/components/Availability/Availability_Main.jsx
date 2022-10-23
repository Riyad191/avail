import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { GET_USERS } from "../../store/actions";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Ava from "./Availability";
import styled from "@emotion/styled";
import ButtonsComponent from "../Tools/ButtonsComponent";
import FormComponent from "../Tools/FormComponent";

export default function LabTabs() {
  const dispatch = useDispatch();
  const avaData = useSelector((state) => state.rootReducer.stateUsers);

  const [value, setValue] = React.useState("1");
  const [apps, setApps] = useState([]);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    dispatch({ type: GET_USERS });
  }, [dispatch]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const bbData = (x, y) => {
    const aaa = avaData
      .map((a) => Object.values(a))
      .splice(x, y)
      .flat(Infinity);
    setApps(aaa);
    return aaa;
  };

  console.log("open", open);

  useEffect(() => {
    !open ? bbData(0, 1) : bbData(1, 2);
  }, [open, avaData]);

  console.log("avaData", avaData);
  console.log("apps", apps);

  const AvailabilityTabPanel = styled(TabPanel)(() => ({
    background: "#D7D7D7",
    borderRadius: "10px",
    margin: "70px 20px 50px",
  }));
  return (
    <Box
      sx={{
        width: "100%",
        typography: "body1",
        height: "100%",
        overflow: "auto",
      }}
    >
      {/* <TabContext value={value}>
        <Box
          sx={{
            borderBottom: 1,
            borderColor: "divider",
            // position: "fixed",
            background: "#FFF",
            width: "100%",
            marginBottom: "20px",
          }}
        >
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab
              onClick={() => setOpen(false)}
              label="Availability Status"
              value="1"
              bgcolor="blue"
            />
            <Tab onClick={() => setOpen(true)} label="Error Status" value="2" />
          </TabList>
        </Box>

        <AvailabilityTabPanel value="1">
          <Ava apps={apps} open={open} />
        </AvailabilityTabPanel>
        <AvailabilityTabPanel value="2">
        </AvailabilityTabPanel>
      </TabContext> */}

      <Box
        sx={{
          overflow: "auto",
          height: "98.70%",
          background: "#FFF",
          margin: "0 10px",
          borderRadius: 1,
          border: "#CFCFCF solid 1px",
          // boxShadow: "2px 2px 8px 2px #BDBDBD",
        }}
      >
        <Ava apps={apps} open={open} />
      </Box>
    </Box>
  );
}
