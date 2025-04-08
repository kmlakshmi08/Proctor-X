const ReportSchema = require("../models/userTestSchema");
const UserController = require("./UserController")

const getAllreports = async () => {
    try {
        const reports = await ReportSchema.find();
        return reports;
    } catch (error) {
        throw new Error(error.message)
    }
}

const getallReportsByUser = async (username) => {
    if (!username) {
        throw new Error("Username is missing.")
    }
    try {
        const user = await UserController.getUserIdByUsername(username)
        const reports = await ReportSchema.find({ userId: user._id });
        return reports
    } catch (error) {
        throw new Error(error.message)
    }
}

const getAllAttemptedTestsByUsername = async (username) => {
    if (!username) {
        throw new Error("Username is missing.")
    }
    try {
        const user = await UserController.getUserIdByUsername(username)
        const reports = await ReportSchema.find({ userId: user._id }).select("testId");
        const AttemptedTests = reports.map(report => report.testId);
        return AttemptedTests
    } catch (error) {
        throw new Error(error.message)
    }
}

module.exports = {
    getAllreports,
    getallReportsByUser,
    getAllAttemptedTestsByUsername
}