const express = require('express');
const chalk = require('chalk');
// const db = require('../../db/Mongo');
const app = require('../../app');
const User = require('../../models/mongo/User')
const passwordHash = require('password-hash');

const router = express.Router();

app.post('/login', async (req,res) => {
    console.log(chalk.blue("Inside Login Post Request"));
    // var res = {}
    try {
        const user = await User.findOne({ email: req.body.email})
        // .lean().then(result => {console.log(result[0].language)})
        // console.log(user.dataValues.password);
        // console.log(req.body.password)
        // console.log(user)
        if (user === null) {
            return res.status(404).send("User not found!");
        }
        if (passwordHash.verify(req.body.password, user.password)) {
            // req.session.user = user;
            console.log(chalk.green('login successful'))
            let output = {}
            output._id = user._id
            output.user_id = user._id
            output.currency = user.currency
            output.language = user.language
            output.email = user.email
            output.full_name = user.full_name
            output.phone = user.phone
            output.profile_picture = user.profile_picture
            output.time_zone = user.time_zone
            return res.status(200).send(output);
        }
        console.log(chalk.red('login unsuccessful'))
        return res.status(401).send("Invalid username of password");
    }
    catch (err) {
        console.log(err);
    }
    return res.status(500).send("Internal Server Error!");
});

app.post('/signup', async (req, res) => {
	console.log("Inside Sign up Post Request");
    const user = new User({
        email: req.body.email,
        password: passwordHash.generate(req.body.password),
        full_name: req.body.full_name,
        phone: 'none',
        currency: "USD",
        time_zone: "-8",
        language: "EN",
        profile_picture: 'default.png'
    }, 'full_name email _id group_list currency time_zone language phone profile_picture')
	try {
		await user.save()
        console.log('sign up successful')
        let output = {}
        output._id = user._id
        output.user_id = user._id
        output.currency = user.currency
        output.language = user.language
        output.email = user.email
        output.full_name = user.full_name
        output.phone = user.phone
        output.profile_picture = user.profile_picture
        output.time_zone = user.time_zone
		return res.status(200).send(output)
	} catch (error) {
		console.log(error);
        return res.status(400).send("User already registered with this email id. Login to continue.")
	}
	// return res.status(500).send("Internal Server Error!");
});

module.exports = router;