module.exports = (sequelize, DataTypes) => {
    const Group = sequelize.define('Group', {
        group_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        group_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        group_desc: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        total_users: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    });

    Group.associate = models => {
        Group.hasMany(models.UserToGroup, {
            onDelete: "cascade",
            foreignKey: {
                allowNull: false,
                name: 'group_id'
            }
        }),
        Group.hasMany(models.Expense, {
            onDelete: "cascade",
            foreignKey: {
                allowNull: false,
                name: 'group_id'
            }
        }),
        Group.hasMany(models.Transaction, {
            onDelete: "cascade",
            foreignKey: {
                allowNull: false,
                name: 'group_id'
            }
        })
    }

    return Group;
}