import React from "react";
import styles from "./home.module.css";
import Navbar from "./Navbar";
import proctorImage from "../img/proctoringIllustration.png";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function Home() {
    const theme = useSelector((state) => state.themeReducer.mode);
    const navigate = useNavigate();

    return (
        <>
            <Navbar />
            <div className={styles.mainbox} data-theme={theme === "light" ? "" : "dark"}>
                <div className={styles.heroSection}>
                    <div className={styles.left}>
                        <h1 className={styles.burstText}>ProctorX</h1>
                        <p className={styles.description}>
                            ProctorX is a secure, AI-powered online proctoring system designed to uphold academic integrity during remote exams. With advanced monitoring features and comprehensive reports, educators can conduct fair assessments effortlessly.
                        </p>
                    </div>
                    <div className={styles.right}>
                        <img src={proctorImage} alt="Proctoring Illustration" className={styles.heroImage} />
                    </div>
                </div>

                <div className={styles.featuresSection}>
                    <h2>Why Choose ProctorX?</h2>
                    <div className={styles.featuresGrid}>
                        <div className={styles.featureCard}>
                            <h4>AI-Powered Monitoring</h4>
                            <p>Tracks suspicious behavior in real-time using advanced algorithms.</p>
                        </div>
                        <div className={styles.featureCard}>
                            <h4>Detailed Reports</h4>
                            <p>Generate comprehensive reports for every candidate post-exam.</p>
                        </div>
                        <div className={styles.featureCard}>
                            <h4>Secure & Scalable</h4>
                            <p>Built to handle exams at scale with end-to-end security.</p>
                        </div>
                    </div>
                </div>

                <div className={styles.contact}>
                    <h3>Contact Us</h3>
                    <ul>
                        <li><p>Email: support@proctorsphere.com</p></li>
                        <li><p>Phone: +91 98765 43210</p></li>
                        <li><p>Address: 123 Proctor Lane, Tech City, India</p></li>
                    </ul>
                </div>
            </div>
        </>
    );
}
