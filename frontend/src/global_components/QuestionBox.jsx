import React, { useState } from "react";
import styles from "./questionbox.module.css"

export default function QuestionBox({ question, questionNo, answerScript, setAnswerScript }) {

    const alphabets = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]
    const [selectedOption, setSelectedOption] = useState(null);

    const handleUpdate = (id, answer) => {
        const answers = answerScript;
        answers[id] = answer
        setAnswerScript(answers)
        console.log("Answer script : ", answers)
    }

    return (
        <>
            <div className={styles.question} id={`${question._id}`}>
                <h2>Question {questionNo}</h2>
                <p>{question.question}</p>
                <section>
                    {
                        question.options.map((option, key) => (
                            <>
                                <div className={styles.option}>
                                    <span>{alphabets[key]}</span>
                                    <span
                                        className={selectedOption === key ? styles.selected : null}
                                        onClick={() => { setSelectedOption(key); handleUpdate(question._id,option) }}
                                    >{option}</span>
                                </div>
                            </>
                        ))
                    }
                </section>
            </div>
        </>
    )
}
