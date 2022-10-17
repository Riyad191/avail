import { CardHeader } from "@material-ui/core";
import { CardContent } from "@material-ui/core";
import {
  filterDataByParams,
  getActiveFilterLabel,
  getxAxisKeys,
} from "./availability-data-processor";

import {
  Box,
  Card,
  Stack,
  Typography,
  Tab,
  TextField,
  Grid,
  Modal,
  Autocomplete,
} from "@mui/material";
import { ColumnChart } from "../../common/charts/column-chart";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import React, { useEffect, useState } from "react";

import styled from "@emotion/styled";
import { useDispatch, useSelector } from "react-redux";
import { AVAILABILITY_FETCH, DOWNLOAD_FILE } from "./availability-store";
import { useAvailabilityDataParser } from "./useAvailabilityDataParser";
import "./styles.css";

import { AiOutlineArrowUp } from "react-icons/ai";
import { AiOutlineArrowDown } from "react-icons/ai";
import { BsArrowDownUp } from "react-icons/bs";

const buildCsiiTableOptions = (dispatch, data, reportName) => {
  return {
    onDownload: () => {
      dispatch({ type: DOWNLOAD_FILE, data: data, reportName: reportName });
      return false;
    },
    rowsPerPage: data?.length ?? 0,
  };
};

const initialFilterParams = {
  dataKey: null,
  seriesIndex: -1,
  reportName: null,
};

export const Availability = () => {
  const dispatch = useDispatch();
  const availabilityRawData = useSelector(
    (state) => state.availabilityCSIS.data
  );
  console.log("availability Raw Data ###############", availabilityRawData);
  const [filterParams, setFilterParams] = useState(initialFilterParams);
  const [filteredData, setFilteredData] = useState({
    availability: [],
    error: [],
  });
  const [search11, setSearch11] = useState("");
  const [search1, setSearch1] = useState("");
  const [search2, setSearch2] = useState("");
  const [tableTitle, setTableTitle] = useState(null);

  const [
    availabilityColumns,
    availabilityData,
    availabilityChart,
    setAvailRawData,
  ] = useAvailabilityDataParser("availability");

  const [errorColumns, errorData, errorChart, setErrorRawData] =
    useAvailabilityDataParser("error");

  useEffect(() => {
    dispatch({ type: AVAILABILITY_FETCH });
  }, [dispatch]);

  useEffect(() => {
    if (availabilityRawData?.length > 0)
      setAvailRawData(availabilityRawData[0]);
    if (availabilityRawData?.length > 1)
      setErrorRawData(availabilityRawData[1]);
  }, [availabilityRawData, setAvailRawData, setErrorRawData]);

  useEffect(() => {
    if (filterParams.reportName != null)
      setTableTitle(
        filterParams.dataKey + " (" + getActiveFilterLabel(filterParams) + ")"
      );
    else setTableTitle(null);
  }, [filterParams]);

  const handleChartClick = (filterParams) => {
    if (filterParams.seriesIndex !== -1 && filterParams.dataKey != null)
      setFilterParams(filterParams);
    else setFilterParams({ ...filterParams, reportName: null });
  };

  useEffect(() => {
    if (
      filterParams.reportName != null &&
      filterParams.seriesIndex !== -1 &&
      filterParams.dataKey != null
    ) {
      setFilteredData({
        availability: filterDataByParams(availabilityData, filterParams),
        error: filterDataByParams(errorData, filterParams),
      });
    } else
      setFilteredData({ availability: availabilityData, error: errorData });
  }, [availabilityData, errorData, filterParams]);

  console.log("availabilityColumns", availabilityColumns);
  console.log("errorColumns", errorColumns);

  const obj = filteredData.availability;
  const err = filteredData.error;
  console.log("availiblity ========================", obj);
  console.log("error ========================", err);

  const arrowColor = (availValue) => {
    if (availValue > 99.95) {
      return "#178100";
    } else if (availValue < 99.0) {
      return "#D60000 ";
    } else {
      return "#D3B300";
    }
  };

  const arrowColorError = (availValue) => {
    if (availValue == 0) {
      return "#178100";
    } else if (availValue > 0.5) {
      return "#D60000 ";
    } else {
      return "#D3B300";
    }
  };

  const arrowIcon = (availValue) => {
    if (availValue > 99.95) {
      return <AiOutlineArrowUp />;
    } else if (availValue < 99.0) {
      return <AiOutlineArrowDown />;
    } else {
      return <BsArrowDownUp />;
    }
  };
  const arrowIconError = (availValue) => {
    if (availValue == 0) {
      return <AiOutlineArrowUp />;
    } else if (availValue > 0.5) {
      return <AiOutlineArrowDown />;
    } else {
      return <BsArrowDownUp />;
    }
  };

  const lettersLimit = (x) => {
    return x.toString().length > 12 ? `${x.slice(0, 12)}...` : x;
  };

  const MainBox = styled(Box)(() => ({
    margin: " 10px",
    // display: "flex",
    // justifyContent: "center",
    // alignItems: "center",
    background: "#FFF",
  }));
  const MainBoxx = styled(Box)(() => ({
    // boxShadow: "0px 2px 12px 2px #D8D8D8",
    // padding: "80px",
    border: "solid #EAEAEA 1px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap",
    width: "100%",
    height: "100%",
    background: "#EAEAEA",
    borderRadius: 5,
  }));
  const MainCard = styled(Card)(() => ({
    boxShadow: "2px 2px 6px 2px #D8D8D8",
    width: "32%",
    margin: 8,
    borderRadius: 5,
    padding: 5,
  }));

  const TopStack = styled(Stack)(() => ({
    borderButtom: "solid gray 1px",
    width: "100%",
    height: "40%",
    display: "flex",
    justifyContent: "",
    alignItems: "center",
    textAlign: "center",
    marginBottom: "5px",
  }));
  const BottomStack = styled(Stack)(() => ({
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "5px",
    width: "100%",
    height: "60%",
    background: "#D8D8D8",
    borderRadius: "5px",
  }));
  const DataBox = styled(Box)(() => ({
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  }));
  const ArrowBox = styled(Box)(() => ({
    height: 40,
    width: 40,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "white",
    borderRadius: 5,
    martgin: "9px 0",
    fontSize: "30px",
  }));

  const aaa = (a) => {
    return (
      <table>
        <tr>
          <th>App Name</th>
          <th>Flow</th>
          <th>Service Name</th>
        </tr>
        <tr>
          <td>{lettersLimit(a.appName)}</td>
          <td>{a.Flow}</td>
          <td>{lettersLimit(a.serviceName)}</td>
        </tr>
      </table>
    );
  };

  const [value, setValue] = React.useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [open, setOpen] = useState(false);

  const searchFn = (rows) => {
    return rows.filter((row) => {
      const columns = rows[0] && Object.keys(rows[0]);
      return columns.some(
        (column) =>
          row[column].toString().toLowerCase().indexOf(search1.toLowerCase()) >
          -1
      );
    });
  };
  const searchData = searchFn(filteredData.availability);
  return (
    <Box style={{ margin: "24px" }}>
      <Grid container spacing={2}>
        <Grid item lg={6}>
          <Card style={{ width: "100%" }}>
            <CardHeader title="Availability Status" />
            <CardContent>
              <ColumnChart
                handleChartClick={(filterParams) =>
                  handleChartClick({
                    ...filterParams,
                    reportName: "availability",
                  })
                }
                data={availabilityChart}
                xaxis={getxAxisKeys(availabilityData)}
              />
            </CardContent>
          </Card>
        </Grid>
        <Grid item lg={6}>
          <Card style={{ width: "100%", height: "100%" }}>
            <CardHeader title="Error Status" />
            <CardContent>
              <ColumnChart
                handleChartClick={(filterParams) =>
                  handleChartClick({ ...filterParams, reportName: "error" })
                }
                data={errorChart}
                xaxis={getxAxisKeys(errorData)}
              />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <MainBox>
        <Box sx={{ width: "100%", typography: "body1" }}>
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <TabList
                onChange={handleChange}
                aria-label="lab API tabs example"
              >
                <Tab label="Availability Status" value="1" />
                <Tab label="Error Status" value="2" />
              </TabList>
            </Box>
            <TabPanel value="1">
              <Box>
                {/* <Box
                  component="form"
                  sx={{
                    "& > :not(style)": {
                      margin: "0 0 20px 0px",
                      width: "40ch",
                    },
                  }}
                  noValidate
                  autoComplete="off"
                >
                  <TextField
                    sx={{ marginLeft: "20px" }}
                    id="outlined-basic"
                    label="Global Search"
                    variant="outlined"
                    onChange={(e) => {
                      console.log("setSearch1(e.target.value)", e.target.value);
                      return setSearch11(e.target.value);
                    }}
                  />
                </Box>{" "} */}
                {/* ----------------------- */}
                <MainBoxx>
                  <Modal
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                    onClose={() => setOpen(false)}
                    open={open}
                  >
                    <Box
                      sx={{
                        height: 600,
                        width: 1200,
                        background: "white",
                        borderRadius: 2,
                      }}
                    >
                      {/* <h1>Hello Modal</h1> */}
                    </Box>
                  </Modal>
                  {searchData.map((a) => {
                    return (
                      <MainCard onClick={() => setOpen(true)}>
                        <TopStack>{aaa(a)}</TopStack>
                        <BottomStack direction="row">
                          {a.data.map((a) => {
                            const avvv = a.value;
                            return (
                              <DataBox>
                                <Box>
                                  <Box sx={{ fontSize: "12px" }}>
                                    <Typography
                                      sx={{
                                        color: arrowColor(avvv),
                                      }}
                                    >
                                      {a.value}
                                    </Typography>
                                  </Box>
                                  <ArrowBox bgcolor={arrowColor(avvv)}>
                                    {arrowIcon(avvv)}
                                  </ArrowBox>
                                  <Box style={{ fontSize: "12px" }}>
                                    <Typography
                                      variant=" subtitle2"
                                      style={{
                                        fontSize: 16,
                                        fontWeight: "bold",
                                      }}
                                    >
                                      {a.key.slice(0, 5)}{" "}
                                    </Typography>
                                  </Box>
                                </Box>
                              </DataBox>
                            );
                          })}
                        </BottomStack>
                      </MainCard>
                    );
                  })}{" "}
                </MainBoxx>
              </Box>
            </TabPanel>
            <TabPanel value="2">
              <Box>
                {/* <Box
                  component="form"
                  sx={{
                    "& > :not(style)": {
                      margin: "0 0 20px 0px",
                      width: "40ch",
                    },
                  }}
                  noValidate
                  autoComplete="off"
                >
                  <TextField
                    sx={{ marginLeft: "20px" }}
                    id="outlined-basic"
                    label="Global Search"
                    variant="outlined"
                  />
                </Box>{" "} */}
                <MainBoxx>
                  {" "}
                  {filteredData.error.map((a) => {
                    return (
                      <MainCard>
                        <TopStack>{aaa(a)}</TopStack>
                        <BottomStack direction="row">
                          {a.data.map((a) => {
                            const avvv = a.value;
                            return (
                              <DataBox>
                                <Box>
                                  <Box sx={{ fontSize: "12px" }}>
                                    <Typography
                                      sx={{
                                        color: arrowColorError(avvv),
                                      }}
                                    >
                                      {a.value}
                                    </Typography>
                                  </Box>
                                  <ArrowBox bgcolor={arrowColorError(avvv)}>
                                    {arrowIconError(avvv)}
                                  </ArrowBox>
                                  <Box style={{ fontSize: "12px" }}>
                                    <Typography
                                      variant=" subtitle2"
                                      style={{
                                        fontSize: 16,
                                        fontWeight: "bold",
                                      }}
                                    >
                                      {a.key.slice(0, 5)}{" "}
                                    </Typography>
                                  </Box>
                                </Box>
                              </DataBox>
                            );
                          })}
                        </BottomStack>
                      </MainCard>
                    );
                  })}{" "}
                </MainBoxx>
              </Box>
            </TabPanel>
          </TabContext>
        </Box>
      </MainBox>
    </Box>
  );
};
