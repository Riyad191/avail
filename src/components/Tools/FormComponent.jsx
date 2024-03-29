import * as React from "react";
import { setFlowNameData, setAppNameData, seAvailabilityDateFrom, seAvailabilityDateTo } from "../../store/actionCreater";
import { TextField, Box, Typography, Autocomplete, styled, Tooltip } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

const FormComponent = () => {
  const dispatch = useDispatch();
  const todaysAvailability = useSelector((state) => state.pillarNameReducer.todaysAvailability);
  const searchFlowName = useSelector((state) => state.pillarNameReducer.filterFlowName);
  const cardTitleData = useSelector((state) => state.pillarNameReducer.cardTitleData);
  const searchAppName = useSelector((state) => state.pillarNameReducer.filterAppName);
  const mainData = useSelector((state) => state.pillarNameReducer.mainData);
  const appsNum = useSelector((state) => state.pillarNameReducer.appsNum);

  const AvailbilityPercentageBox = styled(Box)(() => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border: "solid #cecece 1px",
    padding: "0 10px",
    background: "#fff",
    borderRadius: "5px",
    width: "20%",
  }));

  return (
    <>
      <Box
        component="form"
        noValidate
        autoComplete="off"
        sx={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          padding: "9px 0",
          justifyContent: "space-between",
          borderRadius: 1,
        }}
      >
        <Box
          sx={{
            width: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
          }}
        >
          <Tooltip title={`search by app name`} placement="top" followCursor>
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={ mainData.length == 0 ? ["No Applications"].map((a) => a) : [...new Set(cardTitleData.map((a) => a.app_name))] }
              sx={{ marginRight: 1, width: 300 }}
              onChange={(e, newVal) => dispatch(setAppNameData(newVal === null ? "" : newVal))}
              value={searchAppName}
              renderInput={(params) => <TextField {...params} label="App Name" size="small" /> }
            />
          </Tooltip>
          <Tooltip title={`search by service name`} placement="top" followCursor>
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={ mainData.length == 0 ? ["No Services"].map((a) => a) : [...new Set(cardTitleData.map((a) => a.service_name))] }
              sx={{ marginRight: 1, width: 300 }}
              onChange={(e, newVal) => dispatch(setFlowNameData(newVal === null ? "" : newVal))}
              value={searchFlowName}
              renderInput={(params) => <TextField {...params} label="Service Name" size="small" /> }
            />
          </Tooltip>
          From:&nbsp;&nbsp;
          <Tooltip title={``} placement="top" followCursor>
            <TextField
              onChange={(e) => dispatch(seAvailabilityDateFrom(e.target.value))}
              id="outlined-basic"
              variant="outlined"
              size="small"
              type="date"
              sx={{ marginRight: 1, width: 300 }}
            />
          </Tooltip>
          To:&nbsp;&nbsp;
          <Tooltip title={``} placement="top" followCursor>
            <TextField
              onChange={(e) => dispatch(seAvailabilityDateTo(e.target.value))}
              id="outlined-basic"
              variant="outlined"
              size="small"
              type="date"
              sx={{ width: 300 }}
            />
          </Tooltip>
        </Box>
        <AvailbilityPercentageBox>
          <Box
            sx={{
              borderRadius: "3px",
              height: 40,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography>
              <span style={{ color: "#4d4d4d" }}>Overall Availability:</span>
              &nbsp;{" "}
              {todaysAvailability > 1 ? `${todaysAvailability.toPrecision(3)}` : "0.00"}
              % &nbsp;{" "}
              <span style={{ color: "#4d4d4d" }}> ({appsNum} apps)</span>
            </Typography>
          </Box>
        </AvailbilityPercentageBox>
      </Box>
    </>
  );
};

export default FormComponent;
