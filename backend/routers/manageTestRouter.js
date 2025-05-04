const express = require("express");
const router = express.Router();
const Test = require("../models/testSchema");

// Get all tests
router.get("/", async (req, res) => {
    const tests = await Test.find();
    res.json(tests);
});

// Add new test
router.post("/", async (req, res) => {
    const { testName, subject } = req.body;
    const test = new Test({ testName, subject, questions: [] });
    await test.save();
    res.json(test);
});

// Delete a test
router.delete("/:id", async (req, res) => {
    await Test.findByIdAndDelete(req.params.id);
    res.json({ message: "Test deleted" });
});


// Update test name and subject
router.put("/:id", async (req, res) => {
    const { testName, subject } = req.body;
    const test = await Test.findByIdAndUpdate(
        req.params.id,
        { testName, subject },
        { new: true }
    );
    if (!test) return res.status(404).json({ message: "Test not found" });
    res.json(test);
});


// Add a question to a test
router.post("/:id/questions", async (req, res) => {
    const test = await Test.findById(req.params.id);
    test.questions.push(req.body);
    await test.save();
    res.json(test);
});

// Delete a question from a test (by index)
router.delete("/:id/questions/:questionIndex", async (req, res) => {
    const { id, questionIndex } = req.params;
    const test = await Test.findById(id);
    if (!test) return res.status(404).json({ message: "Test not found" });

    test.questions.splice(questionIndex, 1);
    await test.save();
    res.json(test);
});

module.exports = router;
