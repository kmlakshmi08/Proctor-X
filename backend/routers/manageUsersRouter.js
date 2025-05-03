const express = require("express");
const router = express.Router();
const User = require("../models/userSchema"); // assuming userSchema is in models/userSchema.js

// Get all users
router.get("/", async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: "Failed to fetch users" });
    }
});

// Delete a user by ID
router.delete("/:id", async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.json({ message: "User deleted" });
    } catch (err) {
        res.status(500).json({ message: "Failed to delete user" });
    }
});

// Toggle admin status (promote/demote)
router.patch("/:id/toggle-admin", async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ message: "User not found" });

        user.isadmin = !user.isadmin;
        await user.save();
        res.json({ message: `User admin status changed to ${user.isadmin}` });
    } catch (err) {
        res.status(500).json({ message: "Failed to update admin status" });
    }
});

module.exports = router;
