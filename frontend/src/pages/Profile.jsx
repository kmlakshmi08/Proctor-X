// src/components/Profile.jsx
import React from "react";
import styles from "./profile.module.css";
import { useSelector } from "react-redux";
import Navbar from "./Navbar";

export default function Profile() {
    const theme = useSelector((state)=> state.themeReducer.mode)
    const UserData = useSelector((state) => state.userReducer);
    return (
        <>
            <Navbar></Navbar>
            <div className={styles.profileContainer} data-theme={`${theme === "light" ? "" : "dark"}`}>
                <h2>User Profile</h2>
                <img src={UserData.photo} alt="Profile" className={styles.profilePic} />
                <h3>{UserData.username}</h3>
            </div>
        </>

    );
}
