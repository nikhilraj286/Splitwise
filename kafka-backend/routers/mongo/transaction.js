const express = require('express');
const chalk = require('chalk');
const app = require('../../app');
const Transaction = require('../../models/mongo/Transaction')
const Promise = require("bluebird");
const router = express.Router();
const { checkAuth } = require("../../utils/passport");

app.get('/getTransactions', checkAuth, async (req, res) => {
    // console.log("Inside Get Transactions Request");
    try {
        Transaction.find({}).sort({ date_paid: -1 }).populate('group_id').exec((err, result) => {
            if (err) { return res.status(404).send("Group not found!"); }
            // console.log(result)
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
        console.log(err);
    }
});

app.post('/getTransactionsForGroup', checkAuth, async (req, res) => {
    // console.log("Inside Get Transactions for group Request");
    try {
        Transaction.find({ group_id: req.body.group_id }).sort({ date_paid: 1 }).populate('group_id').exec((err, result) => {
            if (err) { return res.status(404).send("Group not found!"); }
            // console.log(result)
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
        console.log(err);
    }
});

app.post('/getTransactionsForUser', checkAuth, async (req, res) => {
    // console.log("Inside Get Transactions for group Request");
    try {
        // {$or: [{ paid_by: req.body.user_id }, { paid_to: req.body.user_id }]}
        Transaction.find({ group_id: { $in: req.body.groupList } }).sort({ date_paid: 1 }).populate('group_id').exec((err, result) => {
            if (err) { return res.status(404).send("Group not found!"); }
            // console.log(result)
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
        console.log(err);
    }
});

app.post('/settleup', checkAuth, async (req, res) => {
    // console.log("Inside settle up Request");
    // console.log("Req Body : ",req.body);
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