const express = require('express');
const db = require('../../../models/sql');
const app = require('../../../app');
const sequelize = require('../../../db/SQL');
const Promise = require("bluebird");
const { stat } = require('fs/promises');

const router = express.Router();

app.get('/getTransactions', async (req,res) => {
    console.log("Inside Transactions Request");
    try {
        const result = await db.Transaction.findAll({
            order: [
                ['updatedAt', 'DESC'],
            ],
            include: [db.Group]
        })
        if (result === null) {
            return res.status(404).send("Group not found!");
        }
        else if (result !== null){
            return res.status(200).send(result)
        }
        return res.status(401).send("UnAuthorized!");
    }
    catch (err) {
        console.log(err);
    }
    return res.status(500).send("Internal Server Error!");
});

app.post('/settleup', async (req,res) => {
    console.log("Inside settle up Request");

    res_data = 0
    Promise.mapSeries(req.body, (item) => {
        return db.Transaction.create({
            amount: item.amount,
            payment_status: "settled",
            paid_by: item.paid_to,
            paid_to: item.paid_by,
            group_id: item.group_id,
            cleared: true
        })
    }).then(() => {
        res_data = 1
    }).catch(err => {
        console.log(err)
        return res.status(404).end()
    })

    Promise.mapSeries(req.body, (item) => {
        return db.Transaction.findOne({
            where: {
                amount: item.amount,
                payment_status: "due",
                paid_by: item.paid_by,
                paid_to: item.paid_to,
                group_id: item.group_id,
                cleared: false
            }
        }).then((obj)=>{
            return obj.update({
                cleared: true
            })
        })
    }).then(() => {
        res_data = 2
    }).catch(err => {
        console.log(err)
        return res.status(404).end()
    })

    return res.status(200).end()
});

module.exports = router;