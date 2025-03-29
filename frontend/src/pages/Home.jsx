import React, { useEffect, useState } from "react";
import styles from "./home.module.css"
import * as img from "../img/index"

import axios from 'axios'

const url = "http://localhost:3001/login/adduser"

export default function Home() {
    const [formdata, setFormData] = useState({
        username: "",
        password: "",
        image: ""
    })

    const submit = async () => {
        try {
            await axios.post(url, formdata)
            console.log("Data successfully added.")
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
    // useEffect(() => {
    //     console.log(formdata)
    // }, [formdata])
    const handleFile = async (e) => {
        const file = await convertToB64(e.target.files[0])
        setFormData((prevvalue) => ({
            ...prevvalue,
            ["image"]: file
        }))
        console.log(file)
    }
    return (
        <>
            <div className={styles.mainbox}>
                <section>
                    <h1>ONLINE PROCTORING SYSTEM</h1>
                </section>
                <form onSubmit={submit}>
                    <input type="text" value={formdata.username} onChange={(e) => { handlechange(e, "username") }} />
                    <input type="password" value={formdata.password} onChange={(e) => { handlechange(e, "password") }} />
                    <input
                        type="file"
                        lable="Image"
                        name="myFile"
                        id="file-upload"
                        accept=".jpeg, .jpg, .png"
                        onChange={handleFile}
                    />

                    <button type="submit">Submit</button>
                </form>
            </div>
        </>
    )
}

function convertToB64(file) {
    return new Promise((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);
        fileReader.onload = () => {
            resolve(fileReader.result)
        };
        fileReader.onerror = (error) => {
            reject(error)
        }
    })
} 