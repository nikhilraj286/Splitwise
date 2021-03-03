const Sequelize = require('sequelize');
const sequelize = require('../db/SQL');

const Transaction = sequelize.define('transaction', {
	groupId: {

		type: Sequelize.INTEGER,
		allowNull: false,
	},
	paidBy: {
		type: Sequelize.INTEGER,
		allowNull: false,
	},
	paidTo: {
		type: Sequelize.INTEGER,
		allowNull: false,
	},
	amount: {
		type: Sequelize.FLOAT,
		allowNull: false,
	},
	paymentStatus: {
		type: Sequelize.STRING,
		allowNull: false,
	},
});

module.exports = Transaction;
