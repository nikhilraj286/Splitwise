module.exports = (sequelize, DataTypes) => {
    const UserToGroup = sequelize.define('UserToGroup', {
        has_invite: {
            type: DataTypes.BOOLEAN,
            defaultValue : false
        },
    });

    UserToGroup.associate = models => {
        UserToGroup.belongsTo(models.User, {
            foreignKey: {
                allowNull: false,
                name: 'user_id'
            }
        })
        UserToGroup.belongsTo(models.Group, {
            foreignKey: {
                allowNull: false,
                name: 'group_id'
            }
        })
    }

    return UserToGroup;
}