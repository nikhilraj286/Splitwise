const User = require('./../models/mongo/User')
const passwordHash = require('password-hash');

const loginHandler = async (msg, callback) => {
    var res = {}
    try {
        // console.log('reached here', msg.email)
        const user = await User.findOne({ email: msg.email})
        console.log(user)
        if(user === null){
            res.status = 404
            callback(null, res)
        }
        if (passwordHash.verify(msg.password, user.password)) {
            res.status = 200
            res.data = JSON.stringify(user)
            callback(null, res)
        }
        res.status = 500
        callback(null, res)
    } catch(err){
        callback(null, false)
    }
}

const signupHandler = async (msg, callback) => {
    var res = {}
    const user = new User({
        email: msg.email,
        password: passwordHash.generate(msg.password),
        full_name: msg.full_name,
        phone: 'none',
        currency: "USD",
        time_zone: "-8",
        language: "EN",
        profile_picture: 'default.png'
    })
    try {
        await user.save()
        res.status = 200
        res.data = JSON.stringify(user)
        callback(null, res)
    } catch(err){
        res.status = 400
        callback(null, res)
    }
}

handle_request = (msg, callback) => {
    if(msg.path === "user-login"){
        delete msg.path
        loginHandler(msg, callback)
    }
    if(msg.path === "user-signup"){
        delete msg.path
        signupHandler(msg, callback)
    }
}

exports.handle_request = handle_request;