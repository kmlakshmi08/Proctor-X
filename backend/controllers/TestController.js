const ReportsController = require("./ReportsController");
const TestSchema = require("../models/testSchema");
const ReportSchema = require("../models/userTestSchema");

const getAll = async () => {
    try {
        const tests = await TestSchema.find();
        return tests;
    } catch (error) {
        throw new Error("Error while fetching All Tests details.")
    }
};

const getTestByID = async (id) => {
    try {
        const tests = await TestSchema.findOne({ _id: id });
        if (!tests) {
            throw new Error("No tests for this id exists.")
        }
        return tests
    } catch (error) {
        throw new Error("Error fetching tests.")
    }
}

const addTest = async (testName, subject, questions) => {
    try {
        const existingTest = await TestSchema.findOne({ testName, subject });
        if (!testName || ! !subject || !questions) {
            throw new Error("Either TestName,Subject or questions is missing.")
        }
        if (existingTest) {
            return res.status(400).json({ message: "Test already exists." });
        }
        const newTest = new Test({ testName, subject, questions });
        const result = await newTest.save();
        return result
    } catch (error) {
        throw new Error("Error saving test.")
    }
}

const getTestsByUser = async (username) => {
    try {
        let tests = await getAll();
        const AttemptedTests = await ReportsController.getAllAttemptedTestsByUsername(username)
        let result = []
        tests.forEach((test,key)=>{
            let updatedTest = {
                _id: test.id,
                testName: test.testName,
                subject: test.subject,
                questions: test.questions,
                attempted: false
            }
            if(AttemptedTests.includes((test._id).toString())){
                updatedTest.attempted = true
            }
            result.push(updatedTest);
        })
        console.log("Final tests returned : ",result)
        return result
    } catch (error) {
        throw new Error("Error fetching tests.")
    }
}

const evaluate = async (testId, userId, answers) => {
    try {
        const cheated = false;
        const test = await TestSchema.findById(testId);
        if (!test) {
            throw new Error("Test not found")
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

        const report = new ReportSchema({
            userId,
            testId,
            marksObtained: score,
            totalMarks: test.questions.length,
            answeredQuestions,
            cheated
        });

        const savedReport = await report.save();
        return savedReport;
    } catch (error) {
        throw new Error("Unknown error while evaluation.")
    }
}

module.exports = {
    getAll,
    getTestByID,
    addTest,
    getTestsByUser,
    evaluate
}