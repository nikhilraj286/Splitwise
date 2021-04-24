module.exports = (sequelize, DataTypes) => {
    const Transaction = sequelize.define('Transaction', {
        trans_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        amount: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        payment_status: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        cleared: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        }
    });

    Transaction.associate = models => {
        Transaction.belongsTo(models.User, {
            foreignKey: {
                allowNull: false,
                name: 'paid_by'
            }
        }),
        Transaction.belongsTo(models.User, {
            foreignKey: {
                allowNull: false,
                name: 'paid_to'
            }
        }),
        Transaction.belongsTo(models.Group, {
            foreignKey: {
                allowNull: false,
                name: 'group_id'
            }
        })
    }

    return Transaction;
}