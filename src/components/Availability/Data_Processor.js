

export const formatAvailabilityData = (f) => {
    // console.log("fff",Object.keys(f).map(a => +a).filter(a => typeof a == "number"))
  return Object.keys(f).slice(0,5).map((m) => {
      let k = `${m.slice(4, 6)}/${m.slice(6, 8)}/${m.slice(0, 4)}`;
      return { key: k.substring(0, 5), value: f[m]};
    }).filter((ele) => ele !== undefined)
};



export const cardTitle = {
    appName: "App Name",
    serviceName: "Service Name",
    flow: "Flow"
  }


 