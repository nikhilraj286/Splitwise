const Sequelize = require('sequelize/types');
const sequelize = require('../db/SQL');

const User = sequelize.define('user', {
	userId: {
		type: Sequelize.INTEGER,
		allowNull: false,
		autoIncrement: true,
		primaryKey: true,
	},
	email: {
		type: Sequelize.STRING,
		allowNull: false,
	},
	password: {
		type: Sequelize.STRING.BINARY,
		allowNull: false,
	},
	fullName: {
		type: Sequelize.STRING,
		allowNull: false,
	},
	phone: {
		type: Sequelize.STRING,
	},
	currency: {
		type: Sequelize.STRING,
	},
	timeZone: {
		type: Sequelize.STRING,
	},
	language: {
		type: Sequelize.STRING,
	},
	profilePicture: {
		type: Sequelize.STRING,
	},
});

module.exports = User;
