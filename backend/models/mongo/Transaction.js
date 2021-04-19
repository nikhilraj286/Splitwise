const mongoose = require('mongoose');
const { Schema } = mongoose;

const TransactionSchema = new Schema({
    amount: {
        type: String
    },
    payment_status: {
        type: String
    },
    cleared: {
        type: Boolean
    },
    date_paid: {
        type: Date,
        default: Date.now()
    },
    paid_by: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    paid_to: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    group_id: {
        type: Schema.Types.ObjectId,
        ref: "Group"
    }
})

module.exports = mongoose.model('Transaction', TransactionSchema)