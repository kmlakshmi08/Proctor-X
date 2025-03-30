import axios from "axios";
import { useSearchParams } from "react-router-dom";
import React, { useEffect, useState } from "react";

export default function Asessment (){
    const [test,setTest] = useState(null);
    const [search] = useSearchParams();
    useEffect(()=>{
        async function fetchtest() {
            const id = search.get("id")
            const url = `http://localhost:3001/test/gettestbyID?id=${id}`
            const result = await axios.get(url)
            setTest(result.data)
        }
        fetchtest();
    },[])
    return(
        <>
            {
                test ? 
                <>
                    
                </>:null
            }
        </>
    )
}