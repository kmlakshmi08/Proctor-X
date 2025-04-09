// import React from "react";
// import styles from "./testcard.module.css"
// import { useNavigate } from "react-router-dom"

// export default function TestCard({ test, classname }) {
//     console.log(test)
//     const navigate = useNavigate()
//     const hoverEvent = (e) => {
//         e.preventDefault();
//     }
//     const openTest = () => {
//         const url = `/asessment?id=${test._id}`
//         navigate(url)
//     }
//     return (
//         <>
//             <div className={`${styles.card} ${classname}`} onClick={openTest} onMouseEnter={hoverEvent} >
//                 <span>{test.testName}</span>
//             </div>
//         </>
//     )
// }
import React from "react";
import styles from "./testcard.module.css";
import { useNavigate } from "react-router-dom";

export default function TestCard({ test, classname }) {
    const navigate = useNavigate();

    const hoverEvent = (e) => {
        e.preventDefault();
    };

    const openTest = () => {
        navigate(`/instructions?id=${test._id}`);
    };

    return (
        <div className={`${styles.card} ${classname}`} onClick={openTest} onMouseEnter={hoverEvent}>
            <span>{test.testName}</span>
        </div>
    );
}
