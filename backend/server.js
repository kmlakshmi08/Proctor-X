const express = require("express")
const mongoose = require("mongoose")
const cors = require('cors');
const app = express()

mongoose.connect('mongodb+srv://pruthvi2003kp:d3cu4Byk1bxuW3ri@onlineproctoring.0nq6r.mongodb.net/?retryWrites=true&w=majority&appName=OnlineProctoring')
    .then(() => {
        console.log("Database Connected");
        app.listen(3001, () => {
            console.log("Server running.")
        })
    }).catch((err) => {
        console.log("Error in connecting DB", err);
    });

app.use(cors());
app.use(express.json());