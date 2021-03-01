const Sequelize = require('sequelize/types');
const sequelize = require('../db/SQL');

const Expense = sequelize.define('expense', {
	groupId: {
		type: Sequelize.INTEGER,
		allowNull: false,
	},
	paidBy: {
		type: Sequelize.INTEGER,
		allowNull: false,
	},
	amount: {
		type: Sequelize.FLOAT,
	},
	desc: {
		type: Sequelize.STRING,
	},
	date_paid: {
		type: Sequelize.DATE,
		allowNull: false,
	},
	expesnseType: {
		type: Sequelize.STRING,
	},
});

module.exports = Expense;
