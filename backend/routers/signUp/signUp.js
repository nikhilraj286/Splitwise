const express = require('express');
const sequelize = require('../../db/SQL');
const User = require('../../mysqlModels/User');

const router = express.Router();

router.post('/', async (req, res) => {
	const transaction = await sequelize.transaction();
	try {
		const user = await User.create({
			email: req.body.email,
			password: req.body.password,
			fullName: req.body.fullName
		}, { transaction: transaction })
		transaction.commit();
		return res.status(200).send(user)
	} catch (error) {
		console.log(error);
		transaction.rollback();
	}
	return res.status(500).send("Internal Service Error!")
});

module.exports = router;
