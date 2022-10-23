import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as _ from "lodash";
import "./styles.css";
import { BiDownArrowAlt, BiUpArrowAlt } from "react-icons/bi";
import { CgArrowsExchangeV } from "react-icons/cg";
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
import styled from "@emotion/styled";

function Avail({ apps, open }) {
  const loading = useSelector((state) => state.rootReducer.loading);
  const error = useSelector((state) => state.rootReducer.error);
  const ress = (f) => {
    const result = Object.keys(f)
      .map((m) => {
        if (
          m !== "appName" &&
          m !== "Flow" &&
          m !== "Tier" &&
          m !== "serviceName"
        ) {
          let kk = `${m.slice(4, 6)}/${m.slice(6, 8)}/${m.slice(0, 4)}`;
          return {
            key: kk.substring(0, 5),
            value: f[m],
          };
        }
      })
      .filter((ele) => {
        return ele !== undefined;
      });
    return result;
  };

  const arrowColor = (availValue) => {
    return availValue > 99.95
      ? "#137C07"
      : // ? "#2A7B7B"
      availValue < 99.0
      ? "#DC0909"
      : // ? "#A54444"
        "#FA9235";
  };

  const arrowColorError = (availValue) => {
    return availValue == 0
      ? "#367600"
      : // ? "#2A7B7B"
      availValue > 0.5
      ? "#DC0909"
      : // ? "#A54444"
        "#FA9235";
  };

  const dataTable = (a) => {
    return (
      <table
        style={{
          height: "40%",
          width: "100%",
          textAlign: "center",
        }}
      >
        <tbody>
          <tr>
            <th>App Name</th>
            <th>Sevice Name</th>
            <th>Flow</th>
          </tr>
          <tr
            style={{
              color: "#010150",
            }}
          >
            <td>{lettersLimit(a.appName)}</td>
            <td>{a.Flow}</td>
            <td>{lettersLimit(a.serviceName)}</td>
          </tr>
        </tbody>
      </table>
    );
  };

  const arrowIcon = (availValue) => {
    if (availValue > 99.95) {
      return <BiUpArrowAlt />;
    } else if (availValue < 99.0) {
      return <BiDownArrowAlt />;
    } else {
      return <CgArrowsExchangeV />;
    }
  };

  const arrowIconError = (availValue) => {
    if (availValue == 0) {
      return <BiUpArrowAlt />;
    } else if (availValue > 0.5) {
      return <BiDownArrowAlt />;
    } else {
      return <CgArrowsExchangeV />;
    }
  };

  const lettersLimit = (x) => {
    return x.toString().length > 12 ? `${x.slice(0, 12)}...` : x;
  };

  const ArrowBox = styled(Box)(() => ({
    height: 32,
    width: 35,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "white",
    borderRadius: 5,
    martgin: "9px 0",
    fontSize: "30px",
  }));
  const MainBox = styled(Box)(() => ({
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    overflow: "auto",
    color: "#636363",
  }));
  const DataCard = styled(Box)(() => ({
    border: "#FFF solid 1px",
    background: "#FFF",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    height: "24%",
    width: "32%",
    margin: 8,
    boxShadow: "2px 2px 8px 2px #CFCFCF",
  }));
  const SectionBox = styled(Box)(() => ({
    height: "55%",
    display: "flex",
    width: "99%",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    marginBottom: "2px",
    borderRadius: "5px",
    background: "#e2e2e2",
  }));
  const BoxFn = styled(Box)(() => ({
    textAlign: "center",
    // border: "red 1px solid",
    display: "flex",
    width: "100%",
    justifyContent: "space-around",
    alignItems: "center",
    flexDirection: "column",
  }));
  const BoxKey = styled(Box)(() => ({
    display: "flex",
    width: "100%",
    justifyContent: "space-around",
    alignItems: "center",
  }));
  const StackData = styled(Stack)(() => ({
    display: "flex",
    width: "100%",
    justifyContent: "space-around",
    alignItems: "center",
    textAlign: "center",
  }));

  return (
    <MainBox className="fonts">
      {loading && <h1 style={{ color: "#730C00" }}>loading...</h1>}
      {error && !loading && <h3 style={{ color: "#730C00" }}>{error}</h3>}
      {apps.map((a, i) => {
        return (
          <DataCard key={i}>
            {dataTable(a)}
            <SectionBox>
              <StackData direction="row">
                {ress(a).map((a, i) => (
                  <BoxFn key={i}>
                    <Typography
                      // variant="h4"
                      style={{
                        color: open
                          ? arrowColorError(a.value)
                          : arrowColor(a.value),
                        textAlign: "center",
                      }}
                    >
                      {a.value}
                    </Typography>
                    <ArrowBox
                      bgcolor={
                        open ? arrowColorError(a.value) : arrowColor(a.value)
                      }
                      sx={{
                        textAlign: "center",
                      }}
                    >
                      {open ? arrowIconError(a.value) : arrowIcon(a.value)}
                    </ArrowBox>
                  </BoxFn>
                ))}
              </StackData>
              <BoxKey>
                {ress(a).map((a, i) => (
                  <h4 key={i}>{a.key}</h4>
                ))}
              </BoxKey>
            </SectionBox>
          </DataCard>
        );
      })}
    </MainBox>
  );
}

export default Avail;
