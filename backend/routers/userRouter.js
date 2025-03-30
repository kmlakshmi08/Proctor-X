const express = require("express");
const router = express.Router();
const userSchema = require('../models/userSchema');

router.get('/', async (req, res) => {
    try {
        const data = await userSchema.find();
        res.status(200).json(data);
    } catch (error) {
        res.status(500).send("Error in finding user data.");
    }
});

router.get('/getuserbyid', async (req, res) => {
    const {username} = req.query;
    try {
        const data = await userSchema.findOne({username});
        res.status(200).json(data);
    } catch (error) {
        res.status(500).send("Error in finding user data.");
    }
});

router.post('/adduser', async (req, res) => {
    try {
        const { username, password, photo } = req.body;
        const existingUser = await userSchema.findOne({ username });
        if (existingUser) {
            return res.status(200).json({ error: "User already exists" });
        }

        const newUser = new userSchema({
            username,
            password,
            photo
        });
        
        const result = await newUser.save();
        console.log(result);
        return res.status(201).json({ message: "User created successfully", user: result });

    } catch (error) {
        console.log(error)
        res.status(500).json({ error: error });
    }
});


router.post("/userlogin", async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await userSchema.findOne({ username });
        if (!user) {
            return res.status(400).json({ error: "User not found" });
        }

        if (password == user.password) {
            return res.status(200).json({ message: "Login successful", user });
        }
        else {
            return res.status(200).json({ error: "Invalid password" });
        }
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = router;
