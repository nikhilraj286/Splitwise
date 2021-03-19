module.exports = (sequelize, DataTypes) => {
    const Expense = sequelize.define('Expense', {

        amount: {
            type: DataTypes.STRING,
        },
        desc: {
            type: DataTypes.STRING,
        },
        date_paid: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        expense_type: {
            type: DataTypes.STRING,
        },
    });

    Expense.associate = models => {
        Expense.belongsTo(models.User, {
            foreignKey: {
                allowNull: false,
                name: 'paid_by',
            }
        }),
        Expense.belongsTo(models.Group, {
            foreignKey: {
                allowNull: false,
                name: 'group_id',
            }
        })
    }

    return Expense;
}