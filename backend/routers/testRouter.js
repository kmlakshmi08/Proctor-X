const express = require("express");
const router = express.Router();
const Test = require("../models/testSchema");

router.get("/", async (req, res) => {
    try {
        const tests = await Test.find();
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

module.exports = router;
