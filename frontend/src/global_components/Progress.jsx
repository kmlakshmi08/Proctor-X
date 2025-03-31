import React from "react";
import styles from "./progress.module.css"

export default function Progress({ answerlength, totalquestions }) {
    console.log("Answer length : ",answerlength)
    console.log("Total questions : ",totalquestions)
    return (
        <>
            <p>Your progress : attempted {answerlength} questions out of {totalquestions}</p>
            <div className={styles.progressbox}>
                {Array.from({ length: totalquestions }, (_, index) => (
                    <span className={index < answerlength ? styles.attempted : null}></span>
                ))}
            </div>
        </>
    )
}