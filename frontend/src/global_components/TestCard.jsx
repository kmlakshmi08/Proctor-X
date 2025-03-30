import React from "react";
import styles from "./testcard.module.css"
import { useNavigate } from "react-router-dom"

export default function TestCard({ test, classname }) {
    console.log(test)
    const navigate = useNavigate()
    const hoverEvent = (e) => {
        e.preventDefault();
    }
    const openTest = () => {
        const url = `/asessment?id=${test._id}`
        navigate(url)
    }
    return (
        <>
            <div className={`${styles.card} ${classname}`} onClick={openTest} onMouseEnter={hoverEvent} >
                <span>{test.testName}</span>
            </div>
        </>
    )
}