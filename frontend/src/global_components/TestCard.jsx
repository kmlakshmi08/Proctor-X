import React from "react";
import styles from "./testcard.module.css"

export default function TestCard({ test, classname }){
    return (
        <>
            <div className={`${styles.card} ${classname}`}>
                <h1>{test.testName}</h1>
            </div>
        </>
    )
}