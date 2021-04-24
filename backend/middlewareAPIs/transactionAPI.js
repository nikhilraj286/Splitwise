const express = require('express');
const app = require('../app');
const router = express.Router();
const { checkAuth } = require("../utils/passport");
const kafka = require('../kafka/client')

app.get('/getTransactions', checkAuth, async (req,res) => {
    req = {}
    req.body = {}
    req.body.path = "get-transactions"
    // console.log('stuck here')
    kafka.make_request('transaction', req.body, (error, result) => {
        // console.log(result)
        if(result.status === 200){
            return res.status(200).send(JSON.parse(result.data));
        }
        if(result.status === 404){
            return res.status(404).send('Transactions not found!');
        }
        return res.status(500).send('Internal server error !');
    })
})

app.post('/getTransactionsForGroup', checkAuth, async (req,res) => {
    req.body.path = "get-transactions-for-group"
    // console.log('stuck here')
    kafka.make_request('transaction', req.body, (error, result) => {
        // console.log(result)
        if(result.status === 200){
            return res.status(200).send(JSON.parse(result.data));
        }
        if(result.status === 404){
            return res.status(404).send('Transactions not found!');
        }
        return res.status(500).send('Internal server error !');
    })
})

app.post('/getTransactionsForUser', checkAuth, async (req,res) => {
    req.body.path = "get-transactions-for-user"
    // console.log(req.body)
    // console.log('stuck here')
    kafka.make_request('transaction', req.body, (error, result) => {
        // console.log(result)
        if(result.status === 200){
            return res.status(200).send(JSON.parse(result.data));
        }
        if(result.status === 404){
            return res.status(404).send('Transactions not found!');
        }
        return res.status(500).send('Internal server error !');
    })
})

app.post('/settleup', checkAuth, async (req,res) => {
    req.body.path = "settle-up"
    // console.log('stuck here', req)
    kafka.make_request('transaction', req.body, (error, result) => {
        console.log(result)
        if(result.status === 200){
            return res.status(200).send({});
        }
        if(result.status === 404){
            return res.status(404).send("Settle up failed!");
        }
        return res.status(500).send('Internal server error !');
    })
})

module.exports = router