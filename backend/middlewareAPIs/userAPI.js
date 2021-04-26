const express = require('express');
const app = require('../app');
const router = express.Router();
const { checkAuth } = require("../utils/passport");
const kafka = require('../kafka/client')

app.post('/getUser', checkAuth, async (req,res) => {
    req.body.path = "get-user"
    kafka.make_request('user', req.body, (error, result) => {
        if(result.status === 200){
            return res.status(200).send(JSON.parse(result.data));
        }
        if(result.status === 404){
            return res.status(404).send("User not found!");
        }
        return res.status(500).send("Internal Server Error!");
    })
})

app.post('/updateUser', checkAuth, async (req,res) => {
    req.body.path = "update-user"
    kafka.make_request('user', req.body, (error, result) => {
        if(result.status === 200){
            return res.status(200).send(JSON.parse(result.data));
        }
        if(result.status === 400){
            return res.status(200).send("failed");
        }
        return res.status(400).send("Internal Server Error!");
    })
})

app.get('/getUsers', checkAuth, async (req,res) => {
    req = {}
    req.body = {}
    req.body.path = "get-users"
    kafka.make_request('user', req.body, (error, result) => {
        if(result.status === 200){
            return res.status(200).send(JSON.parse(result.data));
        }
        if(result.status === 400){
            return res.status(400).send(JSON.parse(result.data));
        }
        return res.status(500).send("Internal Server Error!");
    })
})

app.get('/getAllUsersNames', checkAuth, async (req,res) => {
    req = {}
    req.body = {}
    req.body.path = "get-all-users-names"
    kafka.make_request('user', req.body, (error, result) => {
        if(result.status === 200){
            return res.status(200).send(JSON.parse(result.data));
        }
        if(result.status === 400){
            return res.status(400).send(JSON.parse(result.data));
        }
        return res.status(500).send("Internal Server Error!");
    })
})

module.exports = router