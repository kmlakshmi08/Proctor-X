import React from "react";
import styles from "./testcard.module.css"

export default function TestCard({ test, classname }) {
    const hoverEvent = (e) => {
        e.preventDefault();
        
    }
    const openTest = () => {

    }
    return (
        <>
            <div className={`${styles.card} ${classname}`} onClick={openTest} onMouseEnter={hoverEvent} >
                <span>{test.testName}</span>
            </div>
        </>
    )
}