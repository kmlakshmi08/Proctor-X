import axios from "axios";
import { useSearchParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import styles from "./asessment.module.css";

export default function Asessment() {
    const [test, setTest] = useState(null);
    const [popup, setPopup] = useState(false);
    const [answerScript,setAnswerScript] = useState([])
    const [search] = useSearchParams();
    const submit = (e) => {
        e.preventDefault()
        setPopup(true)
    }
    useEffect(() => {
        async function fetchtest() {
            const id = search.get("id")
            const url = `http://localhost:3001/test/gettestbyID?id=${id}`
            const result = await axios.get(url)
            console.log(result.data)
            setTest(result.data)
        }
        fetchtest();
    }, [])
    return (
        <>
            {
                test ?
                    <>
                        <form onSubmit={submit} className={styles.mainbox}>
                            <center><h1>{test.testName}</h1></center>
                            <center><h3>Subject : {test.subject}</h3></center>
                            {
                                test.questions.map((question, key) => (
                                    <div className={styles.question}>
                                        <p>{question.question}</p>
                                        {
                                            question.options.map((option) => (
                                                <span>
                                                    <label>
                                                        <input type="radio" name={`question${key}`} value={option} />{option}
                                                    </label>
                                                </span>
                                            ))
                                        }
                                    </div>
                                ))
                            }
                            <button type="submit">Submit</button>
                        </form>
                    </> : null
            }
            {
                popup === true ?
                    <div className={styles.popup}>
                        <section>
                            <h1>Done with the test?</h1>
                            <p>Are you sure to submit your test?</p>
                            <div>
                                <button onClick={() => { setPopup(false) }}>Cancel</button>
                                <button>Submit</button>
                            </div>
                        </section>
                    </div>
                    : null
            }
        </>
    )
}



// {
//     "testName": "Math Test 2",
//     "subject": "Mathematics",
//     "questions": [
//         {
//             "question": "What is 15 + 7?",
//             "options": ["20", "21", "22", "23"],
//             "correctAnswer": "22"
//         }
//     ]
// }
