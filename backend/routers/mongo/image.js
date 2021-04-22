const express = require('express');
const app = require('../../app');
const fs = require('fs');
const path = require('path');
const router = express.Router();
const multer = require('multer');
const multerS3 = require('multer-s3')
const dotenv = require('dotenv');
const AWS = require("aws-sdk")
const { checkAuth } = require("../../utils/passport");

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

// app.post("/uploadPic", upload.single('myImage'), (err, result) => {
//     console.log(result)
//     if(err){
//         console.log(err)
//         res.status(400).send("error")
//     }
//     res.status(200).send(req.file.filename);


    // if (err) {
    //     console.log(err)
    //     // res.writeHead(200, {
    //     //     'Content-Type': 'text/plain'
    //     // })
    //     // res.send("error");
    // } else {
    //     if (req.file == undefined) {
    //         console.log("no file")
    //         // res.writeHead(200, {
    //         //     'Content-Type': 'text/plain'
    //         // })
    //         // res.send("no file");
    //     } else {
    //         console.log('file name', req.file.filename)
    //         // res.writeHead(200, {
    //         //     'Content-Type': 'text/plain'
    //         // })
    //         // res.send(req.file.filename);
    //     }
    // }
// });

app.get('/profile/:image_id', async (req, res) => {
    await s3.getObject({
        Bucket: "spitwise",
        Key: req.params.image_id
    }, (err, data) => {
        if(err){res.sendFile(path.join(__dirname, '../..') + '/public/uploads/default.png')}
        // // res.sendFile(path(data))
        // console.log('here', data.Key)
        // console.log('here again', typeof(data))
        res.status(200).send({})
    })
});



// const storage = multer.diskStorage({
//     destination: './public/uploads/',
//     filename: function (req, file, cb) {
//         cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
//     }
// });
// const upload = multer({
//     storage: storage,
//     limits: { fileSize: 1000000 },
// }).single('myImage');
// app.use(express.static('./public'));

// app.post('/uploadPic', (req, res) => {
//     console.log("upload pic called");
//     upload(req, res, async (err) => {
//         if (err) {
//             res.writeHead(200, {
//                 'Content-Type': 'text/plain'
//             })
//             res.end("error");
//         } else {
//             if (req.file == undefined) {
//                 res.writeHead(200, {
//                     'Content-Type': 'text/plain'
//                 })
//                 res.end("no file");
//             } else {
//                 res.writeHead(200, {
//                     'Content-Type': 'text/plain'
//                 })
//                 res.end(req.file.filename);
//             }
//         }
//     });
// });

// app.get('/profile/:image_id', (req, res) => {
//     var image = path.join(__dirname, '..') + '/public/uploads/' + req.params.image_id;
//     if (fs.existsSync(image)) {
//         res.sendFile(image);
//     }
//     else {
//         res.sendFile(path.join(__dirname, '..') + '/public/uploads/default.png')
//     }
// });

module.exports = router;