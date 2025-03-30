import React, { useEffect, useState } from "react";
import styles from "./login.module.css"
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import * as img from "../img/index"

const url = "http://localhost:3001/login/userlogin"

export default function Login() {
    const navigate = useNavigate();
    const [msg,setMsg] = useState("");
    const [formdata, setFormData] = useState({
        username: "",
        password: "",
    })
    const submit = async (e) => {
        e.preventDefault();
        try {
            const result = await axios.post(url, formdata)
            if(result.data?.error){
                setMsg(result.data.error);
            }
            else if(result.data?.message){
                navigate("/home")
            }
            console.log(result)
        }
        catch (err) {
            console.error(err)
        }
    }
    const handlechange = (e, type) => {
        setFormData((prevvalue) => ({
            ...prevvalue,
            [type]: e.target.value
        }))
    }
    useEffect(() => {
        console.log(formdata)
    }, [formdata])
    return (
        <>
            <div className={styles.signup}>
                <form className={styles.singupform}>
                    <h1>Welcome Back</h1>
                    <input placeholder="username" type="text" value={formdata.username} onChange={(e) => { handlechange(e, "username") }} />
                    <input placeholder="password" type="password" value={formdata.password} onChange={(e) => { handlechange(e, "password") }} />
                    {
                        msg === "" ?
                        null:
                        <><span>{msg}</span></>
                    }
                    <a href="/">Don't have an account yet?</a>
                    <button onClick={submit}>Submit</button>
                </form>
            </div>
        </>
    )
}