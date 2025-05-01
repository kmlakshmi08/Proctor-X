const ReportSchema = require("../models/userTestSchema");
const { getUserIdByUsername } = require("./UserController")

const getAllreports = async () => {
    try {
        const reports = await ReportSchema.find();
        return reports;
    } catch (error) {
        throw new Error(error.message)
    }
}

// const getallReportsByUser = async (username) => {
//     if (!username) {
//         throw new Error("Username is missing.")
//     }
//     try {
//         const user = await getUserIdByUsername(username)
//         const reports = await ReportSchema.find({ userId: user._id });
//         return reports
//     } catch (error) {
//         throw new Error(error.message)
//     }
// }


const getallReportsByUser = async (username) => {
    if (!username) {
        throw new Error("Username is missing.");
    }
    try {
        const user = await getUserIdByUsername(username);
        const reports = await ReportSchema.find({ userId: user._id })
            .populate({
                path: 'testId',
                select: 'testName subject' // include testName and subject only
            });

        return reports;
    } catch (error) {
        throw new Error(error.message);
    }
}

const getReportById = async (reportId) => {
    try {
        const report = await ReportSchema.findById(reportId).populate({
            path: 'testId',
            select: 'testName subject'
        });
        return report;
    } catch (error) {
        throw new Error(error.message);
    }
};


const getAllAttemptedTestsByUsername = async (username) => {
    if (!username) {
        throw new Error("Username is missing.")
    }
    try {
        const user = await getUserIdByUsername(username)
        const reports = await ReportSchema.find({ userId: user._id }).select("testId");
        const AttemptedTests = reports.map(report => report.testId);
        return AttemptedTests
    } catch (error) {
        console.log(error)
        throw new Error(error.message)
    }
}
const deleteAllReportsByUsername = async (username) => {
    if (!username) {
        throw new Error("Username is missing.")
    }
    try {
        const user = await getUserIdByUsername(username)
        const deleted = await ReportSchema.deleteMany({ userId: user._id });
        return {msg: `Successfully deleted all Reports for User ${username}.`}
    } catch (error) {
        throw new Error(error.message)
    }
}

module.exports = {
    getAllreports,
    getallReportsByUser,
    getAllAttemptedTestsByUsername,
    deleteAllReportsByUsername,
    getReportById
}