const Group = require('./../models/mongo/Group')

const createGroupHandler = async (msg, callback) => {
    var res = {}
    userList = []
    keys = Object.keys(msg.user_list)
    keys.forEach(item => {
        data = {}
        data._id = msg.user_list[item].user_id
        data.has_invite = true
        if(msg.user_list[item].canBeDeleted === 0){
            data.has_invite = false
        }
        userList.push(data)
    })
    const group = new Group({
        group_name:msg.group_name,
        group_desc:'',
        total_users:msg.no_of_users,
        user_list: userList
    })
    try {
        await group.save()
        res.status = 200
        res.data = JSON.stringify(group)
        callback(null, res)
    } catch(err){
        res.status = 400
        res.data = JSON.stringify(err)
        callback(null, res)
    }
}

const getGroupsHandler = async (msg, callback) => {
    var res = {}
    try {
        const group = await Group.find({'user_list._id':msg.user_id})
        if(group === null){
            res.status = 404
            callback(null, res)
        }
        let output = []
        for (let item of group){
            let data = {}
            data.Group = {}
            data.group_id = item._id
            for (let arrayItem of item.user_list){
                if (arrayItem._id.equals(msg.user_id)){
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
        res.data = JSON.stringify(output)
        res.status = 200
        callback(null, res)
    } catch(err){
        res.status = 500
        callback(null, res)
    }
}

const getGroupDataHandler = async (msg, callback) => {
    var res = {}
    try {
        await Group.findOne({_id: msg.group_id})
        .populate({path:'user_list._id',model:'User'})
        .exec((err, result) => {
            if (err || result === null) {
                res.status = 404
                callback(null, res)
            }
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
            res.status = 200
            res.data = JSON.stringify(output)
            callback(null, res)
        })
    }
    catch (err) {
        res.status = 500
        callback(null, res)
    }
}

const acceptInviteHandler = async (msg, callback) => {
    res = {}
    try {
        await Group.findOneAndUpdate(
            {
                _id: msg.group_id,
                'user_list._id': msg.user_id
            },
            {$set:{
                'user_list.$.has_invite': false
            }}
        ).exec((err, result) => {
            if (err) {
                res.status = 404
                res.data = JSON.stringify(err)
                callback(null, res)
            }
            res.status = 200
            callback(null, res)
        })
    }
    catch (err) {
        res.status = 500
        callback(null, res)
    }
}

const deleteUserFromGroupHandler = async (msg, callback) => {
    res = {}
    try {
        await Group.findOneAndUpdate(
            {
                _id: msg.group_id,
                'user_list._id': msg.user_id
            },
            {$pull:{
                'user_list': {_id: msg.user_id}
            }}
        ).exec((err, result) => {
            if (err) {
                res.status = 404
                res.data = JSON.stringify(err)
                callback(null, res)
            }
            res.status = 200
            callback(null, res)
        })
    }
    catch (err) {
        res.status = 500
        callback(null, res)
    }
}

handle_request = (msg, callback) => {
    if(msg.path === "create-group"){
        delete msg.path
        createGroupHandler(msg, callback)
    }
    if(msg.path === "get-groups"){
        delete msg.path
        getGroupsHandler(msg, callback)
    }
    if(msg.path === "get-group-data"){
        delete msg.path
        getGroupDataHandler(msg, callback)
    }
    if(msg.path === "accept-invite"){
        delete msg.path
        acceptInviteHandler(msg, callback)
    }
    if(msg.path === "delete-user-from-group"){
        delete msg.path
        deleteUserFromGroupHandler(msg, callback)
    }
}

exports.handle_request = handle_request;