// src/components/Profile.jsx
import React from "react";
import styles from "./profile.module.css";
import { useSelector } from "react-redux";
import Navbar from "./Navbar";

const url = "http://localhost:3001/profile"

export default function Profile() {
    const UserData = useSelector((state) => state.userReducer);
    
    return (
        <>
         <Navbar></Navbar>
        <div className={styles.profileContainer}>
            <h2>User Profile</h2>
            <img src={UserData.photo} alt="Profile" className={styles.profilePic} />
            <h3>{UserData.username}</h3>
        </div>
        </>
        
    );
}
