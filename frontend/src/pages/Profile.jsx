import React, { useState } from "react";
import styles from "./profile.module.css";
import { useSelector ,useDispatch} from "react-redux";
import Navbar from "./Navbar";
import axios from "axios";

export default function Profile() {
    const dispatch = useDispatch();
    const theme = useSelector((state)=> state.themeReducer.mode);
    const UserData = useSelector((state) => state.userReducer);

    const [editUsername, setEditUsername] = useState(false);
    const [editPassword, setEditPassword] = useState(false);
    const [newUsername, setNewUsername] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [message, setMessage] = useState("");

    const handleUsernameChange = async () => {
        try {
            const res = await axios.put("http://localhost:3001/profile/updateUsername", {
                username: UserData.username,
                newUsername,
            });
           
            const updatedUsername = res.data.data[0].newUsername;
            setMessage(res.data.data[0].message);
            dispatch({ type: "UPDATE_USERNAME", payload: updatedUsername });
            setEditUsername(false);
            setNewUsername("");
        } catch (err) {
            setMessage(err.response?.data?.error || "Failed to update username.");
        }
    };

    const handlePasswordChange = async () => {
        try {
            const res = await axios.put("http://localhost:3001/profile/updatePassword", {
                username: UserData.username,
                newPassword,
            });
            setMessage(res.data.data[0].message);
            dispatch({ type: "UPDATE_PASSWORD", payload: newPassword });
            setEditPassword(false);
            setNewPassword("");
        } catch (err) {
            setMessage(err.response?.data?.error || "Failed to update password.");
        }
    };

    return (
        <>
            <Navbar />
            <div className={styles.profileContainer} data-theme={`${theme === "light" ? "" : "dark"}`}>
                <h2 style={{color:theme==="dark"?"white":"black"}}>User Profile</h2>
                <div className={styles.profilePicWrapper}>
        <img src={UserData.photo} alt="Profile" className={styles.profilePic} />
    </div>

                <div className={styles.profileRow}>
                    <div className={styles.labelValue}>
                        <strong>Username:</strong>
                        {editUsername ? (
                            <input
                                type="text"
                                value={newUsername}
                                onChange={(e) => setNewUsername(e.target.value)}
                                placeholder="New username"
                            />
                        ) : (
                            <span>{UserData.username}</span>
                        )}
                    </div>
                    <div className={styles.editButtons}>
                        {editUsername ? (
                            <>
                                <button onClick={handleUsernameChange}>Save</button>
                                <button onClick={() => setEditUsername(false)}>Cancel</button>
                            </>
                        ) : (
                            <button onClick={() => setEditUsername(true)}>Change Username</button>
                        )}
                    </div>
                </div>

                <div className={styles.profileRow}>
                    <div className={styles.labelValue}>
                        <strong>Password:</strong>
                        {editPassword ? (
                            <input
                                type="password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                placeholder="New password"
                            />
                        ) : (
                            <span>••••••••</span>
                        )}
                    </div>
                    <div className={styles.editButtons}>
                        {editPassword ? (
                            <>
                                <button onClick={handlePasswordChange}>Save</button>
                                <button onClick={() => setEditPassword(false)}>Cancel</button>
                            </>
                        ) : (
                            <button onClick={() => setEditPassword(true)}>Change Password</button>
                        )}
                    </div>
                </div>

                {message && <p>{message}</p>}
            </div>
        </>
    );
}
