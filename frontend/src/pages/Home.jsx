import React from "react";
import styles from "./home.module.css"
import Navbar from "./Navbar";
import * as img from "../img/index"
import { useSelector } from "react-redux";

export default function Home() {
    const UserData = useSelector((state) => state.userReducer)
    return (
        <>
            <Navbar></Navbar>
            <div className={styles.mainbox}>
                <h1>ONLINE PROCTORING SYSTEM</h1>
                <h1>Welcome back {UserData.username}</h1>
                <img src={UserData.photo || img.proctoringimg} alt="" />
            </div>
        </>
    )
}