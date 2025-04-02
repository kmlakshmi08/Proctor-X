const mongoose = require("mongoose");

const userTestSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "usersignup", // References the user
        required: true
    },
    testId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "testquestions", // References the test
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
}, { timestamps: true });

module.exports = mongoose.model("userTest", userTestSchema);
