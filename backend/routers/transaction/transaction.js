const express = require('express');
const db = require('../../models');
const app = require('../../app');
// const sequelize = require('../../db/SQL');
// const Promise = require("bluebird")
// const { now } = require('sequelize/types/lib/utils');

const router = express.Router();

app.post('/getTransactions', async (req,res) => {
    console.log("Inside Transactions Request");
    console.log("Req Body : ",req.body);
    try {
        const result = await db.Transaction.findAll({
            order: [
                ['createdAt', 'DESC'],
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

module.exports = router;