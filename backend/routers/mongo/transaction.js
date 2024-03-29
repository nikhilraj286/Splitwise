const express = require('express');
const chalk = require('chalk');
const app = require('../../app');
const Transaction = require('../../models/mongo/Transaction')
const Promise = require("bluebird");
const router = express.Router();
const { checkAuth } = require("../../utils/passport");

app.get('/getTransactions', async (req, res) => {
    try {
        Transaction.find({}).sort({ date_paid: -1 }).populate('group_id').exec((err, result) => {
            if (err) { return res.status(404).send("Transactions not found!"); }
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
            return res.status(200).send(output)
        })
    }
    catch (err) {
        return res.status(400).send(err)
    }
});

app.post('/getTransactionsForGroup', async (req, res) => {
    try {
        Transaction.find({ group_id: req.body.group_id }).sort({ date_paid: 1 }).populate('group_id').exec((err, result) => {
            if (err) { return res.status(404).send("Transactions not found!"); }
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
            return res.status(200).send(output)
        })
    }
    catch (err) {
        return res.status(400).send(err)
    }
});

app.post('/getTransactionsForUser', async (req, res) => {
    try {
        Transaction.find({ group_id: { $in: req.body.groupList } }).sort({ date_paid: 1 }).populate('group_id').exec((err, result) => {
            if (err) { return res.status(404).send("Transactions not found!"); }
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
            return res.status(200).send(output)
        })
    }
    catch (err) {
        return res.status(400).send(err)
    }
});

app.post('/settleup', async (req, res) => {
    try {
        Promise.mapSeries(req.body, (item) => {
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

        Promise.mapSeries(req.body, (item) => {
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
        return res.status(200).send({})
    } catch (err) {
        res.status(404).send("Settle up failed!")
    }
});


module.exports = router;