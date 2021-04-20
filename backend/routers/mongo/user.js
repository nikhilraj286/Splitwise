const express = require('express');
const chalk = require('chalk');
const app = require('../../app');
const User = require('../../models/mongo/User')
const router = express.Router();

app.post('/getUser', async (req,res) => {
    // console.log(chalk.blue("Inside Get User Post Request"));
    // var res = {}
    try {
        const user = await User.findOne({ _id: req.body.user_id }, 'full_name email _id group_list currency time_zone language phone profile_picture')
        if (user === null) {
            // console.log('User not found')
            return res.status(404).send("User not found!");
        }
        // console.log('User found')
        return res.status(200).send(user);
    }
    catch (err) {
        console.log(err);
    }
    return res.status(500).send("Internal Server Error!");
});

app.post('/updateUser',async (req,res) => {
    console.log("Inside update User Post Request");
    try {
        await User.findOneAndUpdate(
            { _id: req.body.user_id},
            {$set:{
                email: req.body.email,
                full_name: req.body.full_name,
                phone: req.body.phone,
                currency: req.body.currency,
                time_zone: req.body.time_zone,
                language: req.body.language,
                profile_picture: req.body.profile_picture
            }},
            (err, result) => {
                if (err) {
                    console.log(chalk.blue(err))
                    return res.status(200).send("failed");
                }
                console.log(chalk.red(result))
                return res.status(200).send(result)
            });
        }
    catch (err) {
        console.log(err);
    }
    // return res.status(500).send("Internal Server Error!");
});

app.get('/getUsers', async (req,res) => {
    // console.log("Inside Get users Request");
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
                    // console.log(data)
                    // console.log('*************************')
                    output.push(data)
                }
                return res.status(200).send(output)
            });
    }
    catch (err) {
        console.log(err);
    }
    // return res.status(500).send("Internal Server Error!");
});

app.get('/getAllUsersNames', async (req,res) => {
    // console.log("Inside Get users Request");
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
                    // data.remove(full_name)
                    // console.log(data)
                    // console.log('*************************')
                    output[item._id] = data
                    

                }
                return res.status(200).send(output)
            });
    }
    catch (err) {
        console.log(err);
    }
    // return res.status(500).send("Internal Server Error!");
});


module.exports = router;