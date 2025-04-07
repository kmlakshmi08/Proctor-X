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
        const { testId, userId, answers, cheated = false } = req.body;

        const test = await Test.findById(testId);
        if (!test) {
            return res.status(404).json({ message: "Test not found" });
        }

        let score = 0;
        let answeredQuestions = 0;

        test.questions.forEach((question) => {
            const userAnswer = answers[question._id];
            if (userAnswer !== undefined && userAnswer !== null) {
                answeredQuestions++;
                if (userAnswer === question.correctAnswer) {
                    score++;
                }
            }
        });

        const report = new Report({
            userId,
            testId,
            marksObtained: score,
            totalMarks: test.questions.length,
            answeredQuestions,
            cheated
        });

        const savedReport = await report.save();

        res.status(200).json({
            message: "Evaluation completed and report generated.",
            report: savedReport,
        });

    } catch (error) {
        console.error("Evaluation error:", error);
        res.status(500).send("Error evaluating answers and generating report.");
    }
});

// {
//     "testId": "67e803809e6c4251f7881adc",
//     "userId": "67e8afe7c0c91bc1ec3a38d8",
//     "answers": {
//       "67e803809e6c4251f7881add": "4",
//       "67e803809e6c4251f7881ade": "15",
//       "67e803809e6c4251f7881adf": "3"
//     },
//     "cheated": false
//   }
  

router.get("/getallReportsByUser", async (req, res) => {
    const userId = req.body.userId;

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
