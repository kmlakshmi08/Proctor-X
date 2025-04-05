import React, { useEffect, useState } from "react";
import styles from "./login.module.css"
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import * as actions from "../store/types"
import * as img from "../img/index"

const url = "http://localhost:3001/login/userlogin"

export default function Login() {
    const navigate = useNavigate();
    const [ShowPassword, setShowPassword] = useState(false);
    const dispatch = useDispatch();
    const [msg, setMsg] = useState("");
    const [formdata, setFormData] = useState({
        username: "",
        password: "",
    })
    const submit = async (e) => {
        e.preventDefault();
        try {
            const result = await axios.post(url, formdata)
            if (result.data?.message) {
                dispatch({ type: actions.SETUSER, payload: { username: result.data.user.username, photo: result.data.user.photo } })
                navigate("/home")
            }
            console.log(result)
        }
        catch (err) {
            if (err.response.data?.error) {
                setMsg(err.response.data.error);
            }
            console.error(err)
        }
    }
    const handlechange = (e, type) => {
        setFormData((prevvalue) => ({
            ...prevvalue,
            [type]: e.target.value
        }))
    }
    const handleShowPasswordChange = (e) => {
        setShowPassword(e.target.checked)
    }
    useEffect(() => {
        console.log(formdata)
    }, [formdata])
    return (
        <>
            <div className={styles.signup}>
                <section>
                    <form className={styles.singupform}>
                        <h1>Welcome Back</h1>
                        <input placeholder="Username" type="text" value={formdata.username} onChange={(e) => { handlechange(e, "username") }} />
                        <input placeholder="Password" type={ShowPassword? "text":"password"} value={formdata.password} onChange={(e) => { handlechange(e, "password") }} />
                        {
                            msg === "" ?
                                null :
                                <><span>{msg}</span></>
                        }
                        <input type="checkbox" id="checkbox1" onChange={handleShowPasswordChange} style={{ display: "none" }} />
                        <label htmlFor="checkbox1" className={styles.label}>
                            <img src={ShowPassword ? img.hide : img.view} alt="" /><h6>{ShowPassword ? "Hide" : "Show"} Password</h6>
                        </label>
                        <a href="/">Don't have an account yet?</a>
                        <button onClick={submit}>Submit</button>
                    </form>
                </section>
            </div>
        </>
    )
}