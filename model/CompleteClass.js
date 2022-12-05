const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');

const validator = require('validator');


const completeClassSchema = mongoose.Schema({
    teacher: {
        id: { type: ObjectId },
        subject: {
            type:String
        },
        duration:{type:String},
        timestamps:true,
        hourlyRate:{type:String},
        ref:"users"
    },
    student: {
        id: { type: ObjectId },
        subject: {
            type: String
        },
        duration: { type: String },
        timestamps: true,
        hourlyRate: { type: String },
        ref: "users"
    },
    
}, {
    timestamps:true
})

const completeClass = mongoose.model("completeClass", completeClassSchema)
module.exports = completeClass;