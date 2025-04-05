const mongoose = require("mongoose");

const userTestSchema = new mongoose.Schema({
    userId: {
        type: String,
        ref: "usersignup",
        required: true
    },
    testId: {
        type: String,
        ref: "testquestions",
        required: true
    },
    marksObtained: {
        type: Number,
        required: true
    },
    totalMarks: {
        type: Number,
        required: true
    },
    answeredQuestions: {
        type: Number,
        required: true
    },
    cheated: {
        type: Boolean,
        required: true
    }
});

module.exports = mongoose.model("report", userTestSchema);