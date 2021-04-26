const express = require('express');
const db = require('../../../models/sql');
const app = require('../../../app');
const passwordHash = require('password-hash');

const router = express.Router();

app.post('/login',async (req,res) => {
    try {
        const user = await db.User.findOne({
            where: {
                email: req.body.email
            }
        });
        if (user === null) {
            return res.status(404).send("User not found!");
        }
        else if (passwordHash.verify(req.body.password, user.dataValues.password)) {
            req.session.user = user;
            return res.status(200).send(user);
        }
        return res.status(401).send("UnAuthorized!");
    }
    catch (err) {
        console.log(err);
    }
    return res.status(500).send("Internal Server Error!");
});

app.post('/getUser',async (req,res) => {
    console.log("Inside get User Post Request");
    try {
        const user = await db.User.findOne({
            where: {
                user_id: req.body.user_id
            }
        });
        if (user === null) {
            return res.status(404).send("User not found!");
        }
        else if (user != null) {
            return res.status(200).send(user);
        }
        return res.status(401).send("UnAuthorized!");
    }
    catch (err) {
        console.log(err);
    }
    return res.status(500).send("Internal Server Error!");
});

app.post('/updateUser',async (req,res) => {
    console.log("Inside update User Post Request");
    try {
        const result = await db.User.findOne({
            where: {
                user_id: req.body.user_id
            }
        }).then((obj)=>{
            obj.update({
                email: req.body.email,
                full_name: req.body.full_name,
                phone: req.body.phone,
                currency: req.body.currency,
                time_zone: req.body.currency,
                language: req.body.language,
                profile_picture: req.body.profile_picture
            })
        })
        if (result === null) {
            return res.status(404).send("Update user details failed");
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

app.get('/getUsers', async (req,res) => {
    console.log("Inside get users Post Request");
    try {
        const result = await db.User.findAll({});
        if (result === null) {
            return res.status(404).send("Groups not found!");
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