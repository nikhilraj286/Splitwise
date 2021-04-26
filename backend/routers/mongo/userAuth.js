const express = require('express');
const app = require('../../app');
const User = require('../../models/mongo/User')
const passwordHash = require('password-hash');
const jwt = require('jsonwebtoken');
const { secret } = require('../../Utils/config');
const { auth } = require("../../utils/passport");
auth();

const router = express.Router();

app.post('/login', async (req,res) => {
    try {
        const user = await User.findOne({ email: req.body.email})
        if (user === null) {
            return res.status(404).send("User not found!");
        }
        if (passwordHash.verify(req.body.password, user.password)) {
            const payload = { user_id: user._id, full_name: user.full_name, email: user.email}
            const token = jwt.sign(payload, secret)
            return res.status(200).send("JWT " + token);
        }
        return res.status(401).send("Invalid username of password");
    }
    catch (err) {
        return res.status(400).send(err)
    }
    return res.status(500).send("Internal Server Error!");
});

app.post('/signup', async (req, res) => {
    const user = new User({
        email: req.body.email,
        password: passwordHash.generate(req.body.password),
        full_name: req.body.full_name,
        phone: 'none',
        currency: "USD",
        time_zone: "-8",
        language: "EN",
        profile_picture: 'default.png'
    })
	try {
		await user.save()
        const payload = { user_id: user._id, full_name: user.full_name, email: user.email}
        const token = jwt.sign(payload, secret)
        return res.status(200).send("JWT " + token);
	} catch (error) {
        return res.status(400).send("User already registered with this email id. Login to continue.")
	}
});

module.exports = router;