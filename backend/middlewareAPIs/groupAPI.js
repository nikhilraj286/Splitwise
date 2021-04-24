const express = require('express');
const app = require('../app');
const router = express.Router();
const { checkAuth } = require("../utils/passport");
const kafka = require('../kafka/client')

app.post('/createGroup', checkAuth, async (req,res) => {
    req.body.path = "create-group"
    // console.log('stuck here')
    kafka.make_request('group', req.body, (error, result) => {
        // console.log(result)
        if(result.status === 200){
            return res.status(200).send(JSON.parse(result.data));
        }
        return res.status(400).send(JSON.parse(result.data));
    })
})

app.post('/getGroups', checkAuth, async (req,res) => {
    req.body.path = "get-groups"
    // console.log('stuck here')
    kafka.make_request('group', req.body, (error, result) => {
        // console.log(result)
        if(result.status === 200){
            return res.status(200).send(JSON.parse(result.data));
        }
        return res.status(404).send("Groups not found!");
    })
})

app.post('/getGroupData', checkAuth, async (req,res) => {
    req.body.path = "get-group-data"
    // console.log('stuck here')
    kafka.make_request('group', req.body, (error, result) => {
        // console.log(result)
        if(result.status === 200){
            return res.status(200).send(JSON.parse(result.data));
        }
        return res.status(404).send("Group not found!");
    })
})

app.post('/acceptInvite', checkAuth, async (req,res) => {
    req.body.path = "accept-invite"
    // console.log('stuck here')
    kafka.make_request('group', req.body, (error, result) => {
        // console.log(result)
        if(result.status === 200){
            return res.status(200).send({});
        }
        if(result.status === 404){
            return res.status(404).send(JSON.parse(result.data));
        }
        return res.status(500).send("Internal Server Error!");
    })
});

app.post('/deleteUserFromGroup', checkAuth, async (req,res) => {
    req.body.path = "delete-user-from-group"
    // console.log('stuck here')
    kafka.make_request('group', req.body, (error, result) => {
        // console.log(result)
        if(result.status === 200){
            return res.status(200).send({});
        }
        return res.status(404).send("Group not found!");
    })
})

module.exports = router