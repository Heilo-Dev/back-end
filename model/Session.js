const mongoose = require("mongoose");
const { ObjectId }=  mongoose.Types

const text = new Date()
console.log(text);
// const date = text.toLocaleString()
const sessionSchema = mongoose.Schema({
    teacherId: {
        type: ObjectId,
        required:true,
        ref:"User"
    },
    studentId: {
        type: ObjectId,
        required: true,
        ref: "User"
    },
    hourlyRate: {
        type: Number,
        required:true,
        min:0,
    },
    status: {
        type:String,
        enum: ["accept", "reject", "pending"],
        default:"pending"
    },
    time: {
        type: Date,
        default:text
    }
    
})

const Session = mongoose.model("Session", sessionSchema);
module.exports = Session;