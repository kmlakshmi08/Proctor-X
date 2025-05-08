const express = require("express");
const router = express.Router();
const { UserController } = require("../controllers/index");

router.get('/', async (req, res) => {
    try {
        const result = await UserController.get();
        return res.status(200).json(result)
    }
    catch (err) {
        return res.status(500).json({ error: err })
    }
});
router.get('/getuserbyname', async (req, res) => {
    try {
        const result = await UserController.getuserbyname(req.query.username);
        return res.status(200).json(result)
    }
    catch (err) {
        return res.status(500).json({ error: err })
    }
});
router.post('/adduser', async (req, res) => {
    const { username, password, photo } = req.body;
    try {
        const result = await UserController.adduser(username, password, photo);
        return res.status(200).json(result)
    }
    catch (err) {
        return res.status(500).json({ error: err.message })
    }
});
router.post("/userlogin", async (req, res) => {
    const { username, password } = req.body;
    try {
        const result = await UserController.userlogin(username, password);
        return res.status(200).json(result)
    }
    catch (err) {
        return res.status(500).json({ error: err.message })
    }
});
router.get("/getUserIdByUserName", async (req, res) => {
    const { username } = req.body;
    try {
        const result = await UserController.getUserIdByUsername(username);
        return res.status(200).json(result._id)
    }
    catch (err) {
        return res.status(500).json({ error: err.message })
    }
});
router.get("/deleteUserByUsername", async (req, res) => {
    const { username } = req.body;
    try {
        const result = await UserController.getUserIdByUsername(username);
        return res.status(200).json(result)
    }
    catch (err) {
        return res.status(500).json({ error: err.message })
    }
});

router.put("/updateUsername", async (req, res) => {
    const { username, newUsername } = req.body;
    try {
        const result = await UserController.updateUsername(username, newUsername);
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.put("/updatePassword", async (req, res) => {
    const { username, newPassword } = req.body;
    try {
        const result = await UserController.updatePassword(username, newPassword);
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


module.exports = router;