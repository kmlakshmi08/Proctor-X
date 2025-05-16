// import axios from "axios";
// import { useSearchParams,useNavigate } from "react-router-dom";
// import React, { useEffect, useState } from "react";
// import styles from "./asessment.module.css";
// import Progress from "../global_components/Progress";
// import { useSelector } from "react-redux";
// import QuestionBox from "../global_components/QuestionBox";
// import Camera from "./Camera"
// import * as img from "../img/index"

// const submitAPIurl = "http://localhost:3001/test/evaluate"

// export default function Asessment() {
//     const [test, setTest] = useState(null);
//     const [popup, setPopup] = useState(false);
//     const [answerScript, setAnswerScript] = useState({})
//     const [search] = useSearchParams();
//     const [timeLeft, setTimeLeft] = useState(60 * 30);
//     const [timer, setTimer] = useState("00:30:00");
//     const UserData = useSelector((state) => state.userReducer)
//     const navigate = useNavigate();

//     const submit = (e) => {
//         e.preventDefault()
//         setPopup(true)
//     }
//     const submitAsessment = async ()=>{
//         const data = {
//             testId: test._id,
//             userId: UserData.id,
//             answers: answerScript
//         }
//         const result = await axios.post(submitAPIurl,data)
//         if(result?.status === 200){
//             navigate("/tests")
//         }
//     }
//     const formatTime = (secs) => {
//         const hrs = String(Math.floor(secs / 3600)).padStart(2, "0");
//         const mins = String(Math.floor((secs % 3600) / 60)).padStart(2, "0");
//         const secsPart = String(secs % 60).padStart(2, "0");
//         return `${hrs}:${mins}:${secsPart}`;
//     };

//     useEffect(() => {
//         setTimer(formatTime(timeLeft)); // initial set

//         if (timeLeft <= 0) return;

//         const interval = setInterval(() => {
//             setTimeLeft((prev) => {
//                 if (prev <= 1) {
//                     clearInterval(interval);
//                     return 0;
//                 }
//                 return prev - 1;
//             });
//         }, 1000);

//         return () => clearInterval(interval); // cleanup
//     }, []);

//     useEffect(() => {
//         setTimer(formatTime(timeLeft));
//     }, [timeLeft]);

//     useEffect(() => {
//         console.log("Answer script updated to : ", answerScript)
//     }, [answerScript])

//     useEffect(() => {
//         async function fetchtest() {
//             const id = search.get("id")
//             const url = `http://localhost:3001/test/gettestbyID?id=${id}`
//             const result = await axios.get(url)
//             console.log("result.data: ",result.data)
//             setTest(result.data)
//         }
//         fetchtest();
//     }, [])
//     return (
//         <>
//             <div className={styles.box}>
//                 <section>
//                     <img src={img.proctoringimg} alt="" />
//                     <h2>ProctorX</h2>
//                 </section>
//                 {
//                     test ?
//                         <div>
//                             <span>{test.subject}</span>
//                             <p>{test.testName}</p>
//                         </div> : null
//                 }
//                 <div>
//                     <span>Time Left</span>
//                     <p>{timer}</p>
//                 </div>
//                 <div>
//                     <span>Questions : </span>
//                     <frame>
//                         {
//                             test ? (
//                                 test.questions.map((question, key) => (
//                                     <a href={`#${question._id}`} className={`${answerScript[question._id] === undefined ? "" : styles.answered}`}>
//                                         {(key + 1)}
//                                     </a>
//                                 ))) : null
//                         }
//                     </frame>
//                 </div>
//             </div >
//             <div className={styles.box}>
//                 {
//                     test ?
//                         <>
//                             <form onSubmit={submit} className={styles.mainbox}>
//                                 <center><h1>{test.testName}</h1></center>
//                                 <center><h3>Subject : {test.subject}</h3></center>
//                                 {
//                                     test.questions.map((question, key) => (
//                                         <QuestionBox
//                                             question={question}
//                                             questionNo={(key + 1)}
//                                             answerScript={answerScript}
//                                             setAnswerScript={setAnswerScript}
//                                         />
//                                     ))
//                                 }
//                                 <button type="submit">Submit</button>
//                             </form>
//                         </> : null
//                 }
//             </div>
//             <div className={styles.box}>
//                 <Camera></Camera>
//             </div>
//             {
//                 popup === true ?
//                     <div className={styles.popup}>
//                         <section>
//                             <h1>Done with the test?</h1>
//                             console.log(answerScript)
//                             <Progress totalquestions={test.questions.length} answerlength={Object.keys(answerScript).length} />
//                             <p>Are you sure to submit your test?</p>
//                             <div className={styles.buttons}>
//                                 <button onClick={() => { setPopup(false) }}>Cancel</button>
//                                 <button onClick={submitAsessment}>Submit</button>
//                             </div>
//                         </section>
//                     </div>
//                     : null
//             }
//         </>
//     )
// }


// // QUESTION DUMMY OBJECT :
// // {
// //     "testName": "Math Test 2",
// //     "subject": "Mathematics",
// //     "questions": [
// //         {
// //             "question": "What is 15 + 7?",
// //             "options": ["20", "21", "22", "23"],
// //             "correctAnswer": "22",
// //              "_id" : "67e803a39e6c4251f7881af3"
// //         }
// //     ],
// //     _id : "67e803a39e6c4251f7881af2"
// // }

// // ANSWERSCRIPT DUMMY OBJECT :
// // {
// //     testID: "67e803a39e6c4251f7881af2",
// //     userId: "Toshan7"
// //     answers:{
// //         "67e803a39e6c4251f7881af3": "Central Performance Unit"
// //         "67e803a39e6c4251f7881af5": "Linked List"
// //         "67e803a39e6c4251f7881af6": "Java"
// //         "67e803a39e6c4251f7881af7": "High Tech Machine Language"
// //         "67e803a39e6c4251f7881af8": "JavaScript"
// //         "67e803a39e6c4251f7881af9": "Remote Access Memory"
// //         "67e803a39e6c4251f7881afa": "MySQL"
// //         "67e803a39e6c4251f7881afb": "Running antivirus software"
// //         "67e803a39e6c4251f7881afc": "Python"
// //         "67e803a39e6c4251f7881afd": "OR"
// //         "67e803a39e6c4251f7881afe": "Sun Microsystems"
// //         "67e803a39e6c4251f7881aff": "HTTP"
// //         "67e803a39e6c4251f7881b00": "System Query Language"
// //         "67e803a39e6c4251f7881b01": "Oracle"
// //         "67e803a39e6c4251f7881b02": "Dynamic Network S"
// //     }
// // }

// ... all your existing imports
// import axios from "axios";
// import { useSearchParams, useNavigate } from "react-router-dom";
// import React, { useEffect, useState } from "react";
// import styles from "./asessment.module.css";
// import Progress from "../global_components/Progress";
// import { useSelector } from "react-redux";
// import QuestionBox from "../global_components/QuestionBox";
// import Camera from "./Camera";
// import * as img from "../img/index";

// const submitAPIurl = "http://localhost:3001/test/evaluate";

// export default function Asessment() {
//   const [test, setTest] = useState(null);
//   const [popup, setPopup] = useState(false);
//   const [violationPopup, setViolationPopup] = useState(false);
//   const [violationCount, setViolationCount] = useState(0);
//   const [answerScript, setAnswerScript] = useState({});
//   const [search] = useSearchParams();
//   const [timeLeft, setTimeLeft] = useState(60 * 30);
//   const [timer, setTimer] = useState("00:30:00");
//   const UserData = useSelector((state) => state.userReducer);
//   const navigate = useNavigate();

//   const submit = (e) => {
//     e.preventDefault();
//     setPopup(true);
//   };

//   const submitAsessment = async () => {
//     const data = {
//       testId: test._id,
//       userId: UserData.id,
//       answers: answerScript,
//     };
//     const result = await axios.post(submitAPIurl, data);
//     if (result?.status === 200) {
//       navigate("/tests");
//     }
//   };

//   const handleViolation = () => {
//     setViolationCount((prev) => {
//       const newCount = prev + 1;
//       if (newCount < 5) {
//         setViolationPopup(true);
//       }
//       return newCount;
//     });

//     return violationCount + 1 >= 5; // return true if max violation reached
//   };

//   const handleViolationLimitExceeded = () => {
//     alert("Violation limit exceeded. Submitting your test.");
//     submitAsessment();
//   };

//   const formatTime = (secs) => {
//     const hrs = String(Math.floor(secs / 3600)).padStart(2, "0");
//     const mins = String(Math.floor((secs % 3600) / 60)).padStart(2, "0");
//     const secsPart = String(secs % 60).padStart(2, "0");
//     return `${hrs}:${mins}:${secsPart}`;
//   };

//   useEffect(() => {
//     setTimer(formatTime(timeLeft));
//     if (timeLeft <= 0) return;

//     const interval = setInterval(() => {
//       setTimeLeft((prev) => {
//         if (prev <= 1) {
//           clearInterval(interval);
//           return 0;
//         }
//         return prev - 1;
//       });
//     }, 1000);

//     return () => clearInterval(interval);
//   }, []);

//   useEffect(() => {
//     setTimer(formatTime(timeLeft));
//   }, [timeLeft]);

//   useEffect(() => {
//     async function fetchtest() {
//       const id = search.get("id");
//       const url = `http://localhost:3001/test/gettestbyID?id=${id}`;
//       const result = await axios.get(url);
//       setTest(result.data);
//     }
//     fetchtest();
//   }, []);

//   return (
//     <>
//       <div className={styles.box}>
//         <section>
//           <img src={img.proctoringimg} alt="" />
//           <h2>ProctorX</h2>
//         </section>
//         {test && (
//           <div>
//             <span>{test.subject}</span>
//             <p>{test.testName}</p>
//           </div>
//         )}
//         <div>
//           <span>Time Left</span>
//           <p>{timer}</p>
//         </div>
//         <div>
//           <span>Questions : </span>
//           <frame>
//             {test &&
//               test.questions.map((question, key) => (
//                 <a
//                   href={`#${question._id}`}
//                   className={
//                     answerScript[question._id] === undefined
//                       ? ""
//                       : styles.answered
//                   }
//                 >
//                   {key + 1}
//                 </a>
//               ))}
//           </frame>
//         </div>
//       </div>

//       <div className={styles.box}>
//         {test && (
//           <form onSubmit={submit} className={styles.mainbox}>
//             <center>
//               <h1>{test.testName}</h1>
//             </center>
//             <center>
//               <h3>Subject : {test.subject}</h3>
//             </center>
//             {test.questions.map((question, key) => (
//               <QuestionBox
//                 key={question._id}
//                 question={question}
//                 questionNo={key + 1}
//                 answerScript={answerScript}
//                 setAnswerScript={setAnswerScript}
//               />
//             ))}
//             <button type="submit">Submit</button>
//           </form>
//         )}
//       </div>

//       <div className={styles.box}>
//         <Camera
//           onViolation={handleViolation}
//           onViolationCountExceeded={handleViolationLimitExceeded}
//         />
//         <p className="text-red-600 mt-2">Violations: {violationCount} / 5</p>
//       </div>

//       {popup && (
//         <div className={styles.popup}>
//           <section>
//             <h1>Done with the test?</h1>
//             <Progress
//               totalquestions={test.questions.length}
//               answerlength={Object.keys(answerScript).length}
//             />
//             <p>Are you sure to submit your test?</p>
//             <div className={styles.buttons}>
//               <button onClick={() => setPopup(false)}>Cancel</button>
//               <button onClick={submitAsessment}>Submit</button>
//             </div>
//           </section>
//         </div>
//       )}

//       {violationPopup && (
//         <div className={styles.popup}>
//           <section>
//             <h2>Proctoring Violation</h2>
//             <p>Your face was not detected. Please stay focused on the screen.</p>
//             <div className={styles.buttons}>
//               <button onClick={() => setViolationPopup(false)}>Close</button>
//             </div>
//           </section>
//         </div>
//       )}
//     </>
//   );
// }




import axios from "axios";
import { useSearchParams, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import styles from "./asessment.module.css";
import Progress from "../global_components/Progress";
import { useSelector } from "react-redux";
import QuestionBox from "../global_components/QuestionBox";
import Camera from "./Camera";
import * as img from "../img/index";

const submitAPIurl = "http://localhost:3001/test/evaluate";

export default function Asessment() {
  const [test, setTest] = useState(null);
  const [popup, setPopup] = useState(false);
  const [violationPopup, setViolationPopup] = useState(false);
  const [violationCount, setViolationCount] = useState(0);
  const [violationMessage, setViolationMessage] = useState("");
  const [answerScript, setAnswerScript] = useState({});
  const [search] = useSearchParams();
  const [timeLeft, setTimeLeft] = useState(60 * 30);
  const [timer, setTimer] = useState("00:30:00");
  const UserData = useSelector((state) => state.userReducer);
  const navigate = useNavigate();

  const submit = (e) => {
    e.preventDefault();
    setPopup(true);
  };

  const submitAsessment = async () => {
    const data = {
      testId: test._id,
      userId: UserData.id,
      answers: answerScript,
    };
    const result = await axios.post(submitAPIurl, data);
    if (result?.status === 200) {
      navigate("/tests");
    }
  };

  const handleViolation = () => {
    setViolationCount((prev) => {
      const newCount = prev + 1;
      if (newCount < 5) {
        setViolationPopup(true);
      }
      return newCount;
    });

    return violationCount + 1 >= 5;
  };

  // New handler to receive violation messages from Camera component
  const handleViolationDetected = (message) => {
    setViolationMessage(message);
    setViolationPopup(true);
  };

  const handleViolationLimitExceeded = () => {
    alert("Violation limit exceeded. Submitting your test.");
    submitAsessment();
  };

  const formatTime = (secs) => {
    const hrs = String(Math.floor(secs / 3600)).padStart(2, "0");
    const mins = String(Math.floor((secs % 3600) / 60)).padStart(2, "0");
    const secsPart = String(secs % 60).padStart(2, "0");
    return `${hrs}:${mins}:${secsPart}`;
  };

  useEffect(() => {
    setTimer(formatTime(timeLeft));
    if (timeLeft <= 0) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setTimer(formatTime(timeLeft));
  }, [timeLeft]);

  useEffect(() => {
    async function fetchtest() {
      const id = search.get("id");
      const url = `http://localhost:3001/test/gettestbyID?id=${id}`;
      const result = await axios.get(url);
      setTest(result.data);
    }
    fetchtest();
  }, []);

  return (
    <>
      <div className={styles.box}>
        <section>
          <img src={img.proctoringimg} alt="" />
          <h2>ProctorX</h2>
        </section>
        {test && (
          <div>
            <span>{test.subject}</span>
            <p>{test.testName}</p>
          </div>
        )}
        <div>
          <span>Time Left</span>
          <p>{timer}</p>
        </div>
        <div>
          <span>Questions : </span>
          <frame>
            {test &&
              test.questions.map((question, key) => (
                <a
                  href={`#${question._id}`}
                  className={
                    answerScript[question._id] === undefined
                      ? ""
                      : styles.answered
                  }
                  key={question._id}
                >
                  {key + 1}
                </a>
              ))}
          </frame>
        </div>
      </div>

      <div className={styles.box}>
        {test && (
          <form onSubmit={submit} className={styles.mainbox}>
            <center>
              <h1>{test.testName}</h1>
            </center>
            <center>
              <h3>Subject : {test.subject}</h3>
            </center>
            {test.questions.map((question, key) => (
              <QuestionBox
                key={question._id}
                question={question}
                questionNo={key + 1}
                answerScript={answerScript}
                setAnswerScript={setAnswerScript}
              />
            ))}
            <button type="submit">Submit</button>
          </form>
        )}
      </div>

      <div className={styles.box}>
        <Camera
          onViolation={handleViolation}
          onViolationCountExceeded={handleViolationLimitExceeded}
          onViolationDetected={handleViolationDetected} // pass the new callback here
        />
        <p className="text-red-600 mt-2">Violations: {violationCount} / 5</p>
      </div>

      {popup && (
        <div className={styles.popup}>
          <section>
            <h1>Done with the test?</h1>
            <Progress
              totalquestions={test.questions.length}
              answerlength={Object.keys(answerScript).length}
            />
            <p>Are you sure to submit your test?</p>
            <div className={styles.buttons}>
              <button onClick={() => setPopup(false)}>Cancel</button>
              <button onClick={submitAsessment}>Submit</button>
            </div>
          </section>
        </div>
      )}

      {violationPopup && (
        <div className={styles.popup}>
          <section>
            <h2>Proctoring Violation</h2>
            <p>{violationMessage || "Your face was not detected. Please stay focused on the screen."}</p>
            <div className={styles.buttons}>
              <button onClick={() => setViolationPopup(false)}>Close</button>
            </div>
          </section>
        </div>
      )}
    </>
  );
}
