
import React, { useState } from "react";
import styles from "./reportcard.module.css";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function ReportCard({ test, classname, attempted }) {
    const navigate = useNavigate();
    const theme = useSelector((state) => state.themeReducer.mode);

    const hoverEvent = (e) => {
        e.preventDefault();
    };

    const openReport = () => {
        
    };

    return (
        <>
            <div data-theme={`${theme === "light" ? "" : "dark"}`} className={`${styles.card} ${classname} ${attempted ? styles.attempted : ""}`} onClick={openTest} onMouseEnter={hoverEvent}>
                <span>{test.testName}</span>
            </div>
            
        </>
    );
}
