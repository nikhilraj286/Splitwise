const express = require('express');
const User = require('../../mysqlModels/User');

const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const user = await User.findOne({
            where: {
                email: req.body.email
            }
        });
        console.log(user)
        if (user === null) {
            return res.status(404).send("User not found!");
        }
        else if (user.password === req.body.password) {
            return res.status(200).send(user);
        }
        return res.status(401).send("UnAuthorized!");
    }
    catch (err) {
        console.log(err);
    }
    return res.status(500).send("Internal Server Error!");
})

module.exports = router;