import React from "react"
import styles from "./pagenotfound.module.css"

export default function PageNotFound(){
    return(
        <>
            <div className={styles.mainbox}>
                <section className={styles.box}>
                    <h1>OOPS! LOOKS LIKE YOU LOST YOUR WAY</h1>
                    <span>The page you are looking for doesn't exist.</span>
                    <a href="/home">GO TO HOME PAGE</a>
                </section>
            </div>
        </>
    )
}