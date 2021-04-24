const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
    email:{
        type: String,
        required: true,
        unique: true
    },
    full_name:{
        type: String
    },
    password:{
        type: String
    },
    profile_picture:{
        type: String
    },
    phone:{
        type: String
    },
    currency:{
        type: String,
        default: 'USD'
    },
    time_zone:{
        type: String,
        default: '-8'
    },
    language:{
        type: String,
        default: 'EN'
    },
    group_list:[{
        group_id:{ 
            type: Schema.Types.ObjectId,
            ref: "Group" 
        },
        has_invite:{ 
            type: Boolean
        }
    }]
})

module.exports = mongoose.model('User', UserSchema)