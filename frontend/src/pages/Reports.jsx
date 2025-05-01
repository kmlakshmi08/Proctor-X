import React, { useEffect, useState } from "react";
import styles from "./reports.module.css";
import Navbar from "./Navbar";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";


const url = "http://localhost:3001/report/getallReportsByUser";

export default function Reports() {
    const [reports, setReports] = useState([]);
    const theme = useSelector((state) => state.themeReducer.mode);
    const UserData = useSelector((state) => state.userReducer);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchReports = async () => {
            try {
                if (!UserData.username) return;
                const response = await axios.post(url, {
                    username: UserData.username,
                });
                setReports(response.data);
            } catch (error) {
                console.error("Error fetching reports:", error);
            }
        };

        fetchReports();
    }, [UserData.username]);

    return (
        <>
            <Navbar />
            <div
                className={styles.container}
                data-theme={theme === "light" ? "" : "dark"}
            >
                
                <div className={styles.sidebar}>
                    <h2 className={styles.heading}>Results</h2>
                    <h3>Select a test to view details</h3>

                    <div className={styles.cardsContainer}>
                        {reports.map((report) => (
                            <div
                                key={report._id}
                                className={styles.card}
                                onClick={() => navigate(`/report/${report._id}`)}
                            >
                                {report.testId?.testName || "Unnamed Test"}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}
