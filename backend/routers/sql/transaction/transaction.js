const express = require('express');
const db = require('../../../models/sql');
const app = require('../../../app');
const sequelize = require('../../../db/SQL');
// const sequelize = require('../../db/SQL');
const Promise = require("bluebird");
const { stat } = require('fs/promises');
// const { now } = require('sequelize/types/lib/utils');

const router = express.Router();

app.get('/getTransactions', async (req,res) => {
    console.log("Inside Transactions Request");
    // console.log("Req Body : ",req.body);
    try {
        const result = await db.Transaction.findAll({
            order: [
                ['updatedAt', 'DESC'],
            ],
            include: [db.Group]
        })
        // console.log('main resss',result);
        // res_data.push(result)
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
    // console.log("Req Body : ",req.body);

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

// app.post('/settleup', async (req,res) => {
//     console.log("Inside settle up Request");
//     // console.log("Req Body : ",req.body);
//     res_data = []
//     try {
//         const result1 = await db.Transaction.findAll({
//             where: {
//                 paid_by: req.body.user_id1,
//                 paid_to: req.body.user_id2
//             }}).then((obj) => {
//                 obj.forEach((item) => {
//                     return item.update({
//                         payment_status: 'settled',
//                         updatedAt: sequelize.fn('NOW')
//                     }).then(result=>{
//                         console.log(result)
//                         res_data.push(result)
//                     },
//                         error =>{
//                         return res.status(404).send(error);
//                     })
//                 })
                
//         })
//         const result2 = await db.Transaction.findAll({
//             where: {
//                 paid_to: req.body.user_id1,
//                 paid_by: req.body.user_id2
//             }}).then((obj) => {
//                 obj.forEach((item) => {
//                     return item.update({
//                         payment_status: 'settled',
//                         updatedAt: sequelize.fn('NOW')
//                     }).then(result=>{
//                         console.log(result)
//                         res_data.push(result)
//                     },
//                         error =>{
//                         return res.status(404).send(error);
//                     })
//                 })
                
//         })
//         return res.status(200).send(res_data);
//     }
//     catch (err) {
//         console.log(err);
//     }
//     return res.status(500).send("Internal Server Error!");
// });



module.exports = router;