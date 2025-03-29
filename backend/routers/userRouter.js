const express = require("express");
const router = express.Router();
const userSchema = require('../models/userSchema');

router.get('/', async (req, res) => {
    try {
        const data = await userSchema.find();
        res.status(200).json(data);
    }
    catch {
        res.status(500).send("Error in finding user data.")
    }
})
router.post('/adduser', async (req, res) => {
    const data = req.body;
    const newUser = new userSchema({
        name:data.name,
        password:data.password
    })
    try {
        const result=await newUser.save();
        return result.status(200).json(data); // edit this
    }
    catch {
        res.status(500).send("Error in finding user data.")
    }
})

module.exports = router;