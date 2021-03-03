const Sequelize = require('sequelize');
const sequelize = require('../db/SQL');

const Group = sequelize.define('group', {
	groupId: {
		type: Sequelize.INTEGER,
		allowNull: false,
		autoIncrement: true,
		primaryKey: true,
	},
	groupName: {
		type: Sequelize.STRING,
		allowNull: false,
	},
	groupDesc: {
		type: Sequelize.STRING,
		allowNull: false,
	},
	totalUsers: {
		type: Sequelize.INTEGER,
		allowNull: false,
	},
});

module.exports = Group;
