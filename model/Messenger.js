const mongoose = require("mongoose");
const { ObjectId } = mongoose.Types;

// Conversation Model


// Messaging Model
const textMessageSchema = mongoose.Schema({
    text: {
       type:String
    },
    sender: {
        type: ObjectId,
        name: String,
        avatar:String
    },
    receiver: {
        type: ObjectId,
        name: String,
        avatar:String
    },
    date_time: {
        type: Date,
        default:Date.now,
    },
    Conversartion_id: {
        type: ObjectId,
        required:true
    }

}, {
    timestaps: true
});

const Conversartion = mongoose.model("Conversartion", conversationSchema);
const textMessage = mongoose.model("textMessage", textMessageSchema);

module.exports = {
    Conversartion, textMessage
}