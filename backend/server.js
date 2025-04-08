const express = require("express")
const mongoose = require("mongoose")
const cors = require('cors');
const app = express()

mongoose.connect('mongodb+srv://pruthvi2003kp:d3cu4Byk1bxuW3ri@onlineproctoring.0nq6r.mongodb.net/OnlineProctoring')
    .then(() => {
        console.log("Database Connected");
        app.listen(3001, () => {
            console.log("Server running in port 3001.")
        })
    }).catch((err) => {
        console.log("Error in connecting DB", err);
    });

const userRouter=require("./routers/userRouter.js");
const testRouter=require("./routers/testRouter.js");
const reportRouter=require("./routers/ReportRouter.js");

app.use(cors());
app.use(express.json());
app.use('/login',userRouter);
app.use('/test',testRouter);
app.use('/report',reportRouter);