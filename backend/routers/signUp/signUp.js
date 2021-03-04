const express = require('express');
const sequelize = require('../../db/SQL');
const User = require('../../mysqlModels/User');
const app = require('../../app');

const router = express.Router();

app.post('/signup', async (req, res) => {
	console.log("Inside Sign up Post Request");
	console.log("Req Body : ", req.body);
	const transaction = await sequelize.transaction();
	try {
		const user = await User.create({
			email: req.body.email,
			password: req.body.password,
			fullName: req.body.fullName
		}, { transaction: transaction })
		transaction.commit();
		res.cookie('cookie', "admin", { maxAge: 900000, httpOnly: false, path: '/' });
		req.session.user = user;
		return res.status(200).send(user)
	} catch (error) {
		console.log(error);
		transaction.rollback();
	}
	return res.status(500).send("Internal Server Error!");
});

module.exports = router;