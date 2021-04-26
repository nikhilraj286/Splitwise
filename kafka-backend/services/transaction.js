const Transaction = require('./../models/mongo/Transaction')
const Promise = require("bluebird");

const getTransactionsHandler = async (msg, callback) => {
    res = {}
    try {
        await Transaction.find({}).sort({ date_paid: -1 }).populate('group_id').exec((err, result) => {
            if (err) { 
                res.status = 404
                callback(null, res)
            }
            output = []
            for (let item of result) {
                data = {}
                data.amount = item.amount
                data.payment_status = item.payment_status
                data.cleared = item.cleared
                data.date_paid = item.date_paid
                data.paid_by = item.paid_by
                data.paid_to = item.paid_to
                data.Group = item.group_id
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

const getTransactionsForGroupHandler = async (msg, callback) => {
    res = {}
    try {
        await Transaction.find({ group_id: msg.group_id }).sort({ date_paid: 1 }).populate('group_id').exec((err, result) => {
            if (err) { 
                res.status = 404
                callback(null, res)
             }
            output = []
            for (let item of result) {
                data = {}
                data.amount = item.amount
                data.payment_status = item.payment_status
                data.cleared = item.cleared
                data.date_paid = item.date_paid
                data.paid_by = item.paid_by
                data.paid_to = item.paid_to
                data.Group = item.group_id
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

const getTransactionsForUserHandler = async (msg, callback) => {
    res = {}
    try {
        let skip = msg.page * msg.size
        let count = await Transaction.count({
            $and: [
                {group_id: { $in: msg.groupList }},
                {$or: [
                    {paid_by: {"$ne": msg.user_id}},
                    {paid_to: {"$ne": msg.user_id}}
                ]}
            ]
        })
        await Transaction.find({
            $and: [
                {group_id: { $in: msg.groupList }},
                {$or: [
                    {paid_by: {"$ne": msg.user_id}},
                    {paid_to: {"$ne": msg.user_id}}
                ]}
            ]
        }).sort({ date_paid: msg.orderBy })
        .populate('group_id')
        .limit(msg.size)
        .skip(skip)
        .exec((err, result) => {
            if (err) { 
                res.status = 404
                callback(null, res)
             }
            output = []
            for (let item of result) {
                data = {}
                data.amount = item.amount
                data.payment_status = item.payment_status
                data.cleared = item.cleared
                data.date_paid = item.date_paid
                data.paid_by = item.paid_by
                data.paid_to = item.paid_to
                data.Group = item.group_id
                output.push(data)
            }
            res.status = 200
            res.data = JSON.stringify({
                length: count,
                data: output
            })
            callback(null, res)
        })
    }
    catch (err) {
        res.status = 500
        callback(null, res)
    }
}

const settleupHandler = async (msg, callback) => {
    res = {}
    try {
        Promise.mapSeries(msg.transList, (item) => {
            const transaction = new Transaction({
                amount: item.amount,
                payment_status: "settled",
                paid_by: item.paid_to,
                paid_to: item.paid_by,
                group_id: item.Group._id,
                cleared: true
            })
            return transaction.save()
        })

        Promise.mapSeries(msg.transList, (item) => {
            return Transaction.findOneAndUpdate(
                {
                    amount: item.amount,
                    payment_status: "due",
                    paid_by: item.paid_by,
                    paid_to: item.paid_to,
                    group_id: item.Group._id,
                    cleared: false
                },
                {
                    $set: {
                        cleared: true
                    }
                },
                { upsert: true }
            )
        })
        res.status = 200
        callback(null, res)
    } catch (err) {
        console.log(err);
        res.status = 404
        callback(null, res)
    }
}

handle_request = (msg, callback) => {
    if(msg.path === "get-transactions"){
        delete msg.path
        getTransactionsHandler(msg, callback)
    }
    if(msg.path === "get-transactions-for-group"){
        delete msg.path
        getTransactionsForGroupHandler(msg, callback)
    }
    if(msg.path === "get-transactions-for-user"){
        delete msg.path
        getTransactionsForUserHandler(msg, callback)
    }
    if(msg.path === "settle-up"){
        delete msg.path
        settleupHandler(msg, callback)
    }
}

exports.handle_request = handle_request;