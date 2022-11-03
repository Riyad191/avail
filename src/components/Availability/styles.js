import { Box, Button, Stack } from "@mui/material";
import styled from "@emotion/styled";

export const ArrowBox = styled(Box)(() => ({
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

export const MainBox = styled(Box)(() => ({
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "center",
  alignItems: "flex-start",
  overflow: "scroll",
  color: "#636363",
}));

export const GreenBars = styled(Box)(() => ({
  height: "50px",
  width: "7px",
  borderRadius: "40px",
  background: "green"
}));

export const GrayBars = styled(Box)(() => ({
  height: "50px",
  width: "7px",
  borderRadius: "40px",
  background: "#787878"
}));

export const DataCard = styled(Button)(() => ({
  border: "#FFF solid 1px",
  background: "#FFF",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  borderRadius: 5,
  // height: "20%",
  width: "32%",
  margin: 8,
  boxShadow: "2px 2px 8px 2px #CFCFCF",
  cursor: "pointer",
  color: "#000A37"
}));

export const SectionBox = styled(Box)(() => ({
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

export const BoxFn = styled(Box)(() => ({
  textAlign: "center",
  display: "flex",
  width: "100%",
  justifyContent: "space-around",
  alignItems: "center",
  flexDirection: "column",
}));

export const BoxKey = styled(Box)(() => ({
  display: "flex",
  width: "100%",
  justifyContent: "space-around",
  alignItems: "center",
}));

export const BoxInfo = styled(Box)(() => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
  width: "100%",
}));

export const BoxPercentage = styled(Box)(() => ({
  display: "flex",
  justifyContent: "space-evenly",
  alignItems: "center",
  width: "100%",
  borderTop: "solid 1px #e2e2e2",
  padding: "3px 0",
}));

export const BoxInfoSection = styled(Box)(() => ({
  display: "flex",
  justifyContent: "space-evenly",
  alignItems: "center",
  width: "100%",
  padding: "5px 0 0",
}));

export const StackData = styled(Stack)(() => ({
  display: "flex",
  width: "100%",
  justifyContent: "space-around",
  alignItems: "center",
  textAlign: "center",
}));

export const TabBoxMain = styled(Box)(() => ({
  width: "100%",
  typography: "body1",
  height: "100%",
  overflow: "auto",
}));

export const TabBox = styled(Box)(() => ({
  overflow: "auto",
  height: "98.70%",
  background: "#FFF",
  margin: "0 10px",
  borderRadius: 1,
  border: "#CFCFCF solid 1px",
}));
export const CardTitle = styled(Stack)(() => ({
  width: "100%",
  display: "flex",
  justifyContent: "space-evenly",
  alignItems: "center",
}));

export const Element = styled(Box)(() => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
  width: "33%",
}));

export const Title = styled(Box)(() => ({
  margin: "5px 0",
  width: "100%",
  textAlign: "center",
  background: "#e2e2e2",
  padding: "5px 0",
  borderRadius: "3px",
  color: "#000"
}));
export const Title_1 = styled(Box)(() => ({
  margin: "5px 0",
  width: "60%",
  textAlign: "center",
  background: "#e2e2e2",
  padding: "5px 0",
  borderRadius: "3px",
  color: "#000"
}));

export const Info = styled(Box)(() => ({
  fontSize: "14px",
  marginBottom: "5px",
}));

export const Uptime = styled(Box)(() => ({
  width: " 100%",
  textAlign: "left",
  fontSize: "10px",
  padding: "0 0 2px 5px",
  fontWeight: "bold",
}));
