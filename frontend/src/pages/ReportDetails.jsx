import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "./Navbar";
import styles from "./reportDetails.module.css";
import { useSelector } from "react-redux";

export default function ReportDetails() {
    const { reportId } = useParams();
    const [report, setReport] = useState(null);
    const theme = useSelector((state) => state.themeReducer.mode);

    useEffect(() => {
        const fetchReport = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/report/${reportId}`);
                setReport(response.data);
            } catch (error) {
                console.error("Failed to fetch report:", error);
            }
        };

        fetchReport();
    }, [reportId]);

    return (
        <>
            <Navbar />
            <div className={styles.mainbox}>
            <div className={styles.details} data-theme={theme === "light" ? "" : "dark"}>
                {report ? (
                    <>
                        <h2 className={styles.heading}>Results</h2>
                        <p>Test: {report.testId?.testName || "Unnamed Test"} - {report.testId.subject}</p>
                        <p>Total questions: {report.totalMarks}</p>
                        <p>Marks obtained: {report.marksObtained}/{report.totalMarks}</p>
                       
                        <p>Answered: {report.answeredQuestions}</p>
                        <p>Unanswered: {report.totalMarks - report.answeredQuestions}</p>
                    </>
                ) : (
                    <p>Loading...</p>
                )}
            </div>
            </div>
            
        </>
    );
}
