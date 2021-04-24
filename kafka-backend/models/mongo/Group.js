const mongoose = require('mongoose');
const { Schema } = mongoose;

const GroupSchema = new Schema({
    group_name:{
        type: String,
        required: true,
        unique: true
    },
    group_desc:{   
        type: String
    },
    total_users: {
        type: Number
    },
    user_list:[{
        user_id:{
            type: Schema.Types.ObjectId, 
            ref: "User"
        },
        has_invite: {
            type: Boolean
        }
    }],
})

module.exports = mongoose.model('Group', GroupSchema)