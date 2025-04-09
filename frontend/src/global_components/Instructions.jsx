import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styles from "./instructions.module.css";

export default function Instructions() {
    const navigate = useNavigate();
    const query = new URLSearchParams(useLocation().search);
    const testId = query.get("id");

    const startTest = () => {
        navigate(`/asessment?id=${testId}`);
    };

    return (
        <div className={styles.wrapper}>
            <div className={styles.card}>
                <h1 className={styles.heading}>INSTRUCTIONS</h1>
                <ul className={styles.list}>
                    <li>
                        <strong>📋 Test Format and Rules</strong><br />
                        • Total Questions: 20<br />
                        • Time Allotted: 30 minutes<br />
                        • Each question carries 1 mark. No negative marking.<br />
                        • Do not refresh the page during the test.<br />
                        • Test will auto-submit when time is over.
                    </li>
                    <li>
                        <strong>🖥️ Technical and Device Requirements</strong><br />
                        • Use a Laptop or Desktop (mobile not recommended).<br />
                        • Ensure your laptop is fully charged or plugged in.<br />
                        • Connect to a stable and reliable internet network.<br />
                        • Use a regular browser window (not incognito/private).<br />
                        • Close all other browser tabs and windows before starting.<br />
                        • Use of Ad Blocker is recommended to avoid pop-ups.
                    </li>
                    <li>
                        <strong>🎥 Monitoring and Conduct</strong><br />
                        • Make sure your browser has access to webcam and microphone (if required).<br />
                        • Sit in a well-lit environment – your face must be clearly visible at all times.<br />
                        • Do not use calculators, phones, or any external aids unless allowed.
                    </li>
                    <li>
                        <strong>⚠️ Prohibited Actions</strong><br />
                        • Do not switch to any other window or tab once the test starts.<br />
                        • Avoid using keyboard shortcuts (e.g., Alt+Tab, Ctrl+C, Ctrl+V).<br />
                        • Right-clicking is not allowed.<br />
                        • Do not open browser developer tools (Inspect Element, Console, etc.).
                    </li>
                </ul>
                <div className={styles.buttonWrapper}>
                    <button onClick={startTest} className={styles.startButton}>
                        Start Test
                    </button>
                </div>
            </div>
        </div>
    );
}
