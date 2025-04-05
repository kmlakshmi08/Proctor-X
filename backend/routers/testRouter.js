const express = require("express");
const router = express.Router();
const Test = require("../models/testSchema");
const Report = require("../models/userTestSchema");

router.get("/", async (req, res) => {
    try {
        const tests = await Test.find();
        res.status(200).json(tests);
    } catch (error) {
        res.status(500).send("Error fetching tests.");
    }
});

router.get("/gettestbyID", async (req, res) => {
    const id = req.query.id
    try {
        console.log("Request : ",req)
        console.log("Request query : ",id)
        const tests = await Test.findOne({_id : id});
        res.status(200).json(tests);
    } catch (error) {
        res.status(500).send("Error fetching tests.");
    }
});

router.post("/addtest", async (req, res) => {
    try {
        const { testName, subject, questions } = req.body;
        const existingTest = await Test.findOne({ testName, subject });

        if (existingTest) {
            return res.status(400).json({ message: "Test already exists." });
        }

        const newTest = new Test({ testName, subject, questions });
        const result = await newTest.save();
        res.status(201).json(result);
    } catch (error) {
        res.status(500).send("Error saving test.");
    }
});

router.post("/evaluate", async (req, res) => {
    try {
        const { testId, answers } = req.body; 

        const test = await Test.findById(testId);

        let score = 0;
        let totalQuestions = test.questions.length;
        test.questions.forEach((question) => {
            if (answers[question._id] === question.correctAnswer) {
                score++;
            }
        });

        res.status(200).json({
            message: "Evaluation completed.",
            score,
        });
    } catch (error) {
        res.status(500).send("Error evaluating answers.");
    }
});


router.get("/getallReportsByUser", async (req, res) => {
    const userId = req.query.userId;

    if (!userId) {
        return res.status(400).json({ message: "User ID is required." });
    }

    try {
        const reports = await Report.find({ userId })
            .populate("testId") 
            .exec();

        res.status(200).json(reports);
    } catch (error) {
        console.error("Error fetching reports:", error);
        res.status(500).send("Error fetching reports for user.");
    }
});

module.exports = router;
