const express = require('express');
const db = require('../../models');
const app = require('../../app');

const router = express.Router();

app.post('/login',async (req,res) => {
    console.log("Inside Login Post Request");
    console.log("Req Body : ",req.body);
    try {
        const user = await db.User.findOne({
            where: {
                email: req.body.email
            }
        });
        console.log(user.dataValues.password);
        console.log(req.body.password)
        if (user === null) {
            return res.status(404).send("User not found!");
        }
        else if (user.dataValues.password === req.body.password) {
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

app.post('/getUsers', async (req,res) => {
    console.log("Inside get users Post Request");
    try {
        const result = await db.User.findAll({});
        console.log(result.dataValues);
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