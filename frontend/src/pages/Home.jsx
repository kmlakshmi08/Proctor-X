import React, { useEffect, useState } from "react";
import styles from "./home.module.css"
import Navbar from "./Navbar";
import * as img from "../img/index"

export default function Home() {
    return (
        <>
            <Navbar></Navbar>
            <div className={styles.mainbox}>
                <section>
                    <h1>ONLINE PROCTORING SYSTEM</h1>
                </section>
            </div>
        </>
    )
}