import React, { useEffect, useState } from "react";
import styles from "./testpage.module.css"
import Navbar from "./Navbar";
import axios from "axios"
import TestCard from "../global_components/TestCard";
import * as img from "../img/index"

const url = "http://localhost:3001/test/"

export default function Tests() {
    const [tests, setTests] = useState(null)

    useEffect(() => {
        async function fetchuser() {
            const result = await axios.get(url)
            console.log(result.data)
            setTests(result.data)
        }
        fetchuser();
    }, [])
    return (
        <>
            <Navbar></Navbar>
            <div className={styles.mainbox}>
                <h1>List of all Tests</h1>
                <div className={styles.testcontainer}>
                    {
                        Array.isArray(tests) && tests.map((test) => (
                            <TestCard test={test}/>
                        ))
                    }
                </div>
            </div>
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
//         },
//         {
//             "question": "What is 9 × 9?",
//             "options": ["72", "81", "90", "99"],
//             "correctAnswer": "81"
//         },
//         {
//             "question": "What is the square root of 64?",
//             "options": ["6", "7", "8", "9"],
//             "correctAnswer": "8"
//         },
//         {
//             "question": "What is 100 ÷ 4?",
//             "options": ["20", "25", "30", "40"],
//             "correctAnswer": "25"
//         },
//         {
//             "question": "What is 3³ (3 raised to the power of 3)?",
//             "options": ["6", "9", "27", "81"],
//             "correctAnswer": "27"
//         },
//         {
//             "question": "What is the value of 5²?",
//             "options": ["15", "20", "25", "30"],
//             "correctAnswer": "25"
//         },
//         {
//             "question": "What is the sum of the angles in a quadrilateral?",
//             "options": ["180°", "270°", "360°", "450°"],
//             "correctAnswer": "360°"
//         },
//         {
//             "question": "If a triangle has sides 3, 4, and 5, what type of triangle is it?",
//             "options": ["Equilateral", "Isosceles", "Right-angled", "Scalene"],
//             "correctAnswer": "Right-angled"
//         },
//         {
//             "question": "What is 144 ÷ 12?",
//             "options": ["10", "11", "12", "13"],
//             "correctAnswer": "12"
//         },
//         {
//             "question": "What is 2⁵?",
//             "options": ["16", "32", "64", "128"],
//             "correctAnswer": "32"
//         },
//         {
//             "question": "Which of the following is a prime number?",
//             "options": ["22", "27", "31", "35"],
//             "correctAnswer": "31"
//         },
//         {
//             "question": "How many sides does a pentagon have?",
//             "options": ["4", "5", "6", "7"],
//             "correctAnswer": "5"
//         },
//         {
//             "question": "What is the area of a rectangle with length 8 and width 6?",
//             "options": ["28", "36", "42", "48"],
//             "correctAnswer": "48"
//         },
//         {
//             "question": "What is the perimeter of a square with side length 9?",
//             "options": ["18", "27", "36", "45"],
//             "correctAnswer": "36"
//         },
//         {
//             "question": "What is 13 × 6?",
//             "options": ["72", "78", "82", "86"],
//             "correctAnswer": "78"
//         },
//         {
//             "question": "Which number is divisible by 3?",
//             "options": ["14", "17", "21", "25"],
//             "correctAnswer": "21"
//         },
//         {
//             "question": "What is 50% of 80?",
//             "options": ["30", "40", "50", "60"],
//             "correctAnswer": "40"
//         },
//         {
//             "question": "If 7x = 42, what is x?",
//             "options": ["5", "6", "7", "8"],
//             "correctAnswer": "6"
//         },
//         {
//             "question": "What is 121 ÷ 11?",
//             "options": ["9", "10", "11", "12"],
//             "correctAnswer": "11"
//         },
//         {
//             "question": "Which fraction is equivalent to 0.5?",
//             "options": ["1/3", "1/4", "1/2", "3/5"],
//             "correctAnswer": "1/2"
//         }
//     ]
// }
