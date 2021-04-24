const express = require('express');
const app = require('../app');
const router = express.Router();
const { checkAuth } = require("../utils/passport");
const kafka = require('../kafka/client')

app.post('/getExpensesForGroup', checkAuth, async (req,res) => {
    req.body.path = "get-expenses-for-group"
    // console.log('stuck here')
    kafka.make_request('expense', req.body, (error, result) => {
        // console.log(result)
        if(result.status === 200){
            return res.status(200).send(JSON.parse(result.data));
        }
        if(result.status === 404){
            return res.status(404).send('Expense not found!');
        }
        return res.status(500).send('Internal server error !');
    })
})

app.post('/newExpense', checkAuth, async (req,res) => {
    req.body.path = "new-expense"
    // console.log('stuck here')
    kafka.make_request('expense', req.body, (error, result) => {
        console.log(result)
        if(result.status === 200){
            return res.status(200).send({});
        }
        if(result.status === 400){
            return res.status(400).send(JSON.parse(result.data));
        }
        return res.status(500).send('Internal server error !');
    })
})

app.post('/newComment', checkAuth, async (req,res) => {
    req.body.path = "new-comment"
    // console.log('stuck here')
    kafka.make_request('expense', req.body, (error, result) => {
        // console.log(result)
        if(result.status === 200){
            return res.status(200).send({});
        }
        if(result.status === 404){
            return res.status(404).send(JSON.parse(result.data));
        }
        return res.status(500).send('Internal server error !');
    })
})

app.post('/deleteComment', checkAuth, async (req,res) => {
    req.body.path = "delete-comment"
    // console.log('stuck here')
    kafka.make_request('expense', req.body, (error, result) => {
        // console.log(result)
        if(result.status === 200){
            return res.status(200).send({});
        }
        if(result.status === 404){
            return res.status(404).send(JSON.parse(result.data));
        }
        return res.status(500).send('Internal server error !');
    })
})

module.exports = router