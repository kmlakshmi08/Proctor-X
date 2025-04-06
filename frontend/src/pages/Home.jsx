import React from "react";
import styles from "./home.module.css";
import Navbar from "./Navbar";
import proctorImage from "../img/proctoringIllustration.png"; // Add a relevant image in img folder
import { useSelector } from "react-redux";

export default function Home() {
    const theme = useSelector((state) => state.themeReducer.mode);
    return (
        <>
            <Navbar />
            <div className={styles.mainbox} data-theme={`${theme === "light" ? "" : "dark"}`}>
                <div className={styles.heroSection}>
                    <div className={styles.left}>
                        <h1 className={styles.burstText}>ProctorX</h1>
                        <p>
                            ProctorX is a secure, AI-powered online proctoring system designed to
                            maintain academic integrity during remote exams. It monitors student activity
                            using smart features and provides comprehensive reports for educators.
                        </p>
                    </div>
                    <div className={styles.right}>
                        <img src={proctorImage} alt="Proctoring Illustration" />
                    </div>
                </div>

                <div className={styles.contact}>
                    <h3>Contact Us</h3>
                    <ul>
                        <li>
                            <p>Email: support@proctorsphere.com</p>
                        </li>
                        <li>
                            <p>Phone: +91 98765 43210</p>
                        </li>
                        <li>
                            <p>Address: 123 Proctor Lane, Tech City, India</p>
                        </li>
                    </ul>
                </div>
            </div>
        </>
    );
}
