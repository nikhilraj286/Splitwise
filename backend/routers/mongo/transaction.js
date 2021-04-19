const express = require('express');
const chalk = require('chalk');
const app = require('../../app');
const Transaction = require('../../models/mongo/Transaction')
const Promise = require("bluebird");
const router = express.Router();

app.get('/getTransactions', async (req,res) => {
    // console.log("Inside Get Transactions Request");
    try {
        Transaction.find({}).sort({date_paid:-1}).populate('group_id').exec((err, result) => {
            if(err){return res.status(404).send("Group not found!");}
            // console.log(result)
            output = []
            for (let item of result){
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

app.post('/settleup', async (req,res) => {
    console.log("Inside settle up Request");
    // console.log("Req Body : ",req.body);

    res_data = 0
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
    }).then(() => {
        // console.log(chalk.red("Work 1 done"))
        res_data = res_data + 1
    }).catch(err => {
        console.log(err)
        // return res.status(404).end()
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
            {$set: {
                cleared: true
            }},
            {upsert: true}
        )
    }).then(() => {
        // console.log(chalk.red("Work 2 done"))
        res_data = res_data + 1
    }).catch(err => {
        console.log(err)
        // return res.status(404).end()
    })
    console.log(res_data)
    if(res_data !== 2){res.status(404).send("Settle up failed!")}
    return res.status(200).end()
});


module.exports = router;