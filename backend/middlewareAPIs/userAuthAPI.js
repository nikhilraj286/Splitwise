const express = require('express');
const app = require('../app');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { secret } = require('../Utils/config');
const { auth } = require("../utils/passport");
const kafka = require('../kafka/client')
auth();

app.post('/login', async (req,res) => {
    req.body.path = "user-login"
    console.log('stuck here')
    kafka.make_request('userAuth', req.body, (error, result) => {
        console.log(result)
        if(result.status === 200){
            const user = JSON.parse(result.data)
            const payload = { user_id: user._id, full_name: user.full_name, email: user.email, currency: user.currency}
            const token = jwt.sign(payload, secret)
            return res.status(200).send("JWT " + token);
        }else if(result.status === 401){
            return res.status(401).send("Invalid username of password");
        }else if(result.status === 404){
            return res.status(404).send("User not found!");
        }
        return res.status(500).send("Internal Server Error!");
    })
})

app.post('/signup', async (req,res) => {
    req.body.path = "user-signup"
    kafka.make_request('userAuth', req.body, (error, result) => {
        if(result.status === 200){
            const user = JSON.parse(result.data)
            const payload = { user_id: user._id, full_name: user.full_name, email: user.email, currency: user.currency}
            const token = jwt.sign(payload, secret)
            return res.status(200).send("JWT " + token);
        }else if(result.status === 400){
            return res.status(400).send("User already registered with this email id. Login to continue");
        }
        return res.status(500).send("Internal Server Error!");
    })
})

module.exports = router