import { useState, useEffect } from "react";
import axios from "axios";
export default function(){
  useEffect(()=>{
    // API to Fetch all Application info by Pillar
    // axios(`https://oscs-sre-api.dev.walmart.com/availability/app_info?pillar=FULFILLMENT`).then(res => console.log(res.data)).catch(err => console.log("err", err.message))
    // API to FETCH Application availability average for last 5 days. 
    // axios(`https://oscs-sre-api.dev.walmart.com/availability/app_availability`).then(res => console.log(res.data)).catch(err => console.log("err", err.message))
    // API to FETCH Application availability by date. 
    axios(`https://oscs-sre-api.dev.walmart.com/availability/app_avail_percent?glb_url=ho-eim_prod_us_fulfillment_glb_us_walmart_net&&create_date=2022-11-22`).then(res => console.log(res.data)).catch(err => console.log("err", err.message))
    // axios(`https://oscs-sre-api.dev.walmart.com/availability/app_info/date?pillar=TRANSPORTATION&&createE_date=2022-12-7`).then(res => console.log(res.data)).catch(err => console.log("err", err.message))
  },[])
}