import axios from "axios";
import { useSearchParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import styles from "./asessment.module.css";
import Progress from "../global_components/Progress";
import Camera from "./Camera"
import { useSelector } from "react-redux";

export default function Asessment() {
    const [test, setTest] = useState(null);
    const [popup, setPopup] = useState(false);
    const [answerScript, setAnswerScript] = useState({})
    const [search] = useSearchParams();
    const UserData = useSelector((state)=>state.userReducer)

    const submit = (e) => {
        e.preventDefault()
        setPopup(true)
    }
    const handleUpdate = (id, answer) => {
        const answers = answerScript;
        answers[id] = answer
        setAnswerScript(answers)
        console.log("Answer script : ", answers)
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
            <div className={styles.box}>
            <h1>{UserData.username}</h1>
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
                                                            <input type="radio" name={`question${key}`} value={option} onClick={() => { handleUpdate(question._id, option) }} />{option}
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
            </div>
            <div className={styles.box}>
                <Camera></Camera>
            </div>
            {
                popup === true ?
                    <div className={styles.popup}>
                        <section>
                            <h1>Done with the test?</h1>
                            <Progress totalquestions={test.questions.length} answerlength={Object.keys(answerScript).length} />
                            <p>Are you sure to submit your test?</p>
                            <div className={styles.buttons}>
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


// QUESTION DUMMY OBJECT : 
// {
//     "testName": "Math Test 2",
//     "subject": "Mathematics",
//     "questions": [
//         {
//             "question": "What is 15 + 7?",
//             "options": ["20", "21", "22", "23"],
//             "correctAnswer": "22",
//              "_id" : "67e803a39e6c4251f7881af3"
//         }
//     ],
//     _id : "67e803a39e6c4251f7881af2"
// }

// ANSWERSCRIPT DUMMY OBJECT :
// {
//     testID: "67e803a39e6c4251f7881af2",
//     answers:{
//         "67e803a39e6c4251f7881af3": "Central Performance Unit"
//         "67e803a39e6c4251f7881af5": "Linked List"
//         "67e803a39e6c4251f7881af6": "Java"
//         "67e803a39e6c4251f7881af7": "High Tech Machine Language"
//         "67e803a39e6c4251f7881af8": "JavaScript"
//         "67e803a39e6c4251f7881af9": "Remote Access Memory"
//         "67e803a39e6c4251f7881afa": "MySQL"
//         "67e803a39e6c4251f7881afb": "Running antivirus software"
//         "67e803a39e6c4251f7881afc": "Python"
//         "67e803a39e6c4251f7881afd": "OR"
//         "67e803a39e6c4251f7881afe": "Sun Microsystems"
//         "67e803a39e6c4251f7881aff": "HTTP"
//         "67e803a39e6c4251f7881b00": "System Query Language"
//         "67e803a39e6c4251f7881b01": "Oracle"
//         "67e803a39e6c4251f7881b02": "Dynamic Network S"
//     }
// }