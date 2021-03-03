const Sequelize = require('sequelize');
const sequelize = require('../db/SQL');

const UserToGroup = sequelize.define('userToGroup', {
	userId: {
		type: Sequelize.INTEGER,
		allowNull: false,
	},
	groupId: {
		type: Sequelize.INTEGER,
		allowNull: false,
	},
	hasInvite: {
		type: Sequelize.BOOLEAN,
		allowNull: false,
	},
});

module.exports = UserToGroup;
