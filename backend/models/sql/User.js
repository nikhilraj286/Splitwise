module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING.BINARY,
            allowNull: false,
        },
        full_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        phone: {
            type: DataTypes.STRING,
        },
        currency: {
            type: DataTypes.STRING,
        },
        time_zone: {
            type: DataTypes.STRING,
        },
        language: {
            type: DataTypes.STRING,
        },
        profile_picture: {
            type: DataTypes.STRING,
        }
    });

    User.associate = models => {
        User.hasMany(models.UserToGroup, {
            onDelete: "cascade",
            foreignKey: {
                allowNull: false,
                name: 'user_id'
            }
        }),
        User.hasMany(models.Expense, {
            onDelete: "cascade",
            foreignKey: {
                allowNull: false,
                name: 'paid_by'
            }
        }),
        User.hasMany(models.Transaction, {
            onDelete: "cascade",
            foreignKey: {
                allowNull: false,
                name: 'paid_by'
            }
        }),
        User.hasMany(models.Transaction, {
            onDelete: "cascade",
            foreignKey: {
                allowNull: false,
                name: 'paid_to'
            }
        })
    }

    return User;
}