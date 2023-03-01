import { useSelector, useDispatch } from "react-redux";
import { BiDownArrowAlt, BiUpArrowAlt } from "react-icons/bi";
import { CgArrowsExchangeV } from "react-icons/cg";
import { IoIosRemove } from "react-icons/io";
import { Success, Denger, Secondary, Warning } from "./styles";

export const formatAvailabilityData = (f) => {
  return Object.keys(f)
    .slice(0, 5)
    .map((m) => {
      let k = `${m.slice(4, 6)}/${m.slice(6, 8)}/${m.slice(0, 4)}`;
      return { key: k.substring(0, 5), value: f[m] };
    })
    .filter((ele) => ele !== undefined);
};

export const dataArrowsAndColors = (v) =>
  +v > 99.95
    ? iconsAndColors.success
    : +v < 99 && +v >= 1
    ? iconsAndColors.denger
    : +v === 0
    ? iconsAndColors.secondary
    : iconsAndColors.warning;

export const iconsAndColors = {
  success: {
    color: "#039177",
    //  "#367600",
    icon: <BiUpArrowAlt />,
  },
  denger: { color: "#DC0909", icon: <BiDownArrowAlt /> },
  warning: { color: "#dfaf2d", icon: <CgArrowsExchangeV /> },
  secondary: { color: "#787878", icon: <IoIosRemove /> },
};

export const AvailabilityTypes = (date, percent) => {
  if (date !== "no data available") {
    return percent > 99.95 ? (
      <Success />
    ) : (percent < 97 && percent >= 1) || percent === null ? (
      <Denger />
    ) : percent < 1 ? (
      <Secondary />
    ) : (
      <Warning />
    );
  }
  return <Secondary />;
};

export const cardTitle = {
  appName: "App Name",
  serviceName: "Service Name",
  flowName: "Flow",
};
