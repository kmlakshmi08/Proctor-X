import React, { useEffect, useState } from "react";
import styles from "./login.module.css"
import axios from 'axios'
import { convertToB64 } from "./utils.js"
import { useNavigate } from "react-router-dom";
import * as img from "../img/index"

const url = "http://localhost:3001/login/adduser"

export default function Signup() {
    const navigate = useNavigate();
    const [msg, setMsg] = useState("");
    const [ShowPassword, setShowPassword] = useState(false);
    const [formdata, setFormData] = useState({
        username: "",
        password: "",
        confirmpassword: "",
        photo: ""
    })
    const submit = async (e) => {
        e.preventDefault();
        try {
            if (formdata.username === "" || formdata.password === "" || formdata.photo === "") {
                setMsg("Please enter all details.")
                return
            }
            if (formdata.password !== formdata.confirmpassword) {
                setMsg("Password and confirm password do not match.")
                return
            }
            const result = await axios.post(url, formdata)
            if (result.data.message) {
                navigate("/home")
            }
            else if (result.data.error) {
                setMsg(result.data.error)
            }
        }
        catch (err) {
            console.log("Status code : ", err.status)
            setMsg("Please upload an image smaller than 100kb.")
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
    const handleFile = async (e) => {
        const file = await convertToB64(e.target.files[0])
        setFormData((prevvalue) => ({
            ...prevvalue,
            ["photo"]: file
        }))
        console.log(file)
    }
    return (
        <>
            <div className={styles.signup}>
                <section>
                    <form className={styles.singupform}>
                        <h1>Welcome</h1>
                        <input placeholder="username" type="text" value={formdata.username} onChange={(e) => { handlechange(e, "username") }} />
                        <input placeholder="password" type={ShowPassword? "text":"password"} value={formdata.password} onChange={(e) => { handlechange(e, "password") }} />
                        <input placeholder="confirm password" type={ShowPassword? "text":"password"} value={formdata.confirmpassword} onChange={(e) => { handlechange(e, "confirmpassword") }} />
                        <input
                            type="file"
                            lable="Image"
                            name="myFile"
                            id="file-upload"
                            accept=".jpeg, .jpg, .png"
                            onChange={handleFile}
                        />
                        <input type="checkbox" id="checkbox" onChange={handleShowPasswordChange} style={{display:"none"}}/>
                        <label htmlFor="checkbox" className={styles.label}>
                            <img src={ShowPassword? img.hide: img.view} alt="" /><h6>{ShowPassword? "Hide": "Show"} Password</h6>
                        </label>
                        <label htmlFor="file-upload">
                            <p>Upload Profile Photo</p>
                        </label>
                        {
                            msg === "" ?
                                null :
                                <><span>{msg}</span></>
                        }
                        <a href="/login">Already have an account?</a>
                        <button onClick={submit}>Submit</button>
                    </form>
                </section>
            </div>
        </>
    )
}