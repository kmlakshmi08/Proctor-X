import React, { useEffect, useState } from "react";
import styles from "./login.module.css"
import axios from 'axios'
import {convertToB64} from "./utils.js"
import { useNavigate } from "react-router-dom";
import * as img from "../img/index"

const url = "http://localhost:3001/login/adduser"

export default function Signup() {
    const navigate = useNavigate();
    const [formdata, setFormData] = useState({
        username: "",
        password: "",
        confirmpassword: "",
        photo: ""
    })
    const submit = async (e) => {
        e.preventDefault();
        try {
            if(formdata.username === "" || formdata.password === "" || formdata.photo === ""){
                alert("Please fill in all the details.")
                return
            }
            if(formdata.password !== formdata.confirmpassword){
                alert("Password and Confirm password do not match.")
                return
            }
            const result = await axios.post(url, formdata)
            alert("Created user successfully")
            navigate("/home")
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
                <form className={styles.singupform}>
                    <h1>Welcome</h1>
                    <input placeholder="username" type="text" value={formdata.username} onChange={(e) => { handlechange(e, "username") }} />
                    <input placeholder="password" type="password" value={formdata.password} onChange={(e) => { handlechange(e, "password") }} />
                    <input placeholder="confirm password" type="password" value={formdata.confirmpassword} onChange={(e) => { handlechange(e, "confirmpassword") }} />
                    <input
                        type="file"
                        lable="Image"
                        name="myFile"
                        id="file-upload"
                        accept=".jpeg, .jpg, .png"
                        onChange={handleFile}
                    />
                    <button onClick={submit}>Submit</button>
                </form>
            </div>
        </>
    )
}