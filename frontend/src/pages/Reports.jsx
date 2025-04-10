import React, { useEffect, useState } from "react";
import styles from "./reports.module.css";
import Navbar from "./Navbar";
import axios from "axios";
import { useSelector } from "react-redux";

const url = "http://localhost:3001/report/getallReportsByUser";

export default function Reports() {
    const [reports, setReports] = useState([]);
    const theme = useSelector((state) => state.themeReducer.mode);
    const UserData = useSelector((state) => state.userReducer);
    console.log(UserData);
    useEffect(() => {
        const fetchReports = async () => {
            try {
                if (!UserData.username) {
                    console.error("Username is missing in UserData:", UserData);
                    return;
                }
                console.log(UserData.username);
                
                const response = await axios.post(url, {
                    username: UserData.username
                });
                
                setReports(response.data);
            } catch (error) {
                console.error("Error fetching reports:", error);
            }
        };

        if (UserData.username) {
            fetchReports();
        }
    }, [UserData.username]);

    return (
        <>
            <Navbar />
            <div className={styles.mainbox} data-theme={`${theme === "light" ? "" : "dark"}`}>
                <h1 className={styles.heading}>Your Reports</h1>
                <table className={styles.reportTable}>
                    <thead>
                        <tr>
                            <th>Test ID</th>
                            <th>Marks Obtained</th>
                            <th>Total Marks</th>
                            <th>Answered Questions</th>
                            <th>Cheated</th>
                        </tr>
                    </thead>
                    <tbody>
                        {reports.map((report) => (
                            <tr key={report._id}>
                                <td>{report.testId}</td>
                                <td>{report.marksObtained}</td>
                                <td>{report.totalMarks}</td>
                                <td>{report.answeredQuestions}</td>
                                <td>{report.cheated ? "Yes" : "No"}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}
