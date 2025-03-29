const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
    question: {
        type: String,
        required: true
    },
    options: {
        type: [String],  
        required: true,
    },
    correctAnswer: {
        type: String,
        required: true
    }
});

const testSchema = new mongoose.Schema({
    testName: {
        type: String,
        required: true
    },
    subject: {
        type: String,
        required: true
    },
    questions: {
        type: [questionSchema], 
        required: true,
    }
});

module.exports = mongoose.model("testquestions", testSchema);
