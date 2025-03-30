import React, { useEffect, useState } from "react";
import styles from "./home.module.css"
import Navbar from "./Navbar";
import axios from "axios"
import * as img from "../img/index"

const url = "http://localhost:3001/login/getuserbyid"

export default function Home() {
    const [user,setuser] = useState({})
    
    useEffect(()=>{
        async function fetchuser () {
            const result = await axios.get(url,{params: {username: "Toshan7"}})
            setuser(result.data)
            console.log(result.data)
        }
        fetchuser();
    },[])
    return (
        <>
            <Navbar></Navbar>
            <div className={styles.mainbox}>
                <section>
                    <h1>ONLINE PROCTORING SYSTEM</h1>
                </section>
                {
                    user?
                    <>
                        <h1>Welcome back {user.username}</h1>
                        <img src={user.photo || img.proctoringimg} alt="" />
                    </>
                    :
                    null
                }
            </div>
        </>
    )
}