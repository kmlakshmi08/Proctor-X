import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./toggle.module.css"
import { themeReducer } from "../store/Reducers/Theme";

export default function ToggleSwitch({ title, action }) {
    const theme = useSelector((state)=>state.themeReducer.mode);
    const dispatch = useDispatch()
    return (
        <>
            <div className={`${styles.box} ${theme === "dark" ? styles.dark : null}`} onClick={()=>{dispatch({ type: action })}}>
                <span className={`${theme === "light" ? styles.left : styles.right}`}></span>
            </div>
        </>
    )
}