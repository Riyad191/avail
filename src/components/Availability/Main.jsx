import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { GET_USERS } from "../../store/actions";
import { TabBoxMain, TabBox } from "./styles";
import Ava from "./Availability";

export default function LabTabs() {
  const dispatch = useDispatch();
  const availData = useSelector((state) => state.rootReducer.data);
  console.log(availData);
  const [apps, setApps] = useState([]);
  useEffect(() => { dispatch({ type: GET_USERS })}, [dispatch]);
  useEffect(() => setApps(availData.map((data) => Object.values(data)).splice(0, 1).flat(Infinity)),[availData]);
  return <TabBoxMain><TabBox><Ava apps={apps}/></TabBox></TabBoxMain>
}
  
 
    
    
   
  

 

 


 
