const express = require('express');
const app = require('../../app');
const fs = require('fs');
const path = require('path');
const router = express.Router();
const multer = require('multer');

const storage = multer.diskStorage({
    destination: './public/uploads/',
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({
    storage: storage,
    limits: { fileSize: 1000000 },
}).single('myImage');
app.use(express.static('./public'));

app.post('/uploadPic', (req, res) => {
    console.log("upload pic called");
    upload(req, res, async (err) => {
        if (err) {
            res.writeHead(200, {
                'Content-Type': 'text/plain'
            })
            res.end("error");
        } else {
            if (req.file == undefined) {
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

app.get('/profile/:image_id', (req, res) => {
    var image = path.join(__dirname, '..') + '/public/uploads/' + req.params.image_id;
    if (fs.existsSync(image)) {
        res.sendFile(image);
    }
    else {
        res.sendFile(path.join(__dirname, '..') + '/public/uploads/default.png')
    }
});

module.exports = router;