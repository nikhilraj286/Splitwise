const express = require('express');
const chalk = require('chalk');
const app = require('../../app');
const User = require('../../models/mongo/User')
const router = express.Router();
const { checkAuth } = require("../../utils/passport");

app.post('/getUser', async (req,res) => {
    try {
        const user = await User.findOne({ _id: req.body.user_id }, 'full_name email _id group_list currency time_zone language phone profile_picture')
        if (user === null) {
            return res.status(404).send("User not found!");
        }
        return res.status(200).send(user);
    }
    catch (err) {
        return res.status(400).send(err)
    }
    return res.status(500).send("Internal Server Error!");
});

app.post('/updateUser', async (req,res) => {
    let data = {}
    if(req.body.email){data.email = req.body.email}
    if(req.body.full_name){data.full_name = req.body.full_name}
    if(req.body.phone){data.phone = req.body.phone}
    if(req.body.currency){data.currency = req.body.currency}
    if(req.body.time_zone){data.time_zone = req.body.time_zone}
    if(req.body.language){data.language = req.body.language}
    if(req.body.profile_picture){data.profile_picture = req.body.profile_picture}
    try {
        await User.findOneAndUpdate(
            { _id: req.body.user_id},
            {$set:data},
            (err, result) => {
                if (err) {
                    return res.status(400).send("failed");
                }
                return res.status(200).send(result)
            });
        }
    catch (err) {
        return res.status(400).send(err)
    }
});

app.get('/getUsers', async (req,res) => {
    try {
        await User.find({},
            'full_name email _id group_list currency time_zone language phone profile_picture',
            (err, result) => {
                if (err) {
                    return res.status(400).send(err)
                }
                output = []
                for(let item of result){
                    let data = JSON.parse(JSON.stringify(item))
                    data.user_id = String(item._id)
                    output.push(data)
                }
                return res.status(200).send(output)
            });
    }
    catch (err) {
        return res.status(400).send(err)
    }
});

app.get('/getAllUsersNames', async (req,res) => {
    try {
        await User.find({},
            'full_name email _id group_list currency time_zone language phone profile_picture',
            (err, result) => {
                if (err) {
                    return res.status(400).send(err)
                }
                output = {}
                for(let item of result){
                    let data = JSON.parse(JSON.stringify(item))
                    data.user_id = String(item._id)
                    data.name = item.full_name
                    delete data.full_name
                    output[item._id] = data
                    

                }
                return res.status(200).send(output)
            });
    }
    catch (err) {
        return res.status(400).send(err)
    }
});


module.exports = router;