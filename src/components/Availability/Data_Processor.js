

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



//   const d = new Date()
//   const date = d.toISOString().slice(0,10)
  
//  2022-10-28 
//  const array = fiveMinsData.map(a => a.glb_url)
//  let users = [];
//  let promises = [];
//  for (let i = 0; i < array.length; i++) {
//    for(let i = 1; i < 5; i++){
//      let d = new Date();
//      d.setDate(d.getDate() -1 )
//      promises.push(
//        axios.get(`https://oscs-sre-api.dev.walmart.com/availability/detailed_avail_percent?glb_url=${array[i]}&&date_frequency=5mins&&create_date=${d.toString()}`).then(response => {
//              users.push(response.data.flat(1));
//            })
//          )
//        }
//      }
//  Promise.all(promises).then(() => console.log( "glb_url", users ));