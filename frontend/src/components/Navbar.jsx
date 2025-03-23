import React from "react";
import styles from "./navbar.module.css"
import * as img from "../img/index"
import { useDispatch, useSelector } from "react-redux"
import * as actions from "../store/types"

export default function Navbar() {
    const theme = useSelector((state) => state.themeReducer.mode);
    const dispatch = useDispatch();
    return (
        <>
            <div style={styles.navbar}>
                <div style={styles.navitem}>
                    <img src={img.proctoringimg} alt="" />
                    <h3>Online Proctoring System.</h3>
                </div>
                <div style={styles.navitem}>
                    <ul>
                        <li>Home</li>
                        <li>Tests</li>
                        <li>Reports</li>
                        <li>
                            <img src={theme === "Light" ? img.moon : img.sun} alt="" />
                            
                        </li>
                    </ul>
                </div>
            </div>
        </>
    )
}