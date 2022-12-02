import { useEffect } from "react"
import axios from "axios"

const Api = () => {
    useEffect(()=>{
      axios("https://oscs-sre-api.dev.walmart.com/availability/app_info/date?pillar=TRANSPORTATION&&create_date=2022-12-01")
      .then(res => console.log(res.data) )
    },[])
}

export default Api;