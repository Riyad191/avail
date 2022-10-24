import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { GET_USERS } from "../../store/actions";
import { TabBoxMain, TabBox } from "./styles";
import Ava from "./Availability";

export default function LabTabs() {
  const dispatch = useDispatch();
  const avaData = useSelector((state) => state.rootReducer.stateUsers);
  const [apps, setApps] = useState([]);
  useEffect(() => { dispatch({ type: GET_USERS })}, [dispatch]);
  useEffect(() => setApps(avaData.map((a) => Object.values(a)).splice(0, 1).flat(Infinity)),[avaData]);
  return <TabBoxMain><TabBox><Ava apps={apps}/></TabBox></TabBoxMain>
}
  
 
    
    
   
  

 

 


 
