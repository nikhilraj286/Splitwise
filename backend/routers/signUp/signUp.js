const express = require('express');
const sequelize = require('../../db/SQL');
const db = require('../../models');
const app = require('../../app');

const router = express.Router();

app.post('/signup', async (req, res) => {
	console.log("Inside Sign up Post Request");
	console.log("Req Body : ", req.body);
	const transaction = await sequelize.transaction();
	try {
		const user = await db.User.create({
			email: req.body.email,
			password: req.body.password,
			full_name: req.body.full_name,
			phone: "",
			currency: "USD",
			time_zone: "",
			language: "English",
			profile_picture: ""
		}, { transaction: transaction })
		transaction.commit();
		req.session.user = user;
		return res.status(200).send(user)
	} catch (error) {
		console.log(error);
		transaction.rollback();
	}
	return res.status(500).send("Internal Server Error!");
});

module.exports = router;