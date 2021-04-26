const express = require('express');
const db = require('../../../models/sql');
const app = require('../../../app');
const sequelize = require('../../../db/SQL');
const Promise = require("bluebird")

const router = express.Router();

app.post('/newExpense', async (req,res) => {
    res_data = []

    try {
        const result = await db.Expense.create({
           amount: req.body.amount,
           desc: req.body.desc,
           date_paid: sequelize.fn('NOW'),
           expense_type: '',
           paid_by: req.body.paid_by,
           group_id: req.body.group_id
        }).then(
            result=>{
                var split = req.body.amount/req.body.no_users
                split = split.toFixed(2)
                var amount = req.body.amount
                let count = 0

                Promise.mapSeries(req.body.user_list, (item) => {
                    
                    let owe_status = 'due'
                    let cleared_status = false
                    if(req.body.paid_by === item.user_id){
                        owe_status = 'settled',
                        cleared_status = true
                    }
                    count = count + 1
                    if(count == req.body.no_users){
                        split = amount
                    }
                    amount =  amount - split
                    return db.Transaction.create({
                        amount: split,
                        payment_status: owe_status,
                        paid_by: req.body.paid_by,
                        paid_to: item.user_id,
                        group_id: req.body.group_id,
                        cleared: cleared_status
                    }).then(result => {
                        res_data.push(result)
                    })
                })
            }
        )
        res_data.push(result)
        if (result === null) {
            return res.status(404).send("Group not found!");
        }
        else if (result !== null){
            return res.status(200).send(res_data)
        }
        return res.status(401).send("UnAuthorized!");
    }
    catch (err) {
        return res.status(400).send(err)
    }
});

module.exports = router;