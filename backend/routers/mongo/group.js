const express = require('express');
const chalk = require('chalk');
const app = require('../../app');
const User = require('../../models/mongo/User')
const Group = require('../../models/mongo/Group')
const Expense = require('../../models/mongo/Expense')
const Transaction = require('../../models/mongo/Transaction')
const router = express.Router();
const { checkAuth } = require("../../utils/passport");

app.post('/createGroup', async (req,res) => {
    userList = []
    keys = Object.keys(req.body.user_list)
    keys.forEach(item => {
        data = {}
        data._id = req.body.user_list[item].user_id
        data.has_invite = true
        if(req.body.user_list[item].canBeDeleted === 0){
            data.has_invite = false
        }
        userList.push(data)
    })
    const group = new Group({
        group_name:req.body.group_name,
        group_desc:'',
        total_users:req.body.no_of_users,
        user_list: userList
    })
    try {
		await group.save()
        return res.status(200).send(group)
	} catch (error) {
        return res.status(400).send(error)
	}
});

app.post('/getGroups', async (req,res) => {
    try {
        const result = await Group.find({'user_list._id':req.body.user_id},
        (err, result) => {
            if(err){return res.status(404).send("Groups not found!");}
            let output = []
            console.log(result)
            
            for (let item of result){
                data = {}
                data.Group = {}
                data.group_id = item._id
                for (let arrayItem of item.user_list){
                    if (arrayItem._id.equals(req.body.user_id)){
                        data.has_invite = arrayItem.has_invite
                        data.user_id = arrayItem._id
                    }
                }
                data.Group.group_name = item.group_name
                data.Group.group_desc = item.group_desc
                data.Group.total_users = item.total_users
                data.Group.group_id = item._id
                data.Group.user_list = item.user_list
                output.push(data)
            }
            console.log(output)
            return res.status(200).send(output)
        });
    }
    catch (err) {
        return res.status(400).send(err)
    }
});

app.post('/getGroupData', async (req,res) => {
    
    try {
        await Group.findOne({_id: req.body.group_id})
        .populate({path:'user_list._id',model:'User'})
        .exec((err, result) => {
            if (err) {return res.status(404).send("Group not found!")}
            let output = {}
            output.group_id = result._id
            output.group_name = result.group_name
            output.group_desc = result.group_desc
            output.total_users = result.total_users
            output.userToGroups = []
            for (let item of result.user_list){
                data = {}
                data.user_id = item._id._id
                data.full_name = item._id.full_name
                data.email = item._id.email
                data.has_invite = item.has_invite
                output.userToGroups.push(data)
            }
            return res.status(200).send(output)
        })
    }
    catch (err) {
        return res.status(400).send(err)
    }
});

app.post('/acceptInvite', async (req,res) => {
    try {
        await Group.findOneAndUpdate(
            {
                _id: req.body.group_id,
                'user_list._id': req.body.user_id
            },
            {$set:{
                'user_list.$.has_invite': false
            }}
        ).exec((err, result) => {
            if (err) {return res.status(404).send(err)}
            return res.status(200).send({})
        })
    }
    catch (err) {
        return res.status(500).send("Internal Server Error!");
    }
});

app.post('/deleteUserFromGroup', async (req,res) => {
    try {
        await Group.findOneAndUpdate(
            {
                _id: req.body.group_id,
                'user_list._id': req.body.user_id
            },
            {$pull:{
                'user_list': {_id: req.body.user_id}
            }}
        ).exec((err, result) => {
            if (err) {return res.status(404).send(err)}
            return res.status(200).send({})
        })
    }
    catch (err) {
        return res.status(400).send(err)
    }
});

module.exports = router;