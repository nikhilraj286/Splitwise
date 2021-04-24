const express = require('express');
const app = require('../app');
const fs = require('fs');
const path = require('path');
const router = express.Router();
const multer = require('multer');
const multerS3 = require('multer-s3')
const dotenv = require('dotenv');
const AWS = require("aws-sdk")
const { checkAuth } = require("../utils/passport");

dotenv.config({ path: __dirname+'/./../config/config.env'});

AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY,
    region: 'us-west-2'
})

const s3 = new AWS.S3()

let imgName = ''

const upload = multer({
    storage: multerS3({
        s3: s3,
        acl : "public-read",
        bucket: "spitwise",
        metadata : function(req, file, cb) {
            const metadataObj = Object.assign({}, req.body);
            metadataObj.content_type = file.mimetype;
            metadataObj.filename = file.originalname;
            cb(null, metadataObj);
        },
        key: function (req, file, cb) {
            // console.log(file);
            imgName = Date.now() + file.originalname
            cb(null, imgName); //use Date.now() for unique file keys
        }
    })
}).single('myImage');

app.post('/uploadPic', checkAuth, async (req, res) => {
    upload(req, res, (err) => {
        if(err){res.status(400).send('error')}
        res.status(200).send(imgName);
    })
})

module.exports = router