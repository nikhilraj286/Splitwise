const Expense = require('./../models/mongo/Expense')
const Transaction = require('./../models/mongo/Transaction')
const Promise = require("bluebird");

const getExpensesForGroupHandler = async (msg, callback) => {
    res = {}
    try {
        Expense.find({ group_id: msg.group_id }).sort({ date_paid: 1 }).populate('group_id').exec((err, result) => {
            if (err) { 
                res.status = 404
                callback(null, res)
            }
            output = []
            for (let item of result) {
                data = {}
                data.exp_id = item._id
                data.amount = item.amount
                data.desc = item.desc
                data.date_paid = item.date_paid
                data.expense_type = item.expense_type
                data.paid_by = item.paid_by
                data.Group = item.group_id
                data.comments = item.comments
                output.push(data)
            }
            res.status = 200
            res.data = JSON.stringify(output)
            callback(null, res)
        })
    }
    catch (err) {
        res.status = 500
        callback(null, res)
    }
}

const newExpenseHandler = async (msg, callback) => {
    res = {}
    try {
        const expense = new Expense({
            amount: msg.amount,
            desc: msg.desc,
            expense_type: '',
            paid_by: msg.paid_by,
            group_id: msg.group_id
        })
        await expense.save()
        var split = msg.amount / msg.no_users
        split = split.toFixed(2)
        var amount = msg.amount
        let count = 0

        Promise.mapSeries(msg.user_list, (item) => {
            let owe_status = 'due'
            let cleared_status = false
            if (msg.paid_by === item.user_id) {
                owe_status = 'settled'
                cleared_status = true
            }
            count = count + 1
            if (count == msg.no_users) {
                split = amount
            }
            amount = amount - split
            const transaction = new Transaction({
                amount: split,
                payment_status: owe_status,
                paid_by: msg.paid_by,
                paid_to: item.user_id,
                group_id: msg.group_id,
                cleared: cleared_status
            })
            return transaction.save()
        })
        res.status = 200
        console.log('inside try', res)
        callback(null, res)
    }
    catch (err) {
        res.status = 400
        res.data = JSON.stringify(err)
        console.log('inside catch', err)
        callback(null, res)
    }
}

const newCommentHandler = async (msg, callback) => {
    res = {}
    try {
        await Expense.findOneAndUpdate({
            _id: msg.expense_id
        },
        { $push: { comments: {
            user_id: msg.user_id,
            name: msg.user_name,
            comment: msg.comment
        }}}
        ).exec((err, result) => {
            if (err) {
                res.status = 404
                res.data = JSON.stringify(err)
                callback(null, res)
            }
            res.status = 200
            callback(null, res)
        })
    } catch (err) {
        res.status = 500
        callback(null, res)
    }
}

const deleteCommentHandler = async (msg, callback) => {
    res = {}
    try {
        await Expense.findOneAndUpdate({
            _id: msg.expense_id
        },
        { $pull: { 'comments': {
            _id: msg.comment_id
        }}}
        ).exec((err, result) => {
            if (err) {
                res.status = 404
                res.data = JSON.stringify(err)
                callback(null, res)
            }
            res.status = 200
            callback(null, res)
        })
    } catch (err) {
        res.status = 500
        callback(null, res)
    }
}

handle_request = (msg, callback) => {
    if(msg.path === "get-expenses-for-group"){
        delete msg.path
        getExpensesForGroupHandler(msg, callback)
    }
    if(msg.path === "new-expense"){
        delete msg.path
        newExpenseHandler(msg, callback)
    }
    if(msg.path === "new-comment"){
        delete msg.path
        newCommentHandler(msg, callback)
    }
    if(msg.path === "delete-comment"){
        delete msg.path
        deleteCommentHandler(msg, callback)
    }
}

exports.handle_request = handle_request;