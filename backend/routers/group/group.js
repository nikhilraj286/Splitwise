const express = require('express');
const db = require('../../models');
const sequelize = require('../../db/SQL');
const app = require('../../app');
const Promise = require("bluebird")

const router = express.Router();

app.post('/createGroup',async (req,res) => {
    console.log("Inside Login Post Request");
    console.log("Req Body : ",req.body);
    res_data = []
    const transaction = await sequelize.transaction();
    try {
		const group = await db.Group.create({
			group_name:req.body.group_name,
            group_desc:'',
            total_users:req.body.no_of_users
		}, { transaction: transaction }).then(
            result=>{
                transaction.commit();
                // console.log("-------------------------------result",result)
                const res_group_id = result.group_id
                keys = Object.keys(req.body.user_list)

                Promise.mapSeries(keys, (item) => {
                    data = req.body.user_list[item]
                    // console.log('key', item, 'data', data)
                    let hasInvite = true
                    if(data.canBeDeleted === 0){
                        hasInvite = false
                    }
                    return db.UserToGroup.create({
                                    has_invite: hasInvite,
                                    group_id: res_group_id,
                                    user_id: data.user_id
                                })
                }).then(result => {
                    // console.log('*******************************')
                    // console.log(result)
                    res_data.push(result)
                });
            }
        )
		
        req.session.user = group;
        res_data.push(group)
		return res.status(200).send(group)
	} catch (error) {
		console.log(error);
		transaction.rollback();
	}
    
    return res.status(500).send("Internal Server Error!");
});

app.post('/getGroupData',async (req,res) => {
    console.log("Inside Login Post Request");
    console.log("Req Body : ",req.body);
    
    try {
        const result = await db.Group.findAll({
            where: {
                group_id: req.body.group_id
            },
            include: [db.UserToGroup, db.Transaction, db.Expense]
        });
        // console.log(result);
        if (result === null) {
            return res.status(404).send("Group not found!");
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