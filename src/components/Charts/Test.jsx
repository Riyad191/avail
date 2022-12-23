import React, { useEffect } from "react"
import axios from "axios"

const Test = () => {
    useEffect(()=>{
    axios(`https://oscs-sre-api.dev.walmart.com/availability/app_info/date?pillar=TRANSPORTATION&&create_date=2022-12-22`).then(res => console.log(res.data)).catch(err => console.log("err", err.message))
    },[])
    return (
        <div>
           <h1>
               This is Charts component
           </h1>
        </div>
    ) 
}

export default Test;