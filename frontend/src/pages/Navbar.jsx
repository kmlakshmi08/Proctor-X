import React from "react";
import styles from "./navbar.module.css"
import * as img from "../img/index"
import { useSelector } from "react-redux"
import * as actions from "../store/types"
import ToggleSwitch from "../global_components/ToggleSwitch";

export default function Navbar() {
    const theme = useSelector((state) => state.themeReducer.mode);
    return (
        <>
            <div className={styles.navbar} data-theme={`${theme === "light" ? "": "dark"}`}>
                <div className={styles.navitem}>
                    <img src={img.proctoringimg} alt="" />
                    <h3 className={styles.logoText}>ProctorX</h3>
                </div>
                <div className={styles.navitem}>
                    <ul>
                        <li><a href="/home">Home</a></li>
                        <li><a href="/profile">Profile</a></li>
                        <li><a href="/tests">Tests</a></li>
                        <li><a href="/report">Reports</a></li>
                        <li>
                            <img src={theme === "light" ? img.sun : img.moon} alt="" />
                            <ToggleSwitch title="Theme" action={actions.CHANGETHEME}/>
                        </li>
                    </ul>
                </div>
            </div>
        </>
    )
}