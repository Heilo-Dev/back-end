const mongoose = require('mongoose');
const { ObjectId } = require('mongodb');


const userWallateSchema = mongoose.Schema({
    id: {
        unique:true,
        type: ObjectId,
        required: true,
        ref: "User"
    },
    email: {
        type: String,
        required: true,
        unique: true,
        ref: "User"
    },
    role: {
        required: true,
        type: String
    },

    balance: {
        type: Number,
        min: 0,
        default: 20
    },
})

const UserWallate = mongoose.model("UserWallate", userWallateSchema)
module.exports = UserWallate;