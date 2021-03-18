const express = require('express');
const db = require('../models');
const app = require('../app');

const router = express.Router();


app.post('/getGroups', async (req,res) => {
    console.log("Inside get groups Post Request");
    console.log("Req Body : ",req.body);
    try {
        const result = await db.UserToGroup.findAll({
            where: {
                user_id: req.body.user_id,
            },
            include: [db.Group]
        });
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



app.post('/getAllUsersNames', async (req,res) => {
    console.log("Inside get All users names Post Request");
    console.log("Req Body : ",req.body);
    try {
        const result = await db.User.findAll({
            attributes: ['user_id', 'full_name', 'email'],
        });
        // console.log(result.dataValues);
        if (result === null) {
            return res.status(404).send("Groups not found!");
        }
        else if (result !== null){
            let all_users = {}
            result.forEach(item => {
                all_users[item.dataValues.user_id] = {
                    user_id: item.dataValues.user_id,
                    name: item.dataValues.full_name,
                    email: item.dataValues.email
                }
            })
            return res.status(200).send(all_users)
        }
        return res.status(401).send("UnAuthorized!");
    }
    catch (err) {
        console.log(err);
    }
    return res.status(500).send("Internal Server Error!");
});

module.exports = router;