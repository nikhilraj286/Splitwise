const express = require('express');
const User = require('../../mysqlModels/User');
const app = require('../../app');

const router = express.Router();

// router.post('/login', async (req, res) => {
//     console.log("Inside Login Post Request");
//     try {
//         const user = await User.findOne({
//             where: {
//                 email: req.body.email
//             }
//         });
//         console.log(user)
//         if (user === null) {
//             return res.status(404).send("User not found!");
//         }
//         else if (user.password === req.body.password) {
//             res.cookie('cookie',"admin",{maxAge: 900000, httpOnly: false, path : '/'});
//             req.session.user = user;
//             return res.status(200).send(user);
//         }
//         return res.status(401).send("UnAuthorized!");
//     }
//     catch (err) {
//         console.log(err);
//     }
//     return res.status(500).send("Internal Server Error!");
// })

app.post('/login',async (req,res) => {
    console.log("Inside Login Post Request");
    console.log("Req Body : ",req.body);
    try {
        const user = await User.findOne({
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
            res.cookie('cookie',"admin",{maxAge: 900000, httpOnly: false, path : '/'});
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

module.exports = router;