const express = require('express');
const db = require('../models');
const app = require('../app');
const fs = require('fs');
const path = require('path');


const router = express.Router();
const multer = require('multer');

const storage = multer.diskStorage({
    destination: './public/uploads/',
    filename: function(req, file, cb){
      cb(null,file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
  });
const upload = multer({
    storage: storage,
    limits:{fileSize: 1000000},
  }).single('myImage');
  app.use(express.static('./public'));


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

app.post('/acceptInvite', async (req,res) => {
    console.log("Inside accept invite Post Request");
    console.log("Req Body : ",req.body);
    try {
        const result = await db.UserToGroup.findOne({
            where: {
                user_id: req.body.user_id,
                group_id: req.body.group_id
            }}).then((obj) => {
                return obj.update({
                    has_invite: false
                })
            })
        // console.log(result.dataValues);
        if (result === null) {
            return res.status(404).send("Groups not found!");
        }
        else if (result !== null){
            console.log('User has accepted the invite')
            return res.status(200).send(result)
        }
        return res.status(401).send("UnAuthorized!");
    }
    catch (err) {
        console.log(err);
    }
    return res.status(500).send("Internal Server Error!");
});

app.post('/deleteUserFromGroup', async (req,res) => {
    console.log("Inside Delete user from group Post Request");
    console.log("Req Body : ",req.body);
    try {
        const result = await db.UserToGroup.findOne({
            where: {
                user_id: req.body.user_id,
                group_id: req.body.group_id
            }}).then((obj) => {
                return obj.destroy()
            })
        // console.log(result.dataValues);
        if (result === null) {
            return res.status(404).send("Groups not found!");
        }
        else if (result !== null){
            console.log('User has been removed from group')
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


app.post('/uploadPic', (req, res) => {
    console.log("upload pic called");
    upload(req, res, async (err) => {
      if(err){
        res.writeHead(200, {
            'Content-Type': 'text/plain'
        })
        res.end("error");
      } else {
        if(req.file == undefined){
            res.writeHead(200, {
                'Content-Type': 'text/plain'
            })
            res.end("no file");
        } else {
            res.writeHead(200, {
                'Content-Type': 'text/plain'
            })
            res.end(req.file.filename);
        }
      }
    });
  });

  app.get('/profile/:image_id',(req,res)=>{
    var image = path.join(__dirname,'..')+'/public/uploads/'+req.params.image_id;
    if(fs.existsSync(image)){
        res.sendFile(image);
    }
    else{
        res.sendFile(path.join(__dirname,'..') + '/public/uploads/default.png')
    }
});

module.exports = router;