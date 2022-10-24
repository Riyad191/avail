import { BiDownArrowAlt, BiUpArrowAlt } from "react-icons/bi";
import { CgArrowsExchangeV } from "react-icons/cg";

export const ress = (f) => {
    // console.log("fff",Object.keys(f).map(a => +a).filter(a => typeof a == "number"))
  return Object.keys(f).slice(0,5).map((m) => {
      let k = `${m.slice(4, 6)}/${m.slice(6, 8)}/${m.slice(0, 4)}`;
      return { key: k.substring(0, 5), value: f[m]};
    }).filter((ele) => ele !== undefined)
};

export const arrowColor = v => +v == 0 ? obj.success : +v > 0.5 ? obj.denger : obj.warning;

const obj = {
    success: { color: "#367600", icon: <BiUpArrowAlt /> },
    denger: { color: "#DC0909", icon: <BiDownArrowAlt /> },
    warning: { color: "#FA9235", icon: <CgArrowsExchangeV /> }
}

 
