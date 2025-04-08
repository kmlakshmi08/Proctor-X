const express = require("express");
const router = express.Router();
const { TestController, ReportsController } = require("../controllers/index")

router.get("/", async (req, res) => {
    try {
        const result = await TestController.getAll()
        return res.status(200).json(result)
    }
    catch (err) {
        return res.status(500).json({ error: err })
    }
});
router.get("/gettestbyID", async (req, res) => {
    const id = req.query.id
    try {
        const result = await TestController.getTestByID(id);
        return res.status(200).json(result)
    }
    catch (err) {
        return res.status(500).json({ error: err })
    }
});
router.post("/addtest", async (req, res) => {
    const { testName, subject, questions } = req.body;
    try {
        const result = await TestController.addTest(testName, subject, questions);
        return res.status(200).json(result)
    }
    catch (err) {
        return res.status(500).json({ error: err })
    }
});
router.post("/evaluate", async (req, res) => {
    const { testId, userId, answers } = req.body;
    try {
        const result = await TestController.evaluate(testId, userId, answers)
        return res.status(200).json({
            message: "Evaluation completed and report generated.",
            report: result
        })
    }
    catch (err) {
        return res.status(500).json({ error: err })
    }
});

module.exports = router;