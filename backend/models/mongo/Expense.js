const mongoose = require('mongoose');
const { Schema } = mongoose;

const ExpenseSchema = new Schema({
    amount: {
        type: String,
    },
    desc: {
        type: String,
    },
    date_paid: {
        type: Date,
        default: Date.now()
    },
    expense_type: {
        type: String,
    },
    paid_by: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    group_id: {
        type: Schema.Types.ObjectId,
        ref: "Group"
    }
})

module.exports = mongoose.model('Expense', ExpenseSchema)