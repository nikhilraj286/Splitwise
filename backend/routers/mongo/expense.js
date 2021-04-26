const express = require('express');
const chalk = require('chalk');
const app = require('../../app');
const Expense = require('../../models/mongo/Expense')
const Transaction = require('../../models/mongo/Transaction')
const Promise = require("bluebird");
const router = express.Router();
const { checkAuth } = require("../../utils/passport");

app.post('/getExpensesForGroup', checkAuth, async (req, res) => {
    try {
        Expense.find({ group_id: req.body.group_id }).sort({ date_paid: 1 }).populate('group_id').exec((err, result) => {
            if (err) { return res.status(404).send("Expense not found!"); }
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
            return res.status(200).send(output)
        })
    }
    catch (err) {
        return res.status(400).send(err)
    }
});

app.post('/newExpense', checkAuth, async (req, res) => {
    try {
        const expense = new Expense({
            amount: req.body.amount,
            desc: req.body.desc,
            expense_type: '',
            paid_by: req.body.paid_by,
            group_id: req.body.group_id
        })
        await expense.save()
        var split = req.body.amount / req.body.no_users
        split = split.toFixed(2)
        var amount = req.body.amount
        let count = 0

        Promise.mapSeries(req.body.user_list, (item) => {
            let owe_status = 'due'
            let cleared_status = false
            if (req.body.paid_by === item.user_id) {
                owe_status = 'settled'
                cleared_status = true
            }
            count = count + 1
            if (count == req.body.no_users) {
                split = amount
            }
            amount = amount - split
            const transaction = new Transaction({
                amount: split,
                payment_status: owe_status,
                paid_by: req.body.paid_by,
                paid_to: item.user_id,
                group_id: req.body.group_id,
                cleared: cleared_status
            })
            return transaction.save()
        })
        return res.status(200).send({})
    }
    catch (err) {
        return res.status(400).send(err);
    }
});

app.post('/newComment', checkAuth, async (req, res) => {
    try {
        await Expense.findOneAndUpdate({
            _id: req.body.expense_id
        },
        { $push: { comments: {
            user_id: req.body.user_id,
            name: req.body.user_name,
            comment: req.body.comment
        }}}
        ).exec((err, result) => {
            if (err) {return res.status(404).send(err)}
            return res.status(200).send({})
        })
    } catch (err) {
        return res.status(500).send("Internal Server Error!");
    }
});

app.post('/deleteComment', checkAuth, async (req, res) => {
    try {
        await Expense.findOneAndUpdate({
            _id: req.body.expense_id
        },
        { $pull: { 'comments': {
            _id: req.body.comment_id
        }}}
        ).exec((err, result) => {
            if (err) {return res.status(404).send(err)}
            return res.status(200).send({})
        })
    } catch (err) {
        return res.status(500).send("Internal Server Error!");
    }
});

app.post('deleteExpense', checkAuth, async (req, res) => {
    try {
        await Expense.findOne({
            _id: req.body.expense_id
        })
        .remove()
        .exec((err, result) => {
            if (err) {return res.status(404).send(err)}
            return res.status(200).send({})
        })
    } catch (err) {
        return res.status(500).send("Internal Server Error!");
    }
});

module.exports = router;